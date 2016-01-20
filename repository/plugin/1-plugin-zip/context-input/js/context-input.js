$(function() {
	var $list = $(".ul-c-i"),
		$ipt = $(".ipt-c-i"),
		timer;
	$(".d-context-input").on("click", ".s-c-t,.li-c-i,.ipt-c-i", function(e) {
		var tar = $(this);
		tar.hasClass('s-c-t') && (function() {
			var iptval = $ipt.val();
			alert(iptval);
		})();
		tar.hasClass('li-c-i') && (function() {
			$ipt.val(tar.text());
		})();
		tar.hasClass('ipt-c-i') && (function() {
			$ipt.val() && $list.removeClass('hide');
			e.stopPropagation();
		})();
	});
	$ipt.on("keydown", function() {
		timer && clearTimeout(timer);
		timer = setTimeout(function() {
			var iptval = $ipt.val();
			if (iptval) {
				getContext(iptval);
			} else {
				$list.empty().addClass('hide');
			}
		}, 800);
	});
	$(document).on("click", function() {
		$list.addClass('hide');
	});

	function getContext(iptval) {
		var obj;
		$.ajax({
			url: "js/context.json",
			data: iptval
		}).done(function(data) {
			obj = data;
		}).fail(function() {
			$list.empty().addClass('hide');
			obj = {
				"context": ["搜索", "sousuo", "list", "json"]
			}; //假数据，解决file://通过ajax获取不到数据的处理，用于演示，线上请删除
		}).always(function() {
			try {
				renderList(obj);
			} catch (e) {
				console.log("ss");
			}

		});

		function renderList(data) {
			var dom = "",
				lst = data.context;
			if (lst.length) {
				for (var i = 0; i < lst.length; i++) {
					dom += "<li class='li-c-i'>" + lst[i] + "</li>"
				}
				$list.html(dom).removeClass('hide');
			}
		}
	}
});