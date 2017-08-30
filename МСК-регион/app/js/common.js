$(function() {
	var ua = window.navigator.userAgent;
	if(ua.indexOf("MSIE ") > 0 ||  ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/') > 0) {
		$('header .main-mnu a').css('color',' rgba(255,255,255,0.3)');
	}

	if($(this).width() > 768) {
		$('header').append('<div class="video-wrap"></div>');
		$('.video-wrap').YTPlayer({
			fitToBackground: false,
			videoId: 'Bf3i9IuWnVY',
			vol: 1,
			callback: function(){
				var player = $('.video-wrap').data('ytPlayer').player;

				player.addEventListener('onStateChange', function(e){
					e.data === 1 ? $('.video-wrap').addClass('play') : '';
				});
			}
		});

		$('#about').simpleParallax();

		$("#advantages .icon").animated("fadeInLeft");
	}

	$('[type="tel"]').inputmask("+7(999) 999-99-99");

	$('.mob-mnu-btn, .mob-mnu li, .mob-mnu .close, .mob-mnu-fixed-btn').click(function(){
		$('.mob-mnu').slideToggle();
	});

	$('.mob-form-btn').click(function() {
		$('#form1').modal();
		return false;
	});

	$('a[href^="#"]').click(function(e) {
		e.preventDefault();
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
			}
		}
	});






	$("#feedback .owl-carousel").owlCarousel({
		items: 1,
		loop: true,
		center:true,
		autoplay: true,
		dots: false,
		nav: false,
		navText: ['<span class="top-frame"></span><p>назад</p><span class="bottom-frame"></span>', '<span class="top-frame"></span><p>вперед</p><span class="bottom-frame"></span>'],
		responsive: {
			992: {
				nav: true,
				dots: true
			},
			570: {
				dots: true
			},
			320: {
			}
		}
	});

	$('#about .btn, #arguments .btn').click(function() {
		$('#callback').find('b').html('Ваш личный менеджер свяжется с вами в кротчайшее время');
		$('#gratitude #g-1').html('Спасибо вам за обращение!');
		$('#gratitude #g-2').html('Мы с вами свяжемся в ближайшее время');
		$('#callback').modal();
		return false;
	});

	$('#advantages .btn').click(function() {
		$('#callback').find('b').html('Оставьте ваши контактные данные');
		$('#gratitude #g-1').html('Мы приняли ваш запрос на вакансию.');
		$('#gratitude #g-2').html('Ожидайте обратного звонка');
		$('#callback').modal();
		return false;
	});

	$('#feedback .btn').click(function() {
		$('#feedback-modal').modal();
		$('#gratitude #g-1').html('Спасибо вам за обращение!');
		$('#gratitude #g-2').html('Мы с вами свяжемся в ближайшее время');
		return false;
	});


	$("#callback form, #form1, .main-form").submit(function (){
		var header = $(this).find('b').html();
		var name = $(this).find('input[type=text]');
		var phone = $(this).find('input[type=tel]');

		if(name.val() && phone.val()) {
			var th = $(this);
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: th.serialize() + "&header=" + header.replace(/<[^>]+>/g,' ')
			}).success(function(response) {
				if(response === "success"){
					th.trigger("reset");
					setTimeout(function(){
						$('#gratitude').modal("show");
					}, 1000);
				}
			});
			return false;
		}else{
			return false;
		}
	});

	$("#feedback-modal form").submit(function (){
		var header = $(this).find('b').html();
		var name = $(this).find('input[type=text]');
		var phone = $(this).find('input[type=tel]');
		var feedback = $(this).find('textarea');

		if(name.val() && phone.val() &&feedback.val()) {
			var th = $(this);
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: th.serialize() + "&header=" + header.replace(/<[^>]+>/g,' ')
			}).success(function(response) {
				if(response === "success"){
					th.trigger("reset");
					setTimeout(function(){
						$('#gratitude').modal("show");
					}, 1000);
				}
			});
			return false;
		}else{
			return false;
		}
	});

	//to top arrow
	$(function() {
		$(window).scroll(function() {
			if ($(this).scrollTop()>200) {
				$('#to-top, .mob-mnu-fixed-btn').addClass('visible');
				$('#to-top').fadeIn();
				return false;
			} else {
				$('#to-top, .mob-mnu-fixed-btn').removeClass('visible');
				$('#to-top').fadeOut();
				return false;
			}
		});
	});

	$("#to-top").click(function(e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});
});
