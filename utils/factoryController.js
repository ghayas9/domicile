const { Model } = require("mongoose");
const AppError = require("./../utils/AppError");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/APIFeaature");

// Create One
exports.CreateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        newDoc,
      },
    });
  });
//Get All User Account
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const Docs = await Model.find({ status: true }).limit(2000);
    if (!Docs) {
      return next(
        new AppError(
          "There is no documents exists in database of the searched resource",
          404
        )
      );
    }

    res.status(200).json({
      status: "success",
      Acounts: Docs.length,
      data: {
        Docs,
      },
    });
  });
//GET ONE USER ACCOUNT
exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("No document founded", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
//UPDATE ONE USER ACCOUNT
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newdoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!newdoc) {
      return next(new AppError("No document founded", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        newdoc,
      },
    });
  });
//DELETE ONE DOCUMENT
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError("No document found with that ID", 404));
    res.status(200).json({
      status: "success",
      data: "successfully Deleted",
    });
  });
