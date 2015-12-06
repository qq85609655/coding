var http = require("http");
var url = "http://i.baidu.com";
var client=http.get(url, function(res) {
	var html, count = 0;
	console.log(res.statusCode);
	console.log(res.headers);
	console.log(res.statusMessage);
	res.on("data", function(data) {
		html += data;
		count++;
		console.log(data.length);
	}).on("end", function() {
		console.log("end");
		console.log(count);
		// console.log(html);
	})
})
client.on("error", function(e) {
	console.log("error:" + e.message);
});