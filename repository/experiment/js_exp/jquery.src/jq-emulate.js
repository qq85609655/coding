(function(window) {
	/**
	 * jq-emulate---jquery的代码结构模拟
	 * 相关资料参见：
	 * http://www.zhangxinxu.com/wordpress/2013/07/jquery-%E5%8E%9F%E7%90%86-%E6%9C%BA%E5%88%B6/
	 * http://blog.liuwanlin.info/newzhi-shao-gan-liao-5jian-shi/
	 *
	 * 
	 * new关键字的4个动作：
	 * new jq() 执行的操作： 
	 * (function() {
		var obj = {}; //1、创建一个空对象
		var ret = jq.call(obj); //2、将jq中的参数复制进obj中
		obj._proto_ = jq.prototype; //将对象的_proto_属性指向jq.prototype
		if (ret instanceof obj) { //4、返回值，如果为对象，则返回对象，否则返回obj
			return ret;
		} else {
			return obj
		}
	})();
	 */
	var conflict;
	var jq = function(selectors) {
		return new jq.prototype.init(selectors); //调用$方法，创建一个对象，便于使用this变量
	}
	jq.prototype = {
		constructor: jq,
		init: function(selectors) {
			var dom = document.querySelectorAll(selectors);
			this.length = dom.length;
			for (var i = 0; i < dom.length; i++) {
				this[i] = dom.item(i);
			}
		},

		each: function(fun) {
			for (var i = 0; i < this.length; i++) {
				fun.call(this[i], i, this[i]);
			}
			return this;
		},
		hide: function() {
			this.each(function() {
				this.style.display = "none";
			});
		},
		length: 0,
		splice: Array.prototype.splice,
		toString: String.prototype.toString,
		push: push,
		sort: [].sort
	}
	jq.prototype.init.prototype = jq.prototype; //将jq的方法原型全部指向init原型，便于this调用。

	jq.extends = function(orgin, append) {

	};
	jq.callback = function() {

	}

	if (window.$) {
		conflict = window.$;
	}
	jq.noConflict = function() {
		window.$ = conflict;
	}
	window.$ = jq;
	window.jq = jq;
})(window);