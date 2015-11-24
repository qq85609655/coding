(function() {
	module("yc.test");
	test("deep clone Object test", 2, function() {
		console.log($(".yc").eq(0));
		var dp1 = {
			"name": "wxx",
			"exp": {
				"a": "jn",
				"b": "wh",
				"c": "bj"
			},
			"age": "22",
			"habit": ["ping", "pang"]
		};
		var dp2 = ["wxx", {
			"a": "jn",
			"b": "wh",
			"c": "bj"
		}, "22", ["ping", "pang"]];
		var dc1 = yc.deepCopy(dp1);
		var dc2 = yc.deepCopy(dp2);
		console.info(dc1);
		console.info(dc2);
		if (dp1 !== dc1) {
			ok(true);
		} else {
			ok(false);
		}
		var td = document.querySelectorAll(".yc").item(2);
		var _yc = $(".yc").get(2);
		strictEqual(td, _yc, 'dom equal');
	});
	test("DOM compare", 1, function() {

		var td = document.querySelectorAll(".yc").item(2);
		var _yc = $(".yc").get(2);
		strictEqual(td, _yc, 'dom compare equal');
	});
	test("DOM html", 0, function() {

		var td = document.querySelectorAll(".yc").item(2);
		var _yc = $(".yc");
		_yc.html("23");
		_yc.parent();
		_yc.children();
	})
})()