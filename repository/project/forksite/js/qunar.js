$(function() {
	var preItem;
	$(".div-cont-tt").on("click", "input[type=radio]", function() {
		var _this = $(this);
		var m = _this.data("m");
		tar = _this.parent().siblings().hide().filter(m).show();
	})
})