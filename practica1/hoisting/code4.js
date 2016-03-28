(function () {
  console.log(one(3));
  var test = 5,
  one = (function one(value) {
    if (value > 2) {
      return one(value - 1);
    }
      return value - 1;
  });
  console.log(one(test));
  var identity = function one(value) {
    return value;
  }(4);

}());
// OUTPUTS AN ERROR SINCE one IS CALLED BEFORE IT COULD BE DEFINED