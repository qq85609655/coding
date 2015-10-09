;
(function(window) {
	var document = window.document,
		navigator = window.navigator,
		location = window.location,
		_$ = window.$,
		splice = Array.prototype.splice,
		slice = Array.prototype.slice,
		push = Array.prototype.push,
		sort = Array.prototype.sort,
		toString = Object.prototype.toString,
		class2type = {},
		cache = {};

	var yc = function(selector) {
		return new yc.fn.init(selector);
	}
	yc.fn = yc.prototype = {
			constructor: yc,
			init: function(selector, context) {
				this.selector = selector;
				context = context || document;
				var doms = context.querySelectorAll(selector);
				var size = this.length = doms.length;
				for (var i = 0; i < size; i++) {
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
			get: function() {

			},
			eq: function() {

			},
			pushStack: function() {

			},
			makeArray: function() {

			},
			toArray: function() {

			}
		}
		/**
		 * 待定
		 * @param  {[type]} a [description]
		 * @param  {[type]} b [description]
		 * @return {[type]}   [description]
		 */
	yc.extend = yc.fn.extend = function(a, b) {

		var _b, a = a || this,
			i = 0;
		if (yc.type(b) == "Object") {
			_b = {};
			for (i in b) {
				a[i] = b[i]
			}
		} else if (yc.type(b) == "Array") {
			_b = [];
			for (; i < b.length; i++) {
				a[i] = b[i]
			}
		}
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
		for (; i < size; i++) {
			fun.apply(arr[i], [i, arr[i]].push(param));
		}
	}
	yc.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	yc.event = {
		// event(事件)工具集，来源：github.com/markyun
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
		// 视能力分别使用dom0||dom2||IE方式 来绑定事件
		// 参数： 操作的元素,事件名称 ,事件处理程序
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


})(window)