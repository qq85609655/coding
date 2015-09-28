/**
 * 使用办法：
 * $(".ui_input_t").histips({
		recordBtn: $(".a_search_t");  点击按钮必须指定，因为要指定历史记录的时机
	});

	dom结构：
	<div >
		<input class="ui_input_t" type="text" placeholder="请输入搜索内容" />	
	</div>
	<a class="a_search_t">
		<span class="search_click_t"></span>
	</a>

	存在问题：css样式尚未实现自动设置，使用者可以暂时手动设置，后续会实现优化
 * 
 */
(function($) {
	$.fn.histips = function(options) {
		var opts = $.extend({
			recordBtn: "",
			recordSize: 4
		}, options);
		var inputtext = $(this);
		var recordbtn = opts.recordBtn;
		var DOMHisDiv;
		var recordSize = opts.recordSize;
		var ul_hislist;
		$("<div class='ul_hislist'></div>").insertAfter(inputtext);
		recordbtn.on("touchstart", function() {
			//如果输入为空或者空格不给记录，保存时去除前后空格
			if (isNull(inputtext.val())) {
				ul_hislist && ul_hislist.hide();
				return;
			}
			//点击查询，记录查询历史并隐藏显示的历史,同词检测并置顶  对输入自动提示匹配
			var hislist = localStorage.getItem("histips") && eval("(" + localStorage.getItem("histips") + ")") || {};
			var i = getNextValueFormJson(hislist); //获取历史记录中排名最大值
			hislist[strTrim(inputtext.val())] && delete hislist[strTrim(inputtext.val())];
			hislist[strTrim(inputtext.val())] = i;
			dealListJsonSize(hislist, recordSize);
			localStorage.setItem("histips", JSON.stringify(hislist));
			ul_hislist && ul_hislist.hide();
			// event.stopPropagation();
		});
		inputtext.on("input touchstart", function() {
			//输入时同词匹配，词语匹配时去除前后空格
			var hislist = localStorage.getItem("histips") && eval("(" + localStorage.getItem("histips") + ")");
			var domhtml = "<ul class='ul_hislist_n'>";
			var hasItem = false;
			for (var key in hislist) {
				if (key.indexOf(strTrim(inputtext.val())) != -1) {
					domhtml += "<li class='li_hislist'>" + key + "</li>";
					hasItem = true;
				}
			}
			if (hasItem) domhtml += "<li class='li_clearhis'>清除历史记录</li>";
			domhtml += "</ul>";
			ul_hislist = $(".ul_hislist");
			ul_hislist.show();
			ul_hislist.html(domhtml);
			console.log("this is input");
			event.stopPropagation();
		});
		$(".ul_hislist").delegate('li', 'touchstart', function(event) {
			ul_hislist && ul_hislist.hide();
			if ($(this).hasClass("li_clearhis")) {
				localStorage.removeItem("histips");
				return;
			}
			inputtext.val($(this).text());
			event.stopPropagation();
		});
		$(".ui_header_t").on('touchstart', function(event) {
			event.stopPropagation();
		});
		$(document).on('touchstart', function(event) {
			var elem = $(event.target).parents();
			ul_hislist && ul_hislist.hide();
		});
	}

	function getNextValueFormJson(json) {
			var max = 0;
			if (json && Object.keys(json).length > 0) {
				for (var key in json) {
					if (json[key] > max) max = json[key];
				}
			}
			return ++max;
		}
		/**
		 * 处理历史记录条数，保持条数在规定的条数范围内防止历史记录条数过多
		 * @param  {[type]} json [description]
		 * @param  {[type]} size [description]
		 * @return {[type]}      [description]
		 */
	function dealListJsonSize(json, size) {
		if (json && Object.keys(json).length > size) {
			var value = getMinValueFormJson(json);
			for (var key in json) {
				if (json[key] == value) delete json[key];
			}
		}
	}

	function getMinValueFormJson(json) {
		var min;
		if (json && Object.keys(json).length > 0) {
			for (var key in json) {
				min = json[key];
				break;
			}
			for (var key in json) {
				if (json[key] < min) min = json[key];
			}
		}
		return min;
	}

	function strTrim(str) {
		return str && str.replace(/(^\s*)|(\s*$)/g, "");
	}

	function isNull(str) {
		if (!strTrim(str)) return true;
		return false;
	}
})(af)