$(function(){
	$(".link .button").hover(function(){
		var title=$(this).attr("data");
		$(".tip em").text(title);
		var pos=$(this).position().left+10;
		var dis=($('.tip').outerWidth()-$(this).outerWidth())/2;
		var l=pos-dis;
		$(".tip").css({'left':l+"px"}).stop().animate({'top':145,'opacity':1},300);
	},function(){
		$(".tip").stop().animate({'top':100,'opacity':0},500);
	})
})