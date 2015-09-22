//图片预加载
var l=['loading_sinker.png','loading_bg.gif','timer_bg.png','timer_line.png'];
var d=['bg.jpg','exchange.png','go.png','index_bg.jpg','index_board.jpg','index_but.png','index_foot.png','index_rule_but.png','index_title.png','index_title_main.png','index_txt.png','logo.png','lose.png','lose_restart.png','lose_tonext.png','product_bg.jpg','product_but.png','product_logo.png','ready_1.png','ready_2.png','ready_3.png','ready_but.png','ready_main1.png','ready_main2.png','ready_main3.png','rule.png','rule_but.png','rule_close.png','s1_bag_bg.png','s1_bag_main.png','s1_bg.png','s1_right1.png','s1_right1c.png','s1_right2.png','s1_right2c.png','s1_right3.png','s1_right3c.png','s1_right4.png','s1_right4c.png','s2_right1.png','s2_right1c.png','s2_right2.png','s2_right2c.png','s2_right3.png','s2_right3c.png','s2_right4.png','s2_right4c.png','s2_right5.png','s2_right5c.png','s3_right1.png','s3_right1c.png','s3_right2.png','s3_right2c.png','s3_right3.png','s3_right3c.png','s3_right4.png','s3_right4c.png','s3_right5.png','s3_right5c.png','s3_right6.png','s3_right6c.png','s1_wrong1.png','s1_wrong2.png','s1_wrong3.png','s1_wrong4.png','s1_wrong5.png','s1_wrong6.png','s1_wrong7.png','s1_wrong8.png','s1_wrong9.png','s1_wrong10.png','s1_wrong11.png','s1_wrong12.png','s1_wrong13.png','s1_wrong14.png','s1_wrong15.png','s1_wrong16.png','s1_wrong17.png','s1_wrong18.png','s1_wrong19.png','s1_wrong20.png','s1_wrong21.png','s1_wrong22.png','s1_wrong23.png','s1_wrong24.png','s1_wrong25.png','s1_wrong26.png','s1_wrong27.png','s1_wrong28.png','s1_wrong29.png','s1_wrong30.png','s1_wrong31.png','s1_wrong32.png','s1_wrong33.png','s1_wrong34.png','sen2_bg.jpg','sen3_bg.jpg','seven.png','shake_but.png','shake_but_txt.png','shake_txt.png','sinker.png','timer_board.png','win.png','fin_foot1.jpg','fin_foot2.jpg','fin_again.gif','fin_lose_main.gif','fin_win_main.gif','fin_share.gif','share.png'];
function loadimg(num){
	var limg1=new Image;
	limg1.src='images/'+l[0];
	limg1.onload=function(){
		$("#hide").append("<img src='images/"+l[0]+"'/>");
		var limg2=new Image;
		limg2.src='images/'+l[1];
		limg2.onload=function(){
			$("#hide").append("<img src='images/"+l[1]+"'/>");
			var limg3=new Image;
			limg3.src='images/'+l[2];
			limg3.onload=function(){
				$("#hide").append("<img src='images/"+l[2]+"'/>");
				var limg4=new Image;
				limg4.src='images/'+l[3];
				limg4.onload=function(){
					$("#hide").append("<img src='images/"+l[3]+"'/>");
					$("#loading").fadeIn(300,function(){
						var timg=new Image;
						timg.src='images/'+d[num];
						timg.onload=function(){
							$("#hide").append("<img src='images/"+d[num]+"'/>");
							var x=parseInt((num+1)/d.length*100);
							if(x>100){x=100}
							$("#index_timer_line").stop().animate({"width":x+"%"},100);
							if(num<d.length-1){
								setTimeout(function(){
									loadimg(num+1);
								},50);
							}
							if(num==d.length-1){
								setTimeout(function(){
									$("#loading").fadeOut(400,function(){
										$("#first_page").fadeIn(400,function(){$("#stage1").show();});
									});
								},500);
							}
						}
					});
				};
			};
		};
	};
}
//锁屏方法
var touchClock=function(event){event.preventDefault();}
$(function(){document.body.addEventListener('touchmove',touchClock,false);});
//调整布局
$(function(){rs();});
$(window).resize(function(){rs();});
var pdw=0;
var pdh=0;
var rs=function(){
	var dw=document.documentElement.clientWidth;
	var dh=document.documentElement.clientHeight;
	pdw=dw;pdh=dh;
	if(0.75*dw>dh){$("#attention").show();}else{$("#attention").hide();}
	$("body").css({"font-size":1*dw/360+"em"});
	$("#index_title").css({"height":395/720*dw+"px","top":dh/2-470/720*dw+"px"});
	$("#index_txt").css({"top":dh/2-10/720*dw+"px"});
	$("#index_but").css({"top":dh/2+90/720*dw+"px"});
	$("#index_rule").css({"top":dh/2+215/720*dw+"px"});
	$("#rule_close").css({"top":dh/2-330/720*dw+"px"});
	$("#rule_but").css({"top":dh/2+250/720*dw+"px"});
	$("#index_timer_bg").css({"top":dh/2+50/720*dw+"px"});
	$("#loading_sinker").css({"top":dh/2-300/720*dw+"px"});
	$(".s_but").css({"top":pdh/2+250/720*pdw+"px"});
	$(".s_title").css({"top":pdh/2-410/720*pdw+"px"});
	$("#shake_txt").css({"top":pdh/2-60/720*pdw+"px"});
	$("#shake_but").css({"top":pdh/2+80/720*pdw+"px"});
	$(".s2_wrong").css({"top":pdh/2-500/720*pdw+"px"});
	$(".s2_right1").css({"top":pdh/2-290/720*pdw+"px"});
	$(".s2_right2").css({"top":pdh/2-260/720*pdw+"px"});
	$(".s2_right3").css({"top":pdh/2-30/720*pdw+"px"});
	$(".s2_right4").css({"top":pdh/2+200/720*pdw+"px"});
	$(".s2_right5").css({"top":pdh/2+220/720*pdw+"px"});
	$(".s2_right1t").css({"top":pdh/2-160/720*pdw+"px"});
	$(".s2_right2t").css({"top":pdh/2-120/720*pdw+"px"});
	$(".s2_right3t").css({"top":pdh/2+100/720*pdw+"px"});
	$(".s2_right4t").css({"top":pdh/2+320/720*pdw+"px"});
	$(".s2_right5t").css({"top":pdh/2+390/720*pdw+"px"});
	$("#lose_restart").css({"top":pdh/2-60/720*pdw+"px"});
	$("#lose_tonext").css({"top":pdh/2-60/720*pdw+"px"});
	$(".fin_bot").css({"height":532/720*pdw+"px"});
};
//显示关闭活动规则
$(function(){
	$("#index_rule").bind("click",function(){
		$("#rule").fadeIn(400);
	});
	$("#rule_close").bind("click",function(){
		$("#rule").fadeOut(400);
	});
});
//显示关闭产品介绍
$(function(){
	$("#index_foot").bind("click",function(){
		$("#product").fadeIn(400);
	});
	$("#product_close").bind("click",function(){
		$("#product").fadeOut(400);
	});
});
//开始游戏
$(function(){
	$("#index_but").bind("click",function(){
		$("#first_page").fadeOut(100);
	});
	$("#rule_but").bind("click",function(){
		$("#first_page").fadeOut(100);
	});
});
//开始游戏
$(function(){
	stage1ready();
})
//第一关初始化
function stage1ready(){
	rs();
	//初始状态
	$("#s1_bag").rotate(180);
	$("#s1_bag").css({"top":pdh/2-140/720*pdw+"px"});
	$("#s1_title").show();
	$("#ready1_but").show();
	$("#shake_txt").hide();
	$("#shake_but").hide();
	$("#stage1_bg").css({"bottom":"-18.5em"});
	for(var i=1;i<35;i++){
		$(".s1_wrong"+i).css({"top":0+"em","margin-left":0+"%"});
	}
	for(var i=1;i<5;i++){
		$(".s1_right"+i).css({"top":0+"em","margin-left":0+"%"});
	}
	//点击后变换
	$("#ready1_but").bind("click",function(){
		$("#s1_title").fadeOut(600);
		$("#ready1_but").fadeOut(600,function(){
			$("#stage1_bg").animate({"bottom":"-4.5em"},2200);
			$("#s1_bag").animate({"top":pdh/2-440/720*pdw+"px"},1000,function(){
				$("#shake_txt").fadeIn(400);
				$("#shake_but").fadeIn(400,function(){
					$("#shake_but").bind("click",function(){$("#shake_but").unbind("click");shakebutanimate();});//这行测试用
					window.addEventListener('shake',shakeEventDidOccur,false);
				});
			});
		});
	});
}
//摇一摇按钮摇晃
$(function(){
	shakebutshake();
	setInterval(function(){shakebutshake()},3000);
});
function shakebutshake(){
	$("#shake_but_img").rotate({duration:200,angle:-18,animateTo:18,callback:function(){
		$("#shake_but_img").rotate({duration:200,angle:18,animateTo:-18,callback:function(){
			$("#shake_but_img").rotate({duration:200,angle:-18,animateTo:18,callback:function(){
				$("#shake_but_img").rotate({duration:200,angle:18,animateTo:-18,callback:function(){
					$("#shake_but_img").rotate({duration:200,angle:-18,animateTo:18,callback:function(){
						$("#shake_but_img").rotate({duration:200,angle:18,animateTo:-18,callback:function(){
							$("#shake_but_img").stop();
						}});
					}});
				}});
			}});
		}});
	}});
}
//摇一摇触发事件
function shakeEventDidOccur(){
	window.removeEventListener('shake',shakeEventDidOccur,false);
	shakebutanimate();
}
//按钮摇一摇触发的动画
function shakebutanimate(){
	setTimeout(function(){
		$("#shake_txt").fadeOut(600);
		$("#shake_but").fadeOut(600,function(){
			$("#s1_bag").rotate({angle:180,animateTo:0,callback:function(){
				$("#s1_bag").animate({"margin-top":"3em"},100,function(){
					$("#s1_bag").animate({"margin-top":"0em"},100,function(){
						$("#s1_bag").animate({"margin-top":"3em"},100,function(){
							$("#s1_bag").animate({"margin-top":"0em"},100,function(){
								$("#s1_bag").animate({"margin-top":"3em"},100,function(){
									$("#s1_bag").animate({"margin-top":"0em"},100,function(){
										$("#s1_bag").animate({"margin-top":"3em"},100,function(){
											$(".s1_wrong").animate({"top":"14em"},500);
											$(".s1_right").animate({"top":"14em"},500);
											$("#s1_bag").animate({"margin-top":"0em","top":"-1em"},400,function(){
												setTimeout(function(){
													var radio=1;
													if(pdh/pdw*720/1136<1){
														radio=pdh/pdw*720/1136;
													}
													$(".s1_wrong1").animate({"top":1+"em","margin-left":-110+"%"},800);
													$(".s1_wrong2").animate({"top":0+"em","margin-left":120+"%"},800);
													$(".s1_wrong3").animate({"top":2+"em","margin-left":-100+"%"},800);
													$(".s1_wrong4").animate({"top":2.5+"em","margin-left":65+"%"},800);
													$(".s1_wrong5").animate({"top":3.5+"em","margin-left":-115+"%"},800);
													$(".s1_wrong6").animate({"top":6+"em","margin-left":-100+"%"},800);
													$(".s1_wrong7").animate({"top":6.5+"em","margin-left":-3+"%"},800);
													$(".s1_wrong8").animate({"top":23.5+"em","margin-left":17+"%"},800);
													$(".s1_wrong9").animate({"top":5.5+"em","margin-left":100+"%"},800);
													$(".s1_wrong10").animate({"top":7+"em","margin-left":-75+"%"},800);
													$(".s1_wrong11").animate({"top":8.5+"em","margin-left":-80+"%"},800);
													$(".s1_wrong12").animate({"top":8.5+"em","margin-left":-35+"%"},800);
													$(".s1_wrong13").animate({"top":9.2+"em","margin-left":75+"%"},800);
													$(".s1_wrong14").animate({"top":10+"em","margin-left":70+"%"},800);
													$(".s1_wrong15").animate({"top":13.5+"em","margin-left":-75+"%"},800);
													$(".s1_wrong16").animate({"top":12.2+"em","margin-left":-40+"%"},800);
													$(".s1_wrong17").animate({"top":10+"em","margin-left":15+"%"},800);
													$(".s1_wrong18").animate({"top":12+"em","margin-left":115+"%"},800);
													$(".s1_wrong19").animate({"top":17+"em","margin-left":-75+"%"},800);
													$(".s1_wrong20").animate({"top":15+"em","margin-left":10+"%"},800);
													$(".s1_wrong21").animate({"top":13+"em","margin-left":45+"%"},800);
													$(".s1_wrong22").animate({"top":16+"em","margin-left":90+"%"},800);
													$(".s1_wrong23").animate({"top":17.2+"em","margin-left":-10+"%"},800);
													$(".s1_wrong24").animate({"top":17+"em","margin-left":75+"%"},800);
													$(".s1_wrong25").animate({"top":18+"em","margin-left":65+"%"},800);
													$(".s1_wrong26").animate({"top":20+"em","margin-left":5+"%"},800);
													$(".s1_wrong27").animate({"top":19.3+"em","margin-left":-30+"%"},800);
													$(".s1_wrong28").animate({"top":21.5+"em","margin-left":38+"%"},800);
													$(".s1_wrong29").animate({"top":21+"em","margin-left":60+"%"},800);
													$(".s1_wrong30").animate({"top":23+"em","margin-left":110+"%"},800);
													$(".s1_wrong31").animate({"top":24+"em","margin-left":-40+"%"},800);
													$(".s1_wrong32").animate({"top":24+"em","margin-left":-35+"%"},800);
													$(".s1_wrong33").animate({"top":25+"em","margin-left":-20+"%"},800);
													$(".s1_wrong34").animate({"top":25+"em","margin-left":60+"%"},800);
													$(".s1_right1").animate({"top":5+"em","margin-left":-29+"%"},800);
													$(".s1_right2").animate({"top":16+"em","margin-left":-52+"%"},800);
													$(".s1_right3").animate({"top":15+"em","margin-left":52+"%"},800);
													$(".s1_right4").animate({"top":7.8+"em","margin-left":62+"%"},800);
													$("#stage1_bg").animate({"bottom":-1.5/radio/radio/radio/radio/radio+"em"},1000,function(){showstart1();});
												},300);
											});
										});
									});
								});
							});
						});
					});
				});
			}});
		});
	},500);
}
//显示第一关开始浮层并绑定事件
function showstart1(){
	$("#start1").stop().fadeIn(500,function(){
		$("#start1_go").bind("click",function(){
			$("#start1").stop().fadeOut(500,function(){
				//第一关开始
				starttimer();
			});
		});
	});
	//点错
	$(".s1_wrong").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		sub7(event.clientX,event.clientY);
	});
	$(".s1_right1").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s1_right1");
		clicknow[0]=clicknow[0]+1;
		if(clicknow[0]==clickcont[0]){
			nowgame++;
			stage1win();
		}
	});
	$(".s1_right2").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s1_right2");
		clicknow[0]=clicknow[0]+1;
		if(clicknow[0]==clickcont[0]){
			nowgame++;
			stage1win();
		}
	});
	$(".s1_right3").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s1_right3");
		clicknow[0]=clicknow[0]+1;
		if(clicknow[0]==clickcont[0]){
			nowgame++;
			stage1win();
		}
	});
	$(".s1_right4").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s1_right4");
		clicknow[0]=clicknow[0]+1;
		if(clicknow[0]==clickcont[0]){
			nowgame++;
			stage1win();
		}
	});
}
//显示第二关开始浮层并绑定事件
function showstart2(){
	$("#start2_go").bind("click",function(){
		$("#start2").stop().fadeOut(500,function(){
			//第二关开始
			starttimer();
		});
	});
	//点错
	$(".s2_wrong").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		sub7(event.clientX,event.clientY);
	});
	$(".s2_right1").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s2_right1");
		clicknow[1]=clicknow[1]+1;
		if(clicknow[1]==clickcont[1]){
			nowgame++;
			stage2win();
		}
	});
	$(".s2_right2").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s2_right2");
		clicknow[1]=clicknow[1]+1;
		if(clicknow[1]==clickcont[1]){
			nowgame++;
			stage2win();
		}
	});
	$(".s2_right3").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s2_right3");
		clicknow[1]=clicknow[1]+1;
		if(clicknow[1]==clickcont[1]){
			nowgame++;
			stage2win();
		}
	});
	$(".s2_right4").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s2_right4");
		clicknow[1]=clicknow[1]+1;
		if(clicknow[1]==clickcont[1]){
			nowgame++;
			stage2win();
		}
	});
	$(".s2_right5").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s2_right5");
		clicknow[1]=clicknow[1]+1;
		if(clicknow[1]==clickcont[1]){
			nowgame++;
			stage2win();
		}
	});
}
//显示第三关开始浮层并绑定事件
function showstart3(){
	$("#start3_go").bind("click",function(){
		$("#start3").stop().fadeOut(500,function(){
			//第三关开始
			starttimer();
		});
	});
	//点错
	$(".s3_wrong").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		sub7(event.clientX,event.clientY);
	});
	$(".s3_right1").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s3_right1");
		clicknow[2]=clicknow[2]+1;
		if(clicknow[2]==clickcont[2]){
			stage3win();
		}
	});
	$(".s3_right2").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s3_right2");
		clicknow[2]=clicknow[2]+1;
		if(clicknow[2]==clickcont[2]){
			stage3win();
		}
	});
	$(".s3_right3").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s3_right3");
		clicknow[2]=clicknow[2]+1;
		if(clicknow[2]==clickcont[2]){
			stage3win();
		}
	});
	$(".s3_right4").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s3_right4");
		clicknow[2]=clicknow[2]+1;
		if(clicknow[2]==clickcont[2]){
			stage3win();
		}
	});
	$(".s3_right5").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s3_right5");
		clicknow[2]=clicknow[2]+1;
		if(clicknow[2]==clickcont[2]){
			stage3win();
		}
	});
	$(".s3_right6").bind("click",function(event){
		sinker(event.clientX,event.clientY);
		rightshow("s3_right6");
		clicknow[2]=clicknow[2]+1;
		if(clicknow[2]==clickcont[2]){
			stage3win();
		}
	});
}
//第二关准备按钮事件
$(function(){
	$("#ready2_but").bind("click",function(){
		$("#ready2").fadeOut(400);
	});
	$("#ready3_but").bind("click",function(){
		$("#ready3").fadeOut(400);
	});
});
//游戏判定
var nowgame=1;//第几关
var clickcont=[4,5,6];//每一关的正确物品的数量
var clicknow=[0,0,0];//每一关的答题卡
var times=[30,45,60];//每一关的时间
var res=[0,0,0];//通关的计分表
//计时器开始
var timer;
var timeall;
function starttimer(){
	timeall=times[nowgame-1];
	$("#timer_txt").html(timeall);
	$("#timer_line").css({"width":"100%"});
	$("#timer").fadeIn(400,function(){
		timer=setInterval(function(){
			timeall--;
			$("#timer_txt").html(timeall);
			$("#timer_line").stop().animate({"width":timeall/times[nowgame-1]*100+"%"},1000,"linear")
			if(timeall==0){
				//游戏失败
				try{clearInterval(timer);}catch(e){}
				$("#timer_txt").html(0);
				$("#lose_restart").unbind();
				$("#lose_tonext").unbind();
				$("#lose").fadeIn(400,function(){
					$("#lose_restart").bind("click",function(){restart()});
					$("#lose_tonext").bind("click",function(){tonext()});
				});
			}
		},1000);
	});
}
//第一关胜利
function stage1win(){
	res[0]=1;
	try{clearInterval(timer);}catch(e){}
	setTimeout(function(){
		$("#win").fadeIn(400,function(){
			setTimeout(function(){
				$("#timer").fadeOut(400);
				$("#stage1").fadeOut(400);
				$("#win").fadeOut(400,function(){
					$("#ready2").fadeIn(400,function(){
						$("#start2").show();
						$("#stage2").show();
						showstart2();
					});
				});
			},2000);
		});
	},2000);
}
//第二关胜利
function stage2win(){
	res[1]=1;
	try{clearInterval(timer);}catch(e){}
	setTimeout(function(){
		$("#win").fadeIn(400,function(){
			setTimeout(function(){
				$("#timer").fadeOut(400);
				$("#stage2").fadeOut(400);
				$("#win").fadeOut(400,function(){
					$("#ready3").fadeIn(400,function(){
						$("#start3").show();
						$("#stage3").show();
						showstart3();
					});
				});
			},2000);
		});
	},2000);
}
//第三关胜利
function stage3win(){
	res[2]=1;
	try{clearInterval(timer);}catch(e){}
	setTimeout(function(){
		$("#timer").fadeOut(400);
		$("#stage3").fadeOut(400,function(){
			showres();
		});
	},2000);
}
//重新开始
function restart(){
	clicknow[nowgame-1]=0;
	$("#lose").fadeOut(400,function(){
		$("#start"+nowgame).fadeIn(400,function(){
			if(nowgame==1){
				sunbind(1);
				showstart1();
			}else if(nowgame==2){
				sunbind(2);
				showstart2();
			}else{
				sunbind(3);
				showstart3();
			}
		});
	});
}
//直接进入下一关
function tonext(){
	if(nowgame<3){
		nowgame=nowgame+1;
		clicknow[nowgame-1]=0;
		$("#timer").fadeOut(400);
		$("#stage"+(nowgame-1)).fadeOut(400);
		$("#lose").fadeOut(400,function(){
			$("#ready"+nowgame).fadeIn(400,function(){
				$("#stage"+nowgame).show();
				$("#timer").show();
				$("#start"+nowgame).show();
				if(nowgame==1){
					sunbind(1);
					showstart1();
				}else if(nowgame==2){
					sunbind(2);
					showstart2();
				}else{
					sunbind(3);
					showstart3();
				}
			});
		});
	}else{
		//直接结果页
		$("#lose").fadeOut(400);
		$("#timer").fadeOut(400);
		$("#stage3").fadeOut(400,function(){
			showres();
		});
	}
}
//显示结果
function showres(){
	if(res[0]==1&&res[1]==1&&res[2]==1){
		$("#allwin").fadeIn(400);
	}else{
		$("#alllose").fadeIn(400);
	}
}
//重新开始
$(function(){
	$("#fin_restart1").bind("click",function(){
		clickcont=[4,5,6];//每一关的正确物品的数量
		clicknow=[0,0,0];//每一关的答题卡
		times=[30,45,60];//每一关的时间
		res=[0,0,0];//通关的计分表
		nowgame=1;
		sunbind(1);sunbind(2);sunbind(3);
		$("#allwin").fadeOut(400,function(){
			$("#stage"+nowgame).fadeIn(400,function(){
				restart();
			});
		});
	});
	$("#fin_restart2").bind("click",function(){
		clickcont=[4,5,6];//每一关的正确物品的数量
		clicknow=[0,0,0];//每一关的答题卡
		times=[30,45,60];//每一关的时间
		res=[0,0,0];//通关的计分表
		nowgame=1;
		sunbind(1);sunbind(2);sunbind(3);
		$("#alllose").fadeOut(400,function(){
			$("#stage"+nowgame).fadeIn(400,function(){
				restart();
			});
		});
	});
});
//显示小锤子
function sinker(sx,sy){
	$("#sinker").stop().css({"top":sy,"left":sx,"display":"none"});
	$("#sinker").fadeIn(100,function(){
		$("#sinker").rotate({duration:200,angle:0,animateTo:-18,callback:function(){
			$("#sinker").rotate({duration:200,angle:-18,animateTo:0,callback:function(){
				$("#sinker").fadeOut(100);
			}});
		}});
	});
}
function sub7(sx,sy){
	$("#seven").stop().css({"top":sy,"left":sx,"display":"none","margin-top":0,"opacity":1});
	setTimeout(function(){
		if(timeall-7<=0){
			timeall=0;
			try{clearInterval(timer);}catch(e){}
			$("#timer_txt").html(0);
			$("#lose_restart").unbind();
			$("#lose_tonext").unbind();
			$("#lose").fadeIn(400,function(){
				$("#lose_restart").bind("click",function(){restart()});
				$("#lose_tonext").bind("click",function(){tonext()});
			});
		}else{
			timeall=timeall-7;
		}
		$("#timer_line").stop().animate({"width":timeall/times[nowgame-1]*100+"%"},100,"linear")
		$("#seven").fadeIn(100,function(){
			$("#seven").animate({"margin-top":"-3em","opacity":0},2000);
		});
	},500);
}
//unbind
function sunbind(snum){
	$(".s"+snum+"_wrong").unbind();
	for(var i=1;i<=clickcont[snum-1];i++){
		$(".s"+snum+"_right"+i).unbind();
		$(".s"+snum+"_right"+i+" img")[0].src="images/s"+snum+"_right"+i+".png";
		$(".s"+snum+"_right"+i+" img").stop().css({"margin-top":"0"});
	}
}
//点对动画
function rightshow(rname){
	$("."+rname).unbind("click");
	$("."+rname+"t").show();
	$("."+rname+"t").stop().animate({"margin-top":-40*pdw/720+"px","opacity":1},500,"linear",function(){
		$("."+rname+"t").stop().animate({"margin-top":-200*pdw/720+"px","opacity":0},2500,"linear",function(){
			$("."+rname+"t").stop().css({"margin-top":0*pdw/720+"px","opacity":0});
			$("."+rname+"t").stop().hide();
		});
	});
	$("."+rname+" img")[0].src="images/"+rname+"c.png";
	$("."+rname+" img").stop().animate({"margin-top":"-0.3em"},200,function(){
	$("."+rname+" img").stop().animate({"margin-top":"0.3em"},400,function(){
	$("."+rname+" img").stop().animate({"margin-top":"-0.3em"},400,function(){
	$("."+rname+" img").stop().animate({"margin-top":"0.3em"},400,function(){
	$("."+rname+" img").stop().animate({"margin-top":"0em"},200);
	});});});});
}
//颤动
$(function(){
	$("#ready1_but").height($("#ready1_but").height()+10);
	$("#ready2_but").height($("#ready1_but").height()+10);
	$("#ready3_but").height($("#ready1_but").height()+10);
	setInterval(function(){
		$("#ready1_but img").animate({"margin-top":"-0.2em"},50,function(){
		$("#ready1_but img").animate({"margin-left":"-0.2em"},50,function(){
		$("#ready1_but img").animate({"margin-left":"0.2em"},50,function(){
		$("#ready1_but img").animate({"margin-top":"0.2em"},50,function(){
			$("#ready1_but img").animate({"margin-left":"0.2em"},50,function(){
			$("#ready1_but img").animate({"margin-top":"-0.2em"},50,function(){
			$("#ready1_but img").animate({"margin-left":"-0.2em"},50,function(){
			$("#ready1_but img").animate({"margin-top":"0.2em"},50,function(){
				$("#ready1_but img").animate({"margin-left":"0.2em"},50,function(){
				$("#ready1_but img").animate({"margin-top":"0.2em"},50,function(){
				$("#ready1_but img").animate({"margin-left":"-0.2em"},50,function(){
				$("#ready1_but img").animate({"margin-top":"-0.2em"},50,function(){
		});});});});});});});});});});});});
	},1500);
	setInterval(function(){
		$("#ready2_but img").animate({"margin-top":"-0.2em"},50,function(){
		$("#ready2_but img").animate({"margin-left":"-0.2em"},50,function(){
		$("#ready2_but img").animate({"margin-left":"0.2em"},50,function(){
		$("#ready2_but img").animate({"margin-top":"0.2em"},50,function(){
			$("#ready2_but img").animate({"margin-left":"0.2em"},50,function(){
			$("#ready2_but img").animate({"margin-top":"-0.2em"},50,function(){
			$("#ready2_but img").animate({"margin-left":"-0.2em"},50,function(){
			$("#ready2_but img").animate({"margin-top":"0.2em"},50,function(){
				$("#ready2_but img").animate({"margin-left":"0.2em"},50,function(){
				$("#ready2_but img").animate({"margin-top":"0.2em"},50,function(){
				$("#ready2_but img").animate({"margin-left":"-0.2em"},50,function(){
				$("#ready2_but img").animate({"margin-top":"-0.2em"},50,function(){
		});});});});});});});});});});});});
	},1500);
	setInterval(function(){
		$("#ready3_but img").animate({"margin-top":"-0.2em"},50,function(){
		$("#ready3_but img").animate({"margin-left":"-0.2em"},50,function(){
		$("#ready3_but img").animate({"margin-left":"0.2em"},50,function(){
		$("#ready3_but img").animate({"margin-top":"0.2em"},50,function(){
			$("#ready3_but img").animate({"margin-left":"0.2em"},50,function(){
			$("#ready3_but img").animate({"margin-top":"-0.2em"},50,function(){
			$("#ready3_but img").animate({"margin-left":"-0.2em"},50,function(){
			$("#ready3_but img").animate({"margin-top":"0.2em"},50,function(){
				$("#ready3_but img").animate({"margin-left":"0.2em"},50,function(){
				$("#ready3_but img").animate({"margin-top":"0.2em"},50,function(){
				$("#ready3_but img").animate({"margin-left":"-0.2em"},50,function(){
				$("#ready3_but img").animate({"margin-top":"-0.2em"},50,function(){
		});});});});});});});});});});});});
	},1500);
	setInterval(function(){
		$("#index_title_main").animate({"padding-top":"-0.5em"},50,function(){
		$("#index_title_main").animate({"padding-left":"-0.5em"},50,function(){
		$("#index_title_main").animate({"padding-left":"0.5em"},50,function(){
		$("#index_title_main").animate({"padding-top":"0.5em"},50,function(){
			$("#index_title_main").animate({"padding-left":"0.5em"},50,function(){
			$("#index_title_main").animate({"padding-top":"-0.5em"},50,function(){
			$("#index_title_main").animate({"padding-left":"-0.5em"},50,function(){
			$("#index_title_main").animate({"padding-top":"0.5em"},50,function(){
				$("#index_title_main").animate({"padding-left":"0.5em"},50,function(){
				$("#index_title_main").animate({"padding-top":"0.5em"},50,function(){
				$("#index_title_main").animate({"padding-left":"-0.5em"},50,function(){
				$("#index_title_main").animate({"padding-top":"-0.5em"},50,function(){
		});});});});});});});});});});});});
	},2000);
	setInterval(function(){
		$("#index_but").animate({"padding-top":"-0.5em"},50,function(){
		$("#index_but img").animate({"margin-left":"-0.1em"},50,function(){
		$("#index_but img").animate({"margin-left":"0.1em"},50,function(){
		$("#index_but").animate({"padding-top":"0.5em"},50,function(){
			$("#index_but img").animate({"margin-left":"0.1em"},50,function(){
			$("#index_but").animate({"padding-top":"-0.5em"},50,function(){
			$("#index_but img").animate({"margin-left":"-0.1em"},50,function(){
			$("#index_but").animate({"padding-top":"0.5em"},50,function(){
				$("#index_but img").animate({"margin-left":"0.1em"},50,function(){
				$("#index_but").animate({"padding-top":"0.5em"},50,function(){
				$("#index_but img").animate({"margin-left":"-0.1em"},50,function(){
				$("#index_but").animate({"padding-top":"-0.5em"},50,function(){
		});});});});});});});});});});});});
	},1500);
});
//分享显示
$(function(){
	$(".fin_share").bind("click",function(){
		$(".share").fadeIn(400);
	});
	$(".share").bind("click",function(){
		$(".share").fadeOut(400);
	});
});
