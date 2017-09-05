(function(){
  $('main').simpleParallax();

  $(window).scroll(function(){
      if($(this).scrollTop() > $('header').height()) {
          $('main nav').addClass('on');
      }else{
          $('main nav').removeClass('on');
      }
  });

  $('main nav button, main nav a').click(function(){
      $('main nav ul, body').toggleClass('on');
  });

  $('[data-fancybox*="gallery"]').fancybox({
    thumbs : {
      autoStart : true
    },
    loop: true
  });

  $('.your-choice .carousel').slick({
    centerMode: true,
    centerPadding: '60px',
    variableWidth: true,
    slidesToShow: 3,
    prevArrow: '<i class="icon icon-left-open-3"></i>',
    nextArrow: '<i class="icon icon-right-open-3"></i>',
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  });

  $('[data-fancybox="images"]').fancybox({
    parentEl: '#meal .gallery',
  });

  $('#feedback .carousel').slick({
    variableHeight: true,
    slidesToShow: 1,
    prevArrow: '<i class="icon icon-left-open-3"></i>',
    nextArrow: '<i class="icon icon-right-open-3"></i>',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
        }
      }
    ]
  });

  $('#feedback .feedback-gallery').slick({
    variableHeight: true,
    slidesToShow: 1,
    fade: true,
    arrows: false,
    adaptiveHeight: true,
    swipe: false
  });

  $('#feedback .carousel').on('afterChange', function(event, slick, currentSlide){
    $('#feedback .feedback-gallery').slick('slickGoTo', currentSlide);
  });

  $('form input:file').on('change', function(){
    var container = $(this).siblings('ul');
    var files = this.files;

    if(files.length > 0) {
      container.html('').removeClass('empty');
      [].forEach.call(files, function(item){
        container.append('<li>' + item.name + '</li>');
      })
    }
  })

  $('.approval input').on('change', function(){
    var btn = $(this).parents('form').find('.btn');
    $(this).prop('checked')?btn.attr('disabled', false):btn.attr('disabled', true);
  });

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
