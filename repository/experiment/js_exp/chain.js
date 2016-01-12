/**
 * 责任链模式
 * 好处：swich-case语句可以采用责任链或者采用策略实现；手动指定起始节点
 * 个人认为是策略模式的一种转型（查字典模式-->策略模式）
 * @return {[type]} [description]
 */
function fn1() {
	console.log("first chain");
}

function fn2() {
	console.log("second chain");
}

function fn3() {
	console.log("third chain");
	console.log(arguments);
}

function Chain(fn) {
	this.fn = fn;
	this.nextChain = null;
}
Chain.prototype.setNextChain = function(nc) {
	this.nextChain = nc;
	return nc; //实现链式调用
}

Chain.prototype.startChain = function() {
		this.fn.apply(this, arguments);
		this.nextChain && this.nextChain.startChain(arguments);
		// this.fn.apply(this);//实现调用回路

	}
	//main
// var fnc1 = new Chain(fn1),
// 	fnc2 = new Chain(fn2),
// 	fnc3 = new Chain(fn3);
// fnc1.setNextChain(fnc2).setNextChain(fnc3);
// fnc1.startChain(1);


Function.prototype.after = function(fn) {
	var self = this;
	return function() {
		var ret = self.apply(this, arguments);//AOP实现责任链，通过方法递归实现责任链
		fn.apply(this, arguments);
		return ret;
	}
}
var fn = fn1.after(fn2).after(fn3);
fn();