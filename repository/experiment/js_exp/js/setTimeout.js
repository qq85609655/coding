// setTimeout.js
function testTimeOut1() {
	setTimeout(function() {
		console.log("run1..");
	}, 100);
}

function testTimeOut2() {
	var fun = function() {
		console.log("run2..");
	}
	setTimeout(fun, 100);
}

function testTimeOut3() {
	setTimeout(t3, 100);
}

function t3() {
	console.log("run3..");
}