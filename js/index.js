(function() {
	if ((BrowserDetect.browser == "Internet Explorer" && BrowserDetect.version <11)||(BrowserDetect.browser =="Chrome" && BrowserDetect.version <32)) {
		alert("该页面不支持非标准浏览器，请使用高版本chrome浏览器查看");
		window.location.href = "sorry.html";
		return;
	}
	document.addEventListener("DOMContentLoaded", function() {

		var dom = document.querySelectorAll(".s-nav-ul").item(0);
		var pre;
		dom.addEventListener("click", function(event) {
			var tar = event.target || event.srcElement;
			tar.classList.contains("s-nav-title") && function() {
				pre && pre.classList.remove("active")
				var relate = tar.getAttribute("data-id");
				var d = document.querySelectorAll(".board");
				Array.prototype.forEach.call(d, function(ele, i) {
					ele.classList.add("hide");
				});
				document.getElementById(relate).classList.remove("hide");
				tar.parentNode.classList.add("active");
				pre = tar.parentNode;
			}();

		}, false);
		dom.querySelectorAll(".s-nav-title").item(3).dispatchEvent(new Event("click", {
			"bubbles": true,
			"cancelable": false
		}));
		document.querySelector(".s-contain").style.minHeight = window.innerHeight - 75 + "px";
		new Page({
			"container": document.getElementById("page1")
		}).init();
	});
})();