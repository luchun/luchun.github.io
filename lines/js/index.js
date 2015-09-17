//调整布局
$(function(){rs();});
$(window).resize(function(){rs();});
var rs=function(){
	var dw=$(document).width();
	var dh=$(document).height();
	if(0.76*dw>dh){
		$("#attention").show();document.body.addEventListener('touchmove',touchClock,false);
	}else{
		$("#attention").hide();document.body.removeEventListener('touchmove',touchClock);
	}
	$("body").css({"font-size":1*dw/360+"em"});
	$("#index_main").css({"height":dh-(400*dw/720)+"px","min-height":0.925*dw+"px","background-position":"bottom","display":"block"});
	$("#index_start").css({"top":$("#index_main").height()+(dh-$("#index_main").height())*0.3+"px"});
};
//页面跳转
$(function(){
	$("#index_start").bind("click",function(){
		location.replace("game.html");event.returnValue=false;
	});
	$("#index_rule_but").bind("click",function(){
		$("#rule").fadeIn(400);
	});
	$("#rule_close").bind("click",function(){
		$("#rule").fadeOut(400);
	});
});
//锁屏方法
var touchClock=function(event){
	event.preventDefault();
}
