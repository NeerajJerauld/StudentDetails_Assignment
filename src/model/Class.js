const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://userone:userone@njmongodbcluster.m9krg.mongodb.net/StudentDB?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected.>Class"));

const Schema = mongoose.Schema;
const ClassSchema = new Schema({
  standard: Number,
  division: String,

});

var Classdata = mongoose.model("classdata", ClassSchema);
module.exports = Classdata;