
- 路径分析
- 依赖分析
- 递归加载


对象层级：req=requirejs>context>module
代码调用堆栈
 requirejs>newContext+context.makeRequire=localRequire>context.nextTick>getModule+module.init>module.enable>module.check>module.fetch>module.load>context.load

newContext内部对象：
module+handler

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