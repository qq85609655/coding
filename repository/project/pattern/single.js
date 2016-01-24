var getSingle = (function(fn) {
	var ret;
	return function() {
		return ret ? ret : ret = new fn;
	}
})();
