var express = require('express');
var app = express();
var hal = require("express-hal");

app.use(hal.middleware);

app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
   res.status(200).send('View <a href="/teachers">Teachers</a><br/> View <a href="/courses">Courses</a><br/>');
});

app.get('/teachers', function (req, res) {
   res.status(200).hal([{"domain":null,"_events":{},"_eventsCount":0,"name":"bb","address":"bb","birth_date":"1000-11-10T03:00:00.000Z","friends":[],"courses":["Course 1"]}]);
});

app.get('/courses', function (req, res) {
   res.status(200).hal([{"name":"Course 1","minimum_avg_grade":5,"students":["aa"],"teacher":"bb"},{"name":"Course 2","minimum_avg_grade":2,"students":[],"teacher":null},{"name":"Course 3","minimum_avg_grade":7,"students":[],"teacher":null}]);
});

app.use(function(req, res){
	res.status(404).send('Page not found');
});

var server = app.listen(app.get('port'), function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})