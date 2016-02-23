##requirejs笔记
该文主要记录requirejs对AMD规范的实现方式，主要记录加载依赖，执行模块，模块注入等方面，对于路径分析、插件执行、模块命名规范等等未做深入理解，以理解require实现思路为目标。
###[AMD规范](https://github.com/amdjs/amdjs-api/blob/master/require.md)
AMD是对于js模块化编程的一种规范，即向外暴漏两个函数define和require，分别实现定义模块和使用模块，实现模块化

     定义模块：define(id?, dependencies?, factory);
	 使用模块：require(String)|require(Array, Function)

###DEMO
	模块定义：
	//1.js
	define(function() {
		var word;
		var setWord = function(w) {
			word = w;
		}
		var getWord = function() {
			return word;
		}
		var say = function() {
			console.log("in 1.js ,i am  say:" + word);
		}
		 
		return {
			setWord: setWord,
			say: say,
			getWord: getWord
		}
	});

	//2.js 
	define(["1"], function(a) {
		a.plugin = function() {
			console.log("this is add plugin in 2.js");
		}
		return a;
	});

	//3.js
	define(["2", "1"], function(b) {
		var sayhi = function() {
			b.setWord("in 3.js,3 base 2");
			b.say();
			b.plugin();
			var a=require("1");
			a.say();
		}
		return {
			sayhi: sayhi
		}
	});
	模块调用：
	//main.js 
	require(['3'], function(a,c) { 
		// a.setWord("set a from main");
		// a.say();
		a.sayhi();
	});
	
	html:
	<script type="text/javascript" src="require.js" data-main="js/main"></script> 

###代码结构
代码通过全局变量向外暴漏require和define两个对象（即函数），变量的实现部分在自执行函数中防止变量污染，内部的对象关系如下：
req=requirejs>context>module，对象嵌套。

代码调用堆栈
requirejs>newContext+context.makeRequire=localRequire>context.nextTick>getModule+module.init>module.enable>module.check>module.fetch>module.load>context.load

###执行逻辑
requirejs源码中以require作为代码执行入口，其中包括初始化执行上下文环境、启动依赖加载。当每调用一次require()，就是初始化并执行一个独立模块，其中主要包含该模块的依赖分析，依赖加载，依赖加载执行完成的模块执行。

requirejs中所有的require调用都会生成一个**根模块**，其依赖可理解为子模块，当所有子模块加载完成以后注入依赖，执行根模块的回调，即require（factory）中的factory方法，完成模块的启动。



> requirejs执行逻辑部分

- 启动加载
- 依赖分析，初始化依赖模块
- 依赖加载
- 依赖加载成功，补充定义该模块，依赖再分析+初始化依赖模块
- 依赖再加载
- 依赖加载成功，补充定义该模块，依赖再分析+初始化依赖模块
- 依赖再加载 ....
- 无依赖模块加载成功（暂不讨论循环依赖）
- 模块上溯回调，父模块完成加载，继续上溯回调 ....
- 直至上溯到根模块，完成requirejs功能


###demo代码分析
1. requirejs中调用req({})初始化上下文后生成Context对象
2. req(config)，启动加载js/main文件
3. main.js文件加载完成以后执行其中的require(..)
4. 执行main.js的onScriptLoaded方法，此处作用不大
5. 因为require中存在异步，此时开始执行异步，创建main中的require的根模块，并加载依赖3
6. 


###后续学习
进行大规模requirejs的实践，包含插件部分

进行循环依赖的分析以及路径、命名规范分析和实验

深入理解AMD规范，思考其他实现方式

###参考资料
http://efe.baidu.com/blog/dissecting-amd-what/  

###总结
requirejs中通过创建根模块实现模块加载的启动，在根模块中通过链表的形式管理子模块，通过依赖计数和闭包实现子模块加载完成上溯回调，知道
###备注: 
newContext创建内部对象context,作为执行上下文，该方法只执行一次：

- Module: (map)
- completeLoad: (moduleName)
- config: Object
- configure: (cfg)
- contextName: "_"
- defQueue: Array[0]
- defined: Object
- enable: (depMap)
- execCb: (name, callback, args, exports)
- load: (id, url)
- makeModuleMap: makeModuleMap(name, parentModuleMap, isNormalized, applyMap)
- makeRequire: (relMap, options)
- makeShimExports: (value)
- nameToUrl: (moduleName, ext, skipExt)
- nextTick: (fn)
- onError: onError(err, errback)
- onScriptError: (evt)
- onScriptLoad: (evt)
- registry: Object
- require: localRequire(deps, callback, errback)
- urlFetched:Object


一个module对象记录了一个js文件的所有信息，包含依赖文件的信息以及文件导出文件信息的数据，
Module:

- defineEmitted: true
- defined: true
- defining: false
- depCount: 0
- depExports: Array[1]
- depMaps: Array[1]
- depMatched: Array[1]
- enabled: true
- enabling: false
- errback: undefined
- events: Object
- exports: Object
- factory: ($)
- fetched: true
- ignore: undefined
- inited: true
- map: Object
- pluginMaps: Object
- shim: false