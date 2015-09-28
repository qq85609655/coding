;
(function() {
	window.addEventListener("DOMContentLoaded", function() {
		var toggleDom = document.querySelectorAll(".main-item"),
			tmp, pretar=toggleDom.item(0);
		document.addEventListener("click", function(event) {
			var tar = event.srcElement;
			tar.classList.contains("main-item") && (function() {
				pretar && (function() {
					while ((pretar = pretar.nextSibling)) {
						if (pretar.nodeType == 1 || pretar.nodeType == 12) {
							pretar.classList.add("hide");
							pretar.parentNode.classList.remove("active");
						}
					}
				})();
				var tmp=tar;
				while ((tar = tar.nextSibling)) {
					if (tar.nodeType == 1 || tar.nodeType == 12) {
						tar.classList.remove("hide");
						tar.parentNode.classList.add("active");
					}
				}
				pretar = tmp;
			})();
		}, false);
	}, false);
})()