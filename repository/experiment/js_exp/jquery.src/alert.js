alert("script link test！");

var g = [];
function test1() {
	for (var i = 0; i < 4; i++) {
		var o = jQuery.extend({}, {
			"test": i
		});
		g[i] = (function(o) {
			return function() {
				return o;
			}
		})(o)
	}
}
test1();

var m,n;
(function(){
	var r=0;
	m=function(){
		return r+1;
	}
	n=function(){
		r=5;
	}
})()