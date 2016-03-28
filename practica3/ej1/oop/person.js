"use strict";
var util = require('util');
var EventEmitter = require('events').EventEmitter;

//------------PERSON----------------------

function Person(name, address, birth_date){
  EventEmitter.call(this);
  this.name = name;
  this.address = address;
  var date = birth_date.split("-");
  this.birth_date = new Date(date[2], date[1], date[0]);
  this.friends = [];
}
util.inherits(Person, EventEmitter);

Person.prototype.getName = function(){
  return this.name;
}
Person.prototype.getAge = function(){
  var today = new Date();
  var birthDate = this.birth_date;
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
      age--;
  }
  return age;
}

//------------STUDENT----------------------

function Student(name, address, birth_date, student_id){
	
  Person.call(this, name, address, birth_date);
	this.student_id = student_id;
	this.avg_grade = 0;
	this.current_grades = [];
}
util.inherits(Student, Person);
Student.prototype.enrollToCourse = function(course){
	this.current_grades.push({'course': course, 'grade': 0});
};
Student.prototype.findCourseGrade = function(course){
  var result = this.current_grades.filter(function( obj ) {
    return obj.course == course;
  });
  return result[0];
}
Student.prototype.leaveCourse = function(course){
  this.current_grades.splice(this.findCourseGrade(course), 1);
};
Student.prototype.setCourseGrade = function(course, grade){
  this.findCourseGrade(course).grade = grade;
  //Calculate avg
  var sum = 0;
  var i;
  for (i = 0; i < this.current_grades.length; i++){
    sum += this.current_grades[i].grade;
  }
  this.avg_grade = sum / i;
  //console.log("avg grade = "+ this.avg_grade);
};
Student.prototype.getAvgGrade = function(){
	return this.avg_grade;
};
Student.prototype.countGrades = function(){
	return this.current_grades.length;
};


//------------TEACHER----------------------

function Teacher(name, address, birth_date){
	Person.call(this, name, address, birth_date);
	this.courses = [];	
}
util.inherits(Teacher, Person);
Teacher.prototype.teachCourse = function(course){
  this.courses.push(course);
};

Teacher.prototype.findCourse = function(course){
  var result = this.courses.filter(function( obj ) {
    return obj == course;
  });
  return result[0];
};

Teacher.prototype.stopTeachingCourse = function(course){
	this.courses.splice(this.findCourse(course), 1);
};
Teacher.prototype.gradeStudent = function(course, student, number){
  this.emit('gradeStudent', course, student, number);
};



module.exports.Student = Student;
module.exports.Teacher = Teacher;