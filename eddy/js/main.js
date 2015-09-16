require.config({
    shim: {
        'jquery': [],
        'crousel': ["jquery"]
    },
    paths:{
        jquery:'./jquery.min'
    }
});

require(['jquery','plugins','crousel'],function($,pl){

    //滑屏相册
    var owl = $("#carousel").owlCarousel();
    $(".vd-intro-imgs").on("touchstart",function(e){
        e.stopPropagation();
        e.preventDefault();
        //owl.jumpTo(2);
        console.log(owl)
        $("body").css("overflow","hidden");
        $(".slider").show();
    });
    $(".slider").on("click",function(){
        $(this).hide();
        $("body").css("overflow","")
    });
    //身份选择
    var userselect = $(".user-select");
    userselect.on("touchstart",".close",function(){
        userselect.hide();
    });
    //绑定投票事件
    $(".pure-button-vote").on("touchstart",function(){
        $(this).addClass("pure-button-disabled")
            .find(".text").text("已投票");
        new pl.alert("您还可以再投一票！");
    });
    //绑定分享事件
    $(".pure-button-share").on("touchstart",function(){
        new pl.sharenotice()
    });

    //加载更多选手


var loading = new pl.loading();
setTimeout($.proxy(loading.destroy, loading), 2000);

setTimeout(function(){new pl.alert("您已经投过两票啦")},2000);
setTimeout(function(){userselect.show()},6000);

})
