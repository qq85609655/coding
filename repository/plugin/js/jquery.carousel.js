/**使用：
 $(".grp_section_carousel").carousel({
        interval:3000,
        direction:"left"
    });
 * 轮播jquery实现
 * bugs:当定时线程进行了当前条目的加1的时候产生外部的事件触发换条目此时会出现跳级的现象，但是出现的概率很低
 */
;
(function($) {
	$.fn.carousel = function(options) {
		var ops = $.extend({
			interval: 1000,
			direction: "left",
			itemWidth: 1006
		}, options);
		var $this = $(this);
		var csl = new Carousel($this, ops);
		csl.init();
		csl.autoPlay();
		csl.addlinkItemListener();
	}

	function Carousel($this, opts) {
		this.target = $this;
		this.opts = opts;
		this.autoRollTimer;
		this.currentItem = 0;
		this.num = this.target.find(".grp_carousel_img").length;
		this.reachflag = false;
	}
	Carousel.prototype = {
		init: function() {
			var width = this.opts.itemWidth * this.num + 100;
			this.target.find(".grp_carousel_imgcoll").css("width", width + "px");
			this.createDom();
		},
		createDom: function() {
			var domStr = "";
			return domStr;
		},
		autoPlay: function() {
			if (!this.num) return;
			this.autoRollTimer && clearInterval(this.autoRollTimer);
			this.autoRollTimer = setInterval((function(_this) {
				return function() {
					// console.log("timeIntervalprefff=" + _this.currentItem);
					// console.log("timeIntervalprefff=" + _this.reachflag);
					if (!_this.reachflag) {
						_this.currentItem++;
					} else {
						_this.currentItem--;
					}
					// console.log("timeIntervalpre=" + _this.currentItem);
					if (_this.currentItem >= _this.num) {
						_this.reachflag = true;
					} else if (_this.currentItem <= 1) {
						_this.reachflag = false;
					}
					var marleft =(_this.currentItem-1) * _this.opts.itemWidth;
					_this.target.find('.grp_carousel_imgcoll').css({
						"margin-left": "-" + marleft + "px"
					});
					_this.setActiveItem();
					// console.log("timeInterval=" + _this.currentItem);
				}
			})(this), this.opts.interval);
		},
		locationItem: function() {
			var marleft = (this.currentItem-1) * this.opts.itemWidth;
			this.target.find('.grp_carousel_imgcoll').css({
				"margin-left": "-" + marleft + "px"
			});
			// console.log("marleft=" + this.currentItem);
			this.setActiveItem();
		},
		next: function() {
			this.currentItem++;
			this.autoRollTimer && clearInterval(this.autoRollTimer);
			if (this.currentItem >= this.num) {
				this.currentItem = this.num ;
				this.reachflag = true;
			}
			// console.log("next=" + this.currentItem);
			this.locationItem();
			this.autoPlay();
		},
		prev: function() {
			this.currentItem--;
			this.autoRollTimer && clearInterval(this.autoRollTimer);
			if (this.currentItem <=1) {
				this.currentItem = 1;
				this.reachflag = false;
			}
			// console.log("prev=" + this.currentItem);
			this.locationItem();
			this.autoPlay();
		},
		setItem: function(item) {
			this.autoRollTimer && clearInterval(this.autoRollTimer);
			if (item <=1) {
				item = 1;
				this.reachflag = false;
			} else if (item >= this.num) {
				item = this.num ;
				this.reachflag = true;
			}
			this.currentItem = item;
			this.locationItem();
			this.autoPlay();
		},
		setActiveItem: function() {
			this.target.find(".grp_carousel_link").removeClass('active').eq(this.currentItem-1).addClass('active');
		},
		addlinkItemListener: function() {
			var that = this;
			this.target.find(".grp_carousel_link").each(function(index, el) {
				$(this).on("click", function() {
					that.setItem(index+1);
				})
			});
			this.target.find(".grp_carousel_page").each(function(index, el) {
				$(this).on("click", function(event) {
					var tar = $(event.target);
					tar.hasClass('grp_carousel_prev') && (function() {
						that.prev();
					})();
					tar.hasClass('grp_carousel_next') && (function() {
						that.next();
					})();
				})
			});
		}
	};
})(jQuery);