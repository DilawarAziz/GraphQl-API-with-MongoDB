const mongoose = require("mongoose");

const DB =
  "mongodb+srv://<username>:server555@cluster0.5ap2w.mongodb.net/password?retryWrites=true&w=majority";
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection succsesfull with DB");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = DB;
