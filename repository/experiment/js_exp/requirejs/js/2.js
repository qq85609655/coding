//该为amd规范定义的插件编写方法
define(["1"], function(a) {
	a.plugin = function() {
		console.log("this is add plugin in 2.js");
	}
	return a;
});