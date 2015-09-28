(function($) {
	$.fn.tipbox = function(options) {
		if (typeof options == "string" && options == "close") {
			$(this).siblings(".tipbox") && $(this).siblings(".tipbox").remove();
		} else if (options instanceof Object) {
			var opts = $.extend(true, {
				pos: "right",
				msg: "hello world!"
			}, options || {});
			var pos = opts.pos;
			var msg = opts.msg;
			if (!!($(this).children())) {
				var dom = $(this);
			} else {
				var dom = $(this).children();
			}
			dom.after('<div class="tipbox"><div class="tbt"></div><div class="tbb">' + msg + '</div>');
			dom.parent().css({
				"position": "relative"
			});
			var top = dom.parent().height();
			dom.siblings('.tipbox').css({
				"top": (top) + "px"
			});
		}
	}
})(jQuery);