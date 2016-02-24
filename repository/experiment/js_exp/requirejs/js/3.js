define(["2", "1"], function(b) {
	/**
	 * [sayhi description]
	 * @return {[type]} [description]
	 */
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

/**
 * [jdocTest description]
 * @Author   wangxunxun@inspur.com
 * @DateTime 2016-02-24T09:42:10+0800
 * @param    {[type]}                 a [description]
 * @param    {[type]}                 b [description]
 * @return   {[type]}                   [description]
 */
function jdocTest(a,b){
	alert('test');
	return b;
}