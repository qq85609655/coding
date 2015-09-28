/**
 * 时间轴组件
 */

(function($) {
	$.fn.timeAxis = function(option) {
		var opts = $.extend({}, option);
		var timeAxis = new TimeAxis(opts, this);
		timeAxis.init();
	}
	var TimeAxis = function(opts, $dom) {
		this.data = opts.data;
		this.$dom = $dom;
	}
	TimeAxis.prototype.sort = function() {
		var data = this.data;
		var l = data.length;
		for (var i = 0; i < l - 1; i++) {
			var tmp = Date.parse(data[i].date);
			for (var j = l - 1; j > i; j--) {
				var stamp = Date.parse(data[j].date);
				if (tmp < stamp) {
					var t = data[j];
					data[j] = data[i];
					data[i] = t;
					tmp = Date.parse(data[i].date)
				}
			};
		};
	}
	TimeAxis.prototype.render = function() {
		var data = this.data;
		var prey, prem, domstr = '<div class="time-axis" >';
		for (var i = 0; i < data.length; i++) {
			var t = data[i].date.split("-");
			if (!prey || prey && prey !== t[0]) {

				domstr += '<div class="tli tl-year"> <span class = "time" > ' + t[0] + ' 年 - </span> <span class = "icon" > </span> <div class="toast"><i class="triangle-left"></i>' + data[i].event + '</div></div>'
			}
			if (!prem || prem && prem !== t[1] || (prey != t[0] && prem == t[1])) {

				domstr += '<div class="tli tl-month"> <span class = "time" > ' + t[1] + ' 月 <i class = "triangle-down" > </i></span > <span class = "icon" > </span> <div class="toast"><i class="triangle-left"></i>' + data[i].event + '</div></div > '
			}
			prey = t[0];
			prem = t[1];
			domstr += '<div class="tli tl-day"> <span class = "time" > ' + t[1] + t[2] + ' &#183;</span> <span class = "icon" > </span><div class="toast"><i class="triangle-left"></i>' + data[i].event + '</div> </div > '
		};
		domstr += '<div class="time-line"></div></div>';
		return domstr;
	}
	TimeAxis.prototype.listerner = function() {
		this.$dom.on("click", ".time-axis .tl-month .time", function() {
			var b=$(this).parent(".tli");
			b.nextUntil(b.nextAll(".tl-month,.tl-year").eq(0)).toggle("slow");
			$(this).find(".triangle-down").toggleClass('rote180');
		});
	}
	TimeAxis.prototype.init = function() {
		this.sort();
		this.$dom.html(this.render());
		this.listerner();
	}
})(jQuery)

var data = [{
	"date": "2014-05-02",
	"event": "今2014-05-02，你好今天！"
}, {
	"date": "2015-09-03",
	"event": "昨天2015-09-03，你好昨天！"
}, {
	"date": "2015-03-04",
	"event": "前天2015-03-04，你好前天！"
}, {
	"date": "2013-02-05",
	"event": "今天2013-02-05，你好今天！"
}, {
	"date": "2014-01-04",
	"event": "前天2014-01-04，你好前天！"
}, {
	"date": "2013-03-10",
	"event": "今天2013-03-10，你好今天！"
}, {
	"date": "2014-07-08",
	"event": "前天2014-07-08，你好前天！"
}, {
	"date": "2015-09-05",
	"event": "今天2015-03-05，你好今天！"
}];