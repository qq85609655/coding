var Event = {
	cache: {},
	listen: function(type, fun) {
		if (!this.cache[type]) {
			this.cache[type] = [];
		}
		this.cache[type].push(fun);
	},
	trigger: function() {
		var args = arguments;
		var funs = this.cache[args.shift()];
		for (var i = 0; i < funs.length; i++) {
			funs[i](args);
		}
	},
	removeListen: function(type, fun) {
		var args = arguments;
		var funs = this.cache[type];
		for (var i = 0; i < funs.length; i++) {
			if (funs[i] === fun) {
				funs.splice(i, i + 1);
			}

		}
	}
};

Event.listen("yc",function(){
	console.log("1："+arguments);
});

Event.listen("yc",function(){
	console.log("2："+arguments);
});
Event.trigger('yc',2);