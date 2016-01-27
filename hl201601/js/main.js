/**
 * Created by lu7965 on 2015/8/28.
 */

//调整布局
$(function(){rs();});
$(window).resize(function(){rs();});
var rs=function(){
    var dw=document.documentElement.clientWidth;
    document.querySelector('body').style.fontSize = dw/320+"em";
};
    //记录一堂美容课相关事件
    $(".hl-button").on("touchstart",function(){

        var that =this;
        //将按钮修改为不可点击的状态
        $(this).addClass("done");

        $.get("./mockdata/addback.json",{data:"lesson"})
            .done(function (data) {

            }).fail(function() {
                plusOne.apply(that);
            new hlWindow().alert({
                content:"每月最多记录40堂美容课哦！"
            });
            }).always(function(){

                //无论是否成功，都将按钮更改为可点击状态
                $(that).removeClass("done")
            });

    });

    //+1的动画
    function plusOne(){
        var plus = $("<span class='hl_plus_one'>+1</span>");
        $(this).before(plus);
        setTimeout($.proxy(plus.remove,plus),800);

    }


