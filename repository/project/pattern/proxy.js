/**
 * 单一职责原则 SRP--代理模式
 * 图片预加载实现
 */

var myImg = (function() {
	var img = document.createElement("img");
	document.body.appendChild(img);
	return {
		setSrc: function(src) {
			img.src = src;
		}
	}
})();

var proxyImg = (function() {
	var img = new Image;
	img.onload = function() {
		myImg.setSrc(this.src);
	}
	return {
		setSrc: function(src) {
			myImg.setSrc("/default.png");
			img.src = src;
		}
	}
})();
proxyImg.setSrc('http:// imgcache.qq.com/music/photo/000GGDys0yA0Nk.jpg');