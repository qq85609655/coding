var O = function(hi, he) {
	this.h = hi;
	this.he = he;
}
O.prototype.fun = function(argument) {
	console.log(" fun func");
};
var o = new O("hi", "hello");
for (var key in Object.prototype) {

	console.log(key);
}

var obj = {};
Object.defineProperty(obj, "key1", {
	value: "123",
	writable: false,
	enumerable: false,
	configurable: false
});

obj.key1;
obj.key1 = "456"; //进行值的修改，但是会修改失败
obj.key1;
Object.defineProperty(obj, "key2", {
	get: function() {
		console.log("value getting");
		return this.value;
	},
	set: function(val) {
		console.log("value setting=" + val);
	}
});
obj.key2;
obj.key2 = "456";
obj.key2;

function add(x) {
	var sum = x;
	var tmp = function(y) {
		sum += y;
		return arguments.callee;
	}
	tmp.toString = function() {
		return sum;
	}
	return tmp

}
add(1)(2)(3) == 6 //true;
console.log(); //6
console.log(add(1)(2)(3)(4)); //10

var module1 = {
	count: 1;
	getCount: function() {
		return this.count;
	}
}

var module2=(function(){})()