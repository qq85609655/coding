(function() {
	window.addEventListener("DOMContentLoaded", function(e) {
		init();
		var e = new Event("click", {
			"bubbles": true,
			"cancelable": false
		});
		document.querySelectorAll(".s-navbar-li").item(1).dispatchEvent(e);
	}, false);

	function init() {
		var pre = document.querySelector(".s-tab-search"),
			hide = false;
		document.addEventListener("click", function(e) {
			var tar = e.target.classList.contains("s-navbar-li") ? e.target : e.target.parentElement,
				tmp = tar.parentElement.children,
				n = 0;
			for (var i = 0; i < tmp.length; i++) {
				tmp.item(i).classList.remove("active");
				tmp.item(i) === tar ? n = i : "";
			}
			tar.classList.add("active");
			tar.classList.contains('s-navbar-li') && (function() {
				var tab = tar.parentNode.parentElement.nextElementSibling.children;
				pre && pre.classList.add("hide");
				tab.item(n).classList.remove("hide");
				pre = tab.item(n);
			})();

			var tarh = e.target.classList.contains('s-hide-bar') ? e.target : e.target.parentElement;
			tarh.classList.contains('s-hide-bar') && (function() {
				tarh.parentNode.children.item(0).classList.toggle("hide");
				tarh.parentNode.children.item(1).classList.toggle("hide");
				tarh.classList.toggle("act");
			})()
			e.target.classList.contains("n-banner") && popup();
		}, false);

	}
})();

function popup(target) {
	document.getElementById("mask").style.display = "block";
	var tar = target || document.getElementById("popup-main");
	tar.style.display = "block";
}