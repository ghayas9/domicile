const multer = require("multer");
const sharp = require("sharp");
const AppError = require("../utils/AppError");
const domicileModel = require("../Models/applierModel");
const APIFeatures = require("../utils/APIFeaature");
const catchAsync = require("../utils/catchAsync");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadImages = upload.fields([{ name: "images", maxCount: 3 }]);

const resizeImages = catchAsync(async (req, res, next) => {
  if (!req.files.images) return next();
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `domicile-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`Image/domicile/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

const getById = async (el) => domicileModel.findById(el);
const createOne = async (body) => domicileModel.create(body);
const PostOne = catchAsync(async (req, res, next) => {

  //Add User Id 
    req.body.userId = req.user._id
  //Add User Id 
  const domicile = await createOne(req.body);
  if (!domicile) {
    return next(new AppError("please enter full details ", 404));
  }
  res.status(200).json({
    status: true,
    domicile,
  });
});

const getOne = catchAsync(async (req, res, next) => {
  const domicile = await getById(req.params.id);
  if (!domicile) {
    return next(new AppError("No Document Found with that Id", 404));
  }
  res.status(200).json({
    domicile,
  });
});

const DeleteOne = catchAsync(async (req, res, next) => {
  const domicile = await domicileModel.findByIdAndRemove(req.params.id);

  if (!domicile) {
    return next(new AppError("No Document Found with that id", 404));
  }
  console.log(domicile);
  res.status(200).json({
    status: "Data successfully deleted ",
  });
});


const UpdateOne = catchAsync(async (req, res, next) => {
  const domicile = await domicileModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!domicile) {
    return next(new AppError("No Document Found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    domicile,
  });
});

const getAll = catchAsync(async (req, res, next) => {
  const Domicile = new APIFeatures(domicileModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const data = await Domicile.query;
  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});


const Approved = catchAsync(async (req, res, next) => {
  const doc = await domicileModel.findByIdAndUpdate(req.params.id, {
    isActive: true,
  });
  if (!doc) return next(new AppError("No document found with that ID", 404));
  res.status(200).json({
    status: "success",
    data: "successfuly approved",
  });
});


const getAllByUser = catchAsync(async (req, res, next)=>{
  const Domicile = new APIFeatures(domicileModel.find({userId:req.user._id.toHexString()}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const data = await Domicile.query;
  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
})


const findByCNIC = catchAsync(async(req,res,next)=>{
  const data = await domicileModel.findOne({CNIC:req.params.cnic})
  if(data) return res.json({status: "success",data,message:"success message"})
  return res.status(404).json({status: "false",message:"result not found"})
})
module.exports = {
  uploadImages,
  resizeImages,
  PostOne,
  getAll,
  getOne,
  DeleteOne,
  UpdateOne,
  Approved,
  getAllByUser,
  findByCNIC
};
