(function($) {
    $.fn.hoverdelay = function(options) {
        var defaults = {
            hoverDuring: 100,
            outDuring: 100,
            hoverEvent: function() {
                $.noop();
            },
            outEvent: function() {
                $.noop();
            }
        };
        var sets = $.extend(defaults, options || {});
        var hoverTimer, outTimer;
        return $(this).each(function() {
            $(this).hover(function(event) {
                var that = this;
                clearTimeout(outTimer);
                hoverTimer = setTimeout(function() {
                    sets.hoverEvent.call(that);
                }, sets.hoverDuring);
            }, function(event) {
                var that = this;
                clearTimeout(hoverTimer);
                outTimer = setTimeout(function() {
                    sets.outEvent.call(that);
                }, sets.outDuring);
            });
        });
    }
})(jQuery);