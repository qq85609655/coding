(function() {
	$.fn.slide = function(option) {
		opt = $.extend({
			callback: null,
			inita: 0.3,
			initb: 0.7,
			target: $(".slidebar")
		}, option);
		var slide = new SlideBar(opt);
		slide.init();

	};
	var SlideBar = function(opt) {
		this.target = opt.target;

		this.l_bar = this.target.find(".slidebar-left");
		this.r_bar = this.target.find(".slidebar-right");
		this.m_bar = this.target.find(".slidebar-range");
		this.tip_bar = this.target.find(".slidebar-tip");

		this.l_bar_p = opt.inita;
		this.r_bar_p = opt.initb;
		this.width = opt.target.width();
		this.wbanner = this.l_bar.width();

		this.callback = opt.callback;
		this.moveflag = false;
		this.perPlex = this.target.find(".slideage").outerWidth() / 10;
	}
	SlideBar.prototype = {
		init: function() {
			this.renderDom();
			this.addSlideListener();
			this.addSlideClickListener();
		},
		addSlideListener: function() {
			var _this = this;
			this.l_bar.on("mousedown", function(event) {
				_this.moveflag = true;
				_this.x = event.clientX;
				_this.currtar = _this.l_bar;
				_this.left = parseInt(_this.currtar.css("left"));
				_this.mleft = parseInt(_this.m_bar.css("left"));
				_this.lleft = parseInt(_this.l_bar.css("left"));
				_this.rleft = parseInt(_this.r_bar.css("left"));
			});
			this.r_bar.on("mousedown", function(event) {
				_this.moveflag = true;
				_this.x = event.clientX;
				_this.currtar = _this.r_bar;
				_this.left = parseInt(_this.currtar.css("left"));
				_this.mleft = parseInt(_this.m_bar.css("left"));
				_this.lleft = parseInt(_this.l_bar.css("left"));
				_this.rleft = parseInt(_this.r_bar.css("left"));
			});
			$(document).on("mousemove", function(event) {
				if (_this.moveflag) {
					var offx = event.clientX - _this.x,
						left = _this.left,
						mleft = _this.mleft,
						lleft = _this.lleft,
						rleft = _this.rleft,
						posl = left + offx,
						tipposl;
					if (_this.currtar == _this.l_bar) {
						posl = posl < 0 ? 0 : posl > rleft - _this.wbanner ? rleft - _this.wbanner : posl;
						_this.l_bar.css("left", posl + "px");
						_this.m_bar.css("left", posl + "px");
						_this.m_bar.css("width", rleft - posl + _this.wbanner + "px");
						tipposl = posl + (rleft - posl + _this.wbanner) / 2;
					} else if (_this.currtar == _this.r_bar) {
						posl = posl < (lleft + _this.wbanner) ? (lleft + _this.wbanner) : posl > (_this.width - _this.wbanner) ? (_this.width - _this.wbanner) : posl;

						_this.r_bar.css("left", posl + "px");
						_this.m_bar.css("width", posl - lleft + _this.wbanner + "px");
						tipposl = _this.lleft + (posl - lleft + _this.wbanner) / 2;
					}
					_this.getValue(tipposl);
					event.preventDefault();
				}
			});
			$(document).on("mouseup", function(event) {
				_this.moveflag = false;
				_this.currtar = null;

				event.preventDefault();
			});

		},
		addSlideClickListener: function() {
			var _this = this;

			this.target.find(".slidebar-emulate").on("click", function(event) {
				var ll = _this.l_bar.offset().left,
					rl = _this.r_bar.offset().left,
					tipposl;
				_this.lleft = parseInt(_this.l_bar.css("left"));
				_this.rleft = parseInt(_this.r_bar.css("left"));
				if (event.clientX >= (rl + _this.wbanner)) {
					var posl = _this.rleft + event.clientX - rl,
						lleft = _this.lleft;
					posl = posl < (lleft + _this.wbanner) ? (lleft + _this.wbanner) : posl > (_this.width - _this.wbanner) ? (_this.width - _this.wbanner) : posl;
					_this.r_bar.css("left", posl + "px");
					_this.m_bar.css("width", posl - lleft + _this.wbanner + "px");
					tipposl = _this.lleft + (posl - lleft + _this.wbanner) / 2;
					_this.getValue(tipposl);
				} else if (event.clientX <= ll) {
					var posl = _this.lleft + event.clientX - ll,
						rleft = _this.rleft;

					posl = posl < 0 ? 0 : posl > rleft - _this.wbanner ? rleft - _this.wbanner : posl;
					_this.l_bar.css("left", posl + "px");
					_this.m_bar.css("left", posl + "px");
					_this.m_bar.css("width", rleft - posl + _this.wbanner + "px");
					tipposl = posl + (rleft - posl + _this.wbanner) / 2;
					_this.getValue(tipposl);
				}


			})
		},
		renderDom: function() {
			var tipposw = (this.r_bar_p - this.l_bar_p) * this.width + this.wbanner
			this.l_bar.css("left", this.l_bar_p * this.width + "px");
			this.r_bar.css("left", this.r_bar_p * this.width + "px");
			this.m_bar.css("left", this.l_bar_p * this.width + "px").css("width", tipposw);
			this.tip_bar.css("left", this.l_bar_p * this.width + tipposw - this.tip_bar.width / 2 + "px");
		},
		getValue: function(tipposl) {
			var pos = this.m_bar.position();
			var start = Math.round(pos.left / this.perPlex),
				end = Math.round((pos.left + this.m_bar.width()) / this.perPlex);
			this.tip_bar.css("left", (tipposl - this.tip_bar.width() / 2) + "px").show().html(start + "-" + end + "岁" + "<div class='down-arrow'></div>");
			this.callback && this.callback(start, end);
		}

	}
})();