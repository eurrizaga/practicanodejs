var times = require('../times.js');
var should = require('should');

describe("times() function", function(){
  context("given a particular string", function(){
    it("should return the given string 5 times", function(){
      should("af".times(5)).equal("afafafafaf");
    });
  });
});
