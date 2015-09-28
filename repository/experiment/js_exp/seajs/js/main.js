define(function(require) {
	var a = require("a");
	var b = require("b");
	// a.setA("wxx test");
	console.log("the a's value is " + a.getA());
	console.log("the sayName function value is " + b.sayName());
	console.log("the b getA function value is " + b.getA());
	var c = require("c");
	console.log("jjjj"+c.h);
});