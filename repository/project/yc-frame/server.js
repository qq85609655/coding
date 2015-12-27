var http = require("http");
var fs = require("fs");

http.createServer(function(req, res) {
    var imaps = req.url.split("/");
    var maps = [];
    imaps.forEach(function(m) {
        if (m) {
            maps.push(m)
        }
    });
    switch (maps[0] || "index") {
        case "index":
            var str = fs.readFileSync("./main.html");
            res.writeHead(200, {
                "Content - Type": "text / html"
            });
            res.end(str, "utf-8");
            break;

        case "upl":
            var str = fs.readFileSync("./upload.html");
            res.writeHead(200, {
                "Content - Type": "text / html"
            });
            res.end(str, "utf-8");
            break;

        case "upload":
            dealUpload(req, res);
            break;
        default:
            var path = maps.join("/");
            var value = "";
            var filename = maps[maps.length - 1];
            var checkReg = /^.+.(gif|png|jpg|css|js)+$/;

            if (maps[0] == "databox") {
                checkReg = /.*/
            }

            if (checkReg.test(filename)) {
                try {
                    value = fs.readFileSync(path)
                } catch (e) {}
            }

            if (value) {
                res.end(value);
            } else {
                res.writeHead(404);
                res.end();
            }
            break;
    }
}).listen(9010);

function dealUpload(req, res) {
    var imgsays = [];
    var chunks = [];
    var num = 0;
    var size = 0;
    var isStart = false;
    var ws;
    var filename;
    var path;
    req.on('data', function(chunk) {
        // var start = 0;
        // var end = chunk.length;
        // var rems = [];

        // for (var i = 0; i < chunk.length; i++) {
        //     if (chunk[i] == 13 && chunk[i + 1] == 10) {
        //         num++;
        //         rems.push(i);

        //         if (num == 4) {
        //             start = i + 2;
        //             isStart = true;
        //             var str = (new Buffer(imgsays)).toString();
        //             filename = str.match(/filename=".*"/g)[0].split("")[1];
        //             // path = ". / databox / " + filename;
        //             // ws = fs.createWriteStream(path);

        //         } else if (i == chunk.length - 2) { //说明到了数据尾部的\r\n
        //             end = rems[rems.length - 2];
        //             break;
        //         }
        //     }
        //     if (num < 4) {
        //         imgsays.push(chunk[i])
        //     }
        // }
        // debugger;
        // if (isStart) {
        //     // ws.write(chunk.slice(start, end));
        // }
        // 
        chunks.push(chunk);
        size += chunk.length;
    });

    req.on("end", function() {
        // ws.end();
        // console.log("保存" + filename + "成功");
        var str = fs.readFileSync("./upload.html");
        res.writeHead(200, {
            "Content - Type": "text / html"
        });
        res.end(str, "utf-8");
        var buffer = Buffer.concat(chunks, size);
        console.log(buffer.toString());
        ws = fs.createWriteStream("./backup.md");
        ws.write(buffer.toString());
        ws.end();
    });
}