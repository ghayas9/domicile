const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

mongoose.set("strictQuery", false); //this is use for local connection
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection Successful!");
  }).catch((err)=>{console.log(err)});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on ${port}....`);
});
