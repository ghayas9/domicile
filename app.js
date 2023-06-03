const express = require("express");
const app = express();
const AppError = require("./utils/AppError");
const GlobalErrorhandler = require("./utils/globalErrorController");
const cors = require("cors");
const signup = require("./Authentication/Routers/signUp");
const userAccount = require("./Authentication/Routers/userAccount");
const domicile = require("./routes/applierRoutes");
const path =require('path')

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

app.use("/api/v1/auth", signup);
app.use("/api/v1/users", userAccount);
app.use("/api/v1/domicile", domicile);

app.use('/img', express.static(path.join(__dirname,'./Image/domicile')))

app.use(express.static(__dirname + '/View/dist'))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'View','dist','index.html'))
})

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 400));
});
app.use(GlobalErrorhandler);
module.exports = app;
