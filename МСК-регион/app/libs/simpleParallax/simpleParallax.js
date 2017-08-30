;(function($) {
    var defaults = {
        shift: 3
    };

    $.fn.simpleParallax = function(options) {
        var config = $.extend({}, defaults, options);
        var th = this;
        $(window).scroll(function() {
            var yPos = -(($(window).scrollTop() - th.offset().top) / config.shift);
            var coords = 'center ' + yPos + 'px';
            th.css({
                backgroundPosition: coords
            });
        });
        return this;
    };
})(jQuery);
