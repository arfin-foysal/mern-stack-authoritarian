const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DataBase Connect Sucess");
  })
  .catch((err) => {
    console.log(err);
  });
