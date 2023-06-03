const mongoose = require("mongoose");
const validator = require("validator"); // FOR VALIDATION
const bcrypt = require("bcrypt");
const crypto = require("crypto");



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'user must have a name'],
    trim: true,
    minlength: [5, "name must has more then 5 characters"],
    maxlength: [20, "name must has less then 20 characters"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
  },

  password: {
    type: String,
    // required: [true, 'please enter at least 8 character password'],
  },
  passwordConfirm: {
    type: String,
    // required: [true, 'please confirm your password'],
  },

  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
    // required: [true, 'please provide your role! as admin/rider/manager/customer']
  },
  photo: {
    type: String,
    default: "",
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordExpires: Date,
  active: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
  },
});
//document middleware for password encryption and deleting passwordConfirm property
userSchema.pre("save", async function (next) {
  // if password is not modified then this block will run
  if (!this.isModified("password")) return next();
  // for password encryption
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
//just creating passwordChangeAt when password is going to update
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 2000;
  next();
});
//this is query middleware will run before query execution

// this is for password changed after login
userSchema.methods.passwordChangedAfter = (jwtTimeStamp) => {
  if (this.passwordChangedAt) {
    const passwordChangeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimeStamp < passwordChangeStamp; // 100 < 200 return true
  }
  return false;
};
 // this is for password verification
userSchema.methods.CorrectPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

// userSchema.statics.getUserByIds = async function (ids) {
//   const users = await this.find(
//     { _id: { $in: ids } },
//     { _id: 1, name: 1, photo: 1 }
//   );
//   return users;
// };
const User = mongoose.model("users", userSchema);
module.exports = User;
