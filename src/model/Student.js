const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://userone:userone@njmongodbcluster.m9krg.mongodb.net/StudentDB?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected.>Student"));

const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  name: String,
  rollNo: Number,
  mobileNo: Number,
  classId: String

});

var Studentdata = mongoose.model("studentdata", StudentSchema);
module.exports = Studentdata;