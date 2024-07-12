const mongoose = require("mongoose");
function connectToDB(){
    mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected TO MongoDB Database"))
  .catch((err) => console.error(err));
}

module.exports = connectToDB;