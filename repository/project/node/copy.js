var fs = require("fs");

function copy_s(src, dest) {
	fs.writeFileSync(dest, fs.readFileSync(src));
}

function main(arg) {
	arg = arg.slice(2);
	copy_s(arg[0], arg[1]);
}
main(process.argv);

function copy_big(src, dst) {
	fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function pipeLike(src, dst) {
	var rs = fs.createReadStream(src);
	var ws = fs.createWriteStream(dst);

	rs.on('data', function(chunk) {
		if (ws.write(chunk) === false) { //写入缓存，并未到达目标文件
			rs.pause();
		}
	});

	rs.on('end', function() {
		ws.end();
	});

	ws.on('drain', function() { //写入缓存并到达目标文件
		rs.resume();
	});
}