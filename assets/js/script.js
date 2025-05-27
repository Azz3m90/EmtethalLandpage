$(document).ready(function () {

  'use strict';

  /************************************************************************************ PRELOADER STARTS */
document.documentElement.classList.add('noscroll');
document.body.classList.add('noscroll');

window.addEventListener('load', function () {
  const preloader = document.getElementById('main-preloader');
  if (preloader) {
    preloader.classList.add('hide');
    setTimeout(() => {
      preloader.remove(); // حذف العنصر بعد التلاشي
      document.documentElement.classList.remove('noscroll');
      document.body.classList.remove('noscroll');
    }, 700); // أطول قليلاً من transition لضمان انتهاء التلاشي
  }
});



/************************************************************************************ TOP NAV WHITE BACKGROUND STARTS */
	// Top Navigation White Background.
	$(window).scroll(() => {
		if ($(window).width() > 991) {
			var windowTop = $(window).scrollTop();
			windowTop > 0 ? $('nav').addClass('nav-bg') : $('nav').removeClass('nav-bg');
		}

	});
	$(window).on('resize', function () {
		if ($(window).width() < 992) {
			$('nav').addClass('nav-bg');
		} else {
			$('nav').removeClass('nav-bg');
		}
	});
	$(document).ready(function () {
		$(window).trigger('resize');
	});

  /************************************************************************************ SCROLL TO TOP STARTS */
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn();
		} else {
			$('.back-to-top').fadeOut();
		}
	});

	$('.back-to-top').fadeOut();
  /************************************************************************************ SCROLL TO TOP STARTS */
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top-ar').fadeIn();
		} else {
			$('.back-to-top-ar').fadeOut();
		}
	});

	$('.back-to-top-ar').fadeOut();

});

