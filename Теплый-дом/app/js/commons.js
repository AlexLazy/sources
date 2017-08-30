(function(){
  var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
  $('[type="tel"]').inputmask("+7(999) 999-99-99");
  $('[type="text"]').inputmask({alias: "email"});

  $('#menu-btn').click(function() {
    $('#menu-btn, #menu, body').toggleClass('on');
  });

  $('#menu li').click(function() {
    $('#menu-btn, #menu, body').removeClass('on');
  });

  $(".tabs-menu a").click(function(event) {
    event.preventDefault();
    $(this).parent().addClass("current");
    $(this).parent().siblings().removeClass("current");
    var tab = $(this).attr("href");
    $(".tab-content").not(tab).css("display", "none");
    $(tab).fadeIn();
  });

  $('[href="#callback"]').on('click', function (event) {
    var header = $(this).attr('data-callbackHeader');
    var description = $(this).attr('data-callbackDescription');
    $('#callback .form-header h3').html(header);
    $('#callback .form-header p').html(description);
  });

  $('#projects [href*="prj"]').on('click', function(){
    var id = $(this).attr('href');
    var slider = $(id + ' .projects-slider');

    if(slider.hasClass('.lightSlider')) return;

    var prjSlider = slider.lightSlider({
      item: 1,
      enableDrag: false,
      onBeforeSlide: function (el) {
        $('.current-slide').text(el.getCurrentSlideCount());
      }
    });
    $('.total-slides').text(prjSlider.getTotalSlideCount());

    $(id + ' .next').click(function(){
      prjSlider.goToNextSlide();
    });
    $(id + ' .prev').click(function(){
      prjSlider.goToPrevSlide();
    });

    if(mobile){
      $('.projects-slider').on('swipeleft', function(){
        prjSlider.goToNextSlide();
      });
      $('.projects-slider').on('swiperight', function(){
        prjSlider.goToPrevSlide();
      });
  	}
  })


  var worksSlider = $('#our-works-slider').lightSlider({
    item: 1,
    enableDrag: false,
    adaptiveHeight: true
  });

	if(mobile){
    $('#our-works').on('swipeleft', function(){
      worksSlider.goToNextSlide();
    });
    $('#our-works').on('swiperight', function(){
      worksSlider.goToPrevSlide();
    });
	}

  $('#our-works .next').click(function(){
    worksSlider.goToNextSlide();
  });
  $('#our-works .prev').click(function(){
    worksSlider.goToPrevSlide();
  });

  $('#team-slider').lightSlider({
    gallery: true,
    mode: 'fade',
    item: 1,
    thumbItem: 6,
    controls: false,
    thumbMargin: 0,
    enableDrag: false,
    responsive: [{
      breakpoint: 1370,
      settings: {
        thumbItem: 4
      }
    },
    {
      breakpoint: 768,
      settings: {
        thumbItem: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        thumbItem: 2
      }
    }
  ]
  });


  $('.approval input').on('change', function(){
    var btn = $(this).parents('form').find('.btn');
    $(this).prop('checked')?btn.attr('disabled', false):btn.attr('disabled', true);
  })


  $('a[href^="#"]').click(function(e) {
    e.preventDefault();
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
      }
    }
  });

  $('#preloader').fadeOut();
})();
