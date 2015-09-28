/**
 * 事件一般用于处理一个元素上经常出现的事情；
 * promise有点像事件回调函数，但是promise一般只处理一次事件，成功或者失败一次且状态无法翻转
 * promise状态：fulfilled、rejected、pendding、settled
 */

function get(url) {
	var promise = new Promise(function(resolve, reject) {
		var req = new XMLHttpRequest();
		req.open("GET", url);
		req.onload = function() {
			if (req.status == 200) {
				resolve(req.response);
			} else {
				reject(Error(req.statusText));
			}
		};
		req.onerror = function() {
			reject(Error("network error"));
		};
		req.send(null);
	});
	return promise;
}

function getJSON(url) {
	return get(url).then(JSON.parse);
}

function getChapter(i) {
	getJSON("js/phones/phones.json").then(function(data) {
		return getJSON("js/phones/" + data[i].id + ".json");
	}).then(function(chapter) {
		console.log(chapter)
	});

}

getJSON("js/phones/phones.json").then(function(data) {
	return data.reduce(function(seq, item) {
		return seq.then(function() {
			return getJSON("js/phones/" + item.id + ".json");
		}).then(function(dd) {
			console.log("ss=" + dd);
		});
	}, Promise.resolve());
}).then(function(chapter) {
	console.log("cha" + chapter)
}).catch(function(err) {
	console.error(err);
});