//调整布局
$(function(){
	rs();
	var popup = window.frames[0];
	window.frames[0].onload = function(){
		var ih =  Math.max( popup.document.body.scrollHeight,popup.document.body.offsetHeight,
			popup.document.documentElement.clientHeight, popup.document.documentElement.scrollHeight, popup.document.documentElement.offsetHeight );
		$("iframe").height(ih);

		if($(".card").length){
			$(".card").show();
			$(".card-con-footer").show();
		}

	}
	$(popup).scroll(scroll);

});
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
};
function scroll(){
	var popup = window.frames[0];
	//console.log($(popup.document).height())
	if($(popup).scrollTop() + $(popup).height() == $(popup.document).height()) {
		alert("bottom!");
		resetHeight();
		$(popup).off("scroll",scroll);
	}

}

function resetHeight(){
	var wh = window.innerHeight;
	var popup = window.frames[0];
	$(popup).height("300px");
}
