var http=require("http");
var serv=http.createServer(function(req,res){
	

}).listen(80,'127.0.0.1').on("request",function(req,res){
	res.writeHead(200);
	res.write("hello world")
	res.end("okay"); 
});