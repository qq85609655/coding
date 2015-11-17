$(function() {
	var mask = $(".mask");
	var about = $(".about");
	var loading = $(".loading");
	var alertPl = $(".alert");
	var upfilebtn = $(".upfile-btn");
	var submitbtn = $(".submit-btn");
	var $fileName = $(".div-filename");
	var number = /^[0-9]*$/;
	$(".grp_tab_1").tab();
	$(".main-full").on("click", ".header-home,.about,.a-close,.cal-btn,.upload-btn,.submit-btn", function(e) {
		var tar = $(this);
		e.stopPropagation();
		tar.hasClass("header-home") && (function() {
			mask.show();
			about.show();
		})();
		tar.hasClass("a-close") && (function() {
			$(document).trigger('click');
		})();
		tar.hasClass("cal-btn") && (function() {
			var year = $(".input-year").val();
			var month = $(".input-month").val();
			if (!number.test(year) || !year.trim()) {
				alertPl.show().find(".alert-pannel").text("年终奖金额输入不合法!");
				mask.show();
				return;
			}
			if (!number.test(month) || !month.trim()) {
				alertPl.show().find(".alert-pannel").text("月计税工资额输入不合法!");
				mask.show();
				return;
			}
			loading.show();
			mask.show();
			calulate(parseFloat(year), parseFloat(month));
		})();
		tar.hasClass("upload-btn") && (function() {
			upfilebtn.trigger("click");
			upfilebtn.get(0).onchange = (function() {
				var file = upfilebtn.val();
				file = file.split(/\\/);
				$fileName.text(file[file.length - 1]);
			});
		})();

	});
	$(document).on("click", function() {
		mask.hide();
		about.hide();
		loading.hide();
		alertPl.hide();
	});
	$(".alert").on("click", ".a-close", function() {
		mask.hide();
		alertPl.hide();
		loading.hide();
	});

	function calulate(a, b) {
		$.ajax({
			url: "",
			data: {
				"bonus": a,
				"salary": b
			}
		}).success(function(data) {
			data=JSON.parse(data);
			for (var i = 0; i < data.length; i++) {
				$(".span-out-" + i).find(".orange").text(data[i]);;
			}
			loading.hide();
			mask.hide()
		}).fail(function() {
			alertPl.show().find(".alert-pannel").text("计算失败!");
			loading.hide();
		}).complete(function() {

		});
	}
});