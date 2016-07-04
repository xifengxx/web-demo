
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
	$(".btn3").on("click",function(){
		getChannel();
	})
	$(".btn2").on("click",function(){
		getMusic();
	});
	$(".btn4").on("click",function(){
		getMusic();
	});
	//获取频道列表
	function getChannel(){
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

    $(function(){
    	getChannel();
    })

    