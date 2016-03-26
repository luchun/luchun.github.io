---
layout: post
title: 我的项目脚手架

---
著名的html起步器boilerplate有针对移动端优化的[html5boilerplate](https://html5boilerplate.com/mobile/),可以在新开项目时使用。

记录一些我在移动端项目中的起步设置

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0"/>

设置屏幕的缩放，宽度，用户缩放等。并不是所有的项目都应该这样设置，按需设置。


    <meta name="format-detection" content="telephone=no"/>

虽然手机浏览器识别电话号码，自动加上链接的功能挺好的，但浏览器样式多数时候不符合项目经理的要求，都要自己重新样式化，所以在头部就禁用掉了这个功能。

    font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;

字体设置 ，从腾讯团队抄来的。
    
    a, img {
        // 禁止长按链接与图片弹出菜单
        -webkit-touch-callout: none;
        }

也是可选，有时候因为误选中等原因带来的麻烦，一步去除掉。

    html, body {
        // 禁止选中文本（如无文本选中需求，此为必选项）
        user-select: none;
        }

    *{
        // 去除点击时的灰色背景色
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

我觉得在点击按钮等组件时，给出灰色背景，是挺有用的，可是产品经理..


    // 在没有置底底部的页面 则不需要
    //
    .site-content{
        @at-root html, body {
                height: 100%;
        }
        min-height: 100%;
        // 要等于底部的高度 footer height
        margin-bottom: -($site-footer-height);
        &::after{
            content: "";
            display: block;
            height: $site-footer-height;
        }
        @at-root .site-footer{
            height: $site-footer-height;
            background: transparent;
        }
    }
    
    hmtl
        head
        body
            .site-content
            .site-footer
        
以前都是用js来计算底部，很不方便，后来学会了这一个方式。
原理就是`body`设置`100%`，下边有两个子元素，一个`main`,一个`footer`。`main`的高度是`min-height:100%`，然后用`margin-bottom`设置负值将底部拉上来。但这样来的话有可能遮挡住一部分文档，这个方式聪明的用了`::after`伪类，设置为和底部一样的高度，就避免的遮挡，






 