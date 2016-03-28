(function(){
  test = 5;

  if (false){
    var test;
  }
  else{
    console.log(test + 2);
  }

})();
//OUTPUTS 7 BECAUSE IS "if (false)" IS FALSEY
  