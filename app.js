const express = require('express');
const app = new express();
const Studentdata = require('./src/model/Student');
const Classdata = require('./src/model/Class');

const path=require("path");
const cors = require('cors');


// app.use(express.static('./public'));
app.set('view engine', 'ejs');
// app.set('views', './src/views');

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
var stdDetails = {
    name: "Deepu",
    rollNo: 18,
    mobileNo: 125466456,
    classId: "10B"
}
var classDetails = {
    standard: 1,
    division: "A"
}
var updateStudentClass = {
    rollNo: 1233,
    standard: 1,
    division: "B"
}
var deleteStudent={
    rollNo:1234
}
var deleteClass={
    standard: 1,
    division: "A"
}
var fetchStudentsByClassId = {
    standard: 1,
    division: "B"
}
var fetchStudentsByStandard = {
    standard: 10,
}
const port=process.env.PORT || 3000;
createStudentDetails();
createClassDetails();
updateStudentClassDetails();
deleteStudentDetails();
deleteClassDetails();
fetchStudentByClassDetails();
fetchStudentByClassStandard()

function createStudentDetails(req,res){


   Studentdata.find({"rollNo":stdDetails.rollNo})
    .then(function (details) {
            console.log("--------sudentDetails-----"+details);
         
            if (details.length != 0) {
                console.log("Student already exists");
              }
              else{
                var studentDetails ={
                    name: stdDetails.name,
                    rollNo: stdDetails.rollNo,
                    mobileNo: stdDetails.mobileNo,
                    classId: stdDetails.classId
                }
                var student = Studentdata(studentDetails);
                student.save()
                .then(() => {
                    console.log("Sucessfully Saved");
                })
                .catch(()=>{
                    console.log("Save Failed");
                })
              }
    })
    .catch((err)=>{
        console.log("------------Failed------"+err);
    })
 
}

function createClassDetails(req,res){


    Classdata.find({"standard":classDetails.standard,"division":classDetails.division})
     .then(function (details) {
             console.log("--------classDetails-----"+details);
          
             if (details.length != 0) {
                 console.log("Class already exists");
               }
               else{
                 var clsDetails ={
                    standard: classDetails.standard,
                    division: classDetails.division
                 }
                 var classDataSave = Classdata(clsDetails);
                 classDataSave.save()
                 .then(() => {
                     console.log("Sucessfully Saved");
                 })
                 .catch(()=>{
                     console.log("Save Failed");
                 })
               }
     })
     .catch((err)=>{
         console.log("------------Failed------"+err);
     })
  
 }
 
 function updateStudentClassDetails(req,res){


    Studentdata.find({"rollNo":updateStudentClass.rollNo})
     .then(function (studentDetails) {
             console.log("--------studentDetails-----"+studentDetails);
          
             if (studentDetails.length != 0) {
                 console.log("Student exists");
                 Classdata.find({"standard":updateStudentClass.standard,"division":updateStudentClass.division})
     .then(function (classdetails) {
             console.log("--------classDetails-----"+classdetails);
          
             if (classdetails.length != 0) {
                 console.log("Class exists");
            
                var updateQuery = {"rollNo":updateStudentClass.rollNo};
                var newValues = {$set:{classId: updateStudentClass.standard+updateStudentClass.division}};
                Studentdata.updateOne(updateQuery, newValues, function(err, res) {
                    if (err) throw err;
                    console.log("successfully updated");
                  }).then(function(){
                    Studentdata.find({"rollNo":updateStudentClass.rollNo})
                    .then(function(updatedStudentDetails){
                        console.log("------updated  student details"+ updatedStudentDetails)
                    })
                  })
                  .catch(()=>{
                    console.log("------------Update Failed------");
                })
               

               }else{
                   console.log("Class does not exist update failed")
               }
             
            
     })
     .catch((err)=>{
         console.log("------------Class Details Fetching error------"+err);
     })
               }else{
                   console.log("Student does not exist update failed")
               }
              
     })
     .catch((err)=>{
         console.log("------------Student Details Fetching error------"+err);
     })
  
 }


//  ========================
function deleteStudentDetails(req,res){
    Studentdata.deleteOne(deleteStudent, function(err, obj) {
        if (err) throw err;
        console.log("1 student deleted");
      })
}
//=========================
function deleteClassDetails(req,res){
    Classdata.deleteOne(deleteClass, function(err, obj) {
        if (err) throw err;
        console.log(deleteClass.standard+deleteClass.division + " deleted");
      })
}

// ==============================

function fetchStudentByClassDetails(req,res){


    Studentdata.find({"classId":fetchStudentsByClassId.standard+fetchStudentsByClassId.division})
     .then(function (details) {
             console.log("--------All Students in "+fetchStudentsByClassId.standard+fetchStudentsByClassId.division+"-------"+details);
          
     })
     .catch((err)=>{
         console.log("------------Failed to fetch all student details------"+err);
     })
  
 }

