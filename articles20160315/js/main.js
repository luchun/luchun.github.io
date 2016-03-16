//调整布局
$(function(){rs();});
$(window).resize(function(){rs();});
var rs=function(){
	var dw=document.documentElement.clientWidth;
	var dh=document.documentElement.clientHeight;
	$("body").css({"font-size":1*dw/320+"em"});
	$(".video1").css({"height":0.75*0.9*dw+"px"});
	$(".video2").css({"height":9/16*0.9*dw+"px"});

	var wh = parseFloat($("body").css("font-size")) *1.1 * 1.5;
	var rh = $(".top_title").height();
	if(rh>wh){
		$(".top_title").css({
			"padding-top": "2.8em",
			"font-size": "1em",
			"line-height": "2.2em"
		})
		if($(".top_title").html().match("<br>")){
			$(".top_title").css({
				"font-size": "1.1em",
				"padding-top": "2em",
				"line-height": "1.5em"
			})
		}
	}

	var tt = $(".top_title");
	if(tt.text().length>12 && !tt.html().match("<br>")){
		tt.css({
			"font-size": "1.1em",
			"padding-top": "2em",
			"line-height": "1.5em"
		})
	}
};
