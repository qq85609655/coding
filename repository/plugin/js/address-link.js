$(function() {
	var $txtarea = $(".adr-text-area"),
		$province = $(".dl-province");
	$panel = $(".adr-select-area");
	var interMedia = {
		selectData: {
			pro: "",
			city: "",
			area: "",
			street: ""
		},
		initRender: function() {
			var domStr = "",
				obj;
			if (addressConfig.street) {
				$(".adr-itms-street").removeClass('hide');
				$(".adr-tt-street").removeClass('hide');
			}
			for (var item in province) {
				domStr += "<dt class='dt-adr'>" + item + "</dt><dd class='dd-adr'>";
				obj = province[item];
				for (var i = 0; i < obj.length; i++) {
					domStr += "<span class='adr-itm adr-pro' data-code='" + obj[i][0] + "'>" + obj[i][1][0] + "</span>";
				}
				domStr += "</dd>";
			}
			$province.html(domStr);

		},
		getNextKey: function(tkey) {
			var count = 0,
				ret;
			for (var key in this.selectData) {
				if (count == 1) {
					ret = key;
					break;
				}
				if (key == tkey) {
					count++;
				}
			}
			return ret;
		},
		proxyGetNextKey: function(code, clz) {
			if (hooks[code]) {
				return this.getNextKey(this.getNextKey(clz));
			} else {
				return this.getNextKey(clz);
			}
		},
		receiveRefresh: function() {
			var domStr = "";
			for (var key in this.selectData) {
				if (this.selectData[key]) {
					domStr += this.selectData[key] + "<strong class='st-sep'>/</strong>";
				}
			}
			$txtarea.html(domStr);
		},
		resetInitData: function(from) {
			var flag = false,
				count = 0;
			for (var key in this.selectData) {
				if (key == from) {
					flag = true;
				}
				if (flag) {
					this.selectData[key] = "";
					$(".adr-itms-" + key).empty();
				}
			}
		},
		getNextFloor: function(code, clz) {
			var ret = [],
				flag = 0,
				tmp;
			var domStr = "";
			for (var i = 0; i < cities.length; i++) {
				var obj = cities[i];
				tmp = flag;
				if (obj.parent_code == code) {
					flag = 1;
					domStr += "<span class='adr-itm adr-" + clz + "' data-code='" + obj.code + "'>" + obj.name + "</span>";
				} else {
					flag = 0;
				}
				if (flag - tmp == -1) {
					// break; //依靠数据连续的规则，优化遍历，提高效率（实现触发器）
				}
			}
			$(".adr-itms-" + clz).html(domStr);
			(clz != "street" || addressConfig.street) && $(".adr-tt-" + clz).trigger("click");
		}
	};
	$(".address-link").on("click", ".li-tab-tt,.adr-input-area,.adr-itm", function(e) {
		var tar = $(this);
		e.stopPropagation();
		tar.hasClass('li-tab-tt') && (function() {
			var idx = tar.index();
			tar.siblings().removeClass('active');
			tar.addClass('active').parent().next().children().removeClass("active").eq(idx).addClass('active');
		})();
		tar.hasClass('adr-input-area') && (function() {
			$panel.toggleClass("hide");

		})();
		tar.hasClass('adr-itm') && (function() {
			tar.parents(".li-tab-bd").find(".adr-itm").removeClass('checked');
			tar.addClass('checked');
			var clz = tar.attr("class").match(/adr-(\w+)/g)[1].replace(/adr-/, ""),
				code = tar.data("code");
			interMedia.selectData[clz] = tar.text();
			var nextkey = interMedia.proxyGetNextKey(code, clz);
			interMedia.resetInitData(interMedia.getNextKey(clz)); //联动数据重置
			interMedia.receiveRefresh();
			interMedia.getNextFloor(code, nextkey); //对于直辖市等特殊数据添加hook
			if (clz == "area") {
				addressConfig.getTargetAddress(code);
			}
		})();
		$(document).on("click", function() {
			$panel.addClass("hide");
		})
	});
	interMedia.initRender();
});