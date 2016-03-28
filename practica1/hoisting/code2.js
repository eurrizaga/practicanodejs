(function(){
  test = 5;

  if (false){
    var test;
  }
  else{
    console.log(one(test));
  }
  function one(value) {
    return value + 1;
  }

})();
//OUTPUTS 6 BECAUSE IS "if (false)" IS FALSEY.
// THE FUNCTION one IS CALLED WITH test = 5 AS PARAMETER