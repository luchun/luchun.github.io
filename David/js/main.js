/**
 * Created by lu7965 on 2015/8/28.
 */
require.config({
    paths:{
        jquery:'../bower_components/jquery/dist/jquery'
    }
})

require(['jquery','window'],function($,hlw){

    var pageWindow = new hlw.HlWindow();
    pageWindow.alert({
        content:"每周最多记录10堂美容课哦！"
    });
    var pkdata =  {
        "pklist":
            [
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                },
                {
                    "family": "江南",
                    "total": "99%"
                }

            ]
    }
    $(".hl-operate").one('click',function(e) {
        console.log("hl-operate")
        e.preventDefault();
        var pklist = new hlw.ShowDetail(pkdata);
        $(this).on('click', function (e) {
            e.preventDefault();
            pklist.show()
        }.bind(pklist));
    })
    $(".hl-button").on("click",function(){
        plusOne.apply(this);
        console.log($(this).position())
        pageWindow.confirm({
            content:"<div>你的美容课次数已经打败全国 <span class='hlw_num'>50%</span> 的姐妹 <br>"+
            " 太棒了，你共完成了 <span class='hlw_num'> 50堂</span> 美容课！"+
            " </div>",
            hasMask:false,
            //x:$(this).position().left +"px",
            y:$(this).position().top +20+"px"
        });
    })
    //+1的动画
    function plusOne(){
        var plus = $("<span class='hl_plus_one'>+1</span>");
        $(this).addClass("done").before(plus);
        setTimeout($.proxy(plus.remove,plus),1000)
    }
})
