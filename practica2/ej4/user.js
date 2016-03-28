var Promise = require("promise");
var fs = require("fs");

function UserHandler(){
  var readFile = Promise.denodeify(fs.readFile);
  this.users = [];
  var setList = this.setList;
  var self = this;
  readFile("data.json", "utf8").then(
      function(content) {
        setList.call(self, JSON.parse(content));
      }
      , this.readError);
}
UserHandler.prototype.setList = function(content){
  this.users = content;
}

UserHandler.prototype.getAge = function(dob){
  var today = new Date();
  var auxdob = dob.split("-");
  var birthDate = new Date(auxdob[2], auxdob[1], auxdob[0]);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
      age--;
  }
  return age;
};

UserHandler.prototype.addNew = function(name, lastName, dob){
  if (!this.userExists({'firstName': name, 'lastName': lastName})){
    var newUser = {
      'id': (this.users[this.users.length - 1].id + 1),
      'firstName': name,
      'lastName': lastName,
      'dob': dob,
      'age': this.getAge(dob)
    };

    this.users.push(newUser);
    this.saveData();
  }
  else{
    console.log("ERROR: User already exists");
  }
}

UserHandler.prototype.readError = function(error) {
  console.log("Failed to read file: " + error);
}

UserHandler.prototype.saveData = function() {
  var writeFile = Promise.denodeify(fs.writeFile);
  writeFile("data.json", JSON.stringify(this.users))
    .then(function() {
      console.log('data saved');
    },
    this.readError);
}


UserHandler.prototype.getByName = function(name){
  var result = this.users.filter(function( obj ) {
    return obj.firstName == name;
  });
  return result;
}
UserHandler.prototype.list = function(){
  for (i in this.users){
    console.log(" - (" + this.users[i].id + ")" + this.users[i].lastName + ", " + this.users[i].firstName);
  }
}
UserHandler.prototype.listByName = function(name){
  var ar = this.getByName(name);
  for (i in ar){
    console.log(" - (" + ar[i].id + ")" + ar[i].lastName + ", " + ar[i].firstName+ ", " + ar[i].dob);
  }
}
UserHandler.prototype.deleteUser = function(id){
  var ar_result = this.findUserById(id);
  if (ar_result){
    this.users.splice(ar_result, 1);
    this.saveData();
  }
  else{
    console.log("ERROR: selected ID not found");
  }
}
UserHandler.prototype.updateUser = function(id, lastname, firstname, dob){
  var userEdit = this.findUserById(id);
  if (userEdit){
    userEdit.lastName = lastname;
    userEdit.firstName= firstname;
    userEdit.dob = dob;
    userEdit.age = this.getAge(dob);
    this.saveData();
  }
  else{
    console.log("ERROR: selected ID not found"); 
  }
    
}

UserHandler.prototype.findUserById = function(id){
  var result = this.users.filter(function( obj ) {
    return obj.id == id;
  });
  return result[0];
}

UserHandler.prototype.userExists = function(user){
  var result = this.users.filter(function( obj ) {
    return ((obj.firstName == user.firstName) && (obj.lastName == user.lastName));
  });
  return result[0];
}

module.exports = UserHandler;

