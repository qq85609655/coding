(function($) {
	$.fn.slider = function(options) {
		var opts = $.extend({
			showTarget: $(window),
			slideTargetList: [],
		}, options);
		var target = opts.showTarget;
		var slideList = opts.slideTargetList;
		var scaleW;
		var scaleH;
		var len;
		var idx;
		var events;
		return this.each(function() {
			init();
			renderDOM(opts);
			bindDOM(opts);
		});

		function init() {
			scaleW = target.width();
			scaleH = target.height();
			len = slideList.length;
			idx = 0;
		};

		function renderDOM() {
			target.css({
				"display": "-webkit-box",
				"-webkit-box-orient": "horizontal"
			});
			for (var i = 0; i < len; i++) {
				slideList[i] && $(slideList[i]).css({
					"-webkit-transform": "translate3d(" + i * scaleW + "px, 0px, 0px)",
					"width": scaleW + "px",
					"height": scaleH + "px"
				});
			}
		};

		function bindDOM() {
			var startTime, startX, offsetX, endTime, index;
			//手指按下的处理事件
			var startHandler = function(evt) {
				//记录刚刚开始按下的时间
				startTime = new Date() * 1;
				//记录手指按下的坐标
				startX = evt.touches[0].pageX;
				//清除偏移量
				offsetX = 0;
				//事件对象
				var _target = evt.target;
				// while(_target.nodeName != 'LI' && _target.nodeName != 'BODY'){
				// 	_target = _target.parentNode;
				// }
				// target = $(_target);
				
			};

			//手指移动的处理事件
			var moveHandler = function(evt) {
				//兼容chrome android，阻止浏览器默认行为
				evt.preventDefault();
				events=evt;
				var lists = slideList;
				//起始索引
				var i = idx - 1;
				//结束索引
				var m = i + 3;
				//计算手指的偏移量
				console.log("pageX=" + (evt.targetTouches[0].pageX));
				offsetX = evt.targetTouches[0].pageX - startX;
				//最小化改变DOM属性
				for (i; i < m; i++) {
					lists[i] && (lists[i].style.webkitTransition = '-webkit-transform 0 ease-out'); //解决拖动时延时问题
					lists[i] && (lists[i].style.position = 'absolute');
					lists[i] && (lists[i].style.webkitTransform = 'translate3d(' + ((i - idx) * scaleW + offsetX) + 'px, 0, 0)');
				}
			};

			//手指抬起的处理事件
			var endHandler = function(evt) {
				evt.preventDefault();

				//边界就翻页值
				var boundary = scaleW / 8;

				//手指抬起的时间值
				endTime = new Date() * 1;

				//所有列表项
				var lis = slideList;

				//当手指移动时间超过300ms 的时候，按位移算
				if (endTime - startTime > 300) {
					if (offsetX >= boundary) {
						goIndex('-1');
					} else if (offsetX < 0 && offsetX < -boundary) {
						goIndex('+1');
					} else {
						goIndex('0');
					}
				} else {
					//优化
					//快速移动也能使得翻页
					if (offsetX > 50) {
						goIndex('-1');
					} else if (offsetX < -50) {
						goIndex('+1');
					} else {
						goIndex('0');
					}
				}
			};
			//绑定事件
			target.on('touchstart', startHandler);
			target.on('touchmove', moveHandler);
			target.on('touchend', endHandler);

			function goIndex(n) {
				var lis = slideList;
				var len = lis.length;
				var cidx;

				//如果传数字 2,3 之类可以使得直接滑动到该索引
				if (typeof n == 'number') {
					cidx = n;
					//如果是传字符则为索引的变化
				} else if (typeof n == 'string') {
					cidx = idx + n * 1;
				}

				//当索引右超出
				if (cidx > len - 1) {
					cidx = len - 1;
					//当索引左超出	
				} else if (cidx < 0) {
					cidx = 0;
				}

				//保留当前索引值
				idx = cidx;
				console.log("idx="+idx)
				//改变过渡的方式，从无动画变为有动画
				lis[cidx].style.webkitTransition = '-webkit-transform 0.2s ease-out';
				lis[cidx - 1] && (lis[cidx - 1].style.webkitTransition = '-webkit-transform 0.2s ease-out');
				lis[cidx + 1] && (lis[cidx + 1].style.webkitTransition = '-webkit-transform 0.2s ease-out');

				//改变动画后所应该的位移值
				lis[cidx].style.webkitTransform = 'translate3d(0, 0, 0)';
				lis[cidx - 1] && (lis[cidx - 1].style.webkitTransform = 'translate3d(-' + scaleW + 'px, 0, 0)');
				lis[cidx + 1] && (lis[cidx + 1].style.webkitTransform = 'translate3d(' + scaleW + 'px, 0, 0)');
			};
			$.fn.slider.goIndex=goIndex;
		};
		return this;
	};

})(af)