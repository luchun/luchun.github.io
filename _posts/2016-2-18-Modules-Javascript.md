---
layout: post
title: Javascript 模块化写法
---

找了一个可复用的模块化写法 ，再也不用担心项目用的是require.js还是没用还是其他的什么了
<!-- more -->
    ;(function (root, factory) {

        if (typeof define === 'function' && define.amd) {
            define(['jquery'], factory);
        } else if (typeof exports === 'object') {
            module.exports = factory(require('jquery'));
        } else {
            root.youModule = factory(root.jQuery);
        }

    }(this, function ($) {
        'use strict';

        var youModule = {};

        return youModule;
    }));

 