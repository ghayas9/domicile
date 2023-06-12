const express = require("express");
const applierController = require("./../controllers/applierController");
const authController = require("../Authentication/Controller/authentication");

const router = express.Router();
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    applierController.getAll
  )
  .post(
    authController.protect,
    applierController.PostOne
  );

router
  .route("/image/:id")
  .patch(
    authController.protect,
    authController.restrictTo("admin", "user"),
    applierController.UpdateOne
  )
router
  .route("/:id")
  .get(authController.protect, applierController.getOne)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "user"),
    applierController.uploadImages,
    applierController.resizeImages,
    applierController.UpdateOne
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    applierController.DeleteOne
  );



router.patch(
  "/approved/:id",
  authController.protect,
  authController.restrictTo("admin"),
  applierController.Approved
);

router
  .route("/all/all")
  .get(
    authController.protect,
    authController.restrictTo("admin","user"),
    applierController.getAllByUser
  )
router.get('/cnic/:cnic',applierController.findByCNIC)
module.exports = router;
