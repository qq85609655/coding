(function() {
	window.addEventListener("DOMContentLoaded", function(e) {
		init();
		var e = new Event("click", {
			"bubbles": true,
			"cancelable": false
		});
		document.querySelectorAll(".s-navbar-li").item(3).dispatchEvent(e);
		initComponent();
	}, false);

	function init() {
		var pre = document.querySelector(".s-tab-search"),
			hide = false;
		document.addEventListener("click", function(e) {
			var tar;
			tar = checkClass(e.target, "s-navbar-li");
			tar && (function() {
				var tmp = tar.parentElement.children,
					n = 0;
				for (var i = 0; i < tmp.length; i++) {
					tmp.item(i).classList.remove("active");
					tmp.item(i) === tar ? n = i : "";
				}
				tar.classList.add("active");
				var tab = tar.parentNode.parentElement.nextElementSibling.children;
				pre && pre.classList.add("hide");
				tab.item(n).classList.remove("hide");
				pre = tab.item(n);
			})()
			tar = checkClass(e.target, "s-hide-bar");
			tar && (function() {
				tar.parentNode.children.item(0).classList.toggle("hide");
				tar.parentNode.children.item(1).classList.toggle("hide");
				tar.classList.toggle("act");
			})()
			tar = checkClass(e.target, "n-banner");
			tar && popup(null, e);
			tar = checkClass(e.target, "pop-close");
			tar && (function() {
				var e = new Event("click", {
					bubbles: true,
					cancelable: true
				});
				document.getElementById("mask").dispatchEvent(e);
			})()
		}, false);

	}

	function initComponent() {
		new Page({
			"container": document.getElementById("coll-div")
		}).init();
		new Scroll(document.querySelectorAll(".scroll-emulate").item(0)).init();
	}

	function popup(target, e) {
		var mask = document.getElementById("mask"),
			tar = target || document.getElementById("popup-main");
		mask.style.display = "block";
		tar.style.display = "block";

		function close(e) {
			mask.style.display = "none";
			tar.style.display = "none";
			mask.removeEventListener("click", arguments.callee);
		}
		mask.addEventListener("click", close);
	}

	function checkClass(tar, clazz) {
		if (tar && tar.classList.contains(clazz)) {
			return tar;
		} else if (tar && tar.parentNode.classList.contains(clazz)) {
			return tar.parentNode;
		} else {
			return null;
		}
	}
})();