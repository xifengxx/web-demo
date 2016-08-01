;$(function(){
	'use strict'

	var sidebar=$("#sidebar");
	var mask=$(".mask");
	var sidebar_trigger=$("#sidebar_trigger");
	var backButton=$(".back-to-top");

	sidebar_trigger.on('click',function(){
		mask.fadeIn();
		sidebar.animate({'right':0},500);
	})
	mask.on('click',function(){
		mask.fadeOut();
		sidebar.animate({right:-sidebar.width()},500);
	})
	backButton.on('click',function(){
		$('html,body').animate({
			scrollTop:0,

		},800)
	})
	$(window).on('scroll',function(){
		if ($(window).scrollTop()>$(window).height()) {
			backButton.fadeIn();
		} else{
			backButton.fadeOut();
		}
	})
	$(window).trigger("scroll");
})