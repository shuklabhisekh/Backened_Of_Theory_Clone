const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://theory:theory_123@cluster0.fya2r.mongodb.net/theory-db"
  );
};

module.exports = connect;
