/*
 * 初始化加载文件路径
 */
// require.config({
// 	"baseUrl": "js",
// 	"paths": {
// 		"jquery": "1",
// 		"underscore": "2",
// 		"backbone": "3",
// 		"$NoAmd": "4",
// 		"hello": 'hello'
// 	},
// 	"shim": {
// 		"$NoAmd": {
// 			deps: ['jquery'],
// 		},
// 		"hello": {
// 			exports: 'hello'
// 		}
// 	}
// });

/**
 * 加载文件并使用其中的方法,,,,,,,,,其中使用的$为唯一的一份引用并在此基础上进行插件方法添加
 * @param  {[type]} ){} [description]
 * @return {[type]}       [description]
 */
// require(["jquery", "underscore", "backbone", "hello", "$NoAmd"], function($, _, Backbone) {
// 	//完成文依赖文件的加载，可以进行业务逻辑的操作
// 	console.log("1:hello test");
// 	$.setWord("requrejs");
// 	$.say();
// 	console.log('---------------------');
// 	var result = _.add(1, 2);
// 	console.log("2:add result=" + result);
// 	console.log('---------------------');
// 	Backbone.sayhi();
// 	console.log('---------------------');
// 	hello();
// 	$.p4();
// });
/**
 * 1、依赖文件独立的使用，依赖文件中使用了amd，但是使用时写死的依赖调用文件名
 * 2、依赖文件中依赖其他的文件，而该依赖文件使用amd规范编写  2-1直接使用依赖文件名添加依赖，紧耦合 2-2不使用写死的名称添加依赖，紧耦合
 * 3、依赖文件依赖其他的文件，该历来文件未使用amd规范编写
 * 4、使用一个不依赖其他库的文件，该文件没使用amd--hello  
 * exports 可以把某个非requirejs方式的代码中的某一个全局变量暴露出去，当作该模块以引用。
 */


require(['3'], function(a,c) { 
	// a.setWord("set a from main");
	// a.say();
	a.sayhi();
});


// require(['1','3'], function(a,c) { 
// 	console.log("-----------------")
// 	a.setWord("set a from main");
// 	a.say();
// 	c.sayhi();
// });
// require([],function(a,c) { 
// 	console.log("-----------------") 
// });
