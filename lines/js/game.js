//游戏成绩记录
var mark=["","","",""];//第一个是第一关的成绩，第二个是第二关成绩，第三个是第三关成绩，第四个是总成绩
//锁屏
$(function(){document.addEventListener('touchmove',function(event){event.preventDefault();},false);});
//调整布局
$(function(){rs();});
$(window).resize(function(){rs();});
var rs=function(){
	var dw=document.documentElement.clientWidth;
	var dh=document.documentElement.clientHeight;
	if(0.76*dw>dh){
		$("#attention").show();document.body.addEventListener('touchmove',touchClock,false);
	}else{
		$("#attention").hide();document.body.removeEventListener('touchmove',touchClock);
	}
	$("body").css({"font-size":1*dw/360+"em"});
	$("#g_line").css({"top":(dh-890*dw/720)/2+170*dw/720+"px"});
	$("#g_main_frame").css({"top":(dh-890*dw/720)/2+170*dw/720+"px"});
	$("#g_main td").css({"height":86*dw/720+"px"});
	$("#g_main img").css({"margin-top":-0.06*dw+"px"});
	$("#res_but").css({"top":(dh-900*dw/720)/2+750*dw/720+"px"});
};
//页面加载时开始游戏
function loadgame(){
	//设置计数器显示数字
	$("#timer").html(gametimer+"'00");
	gamestart();
}
var icocont=0;//图标总数
var icosort=0;//图标种类
var icotemp=1;//图标起点（必须小于icosort）
var gamestage=1;//游戏关数
var icostep=0;//游戏进行中的游戏步数
//开始游戏函数
function gamestart(){
	//初始化游戏
	showboard();//绘制画布
	var ico=new Array(icocont);//建立临时数组
	//填充数组（所有图标出现次数为双数）
	for(var n=0;n<ico.length;n++){
		if(n%2==0){
			ico[n]=icotemp;
			if(icotemp<icosort){icotemp++;}
			else{icotemp=1;}
		}else{
			ico[n]=ico[n-1];
		}
	}
	//数组乱序
	ico=ico.sort(function(){return Math.random()>0.5?-1:1;});
	//根据数组填充图片
	for(var n=0;n<ico.length;n++){
		$(".ico"+(n+1)).html("<img id='icoimg"+(n+1)+"' src='images/i"+ico[n]+".png'/>");
	}
	rs();//重新定位
	gameready();//开始执行游戏准备动画
}
//绘制画布函数
function showboard(){
	//绘制
	var boardstr='<table id="g_main" width="100%" border="0" cellspacing="0" cellpadding="0">';
	for(var i=0;i<9;i++){
		var trstr='<tr><td id="'+i+'_0" width="8%">&nbsp;</td>';
		for(var j=1;j<8;j++){
			trstr=trstr+'<td id="'+i+'_'+j+'" width="12%">&nbsp;</td>';
		}
		trstr=trstr+'<td id="'+i+'_8" width="8%">&nbsp;</td></tr>';
		boardstr=boardstr+trstr;
	}
	boardstr=boardstr+'</table>';
	$("#g_main_frame").html(boardstr);
	//根据关数改变所放图标个数及布局
	var icoarray=new Array();
	switch(gamestage){
		case 1://第一关图标排列
			icoarray.push("2_2","2_4","2_6","3_2","3_6","4_2","4_6","5_2","5_6","6_2","6_4","6_6");
			icosort=4;//第一关图标种类
			break;
		case 2://第二关图标排列
			icoarray.push("1_2","1_3","1_4","1_5","1_6","2_2","3_2","3_5","3_6","4_2","4_6","5_2","5_3","5_6","6_6","7_2","7_3","7_4","7_5","7_6");
			icosort=6;//第二关图标种类
			break;
		case 3://第三关图标排列
			icoarray.push("1_1","1_3","1_4","1_5","1_7","2_2","2_4","2_6","3_3","3_4","3_5","4_1","4_2","4_3","4_5","4_6","4_7","5_3","5_4","5_5","6_2","6_4","6_6","7_1","7_3","7_4","7_5","7_7");
			icosort=8;//第三关图标种类
			break;
	}
	icocont=icoarray.length;//所处关数图标个数
	icostep=icocont*0.5;//游戏进行中的游戏步数
	for(var x=0;x<icoarray.length;x++){
		$("#"+icoarray[x]).addClass("ico"+(x+1));
	}
}
//游戏计时器
var gametimer=120;
var timecont=0;
var timer;
function starttimer(){
	if(timecont==0){
		timecont=gametimer*100;
	}
	$("#timer").html(gametimer+"'00");
	$("#timer_line").animate({"width":"0"},timecont*10*1.16,'linear');
	timer=setInterval(function(){
		timecont=timecont-1;
		var timehtml=""+timecont;
		if(timecont>=0){
			if(timehtml.length==5){
				timehtml=timehtml.substring(0,3)+"'"+timehtml.substring(3);
			}else if(timehtml.length==4){
				timehtml=timehtml.substring(0,2)+"'"+timehtml.substring(2);
			}else if(timehtml.length==3){
				timehtml=timehtml.substring(0,1)+"'"+timehtml.substring(1);
			}else if(timehtml.length==2){
				timehtml="0"+timehtml;
				timehtml=timehtml.substring(0,1)+"'"+timehtml.substring(1);
			}else{
				timehtml="00"+timehtml;
				timehtml=timehtml.substring(0,1)+"'"+timehtml.substring(1);
			}
			$("#timer").html(timehtml);
		}else{
			$("#timer_line").stop();
			timecont=0;
			clearInterval(timer);//清除计时器
			//解绑所有图标的触摸监听
			for(var n=0;n<icocont;n++){
				try{$("#g_main img")[n].removeEventListener('touchstart',touchSatrtFunc,false);}catch(e){}
			}
			//显示失败信息
			showres(1);
		}
	},10);
}
//计时器暂停及继续
$(function(){
	$("#pause")[0].addEventListener('touchstart',pausefunction,false);
	$("#pause")[0].addEventListener('touchend',pausefunction,false);
	$("#pause")[0].addEventListener('click',pausefunction,false);
	$("#goon").bind("click",function(){
		$("#pausecover").fadeOut(300,function(){starttimer();});
	});
});
function pausefunction(){
	$("#timer_line").stop();
	clearInterval(timer);
	$("#pausecover").fadeIn(300);
}
//游戏重新开始
function restartshow(){
	$("#timer_line").stop();
	clearInterval(timer);
	$("#restartcover").fadeIn(300);
}
$(function(){
	$("#restart_confirm").bind("click",function(){
		$("#restartcover").fadeOut(300,function(){restart();});
	});
	$("#restart_cancel").bind("click",function(){
		$("#restartcover").fadeOut(300,function(){starttimer();});
	});
});
//游戏准备动画
function gameready(){
	if(gamestage==1){
		$("#timer").html(gametimer+"'00");
	};
	$("#readybg").css({"display":"block"});
	$("#readytime").css({"display":"block"});
	$("#readybg").slideDown(200,function(){
	$("#readygo")[0].src="images/r"+gamestage+".png";
	$("#readygo").animate({"width":"80%","opacity":"1","margin-top":"1em"},600,function(){
	$("#readygo").animate({"opacity":"0"},600,function(){
	$("#readygo")[0].src="images/ready3.png";
	$("#readygo").animate({"width":"100%","margin-top":"0em"},0,function(){
	$("#readygo").animate({"width":"80%","opacity":"1","margin-top":"1em"},300,function(){
	$("#readygo").animate({"opacity":"0"},600,function(){
	$("#readygo")[0].src="images/ready2.png";
	$("#readygo").animate({"width":"100%","margin-top":"0em"},0,function(){
	$("#readygo").animate({"width":"80%","opacity":"1","margin-top":"1em"},300,function(){
	$("#readygo").animate({"opacity":"0"},600,function(){
	$("#readygo")[0].src="images/ready1.png";
	$("#readygo").animate({"width":"100%","margin-top":"0em"},0,function(){
	$("#readygo").animate({"width":"80%","opacity":"1","margin-top":"1em"},300,function(){
	$("#readygo").animate({"opacity":"0"},600,function(){
	$("#readygo")[0].src="images/readygo.png";
	$("#readygo").animate({"width":"100%","margin-top":"0em"},0,function(){
	$("#readygo").animate({"width":"80%","opacity":"1","margin-top":"1em"},300,function(){
	$("#readygo").animate({"opacity":"0"},300,function(){
	$("#readygo")[0].src="images/ready3.png";
	$("#readygo").animate({"width":"100%","margin-top":"0em"},0,function(){
	$("#readybg").slideUp(100,function(){
		if(gamestage!==3){$("#readygo")[0].src="images/r"+gamestage+1+".png";}
		$("#readybg").css({"display":"none"});
		$("#readytime").css({"display":"none"});
		icoaddlistener();//触发图标触摸监听
		//$("#restart").addEventListener('touchstart',restartshow,false);//设置重新开始按钮
		$("#restart")[0].addEventListener('touchstart',restartshow,false);
		$("#restart")[0].addEventListener('touchend',restartshow,false);
		$("#restart")[0].addEventListener('click',restartshow,false);
		starttimer();//计时器开始工作
	});});});});});});});});});});});});});});});});});
}
//为所有图标绑定触摸监听
function icoaddlistener(x){
	for(var n=0;n<icocont;n++){
		$("#g_main img")[n].addEventListener('touchstart',touchSatrtFunc,false);
	}
}
//触摸开始
var imgid="";
function touchSatrtFunc(obj){
	if(event.touches.length==1){

	event=obj;
	imgid=event.target.id;
	gamejudge(imgid);
	}
}
//游戏判定
var selected="";//全局参数，当前选中图标
var selnow=0;
function gamejudge(imgid){
	var imgpos=$("#"+imgid).parent()[0].id;
	var dw=document.documentElement.clientWidth;
	//保证不能重复选取同一图标
	if(selected!=imgpos){
		if(selected==""){
			//如果当前无选中图标
			selected=imgpos;
			$("#"+imgpos+" img").animate({"width":"14%","z-index":"1","margin-left":"-1%","margin-top":-0.07*dw+"px"},100);
		}else{
			//如果当前有选中图标
			if($("#"+imgpos+" img")[0].src==$("#"+selected+" img")[0].src){
				//或取所选两个图标的坐标位置
				var p1=getpoint(imgpos);
				var p2=getpoint(selected);
				//让图标先后按从左到右排列，设在左方的为p1，在右方的为p2
				if(p1.y>p2.y){
					var ptemp;
					ptemp=p1;p1=p2;p2=ptemp;
				}
				//判断是哪种情况
				if(p1.x==p2.x){//在同一水平线上
					var resway=simX(p1,p2);//使用纵向路径搜索方法
					if(resway.res==true){
						clearico(selected,imgpos);
					}else{
						changeico(selected,imgpos);
					}
				}else if(p1.y==p2.y){//在同一垂直线上
					//设在上方的为p1，在下方的为p2
					if(p1.x>p2.x){
						var ptemp;
						ptemp=p1;p1=p2;p2=ptemp;
					}
					var resway=simY(p1,p2);//使用横向路径搜索方法
					if(resway.res==true){
						clearico(selected,imgpos);
					}else{
						changeico(selected,imgpos);
					}
				}else if(p1.x<p2.x){//从左上到右下
					var resway=comXY_1(p1,p2);//使用左上到右下路径搜索方法
					if(resway.res==true){
						clearico(selected,imgpos);
					}else{
						changeico(selected,imgpos);
					}
				}else{//从左下到右上
					var resway=comXY_2(p1,p2);//使用左下到右下路径搜索方法
					if(resway.res==true){
						clearico(selected,imgpos);
					}else{
						changeico(selected,imgpos);
					}
				}
			}else{
				//两次所按下的图标种类不同
				changeico(selected,imgpos);
			}
		}
	}
}
//找到通路后图标消除动作
function clearico(ico1,ico2){
	var dw=document.documentElement.clientWidth;
	$("#"+ico1+" img").animate({"width":"18%","z-index":"1","margin-left":"-3%","margin-top":-0.09*dw+"px","opacity":"0"},1);
	$("#"+ico2+" img").animate({"width":"18%","z-index":"1","margin-left":"-3%","margin-top":-0.09*dw+"px","opacity":"0"},1,function(){
		$("#"+ico1).html("");
		$("#"+ico2).html("");
		selected="";
		icostep--;//游戏步数计数
		if(icostep==0){
			try{$("#timer_line").stop();clearInterval(timer);}catch(e){}//计时器停止
			gamewin();
		}
	});
}
//无法找到通路或者所选图标不同的情况下切换所选图标动作
function changeico(ico1,ico2){
	//两次所按下的图标种类不同
	var dw=document.documentElement.clientWidth;
	$("#"+ico1+" img").css({"width":"12%","z-index":"0","margin-left":"0","margin-top":-0.06*dw+"px"});
	$("#"+ico2+" img").animate({"width":"14%","z-index":"1","margin-left":"-1%","margin-top":-0.07*dw+"px"},100);
	selected=ico2;
}
//根据id获取点坐标方法
function getpoint(point){
	var restemp=point.split("_");
	var valuetemp=0;
	var htmltemp=$("#"+point).html().replace(/(^\s+)|(\s+$)/g,"");
	if(htmltemp!==""&&htmltemp!==null&&htmltemp!=="&nbsp;"){valuetemp=1;}
	var res={"x":parseInt(restemp[0]),"y":parseInt(restemp[1]),"va":valuetemp};
	return res;
}
//横向路径搜索方法（在同一垂直线上）
function simY(p1,p2){
	var over=0;//创建计数点，当计数点为2时，为通路
	var sec_y=0;//成功路径所通过的y轴
	var way={"res":false,"cos":"","key":""};
	//在同一垂直线上两点最短路径可通
	for(var i=p1.x;i<p2.x+1;i++){
		over=over+getpoint(i+"_"+p1.y).va;
	}
	if(over==2){
		//开始画图
		var dx=720;
		var cc=document.getElementById("g_line");
		var ctx=cc.getContext("2d");
		ctx.beginPath();
		ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
		ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
		ctx.lineWidth=3;
		ctx.strokeStyle="#FFFFFF";
		ctx.stroke();
		setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
		sec_y=p1.y;
	}else{//在同一垂直线上两点最短路径不可通
		over=0;//重置点数
		//开始以垂直线为中轴向左搜索
		for(var i=p1.y-1;i>=0;i--){
			var thisxvalue=0;
			var thisyvalue=0;
			for(var j=i+1;j<=p1.y;j++){
				thisxvalue=thisxvalue+getpoint(p1.x+"_"+j).va+getpoint(p2.x+"_"+j).va;
			}
			for(var s=p1.x;s<p2.x+1;s++){
				thisyvalue=thisyvalue+getpoint(s+"_"+i).va;
			}
			over=thisxvalue+thisyvalue;
			if(over==2){
				//开始画图
				var dx=720;
				var cc=document.getElementById("g_line");
				var ctx=cc.getContext("2d");
				ctx.beginPath();
				ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
				ctx.lineTo((0.08+i*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
				ctx.lineTo((0.08+i*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
				ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
				ctx.lineWidth=3;
				ctx.strokeStyle="#FFFFFF";
				ctx.stroke();
				setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
				sec_y=i;
				break;
			}
		}
		//如向左搜索未果，开始以垂直线为中轴向右搜索
		if(over!==2){
			over=0;//重置点数
			for(var i=p1.y+1;i<=8;i++){
				var thisxvalue=0;
				var thisyvalue=0;
				for(var j=p1.y;j<=i-1;j++){
					thisxvalue=thisxvalue+getpoint(p1.x+"_"+j).va+getpoint(p2.x+"_"+j).va;
				}
				for(var s=p1.x;s<p2.x+1;s++){
					thisyvalue=thisyvalue+getpoint(s+"_"+i).va;
				}
				over=thisxvalue+thisyvalue;
				if(over==2){
					//开始画图
					var dx=720;
					var cc=document.getElementById("g_line");
					var ctx=cc.getContext("2d");
					ctx.beginPath();
					ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
					ctx.lineTo((0.08+i*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
					ctx.lineTo((0.08+i*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
					ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
					ctx.lineWidth=3;
					ctx.strokeStyle="#FFFFFF";
					ctx.stroke();
					setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
					sec_y=i;
					break;
				}
			}
		}
	}
	if(over==2){
		way={"res":true,"cos":"y","key":sec_y};
	}
	return way;
}
//纵向路径搜索方法（在同一水平线上）
function simX(p1,p2){
	var over=0;//创建计数点，当计数点为2时，为通路
	var sec_x=0;//成功路径所通过的x轴
	var way={"res":false,"cos":"","key":""};
	//在同一水平线上两点最短路径可通
	for(var i=p1.y;i<p2.y+1;i++){
		over=over+getpoint(p1.x+"_"+i).va;
	}
	if(over==2){
		//开始画图
		var dx=720;
		var cc=document.getElementById("g_line");
		var ctx=cc.getContext("2d");
		ctx.beginPath();
		ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
		ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
		ctx.lineWidth=3;
		ctx.strokeStyle="#FFFFFF";
		ctx.stroke();
		setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
		sec_x=p1.x;
	}else{//在同一垂直线上两点最短路径不可通
		over=0;//重置点数
		//开始以垂直线为中轴向上搜索
		for(var i=p1.x-1;i>=0;i--){
			var thisxvalue=0;
			var thisyvalue=0;
			for(var j=i+1;j<=p1.x;j++){
				thisyvalue=thisyvalue+getpoint(j+"_"+p1.y).va+getpoint(j+"_"+p2.y).va;
			}
			for(var s=p1.y;s<p2.y+1;s++){
				thisxvalue=thisxvalue+getpoint(i+"_"+s).va;
			}
			over=thisxvalue+thisyvalue;
			if(over==2){
				//开始画图
				var dx=720;
				var cc=document.getElementById("g_line");
				var ctx=cc.getContext("2d");
				ctx.beginPath();
				ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
				ctx.lineTo((0.08+p1.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
				ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
				ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
				ctx.lineWidth=3;
				ctx.strokeStyle="#FFFFFF";
				ctx.stroke();
				setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
				sec_x=i;
				break;
			}
		}
		//如向上搜索未果，开始以垂直线为中轴向下搜索
		if(over!==2){
			over=0;//重置点数
			for(var i=p1.x+1;i<=8;i++){
				var thisxvalue=0;
				var thisyvalue=0;
				for(var j=p1.x;j<=i-1;j++){
					thisyvalue=thisyvalue+getpoint(j+"_"+p1.y).va+getpoint(j+"_"+p2.y).va;
				}
				for(var s=p1.y;s<p2.y+1;s++){
					thisxvalue=thisxvalue+getpoint(i+"_"+s).va;
				}
				over=thisxvalue+thisyvalue;
				if(over==2){
					//开始画图
					var dx=720;
					var cc=document.getElementById("g_line");
					var ctx=cc.getContext("2d");
					ctx.beginPath();
					ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
					ctx.lineTo((0.08+p1.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
					ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
					ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
					ctx.lineWidth=3;
					ctx.strokeStyle="#FFFFFF";
					ctx.stroke();
					setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
					sec_x=i;
					break;
				}
			}
		}
	}
	if(over==2){
		way={"res":true,"cos":"x","key":sec_x};
	}
	return way;
}
//斜角路径搜索（从左上到右下）
function comXY_1(p1,p2){
	var over=0;//创建计数点，当计数点为2时，为通路
	var sec_y=0;//成功路径所通过的y轴
	var sec_x=0;//成功路径所通过的x轴
	var way={"res":false,"cos":"","key_x":"","key_y":""};
	//在两点最短路径可通情况1
	for(var i=p1.y;i<p2.y;i++){
		over=over+getpoint(p1.x+"_"+i).va;
	}
	for(var i=p1.x;i<p2.x+1;i++){
		over=over+getpoint(i+"_"+p2.y).va;
	}
	if(over==2){
		//开始画图
		var dx=720;
		var cc=document.getElementById("g_line");
		var ctx=cc.getContext("2d");
		ctx.beginPath();
		ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
		ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
		ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
		ctx.lineWidth=3;
		ctx.strokeStyle="#FFFFFF";
		ctx.stroke();
		setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
		sec_x=p1.x;
		sec_y=p2.y;
	}else{
		//在两点最短路径可通情况2
		over=0;//重置点数
		for(var i=p1.x;i<p2.x;i++){
			over=over+getpoint(i+"_"+p1.y).va;
		}
		for(var i=p1.y;i<p2.y+1;i++){
			over=over+getpoint(p2.x+"_"+i).va;
		}
		if(over==2){
			//开始画图
			var dx=720;
			var cc=document.getElementById("g_line");
			var ctx=cc.getContext("2d");
			ctx.beginPath();
			ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
			ctx.lineTo((0.08+p1.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
			ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
			ctx.lineWidth=3;
			ctx.strokeStyle="#FFFFFF";
			ctx.stroke();
			setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
			sec_x=p2.x;
			sec_y=p1.y;
		}else{//在两点最短路径不可通
			over=0;//重置点数
			//开始横向搜索路径(两点y坐标之间优先)
			if(p1.y+1!==p2.y){
				for(var i=p1.y+1;i<p2.y;i++){
					var thisxvalue=0;
					var thisyvalue=0;
					for(var j=p1.y;j<i;j++){
						thisxvalue=thisxvalue+getpoint(p1.x+"_"+j).va;
					}
					for(var j=i+1;j<p2.y+1;j++){
						thisxvalue=thisxvalue+getpoint(p2.x+"_"+j).va;
					}
					for(var s=p1.x;s<p2.x+1;s++){
						thisyvalue=thisyvalue+getpoint(s+"_"+i).va;
					}
					over=thisxvalue+thisyvalue;
					if(over==2){
						//开始画图
						var dx=720;
						var cc=document.getElementById("g_line");
						var ctx=cc.getContext("2d");
						ctx.beginPath();
						ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+i*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+i*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
						ctx.lineWidth=3;
						ctx.strokeStyle="#FFFFFF";
						ctx.stroke();
						setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
						sec_y=i;
						break;
					}
				}
			}
			//开始横向搜索路径(搜索左边的坐标的左边)
			if(over!==2){
				over=0;//重置点数
				for(var i=p1.y-1;i>=0;i--){
					var thisxvalue=0;
					var thisyvalue=0;
					for(var j=p1.y;j>i;j--){
						thisxvalue=thisxvalue+getpoint(p1.x+"_"+j).va;
					}
					for(var j=p2.y;j>i;j--){
						thisxvalue=thisxvalue+getpoint(p2.x+"_"+j).va;
					}
					for(var s=p1.x;s<p2.x+1;s++){
						thisyvalue=thisyvalue+getpoint(s+"_"+i).va;
					}
					over=thisxvalue+thisyvalue;
					if(over==2){
						//开始画图
						var dx=720;
						var cc=document.getElementById("g_line");
						var ctx=cc.getContext("2d");
						ctx.beginPath();
						ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+i*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+i*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
						ctx.lineWidth=3;
						ctx.strokeStyle="#FFFFFF";
						ctx.stroke();
						setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
						sec_y=i;
						break;
					}
				}
			}
			//开始横向搜索路径(搜索右边的坐标的右边)
			if(over!==2){
				over=0;//重置点数
				for(var i=p2.y+1;i<=8;i++){
					var thisxvalue=0;
					var thisyvalue=0;
					for(var j=p1.y;j<i;j++){
						thisxvalue=thisxvalue+getpoint(p1.x+"_"+j).va;
					}
					for(var j=p2.y;j<i;j++){
						thisxvalue=thisxvalue+getpoint(p2.x+"_"+j).va;
					}
					for(var s=p1.x;s<p2.x+1;s++){
						thisyvalue=thisyvalue+getpoint(s+"_"+i).va;
					}
					over=thisxvalue+thisyvalue;
					if(over==2){
						//开始画图
						var dx=720;
						var cc=document.getElementById("g_line");
						var ctx=cc.getContext("2d");
						ctx.beginPath();
						ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+i*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+i*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
						ctx.lineWidth=3;
						ctx.strokeStyle="#FFFFFF";
						ctx.stroke();
						setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
						sec_y=i;
						break;
					}
				}
			}
			if(over!==2){
				over=0;//重置点数
				//开始纵向搜索路径(两点x坐标之间优先)
				if(p1.x+1!==p2.x){
					for(var i=p1.x+1;i<p2.x;i++){
						var thisxvalue=0;
						var thisyvalue=0;
						for(var j=p1.x;j<i;j++){
							thisxvalue=thisxvalue+getpoint(j+"_"+p1.y).va;
						}
						for(var j=i+1;j<p2.x+1;j++){
							thisxvalue=thisxvalue+getpoint(j+"_"+p2.y).va;
						}
						for(var s=p1.y;s<p2.y+1;s++){
							thisyvalue=thisyvalue+getpoint(i+"_"+s).va;
						}
						over=thisxvalue+thisyvalue;
						if(over==2){
							//开始画图
							var dx=720;
							var cc=document.getElementById("g_line");
							var ctx=cc.getContext("2d");
							ctx.beginPath();
							ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
							ctx.lineTo((0.08+p1.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
							ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
							ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
							ctx.lineWidth=3;
							ctx.strokeStyle="#FFFFFF";
							ctx.stroke();
							setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
							sec_x=i;
							break;
						}
					}
				}
				//开始纵向搜索路径(搜索上边的坐标的上边)
				if(over!==2){
					over=0;//重置点数
					for(var i=p1.x-1;i>=0;i--){
						var thisxvalue=0;
						var thisyvalue=0;
						for(var j=p1.x;j>i;j--){
							thisxvalue=thisxvalue+getpoint(j+"_"+p1.y).va;
						}
						for(var j=p2.x;j>i;j--){
							thisxvalue=thisxvalue+getpoint(j+"_"+p2.y).va;
						}
						for(var s=p1.y;s<p2.y+1;s++){
							thisyvalue=thisyvalue+getpoint(i+"_"+s).va;
						}
						over=thisxvalue+thisyvalue;
						if(over==2){
							//开始画图
							var dx=720;
							var cc=document.getElementById("g_line");
							var ctx=cc.getContext("2d");
							ctx.beginPath();
							ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
							ctx.lineTo((0.08+p1.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
							ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
							ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
							ctx.lineWidth=3;
							ctx.strokeStyle="#FFFFFF";
							ctx.stroke();
							setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
							sec_x=i;
							break;
						}
					}
				}
				//开始纵向搜索路径(搜索下边的坐标的下边)
				if(over!==2){
					over=0;//重置点数
					for(var i=p2.x+1;i<=8;i++){
						var thisxvalue=0;
						var thisyvalue=0;
						for(var j=p1.x;j<i;j++){
							thisxvalue=thisxvalue+getpoint(j+"_"+p1.y).va;
						}
						for(var j=p2.x;j<i;j++){
							thisxvalue=thisxvalue+getpoint(j+"_"+p2.y).va;
						}
						for(var s=p1.y;s<p2.y+1;s++){
							thisyvalue=thisyvalue+getpoint(i+"_"+s).va;
						}
						over=thisxvalue+thisyvalue;
						if(over==2){
							//开始画图
							var dx=720;
							var cc=document.getElementById("g_line");
							var ctx=cc.getContext("2d");
							ctx.beginPath();
							ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
							ctx.lineTo((0.08+p1.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
							ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
							ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
							ctx.lineWidth=3;
							ctx.strokeStyle="#FFFFFF";
							ctx.stroke();
							setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
							sec_x=i;
							break;
						}
					}
				}
			}
		}
	}
	if(over==2){
		way={"res":true,"cos":"","key_x":sec_x,"key_y":sec_y};
	}
	return way;
}
//斜角路径搜索（从左下到右上）
function comXY_2(p1,p2){
	var over=0;//创建计数点，当计数点为2时，为通路
	var sec_y=0;//成功路径所通过的y轴
	var sec_x=0;//成功路径所通过的x轴
	var way={"res":false,"cos":"","key_x":"","key_y":""};
	//在两点最短路径可通情况1
	for(var i=p1.y+1;i<p2.y+1;i++){
		over=over+getpoint(p2.x+"_"+i).va;
	}
	for(var i=p2.x;i<p1.x+1;i++){
		over=over+getpoint(i+"_"+p1.y).va;
	}
	if(over==2){
		//开始画图
		var dx=720;
		var cc=document.getElementById("g_line");
		var ctx=cc.getContext("2d");
		ctx.beginPath();
		ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
		ctx.lineTo((0.08+p1.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
		ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
		ctx.lineWidth=3;
		ctx.strokeStyle="#FFFFFF";
		ctx.stroke();
		setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
		sec_x=p1.x;
		sec_y=p2.y;
	}else{
		//在两点最短路径可通情况2
		over=0;//重置点数
		for(var i=p2.x;i<p1.x;i++){
			over=over+getpoint(i+"_"+p2.y).va;
		}
		for(var i=p1.y;i<p2.y+1;i++){
			over=over+getpoint(p1.x+"_"+i).va;
		}
		if(over==2){
			//开始画图
			var dx=720;
			var cc=document.getElementById("g_line");
			var ctx=cc.getContext("2d");
			ctx.beginPath();
			ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
			ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
			ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
			ctx.lineWidth=3;
			ctx.strokeStyle="#FFFFFF";
			ctx.stroke();
			setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
			sec_x=p2.x;
			sec_y=p1.y;
		}else{//在两点最短路径不可通
			over=0;//重置点数
			//开始横向搜索路径(两点y坐标之间优先)
			if(p1.y+1!==p2.y){
				for(var i=p1.y+1;i<p2.y;i++){
					var thisxvalue=0;
					var thisyvalue=0;
					for(var j=p1.y;j<i;j++){
						thisxvalue=thisxvalue+getpoint(p1.x+"_"+j).va;
					}
					for(var j=i+1;j<p2.y+1;j++){
						thisxvalue=thisxvalue+getpoint(p2.x+"_"+j).va;
					}
					for(var s=p2.x;s<p1.x+1;s++){
						thisyvalue=thisyvalue+getpoint(s+"_"+i).va;
					}
					over=thisxvalue+thisyvalue;
					if(over==2){
						//开始画图
						var dx=720;
						var cc=document.getElementById("g_line");
						var ctx=cc.getContext("2d");
						ctx.beginPath();
						ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+i*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+i*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
						ctx.lineWidth=3;
						ctx.strokeStyle="#FFFFFF";
						ctx.stroke();
						setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
						sec_y=i;
						break;
					}
				}
			}
			//开始横向搜索路径(搜索左边的坐标的左边)
			if(over!==2){
				over=0;//重置点数
				for(var i=p1.y-1;i>=0;i--){
					var thisxvalue=0;
					var thisyvalue=0;
					for(var j=p1.y;j>i;j--){
						thisxvalue=thisxvalue+getpoint(p1.x+"_"+j).va;
					}
					for(var j=p2.y;j>i;j--){
						thisxvalue=thisxvalue+getpoint(p2.x+"_"+j).va;
					}
					for(var s=p2.x;s<p1.x+1;s++){
						thisyvalue=thisyvalue+getpoint(s+"_"+i).va;
					}
					over=thisxvalue+thisyvalue;
					if(over==2){
						//开始画图
						var dx=720;
						var cc=document.getElementById("g_line");
						var ctx=cc.getContext("2d");
						ctx.beginPath();
						ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+i*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+i*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
						ctx.lineWidth=3;
						ctx.strokeStyle="#FFFFFF";
						ctx.stroke();
						setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
						sec_y=i;
						break;
					}
				}
			}
			//开始横向搜索路径(搜索右边的坐标的右边)
			if(over!==2){
				over=0;//重置点数
				for(var i=p2.y+1;i<=8;i++){
					var thisxvalue=0;
					var thisyvalue=0;
					for(var j=p1.y;j<i;j++){
						thisxvalue=thisxvalue+getpoint(p1.x+"_"+j).va;
					}
					for(var j=p2.y;j<i;j++){
						thisxvalue=thisxvalue+getpoint(p2.x+"_"+j).va;
					}
					for(var s=p2.x;s<p1.x+1;s++){
						thisyvalue=thisyvalue+getpoint(s+"_"+i).va;
					}
					over=thisxvalue+thisyvalue;
					if(over==2){
						//开始画图
						var dx=720;
						var cc=document.getElementById("g_line");
						var ctx=cc.getContext("2d");
						ctx.beginPath();
						ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+i*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+i*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
						ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
						ctx.lineWidth=3;
						ctx.strokeStyle="#FFFFFF";
						ctx.stroke();
						setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
						sec_y=i;
						break;
					}
				}
			}
			if(over!==2){
				over=0;//重置点数
				//开始纵向搜索路径(两点x坐标之间优先)
				if(p2.x+1!==p1.x){
					for(var i=p2.x+1;i<p1.x;i++){
						var thisxvalue=0;
						var thisyvalue=0;
						for(var j=p2.x;j<i;j++){
							thisxvalue=thisxvalue+getpoint(j+"_"+p2.y).va;
						}
						for(var j=i+1;j<p1.x+1;j++){
							thisxvalue=thisxvalue+getpoint(j+"_"+p1.y).va;
						}
						for(var s=p1.y;s<p2.y+1;s++){
							thisyvalue=thisyvalue+getpoint(i+"_"+s).va;
						}
						over=thisxvalue+thisyvalue;
						if(over==2){
							//开始画图
							var dx=720;
							var cc=document.getElementById("g_line");
							var ctx=cc.getContext("2d");
							ctx.beginPath();
							ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
							ctx.lineTo((0.08+p1.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
							ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
							ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
							ctx.lineWidth=3;
							ctx.strokeStyle="#FFFFFF";
							ctx.stroke();
							setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
							sec_x=i;
							break;
						}
					}
				}
				//开始纵向搜索路径(搜索上边的坐标的上边)
				if(over!==2){
					over=0;//重置点数
					for(var i=p2.x-1;i>=0;i--){
						var thisxvalue=0;
						var thisyvalue=0;
						for(var j=p1.x;j>i;j--){
							thisxvalue=thisxvalue+getpoint(j+"_"+p1.y).va;
						}
						for(var j=p2.x;j>i;j--){
							thisxvalue=thisxvalue+getpoint(j+"_"+p2.y).va;
						}
						for(var s=p1.y;s<p2.y+1;s++){
							thisyvalue=thisyvalue+getpoint(i+"_"+s).va;
						}
						over=thisxvalue+thisyvalue;
						if(over==2){
							//开始画图
							var dx=720;
							var cc=document.getElementById("g_line");
							var ctx=cc.getContext("2d");
							ctx.beginPath();
							ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
							ctx.lineTo((0.08+p1.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
							ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
							ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
							ctx.lineWidth=3;
							ctx.strokeStyle="#FFFFFF";
							ctx.stroke();
							setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
							sec_x=i;
							break;
						}
					}
				}
				//开始纵向搜索路径(搜索下边的坐标的下边)
				if(over!==2){
					over=0;//重置点数
					for(var i=p1.x+1;i<=8;i++){
						var thisxvalue=0;
						var thisyvalue=0;
						for(var j=p1.x;j<i;j++){
							thisxvalue=thisxvalue+getpoint(j+"_"+p1.y).va;
						}
						for(var j=p2.x;j<i;j++){
							thisxvalue=thisxvalue+getpoint(j+"_"+p2.y).va;
						}
						for(var s=p1.y;s<p2.y+1;s++){
							thisyvalue=thisyvalue+getpoint(i+"_"+s).va;
						}
						over=thisxvalue+thisyvalue;
						if(over==2){
							//开始画图
							var dx=720;
							var cc=document.getElementById("g_line");
							var ctx=cc.getContext("2d");
							ctx.beginPath();
							ctx.moveTo((0.08+p1.y*0.12-0.06)*dx,((p1.x+1)*0.12-0.06)*dx);
							ctx.lineTo((0.08+p1.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
							ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,(0.12+i*0.12-0.06)*dx);
							ctx.lineTo((0.08+p2.y*0.12-0.06)*dx,((p2.x+1)*0.12-0.06)*dx);
							ctx.lineWidth=3;
							ctx.strokeStyle="#FFFFFF";
							ctx.stroke();
							setTimeout(function(){ctx.clearRect(0,0,720,780);},180);
							sec_x=i;
							break;
						}
					}
				}
			}
		}
	}
	if(over==2){
		way={"res":true,"cos":"","key_x":sec_x,"key_y":sec_y};
	}
	return way;
}
//游戏胜利
function gamewin(){
	if(gamestage==1){
		tonext();
	}else if(gamestage==2){
		tonext();
	}else{
		showmark();
		//showres(2);
	}
}
//开始下一关
function tonext(){
	$("#res_1").fadeOut(300);
	$("#res_2").fadeOut(300);
	$("#blackcover").fadeOut(300,function(){
		if(gamestage==1){
			try{$("#timer_line").stop();clearInterval(timer);}catch(e){}//计时器停止
			$("#restart").unbind("click");//关闭重新开始按钮
			gamestage=2;//设置关数
			gamestart();//游戏初始化
		}else if(gamestage==2){
			try{$("#timer_line").stop();clearInterval(timer);}catch(e){}//计时器停止
			$("#restart").unbind("click");//关闭重新开始按钮
			gamestage=3;//设置关数
			gamestart();//游戏初始化
		}
	});
}
//重新开始
function restart(){
	mark=["","","",""];
	try{$("#timer_line").stop();$("#timer_line").css({"width":"99%"});timecont=0;clearInterval(timer);}catch(e){}//计时器停止
	$("#restart").unbind("click");//关闭重新开始按钮
	$("#res_1").fadeOut(300);
	$("#res_2").fadeOut(300);
	$("#blackcover").fadeOut(300,function(){
		gamestage=1;//设置关数
		gamestart();//游戏初始化
	});
}
//显示结果信息
function showres(num){
	$("#blackcover").fadeIn(300,function(){
		$("#res_"+num).fadeIn(300);
	});
};
//结果页面按钮指向
$(function(){
	$("#res_restart1").bind("click",function(){restart();});
	$("#res_restart2").bind("click",function(){restart();});
});
//计算成绩
function showmark(){
	var tt=gametimer;tc=0;
	tc=tt*100;
	var marktemp=tc-timecont;
	var timehtml=""+marktemp;
	if(timehtml.length==5){
		timehtml=timehtml.substring(0,3)+"'"+timehtml.substring(3);
	}else if(timehtml.length==4){
		timehtml=timehtml.substring(0,2)+"'"+timehtml.substring(2);
	}else if(timehtml.length==3){
		timehtml=timehtml.substring(0,1)+"'"+timehtml.substring(1);
	}else if(timehtml.length==2){
		timehtml="0"+timehtml;
		timehtml=timehtml.substring(0,1)+"'"+timehtml.substring(1);
	}else{
		timehtml="00"+timehtml;
		timehtml=timehtml.substring(0,1)+"'"+timehtml.substring(1);
	}
	//$("#finaltime").html(timehtml);
	var percent=0;
	if(marktemp<=2000){percent=(Math.round(Math.random()*49)+950)/10}
	else if(marktemp>2000&&marktemp<=2500){percent=(Math.round(Math.random()*49)+900)/10}
	else if(marktemp>2500&&marktemp<=3000){percent=(Math.round(Math.random()*49)+850)/10}
	else if(marktemp>3000&&marktemp<=3500){percent=(Math.round(Math.random()*149)+700)/10}
	else if(marktemp>3500&&marktemp<=4000){percent=(Math.round(Math.random()*99)+600)/10}
	else if(marktemp>4000&&marktemp<=5000){percent=(Math.round(Math.random()*199)+400)/10}
	else if(marktemp>5000&&marktemp<=7000){percent=(Math.round(Math.random()*199)+200)/10}
	else{percent=(Math.round(Math.random()*199)+1)/10}
	//$("#percent").html(percent);
	window.location.href="result.html?marktemp="+marktemp+"&percent="+percent;
}
//锁屏方法
var touchClock=function(event){
	event.preventDefault();
}
//微信版点击分享及关闭分享
$(function(){
	$("#overshare").bind("click",function(){
		$("#shareimg").fadeIn(400);
	});
	$("#close_but").bind("click",function(){
		$("#shareimg").fadeOut(400);
	});
});
