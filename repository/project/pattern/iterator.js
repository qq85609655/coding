/**
 * 单一职责原则 SRP--迭代器模式
 * 迭代器提供了一种方法来访问聚合对象，而不用暴露这个对象的内部表示 
 */

var each = function(obj, callback) {
    var value,
        i = 0,
        length = obj.length,
        isArray = isArraylike(obj); // isArraylike函数未实现，可以翻阅jQuery源代码

    if (isArray) { // 迭代类数组
        for (; i < length; i++) {
            callback.call(obj[i], i, obj[i]);
        }
    } else {
        for (i in obj) { // 迭代object对象
            value = callback.call(obj[i], i, obj[i]);
        }
    }
    return obj;
}

var appendDiv = function(data) {
    var div = document.createElement('div'),
        str;
    each(data, function(i, n) {
        str + = n;
    });
    div.innerHTML = str;
    document.body.appendChild(div);
}
appendDiv([1, 2, 3, 4, 5, 6]);
appendDiv({
    a: 1,
    b: 2,
    c: 3,
    d: 4
});