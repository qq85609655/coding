(function($) {
	$.fn.maskHislist = function(options) {
		var opts = $.extend({
			top: "",
			left: "",
			clickCallback:null
		}, options);
		var clickCallback=opts.clickCallback;
		var renderDOM = "<div class='ui div_f_mask'>" +
			"<div class='div_main_f_content_mask'>" +
			"<div class='div_search_t_bg_mask'>" +
			"<div class='div_input_hislist'>" +
			"<input class='ui_input_t_mask' type='text' placeholder='请输入搜索内容'  />	" +
			"</div>" +
			"<a class='a_search_t_mask'>" +
			"<span class='search_click_t_mask'></span>" +
			"</a>" +
			"</div>" +
			"</div>" +
			"</div>";
		$("body").append(renderDOM);
		$('.a_search_t_mask').on("touchstart", function() {
			var q = $('.ui_input_t_mask').val();
			if (q != null && q != '') {
				window.localStorage.setItem("queryCondition", q);
				clickCallback&&clickCallback(q);
			}
		});
		$(".ui_input_t_mask").histips({
			recordBtn: $(".a_search_t_mask")
		});
		var left = opts.left-~~$(".div_input_hislist").width();
		var top = opts.top-4;
		$(".div_main_f_content_mask").css({
			"position": "absolute",
			"left": left+"px",
			"top": top+"px",
			"z-index": "1000"
		});
		$(".div_f_mask").on("touchstart", function() {
			$(this).remove();
			return false;
		});
	}
})(af)