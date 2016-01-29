/**
 * Created by lu7965 on 2016/1/7.
 */
;(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.AlertWindow = factory(root.jQuery);
    }

}(this, function ($) {
    'use strict';

    var AlertWindow = {
        handles:{},
        on: function (type, handle) {
            if(!this.handles[type]){
                this.handles[type] = [];
            }
            this.handles[type].push(handle);
            return this;
        },
        fire: function (type,args) {
            if( this.handles.hasOwnProperty(type) && this.handles[type] instanceof Array ){
                this.handles[type].forEach(function ( callback ) {
                    callback && callback(args);
                })
            }
            return this;
        },
        render: function () {

            this._mask = $('<div class="window_mask"></div>');
            this.boundingBox = $('<div class="window_boudingbox"></div>');
            this.windowDialog = $('<div class="window-dialog"></div>');
            this.windowHeader = $(('<div class="window-header">' +
                                        '<table><tobdy><tr>' +
                                            '<td style="width: 4.2em;"><img src="'+ this.consultantHead +'" alt="" class="consultant-head"></td>' +
                                            '<td><div class="line-right"><p class="window-header-title">Hi! 我是美容顾问</p><span class="window-header-name">'+ this.consultantName +'</span></div></td>' +
                                            '<td style="width: 3em;"><a href="tel:'+  this.telNum  +'"><span class="window-call-out"></span></a></td>' +
                                        '</tr></tobdy></table>' +
                                    '</div>'));
            this.windowBody = $('<div class="window-body">' +
                                    '<p class="window-body-notice">留下联系方式，更快享受玫琳凯“美美哒”美丽服务</p>' +
                                    '<div class="input-group">' +
                                        '<input  type="number" pattern="\\d*" class="window-tel-input" id="window-tel-input" placeholder="请输入您的手机号码" autofocus>' +
                                        '<button type="button" class="input-group-addon">确定</button>' +
                                    '</div>' +
                                    '<div class="window-error-notice"></div>' +
                                '</div>');
            this.windowFooter = $('<div class="window-footer"><a href="#" class="window-ignore-btn">以后再说 &gt;</a></div>');

            this.windowHeader.appendTo(this.windowDialog);
            this.windowBody.appendTo(this.windowDialog);
            this.windowFooter.appendTo(this.windowDialog);
            this.windowDialog.appendTo(this.boundingBox);
            this.boundingBox.appendTo('body');
            this._mask.appendTo("body");

            return this;

        },
        bindUI: function () {
            var context = this;
            this.boundingBox.on('click','.window-ignore-btn', function (e) {
                context.hide();
            });
            this.boundingBox.on('click','.input-group-addon', function (e) {
                var telvalue = $('#window-tel-input').val();
                context.fire('addTel',telvalue)
            });
            return this;
        },
        destory: function () {

        },
        show: function () {
            if($('.window_boudingbox').length>0){
                this.boundingBox.show();
                this._mask.show();
            }else {
                this.render();
                this.bindUI();
            }
            this.boundingBox.find('#window-tel-input').focus();
            return this;
        },
        hide: function () {
            this.boundingBox.hide();
            this._mask.hide();
            this.boundingBox.find('.window-error-notice').text('');
            return this;
        },
        error: function (text) {
            this.boundingBox.find('.window-error-notice').text(text);
            return this;
        }

    };

    return AlertWindow;
}));
