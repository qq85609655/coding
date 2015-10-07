;
(function() {
	window.addEventListener("DOMContentLoaded", function() {
		new Page({
			"container": document.getElementById("coll-div")
		}).init();
		var domemulate = document.querySelectorAll(".scroll-emulate").item(0), //模拟区域dom
			domarea = domemulate.firstElementChild, //dom内容区域
			domscrollbar = domarea.nextElementSibling.querySelector(".scroll-bg"); //滚动条
		var dragflag = false,
			x, y, ox, oy, top, maxtop = domscrollbar.parentNode.offsetHeight - domscrollbar.offsetHeight;
		var areaPerWheelPlex = 70;
		var scrollAreaPos = domarea.getBoundingClientRect(),
			maxAreaHeight = scrollAreaPos.height - domemulate.getBoundingClientRect().height,
			times = Math.ceil(maxAreaHeight / areaPerWheelPlex),
			barPerWheelPlex = Math.ceil(maxtop / times);

		var scrollBar = function(time) {
				var offsety = (-time) * barPerWheelPlex;
				var topy = parseInt(window.getComputedStyle(domscrollbar).top) + offsety;
				if (topy < 0) {
					topy = 0;
				} else if (topy > maxtop) {
					topy = maxtop;
				}
				domscrollbar.style.top = topy + "px";
			},
			scrollArea = function(offsety) {
				var mt = parseInt(window.getComputedStyle(domarea).marginTop),
					mtt = mt + offsety;
				if (mtt > 0) {
					mtt = 0;
				} else if (mtt < -maxAreaHeight) {
					mtt = -maxAreaHeight;
				}
				domarea.style.marginTop = mtt + "px";
			};
		document.addEventListener("mouseup", function() {
			dragflag = false;

		});
		domscrollbar.addEventListener("mousedown", function(event) {
			dragflag = true;
			x = event.clientX;
			y = event.clientY;
			oy = y;
			top = parseInt(window.getComputedStyle(this).top);
			event.stopPropagation(); //阻止底层滑动槽接受事件冒泡
		});
		document.addEventListener("mousemove", function(event) {
			if (dragflag) {
				var offsetx = event.clientX - x,
					offsety = event.clientY - y;
				if (Math.abs(offsety) < maxtop) {
					var topy = top + offsety;
					if (topy < 0) {
						topy = 0;
					} else if (topy > maxtop) {
						topy = maxtop;
					}
					domscrollbar.style.top = topy + "px";
					scrollArea(Math.round(-(event.clientY - oy) * (maxAreaHeight / maxtop)));
					oy = event.clientY;
				}
			}
		});
		//滚动事件
		domemulate.addEventListener("mousewheel", function(event) {
			event = event ? event : window.event;
			event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3; //上正下负
			var offsety = (event.delta) * areaPerWheelPlex;
			scrollArea(offsety);
			scrollBar(event.delta);
			event.stopPropagation();
		});
		//滚动槽的点击下去时鼠标事件的侦听
		domscrollbar.parentNode.addEventListener("mousedown", function(event) {
			var ev = event || window.event;
			var dompos = domscrollbar.getBoundingClientRect();
			var top = parseInt(window.getComputedStyle(domscrollbar).top);
			var disy = ev.clientY - dompos.top - dompos.height / 2,
				topt = top + disy;
			if (topt < 0) {
				topt = 0;
			} else if (topt > maxtop) {
				topt = maxtop;
			}
			domscrollbar.style.top = topt + "px";
			scrollArea(-disy / maxtop * maxAreaHeight);
		});
	});
})();