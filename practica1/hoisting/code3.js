(function () {
  var test = 5, 
  one = (function one(value) {
    if (value > 2) {
      return one(value - 1);
    }
      return value - 1;
  }(test));
  console.log(one);
}());
// OUTPUTS 1
// one IS BOTH DEFINED AND EXECUTED WITH value = test = 5.
// BEING A RECURSIVE FUNCTION IT WILL SELF CALL WHILE value IS GREATER THAN 2
// ONCE value EQUALS 2 IT WILL RETURN value - 1 (WHICH EQUALS 1) DOWN THE RECURSIVE CHAIN
// THIS WILL MAKE THE one VARIABLE EQUAL 1