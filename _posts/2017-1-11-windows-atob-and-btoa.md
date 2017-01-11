---
layout: post
title: WindowBase64 接口
---

WindowBase64 接口定义了两个分别用来进行编码和解码 base64 的工具函数。 base64 经常用在 [data URI](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs) 中。

WindowBase64 并不是一个全局对象，没有直接访问 WindowBase64 接口的方式。 不过 Window 对象上有该接口的实现.    
    

## window.btoa 
将ascii字符串或二进制数据转换成一个base64编码过的字符串,该方法不能直接作用于Unicode字符串.

### 语法
     
     var encodedData = window.btoa(stringToEncode);
 
### 例子 
    
    var encodedData = window.btoa("Hello, world"); // 编码
    var decodedData = window.atob(encodedData); // 解码
    
由于一些网络通讯协议的限制,你必须使用该方法对原数据进行编码后,才能进行发送.
接收方使用相当于 window.atob 的方法对接受到的base64数据进行解码,得到原数据.例如, 发送某些含有ASCII码表中0到31之间的控制字符的数   
    
### Unicode 字符串

在各浏览器中,使用 window.btoa 对Unicode字符串进行编码都会触发一个字符越界的异常.
先把Unicode字符串转换为UTF-8编码,可以解决这个问题

    function utf8_to_b64( str ) {
        return window.btoa(unescape(encodeURIComponent( str )));
    }
    
    function b64_to_utf8( str ) {
        return decodeURIComponent(escape(window.atob( str )));
    }
    
    // Usage:
    utf8_to_b64('? à la mode'); // "4pyTIMOgIGxhIG1vZGU="
    b64_to_utf8('4pyTIMOgIGxhIG1vZGU='); // "? à la mode"
    //译者注:在js引擎内部,encodeURIComponent(str)相当于escape(unicodeToUTF8(str))
    //所以可以推导出unicodeToUTF8(str)等同于unescape(encodeURIComponent(str))    

## window.atob
WindowBase64.atob() 函数用来解码一个已经被base-64编码过的数据。
你可以使用 window.btoa() 方法来编码一个可能在传输过程中出现问题的数据，并且在接受数据之后，使用 window.atob() 方法来将数据解码。
例如：你可以把ASCII里面数值0到31的控制字符进行编码，传输和解码。

### 语法
    
    var decodedData = window.atob(encodedData);

### 例子
    
    var encodedData = window.btoa("Hello, world"); // 编码
    var decodedData = window.atob(encodedData); // 解码

## 文档

* [WindowBase64](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64)

* [window.btoa](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/btoa)

* [window.atob](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/atob)