;(function($) {
    var defaults = {
        shift:3,
        xPos: 'center',
        isActive: true
    };

    $.fn.simpleParallax = function(options) {
        var config = $.extend({}, defaults, options);
        var that = this;
        if(config.isActive) {
            $(window).scroll(function() {
                var yPos = -(($(window).scrollTop() - that.offset().top) / config.shift);
                var coords = config.xPos + ' ' + yPos + 'px';
                that.css({
                    backgroundPosition: coords
                });
            });
        }

        this.destroy = function() {
            config.isActive = false;
            that.attr('style', '');
        };
        return this;
    };
})(jQuery);
