// 该为非amd规范定义的方法
(function($){
	$.say();
	$.p4=function(){console.log("this is not amd plugin");}
})()

// define(function($){
// 	$.p4=function(){
// 		console.log("this is a haha");
// 	}
// });
// 
// 
// 
// 
// ;(function (factory) {
//     if (typeof define === "function" && define.amd) {
//         // AMD模式
//         define([ "jquery" ], factory);
//     } else {
//         // 全局模式
//         factory(jQuery);
//     }
// }(function ($) {
//     $.fn.jqueryPlugin = function () {
//         //插件代码
//     };
// }));