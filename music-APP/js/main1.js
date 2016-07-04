
	var myAudio=$("audio")[0];


	$(".btn1").on("click",function(){
		if (myAudio.paused) {
			play();
		} else{
			pause();
		}
	})
	function play(){
		myAudio.play();
		$(".btn1").removeClass("fa-play").addClass("fa-pause");
	}
	function pause(){
		myAudio.pause();
		$(".btn1").removeClass("fa-pause").addClass("fa-play");
	}
	$(".btn2").on("click",function(){
		getMusic();
	});
	$(".btn4").on("click",function(){
		getChannel();
	});
	//获取频道列表
	function getChannel(){
		var html="";
		$.ajax({
				url: 'http://api.jirengu.com/fm/getChannels.php',
				dataType: 'json',
				Method: 'get',
				success: function(response){
					var channels = response.channels;
					var num = Math.floor(Math.random()*channels.length);
					var channelname = channels[num].name;
					var channelId = channels[num].channel_id;
					$('.record').text("频道："+channelname);
					$('.record').attr('title',channelname);
					$('.record').attr('data-id',channelId);
					getMusic();
				}
			})
	}

	// 获取歌曲
	function getMusic(){
		$.ajax({
			url:'http://api.jirengu.com/fm/getSong.php',
			dataType:'json',
			Method:'get',
			data:{'channel':$('.record').attr('data-id')},
			success:function(response){
				var resource=response.song[0],
					url=resource.url,
					bgPic=resource.picture,
					sid=resource.sid,//获取歌词参数
					ssid=resource.ssid,//获取歌词参数
					title=resource.title,
					author=resource.artist;
					album=resource.albumtitle;
				$('audio').attr('src',url);
				$('.musicname').text(title);
				$('.musicer').text("作者："+author);
				$('.album').text("专辑："+album);
				$('.wrap-bg').css({
					'background':'url('+bgPic+')',
					'background-repeat':'no-repeat',
					'background-position':'center',
					'background-size':'cover',
				});
				play();
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
			getMusic()
		}
	}

	

    // icon改变
    $(".fa-star").on("click",function(){
    	$(this).toggleClass('stared').toggleClass('colored');

    })
    $(".fa-heart").on("click",function(){
    	$(this).toggleClass('loved').toggleClass('colored');
    	
    })

    
    //音量按钮切换
	$(".volume-control").on("click",function(){
		$(".volume-control-progress").toggle("slow");
		 return;
		/*静音按钮设置
		$(".volume-control-progress").css({display:"none"});
		if($(".volume-control i").hasClass("fa-volume-up")){
			$(".volume-control i").removeClass("fa-volume-up").addClass("fa-volume-off");
			myAudio.muted=true;
		} else if ($(".volume-control i").hasClass("fa-volume-off")) {
			$(".volume-control i").removeClass("fa-volume-off").addClass("fa-volume-up");
			myAudio.muted=false;
		}
		*/
	})

	//设置音量、音量条初始值。
	myAudio.volume=0.5;
	$(".volume-control-time-start").height(50+"%");
	$(".volume-control-time-end").height((50)+"%");
	$(".volume-control-tag").offset().top+=(50-$(".volume-control-tag").height());

	//音量大小调节
	$(".volume-control-progress").on("mousedown",function(e){
		e.stopImmediatePropagation();
		var volumeTagH=$(".volume-control-tag").height();console.log(volumeTagH);
		var posY=Math.ceil(e.clientY); console.log(posY);
		var targetTop=Math.ceil($(this).offset().top);console.log(targetTop);
		var height=$(this).height();console.log(height);
		var percentage=(targetTop+height-posY);console.log(percentage);

		$(".volume-control-time-start").height(percentage+"%");
		$(".volume-control-time-end").height((height-percentage)+"%");
		$(".volume-control-tag").offset().top+=(percentage-volumeTagH);
		myAudio.volume=percentage/100;
		$(this).on("mouseleave",function(){
			$(this).hide('slow');
		})
	
	})
	$(".volume-control-progress").on("mouseup click",function(e){
		e.stopImmediatePropagation();
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

	// 设置频道：点击列表，切换到相应频道：
	$(".music-menu").on('click',".music-item",function(e){
		var $that=$(this);
		// myAudio.pause();
		pause();
		var curChannel=$that.attr("data-channel-id");
		var curChannelName=$that.text(); 
		$that.addClass("music-item-active");
		$that.siblings().removeClass("music-item-active");
		$('.record').attr('data-id',curChannel);
		$('.record').text("频道："+curChannelName);
        getMusic();
		
	})

// 初始化
	$(function(){
    	getChannel();
    	getChannels();
    })























