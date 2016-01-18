/**
 * Created by lu7965 on 2015/8/28.
 */

    function Widget(){
        this.boundingBox = null;
    }
    Widget.prototype = {
        on:function(type, handler){
            if(typeof this.handlers[type] === undefined){
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;
        },
        fire:function(type,data){
            if(this.handlers[type] instanceof  Array){
                var handlers = this.handlers[type];
                for( var i = 0,len = handlers.length;i<len;i++){
                    handlers[i](data)
                }
            }
        },
        render:function(container){
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.boundingBox);
        },
        destory:function(){
            this.destructor();
            this.boundingBox.off();
            this.boundingBox.remove();
        },
        renderUI:function(){},
        bindUI:function(){},
        syncUI:function(){},
        destructor:function(){}
    }

    function hlWindow (){
        this.cfg = {
            hasMask:true,
            x:null,
            y:null
        }
    }
    hlWindow.prototype = $.extend({},new Widget(),{

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
            this.boundingBox.appendTo('body')
        },
        bindUI:function(){
            if(this.cfg.winType == 'alert'){
                setTimeout($.proxy(this.destory,this),2000)
            }
        },
        syncUI:function(){
            this.boundingBox.css({
                left:this.cfg.x,
                top:this.cfg.y
            })
        },
        destructor:function(){
            this._mask && this._mask.remove() &&  $("body").removeClass("hl_window_open");
        },
        alert:function(cfg){
            $.extend(this.cfg,cfg,{winType:'alert'});
            this.render();
            return this;
        },
        confirm:function(cfg){
            $.extend(this.cfg,cfg,{winType:'confirm'});
            this.render();
            return this;
        },
        update:function(obj){
            var blw_pk_num = this.boundingBox.find(".blw_pk_num"),
                blw_lessons_num = this.boundingBox.find(".blw_lessons_num");

                blw_pk_num.html(obj.pknum);
                blw_lessons_num.html(obj.lessonsnum);

            return this;
        }
    })
