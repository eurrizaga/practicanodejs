String.prototype.times = function(value){
  var aux = "";
  for (i = 0; i < value; i++){
    aux += this;
  }
  return aux;
}