//  =======================================
function fetchStudentByClassStandard(req,res){
   
     Studentdata.find({"classId":{$regex:"^"+fetchStudentsByStandard.standard+"[a-zA-Z]$"}})
     .then(function (details) {
             console.log("--------All Students in standard "+fetchStudentsByClassId.standard+"-------"+details);
          
     })
     .catch((err)=>{
         console.log("------------Failed to fetch all student details------"+err);
     })
}


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//==============createStudentDetails with api======================
app.get('/createStudentDetails',function(req,res,next){
    // substitute stdDetails with req.body.ClassId
    Studentdata.find({"rollNo":stdDetails.rollNo})
    .then(function (details) {
            res.send("--------studentDetails-----"+details);
         
            if (details.length != 0) {
                res.send("Student already exists");
              }
              else{
                var studentDetails ={
                    name: stdDetails.name,
                    rollNo: stdDetails.rollNo,
                    mobileNo: stdDetails.mobileNo,
                    classId: stdDetails.classId
                }
                var student = Studentdata(studentDetails);
                student.save()
                .then(() => {
                    res.send("Sucessfully Saved");
                })
                .catch(()=>{
                    res.send("Save Failed");
                })
              }
    })
    .catch((err)=>{
        res.send("------------Failed------"+err);
    })
})

//==============createClassDetails with api======================
app.get('/createClassDetails',function(req,res,next){
    // substituteclassDetails.standard,classDetails.division with req.body.ClassId
    Classdata.find({"standard":classDetails.standard,"division":classDetails.division})
    .then(function (details) {
            res.send("--------classDetails-----"+details);
         
            if (details.length != 0) {
                res.send("Class already exists");
              }
              else{
                var clsDetails ={
                   standard: classDetails.standard,
                   division: classDetails.division
                }
                var classDataSave = Classdata(clsDetails);
                classDataSave.save()
                .then(() => {
                    res.send("Sucessfully Saved");
                })
                .catch(()=>{
                    res.err("Save Failed");
                })
              }
    })
    .catch((err)=>{
        res.err("------------Failed------"+err);
    })
})

//==============updateStudentClassDetails with api======================
app.get('/updateStudentClassDetails',function(req,res,next){
    // substitute updateStudentClass.rollNo,updateStudentClass.standard,updateStudentClass.division with req.body
    Studentdata.find({"rollNo":updateStudentClass.rollNo})
    .then(function (studentDetails) {
            res.send("--------studentDetails-----"+studentDetails);
         
            if (studentDetails.length != 0) {
                res.send("Student exists");
                Classdata.find({"standard":updateStudentClass.standard,"division":updateStudentClass.division})
    .then(function (classdetails) {
        res.send("--------classDetails-----"+classdetails);
         
            if (classdetails.length != 0) {
                res.send("Class exists");
           
               var updateQuery = {"rollNo":updateStudentClass.rollNo};
               var newValues = {$set:{classId: updateStudentClass.standard+updateStudentClass.division}};
               Studentdata.updateOne(updateQuery, newValues, function(err, res) {
                   if (err) throw err;
                   res.send("successfully updated");
                 }).then(function(){
                   Studentdata.find({"rollNo":updateStudentClass.rollNo})
                   .then(function(updatedStudentDetails){
                    res.send("------updated  student details"+ updatedStudentDetails)
                   })
                 })
                 .catch(()=>{
                    res.send("------------Update Failed------");
               })
              

              }else{
                res.send("Class does not exist update failed")
              }
            
           
    })
    .catch((err)=>{
        console.log("------------Class Details Fetching error------"+err);
    })
              }else{
                  console.log("Student does not exist update failed")
              }
             
    })
    .catch((err)=>{
        console.log("------------Student Details Fetching error------"+err);
    })
})


//==============fetchStudentByClassDetails with api======================
app.get('/fetchStudentByClassDetails',function(req,res,next){
    // substitute fetchStudentsByClassId.standard+fetchStudentsByClassId.division with req.body.ClassId
    Studentdata.find({"classId":fetchStudentsByClassId.standard+fetchStudentsByClassId.division})
    .then(function (details) {
            res.send("--------All Students in "+fetchStudentsByClassId.standard+fetchStudentsByClassId.division+"-------"+details);
         
    })
    .catch((err)=>{
        res.send("------------Failed to fetch all student details------"+err);
    })
})

//==============fetchStudentByClassStandard with api======================
app.get('/fetchStudentByClassStandard',function(req,res,next){
    // substitute fetchStudentsByStandard.standard with req.body.classStandard
    Studentdata.find({"classId":{$regex:"^"+fetchStudentsByStandard.standard+"[a-zA-Z]$"}})
    .then(function (details) {
            res.send("--------All Students in standard "+fetchStudentsByClassId.standard+"-------"+details);
         
    })
    .catch((err)=>{
        res.send("------------Failed to fetch all student details------"+err);
    })
    
})
//==============DELETE CLASS with api======================
app.get('/deleteClassDetails',function(req,res,next){
    // substitute deleteClass with req.body.deleteClassDetails
    Classdata.deleteOne(deleteClass, function(err, obj) {
        if (err) throw err;
        res.send(deleteClass.standard+deleteClass.division + " deleted");
      })
    
})


//==============DELETE STUDENT with api======================
app.get('/deleteStudentDetails',function(req,res,next){
    // substitute deleteStudent with req.body.deleteStudent
    Studentdata.deleteOne(deleteStudent, function(err, obj) {
        if (err) throw err;
        res.send("RollNo : " + deleteStudent.rollNo + " deleted")
      })
    
})
app.listen(3000, function(){
    console.log('listening to port 3000');
});