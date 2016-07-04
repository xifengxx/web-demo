
	var myAudio=$("audio")[0];
	var curChannel="0";
	$(".btn1").on("click",function(){
		if (myAudio.paused) {
			audioPlay();
		} else{
			audioPause();
		}
	})
	function audioPlay(){
		myAudio.play();
		$(".btn1").removeClass("fa-play").addClass("fa-pause");
	}
	function audioPause(){
		myAudio.pause();
		$(".btn1").removeClass("fa-pause").addClass("fa-play");
	}
	$(".btn3").on("click",function(){
		getMusic(curChannel);
	})

	function getMusic(curChannel){
		$.ajax({
			url:'http://api.jirengu.com/fm/getSong.php',
			dataType:'json',
			Method:'get',
			data:{'channel':curChannel},
			success:function(ret){
				var resource=ret.song[0],
					url=resource.url,
					bgPic=resource.picture,
					sid=resource.sid,//获取歌词参数
					ssid=resource.ssid,//获取歌词参数
					title=resource.title,
					author=resource.artist;
					album=resource.albumtitle;
				$('audio').attr('src',url);
				$('.musicName').text(title);
				$('.musicer').text(author);
				$('.record').text(album);
				$('.wrap-bg').css({
					'background':'url('+bgPic+')',
					'background-repeat':'no-repeat',
					'background-position':'center',
					'background-size':'cover',
				});
				audioPlay();
			}
		})
	}
	//进度条
	setInterval(present,500);
	$(".wrap-basebar").on("mousedown",function(e){
		var posX=e.clientX; 
		var targetLeft=$(this).offset().left;
		var percentage=(posX-targetLeft)/400*100;
		myAudio.currentTime=myAudio.duration*percentage/100;
	});
	function present(){
		var length=myAudio.currentTime/myAudio.duration*100;
		$(".progressbar").width(length+'%');
		if (myAudio.currentTime==myAudio.duration) {
			getMusic(curChannel)
		}
	}

	//音量
	$(".volume-control").on("click",function(){
		$(".volume-control i").toggleClass("fa-volume-up").toggleClass("fa-volume-off");
		
	})
	$(".volume-control").on("mouseover",function(){
		$(".volume-control-progress").show("slow");
	});


	$(".volume-control-progress").on("mousedown",function(e){
		e.preventDefault();
		var volumeTagH=$(".volume-control-tag").height();console.log(volumeTagH);
		var posY=Math.ceil(e.clientY); console.log(posY);
		var targetTop=Math.ceil($(this).offset().top);console.log(targetTop);
		var height=Math.ceil($(this).height());console.log(height);
		var percentage=(posY-targetTop)/height;console.log(percentage);
		myAudio.volume=1-percentage;console.log(myAudio.volume);
		var length=myAudio.volume*100;console.log(length);
		$(".volume-control-time-start").height(length+"%");
		$(".volume-control-time-end").height(percentage*100+"%");
		$(".volume-control-tag").offset().top+=(length-volumeTagH);
		$(this).on("mouseleave",function(){
			$(this).hide('slow');
		})
	
	})

    // icon改变
    $(".fa-star").on("click",function(){
    	$(this).toggleClass('stared').toggleClass('colored');

    })
    $(".fa-heart").on("click",function(){
    	$(this).toggleClass('loved').toggleClass('colored');
    	
    })



    //获取专辑列表
    function getChannels(){
    	var channels;
    	var html="";
    	$.get("http://api.jirengu.com/fm/getChannels.php").done(function(data){
    		data=$.parseJSON(data);
    		channels=data.channels;
    		for (var i = 0; i < channels.length; i++) {
    			if (i===0) {
    				html+="<li class='music-item music-item-active' data-channel-id="+channels[i].channel_id+">"
    			+ channels[i].name + "</li>";
    			} else{
    				html+="<li class='music-item' data-channel-id="+channels[i].channel_id+">"
    			+ channels[i].name + "</li>";
    			}
    		}
    		$(".music-menu").append(html);
    	})
    }

    //设置专辑列表效果
    $(".music-menu-icon").on("click",function(){
    	
    	$(".music-menu").animate({
    		left:'0'
	    	},800);
	});

	$(".music-menu").on("mouseleave",function(){
		var $that=$(this);
		var leftX=-$that.width();
		$that.animate({
			left:leftX
		},800)
	});

	$(".music-menu").on('click',"music-item",function(){
		var $that=$(this);
		myAudio.pause();
		curChannel=$that.attr("data-channel-id");
		$that.addClass("music-item-active");
		$that.siblings().removeClass("music-item-active");
		getMusic(curChannel);
	})

    $(function(){
		getMusic(curChannel);
		getChannels();
    })