define(["2", "1"], function(b) {
	var sayhi = function() {
		b.setWord("in 3.js,3 base 2");
		b.say();
		b.plugin();
		var a=require("1");
		a.say();
	}
	return {
		sayhi: sayhi
	}
});