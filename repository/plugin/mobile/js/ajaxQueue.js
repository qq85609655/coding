/**
 * 实现ajax数据无依赖时候的同步顺序请求
 * 思路：
 * 1-创建同步请求队列
 * 2-创建队列的偏移和调用函数的方法
 * 3-在请求队列中进行队列的偏移调用next()
 * 结果：
 * 见最后
 */
function ajaxQueue(ajaxParam) {
	var queue = [];
	var ajaxs = {};
	for (var i = 0; i < ajaxParam.length; i++) {
		var a = ajaxParam[i];
		ajaxs["ajax" + i] = (function(a) {
			//该处使用闭包实现变量的传参数，此为关键一步
			return function() {
				$.ajax({
					url: a.url,
					data: a.data,
					success: function(data) {
						(a.success)(data);
					},
					complete: function() {
						(a.complete)();
						next();
					}
				});
			}
		})(a);
		queue.push(ajaxs["ajax" + i]);
	}

	function next() {
		var fun = queue.shift();
		fun && fun();
		!fun && lastAjax();
	}

	setTimeout(function() {
		next();
	}, 0);

	function lastAjax() {
		console.log("this is last ajax");
	}
	return queue;
}
/**
 * test
 * @type {Array}
 */
var ajaxParam = [{
	"url": "http://10.9.1.13:4040/pcsII/q/getAllLeftMenuData?userf=superadmin",
	data: {},
	success: function(data) {
		console.log(data);
	},
	complete: function() {
		console.log("1-----this is complete");
	}
}, {
	"url": "http://10.9.1.13:4040/pcsII/q/getSolrQueryInfo/hzczrk?queryStr=%E6%B5%8E%E5%8D%97&dataUrls=hzczrk&startNum=0&rows=10&queryCondition=&userf=superadmin&_=936&fqInfoStr=",
	"data": {},
	success: function(data) {
		console.log(data);
	},
	complete: function() {
		console.log("2-----this is complete");
	}
}, {
	"url": "http://10.9.1.13:4040/pcsII/q/getSolrQueryNum?queryStr=%E6%B5%8E%E5%8D%97&dataUrls=hzczrk&startNum=0&rows=10&queryCondition=&userf=superadmin&_=906",
	"data": {},
	success: function(data) {
		console.log(data);
	},
	complete: function() {
		console.log("3------this is complete");
	}
}];

ajaxQueue(ajaxParam);
// af.js: 732 XHR finished loading: GET "http://10.9.1.13:4040/pcsII/q/getAllLeftMenuData?userf=superadmin".
// ajaxQueue.js: 51 1-- -- -this is complete

// af.js: 732 XHR finished loading: GET "http://10.9.1.13:4040/pcsII/q/getSolrQueryInfo/hzczrk?queryStr=%E6%B5%8E%E5…zczrk&startNum=0&rows=10&queryCondition=&userf=superadmin&_=936&fqInfoStr=".
// ajaxQueue.js: 60 2-- -- -this is complete

// af.js: 732 XHR finished loading: GET "http://10.9.1.13:4040/pcsII/q/getSolrQueryNum?queryStr=%E6%B5%8E%E5%8D%97&dataUrls=hzczrk&startNum=0&rows=10&queryCondition=&userf=superadmin&_=906".
// ajaxQueue.js: 69 3-- -- --this is complete
// ajaxQueue.js: 39 this is last ajax