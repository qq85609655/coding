(function(factory) {
	if (typeof define === "function") {
		define(["jquery"], function(require, exports, module) {
			var jquery = require("jquery");
			factory(jquery);
			module.exports=jquery;
		});
	} else {
		factory(JQuery);
	}

})(function($) {
	$.h="md";
})