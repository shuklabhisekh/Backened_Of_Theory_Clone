const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://theory_123:Gold123@cluster0.wapdf.mongodb.net/theory-db"
  );
};

module.exports = connect;
