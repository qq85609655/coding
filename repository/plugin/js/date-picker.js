(function($) {
	function DatePicker(dom, tar, _$) {
		!_$ && (_$ = window.$);
		$ = _$;
		this.$dom = $(dom);
		this.$tar = $(tar);
	}

	DatePicker.prototype.init = function() {
		this.render();
		this.listenEvent();
	}
	DatePicker.prototype.render = function(dateStr) {
		var htmlStr = "",
			list = this.createDateList(dateStr),
			today = this.getTodayDate(),
			title = list.pop();
		htmlStr += "<dt class='dt-date-title'><ul class='ul-date'><li class='li-date-title'><i class='icon-left'></i></li><li class='li-date-title' data-year=" + title[0] + ">" + title[0] + "年 <i class='icon-down-year'></i></li><li class='li-date-title' data-month=" + title[1] + ">" + title[1] + "月 <i class='icon-down-month'></i></li><li class='li-date-title'><i class='icon-right'></i></li></ul></dt>";
		htmlStr += "<dt class='dt-date-head'><ul class='ul-date'><li class='li-date-head'>一</li><li class='li-date-head'>二</li><li class='li-date-head'>三</li><li class='li-date-head'>四</li><li class='li-date-head'>五</li><li class='li-date-head'>六</li><li class='li-date-head'>日</li></ul></dt><dd class='dd-date-body'>";
		for (var i = 0; i < list.length; i++) {
			if (i % 7 == 0) {
				htmlStr += "<ul class='ul-date'>";
			}
			if (!list[i]) {
				htmlStr += " <li class='li-empty'></li> ";
			} else {
				var tmp = list[i],
					litoday = "";
				if ((this.currMonth + this.lt9(tmp)) == today) {
					litoday = "li-today";
				}
				htmlStr += " <li class='li-date " + litoday + "'>" + list[i] + "</li> ";
			}
			if (i % 7 == 6) {
				htmlStr += "</ul>";
			}
		}
		htmlStr += "</dd><div class='mask'></div>";
		this.$dom.html(htmlStr);
		return this;
	}
	DatePicker.prototype.listenEvent = function() {
		var _this = this;
		this.$dom.on("click", function(e) {
			var tar = $(e.target);
			tar.hasClass("icon-right") && (function() {
				_this.nextMonth();
			})();
			tar.hasClass("icon-left") && (function() {
				_this.preMonth();

			})();
			tar.hasClass("li-date") && (function() {
				var t = tar.text();
				sltdt = _this.currMonth + (t.length > 1 ? t : "0" + t);
				_this.$tar.val(sltdt);
				this.pretar && this.pretar.removeClass("active");
				tar.addClass('active');
				this.pretar = tar;
			})();
			tar.hasClass("icon-down-year") && (function() {
				var dom = tar.parent();
				if (!dom.find(".ul-date-list").length) {
					var year = dom.data("year");
					var t = _this.droplist(parseInt(year), "year");
					dom.append(t);
				}
				dom.find(".ul-date-list").show();
				e.stopPropagation();
			})();
			tar.hasClass("icon-down-month") && (function() {
				var dom = tar.parent();
				if (!dom.find(".ul-date-list").length) {
					var month = dom.data("month");
					var t = _this.droplist(parseInt(month));
					dom.append(t);
				}
				dom.find(".ul-date-list").show();
				e.stopPropagation();
			})();

		});

		$(document).on("click", function() {
			$(".ul-date-list").hide();
		})
	}
	DatePicker.prototype.droplist = function(init, type) {
		var listDom = "<ul class='ul-date-list'>",
			cls,
			unit;
		if (type == "year") {
			start = init - 6;
			unit = "年";
		} else {
			start = 0;
			unit = "月"
		}
		for (var i = 1; i < 13; i++) {
			if ((start + i) == init) {
				cls = "active"
			} else {
				cls = "";
			}
			listDom += "<li class='li-date-list " + cls + "'>" + (start + i) + unit + "</li>";
		}
		listDom += "</ul>";
		return listDom;

	}
	DatePicker.prototype.createDateList = function(dateStr) {
		var first = this.getMonthFirstDate(dateStr);
		var last = this.getMonthLastDate(dateStr);
		var startCount = 0,
			endCount = 0,
			dateList = [];
		if (!first[3]) {
			startCount = 6;
		} else {
			startCount = first[3] - 1;
		}
		if (!last[3]) {
			endCount = 0;
		} else {
			endCount = 7 - last[3];
		}
		var obj = {
			"start": startCount,
			"during": last[2],
			"end": endCount
		}

		for (var key in obj) {
			if (key == "during") {
				for (var k = 1; k <= obj[key]; k++) {
					dateList.push(k);
				}
			} else {
				for (var k = 0; k < obj[key]; k++) {
					dateList.push(0);
				}
			}
		}
		dateList.push(first); //将本月第一天数据缓存用于时间选择器表头初始化
		return dateList;
	}

	DatePicker.prototype.nextMonth = function() {
		this.chekoutMonth(0);
	}
	DatePicker.prototype.preMonth = function() {
		this.chekoutMonth(2);
	}
	DatePicker.prototype.chekoutMonth = function(t) {
		var cache = this.$dom.find(".dt-date-title");
		var dateTitle = cache.find(".li-date-title");
		var year = dateTitle.eq(1).data("year");
		var month = dateTitle.eq(2).data("month");
		var next = new Date(parseInt(year), parseInt(month) - t);
		var dateStr = next.getFullYear() + "-" + (next.getMonth() + 1) + "-01";
		this.render(dateStr);
	}
	DatePicker.prototype.getTodayDate = function() {
		var today = new Date(),
			y = today.getFullYear(),
			m = today.getMonth() + 1,
			d = today.getDate();
		return this.formate(y, m, d);
	}
	DatePicker.prototype.getMonthFirstDate = function(dateStr) {
		var initDay, firstDay;
		if (dateStr) {
			initDay = new Date(dateStr);
		} else {
			initDay = new Date();
		}
		firstDay = new Date(initDay.getFullYear(), initDay.getMonth());
		var y = firstDay.getFullYear(),
			m = firstDay.getMonth() + 1,
			d = firstDay.getDate();
		this.currMonth = this.formate(y, m);
		return [y, m, d, firstDay.getDay()];
	}
	DatePicker.prototype.getMonthLastDate = function(dateStr) {
		var initDay, nextMonthDay, lastDay;
		if (dateStr) {
			initDay = new Date(dateStr);
		} else {
			initDay = new Date();
		}
		nextMonthDay = new Date(initDay.getFullYear(), (initDay.getMonth() + 1));
		lastDay = new Date(nextMonthDay.getTime() - 1000 * 60 * 60 * 24);
		var y = lastDay.getFullYear(),
			m = lastDay.getMonth() + 1,
			d = lastDay.getDate();
		return [y, m, d, lastDay.getDay()];
	}
	DatePicker.prototype.lt9 = function(m) {
		if (typeof m == "number") {
			return m > 9 ? m : "0" + m;
		} else {
			return "";
		}
	}
	DatePicker.prototype.formate = function(y, m, d) {
		return y + "-" + this.lt9(m) + "-" + this.lt9(d);
	}
	if (typeof define == "function" && (define.amd || define.cmd)) {
		define(function(require, exports, module) {
			// var $ = require("../../experiment/js_exp/nativejs/yc");
			module.exports = DatePicker;
		});
	} else {
		window.DatePicker = DatePicker;
	}
})()