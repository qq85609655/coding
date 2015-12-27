var hc=require("./file.js");
function helloW(){
	console.log("hello world");
	console.log(hc);
}
helloW();
exports.main = helloW;
exports.hw="hello world";