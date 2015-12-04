(function($) {
	$.fn.tabV2 = function(options) {
		var opts = $.extend({
				tar: $(this),
				body: ""
			},
			options);
		var tab = new TabV2(opts);
		tab.init();
	}

	function TabV2(opts) {
		this.tar = opts.tar;
		this.opts = opts;
	}
	TabV2.prototype.init = function() {
		this.addToggleListener();
	}
	TabV2.prototype.addToggleListener = function() {
		var list = this.opts.body.split(",");
			list.push(".yc-tab-body");
		this.tar.on("click", this.opts.proxy || ".yc-tab-title", function(e) {
			var _this = $(this),
				tmp, index, tarDom;
			index = _this.index();
			_this.siblings().removeClass("active");
			tmp = _this.addClass("active").parent().siblings();
			for (var i = 0; i < list.length; i++) {
				tarDom = tmp.find(list[i]);
				if (tarDom.length) {
					break;
				}
			}
			tarDom && tarDom.addClass("yc-tab-hide").eq(index).removeClass("yc-tab-hide");
		})
	}
})($);

$(function() {
	$(".yc-tab-v2").tabV2({
		proxy: ".yc-vertab-title,.yc-tab-title",
		body: ".yc-vertab-body,.yc-tab-body"
	});
})