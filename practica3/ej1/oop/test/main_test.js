var main = require('../main.js');
var should = require('should');
var Person = require('../person.js');
var Course = require('../course.js');

describe("Course", function(){
	context("course functions", function(){
		it("should not throw errors", function(done){
			var course = new Course('Course Name', 5);
			var teacher = new Person.Teacher('teacher name', 'address 123', '01-01-1980');
			var student = new Person.Student('student dame', 'address 456', '01-01-1980', 0);
			course.setTeacher(teacher);
			course.addStudent(student);
			course.removeStudent(student);
			done();
		});

		it("should find the correct student", function(){
			var course = new Course('Course Name', 5);
			var student = new Person.Student('student name', 'address 123', '01-01-1980', 0);
			course.addStudent(student);
			should(course.findStudent(student)).equal(student);

		});

		it("should find undefined", function(){
			var course = new Course('Course Name', 5);
			var student = new Person.Student('student name', 'address 123', '01-01-1980', 0);
			course.addStudent(student);
			course.removeStudent(student);
			should(course.findStudent(student)).be.undefined();

		});

		it ("should determine if a student is eligible", function(){
			var course = new Course('Course Name', 5);
			var course2 = new Course('Course Name', 5);
			var student = new Person.Student('student name', 'address 123', '01-01-1980', 0);

			should(course.isEligible(student)).be.true();
			student.enrollToCourse(course);
			student.setCourseGrade(course, 3);
			should(course2.isEligible(student)).be.false();
			student.setCourseGrade(course, 5);
			should(course2.isEligible(student)).be.true();
			
		});

		it("should determine if course has teacher", function(){
			var course = new Course('Course Name', 5);
			var teacher = new Person.Teacher('teacher name', 'address 123', '01-01-1980');
			should(course.hasTeacher()).be.false();
			course.setTeacher(teacher);
			should(course.hasTeacher()).be.true();


		});

		it("should determine the current teacher", function(){
			var course = new Course('Course Name', 5);
			var teacher = new Person.Teacher('teacher name', 'address 123', '01-01-1980');
			course.setTeacher(teacher);
			should(course.getTeacher()).equal(teacher);
			

		});

	});
});

describe("Person objects", function(){
	context("Teacher functions", function(){
		
		it("should not throw errors", function(done){
			var teacher = new Person.Teacher('teacher name', 'address 123', '01-01-1980');
			var course = new Course('Course Name', 5);
			var student = new Person.Student('student name', 'address 123', '01-01-1980', 0);

			var name = teacher.getName();
			var age = teacher.getAge();

			teacher.gradeStudent(course, student, 8);
			done();
		});

		it("should return the correct course", function(){
			var teacher = new Person.Teacher('teacher name', 'address 123', '01-01-1980');
			var course = new Course('Course Name', 5);
			teacher.teachCourse(course);
			should(teacher.findCourse(course)).equal(course);
		});

		it("should not find the removed course", function(){
			var teacher = new Person.Teacher('teacher name', 'address 123', '01-01-1980');
			var course = new Course('Course Name', 5);
			teacher.teachCourse(course);
			teacher.stopTeachingCourse(course);
			should(teacher.findCourse(course)).be.undefined();
		});


	});
	context("Student functions", function(){
		it("should not throw errors", function(done){
			var student = new Person.Student('student name', 'address 123', '01-01-1980', 0);
			var course = new Course('Course Name', 5);
			var name = student.getName();
			var age = student.getAge();
			student.enrollToCourse(course);
			student.setCourseGrade(course, 10);
			student.leaveCourse(course);
			done();
		});

		it("should return the correct student grades", function(){
			var student = new Person.Student('student name', 'address 123', '01-01-1980', 0);
			var course = new Course('Course Name', 5);
			var course2 = new Course('Course Name', 5);
			student.enrollToCourse(course);
			student.setCourseGrade(course, 10);
			student.enrollToCourse(course2);
			student.setCourseGrade(course2, 4);
			should(student.getAvgGrade()).equal(7);
			should(student.countGrades()).equal(2);
			should(student.findCourseGrade(course).grade).equal(10);

		});
	});
});