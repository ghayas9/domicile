const express = require("express");
const auth = require("./../Controller/authentication");
// const notification = require('../../products/controllers/notificationController');
const router = express.Router();
router
  .post("/signup", auth.signup)
  .get("/verify/:id", auth.verify)
  .post("/signin", auth.login)
  .post("/logout", auth.logout)
  .post("/forgotpassword", auth.forgotPassword)
  .post("/resetpassword/:token", auth.resetPassword)
  .post("/updatepassword", auth.protect, auth.updatePassword);

module.exports = router;
