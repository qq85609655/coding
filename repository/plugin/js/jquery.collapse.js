;
(function($) {
	$.fn.grpcollapse = function(options) {
		if (typeof options == "object") {
			var opts = $.extend({
				"isHidePre": true,
				"hideArrow": false,
				"hasdot": false
			}, options);
			var $this = $(this);
			var clps = new collapse($this, opts);
			clps.createDomStrcs();
			clps.initCollapse(opts);
			clps.addClickListener();
			this.clps = clps;
		} else if (typeof options != "object") {
			try {
				this.clps.initCollapse(options);
			} catch (e) {
				new collapse($(this),{}).initCollapse(options);
			}
		}
		return this;
	}
	var collapse = function($this, opts) {
		this.preicon;
		this.preitem;
		this.pren;
		this.preuid;
		this.presubItem;
		this.count = 0;
		this.dom = $this;
		this.data = opts.data;
		this.opts = opts;
		this.preisEmpty;
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
				with(dataObj) {
					var mark = "";
					if (this.opts.hasdot) {
						if (n != 1) {
							mark = "&middot;&nbsp;"
						}
					}
					domStr +=
						"<li class='grp_collpase_li'><div class='grp_collpase_item' data-bind=\'" + JSON.stringify(dataObj) + "\' data-toggle='show'  data-relate=" + relate + " data-uid=" + uid + " data-leval=" + n + ">" +
						"<span class='grp_collpase_span'>" +
						"<span class='grp_collpase_icon' style='background-image:url(" + icon + ");_background:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + icon + ", sizingMethod=&apos;crop&apos;)'></span>" +
						"</span>" +
						"<span class='grp_collpase_txt'>" + mark + title + "</span>" +
						"<span class='grp_collpase_span'>" +
						"<span class='grp_collpase_icon grp_collapse_right' ></span>" +
						"</span>" +
						"</div></li>";
					if (sublist) { //递归入口
						domStr += arguments.callee.call(this, uid, sublist, (n + 1));
					}
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
					var uid = $(this).data("bind").uid;
					$(this).data("toggle", "hide");
					var relateItem = $("[data-relate=" + uid + "]");
					relateItem.hide().find(".grp_collpase_icon").removeClass('grp_collapse_right');
					if (_this.opts.hideArrow) {
						!relateItem.length && $(this).find(".grp_collpase_icon").removeClass('grp_collapse_right');
					}
				});
			}
		},
		isIE6: function() {
			var flag = false;
			if ($.browser.msie) {
				if (~~($.browser.version) < 8) {
					flag = true;
				}
			}
			return flag;
		},
		dealImage: function(icon) {
			return icon;
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
			var tdata = $this.data("bind");
			var uid = tdata.uid;
			var n = $this.data("leval");
			var activeicon = tdata.activeicon;
			var icon = tdata.icon;
			var currDom = $("[data-relate=" + uid + "]");
			var currisEmpty = !currDom.length;
			//前一个item处理
			this.dealPreItem();
			// 完成选中条目左侧换图标
			$this.addClass("active").find(".grp_collpase_icon").eq(0).css({
				"background-image": "url(" + activeicon + ")",
				"filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'" + activeicon + "\', sizingMethod='crop')"
			});
			if (this.isIE6()) {
				$this.find(".grp_collpase_icon").eq(0).css({
					"background": "none"
				});
			};
			if (currisEmpty) {
				if (this.count != 0) {
					this.opts.clickEvent.call($this, event, $this.data("bind"));
					this.count++;
				}
			} else {
				//隐藏加右侧图标变化
				if (toggle == "show") {
					$this.data("toggle", "hide");
					currDom.hide();
					$this.find(".grp_collpase_icon").eq(1).removeClass('grp_collapse_down').addClass("grp_collapse_right");
				} else {
					$this.data("toggle", "show");
					currDom.show();
					$this.find(".grp_collpase_icon").eq(1).removeClass('grp_collapse_right').addClass("grp_collapse_down");
				}
			};
			this.preicon = icon;
			this.preitem = $this;
			this.pren = n;
			this.preuid = uid;
			this.preisEmpty = currisEmpty;
		},
		dealPreItem: function() {
			this.preitem && this.preitem.removeClass('active').find(".grp_collpase_icon").eq(0).css({
				"background-image": "url(" + this.preicon + ")",
				"filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'" + this.preicon + "\', sizingMethod='crop')"

			});
			if (this.isIE6()) {
				this.preitem && this.preitem.find(".grp_collpase_icon").eq(0).css({
					"background": "none"
				});
			}
			if (!this.preisEmpty && this.opts.isHidePre) { //折叠模式
				this.preitem && this.preitem.data("toggle", "hide");
				this.preuid && this.pren && $("[data-relate=" + (this.preuid) + "]").hide();
			}
			if (!this.preisEmpty) { //样式归置
				this.preitem && (this.preitem.data("toggle") == "show") && this.preitem.find(".grp_collpase_icon").eq(1).removeClass('grp_collapse_right').addClass('grp_collapse_down');
				this.preitem && (this.preitem.data("toggle") == "hide") && this.preitem.find(".grp_collpase_icon").eq(1).removeClass('grp_collapse_down').addClass('grp_collapse_right');
			}
		},
		subClickDeal: function($this) {
			this.presubItem && this.presubItem.removeClass('active');
			$this.parent().addClass('active');
			this.presubItem = $this.parent();
			if (this.count != 0) {
				this.opts.clickEvent.call($this, event, $this.data("bind"));
			}
			this.count++;
		}
	}
})(jQuery);