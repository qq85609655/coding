console.log(__dirname);
console.log(this);
setInterval(function() {
	console.log(__filename);
	console.log("setTimeout");

}, 100)