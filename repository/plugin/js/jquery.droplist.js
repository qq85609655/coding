(function($) {

	$.fn.droplist = function(options) {
		var opts = $.extend({

		}, options);
		var dl = new droplist(opts, $(this));
		dl.init();
		dl.renderDom();
		dl.addEventListener();
	}

	function droplist(opts, $this) {
		this.data = opts.data;
		this.dom = $this;
		this.target = this.dom.find(".dropdown");
	}
	droplist.prototype = {
		init: function() {
			this.target = $(this.createDom());
			this.dom.append(this.target);
		},
		createDom: function() {
			var data = this.data;
			var domStr = "<div class='dropdown'><div class='uparrow'></div><ul class='dropul'>";
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				domStr += "<li class='dropli'>" +
					"<a target='_blank' href=\'" + item.href + "\' class='dropa inline-block'>" + item.name + "</a>" +
					"</li>";

			}
			domStr += "</ul></div>";
			return domStr;
		},
		addEventListener: function() {
			var _this = this;
			this.dom.on('click', function(event) {
				_this.target.toggle();
				if (!_this.dom.hasClass('active')) {
					_this.dom.addClass('active');
				} else {
					_this.dom.removeClass('active');
				}
				event.stopPropagation();
			});
			this.dom.find(".dropli").hover(function() {
				$(this).css({
					"background-color": "#4F99C6"
				}).find(".dropa").css({
					"color": "#fff"
				});

			}, function() {
				$(this).css({
					"background-color": "#fff"
				}).find(".dropa").css({
					"color": "#000"
				});

			});
			$(document).on("click", function() {
				_this.target.hide();
				_this.dom.removeClass('active');
			});
			// this.dom.on('click',".dropa",function(event) {
			// 	var url=$(this).attr("href");
			// 	var a = $("<a target='_blank'></a>");
			// 	$("body").append(a);
			// 	a.attr("href", url);
			// 	a.click();
			// 	event.stopPropagation();
			// });
		},
		renderDom: function() {
			this.dom.parents(".grp_head_body").css("overflow", "visible");
			var tar = this.dom.css({
				position: "relative"
			});
			var offset = tar.find(".grp_prd_icon").width();
			var w = tar.width() + offset;
			tar.find(".dropdown").css({
				"position": "absolute",
				"width":  "120px",
				"text-align": "left",
				"background-color": "#fff",
				"top": "33px",
				"right": "0px",
				"display": "none",
				"padding-bottom": "5px",
				"color": "#000",
				"padding": "5px 0",
				"box-shadow": "0 2px 4px rgba(0,0,0,0.2)"
			}).find(".dropli").css({
				"padding": "0px 8px"
			}).find(".dropa").css({
				"padding": "2px 5px",
				"width":"90%"
			});
			tar.find(".uparrow").css({
				"width": "28px",
				"position": "absolute",
				"height": "20px",
				"top": "-14px",
				"right": "10px"
			});
		},
		clickDeal: function() {

		}
	}
})(jQuery)