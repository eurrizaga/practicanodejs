"use strict";
var Person = require('./person.js');
var Course = require('./course.js');
var prompt = require('prompt');
var observer = require("node-observer");


var propertiesMain = [
  {
    name: 'number', 
    validator: /^[1-6]$/, //activo el 6 para hacer algunas pruebas
    warning: 'Number must range from 1 to 5'
  }
];

var propertiesPerson = [
  {
    name: 'name', 
    validator: /^[a-zA-Z\s\-]+$/,
    warning: 'Username must be only letters or spaces'
  },
  {
    name: 'address', 
    validator: /^[a-zA-Z0-9\s]+$/,
    warning: 'Address must be only letters, spaces, or numbers'
  },
  {
    name: 'birthdate', 
    validator: /^(0?[1-9]|[12][0-9]|3[01])[-](0?[1-9]|1[012])[-]\d{4}$/,
    warning: 'Date must be dd-mm-yyyy'
  }

];

var propertiesAssignPerson = [
  {
    name: 'Person', 
    validator: /^[0-9]+$/,
    warning: 'Must insert person ID'
  },
  {
    name: 'Course', 
    validator: /^[0-9]+$/,
    warning: 'Must insert course ID'
  }

];

var student_list = [];
var teacher_list = [];
var course_list = [];

function newOperation(){
  console.log("1- Create new student");
  console.log("2- Create new teacher");
  console.log("3- Enroll student to a course");
  console.log("4- Get Teacher to teach a course");
  console.log("5- Exit");
  console.log("Pick one >");
  prompt.start();
  prompt.get(propertiesMain, function (err, result) {
    if (err) { return onErr(err); }
    switch(result.number){
      case '1': 
        newStudentPrompt();
      break;
      case '2': 
        newTeacherPrompt();  
      break;
      case '3': 
        listStudents();
        listCourses();
        assignStudentPrompt();
      break;
      case '4': 
        listTeachers();
        listCourses();
        assignTeacherPrompt();
      break;
      case '5': 
        console.log("PROGRAM FINISHED"); 
      break;
      case '6':
        testFunctions();
      break;
    }
  });
}

function newStudentPrompt(){
  prompt.start();
  prompt.get(propertiesPerson, function (err, result) {
    if (err) { return onErr(err); }
    var student = new Person.Student(result.name, result.address, result.birthdate, student_list.length);
    student_list.push(student);
    console.log("Added Student " + student.getName() + " of age " + student.getAge());
    newOperation();
  });
}
function newTeacherPrompt(){
  prompt.start();
  prompt.get(propertiesPerson, function (err, result) {
    if (err) { return onErr(err); }
    var teacher = new Person.Teacher(result.name, result.address, result.birthdate);
    teacher_list.push(teacher);
    newOperation();
  });
}

function assignStudentPrompt(){
  prompt.start();
  prompt.get(propertiesAssignPerson, function (err, result) {
    if (err) { return onErr(err); }
    var student = student_list[result.Person];
    var course = course_list[result.Course];
    if (course.isEligible(student)){
      student.enrollToCourse(course);
      course.addStudent(student);
    }
    else{
      console.log("Student is not eligible for this course");
    }
      
    newOperation();
  });
}

function assignTeacherPrompt(){
  prompt.start();
  prompt.get(propertiesAssignPerson, function (err, result) {
    if (err) { return onErr(err); }
    var teacher = teacher_list[result.Person];
    var course = course_list[result.Course];
    if (course.hasTeacher()){
      course.getTeacher().stopTeachingCourse();
    }
    teacher.teachCourse(course);
    course.setTeacher(teacher);
    console.log(course);
    newOperation();
  });
}


function onErr(err) {
  console.log(err);
  return 1;
}

function createCourse(name, minimum_avg_grade){
  var course = new Course(name, minimum_avg_grade);
  course_list.push(course);
}

function list(array){
  for (i in array){
    console.log(" - (" + i + ")" + array[i].name);
  }
}
function listCourses(){
  console.log("Available Courses:");
  list(course_list);
}

function listStudents(){
  console.log("Available Students:");
  list(student_list);
}

function listTeachers(){
  console.log("Available Teachers:");
  list(teacher_list);
}


function testFunctions(){
  var course = course_list[0];
  
  var student = new Person.Student('stu', 'blabla', '10-10-2000', 0);
  var teacher = new Person.Teacher('tea', 'zzz', '10-10-1985');
  teacher.on('gradeStudent', function(course, student, grade){
    student.setCourseGrade(course, grade);
    console.log("Grade Changed");
  });

  console.log("ENROLL STUDENT IN COURSE");
  student.enrollToCourse(course);
  course.addStudent(student);
  console.log(student);
  console.log(course);

  console.log("ASSIGN TEACHER IN COURSE");
  teacher.teachCourse(course);
  course.setTeacher(teacher);
  console.log(teacher);
  console.log(course);

  console.log("TEACHER GRADE STUDENT");
  

  teacher.gradeStudent(course, student, 10);
  console.log(student);

  console.log("REMOVE STUDENT FROM COURSE");
  student.leaveCourse(course);
  course.removeStudent(student);

  console.log("REMOVE TEACHER FROM COURSE");
  teacher.stopTeachingCourse(course);
  

  console.log(student);
  console.log(course);
  console.log(teacher);
  
}


createCourse("Course 1", 5);
createCourse("Course 2", 2);
createCourse("Course 3", 7);


var result = newOperation();

