$(function() {

	var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
	if(!mobile){
		$(".kits .cloud-descr").not(".kits .cloud-descr.second").animated("fadeInLeft");
		$(".kits .cloud-descr.second").animated("fadeInRight");
		$(".presents .cloud-descr").animated("zoomInUp");
		$(".advantages .item-wrap:odd").animated("fadeInRight");
		$(".advantages .item-wrap:even").animated("fadeInLeft");
	}

	$(".fancybox-thumb").fancybox({
		prevEffect	: 'elastic',
		nextEffect	: 'elastic',
		helpers	: {
			title : {
    			type : 'over'
    		},
			thumbs	: {
				width	: 50,
				height	: 50
			}
		}
	});

	//to top arrow
	$('#to-top').hide();
	$(function() {
		$(window).scroll(function() {
			if ($(this).scrollTop()>200) {
				$('#to-top').fadeIn();
				$('#to-top').addClass('to-top-in');
				return false;
			} else {
				$('#to-top').fadeOut();
				return false;
			}
		});
	});

	$("#to-top").click(function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

	 $('[type="tel"]').mask('+7(999) 999-99-99');

	var targetDate = new Date('12 30 2017 12:00:00');
	var nowDate = Date.now();
	var date = Math.floor((targetDate - nowDate)/6.048e+8);

	function declOfNum(number, titles) {
	    let cases = [2, 0, 1, 1, 1, 2];
	    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
	}

	$('.first-screen .offer .descr').html('до нового года<b>осталось <span>' + date + '</span> ' + declOfNum(date, ['пятница', 'пятницы', 'пятниц']) + '!</b><b>а вы уже выбрали подарки?</b>');

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

});
