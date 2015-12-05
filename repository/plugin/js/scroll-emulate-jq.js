;

function Scroll(_tar) {
	//初始化滚动区域，依次为滚动集合区域、滚动区域、滚动条、滚动槽
	this.target = _tar;
	this.domarea = _tar.find(".scroll-contain-body");
	this.refdom = this.domarea.parent();
	this.domscrollbar = _tar.find(".scroll-bg");
	this.domslotbar = _tar.find(".scroll-bar");
	//滚轮参数
	this.areaPerWheelPlex = 70; //滚轮滚动360度，内容区滚动的距离
	this.maxAreaHeight = this.domarea.height() - this.refdom.height();
	this.maxtop = this.domslotbar.height() - this.domscrollbar.height();
	this.barPerWheelPlex = Math.ceil(this.maxtop / Math.ceil(this.maxAreaHeight / this.areaPerWheelPlex));
};
/**
 * 初始化滚动条监听区域事件
 * @return {[type]} [description]
 */
Scroll.prototype.init = function() {
	this.render();
	if (this.maxAreaHeight < 0) {
		this.domscrollbar.hide();
		this.domslotbar.hide();
	} else {
		this.dragBarListen();
		this.mouseWheelListen();
		this.slotClickListen();
	}

};
/**
 * 滚动条监听区域dom渲染，此处暂时不予添加
 * @return {[type]} [description]
 */
Scroll.prototype.render = function() {

};
/**
 * 初始化滚动条拖拽事件
 * @return {[type]} [description]
 */
Scroll.prototype.dragBarListen = function() {
	function Drag(_this) {
		this.depe = _this;
		this.tar = _this.domscrollbar;
		this.dragflag = false;
		this.x;
		this.y;
		this.ox;
		this.oy;
		this.top;
		this.maxtop = _this.maxtop;
	}
	Drag.prototype.startDragListen = function() {
		var _this = this;
		this.tar.on("mousedown", function(event) {
			_this.dragflag = true;
			_this.x = event.clientX;
			_this.y = event.clientY;
			_this.oy = _this.y;
			event.stopPropagation(); //阻止底层滑动槽接受冒泡事件
		});
	}
	Drag.prototype.dragingListen = function() {
		var _this = this;
		$(document).on("mousemove", function(event) {
			if (_this.dragflag) {
				var offsety = event.clientY - _this.oy;
				_this.depe.scrollBar(offsety); //滚动条滚动
				_this.oy = event.clientY; //实现高度的无累计叠加
				_this.depe.dragScrollArea(-offsety); //内容滚动
			}
		});
	}
	Drag.prototype.endDragListen = function() {
		var _this = this;
		$(document).on("mouseup", function() {
			_this.dragflag = false;
		});
	}
	Drag.prototype.initDrag = function() {
		this.startDragListen();
		this.dragingListen();
		this.endDragListen();
	}

	new Drag(this).initDrag();
};
/**
 * 初始化滚动条监听区域滚轮事件
 * @return {[type]} [description]
 */
Scroll.prototype.mouseWheelListen = function() {
	var _this = this;
	this.target.on("mousewheel", function(event) {
		event = event ? event : window.event;
		event.delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta / 120 : -(event.detail || 0) / 3; //上正下负
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
	this.domslotbar.on("mousedown", function(event) {
		var ev = event || window.event;
		var dompos = _this.domscrollbar.position();
		var disy = ev.clientY - dompos.top - _this.domscrollbar.height() / 2;
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
	var top = parseInt(this.domscrollbar.css("top")) + offsety;
	if (top < 0) {
		top = 0;
	} else if (top > this.maxtop) {
		top = this.maxtop;
	}
	// console.log("top=" + top);
	this.domscrollbar.css("top", top + "px");
};
/**
 * 滚轮驱动内容区滚动方法
 * @return {[type]} [description]
 */
Scroll.prototype.scrollArea = function(offsety) {
	var mtt = parseInt(this.domarea.css("margin-top")) + offsety;
	if (mtt > 0) {
		mtt = 0;
	} else if (mtt < -this.maxAreaHeight) {
		mtt = -this.maxAreaHeight;
	}
	this.domarea.css("margin-top", mtt + "px");
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