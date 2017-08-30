$(function() {

	var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
	if(!mobile){
		$(".kits .cloud-descr").not(".kits .cloud-descr.second").animated("fadeInLeft");
		$(".kits .cloud-descr.second").animated("fadeInRight");
		$(".presents .cloud-descr").animated("zoomInUp");
		$(".advantages .item-wrap:odd").animated("fadeInRight");
		$(".advantages .item-wrap:even").animated("fadeInLeft");
	}

	$(".owl-carousel").owlCarousel({
		items: 1,
		autoWidth: true,
		nav: true,
		dots: false,
		navText: [],
		autoWidth: false,
		autoplay: true,
		loop: true
	});

	$(".fancybox").fancybox({
		padding     : 0,
		openEffect	: 'elastic',
    	closeEffect	: 'elastic'
	});

	//to top arrow
	$('#to-top').hide();
	$(function() {
		$(window).scroll(function() {
			if ($(this).scrollTop()>200) {
				$('#to-top').fadeIn();
				return false;
			} else {
				$('#to-top').fadeOut();
				return false;
			}
		});
	});

	$("#to-top").click(function(e) {
		e.preventDefault;
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

	 $('[type="tel"]').mask('+7(999) 999-99-99');

	$('a.btn, a.price').click(function(event) {
		event.preventDefault();
		var order = $(this).siblings('h3').html();
		if(!order) order = $(this).closest('.item').find('h3').html();
		if(order)$('#form1').find('textarea').append(order.replace(/<[^>]+>/g,' ')+', ');
		$(this).modal({
			fadeDuration: 300,
			fadeDelay: 0.50,
			closeText: ''
		});
	});
	$('#form1').validate({
		submitHandler: function() {
			$('form').submit(function (){
				var th = $(this);
				$.ajax({
					type: "POST",
					url: "mail.php",
					data: th.serialize()
				}).success(function() {
					th.trigger("reset");
					$('#gratitude').modal({
						fadeDuration: 300,
						fadeDelay: 0.50,
						closeText: ''
					});
				});
				return false;
			});
		}
	});

	$('a[href^="#"]').click(function() {
		event.preventDefault();
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

});
