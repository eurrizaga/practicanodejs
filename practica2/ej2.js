var async = require('async');
function f1(callback) {
  console.log('1');
  callback();
}

function f2(callback) {
  console.log('2');
  callback();
}

function f3(callback) {
  //console.log('3');
  var f = function() {
    return console.log('ejecutando');
    callback();
  }
  setTimeout(f, 5000);
}

var ar = [f1, f2, f3];

var callback = function(){console.log('listo')};

var err = function(error){ console.log(error); }

var series = function(tasks, callback){
  var signal = false;
  
  var end = function() {
    signal = true;
  }

  setTimeout(function(){
    tasks.forEach(function(task) {
      task(end);
      while(!signal) { }
      signal = false;
    });
    callback();
  }, 0);
}

series(ar, callback);

//async.series(ar, callback, err);