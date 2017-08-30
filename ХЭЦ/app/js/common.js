$(function() {
	$("#main .owl-carousel").owlCarousel({
		animateIn: "fadeIn",
		items: 1,
		center: true,
		dots: false,
		pullDrag: false,
		touchDrag: false,
		mouseDrag: false,
		loop: true,
		autoplay: true,
		autoplayTimeout: 5000
	});
	$.ajax({
		url: "content.html",
		dataType: 'html'
	}).success(function(response) {
		$(".preloader").remove();
		$("body").append(response);
		init();
	});
	function init() {
		$(window).resize(function(){
			isMobile();
		});
		isMobile();

		$(window).scroll(function(){
			logoStatic();
		});
		logoStatic();

		$(".main-nav li").click(function(){
			$("#navbar").removeClass("in");
			$(".main-nav li").removeClass("active");
			$(this).addClass("active");
		});

		$("#portfolio .btn:not([data-target='#brief'])").on("click", function(){
			var url = $(this).attr("data-url");
			$('#portfolio-view iframe').attr("src", url);
			$('#portfolio-view').modal("show");
		});


		$("#team .owl-carousel").owlCarousel({
			dots: false,
			loop: true,
			margin: 30,
			nav: true,
			navText: ['<i class="fa fa-angle-right" aria-hidden="true"></i>', '<i class="fa fa-angle-left" aria-hidden="true"></i>'],
			responsive: {
				1300: {
					autoplay: true,
					items: 4
				},
				768: {
					autoplay: true,
					items: 3
				},
				320: {
					autoplay: true,
					items: 1,
					dots: true
				}
			}
		});

		$("#costing .owl-carousel").owlCarousel({
			items: 1,
			nav: true,
			dots: false,
			autoHeight: true,
			navText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>назад', 'вперед<i class="fa fa-caret-right" aria-hidden="true"></i>'],
			autoplay: false,
			mouseDrag: false,
			pullDrag: false,
			freeDrag: false,
			rewind: false
		});


		$("#reviews .carousel").not('.slick-initialized').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			centerMode: true,
			focusOnSelect: true,
			centerPadding: "0px",
			prevArrow: '<i class="prev fa fa-angle-right" aria-hidden="true"></i>',
			nextArrow: '<i class="next fa fa-angle-left" aria-hidden="true"></i>',
			responsive: [{
				breakpoint: 768,
				settings: {
					arrows: false
				}
			},{
				breakpoint: 635,
				settings: {
					slidesToShow: 3,
					arrows: false
				}
			},{
				breakpoint: 440,
				settings: {
					slidesToShow: 1,
					arrows: false
				}
			}]
		});

		$('[type="tel"]').inputmask("+7(999) 999-99-99");
		$("textarea").textareaAutoSize();

		var targetAction = false;
		setTimeout(function(){
			$(window).mouseleave(function(e) {
				if((e.clientY < 0) && (targetAction === false)){
					$('#exit').modal("show");
					targetAction = true;
				}
			});
		}, 7000);

		$("#exit a.btn").click(function(){
			discount = 3000;
			setTotal();
		});

		$(".flip-container").click(function(){
			$(this).toggleClass("hover");
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
		// //Удаление якорей при перезагрузке
		// function getCookie(name) {
		// 	var matches = document.cookie.match(new RegExp(
		// 		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		// 	));
		// 	return matches ? decodeURIComponent(matches[1]) : undefined;
		// }
		// if(getCookie("refresh") === "true"){
		// 	// window.history.pushState("","",location.origin);
		// 	window.hash = " ";
		// }
		// document.cookie = "refresh=true";

		var get = location.search.substr(1);

		$("#brief form").submit(function (){
			var th = $(this);
			var data = $("#brief form ol li");
			var brief = "";
			$.each(data, function (i, value) {
				brief += "<li>" + value["outerText"] + "<b style='display:block'>" + value["firstElementChild"]["value"] + "</b></li>";
			});
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: th.serialize() + "&brief=" + brief + "&form_header=brief" + "&" + get
			}).success(function(response) {
				if(response === "success"){
					targetAction = true;
					$("#brief").modal("hide");
					th.trigger("reset");
					setTimeout(function(){
						$('#success').modal("show");
					}, 1000);
				}
			});
			return false;
		});

		$("#calc form").submit(function (){
			var th = $(this);
			var total = $("#total tbody").html();
			var price = $("#total .payment .p-price").html();
			var day = $("#total .payment .p-day").html();
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: th.serialize() + "&total=" + total + "&price=" + price + "&day=" + day + "&form_header=calc" + "&" + get
			}).success(function(response) {
				if(response === "success"){
					targetAction = true;
					th.trigger("reset");
					setTimeout(function(){
						$('#success').modal("show");
					}, 1000);
				}
			});
			return false;
		});

		$("#callBack form").submit(function (){
			var th = $(this);
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: th.serialize() + "&form_header=callback" + "&" + get
			}).success(function(response) {
				if(response === "success"){
					targetAction = true;
					$("#callBack").modal("hide");
					th.trigger("reset");
					setTimeout(function(){
						$('#success').modal("show");
					}, 1000);
				}
			});
			return false;
		});

		$("#proposal form").submit(function (){
			var th = $(this);
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: th.serialize() + "&form_header=proposal" + "&" + get
			}).success(function(response) {
				if(response === "success"){
					targetAction = true;
					$("#proposal").modal("hide");
					th.trigger("reset");
					setTimeout(function(){
						$('#success').modal("show");
					}, 1000);
				}
			});
			return false;
		});

		$("#exit form").submit(function (){
			var th = $(this);
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: th.serialize() + "&form_header=coupon" + "&" + get
			}).success(function(response) {
				if(response === "success"){
					targetAction = true;
					$("#exit").modal("hide");
					th.trigger("reset");
					setTimeout(function(){
						$('#success').modal("show");
					}, 1000);
				}
			});
			return false;
		});

		function logoStatic(){
			if(($(this).scrollTop() > 1) && ($(this).width() > 768)) {
				$("#main .navbar").addClass("logo-static");
			}else{
				$("#main .navbar").removeClass("logo-static");
			}
		}

		function isMobile(){
			if((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
				$('#portfolio .item .overlay .btn').hide();
				$('#portfolio .item').click(function(){
	        		$('#callBack').modal("show");
				});
			}
			if($(window).width() < 768){
				$("#portfolio .owl-carousel").owlCarousel({
					items: 1,
					dots: true,
					loop: true,
					nav: true,
					navText: ['<i class="fa fa-angle-right" aria-hidden="true"></i>', '<i class="fa fa-angle-left" aria-hidden="true"></i>'],
					autoplay: false,
					responsive: {
						440: {
							nav: true
						},
						320: {
							nav: false
						}
					}
				});

				$("#amenities .owl-carousel").owlCarousel({
					items: 2,
					dots: false,
					loop: true,
					nav: true,
					navText: ['<i class="fa fa-angle-right" aria-hidden="true"></i>', '<i class="fa fa-angle-left" aria-hidden="true"></i>'],
					autoplay: true,
					responsive: {
						720: {
							nav: true,
							dots: true,
						},
						410: {
							nav: false,
							dots: true,
							items: 1
						},
						320: {
							nav: false,
							dots: true,
							items: 1
						}
					}
				});
			}else{
				$("#main h1").removeClass("static");
				$("#suitable").simpleParallax();

				$("#advantages .item").animated("bounceInDown");

				$("#advantages .item").hover(
					function() {
						$(this).removeClass("bounceInDown").addClass("animated").toggleClass("pulse");
					},function() {
						$(this).removeClass("animated").removeClass("pulse");
					}
				);

				$("#portfolio .owl-carousel").owlCarousel("destroy");
				$("#amenities .owl-carousel").owlCarousel("destroy");

				$("#portfolio .item, #portfolio .container-fluid").prop("style", " ");
				$("#amenities .container, #amenities .owl-item, #amenities .col-md-3, #amenities").prop("style", " ");
			}
		}

		// Calc
		var discount = 0;
		function setTotal() {
			var data = $("#total tr:not(:first) [data-price], #total tr:not(:first) [data-period]");
			var price = 0;
			var period = 0;
			$.each(data, function (i, value) {
				if(value.attributes[0].name === "data-price") {
					price += parseInt(value.textContent);
				}else if(value.attributes[0].name === "data-period") {
					period += parseInt(value.textContent);
				}
			});
			$(".payment span.p-price").html(price - discount);
			$(".payment span.p-day").html(period);
		}

		function setQuantity(th) {
			var tr = " ";
			var id = th.parents("tbody").find("[type=checkbox]").attr("id");
			var isChecked = th.parents("tbody").find("[type=checkbox]").prop("checked");
			var name = th.parents("tbody").find("tr th").html().substr(4);
			var period = parseInt(th.parents("tbody").find("tr:nth-child(2) td:nth-child(4)").html().substr(9));
			var quanty = parseInt(th.parents("tbody").find("[type=text]").val());
			var price = th.parents("tbody").find("tr:nth-child(2) td:nth-child(3)").html();
			var total = parseInt(price.substr(9)) * parseInt(quanty);

			if(!total) period = 0;
			if(!quanty) quanty = 0;
			if(isChecked) {
				tr = '<tr data-id="' + id + '"><td>' + name + '(' + quanty + ' шт)</td><td data-price>' + total + '</td><td data-period>' + period + '</td><td><i class="fa fa-times" aria-hidden="true"></i></td></tr>'
				if($("#total").find("data-id", id)) {
					$("#total [data-id=" + id + "]").remove();
				}
				$("#total tbody").append(tr);
				setTotal();
			}
		}

		$(".quantity input").keyup(function(){
			setQuantity($(this));
		});

		$("#calc [type=checkbox]:not(.cancel)").on("change", function(){
			var data = $(this).parent().nextAll().find("b");
			var id = $(this).attr("id");
			var name = data[0]["textContent"].replace(/"/g,' ');

			$(this).parents("tbody").find(".cancel").prop("checked", false);//сброс чекбокса отмены выбора

			if($(this).attr("class") === "ch-boolean") name = $(this).parents("tbody").find("tr th").html().substr(4);//заголовок услуги при выборе кол-вы

			var tr = '<tr data-id="' + id + '"><td>' + name + '</td><td data-price>' + parseInt(data[1]["textContent"])+'</td><td data-period>' + (parseInt(data[2]["textContent"]) || 0) + '</td><td><i class="fa fa-times" aria-hidden="true"></i></td></tr>'

			if($(this).hasClass("ch-quanty") && $(this).prop("checked")){//подсчёт блока с кол-вом
				setQuantity($(this));
			}else if($(this).hasClass("radio")){//блок с единственным выбором
				if($(this).prop("checked")){
					$(this).parents("tbody").find("[type=checkbox]:not(.cancel)").not(this).prop("checked", false).each(function(){ $("#total [data-id="+this.id+"]").remove(); });//выборка и удаление не активных чекбоксов
					$("#total tbody").append(tr);
				}else{
					$("#total [data-id="+id+"]").remove();
				}
				setTotal();
			}else{
				if($(this).prop("checked")){
					$("#total tbody").append(tr);
				}else{
					$("#total [data-id="+id+"]").remove();
				}
				setTotal();
			}
		});

		$(document).on("click", "#total .fa-times", function(){
			var tr = $(this).parents("tr");
			var id = "#" + tr.attr("data-id");
			tr.remove();
			$(id).prop("checked", false);
			setTotal();
		});

		$("#costing .cancel").click(function(){
			var th = $(this).parents("tbody").find("[type=checkbox]:not(.cancel)");
			var id = 0;
			if($(this).prop("checked")) {
				th.prop("checked", "");
				$.each(th, function (i, value) {
					id = $(value).attr("id");
					$("#total").find("[data-id="+id+"]").remove();
				});
				setTotal();
			}else{
				th.prop("disabled", false);
			}
		});

		$("#costing .quantity").append('<div class="inc button">+</div><div class="dec button">-</div>');

		$(".button").on("click", function() {
			var $button = $(this);
			var oldValue = $button.parent().find("input").val();
			var newVal = 0;

			if ($button.text() == "+") {
				newVal = parseFloat(oldValue) + 1;
			}else{
				if (oldValue > 0) {
					newVal = parseFloat(oldValue) - 1;
				}else{
					newVal = 0;
				}
			}

			$button.parent().find("input").val(newVal);
			setQuantity($(this));
		});

		$(".mob-descr").click(function(){
			var descr = $(this).parents("tr").nextAll(".descr").first();
			var descrHeight = descr.height();
			var sliderHeight = $("#costing .owl-height").height();

			descr.toggle(function(){
				if(descr.attr("style") === "display: table-row;"){
					$("#costing .owl-height").css("height", sliderHeight + descrHeight);
				}else{
					$("#costing .owl-height").css("height", sliderHeight - descrHeight + 1);
				}
			});
		});

		$("#costing .show-total").click(function(){
			var containerHeight = $("#costing .container").outerHeight();
			var totalHeight = $("#total").height();
			$("#total, .show-total").toggleClass("active");
			if($("#total").hasClass("active")){
				$(".show-total").html("скрыть калькулятор");
				if(containerHeight < totalHeight) $("#costing .container").css("height", totalHeight + 100);
			}else{
				$(".show-total").html("развернуть калькулятор");
				$("#costing .container").css("height", "auto");
			}
		});
	}

});
