define(function(require, exports, module) {
	var $ = require("../../experiment/js_exp/nativejs/yc");

	function DatePicker(dom) {
		this.$dom = $(dom);
	}
	module.exports = DatePicker;
	DatePicker.prototype.init = function() {
		this.render("2016-02-28");
		this.eventListener();
		console.log("init!");
	}
	DatePicker.prototype.createDateList = function(dateStr) {
		var first = this.getMonthFirstDateArray(dateStr);
		var last = this.getMonthLastDateArray(dateStr);
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
		console.log(dateList);
		return dateList;
	}
	DatePicker.prototype.eventListener = function() {
		this.$dom.on("click", function(e) {
			var tar = $(e.target);
			tar.hasClass("icon-right") && (function() {
				console.log(1);
			})();
			tar.hasClass("icon-left") && (function() {
				console.log(2);

			})();
			tar.hasClass("icon-down") && (function() {
				console.log(13);

			})();

		})
	}
	DatePicker.prototype.getTodayDateArray = function() {
		var today = new Date(),
			y = today.getFullYear(),
			m = today.getMonth() + 1,
			d = today.getDate();
		return [y, m, d, today.getDay(), y + "-" + m + "-" + d];
	}
	DatePicker.prototype.getMonthFirstDateArray = function(dateStr) {
		var today, firstDay;
		if (dateStr) {
			today = new Date(dateStr);
		} else {
			today = new Date();
		}
		firstDay = new Date(today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + "01");
		var y = firstDay.getFullYear(),
			m = firstDay.getMonth() + 1,
			d = firstDay.getDate()
		return [y, m, d, firstDay.getDay(), y + "-" + m + "-" + d];
	}
	DatePicker.prototype.getMonthLastDateArray = function(dateStr) {
		var today, firstDay, lastDay;
		if (dateStr) {
			today = new Date(dateStr);
		} else {
			today = new Date();
		}
		firstDay = new Date(today.getFullYear(), (today.getMonth() + 1), 1);
		lastDay = new Date(firstDay.getTime() - 1000 * 60 * 60 * 24);
		var y = lastDay.getFullYear(),
			m = lastDay.getMonth() + 1,
			d = lastDay.getDate()
		return [y, m, d, lastDay.getDay(), y + "-" + m + "-" + d];
	}
	DatePicker.prototype.render = function(dateStr) {
		var htmlStr = "",
			list = this.createDateList(dateStr),
			today = this.getTodayDateArray(),
			title = this.getMonthFirstDateArray();
		htmlStr += "<dt class='dt-date-title'><ul class='ul-date'><li class='li-date-title'><i class='icon-left'></i></li><li class='li-date-title'>" + title[0] + "年 <i class='icon-down'></i></li><li class='li-date-title'>" + title[1] + "月 <i class='icon-down'></i></li><li class='li-date-title'><i class='icon-right'></i></li></ul></dt>";
		htmlStr += "<dt class='dt-date-head'><ul class='ul-date'><li class='li-date-head'>一</li><li class='li-date-head'>二</li><li class='li-date-head'>三</li><li class='li-date-head'>四</li><li class='li-date-head'>五</li><li class='li-date-head'>六</li><li class='li-date-head'>日</li></ul></dt><dd class='dd-date-body'>";
		for (var i = 0; i < list.length; i++) {
			if (i % 7 == 0) {
				htmlStr += "<ul class='ul-date'>";
			}
			if (!list[i]) {
				htmlStr += " <li class='li-empty'></li> ";
			} else {
				if (list[i] == today[2]) {
					htmlStr += " <li class='li-date li-today'>" + list[i] + "</li> ";
				} else {
					htmlStr += " <li class='li-date'>" + list[i] + "</li> ";
				}
			}
			if (i % 7 == 6) {
				htmlStr += "</ul>";
			}
		}
		htmlStr += "</dd>";
		this.$dom.html(htmlStr);
		return this;
	}
})