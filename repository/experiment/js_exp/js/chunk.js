/**
 * 长数组处理方法 ----存在效率问题
 * @param  {[type]}   arr      [description]
 * @param  {[type]}   process  [description]
 * @param  {[type]}   context  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function chunk(arr, process, context) {
	var item = arr.concat();
	setTimeout(function() {
		process.call(context, item.shift());
		if (item.length > 0) {
			setTimeout(argument.callee, 100);
		}
	}, 100);
}
/**
 * 长数组处理方法---效率更高
 * @param  {[type]}   arr      [description]
 * @param  {[type]}   process  [description]
 * @param  {[type]}   context  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function chunckDeal(arr, process, context, callback) {
	var item = arr.concat();
	setTimeout(function() {
		var o = +(new Date());
		var n;
		do {
			process.call(context, item.shift());
			n = +(new Date());
		} while (item.length > 0 && (n - o < 50));
		if (itme.length > 0) {
			setTimeout(argument.callee, 25);
		} else {
			callback.call(context, arr);
		}
	}, 25)
}
/** 
 * 通过object中key的唯一性来进行----数组去重
 */
function delArrayRepeat(arr) {
	var o = {};
	var nArr = [];
	for (var i = 0; i < arr.length; i++) {
		var s = typeof arr[i] + arr[i];
		if (!o[s]) {
			nArr.push(arr[i]);
			o[s] = true;
		} else {
			console.log(i + ":" + arr[i]);
		}
	}
	return nArr;
}
/**
 * 通过正向遍历进行-----数据去重
 */
function delRepeatINArrayByDirect(arr) {
	var rA = [];
	for (var i = 0; i < arr.length; i++) {
		if (getArrIndexOf(rA, arr[i]) < 0) {
			rA.push(arr[i]);
		}
	}
	return rA;
}
/**
 * 通过反向向遍历进行-----数据去重
 */
function delRepeatINArrayByReverse(array) {
	var arr=array.concat();
	var lg=arr.length;
	for (var i = lg - 1; i >= 1; i--) {
		if (getArrLastIndexOf(arr, arr[i], i - 1) >=0) {
			arr.splice(i, 1);
			console.log(i);
		}
	}
	return arr;
}

/**
 * 获取数组中某一个元素的索引
 * @param  {[type]} arr [description]
 * @param  {[type]} ele [description]
 * @return {[type]}     [description]
 */
function getArrIndexOf(arr, ele) {
	for (var i = 0; i < arr.length; i++) {
		if (ele === arr[i]) {
			return i;
		}
	}
	return -1;
}
/**
 * 获取数组的后向索引
 * @param  {[type]} arr [description]
 * @param  {[type]} ele [description]
 * @return {[type]}     [description]
 */
function getArrLastIndexOf(arr, ele, index) {
	var lg = arr.length;
	if ((!index&&index!=0) || index >= lg) {
		index = lg - 1;
	} else if (index < 0) {
		index = 0;
	}
	for (var i = index; i >= 0; i--) {
		if (ele === arr[i]) {
			return i;
		}
	}
	return -1;
}
/**
 * 通过splice实现获取某一范围内的不重复的随机数。
 * 注意：取出数的个数不能大于范围，即count<start-end;
 */
function getUniqueRandomValue(start, end, count) {
	var cdt = [];
	var rv = [];
	var lg = end - start;
	for (var i = 0; i < lg; i++) {
		cdt[i] = i + lg;
	}
	for (var j = 0; j < count; j++) {
		var index = Math.floor(Math.random() * lg);
		rv.push(cdt[index]);
		cdt.splice(index, 1);
		--lg;
	}
	return rv;
}
/**
 * 通过null实现随机数唯一
 * @param  {[type]} start [description]
 * @param  {[type]} end   [description]
 * @param  {[type]} count [description]
 * @return {[type]}       [description]
 */
function getUniqueRandomValueByNull(start, end, count) {
	var cdt = [];
	var rv = [];
	var lg = end - start;
	for (var i = 0; i < lg; i++) {
		cdt[i] = i + lg;
	}
	for (var j = 0; j < count; j++) {
		do {
			var index = Math.floor(Math.random() * lg);
		} while (cdt[index] = null);
		rv.push(cdt[index]);
		cdt[index] = null;
	}
	return rv;
}