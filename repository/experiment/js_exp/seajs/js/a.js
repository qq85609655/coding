define(function(require, exports, module) {
	function a() {
		this.a = "";
		this.setA = function(p) {
			this.a = p;
		};
		this.getA = function() {
			return this.a;
		}
	}
	console.log("hello this is a scope!");
	module.exports = new a();
});