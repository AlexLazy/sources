$(function() {
    'use strict';

    $('.dropdown-toggle').click(function(){
        $(this).parent('.btn-group').toggleClass('open');
    });

    $(window).scroll(function(){
        if($(this).scrollTop() > $('header').height()) {
            $('header.main-header, .mobile-nav').addClass('fixed');
        }else{
            $('header.main-header, .mobile-nav').removeClass('fixed');
        }
    });

    $('.btn-mob-menu').click(function(){
        $(this).parents('nav').toggleClass('open');
    });

    $('[type="tel"]').inputmask("+7(999) 999-99-99");

    // $(document).ready(function(){
    //     var videobackground = new $.backgroundVideo($('body'), {
    //         "align": "centerXY",
    //         "width": 1920,
    //         "height": 1080,
    //         "path": "video/",
    //         "filename": "Biela",
    //         "types": ["mp4","ogg","webm"],
    //         "preload": false,
    //         "autoplay": true,
    //         "loop": true
    //     });
    //
    //     $('video').on('playing', function() {
    //         setTimeout(function(){
    //             $('.main-slider').css('background-image', 'none');
    //         },1000);
    //     });
    // });

    // $('.video-wrap').YTPlayer({
    //     fitToBackground: false,
    //     videoId: 'K8XF5MciNug',
    //     vol: 1,
    //     callback: function(){
    //         var player = $('.video-wrap').data('ytPlayer').player;
    //
    //         player.addEventListener('onStateChange', function(e){
    //             if(e.data === 1) $('.video-wrap').addClass('play');
    //         });
    //     }
    // });

    $('.main-slider .owl-carousel').owlCarousel({
		items: 1,
		loop: true,
		center:true,
		autoplay: true,
		dots: false,
		nav: false,
		navText: ['<i class="fa fa-angle-right" aria-hidden="true"></i>', '<i class="fa fa-angle-left" aria-hidden="true"></i>'],
		responsive: {
			768: {
				nav: true,
				dots: true
			},
			320: {
                dots: true
			}
		}
	});

    $('.certificates .owl-carousel').owlCarousel({
		loop: true,
		autoplay: true,
        dots: false,
        nav: true,
		navText: ['<i class="fa fa-angle-right" aria-hidden="true"></i>', '<i class="fa fa-angle-left" aria-hidden="true"></i>'],
        responsive:{
            0:{
                items: 1
            },
            480:{
                items: 2
            },
            730:{
                items: 3
            },
            986:{
                items: 4
            },
            1100:{
                items: 5
            },
            1300:{
                items: 6
            }
        }
	});

    $('.product-card-slider .owl-carousel').owlCarousel({
        items: 1,
		loop: true,
		autoplay: true,
        dots: false,
		navText: ['<i class="fa fa-angle-right" aria-hidden="true"></i>', '<i class="fa fa-angle-left" aria-hidden="true"></i>'],
        responsive : {
            0 : {
                nav: false
            },
            768 : {
                nav: true
            }
        }
	});

    $('.previously-slider .owl-carousel').owlCarousel({
        center: true,
		loop: true,
        margin: 15,
		autoplay: true,
        dots: false,
		navText: ['<i class="fa fa-angle-right" aria-hidden="true"></i>', '<i class="fa fa-angle-left" aria-hidden="true"></i>'],
        responsive : {
            0 : {
                nav: false
            },
            768 : {
                items: 2,
                autoWidth: true
            },
            1100 : {
                items: 3,
                nav: true
            }
        }
	});

    var sync1 = $("#product-slider-full");
    var sync2 = $("#product-slider-thumb");
    var slidesPerPage = 3;
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
        slideSpeed: 1500,
        nav: true,
        autoplay: true,
        center: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: ['<i class="fa fa-angle-right" aria-hidden="true"></i>', '<i class="fa fa-angle-left" aria-hidden="true"></i>'],
    }).on('changed.owl.carousel', syncPosition);

    sync2.on('initialized.owl.carousel', function() {
        sync2.find(".owl-item").eq(0).addClass("current");
    }).owlCarousel({
        items: slidesPerPage,
        dots: false,
        nav: false,
        rtl: true,
        margin: 10,
        mouseDrag: false,
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: slidesPerPage,
        responsiveRefreshRate: 100
    }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - 0.5);

        if (current < 0) current = count;
        if (current > count) current = 0;

        sync2.find(".owl-item")
             .removeClass("current")
             .eq(current)
             .addClass("current");
         var onscreen = sync2.find('.owl-item.active').length - 1;
         var start = sync2.find('.owl-item.active').first().index();
         var end = sync2.find('.owl-item.active').last().index();

         if (current > end) sync2.data('owl.carousel').to(current, 100, true);
         if (current < start) sync2.data('owl.carousel').to(current - onscreen, 100, true);
     }

     function syncPosition2(el) {
         if (syncedSecondary) {
             var number = el.item.index;
             sync1.data('owl.carousel').to(number, 100, true);
         }
     }

     sync2.on("click", ".owl-item", function(e) {
         e.preventDefault();
         var number = $(this).index();
         sync1.data('owl.carousel').to(number, 300, true);
     });


     function calc() {
         var container = this.parents('.product-info');
         var a = parseFloat(container.find('#room-width').val());//ширина
         var b = parseFloat(container.find('#room-length').val());//длина
         var c = parseFloat(container.find('#in-pack').html());//м2 в упаковке
         var d = parseInt(container.find('.stock input:checked').next().html().slice(1, -1));//запас в %
         if(a && b) {
             container.find('#total').val(Math.ceil(((a*b) + ((a*b)/100)*d)/c) || 0);
         }
     }

     $('.calculator input').change(function() {
         calc.call($(this));
     });

     $('.calculator input').keyup(function() {
         calc.call($(this));
     });


    $('[data-fancybox="images"]').fancybox({
        thumbs: {
            showOnStart: true
        }
    });

    $('.login a').click(function (){
        var cls = $(this).attr('class');
        $('#sign .nav-tabs li, #sign .tab-pane').removeClass('active');
        $('#sign .nav-tabs li.'+cls+', #sign #'+cls).addClass('active');
    });

    (function setRowNumber() {
        $('.basket .tbody .trow').each(function(i) {
            $(this).find('.thumb i').text(i + 1 + '.');
        });
    })();

    $(".button").click(function() {
		var oldValue = parseInt($(this).parent().find("input").val());
		var newVal = 0;

        if(!oldValue) oldValue = 0;

		if ($(this).text() == "+") {
			newVal = parseInt(oldValue) + 1;
		}else{
			if (oldValue > 0) {
				newVal = parseInt(oldValue) - 1;
			}else{
				newVal = 0;
			}
		}

		$(this).parent().find("input").val(newVal);
	});

    $('.lk form button').click(function(e) {
        e.preventDefault();
        $(this).prev('input').attr('disabled', false).focus();
    });

    $('.lk input').focusout(function() {
        $(this).attr('disabled', true);
    });

    (function setBR() {
        $('.product-card h3').each(function() {
            $(this).html($(this).html().replace(/“/g, "<b>“"));
            $(this).html($(this).html().replace(/”/g, "”</b>"));
        });
    })();

});
