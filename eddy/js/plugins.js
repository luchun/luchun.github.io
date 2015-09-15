define(['jquery'], function($){

    //抽象类
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
    };

    //Loading动画层，可直接调用
    function Loading(config){
        var defaultConfig = {
            loadingDiv : $('<div class="loading"><img src="./image/loading.gif" alt=""/></div>'),
            divClass:null,
            backdrop:true
        }
        this.conf = $.extend({},defaultConfig,config);
        this.render();
    }
    Loading.prototype =$.extend({},new Widget(),{
        render:function(){
            var backdropDiv;

            if(this.conf.backdrop){
                backdropDiv = $('<div class="loading-backdrop"></div>');
                $('body').append(backdropDiv);
                $('body').addClass("loading-open");
            }

            this.conf.divClass && this.conf.loadingDiv.toggleClass("loading",this.conf.divClass);
            $("body").append(this.conf.loadingDiv);

            return this;
        },
        destroy:function(){
            if(this.conf.backdrop){
                var backdropDiv = $('.loading-backdrop');
                backdropDiv.remove();
                $('body').removeClass("loading-open");
            }
            var loadingDiv = this.conf.divClass ? $("."+this.conf.divClass) :$(".loading");

            loadingDiv.remove();
            return this
        }
    });

    //Alert 弹出警告框 接收一段text作为参数

    function Alert(text){
        this.text = text;
        this.render();
    }
    Alert.prototype =$.extend({},new Widget(),{
        renderUI:function(){
            this.boundingBox = $("<div class='alert'>" +
                "<div class='alert-box'>"+
                this.text+
                "</div>" +
                "</div>")
        },
        bindUI:function(){
            setTimeout($.proxy(this.destory,this),2000)
        }
    });

    //分享提示层
    function Sharenotice(){ this.render()}
    Sharenotice.prototype = $.extend({},new Widget(),{
        renderUI:function(){
            this.boundingBox =$('<div class="share">'+
                '<div class="share-box">'+
                '<img src="./image/share-arrow.png" alt=""/>'+
                '<span>点击右上角发送给指定朋友 <br/>或者分享到朋友圈</span>'+
                '</div>'+
                '</div>')
        },
        bindUI:function(){
            var _ = this;
            _.boundingBox.on('touchstart',function(){
                _.destory();
            })
        }
    });


    return {
        loading:Loading,
        alert:Alert,
        sharenotice:Sharenotice
    }
})
