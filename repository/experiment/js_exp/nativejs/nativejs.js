;
(function() {
	document.addEventListener("DOMContentLoaded", function() {
		console.log("dom load done");

	});
})();
/**
 * 通过属性节点设置属性
 */
function assignAttributeByAttrNode(ele, type, value) {
	var $ele = document.getElementById(ele);
	var $type = document.createAttribute(type);
	$type.value = value;
	$ele.setAttributeNode($type);
}
/**
 *	通过节点直接设置属性
 */
function setAttribute(ele, type, value) {
	ele.setAttribute(type, value);
}

function createEle(tag, cls, parent) {
	var $ele = document.createElement(tag);
	$ele.className = cls;
	var pnt = parent || document.body;
	pnt.appendChild($ele);
}
/*
创建fragment进行dom的添加
 */
function createFragment(ul) {
	var frg = document.createDocumentFragment();
	for (var i = 0; i < 4; i++) {
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(" hello world!" + i));
		li.className = "box";
		li.style.width = "300px"
		frg.appendChild(li);
	}
	ul.appendChild(frg);
}
/**
 * 创建样式表
 * @param  {[type]} css [description]
 * @return {[type]}     [description]
 */
function createStyle(css) {
	var syl = document.createElement("style");
	syl.type = "text/css";
	try {
		syl.appendChild(document.createTextNode(css));
	} catch (e) {
		syl.stylesheet.cssText = css; //ie 
	}
	var h = document.getElementsByTagName("head").item(0);
	h.appendChild(syl);
}

/**
 * textnode normalize
 * @return {[type]} [description]
 */
function concatTextNode() {
	var dom = document.createElement("div");
	var text1 = document.createTextNode("hello");
	var text2 = document.createTextNode("world!");
	dom.appendChild(text1);
	dom.appendChild(text2);
	document.body.appendChild(dom);
	dom.normalize();
	document.body.appendChild(dom);
}

/**
 * children
 */
function getChildren(ele) {
	return ele.children;
	// return 	ele.childNodes; include comment nodes
}


/**
 * 增删改dom子元素
 */
function appendChild(tar, child) {
	return tar.appendChild(child);
}

function removeChild(tar, child) {
	return tar.removeChild(child);
}

function insertBefore2(tar, ref, child) {
	return tar.insertBefore(child, ref);
}

function replaceChild2(tar, rep, bereped) {
	return tar.replaceChild(rep, bereped);
}

function cloneNode(tar, bool) {
	return tar.cloneNode(bool);
}
/**
 * 获取手动设置样式的值
 * @return {[type]} [description]
 */
function getEleCssText() {
	var t = document.getElementById("st");
	var sO = t.style; //返回对象实体
	sO.cssText += ";borer:1px solid #ccc"; //追加样式
	sO.height = ""; //删除某一样式
	return sO.cssText;
}
/**
 * 获取元素的计算后的样式
 * @param  {[type]} mark [description]
 * @return {[type]}      [description]
 */
function getEleStyle(mark) {
	var ele = document.querySelector(mark);
	if (document.defaultView) {
		return document.defaultView.getComputedStyle(ele, null);
	} else {
		return ele.currentStyle;
	}
}
/**
 * class 相关api
 * @param {[type]} ele       [description]
 * @param {[type]} className [description]
 */
function addClass(ele, className) {
	if (!hasClass(ele, className)) {
		ele.className += " " + className;
	}
}

function removeClass(ele, className) {
	var cna = ele.className.split(" ");
	for (var i = 0; i < cna.length; i++) {
		if (cna[i] === className) {
			cna.splice(i, 1);
		}
	}
	ele.className = cna.join(" ");
}

function toggleClass(ele, className) {
	if (hasClass(ele, className)) {
		removeClass(ele, className);
	} else {
		addClass(ele, className);
	}
}

function hasClass(ele, className) {
	var tc = ele.className.split(" ");
	for (var i = 0; i < tc.length; i++) {
		if (tc[i] === className) {
			return true;
		}
	}
	return false;
}
/** 
 * 元素宽度以及高度：content+padding 尺寸
 */
function getCPD(dom) {
	var innerWidth = dom.clientWidth || dom.scrollWidth;
	var innerHeight = dom.clientHeight || dom.scrollHeight;
	return {
		"innerWidth": innerWidth,
		"innerHeight": innerHeight
	}
}
/** 
 * 元素宽度以及高度：content+padding+border 尺寸
 */
function getCPBD(dom) {
	var outerWidth = dom.offsetWidth;
	var outerHeight = dom.offsetHeight;
	return {
		"outerWidth": outerWidth,
		"outerHeight": outerHeight
	}
}
/**
 * 获取元素左和上方向的border的值
 * 实际为左边框的左边界到左内边的左边界的距离
 */
function getBorderD(dom) {
	var t = dom.clientTop;
	var l = dom.clientLeft;
	return {
		"borderLeft": l,
		"borderTop": t
	}
}
/**
 * 相对于定位元素的位置:参考元素的padding+该元素的偏移+该元素的margin，
 * 相比较于jquery中的position，添加了一个该元素的margin
 */
function position(dom) {
	var ol = dom.offsetLeft;
	var ot = dom.offsetTop;
	return {
		"left": ol,
		"top": ot
	}
}

function testCaller(a){
	caller();
}
function caller(){
	var t=arguments.callee.caller;
	console.log(t);
	console.log(t.arguments);
}


var obj={"test":"43"};
var testfun=function(){
	alert(obj.test);
}

function closure(testfun){
	var obj={"test":"40"};
	testfun();
}
closure(function(){
	alert(obj.test);//43 说明闭包调用的变量位于闭包的创建位置处，而非调用位置处
});