!(function($) {
	$.fn.siteMap = function(options) {
		var that = this;
		var opts = $.extend({}, options);
		var data = opts.data;
		var DOMStr = "";
		var sitemap = new SiteMap(data);
		DOMStr = sitemap.getDOM();
		that.html(DOMStr);
		sitemap.initListener($(".ic"));
	}

	function SiteMap(data) {
		this.data = data;
		this.DOMStr = "";
		this.m = 0;
		this.count=1;
	}
	SiteMap.prototype = {
		getDOM: function() {
			this.iteration(this.data, this.m);
			return this.DOMStr;
		},
		iteration: function(data, n) {
			this.DOMStr += this.forEachChild(data, n); //先进行渲染后
			if (data && data.childList.length != 0) {
				for (var i = 0; i < data.childList.length; i++) {
					this.iteration(data["childList"][i], n + 1);
					//其中的注意之处为：n在这里是局部变量，不会在递归的时候进行记录，所以会形成递归层次的记录
				}
			}
		},
		forEachChild: function(childObj, n) {
			if (this.m < n) {
				this.m = n
			};
			var space = "";
			for (var i = 0; i < n; i++) {
				space += "<span class=rs></span>"
			}
			var tmpStr = "<div class=div_r" + n + " data-leval=" + n + ">";
			tmpStr += space + "<span class=ic data-id=" + (n + 1) + "></span><a class=\'rc " + childObj["class"] + "\' href=" + childObj["url"] + " target=_blank>" + n + ":" + childObj["title"]+"&nbsp;"+this.count + "</a>";
			tmpStr += "</div>";
			this.count++;
			return tmpStr;
		},
		showIn: function($d) {
			var tid = $d.data("leval");
			$d.data("hide", false);
			$d.nextUntil("[data-leval=" + tid + "]").css({
				"display": "block",
			});
			$d.find('.ic').css({
				"background-position": "-45px -125px"
			});
		},
		hideOut: function($d) {
			var tid = $d.data("leval");
			$d.data("hide", true);
			var unitDOM = $d.nextUntil("[data-leval=" + tid + "]");
			var la = ~~unitDOM.attr("data-leval");
			var lb = ~~$d.attr("data-leval");
			if( (lb && la && lb < la)||(lb===0))
				unitDOM.css({
					"display": "none"
				});

			$d.find('.ic').css({
				"background-position": "-15px -125px"
			});
		},
		toggleIO: function($d) {
			if ($d.data("hide")) {
				this.showIn($d)
			} else {
				this.hideOut($d);
			}

		},
		bindClick: function($d) {
			var that = this;
			$d.bind("icon.click", function() {
				that.toggleIO($(this).parent());
			});
		},
		initListener: function($d) {
			this.bindClick($d);
			$d.bind("click", function() {
				$(this).trigger("icon.click");
			});
		}
	}
	$(document).ready(function() {
		$("#sitediv").siteMap({
			data: src
		})
	});
})(jQuery)