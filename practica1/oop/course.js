"use strict";
var observer = require("node-observer");

function Course(name, minimum_avg_grade){
  this.name = name;
  this.minimum_avg_grade = minimum_avg_grade;
  this.students = [];
  this.teacher = null;
}
Course.prototype.setTeacher= function(teacher){
  this.teacher = teacher;
}
Course.prototype.addStudent= function(student){
  this.students.push(student);

}
Course.prototype.findStudent = function(student){
  var result = this.students.filter(function( obj ) {
    return obj == student;
  });
  return result[0];
}
Course.prototype.removeStudent = function(student){
  this.students.splice(this.findStudent(student), 1);
}
Course.prototype.isEligible = function(student){
	if ((student.getAvgGrade() >= this.minimum_avg_grade) || (student.countGrades() === 0)){
		return true;
	}
	return false;
}
Course.prototype.hasTeacher = function(){
	if (this.teacher){
		return true;		
	}
	return false;
}
Course.prototype.getTeacher = function(){
	return this.teacher;		
}	
module.exports = Course;