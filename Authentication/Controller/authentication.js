const { promisify } = require("util");
const crypto = require("crypto");
const User = require("./../Models/signUp");
const jwt = require("jsonwebtoken"); // FOR JSON WEBTOKEN
const AppError = require("./../../utils/AppError");
const catchAsync = require("./../../utils/catchAsync");
const {sendEmail , sendEmailForgotPassword} = require("./../../utils/email");

//GENERATE A RANDOM TOKEN
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// CREATE TOKEN AND GENERATE RESPONSE FUNCTION
const createToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
// SIGNING UP
exports.signup = catchAsync(async (req, res, next) => {
  const NewUser = await User.create(req.body);
  req.userId = NewUser._id;
    await sendEmail(req.body.email,'http://localhost:3000/api/v1/auth/verify/'+NewUser._id)
  createToken(NewUser, 201, res);
});

exports.verify = catchAsync(async (req, res, next) => {
  const NewUser = await User.findByIdAndUpdate(req.params.id,{
    $set: {
        active:true
    }
});
  res.status(200).send('<h1>Verified successfully</h1>')
});


// LOGING IN
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  let user = {};
  // check for email and password existance
  if (!email || !password)
    return next(new AppError("your username/email or password is wrong", 404));
  //  chech for user existance
  if (email) {
    user = await User.findOne({ email }).select("+password");
  }
  if(user && !user.active) return next(new AppError("This account Is Not Verified", 404));
  if (!user) return next(new AppError("This account does not exists", 404));

  if (!user || !(await user.CorrectPassword(password, user.password))) {
    return next(new AppError("your password is Incorrect", 404));
  }
  user = await User.findByIdAndUpdate(
    user._id,
    { deviceToken: req.body.deviceToken },
    {
      new: true,
      runValidators: true,
    }
  );
  createToken(user, 201, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    token: "",
    message: "you are logged Out",
  });
});
// PROTECT ROUTS
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //GET A TOKEN AND CHECK FOR ITS EXISTANCE

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("you are not logged in yet", 404));
  }

  //VARIFICATION
  // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // check the token's user is still exist or not
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token is no longer more", 404)
    );
  }
  // check if the user changed its password after the token was issued
  if (currentUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError("The password has recently changed! please login again", 404)
    );
  }
  req.user = currentUser;
  next();
});
// set delete permission for specific users
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        new AppError("you don't have permission to perform this action", 403)
      );
    }
    next();
  };
};
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    next(new AppError("No user exist with this email address", 404));
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.get('referer')}#/forgot/${resetToken}`;

  const message = `FORGOT your password? submit a PATCH request with your new password and passwordConfirm to: ${resetURL}\n if you don't forget your password please ignore this message`;
  try {
    await sendEmailForgotPassword(user.email,resetURL)
    return res.status(201).json({
      status: "success",
      resetURL,
      message: "token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordExpires = undefined;
    await user.save({ validateBeforeSave: false });

    next(new AppError("there was an error sending the email, try later", 500));
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordExpires: { $gt: Date.now() },
  });

  if (!user) {
    next(new AppError("Token is invalid or has expired", 404));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordExpires = undefined;
  await user.save();

  createToken(user, 200, res);
});

//FOR UPDATE LOGGED IN USER PASSWORD
exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get a user from the collection that you want to update its password
  const user = await User.findById(req.user.id).select("+password");
  // Check if the current password correct or not

  if (!await user.CorrectPassword(req.body.currentPassword, user.password)) {
    return next(new AppError("your current password is wrong!", 404));
  }else{
    // if so, updaate current user password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  //send user data along with new token
  return createToken(user, 201, res);
  }
  
});
