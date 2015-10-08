;
(function(window) {
	function Popup(clickTar, _id) {
		this.clickTar = clickTar;
		this.popupId = _id;
		this.supportDrag = false;
		this.yesCallback;
		this.noCallback;
	}
	Popup.prototype.init = function() {
		this.render();
		this.addTarListen();
		return this;
	}
	Popup.prototype.addTarListen = function() {
		var _this = this;
		this.clickTar.addEventListener("click", function() {
			_this.show();
		})
		this.mask.addEventListener("click", function() {
			_this.close();
		})
	}
	Popup.prototype.render = function() {
		var div = document.createElement("div");
		div.className = "mask";
		document.body.appendChild(div);
		this.mask = div;
	}
	Popup.prototype.close = function() {
		this.popupId.style.display = "none";
		this.mask.style.display = "none";
	}
	Popup.prototype.show = function() {
		this.popupId.style.display = "block";
		this.mask.style.display = "block";
	}

	if (typeof define == "function" && define.amd) {
		define(function() {
			return Popup;
		})
	} else if (typeof module == "function" && module.exports) {
		module.exports = Popup;
	} else {
		window.Popup = Popup;
	}

})(window);