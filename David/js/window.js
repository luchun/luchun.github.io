/**
 * Created by lu7965 on 2015/8/28.
 */
define(['widget','jquery'], function(widget,$){
    function hlWindow (){
        this.cfg = {
            hasMask:true,
            x:null,
            y:null
        }
        console.log("here 1")
    }
    hlWindow.prototype = $.extend({},new widget.Widget(),{

        renderUI:function(){
            this.boundingBox = $(
                '<div class="hl_window hl_window_'+ this.cfg.winType+'" >'+
                    this.cfg.content +
                '</div>'
            )

            if(this.cfg.hasMask){
                this._mask = $('<div class="hl_window_mask"></div>');
                $("body").addClass("hl_window_open")
                this._mask.appendTo('body');
            }
            if(this.cfg.winType == "showDetail"){//如果是查看区域PK榜

            }
            this.boundingBox.appendTo('body')
        },
        bindUI:function(){

            //if(this.cfg.winType == 'alert'){
                //setTimeout($.proxy(this.destory(),this),2000)
            //}
        },
        syncUI:function(){
            console.log(this.cfg.x,this.cfg.y)
            this.boundingBox.css({
                left:this.cfg.x,
                top:this.cfg.y
            })
        },
        destructor:function(){
            this._mask && this._mask.remove() &&  $("body").removeClass("hl_window_open");
        },
        alert:function(cfg){
            console.log("here")
            $.extend(this.cfg,cfg,{winType:'alert'});
            this.render();
            return this;
        },
        confirm:function(cfg){
            $.extend(this.cfg,cfg,{winType:'confirm'});
            this.render();
            return this;
        }
    })

    //ShowDetail 展示区域PK榜
    function ShowDetail (data){
    /* data 格式
        data:{
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
                }
            ]
        }*/
        this.data = data;
        if(! this.data.pklist instanceof Array){
            throw Error("JSON formate error")
        }
        this.render();
    }
    ShowDetail.prototype = $.extend({},new widget.Widget(),{
        renderUI:function(){

            var UIheader = $( '<div class="hl-title"><span class="hl-icon icon-crwon"></span> 区域PK榜</div>' );
            var UIcontainer = $( '<div class="hl-con hl-con-circle"></div>');
            var UIlist =  $('<ul></ul>');

            this.data.pklist.map(function(obj){
                var listitem = $( '<li><span class="hl-chief">'+obj.family+'</span> 首席区域完成率 <span class="hl-total">'+obj.total+'</span></li>');
                UIlist.append(listitem);
            })

            this.boundingBox = $('<section class="hl-section"></section>');

            this.boundingBox
                .append(UIheader)
                .append(UIcontainer.append(UIlist))
                .appendTo('body')
        },
        bindUI:function(){
            var that = this;
            this.boundingBox.on('click','.hl-title',function(){
                that.fire('titleclick');
                that.hide();
            });
        },
        syncUI:function(){
            this.boundingBox.css({
            })
        },
        hide:function(){
            this.boundingBox.hide()
        },
        show:function(){
            this.boundingBox.show()
        }

    })

    //返回两个构造函数
    return {
        HlWindow:hlWindow,
        ShowDetail:ShowDetail
    }
});
