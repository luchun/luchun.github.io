/**
 * Created by lu7965 on 2015/8/28.
 */
require.config({
    paths:{
        jquery:'../bower_components/jquery/dist/jquery'
    }
})

require(['jquery','window'],function($,hlw){

    //g个人课程信息对象
    //var pageWindow = new hlw.HlWindow();
    //pageWindow.confirm({
    //    content:"<div>你的美容课次数已经打败全国 <span class='hlw_num blw_pk_num'>50%</span> 的姐妹 <br>"+
    //    " 太棒了，你共完成了 <span class='hlw_num blw_lessons_num'> 50堂</span> 美容课！"+
    //    " </div>",
    //    hasMask:false,
    //    y:$('.hl-button').position().top +20+"px"
    //});

    //记录一堂美容课相关事件
    $(".hl-button").on("click",function(){

        var that =this
        //将按钮修改为不可点击的状态
        $(this).addClass("done")

        $.get("./mockdata/addback.json",{data:"lesson"})
            .done(function (data) {

                if(data.mark){
                    //成功的话，将出现加1的效果
                    plusOne.apply(that);
                    //同时更新完成信息
                    $(".hl_user_info")
                        .find(".blw_pk_num")
                        .html(data.pknum)
                        .end()
                        .find(".blw_lessons_num")
                        .html(data.lessonsnum);
                }else{
                    new hlw.HlWindow().alert({
                        content:"每周最多记录10堂美容课哦！"
                    });
                }
            }).fail(function() {

            }).always(function(){

                //无论是否成功，都将按钮更改为可点击状态
                $(that).removeClass("done")
            });

    });

    //+1的动画
    function plusOne(){
        var plus = $("<span class='hl_plus_one'>+1</span>");
        $(this).before(plus);
        setTimeout($.proxy(plus.remove,plus),1000)
    }


})
