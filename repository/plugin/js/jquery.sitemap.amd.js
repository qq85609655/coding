;
(function(factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define(["jquery"], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function($) {
    $.fn.siteMap = function(options) {
        var that = this;
        var opts = $.extend({}, options);
        var data = opts.data;
        var DOMStr = "";
        var sitemap = new SiteMap(data);
        DOMStr = sitemap.getDOM();
        that.html(DOMStr);

    }

    function SiteMap(data) {
        this.data = data;
        this.DOMStr = "";
        this.n = 0;
    }
    SiteMap.prototype = {
        getDOM: function() {
            this.iteration(this.data, this.n);
            return this.DOMStr;
        },
        iteration: function(data, n) {
            this.DOMStr += this.forEachChild(data, n); //先进行渲染后
            if (data && data.childList.length != 0) {
                for (var i = 0; i < data.childList.length; i++) {
                    this.iteration(data["childList"][i], n + 1);
                    //其中的注意之处为：n在这里是局部变量，不会在递归的时候进行记录，所以会形成递归层次的记录
                }
            }
        },
        forEachChild: function(childObj, n) {
            var space = "";
            for (var i = 0; i < n; i++) {
                space += "&nbsp;&nbsp;"
            }
            var tmpStr = "<div class=div_r" + n + ">";
            tmpStr += "<span class=" + childObj["class"] + ">" + space + childObj["title"] + "</span>";
            tmpStr += "</div>";
            return tmpStr;
        }
    }
}));