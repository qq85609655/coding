/**
 * 采用AOP实现装饰者
 * 代理模式的目的是，当直接访问本体不方便或者不符合需要时，为这个本体提供一个替代者
 * 装饰者模式的作用就是为对象动态加入行为
 */
Function.prototype.before = function(beforefn) {
	var _this = this;
	return function() {
		beforefn.apply(_this, arguments);
		return _this.apply(_this, arguments);
	}
};
Function.prototype.after = function(afterfn) {
	var _this = this;
	return function() {
		var ret = _this.apply(_this, arguments);
		afterfn.apply(_this, arguments);
		return ret;
	}
};

var srcFun = function() {
	console.log("this is main func");
}
srcFun = srcFun.before(function() {
	console.log("this is before func");
});
srcFun = srcFun.after(function() {
	console.log("this is after func");
});
srcFun();
/**
 * 不修改原型的情况下的AOP
 * @param  {Function} fn       [description]
 * @param  {[type]}   beforefn [description]
 * @return {[type]}            [description]
 */
var before = function(fn, beforefn) {
	return function() {
		beforefn.apply(this, arguments);
		return fn.apply(this, arguments);
	}
}
var a = before(
	function() {
		console.log(3)
	},
	function() {
		console.log(2)
	}
);
a = before(a, function() {
	console.log(1);
});
a();