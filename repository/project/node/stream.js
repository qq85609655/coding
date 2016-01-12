console.log('stream js test');

var readable = getReadableStreamSomehow();
readable.on('readable', function() {
  var chunk;
  var  ws=getWritableStreamSomehow();
  while (null !== (chunk = readable.read(5))) {
    console.log('got  '+ chunk.toString());
    ws.write(chunk.toString(),function(arg){
    	console.log("writable:"+arg);
    })
  }
});

function getReadableStreamSomehow(){
	var fs=require("fs");
	var rs=fs.createReadStream("main.txt");
	return rs;
}
function getWritableStreamSomehow(){
	var fs=require("fs");
	var ws=fs.createWriteStream("main-1.txt");
	return ws;
}