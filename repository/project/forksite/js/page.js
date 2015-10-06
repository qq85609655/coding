/**
 * 仿百度搜索的分页模式
 * 该处使用js原生程序编写，兼容ie9+
 * @param {[type]} option [description]
 */
function Page(option) {
	this.index = option.index || 1,
		this.size = option.size || 4,
		this.totle = option.totle || 6, //测试数据8 10 11 19 23
		this.startindex = 1,
		this.endindex = this.size > this.totle ? this.totle : this.size,
		this.pagecontainer = option.container || document,
		this.callback = option.callback;
}
Page.prototype.render = function() {
	var domstr = "<div class='page'>",
		start = this.startindex,
		end = this.endindex;
	if (start > 1) {
		domstr += "<a class='page-index page-up'>&lt;上一页</a>";
	}
	while (start <= end) {
		var cls = "";
		start === this.index ? cls = "cur-index" : cls = "";
		domstr += "<a class='page-index " + cls + "'>" + start + "</a>";
		++start;
	}
	if (end < this.totle) {
		domstr += "<a class='page-index page-down'>下一页&gt;</a>";
	}
	domstr += "</div>";
	this.pagecontainer.innerHTML = domstr;
}
Page.prototype.init = function() {
	this.render();
	this.addListener();
}
Page.prototype.addListener = function() {
	var _this = this;
	this.pagecontainer.addEventListener("click", function(event) {
		var tar = event.target;
		tar.classList.contains("page-index") && (function() {
			var size = _this.size,
				totle = _this.totle;
			if (tar.classList.contains('page-up')) {
				--_this.index;
			} else if (tar.classList.contains('page-down')) {
				++_this.index;
			} else {
				_this.index = ~~(tar.innerText);
			}
			//原则：将当前索引置于size/2+1处。
			//对于范围在[1,totle]区间的值，判断index在他的两个边界是否超长，来决定startindex的值。
			//其中的两个边界中，左边界是index-（size/2+1）,右边界为index+（size/2-1）
			if (_this.index - (size / 2 + 1) <= 0) {
				//1、当前索引小于size/2+1时，开始索引为1;
				_this.startindex = 1;
			} else if (_this.index + size / 2 - 1 >= totle) {
				//2、当前索引大于size/2+1且结束索引+size/2-1的值小于总量时，开始索引为总量-size;
				_this.startindex = totle - size + 1;
			} else if (_this.index > size / 2 + 1 && _this.index + size / 2 - 1 < totle) {
				//3、当前索引大于size/2+1且结束索引+size/2-1的值大于总量时，开始索引为当前索引减去size/2
				_this.startindex = _this.index - size / 2;
			}
			_this.endindex = _this.startindex + size > totle ? totle : _this.startindex + size - 1;
			_this.render();
			_this.callback && _this.callback.call(tar, _this.index);
		})();
	}, false);

}