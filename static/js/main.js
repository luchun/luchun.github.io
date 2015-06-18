
require.config({
    baseUrl: "js",
    shim: {
        "jquery": {
            exports: 'jquery'
        },
        'swiper': {
            deps: ['jquery']
        }
    },
    paths: {
        jquery: "jquery.min",
        swiper: "swiper.jquery.min",
        Mustache: "mustache.min",
        postal: "postal.min",
        lodash: "lodash.min"
    }
});
require(['jquery', 'Mustache', "swiper", "postal"], function ($,  Mustache, Swiper, postal) {
  function whichAnimationEnd() {
        var t,
            el = document.createElement("fakeelement");

        var animations = {
            "animation": "animationend",
            "OAnimation": "oAnimationEnd",
            "MozAnimation": "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        }

        for (t in animations) {
            if (el.style[t] !== undefined) {
                return animations[t];
            }
        }
    }

    var animationEnd = whichAnimationEnd();
    var channelH = postal.channel("swiperH"),
        channelV = postal.channel("swiperV");

    $.fn.showNext = function () {
        var _this = this;
        _this.parentIndex = this.closest(".swiper-slide").index();
        _this.items = _this.find('li');
        _this.itemslen = _this.find('li').length;
        var  shownext=function() {
            _this.items = _this.find('li');
            _this.itemslen = _this.find('li').length;
            var templen = _this.itemslen;
            while (templen > 0) {
                var sec = Math.round(3 * (_this.itemslen - templen)) / 10;
                _this.items.eq(templen).find('img').attr('class', 'backinit' + (templen - 1)).css({"animation-delay": "" + sec + "s"});
                templen--;
            }
        }

        channelH.subscribe("slide" + _this.parentIndex + ".left", function (data) {
            _this.items = _this.find('li');
            var first = _this.items.not(".out").eq(0);
            first.attr('class', 'hideToleft out');
            first.one(animationEnd, function () {
                $(this).attr('class', '');
                $(this).find("img").attr('class', '').css({"animation-delay": "0s"});
                $(this).appendTo(_this);
            });
            shownext();
        });
        channelH.subscribe("slide" + _this.parentIndex + ".right", function (data) {
            _this.items = _this.find('li');
            var first = _this.items.eq(0);
            first.attr('class', 'hideToright out');
            first.one(animationEnd, function () {
                $(this).attr('class', '');
                $(this).find("img").attr('class', '').css({"animation-delay": "0s"});
                $(this).appendTo(_this);
            });

            shownext();
        });
        channelV.subscribe("slide" + _this.parentIndex + "V", function () {

            _this.items.find('img').attr('class', 'goimg');
        })
    };

    $(document).ready(function () {

        var swiperWrapper = $("<div class='swiper-wrapper'></div> ");
        $.map(config['pages'], function (value, key) {

            var slidedata = config['data'][key];
            var templateType = slidedata['type'];
            var templateHtml = document.getElementById(templateType).innerHTML;
            var view = slidedata['content'];
            var output = Mustache.render(templateHtml, view);
            swiperWrapper.append(output);
        });
        $("#product-swiper").html(swiperWrapper);

        $('.template2').each(function () {
            var lilen = $(this).find("li").length;
            if (lilen <= 1) return;
            $(this).showNext();
        });

        var scaleW = window.innerWidth / 320;
        var scaleH = window.innerHeight / 480;
        var resizes = document.querySelectorAll('.resize');
        for (var j = 0; j < resizes.length; j++) {
            resizes[j].style.width = parseInt(resizes[j].style.width) * scaleW + 'px';
            resizes[j].style.height = parseInt(resizes[j].style.height) * scaleH + 'px';
            resizes[j].style.top = parseInt(resizes[j].style.top) * scaleH + 'px';
            resizes[j].style.left = parseInt(resizes[j].style.left) * scaleW + 'px';

        }
        var scales = document.querySelectorAll('.txt');
        for (var i = 0; i < scales.length; i++) {
            ss = scales[i].style;
            ss.webkitTransform = ss.MsTransform = ss.msTransform = ss.MozTransform = ss.OTransform = ss.transform = 'translateX(' + scales[i].offsetWidth * (scaleW - 1) / 2 + 'px) translateY(' + scales[i].offsetHeight * (scaleH - 1) / 2 + 'px)scaleX(' + scaleW + ') scaleY(' + scaleH + ') ';
        }
        var mySwiper = new Swiper('.product-swiper-wrapper', {
            direction: 'vertical',
            effect: 'coverflow',
            mousewheelControl: true,
            onInit: function (swiper) {
                swiperAnimateCache(swiper);
                swiperAnimate(swiper);
            },
            onTransitionEnd: function (swiper) {

                var activeIndex = swiper.activeIndex;
                swiperAnimate(swiper);
                channelV.publish("slide" + activeIndex + "V", {
                    activeIndex: activeIndex
                });
            },
            onTouchEnd: function (swiper) {
                var activeIndex = mySwiper.activeIndex,
                    touchesInfo = swiper.touches,
                    diffX = touchesInfo.currentX - touchesInfo.startX,
                    diffY = touchesInfo.currentY - touchesInfo.startY;
                if (Math.abs(diffY) > Math.abs(diffX) || Math.abs(diffX) < 40) return;
                if (diffX > 0) {
                    channelH.publish("slide" + activeIndex + ".right", {
                        activeIndex: activeIndex,
                        diffX: diffX
                    });
                } else {
                    channelH.publish("slide" + activeIndex + ".left", {
                        activeIndex: activeIndex,
                        diffX: diffX
                    });
                }


            }
        })

    });

    function swiperAnimateCache() {
        for (allBoxes = window.document.documentElement.querySelectorAll(".ani"), i = 0; i < allBoxes.length; i++)allBoxes[i].attributes["style"] ? allBoxes[i].setAttribute("swiper-animate-style-cache", allBoxes[i].attributes["style"].value) : allBoxes[i].setAttribute("swiper-animate-style-cache", " "), allBoxes[i].style.visibility = "hidden"
    }

    function swiperAnimate(a) {
        clearSwiperAnimate();
        var b = a.slides[a.activeIndex].querySelectorAll(".ani");
        for (i = 0; i < b.length; i++)b[i].style.visibility = "visible", effect = b[i].attributes["swiper-animate-effect"] ? b[i].attributes["swiper-animate-effect"].value : "", b[i].className = b[i].className + "  " + effect + " " + "animated", style = b[i].attributes["style"].value, duration = b[i].attributes["swiper-animate-duration"] ? b[i].attributes["swiper-animate-duration"].value : "", duration && (style = style + "animation-duration:" + duration + ";-webkit-animation-duration:" + duration + ";"), delay = b[i].attributes["swiper-animate-delay"] ? b[i].attributes["swiper-animate-delay"].value : "", delay && (style = style + "animation-delay:" + delay + ";-webkit-animation-delay:" + delay + ";"), b[i].setAttribute("style", style)
    }

    function clearSwiperAnimate() {
        for (allBoxes = window.document.documentElement.querySelectorAll(".ani"), i = 0; i < allBoxes.length; i++)allBoxes[i].attributes["swiper-animate-style-cache"] && allBoxes[i].setAttribute("style", allBoxes[i].attributes["swiper-animate-style-cache"].value), allBoxes[i].style.visibility = "hidden", allBoxes[i].className = allBoxes[i].className.replace("animated", " "), allBoxes[i].attributes["swiper-animate-effect"] && (effect = allBoxes[i].attributes["swiper-animate-effect"].value, allBoxes[i].className = allBoxes[i].className.replace(effect, " "))
    }

});

