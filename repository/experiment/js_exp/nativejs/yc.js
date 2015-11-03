;
// (function(window) {
var document = window.document,
	navigator = window.navigator,
	_$ = window.$,
	splice = Array.prototype.splice,
	slice = Array.prototype.slice,
	push = Array.prototype.push,
	sort = Array.prototype.sort,
	toString = Object.prototype.toString,
	class2type = {},
	cache = {},
	count;

var yc = function(selector) {
	return new yc.fn.init(selector);
}
yc.fn = yc.prototype = {
	constructor: yc,
	init: function(selector, context) {
		var doms;
		context = context || document;
		if (yc.type(selector) == "string") {
			doms = context.querySelectorAll(selector);
		} else {
			doms = selector;
			selector = "DOM";
		}
		this.selector = selector;
		this.length = doms.length;
		for (var i = 0, size = doms.length; i < size; i++) {
			this[i] = doms[i];
		}
	},
	version: "1.0",
	length: 0,
	splice: splice,
	slice: slice,
	push: push,
	sort: sort,
	size: function() {
		return this.length;
	},
	each: function(fun, param) {
		yc.each(this, fun, param);
	},
	get: function(i) {
		if (i >= 0 && i < this.length) {
			return this[i];
		} else {
			return this;
		}
	},
	eq: function(i) {
		return this.pushStack(this.get(i));
	},
	pushStack: function(eles) {
		var tmp = this.makeArray(eles);
		return this.constructor(tmp);
	},
	makeArray: function(eles) {
		var ret = [];
		if (yc.type(eles) !== "Array") {
			//对于非数组对象进行数组对象转换
			ret.push(eles);
		} else {
			for (var i = 0; i < eles.length; i++) {
				ret[i] = eles[i];
			}
		}
		return ret;
	}
};
/**
 * 待定
 * @param  {[type]} a [description]
 * @param  {[type]} b [description]
 * @return {[type]}   [description]
 */
yc.extend = yc.fn.extend = function(a, b, deep) {
	var _b = yc.deepCopy(b),
		a = a || this,
		i = 0;
	if (!deep && yc.type(b) == "object") {
		for (i in b) {
			a[i] = _b[i];
		}
	} else {

	}
	return a;
}
yc.isPlainObject = function(a) {
	if (yc.type(a) !== "object") {
		return false;
	}
	for (var key in a) {
		if (/object|array/.test(yc.type(a[key]))) {
			break;
			return false;
		}
	}
	return true;
}


yc.deepCopy = function(a) {
	var _a, i = 0;
	if (yc.type(a) == "array") {
		_a = [];
		for (; i < a.length; i++) {
			var tmp;
			if (yc.type(a[i]) == "array" || yc.type(a[i]) == "object") {
				tmp = arguments.callee(a[i]);
			} else {
				tmp = a[i];
			}
			_a[i] = tmp;
		}
	} else if (yc.type(a) == "object") {
		_a = {};
		for (i in a) {
			var tmp;
			if (yc.type(a[i]) == "array" || yc.type(a[i]) == "object") {
				tmp = arguments.callee(a[i]);
			} else {
				tmp = a[i];
			}
			_a[i] = tmp;
		}
	} else {
		_a = a;
	}
	return _a;
}

yc.type = function(obj) {
	return class2type[toString.call(obj)];
}
yc.prototype.init.prototype = yc.prototype;
yc.noConflict = function() {
	window.$ = _$;
}
yc.each = function(arr, fun, param) {
	var l = arr.length,
		i = 0;
	for (; i < l; i++) {
		fun.apply(arr[i], param ? [i, arr[i]].push(param) : [i, arr[i]]);
	}
}
yc.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type["[object " + name + "]"] = name.toLowerCase();
});

yc.sheet = {
	addClass: function(ele, className) {
		if (!this.hasClass(ele, className)) {
			ele.className += " " + className;
		}
	},
	hasClass: function(ele, className) {
		var tc = ele.className.split(" ");
		for (var i = 0; i < tc.length; i++) {
			if (tc[i] === className) {
				return true;
			}
		}
		return false;
	},
	removeClass: function(ele, className) {
		var cna = ele.className.split(" ");
		for (var i = 0; i < cna.length; i++) {
			if (cna[i] === className) {
				cna.splice(i, 1);
			}
		}
		ele.className = cna.join(" ");
	},
	toggleClass: function(ele, className) {
		if (this.hasClass(ele, className)) {
			this.removeClass(ele, className);
		} else {
			this.addClass(ele, className);
		}
	},
	css: function(ele, sheetName, value) {
		if (vaule) {
			ele.style[sheetName] = value;
		} else {
			if (document.defaultView) {
				return document.defaultView.getComputedStyle(ele, null)[sheeName];
			} else {
				return ele.currentStyle[sheeName];
			}
		}
	}
}
yc.position={
	position:function(dom){
		if(){

		}else{

		} 
	},
	offset:function(dom){

	}
};
yc.event = {
	// event(事件)工具集 github.com/markyun
	readyEvent: function(fn) {
		if (fn == null) {
			fn = document;
		}
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = fn;
		} else {
			window.onload = function() {
				oldonload();
				fn();
			};
		}
	},
	addEvent: function(element, type, handler) {
		if (element.addEventListener) {
			//事件类型、需要执行的函数、是否捕捉
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent('on' + type, function() {
				handler.call(element);
			});
		} else {
			element['on' + type] = handler;
		}
	},
	// 移除事件
	removeEvent: function(element, type, handler) {
		if (element.removeEnentListener) {
			element.removeEnentListener(type, handler, false);
		} else if (element.datachEvent) {
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null;
		}
	},
	// 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
	stopPropagation: function(ev) {
		if (ev.stopPropagation) {
			ev.stopPropagation();
		} else {
			ev.cancelBubble = true;
		}
	},
	// 取消事件的默认行为
	preventDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	// 获取事件目标
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	// 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
	getEvent: function(e) {
		var ev = e || window.event;
		if (!ev) {
			var c = this.getEvent.caller;
			while (c) {
				ev = c.arguments[0];
				if (ev && Event == ev.constructor) {
					break;
				}
				c = c.caller;
			}
		}
		return ev;
	},
	trigger: function(element, type) {
		var e = new Event(type, {
			"bubbles": true,
			"cancelable": false
		});
		if (element.dispatchEvent) {
			element.dispatchEvent(e)
		} else if (element.fireEvent) {
			element.fireEvent('on' + type, e);
		}
	}

}
yc.extend(yc.fn, {
	addEvent: function() {

	},
	fireEvent: function() {

	},
	removeEvent: function() {

	},
	readyEvent: function() {

	}

});
yc.callback = function() {
	this.callList = [];
}
yc.callback.prototype = {
	add: function() {

	},
	remove: function() {

	},
	fire: function() {

	}
}

yc.data = {
	add: function() {

	},
	remove: function() {

	},
	get: function() {

	}
}



if (typeof define == "function" && define.amd) {
	define(function() {
		return yc;
	});
} else if (typeof module == "function" && module.exports) {
	module.exports = yc;
} else {
	window.yc = yc;
}
window.$ = yc;


// })(window)