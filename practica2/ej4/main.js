var UserHandler = require('./user.js');
var prompt = require('prompt');

var propertiesMain = [
  {
    name: 'number', 
    validator: /^[1-6]$/, //activo el 6 para hacer algunas pruebas
    warning: 'Number must range from 1 to 5'
  }
];

var propertiesUser = [
  {
    name: 'firstname', 
    validator: /^[a-zA-Z\s\-]+$/,
    warning: 'First Name must be only letters or spaces'
  },
  {
    name: 'lastname', 
    validator: /^[a-zA-Z\s\-]+$/,
    warning: 'Last Name must be only letters or spaces'
  },
  {
    name: 'birthdate', 
    validator: /^(0?[1-9]|[12][0-9]|3[01])[-](0?[1-9]|1[012])[-]\d{4}$/,
    warning: 'Date must be dd-mm-yyyy'
  }

];

var propertiesSelect = [
  {
    name: 'id', 
    validator: /^[0-9]+$/, //activo el 6 para hacer algunas pruebas
    warning: 'select suer ID to change'
  }
];

var propertiesFind = [
  {
    name: 'firstname', 
    validator: /^[a-zA-Z\s\-]+$/,
    warning: 'Name must be only letters or spaces'
  }

];


function newOperation(){
  console.log("1- Create User");
  console.log("2- Update user Data");
  console.log("3- Retrieve User By name");
  console.log("4- Delete a user");
  console.log("5- Exit");
  console.log("Pick one >");
  prompt.start();
  prompt.get(propertiesMain, function (err, result) {
    if (err) { return onErr(err); }
    switch(result.number){
      case '1': 
        newUserPrompt();
      break;
      case '2': 
        users.list();
        selectUserPrompt();
      break;
      case '3': 
        findUserPrompt();
      break;
      case '4': 
        users.list();
        deleteUserPrompt();
      break;
      case '5': 
        console.log("PROGRAM FINISHED"); 
      break;
      
    }
  });
}
function newUserPrompt(){
  prompt.start();
  prompt.get(propertiesUser, function (err, result) {
    if (err) { return onErr(err); }
    users.addNew(result.firstname, result.lastname, result.birthdate);
	newOperation();
  });
}
function selectUserPrompt(){
  prompt.start();
  prompt.get(propertiesSelect, function (err, result) {
    if (err) { return onErr(err); }
    editUserPrompt(result.id);
  });
}

function deleteUserPrompt(){
  prompt.start();
  prompt.get(propertiesSelect, function (err, result) {
    if (err) { return onErr(err); }
    users.deleteUser(result.id);
    newOperation();
  });
}

function editUserPrompt(id){
  prompt.start();
  prompt.get(propertiesUser, function (err, result) {
    if (err) { return onErr(err); }
    users.updateUser(id, result.lastname, result.firstname, result.birthdate);
    newOperation();
  });
}

function findUserPrompt(){
  prompt.start();
  prompt.get(propertiesFind, function (err, result) {
    if (err) { return onErr(err); }
    users.listByName(result.firstname);
    newOperation();
  });
}

function onErr(err) {
  console.log(err);
  return 1;
}

var users = new UserHandler();

newOperation();

