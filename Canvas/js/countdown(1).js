var Window_width=1200;
var Window_height=800;
var Radius=8;
var Margin_top=60;
var Margin_left=30;


/*var endTime =new Date();
endTime.setTime(endTime.getTime()+3600*1000)*/


var curShowTimeSeconds = 0;

var balls=[];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
;

window.onload=function(){
	Window_width = document.body.clientWidth;
    Window_height = document.body.clientHeight;

    Margin_left = Math.round(Window_width /10);
    Radius = Math.round(Window_width * 4 / 5 / 108)-1;

    Margin_top = Math.round(Window_height /5);

	var canvas=document.getElementById("canvas");
	var ctx=canvas.getContext("2d");
	canvas.width=Window_width;
	canvas.height=Window_height;
	curShowTimeSeconds = getCurrentShowTimeSeconds();

	setInterval(function(){
		render(ctx);
		update();
	},50)
	
}
function getCurrentShowTimeSeconds(){
	
	var curTime=new Date();
	var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
	//到现在共计多少秒。
	return ret;
    
}

function update(){
	var nextShowTimeSeconds=getCurrentShowTimeSeconds();
	var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 );
    var nextSeconds = nextShowTimeSeconds % 60;

    var CurHours = parseInt( curShowTimeSeconds / 3600);
    var CurMinutes = parseInt( (curShowTimeSeconds - CurHours * 3600)/60 );
    var CurSeconds = curShowTimeSeconds % 60;

    if (nextSeconds!=CurSeconds) {
    	if (parseInt(CurHours/10)!=parseInt(nextHours/10)) {
    		addBalls(Margin_left,Margin_top,parseInt(CurHours/10));
    	}
    	if (parseInt(CurHours%10)!=parseInt(nextHours%10)) {
    		addBalls(Margin_left+15*(Radius+1),Margin_top,parseInt(CurHours%10));
    	}

    	if( parseInt(CurMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( Margin_left + 39*(Radius+1) , Margin_top , parseInt(CurMinutes/10) );
        }
        if( parseInt(CurMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( Margin_left + 54*(Radius+1) , Margin_top , parseInt(CurMinutes%10) );
        }

        if( parseInt(CurSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( Margin_left + 78*(Radius+1) , Margin_top , parseInt(CurSeconds/10) );
        }
        if( parseInt(CurSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( Margin_left + 93*(Radius+1) , Margin_top , parseInt(CurSeconds%10) );
        }

    	curShowTimeSeconds=nextShowTimeSeconds;
    }
    updateBalls();
}

function updateBalls(){
	for (var i = 0; i < balls.length; i++) {
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		if (balls[i].y>=Window_height-Radius) {
			balls[i].y=Window_height-Radius;
			balls[i].vy=-balls[i].vy*0.75;
		}
	}

	// 性能优化：限制画布里的小球，使其不一直增加。
	/*var cnt=0;
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].x+Radius>0 && balls[i].x-Radius<Window_width) {
			balls[cnt++]=balls[i];
		}
	}
	while(balls.length>Math.min(300,cnt)){
		balls.pop();
	}
*/	
	for (var i = 0; i < balls.length; i++) {
	 if (balls[i].x>canvas.width||balls[i].x<-Radius) {
          balls.splice(i,1)
        };
    }
}

function addBalls(x,y,num){
	for( var i = 0  ; i < digit[num].length ; i ++ ){
        for( var j = 0  ; j < digit[num][i].length ; j ++ ){
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(Radius+1)+(Radius+1),
                    y:y+i*2*(Radius+1)+(Radius+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }

                balls.push( aBall )
            }
        }
	}
}


function render(ctx){

	ctx.clearRect(0,0,Window_width,Window_height);
	var hours = parseInt( curShowTimeSeconds / 3600);
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 );
    var seconds = curShowTimeSeconds % 60;

    /* 这里限定当前时间距离截至时间在100小时以内，否则会报错。
    if (hours>=100&&hours<1000) {
    	renderDigit(Margin_left-30,Margin_top,parseInt(hours/100),ctx);
    	renderDigit(Margin_left,Margin_top,parseInt(hours%100/10),ctx);
		renderDigit(Margin_left+15*(Radius+1),Margin_top,parseInt(hours%10),ctx)
    }else if (hours<100) {
    	renderDigit(Margin_left,Margin_top,parseInt(hours/10),ctx);
		renderDigit(Margin_left+15*(Radius+1),Margin_top,parseInt(hours%10),ctx)
    }*/

	renderDigit(Margin_left,Margin_top,parseInt(hours/10),ctx);
	renderDigit(Margin_left+15*(Radius+1),Margin_top,parseInt(hours%10),ctx)
	renderDigit(Margin_left+30*(Radius+ 1),Margin_top,10,ctx)
	renderDigit(Margin_left+39*(Radius+1),Margin_top,parseInt(minutes/10),ctx)
	renderDigit(Margin_left+54*(Radius+1),Margin_top,parseInt(minutes%10),ctx)
	renderDigit(Margin_left+69*(Radius+ 1),Margin_top,10,ctx)
	renderDigit(Margin_left+78*(Radius+1),Margin_top,parseInt(seconds/10),ctx)
	renderDigit(Margin_left+93*(Radius+1),Margin_top,parseInt(seconds%10),ctx)


	for( var i = 0 ; i < balls.length ; i ++ ){
        ctx.fillStyle=balls[i].color;

        ctx.beginPath();
        ctx.arc( balls[i].x , balls[i].y , Radius , 0 , 2*Math.PI , true );
        ctx.closePath();

        ctx.fill();
    }
}
function renderDigit(x,y,num,ctx){
	ctx.fillStyle="rgb(0,144,153)";
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j]==1) {
				ctx.beginPath();
				ctx.arc(x+j*2*(Radius+1)+(Radius+1), y+i*2*(Radius+1)+(Radius+1),Radius,0,2*Math.PI);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
}