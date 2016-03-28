// the function will output the number 10 ten times after 1000 ms have passed
// the logging function must be wrapped to be given its own context and save the value of i at the time it was declared
// this way it will output from 0 to 9
for(i = 0; i < 10; i++) {
     setTimeout((function(i){ return function() { console.log(i); }; })(i), 1000);
}