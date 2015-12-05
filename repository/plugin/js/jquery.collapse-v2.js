;
(function($) {
	$.fn.grpcollapse = function(options) {
		if (typeof options == "object") {
			var opts = $.extend({
				"isHidePre": true
			}, options);
			var $this = $(this);
			var clps = new collapse($this, opts);
			clps.createDomStrcs();
			clps.initCollapse(opts);
			clps.addClickListener();
			this.clps = clps;
		} else if (typeof options != "object") {
			this.clps.initCollapse(options);
		}
		return this;
	}
	var collapse = function($this, opts) {
		this.dom = $this;
		this.data = opts.data;
		this.opts = opts;
		this.count = 1;//控制进入此页面初始化时候第一次点击条目是否生效
	};
	collapse.prototype = {
		createDomStrcs: function() {
			var domStr = "<ul class='grp_collpase_ul'>";
			domStr += this.dataiteration("root", this.data, 1);
			domStr += "</ul>";
			this.dom.html(domStr);
		},
		dataiteration: function(relate, data, n) {
			var domStr = "";
			for (var i = 0; i < data.length; i++) {
				var dataObj = data[i]; 
				var mark1 = "",
					mark2 = "";
				if (n == 1) {
					mark2 = "icon-right"
				} else {
					mark1 = "li-sub";
				}
				domStr +=
					"<li class='grp_collpase_li '><div class='grp_collpase_item " + mark1 + "' data-toggle='show'  data-relate=" + relate + " data-uid=" + dataObj.uid + " data-leval=" + n + " data-bind='" + "'>" +
					"<i class='icon-left icon-" + dataObj.uid + "'></i>" +
					"<span class='grp_collpase_txt'>" + dataObj.title + "</span>" +
					"<i class='" + mark2 + "' ></i>" +
					"</div></li>";

				if (dataObj.sublist) { //递归入口
					domStr += arguments.callee(dataObj.uid, dataObj.sublist, (n + 1));
				}
			}
			return domStr;
		},
		initCollapse: function(options) {
			var _this = this;
			if (typeof options == "string") {
				var selectDom = this.dom.find(".grp_collpase_ul [data-uid=\'" + options + "\']");
				var relate = selectDom.data("relate");
				relate != "root" && this.dom.find(".grp_collpase_ul [data-uid=" + relate + "]").trigger("click"); //父级点击
				selectDom.trigger("click"); //子级触发点击
				relate == "root" && this.count++;
				return;
			} else if (typeof options == "number") {
				var selectDom = this.dom.find(".grp_collpase_ul [data-relate=root]").eq(options);
				selectDom.trigger("click");
				return;
			} else {
				this.dom.find(".grp_collpase_item[data-relate=root]").each(function(index, el) {
					var uid = $(this).data("uid");
					$(this).data("toggle", "hide");
					$("[data-relate=" + uid + "]").hide();
				});
			}
		},
		addClickListener: function() {
			var _this = this;
			this.dom.on("click", ".grp_collpase_item", function(event) {
				var n = $(this).data("leval");
				if (n == 1) {
					_this.rootClickDeal($(this));
				} else if (n == 2) {
					_this.subClickDeal($(this));
				}
			});
		},
		rootClickDeal: function($this) {
			var toggle = $this.data("toggle");
			var uid = $this.data("uid");
			var currDom = $("[data-relate=" + uid + "]");
			this.preuid && $("[data-relate=" + this.preuid + "]").hide();
			if (this.preuid && this.preuid != uid) {
				this.preDom.data("toggle", "hide");
				$("[data-relate=" + this.preuid + "]").hide();
				this.preDom.parent().removeClass("active");
			}

			if (toggle == "show") {
				$this.data("toggle", "hide");
				currDom.hide();
			} else {
				$this.data("toggle", "show").parent().addClass("active");
				currDom.show();
			}
			this.preuid = uid;
			this.preDom = $this;
		},
		subClickDeal: function($this) {
			this.presubItem && this.presubItem.removeClass('checked');
			$this.parent().addClass('checked');
			this.presubItem = $this.parent();
			if (this.count != 0) {
				this.opts.clickEvent.call($this, event, $this.data("uid"));
			}
			this.count++;
		}
	}
})(jQuery);