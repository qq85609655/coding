(function($) {
	$.fn.droplist = function(options) {
		var opts = $.extend({

		}, options);
		var dl = new droplist(opts, $(this));
		dl.init();
		dl.addEventListener();
	}

	function droplist(opts, $this) {
		this.data = opts.data;
		this.dom = $this;
		this.target = this.dom.find(".dropdown");
	}
	droplist.prototype = {
		init: function() {
			this.downlist = $(this.createDom());
			this.dom.append(this.downlist);
		},
		createDom: function() {
			var data = this.data;
			var domStr = "<div class='drop-down hide'><i class='icon-arrow'></i>\
                <ul class='ul-down'>";
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				domStr += "<li class='li-down'><a target='_blank' href=\'" + item.href + "\' class='a-menu-l'>" + item.name + "</a></li>";
			}
			domStr += "</ul></div>";
			return domStr;
		},
		addEventListener: function() {
			var _this = this;
			this.dom.on('click', ".a-t", function(event) {
				$(this).next().toggleClass('hide');
				event.stopPropagation();
			});

			$(document).on("click", function() {
				_this.downlist.addClass('hide'); 
			});
		}
	}
})(jQuery)