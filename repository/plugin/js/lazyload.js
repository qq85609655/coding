 (function() {
     var eleGroup;

     function makeArr(eles) {
         var ret = [];
         for (var i = 0; i < eles.length; i++) {
             ret[i] = eles[i];
         }
         return ret;
     }

     function tagName(tagName) {
         return makeArr(document.getElementsByTagName(tagName));
     }

     function addEvent(obj, type, func) {
         if (obj.addEventListener) {
             obj.addEventListener(type, func, false);
         } else if (obj.attachEvent) {
             obj.attachEvent('on' + type, func);
         }
     }

     function removeEvent(obj, type, func) {
         if (obj.removeEventListener) {
             obj.removeEventListener(type, func, false);
         } else if (obj.detachEvent) {
             obj.detachEvent('on' + type, func);
         }
     }

     //对数据进行初始化
     function init(element) {
         eleGroup = tagName(element);
         loadImg(eleGroup);
     }

     function lazyLoad() {
         loadImg(eleGroup);
     }

     function loadImg(eles) {
         var ele = eles[0],
             _this = arguments.callee,
             limitHeight;
         if (ele && ele.getAttribute('asrc')) {
             if (document.body.scrollTop == 0) {
                 limitHeight = document.documentElement.scrollTop + document.documentElement.clientHeight;
             } else {
                 limitHeight = document.body.scrollTop + document.documentElement.clientHeight;
             }
             if (ele.offsetTop <= limitHeight) {
                 ele.setAttribute('src', ele.getAttribute('asrc'));
                 ele.removeAttribute('asrc');
                 eles.splice(0, 1);
                 addEvent(ele, 'load', function() {
                     removeEvent(ele, "load", arguments.callee); //清除事件，防止内存泄露
                     _this(eles);
                 });
             }
         }
     }
     init('img');
     addEvent(window, 'scroll', lazyLoad);
 })()