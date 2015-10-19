;
/**
 * 模拟百度地图滚动条，重置默认滚动条，原生DOM API实现，未进行IE8-的兼容
 * 模拟滚动条，实现滚动显示封装
 * @param {[type]} _tar 滚动区域DOM
 */
function Scroll(_tar) {
	//初始化滚动区域，依次为滚动集合区域、滚动区域、滚动条、滚动槽
	this.target = _tar;
	this.domarea = _tar.firstElementChild;
	this.domscrollbar = this.domarea.nextElementSibling.querySelector(".scroll-bg");
	this.domslotbar = this.domscrollbar.parentNode;
	//滚轮参数
	this.areaPerWheelPlex = 70; //滚动360度，内容区滚动的距离
	this.maxAreaHeight = this.domarea.offsetHeight - this.target.offsetHeight;
	this.maxtop = this.domslotbar.offsetHeight - this.domscrollbar.offsetHeight;
	this.barPerWheelPlex = Math.ceil(this.maxtop / Math.ceil(this.maxAreaHeight / this.areaPerWheelPlex));
};
/**
 * 初始化滚动条监听区域事件
 * @return {[type]} [description]
 */
Scroll.prototype.init = function() {
	this.render();
	this.dragBarListen();
	this.mouseWheelListen();
	this.slotClickListen();
};
/**
 * 滚动条监听区域dom渲染，此处不予添加
 * @return {[type]} [description]
 */
Scroll.prototype.render = function() {

};
/**
 * 初始化滚动条拖拽事件
 * @return {[type]} [description]
 */
Scroll.prototype.dragBarListen = function() {
	function Drag(tar) {
		this.tar = tar;
		this.dragflag = false;
		this.x;
		this.y;
		this.ox;
		this.oy;
		this.top;
		this.maxtop = this.tar.parentNode.offsetHeight - this.tar.offsetHeight;
	}
	Drag.prototype.startDragListen = function() {
		var _this = this;
		this.tar.addEventListener("mousedown", function(event) {
			_this.dragflag = true;
			_this.x = event.clientX;
			_this.y = event.clientY;
			_this.oy = _this.y;
			_this.top = parseInt(window.getComputedStyle(this).top);
			event.stopPropagation(); //阻止底层滑动槽接受事件冒泡
		});
	}
	Drag.prototype.dragingListen = function() {
		var _this = this;
		document.addEventListener("mousemove", function(event) {
			if (_this.dragflag) {
				var offsety = event.clientY - _this.oy;
				_this.depe.scrollBar(offsety);
				_this.oy = event.clientY;
				_this.depe && _this.depe.dragScrollArea(-offsety);
			}
		});
	}
	Drag.prototype.endDragListen = function() {
		var _this = this;
		document.addEventListener("mouseup", function() {
			_this.dragflag = false;
		});
	}
	Drag.prototype.initDrag = function(_this) {
		this.depe = _this;
		this.startDragListen();
		this.dragingListen();
		this.endDragListen();
	}
	new Drag(this.domscrollbar).initDrag(this);
};
/**
 * 初始化滚动条监听区域滚轮事件
 * @return {[type]} [description]
 */
Scroll.prototype.mouseWheelListen = function() {
	var _this = this;
	this.target.addEventListener("mousewheel", function(event) {
		event = event ? event : window.event;
		event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3; //上正下负
		var areaoffsety = (event.delta) * _this.areaPerWheelPlex;
		var baroffsety = event.delta * _this.barPerWheelPlex;
		_this.scrollArea(areaoffsety); //采用marginTop，需要上正下负的值。 
		_this.scrollBar(-baroffsety); //采用绝对定位，需要上负下正的值。
		event.stopPropagation();
	});
};
/**
 * 初始化滚动条滚动槽点击事件
 * @return {[type]} [description]
 */
Scroll.prototype.slotClickListen = function() {
	var _this = this;
	this.domslotbar.addEventListener("mousedown", function(event) {
		var ev = event || window.event;
		var dompos = _this.domscrollbar.getBoundingClientRect();
		var disy = ev.clientY - dompos.top - dompos.height / 2;
		_this.scrollBar(disy);
		_this.dragScrollArea(-disy);
		event.stopPropagation();
	});
};
/**
 * 滚动条跟随滚轮滚动方法
 * @return {[type]} [description]
 */
Scroll.prototype.scrollBar = function(offsety) {
	var top = parseInt(window.getComputedStyle(this.domscrollbar).top) + offsety;
	if (top < 0) {
		top = 0;
	} else if (top > this.maxtop) {
		top = this.maxtop;
	}
	console.log("top=" + top);
	this.domscrollbar.style.top = top + "px";
};
/**
 * 滚轮驱动内容区滚动方法
 * @return {[type]} [description]
 */
Scroll.prototype.scrollArea = function(offsety) {
	var mt = parseInt(window.getComputedStyle(this.domarea).marginTop),
		mtt = mt + offsety;
	if (mtt > 0) {
		mtt = 0;
	} else if (mtt < -this.maxAreaHeight) {
		mtt = -this.maxAreaHeight;
	}
	this.domarea.style.marginTop = mtt + "px";
};
/**
 * 拖动驱动内容区滚动方法
 * @param  {[type]} offsety [description]
 * @return {[type]}         [description]
 */
Scroll.prototype.dragScrollArea = function(offsety) {
	offsety = Math.round(offsety * (this.maxAreaHeight / this.maxtop));
	this.scrollArea(offsety);
}