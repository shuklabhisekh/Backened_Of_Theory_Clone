const mongoose = require("mongoose")

module.exports = ()=>{
    return mongoose.connect("mongodb+srv://check:check_123@cluster0.xp4i8.mongodb.net/Theoryclone?retryWrites=true&w=majority")
}