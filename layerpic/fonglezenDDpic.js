(function ($) {
    $.fn.fonglezenDDpic = function () {

		var actions = {
			isMobile:function(){	//判断是否为移动端
				var sUserAgent= navigator.userAgent.toLowerCase(),
				bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
				bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
				bIsMidp= sUserAgent.match(/midp/i) == "midp",
				bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
				bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
				bIsAndroid= sUserAgent.match(/android/i) == "android",
				bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
				bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile",
				bIsWebview = sUserAgent.match(/webview/i) == "webview";
				return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
			},
			stopDefault:function(e){	//阻止浏览器默认事件方法：
				var e=e || window.event;
				if(e.preventDefault){
					e.preventDefault();
				}else{
					e.returnValue=false;
				}
			},
			//判断使用那种事件：
			touchStart:function(){
				return actions.isMobile() ? 'touchstart' : 'mousedown';
			},
			touchMove: function(){
				return actions.isMobile() ? 'touchmove' : 'mousemove';
			},
			touchEnd : function(){
				return actions.isMobile() ? 'touchend' : 'mouseup';
			}
		};


        var flzpic = {
			windowHeight : window.innerHeight,
			fonglezen_ddpic : this,
			flz_dpli : this.find('li'),
			flz_dplen:this.find('li').length,
			pstartX:0,
			pstartY:0,
			pmoveX:0,
			pmoveY:0,
			pendX:0,
			pendY:0,
			shownext : function(){
				flzpic.flz_dpli = flzpic.fonglezen_ddpic.find('li');

				flzpic.flz_dpli.eq(1).find('img').attr('class','backinit');
				flzpic.flz_dpli.eq(2).find('img').attr('class','backinit1');
				flzpic.flz_dpli.eq(3).find('img').attr('class','backinit2');
				flzpic.flz_dpli.eq(4).find('img').attr('class','backinit3');

				setTimeout(function(){
					flzpic.flz_dpli.find('img').attr('class','');
					flzpic.flz_dpli.attr('class','');

					//move first li to last li
					var firstLI = flzpic.flz_dpli.eq(0).html();
					flzpic.flz_dpli.eq(0).remove();
					flzpic.fonglezen_ddpic.append('<li>'+ firstLI +'</li>');

				},500);
			}
		};

		flzpic.fonglezen_ddpic.on(actions.touchStart(),'li',function(e){
			var e=e || window.event;
			if(actions.isMobile()){
				var touch = event.targetTouches[0];
				flzpic.pstartX = touch.pageX;
				flzpic.pstartY = touch.pageY;
			}else{
				flzpic.pstartX = e.pageX;
				flzpic.pstartY = e.pageY;
			}

			flzpic.pmoveX = 0;
			flzpic.pmoveY = 0;

		});

		flzpic.fonglezen_ddpic.on(actions.touchMove(),'li',function(e){
			var e=e || window.event;
			actions.stopDefault(e);
			if(actions.isMobile()){
				var touch = event.touches[0];
				flzpic.pendX = touch.pageX;
				flzpic.pendY = touch.pageY;
			}else{
				flzpic.pendX = e.pageX;
				flzpic.pendY = e.pageY;
			}
			flzpic.pmoveX = flzpic.pendX - flzpic.pstartX;
			flzpic.pmoveY = flzpic.pendY - flzpic.pstartY;
		});


		flzpic.fonglezen_ddpic.on(actions.touchEnd(),'li',function(e){
			var e=e || window.event;
			flzpic.flz_dpli = flzpic.fonglezen_ddpic.find('li');

			if(Math.abs(flzpic.pmoveY) < flzpic.windowHeight*0.1 && flzpic.pmoveX < 0){
				flzpic.flz_dpli.eq(0).attr('class','hideToleft');
				flzpic.shownext();
			}else if(Math.abs(flzpic.pmoveY) < flzpic.windowHeight*0.1 && flzpic.pmoveX > 0){
				flzpic.flz_dpli.eq(0).attr('class','hideToright');
				flzpic.shownext();
			}
		});
    };
})(jQuery);
