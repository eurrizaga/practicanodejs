"use strict";
var Person = require('./person.js');
var Course = require('./course.js');
var prompt = require('prompt');
var observer = require("node-observer");
var fs = require("fs");
var winston = require('winston');

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

var errorLevels = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  },
  colors: {
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red'
  }
};

winston.addColors(errorLevels.colors);
var logger = new (winston.Logger)({
  errorLevels: errorLevels.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      colorize: true
    }),
    new winston.transports.File({
      filename: 'output.log'
    })
  ],
  exceptionHendlers: [
    new winston.transports.Console({}),
    new winston.transports.File({
      filename: 'logs/exceptions.log'
    })
  ]});
//logger.debug('This is a debug message');
logger.warn('this is a warning message');
logger.error('this is an error message');



var student_list = [];
var teacher_list = [];
var course_list = [];

function newOperation(){
  console.log("1- Create new student");
  console.log("2- Create new teacher");
  console.log("3- Enroll student to a course");
  console.log("4- Get Teacher to teach a course");
  console.log("5- Exit");
  console.log("6- List Courses");
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
        saveData();
        console.log("PROGRAM FINISHED"); 
      break;
      case '6':
        listCoursesDetailed(course_list);
        newOperation();
      break;
    }
  });
}

function convertArrays() {
  for (var i in teacher_list){
    var courses = teacher_list[i].courses;
    for (var j in courses)
      courses[j] = courses[j].name;
  }

  for (var i in course_list){
    if (course_list[i].teacher)
      course_list[i].teacher = course_list[i].teacher.name;
    var students = course_list[i].students;
    for (var j in students)
      students[j] = students[j].name;
  }

  for (var i in student_list){
    var grades = student_list[i].current_grades;
    for (var j in grades)
      grades[j] = grades[j].grade;
  }
}

function saveData(){
  convertArrays();
  fs.writeFile('./output/students.json', JSON.stringify(student_list), function(){});
  fs.writeFile('./output/teachers.json', JSON.stringify(teacher_list), function(){});
  fs.writeFile('./output/courses.json', JSON.stringify(course_list), function(){});
  logger.info('Data has been saved to files');
}
function newStudentPrompt(){
  prompt.start();
  prompt.get(propertiesPerson, function (err, result) {
    if (err) { return onErr(err); }
    var student = new Person.Student(result.name, result.address, result.birthdate, student_list.length);
    student_list.push(student);
    logger.info("Added Student " + student.getName() + " of age " + student.getAge());
    newOperation();
  });
}
function newTeacherPrompt(){
  prompt.start();
  prompt.get(propertiesPerson, function (err, result) {
    if (err) { return onErr(err); }
    var teacher = new Person.Teacher(result.name, result.address, result.birthdate);
    teacher_list.push(teacher);
    logger.info("Added Teacher " + teacher.getName() + " of age " + teacher.getAge());
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
      logger.info("Added Student " + student.getName() + " to course " + course.name);
    
    }
    else{
      logger.error("Student is not eligible for this course");
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
    logger.info("Added Teacher " + teacher.getName() + " to course " + course.name);
    newOperation();
  });
}


function onErr(err) {
  logger.error(err);
  return 1;
}

function createCourse(name, minimum_avg_grade){
  var course = new Course(name, minimum_avg_grade);
  course_list.push(course);
  
}

function list(array){
  for (var i in array){
    logger.info(" - (" + i + ")" + array[i].name);
    
  }
}
function listCoursesDetailed(array){
  console.log("Available Courses:");
  for (var i = 0; i < array.length; i++){
    logger.info(array[i].getCourseInfo());
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



createCourse("Course 1", 5);
createCourse("Course 2", 2);
createCourse("Course 3", 7);


var result = newOperation();

