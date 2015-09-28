(function($) {
	$(function() {
		$("[data-reset=select]").each(function(index, el) {
			var tar = $(el),
				sub = tar.find("option"),
				s = "",
				n = 0;
			domstr = "<div class='default-reset-select'><div class='reset-select-show'>Volvo<i class='thriangle-down'></i></div><ul class='reset-select-ul'>";
			for (var i = 0; i < sub.length; i++) {
				s = "";
				if (sub.eq(i).attr("selected")) {
					s = " active";
					n = i;
				}
				domstr += "<li class='reset-select-li" + s + "\' >" + sub.eq(i).text() + "</li>"
			}
			domstr += "</ul></div>";
			tar.after(domstr);

			function init() {
				//触发初始值
				//设置宽度
				tar.next(".default-reset-select").css({
					"width": tar.width() + "px"
				}).offset({
					"top": tar.offset().top,
					"left": tar.offset().left
				}).find(".reset-select-li").eq(n).trigger("click");
				tar.css("visibility", "hidden");
			}
			setTimeout(init, 0);
		});
		$(document).on("click", ".default-reset-select .reset-select-li,.default-reset-select .thriangle-down", function(event) {
			$this = $(this);
			$this.hasClass("thriangle-down") && (function() {
				//进行select组件的下拉框按钮模拟
				$this.parent(".reset-select-show").next().toggle("fast");
				event.stopPropagation();
			})();
			$this.hasClass("reset-select-li") && (function() {
				//进行select组件的下拉框选中按钮模拟
				var txt = $this.text();
				$this.siblings().removeClass("active").parent(".reset-select-ul").prev(".reset-select-show").html(' <i class="thriangle-down"></i>' + txt);
				$this.addClass("active");
				var idx = $this.index();
				$this.parents(".default-reset-select").prev("[data-reset=select]").find("option").eq(idx).attr("selected", "selected"); //对原生按钮设置选中
			})();
		});
		$(document).on("click", function() {
			$(".default-reset-select .reset-select-ul").hide(); //对于界面中的所有的reset select的关闭
		});
	});
})(jQuery)