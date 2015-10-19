(function() {
	$.fn.slide = function(option) {
		opt = $.extend({
			callback: null,
			width: 400,
			inita: "20%",
			initb: "80%",
			target: $(".slidebar")
		}, option);
		var slide = new SlideBar(opt);
		slide.init();

	};
	var SlideBar = function(opt) {
		this.l_bar_p = opt.inita;
		this.r_bar_p = opt.initb;
		this.target = opt.target;
		this.l_bar = this.target.find(".slidebar-left");
		this.r_bar = this.target.find(".slidebar-right");
		this.m_bar = this.target.find(".slidebar-range");
		this.width = opt.target.width();
		this.callback = opt.callback;
		this.moveflag = false;
		this.wbanner = this.l_bar.width();
		this.size = this.target.find(".slideage").length;
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
						posl = left + offx;
					if (_this.currtar == _this.l_bar) {
						posl = posl < 0 ? 0 : posl > rleft - _this.wbanner ? rleft - _this.wbanner : posl;
						_this.l_bar.css("left", posl + "px");
						_this.m_bar.css("left", posl + "px");
						_this.m_bar.css("width", rleft - posl + _this.wbanner + "px");
					} else if (_this.currtar == _this.r_bar) {
						// if (posl < lleft + _this.wbanner) {
						// 	posl = lleft + _this.wbanner;
						// } else if (posl > _this.width - _this.wbanner) {
						// 	posl = _this.width - _this.wbanner;
						// }

						posl = posl < (lleft + _this.wbanner) ? (lleft + _this.wbanner) : posl > (_this.width - _this.wbanner) ? (_this.width - _this.wbanner) : posl;
						_this.r_bar.css("left", posl + "px");
						_this.m_bar.css("width", posl - lleft + _this.wbanner + "px");
					}
				}

			});
			$(document).on("mouseup", function(event) {
				_this.moveflag = false;
				_this.currtar = null;
				_this.getValue();
			});

		},
		addSlideClickListener: function() {
			var _this = this;

			this.target.find(".slidebar-emulate").on("click", function(event) {
				var ll = _this.l_bar.offset().left,
					rl = _this.r_bar.offset().left;
				_this.lleft = parseInt(_this.l_bar.css("left"));
				_this.rleft = parseInt(_this.r_bar.css("left"));
				if (event.clientX >= rl) {
					var posl = _this.rleft + event.clientX - rl,
						lleft = _this.lleft;
					posl = posl < (lleft + _this.wbanner) ? (lleft + _this.wbanner) : posl > (_this.width - _this.wbanner) ? (_this.width - _this.wbanner) : posl;
					_this.r_bar.css("left", posl + "px");
					_this.m_bar.css("width", posl - lleft + _this.wbanner + "px");
				} else if (event.clientX < rl && event.clientX > ll) {

				} else if (event.clientX <= ll) {
					var posl = _this.lleft + event.clientX - ll,
						rleft = _this.rleft;

					posl = posl < 0 ? 0 : posl > rleft - _this.wbanner ? rleft - _this.wbanner : posl;
					_this.l_bar.css("left", posl + "px");
					_this.m_bar.css("left", posl + "px");
					_this.m_bar.css("width", rleft - posl + _this.wbanner + "px");
				}

				_this.getValue();
			})
		},
		renderDom: function() {

		},
		getValue: function() {
			var size = this.m_bar.width() / (this.perPlex),
				start = this.m_bar.offset().left / (this.perPlex);
			console.log("start=" + start);
			console.log("end=" + (start + size));
		}

	}
})();