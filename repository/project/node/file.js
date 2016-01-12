var fs = require("fs");
/**
 * 同步读取文件方法  
 */
// var str = fs.readFileSync("main.txt");
// console.log("sync:" + str);
// /**
//  * 读取文件，异步，不会阻塞，IO完成回调函数
//  */
// fs.readFile("main.txt", "utf-8", function(err, data) {
// 	console.log(data);
// });
// fs.access("main.txt", fs.R_OK | fs.W_OK, function(err) {
// 	console.log(err ? "no access" : "can r|w");
// });
// fs.rename("main.txt", "main-t.txt", function() {
// 	console.log("main.txt rename success")
// });
/**
 *此步骤会先于rename执行，所以不要查看main-t.txt文件。
 */
// fs.stat('main.txt', function(err, stats) {
// 	if (err) throw err;
// 	console.log('stats: ' + JSON.stringify(stats));
// });

// fs.appendFile('message.txt', '\ndata to append', function (err) {
//   if (err) throw err;
//   console.log('The "data to append" was appended to file!');
// });

// fs.readdir("./", function(err, files) {
// 	files.forEach(function(i, f) {
// 		console.log(f.toString());
// 	})
// });

// fs.readlink("./", function(e, l) {
// 	console.log(l);
// });

// fs.watch('./', function (event, filename) {
//   console.log('event is: ' + event);
//   if (filename) {
//     console.log('filename provided: ' + filename);
//   } else {
//     console.log('filename not provided');
//   }
// });

// fs.writeFile('message.txt', 'Hello Node.js', function(err) {
// 	if (err) throw err;
// 	console.log('It\'s saved!');
// });

fs.open('content.txt', 'a', function(err, fd) {
	if (err) {
		throw err;
	}
	var data = '123123123 hello world';
	fs.write(fd, data, 0, 'utf-8', function(err, written, string) {
		if (err) {
			throw err;
		}
		console.log(written);
		console.log(string); 
		fs.close(fd, function(err) {
			if (err) {
				throw err;
			}
			console.log('file closed');
		})
	})
})