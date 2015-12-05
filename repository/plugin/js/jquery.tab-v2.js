(function($) {
	$.fn.tabV2 = function(options) {
		var opts = $.extend({
				tar: $(this)
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
		this.tar.on("click", this.opts.proxy || ".yc-tab-title", function(e) {
			var _this = $(this);
			var index = _this.index();
			_this.siblings().removeClass("active");
			_this.addClass("active").parent().siblings().children().addClass("yc-tab-hide").eq(index).removeClass("yc-tab-hide");
		})
	}
})($);

$(function() {
	$(".yc-tab-v2").tabV2({
		proxy: ".yc-vertab-title,.yc-tab-title"
	});
})