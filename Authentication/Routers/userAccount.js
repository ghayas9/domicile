const express = require("express");
const userController = require("../Controller/userAccount");
const authController = require("../Controller/authentication");
const router = express.Router();

router.patch(
  "/updateMe",
  // photo.uploadImages,
  // photo.resizeImages,
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete("/deleteMe", userController.deleteMe);

router.use(authController.protect, authController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
