---
layout: post
title: 二月份学习
---
二月学习记录
<!-- more -->

## `$.now()` 获得距离1970年1月1日的毫秒数。
 
 ECMAscript 1.0 中提供的方法 `new Date().getTime()`;
 ECMAscript 5.1 中提供的方法 `Date.now()`;
 
##  `$.parseJSON()` 发布于2010年，IE8（支持JSON）出现的次年，针对IE6 IE7 ，所以现在没必要使用了。

 ECMAscript 5.1 中提供的方法 JSON.parse
 jQuery 没有 与 `JSON.stringify` 对应的方法
    
## `$.parseXML()` 解析 xml

    var azureErrorXmlString = '<?xml version="1.0" encoding="utf-8"?>
      <Error>
        <Code>InvalidQueryParameterValue</Code>
        <Message>Value for one of the query parameters specified in the request URI is invalid.</Message>
        <QueryParameterName>popreceipt</QueryParameterName>
        <QueryParameterValue>33537277-6a52-4a2b-b4eb-0f905051827b</QueryParameterValue>
        <Reason>invalid receipt format</Reason>
      </Error>'
    
    var errorDocument = $.parseXML(azureErrorXmlString);
    var code = $(errorDocument).find('Code').text();
    var message = $(errorDocument).find('Message').text()

使用 原生方法
    
    var errorDocument = new DOMParser().parseFromString(azureErrorXmlString, 'application/xml');
    var code = errorDocument.querySelector('Code').textContent;

虽然所有现代浏览器都支持 `DOMParser` ，但他还是一个草案    

## `$.trim()` 清理字符串两端的空白

对应 String.prototype.trim() 原生方法，只是这个在ECMAscript5.1中才有，IE9 是最早实现该方法的浏览器。
对于老浏览器 可以使用下边的正则处理

    “(' some name ').replace(/^\s+|\s+$/g, '');”

## 类型检测

### jQuery.isNumeric() 和 jQuery.type()
 
    jQuery.isNumeric('123') // true
    jQuery.type([]) // array
    $.type(null) // 'null'
    $.isNumeric(Infinity) // false
    $.isNumeric(NaN) // false
    
使用 typeof 的几个不好用的地方
    
    typeof(Infinity) // 'number'
    typeof(NaN) // 'number'
    typeof(null) // 'object'
    typeof([]) // 'object'
    
使用原生中的方法实现一个 isNumeric
    
    function isNumeric(maybeNumber) {
        return isNaN(parseFloat(maybeNumber)) && isFinite(maybeNumber)
    }
    
### Arrays
    
ECMAscript 5.1 提供了 Array.isArray() 来判断是否是数组， jQuery2.0 的 $.isArray 就是先调用 Array.isArray ,没有的情况下 再使用 $.type()

使用原生实现 isArray

    isArray(value){
        return Array.isArray ? Array.isArray(value) : Object.prototype.toString.call(value) === '[object Array]'
    }
    
### Objects
    
判断 值是否为 object ，要注意 typeof null 也是 object
     
    function isObject(value){
        return value !== null && Object.prototype.toString.call(value) === '[object Object]';
    } 
    
jQuery 还有另一个方法 `$.isEmptyObject({}) // true` 判断对象是否为空对象    

    function isEmptyObject(value){
        for( property in value) {
            return false;
        }
        return true;
    }
    
### Functions
    
    $.isFunction();
    typeof function(){} // 'function'
    
### 遍历对象的键和值
    
    $.each()
    
可以使用原生的 for...in 循环
    
    for(var property in object){
        if(object.hasOwnProperty(property)){
            console.log(object.property)
        }
    }

或者使用 Object.keys(object), 来自于 ECMAscript 5.1

### 复制和合并对象

    $.extend()
    
    function extend(first, second){
        for(var secondProp in second){
            var secondVal = second[secondProp];
            first[secondProp] = secondVal;
        }
        return first;
    }
    
    es6 提供了 Object.assign()
    
### 遍历 数组
    
    $.each()
    
    ECMAscript 5 中 提供的 Array.prototype.forEach
    ECMAscript 6 中提供的 for...of 循环
     var languages = ['C', 'Java', 'Go'];
     for(var language of languages){
     
     }

### 定位元素位置

    var names = ['joe', 'jane', 'jen', 'jim','bill','bob']
    
    $.inArray('jen', name) // 2
    
    names.indexOf('jen') // 原生方法
    
    ES5 还有一些别的方法
     
    数组中是否含有
    names.some(function(name){ return name[0] === 'b'}) //true
    
    ES6 中新增了 findIndex 和 find
    
    names.findIndex(name => name[0] === 'b') // 4
    name.find(name => name[0] === 'b') // 'bill'
    
    ES6 新增 includes
    
    names.includes('bill') //true
    
    $.grep()可以对数组进行过滤
    
    $.grep(names,(name)=> name.length === 3) // ['joe', 'jen', 'jim']
    
    ES5中对应的方法 为 Array.prototype.filter
    
    name.filter(name => name.length === 3) // ['joe', 'jen', 'jim']
    
   

# 查找 HTML 元素
## 核心元素选择器
### IDs
#### jQuery
    var result = $('#my-element-id');
    result.is('#my-element-id'); // true
#### Web API
DOM Level 2 中 就提供了 id 选择器，并被所有浏览器支持（IE5最早实现）
    
    var result = document.getElementById('my-element-id');
    result.id === 'my-element-id' //true
    
或者使用 W3C Selectors API Level 1 提供的方法    

    var result = document.querySelector('my-element-id');
    result.id === 'my-element-id' //true

### Classes
#### jQuery
    var result = $('.some-class');
    result.is('.some-class'); //true
#### Web API
    var result = anyElement.getElementsByClassName('some-class');
    result[0].className === 'some-class' //true
或者
    var result = anyElemnt.querySelectorAll('.some-class');
    result[0].className === 'some-class'

### Tags
#### jQuery
    var result = $('code');
    result.is('code');
#### Web API
    var result = anyElement.getElementByTagName('code')
    result[0].tagName === 'code' //true
或者    
    var result = anyElement.querySelectorAll('code')
    result[0].tagName === 'code'

### 伪类
#### jQuery
    var focusInputs = $('input:focus');

#### Web API
    var focusInputs = document.querySelector('input:focus')

## 基于关系的元素选择器
    
### 父辈 和 子辈
#### jQuery
    var result = $a.parent();
    var result = $a.parent().parent();
    var result = $a.children();
    var result = $('div > p');
    var result = $a.contents();
    var result = $('div > *');

#### Web API
    var result = a.parentNode; 
    var result = a.parentNode.parentNode; 
    var result = div.children
    var result = div.childNodes // childNodes会包含一些意外的节点 如 Text
    var result = document.querySelectorAll('div>p')
    var result = document.querySelectorAll('div>*')
    
### 平辈
#### jQuery
    var result = $('span').siblings();
    var result = $('span').prev();
    var result = $('span').next().next();
    jquery 也可以使用标准的 w3c css 选择符

#### Web API
    
    var result = document.querySelectorAll('#parent > span ~ *')
    var result = document.querySelectorAll('#parent > span ~ div')
    var result = document.querySelectorAll('#parent > span + *')
    var result = document.querySelector('span').nextSibling.nextSibling
    var result = document.querySelector('span').nextElementSibling.nextElementSibling

### 祖先和后代
        
#### jQuery
    var result = $('span').parents();
    var result = $('span').closest('div');
    var result = $('span').find('*');
    var result = $('span').find('span');
    jquery 也可以使用标准的 w3c css 选择符

#### Web API
    
    var currentNode = document.getElementByTagName('span')[0],
        ancestors = [];
    while(currentNode.parentElement){
        ancestors.push(currentNode.parentElement);
        currentNode = currentNode.parentElement;
    }    
    
    function closest(referenceEl, closestSelector){
        if(referenceEl.closest){ // Chrome, firefox, safari 支持 WHATWG 提出的 Element.closest() 与 jQuery closest() 功能类似
            return referenceEl.closest(closestSelector)
        }
        // Element.matches 在一些浏览器中 需要浏览器前缀
        var matches = Element.prototype.matches || Element.prototype.msMAtchesSelector || Element.prototype.webkitMatchesSelector,
            currentEl = referenceEl;
        while(currentEl){
            if(matches.call(currentEl, closestSelector)){
                return currentEl
            }
            currentEl = currentEl.parentElement;
        }
        return null;    
            
    }
    var result = closest(document.querySelector('a'), 'div')  
    
    // find 后代十分简单
    var result = document.querySelectorAll('ul *');
    var result = document.querySelectorAll('ul span');
    
    
## 掌握高阶元素选择
    
### 排除元素
#### jQuery
    var $result = $('ul li').not('.active');
#### Web API
    var result = document.querySelectorAll('ul li:not(.active)')
    
    
### 选择多个元素
#### jQuery
    var $result = $('#link-container, .my-name, ol');
#### Web API
    var result = document.querySelectorAll('#link-container, .my-name, ol')
    
    
### 元素集合和修饰符
#### jQuery
    $(':button');
    $(':submit');
    $result = $('div.fitst');
    $result = $('div').first();
#### Web API
    var result = document.querySelectorAll('button, input[type="button"]')
    var result = document.querySelectorAll('button[type="submit"], input["type="submit"]')
    var result = document.querySelector('div') // 使用 querySelector 只选择第一个

# 使用 和 理解 HTML元素属性    
## 通过 属性 查找 元素
    
### 通过 属性名称 查找 元素
#### jQuery
    var $result = $('[required], [disabled]');
#### Web API
    var result = documeny.querySelectorAll('[required], [disabled]');
    
### 排除元素
#### jQuery
#### Web API    
    
    
## 读写元素属性

### 读 classes

jQuery 有 `hasClass`
#### Web API     
DOM 4 提供了 classList
    toolEl.classList.contains('some-class-name')
对于不支持的浏览器:
    var hasClass = function(el, className){
        return new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
    }
    
### 增加 和 移除 class
    
jQuery 的 `addClass()` 和 `removeClass()`
使用 DOM4 的 classList    

    El.classList.remove('red');
    El.classList.add('blue');
    
对于不支持 classList 的浏览器
    
    var removeClass = function(el, className) {
        el.classNamr = el.className.replace(new RegExp('(^|\\s)' + className + '(\\s|$)'), '')
    }
    
### toggle classes
jQuery 的 `toggleClass()`    

使用 classList
    El.classList.toogle('hide')
对于不支持 classList
    var toggleClass = function(el, className){
        var pattern = new RegExp('(^|\\s)' + className + '(\\s|$)');
        if (pattern,test(el.className)){
            el.className = el.className.replace(pattern, '')
        } else {
            el.className += ' ' + className
        }
    }
    
## 其他标准或自定义属性
### 读取属性
    
    <input type='password' name='user-password' required>
    
jQuery 
    
    $inputEl.attr('type') // password
    $inputEl.is('[required]') // true
    
Web API
    
    inputEl.getAttribute('type'); // password
    inputEl.hasAttribute('required'); // true

### 修改属性
    
    <input name='temp' required>
    // 1. 修改类型为 email
    // 2. 不修改为非必须
    // 3. 重命名为 'userEmail'
    
jQuery 

    $inputEl
        .attr('type', 'email')
        .removeAttr('required')
        .attr('name', 'userEmail');
        
Web API
    
    inputEl.setAttribute('type', 'email');
    inputEl.removeAttribute('required');
    inputEl.setAttribute('name', 'userEmail');
    
# 6. HTML元素 'data-' 数据存储和检索    
    
### 使用 jQuery 读写 data- 标签
    
    <video src="my-video.mp4" data-scene-offsets="9,22,38">
    
    var offsets = $('video').data('sceneOffsets');
    $('video').data('sceneOffsets', '1,2,3');
    
### 使用 Web API 读写 data- 标签    
    
    var offsets = document.getElementsByTagName('video')[0]
        .getAttribute('data-scene-offsets');
    document.getElementsByTagName('video')[0]
            .setAttribute('data-scene-offsets', '1,2,3');
            
## 操作复杂的数据
            
### jQuery
            
    $(video).data('scenes', [
        {
            offset:9,
            title:'intro',
            description:'introduction the characters',
            location:'living room'
        },{
            offset:22,
            title:'the problem',
            description:'introduction the characters',
            location:'living room'
        },{
            offset:38,
            title:'the resolution',
            description:'introduction the characters',
            location:'living room'
        }
    ])          

如果想读取第二幕的标题
    
    var sceneTwoTitle = $('video').data('scenes')[1].title;
             
### 使用更原生的方法

    var cache = [];
        setData = function(el, key, data){
            var cacheIdx = el.getAttribute('data-cache-idx'),
                cacheEntry = cache[cacheIdx] || {};
            cacheEntry[key] = data;
            if(cacheIdx == null){
                cacheIdx = cache.push(cacheEntry) - 1;
                el.setAttribute('data-cache-idx', cacheIdx)
            }    
        }
    setData(document.getElementsByTagName('video')[0], 'scenes',[
        {
             offset:9,
             title:'intro',
             description:'introduction the characters',
             location:'living room'
        },{
             offset:22,
             title:'the problem',
             description:'introduction the characters',
             location:'living room'
        },{
             offset:38,
             title:'the resolution',
             description:'introduction the characters',
             location:'living room'
        }
    ]);            
            
#### 当HTML元素被移除的时候 从我们的Cache中移除相关数据
一个潜在的问题是我们的cache可能会增长的很大，我们需要在dom被移除的时候移除相关的数据。            
关于如何监听 相关的dom的 remove 事件，WHATWG 提出了 Mutation Observer ,虽然 ie9 ie10 不支持，但有一个 polyfill 可以在
IE9 IE11 上降级使用 Mutation Events
            
    var videoEl = document.querySelector('video'),
        observer = new MutationObserver(function(mutations){
            var wasVideoRemoved = mutations.some(function(mutation){
                return mutation.removedNodes.some(function(removedNode){
                    return removedNode === videoEl;
                })
            });
            
            if(wasVideoRemoved){
                var cacheIdx = videoEl.getAttribute('data-cache-idx');
                cache.splice(cacheIdx, 1);
                observer.disconnect();
            }
        })             
            
    observer.observe(videoEl.parentNode, {childList: true})        
            
### HTML 元素数据的未来            
#### HTML5 Dataset 属性
            
    <video src="my-video.mp4" data-scene-offsets="9,22,38">
    
    var offsets = document.querySelector('video').dataset.sceneOffsets // '9,22,38'        
    document.querySelector('video').dataset.sceneOffsets = '1,2,3'
    delete document.querySelector('video').dataset.sceneOffsets // 删除
          
# 元素样式
## 行内样式

    El.style.color = 'blue',
    El.style.fontWeight = 'bold'
   
## 样式表

    var sheet = document.style.Sheet[0];
    sheet.insertRule('h2 {font-style:italic;}', sheet.cssRules.length)
    
## 控制元素的可见性
   
    $element.hide();
    $element.show();
    $element.is(':visible');
    $element.is('hidden');  
          
HTML5提出了 `hidden` 属性， 对于不支持的浏览器，可以在样式表中加入 `[hidden] {display: none;}`
我们可以使用这个属性来控制元素的显示隐藏
    
    element.setAttribute('hidden', '');
    element.removeAttribute('hidden');
    element.hasAttribute('hidden');

## 判断元素的 宽和高

jQuery 提供了 `width()` 和 `height()` 方法

### 获取 content + padding

对应 jquery 的 innerWidth() 和 innerHeight();
    
    document.querySelector('.box').clientHeight;
    document.querySelector('.box').clientWidth;
    
### 获取 content + padding + border
    
    document.querySelector('.box').offsetHeight;
    document.querySelector('.box').offsetWidth;         
            
# 8. DOM 操作
            
### 使用 jQuery 移动元素
   
    var $flavors = $('.flavors'),
      $chocolate = $flavors.find('li').eq(0),
      $vanilla = $flavors.find('li').eq(2);
    
    $chocolate.after($vanilla);

    var $typesHeading = $('h2').eq(1);
    $typesHeading.prependTo('body');
    $typesHeading.after($('.types'));

    var $unassigned = $('.unassigned'),
      $rockyRoad = $unassigned.find('li').eq(0),
      $gelato = $unassigned.find('li').eq(1);

    $vanilla.after($rockyRoad);
    $gelato.appendTo($('.type')); 
            
### 使用 DOM api
            
    var flavors = document.querySelector('.flavors'),
      strawberry = flavors.children[1],
      vanilla = flavors.children[2];
    
    flavors.insertBefore(vanilla, strawberry);
    
    var headings = document.querySelectorAll('h2'),
      flavorsHeading = headings[0],
      typesHeading = headings[1],
      typeList = document.querySelector('.type');
    document.body.insertBefore(typesHeading, flavorsHeading);
    document.body.insertBefore(typeList, flavorsHeading);
    
    flavors.insertBefore(document.querySelector('.unassigned > li'), strawberry);
    document.querySelector('.types').appendChild(document.querySelector('.unassigned > li'));        
            
### 复制元素
            
    <ol class='numbers'>
      <li>1</li>
      <li>2</li>
    </ol>        
     
    $('.numbers').clone();
    
    
    // 浅复制 ，返回空的 <ol class='number'>
    document.querySelector('.numbers').cloneNode();
    // 深复制 包括子节点
    document.querySelector('.numbers').cloneNode(true);        
            
### 创建和删除元素            
            
    var $flavors = $('.flavors');
    $('<li>pistachio</li>').appendTo($flavors);
    $('<li>neapolitan</li>').appendTo($flavors);
    
    $('.types li:last').remove();
    
    var flavors = document.querySelector('.flavors');
    flavors.insertAdjacentHTML('beforeend', '<li>pistachio</li>')
    flavors.insertAdjacentHTML('beforeend', '<li>neapolitan</li>')
    // insertAdjacentHTML 比 innerHTML 快 ，见 https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML
    
    // 移除元素 Element.remove 是 2014 年才提出的方法
    // 旧浏览器可以使用 removeChild
    
    document.querySelector('.types li:last-child').remove();
    
    var gelato = document.querySelector('.types li:last-child');
    gelato.parentNode.removeChild(gelato);        
            
### 文本内容
    
    
    $('.types li').eq(1).text('italian ice')

    document.querySelectorAll('.types li')[1].textContent = 'italian ice'; // 支持有限 ie9
    document.querySelectorAll('.type li')[1].innerHTML = 'italian ice';        
            
# 9. AJAX 请求： 动态数据 和 页面更新
## 发送 GET, POST, DELETE, PUT, PATCH 请求

    $.get('/my/name').then(
      function success(name){
        console.log('my name is ' + name);
      },
      function faulure() {
        console.log('Name requies failed!');
      }
    );
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/my/name');
    xhr.onload = function () {
      if(xhr.status >= 400){
        console.log('Name request failed!')
      } else {
        console.log('my name is ' + xhr.responseText)
      }
    }
    xhr.onerror = function () {
      console.log('Name request failed')
    }
    xhr.send();
    
    
    // 使用 WHATWG 提出的 fetch 更简单
    
    fetch('/my/name').then(function (response) {
      if(response.ok){
        return response.text()
      }else {
        throw new Error()
      }
    }).then(function (name) {
      console.log('mt name is ' + name)
    },function failure() {
      console.log('name request failed')
    });   
            
## 编码请求 和 解码响应

### url 编码

    $.param({
      key1: 'some value',
      key2: 'some value' 
    });
    
    $.ajax({
      method: 'POST',
      url:'/user',
      data:{
        name: 'Mr. Ed',
        address: '1313 Mockingbird',
        phone: '555-555-5555'
      }
    })
    
    encodeURI('key1=some value&key2=another value');
    
    var xhr = new XMLHttpRequest(),
      data = encodeURI('name=Mr.Ed&address=1313 Mockingbird&phone=555-555-5555');
    xhr.open('POST','/user');
    xhr.sendRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data)
    
    var data = encodeURI('name=Mr.Ed&address=1313 Mockingbird&phone=555-555-5555');
    fetch('/user', {
      method: 'POST',
      headers:{'Content-Type': 'application/x-www-form-urlencoded'},
      body: data
    })   

### JSON 编码          
    
    $.ajax({
      method: 'POST',
      url: '/user',
      contentType: 'application/json',
      data:JSON.stringify({
        name:'Mr.Ed',
        address:'1313 Mockingbird Lane',
        phone:{
          home:'555-555-5555',
          mobile:'444-444-4444'
        }
      })
    })
    $.getJSON('/user/1', function (user) {
    
    })
    
    var xhr = new XMLHttpRequest(),
      data = JSON.stringify({
        name:'Mr.Ed',
        address:'1313 Mockingbird Lane',
        phone:{
          home:'555-555-5555',
          mobile:'444-444-4444'
        }
      });
    xhr.open('POST', '/user');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data)      
          
# 11. 掌握异步任务

## Callbacks: 传统控制异步操作的方法
          
    contactsHelper.register('beforeDelete', function(contact, callback){
        confirmModel.open('Delete contact ' + contact.name + '?',function(result){
            callback({cancel: result.cancel})
        })
    })      
          
### Node.js and the Error-First Callback Node.js和 错误优先的回调

我没有花很多时间讨论 Node.js,但它曾定期出现在本书中。          
第三章中的 '非浏览器' 小节中曾经有一点深入讨论这个惊人流行的基于JavaScript 的服务端环境。
Node.js层长期以来回调来支持跨API的异步行为。
事实上，它曾经普及一个非常特定类型的回调系统：'错误优先'的回调。
这个特殊的约定在整个Node.js环境中非常常见，并且可以在许多重要库中的API的一部分找到，
如 Express, Socket.IO,以及 request。
它可以说是所有各种回调系统中最”标准的“，虽然当然没有真正的标准，只是约定，虽然一些约定比其他约定更受欢迎。

错误优先的回调，正如你所期望的，一个错误作为第一个参数传递给提供的回调函数。
通常，这个错误参数被期望为一个 Error 对象。
Error 对象一直是 JavaScript 中的一部分，可以追溯到 1997年 ECMAScript规范 第一版。
Error 可以在意外情况下被抛出，也可以在正常情况下用于表述一个应用错误。
使用错误优先回调，如果相关操作以某种方式失败，则Error对象可以作为第一个参数传递给回调。          
如果运行顺利， null 将被作为第一个参数作为代替。
回调函数自身可以很方便的判断运行状态。          
如果相关任务没有失败，则使用随后的参数来向回调函数提供相关信息。 
          
如果你不清楚也没有关系。你将在本节剩下部分看到错误优先的回调，          
错误优先回调是在通过回调系统支持异步任务时发生错误或传递请求的信息的最优雅方式。          
          
### Solving Common Problem with Callbacks 使用回调解决常见问题

让我们看一个简单的例子，一个模块需要用户的邮箱地址（异步操作）：

    function askForEmail(callback) {
        promptForText('Enter email:', function (result) {
            if (result.cancel) {
                callback(new Error('User refused to supply email.'))
            } else {
                callback(null, result.text)
            }
        })
    }
    
    askForEmail(function (err, email) {
        if (err) {
            console.error('Unable to get email: ' + err.message)
        } else {
            //save the email with the user account record
        }
    });
          
你能指出前边代码的工作流吗？当调用最终要求我们的用户的电子邮件地址的函数时，错误优先回调作为唯一的参数传递。          
如果用户拒绝提供，描述情况的错误作为第一个参数传递给我们的回调。        
否则，err参数为null，这表示我们确实从用户收到一个有效的响应 - 电子邮件地址作为第二个参数。          
          
另一个 callback 特定的用处是处理 AJAX 请求的结果。
从 JQuery 最早的版本开始，它就可以接收一个 callback 并在AJAX 请求成功的时候调用。          
          
          $.get('my/name', function (name) {
              console.log('my name is ' + name)
          })

第二个参数是一个成功时的回调函数，请求成功时 jQuery 会把响应交给它来处理。
但是这个例子只处理成功的情况，那失败怎么办？另一个方法是将成功和失败的回调都作为对象属性传递。

    $.get({
        url: 'my/name',
        success:function (name) {
            console.log('my name is ' + name)
        },
        error: function () {
            console.error('Name request failed')
        }
    })

以下是不依赖 jquery 发起 AJAX 请求的方法，它支持所有浏览器，同样依赖回调来处理成功失败的结果。

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'my/name');
    xhr.onload = function () {
        if (xhr.status >= 400) {
            console.error('Name request failed!');
        } else {
            console.log('my name is ' + xhr.responseText)
        }
    };
    
    xhr.onerror = function () {
        console.log('Name request failed!')
    };
    
    xhr.send();

如果请求获得了服务器的响应， onload 回调就会被调用。
相反，如果请求无法发出，则 onerror 回调会被调用，或者服务器没有响应。

## Promises: an Answer to Async Complexity /Promises: 异步复杂性的答案
   
在讨论回调的替代方法之前，或许先指出依赖回调来管理异步任务相关的一些问题是明智的。
前面部分中描述的回调系统中的第一个根本缺陷在支持该约定的每个方法或函数中都是明显的。
当调用一个利用回调来表示异步操作成功或失败的函数时，必须提供这个回调作为方法参数。
方法使用的任何输入值也必须作为参数传递。 在这种情况下，您现在传递输入值并通过方法参数管理方法的输出。
这有点不直观和尴尬。 这个回调合约也排除了任何返回值。 同样，所有的工作都是通过方法参数完成的。

回调的另一个问题：没有标准，只有约定。 
每当你发现自己需要调用一个异步执行某些逻辑的方法，并期望有一个回调来管理这个过程，它可能会期望一个错误第一回调，但它可能不会。 
你怎么可能知道？ 由于没有回调的标准，因此您必须参考API文档并传递相应的回调。
也许你必须与多个库接口，所有这些都期望回调来管理异步结果，每个依赖于不同的回调方法约定。
一些可能期望错误优先回调。 其他可能在调用提供的回调时在其他地方包括错误或状态标志。 
有些人甚至可能甚至不考虑错误！

也许回调的最大的问题变得明显，当他们被迫进行不常见的使用。
例如，考虑一些必须顺序运行的异步任务，每个后续任务取决于前一个的结果。 
为了演示这种情况，假设您需要向一个端点发送AJAX请求以加载用户ID列表，
然后必须向服务器发送请求，以便为列表中的第一个用户加载个人信息。 
此后，用户的信息被呈现在屏幕上用于编辑，并且最后修改的记录被发送回服务器。 
这个整个过程涉及四个异步任务，每个任务取决于前一个的结果。 我们将如何使用回调来建模这个工作流？ 
它不漂亮，但它可能看起来像这样：

    function updateFirstUser() {
        getUserIds(function (error, ids) {
            if(!error){
                getUserInfo(ids[0], function (error, info) {
                    if(!error){
                        displayUserrInfo(info, function (error, newInfo) {
                            if(!error){
                                updateUserInfo(id, info, function (error) {
                                    if(!error){
                                        console.log('Record updated!')
                                    }else {
                                        console.error(error)
                                    }
                                })
                            }else {
                                console.error(error)
                            }
                        })
                    }else {
                        console.error(error)
                    }
                })
            }else {
                console.error(error)
            }
        })
    }
    
    updateFirstUser()

像前面的代码通常被称为回调地狱。 
每个回调函数必须嵌套在前一个回调函数中，以便使用其结果。 
正如你可以看到的，回调系统不具有弹性。 
让我们看看另一个进一步证实这个结论的例子。 
这次，我们需要向三个单独的端口同时发送三个单独的AJAX请求提交一个产品的三个文件。 
我们需要知道所有请求何时完成以及这些请求中的一个或多个是否失败。 
无论结果如何，我们都需要通知用户结果。 
如果我们坚持使用错误优先回调，我们的解决方案是一个脑筋急转弯：

    function sendAllRequests() {
        var successfulRequests = 0;
        function handleCompletedRequest(error) {
            if(error){
                console.log(error)
            } else if(++successfulRequests === 3){
                console.log('All requests were successful!')
            }
        }
        
        sendFile('file/docs', pdfManualFile, handleCompletedRequest);
        sendFile('file/images', previewImage, handleCompletedRequest);
        sendFile('file/video', howToUseVideo, handleCompletedRequest)
    }
    sendAllRequests();

代码不是很糟糕，但是我们必须创建自己的系统来跟踪这些并发操作的结果。 
如果我们必须跟踪三个以上的异步任务怎么办？ 肯定有一个更好的方式！   

### The First Standardized Way to Harness Async”

与依赖回调约定相关的缺陷和低效率常常促使开发人员寻找其他解决方案。 
当然一些问题，和这种异步处理方法的常见的样板文件，可以解决和打包成一个更标准化的API。 
Promises规范定义了一个实现这个目标的API。

Promises已经在JavaScript前面公开讨论了一段时间。 
Promise-like提案的第一个实例（我可以找到）由Kris Kowal创建。 
约到2011年年中，它描述了“可能的Promise”.4引言的几行提供了一个很好的一瞥Promise的力量：
  “异步promise宽松地表示函数的最终结果。 结果可以是“满足”具有值或“拒绝”具有原因，分别对应于同步返回值和抛出异常。"

这个松散的提议部分用于形成Promises / A +规范。
这个规范有很多实现，其中许多可以在各种JavaScript库中看到，比如bluebird， Q 和 rsvp.js 。
但也许更重要的实现出现在ECMA-262第6版规范中。
从第3章中可以看出，ECMA-262标准定义了JavaScript语言规范。 
本规范的第6版于2015年正式完成。
在撰写本文时，本标准中定义的Promise对象可以在所有现代浏览器中使用，
Internet Explorer除外。 幸运的是，许多轻量级的polyfill可以填补这个空白。

### Using Promises to Simplify Async Operations / 使用Promise简化异步操作

那么什么是 Promises？ 您可以阅读ECMAScript 2015或A +规范，但是像大多数正式语言规范一样，这些都是干燥和困惑的。 
首先，在ECMAScript的上下文中，一个 Promises 是用于管理异步操作结果的对象。 
它在由传统的基于约定的回调留下的复杂应用程序中平滑所有粗糙边缘。

现在 Promise 的总体目标是明确的，让我们进一步看看这个概念。 
开始探索 Promise 的第一个逻辑的地方是通过Domenic Denicola的“States and Fates”文章）。
从这份文件，我们学习 Promise 有三个状态：

    1. Pending: 在相关操作结束之前的初始状态。
    2. Fulfilled: 由promise监视的关联操作已完成，没有错误。
    3. Rejected: 相关操作已达到错误条件。
    
Domenic继续定义一个术语，将”Fulfilled“和”Rejected“状态分组：settled。 
所以，一个承诺最初是未决的，然后一旦它结束就结算。

本文档中还定义了两个不同的”命运“：

1. Resolved：当promise被执行或拒绝时，或者当它被重定向以遵循另一个promise时，promise被解决。 
在将异步promise返回操作链接在一起时可以看到后一条件的示例。 （更多关于那个。）

2. Unresolved：如您所料，这意味着相关的承诺尚未解决。

如果你能理解这些概念，你就非常接近掌握 Promise，你会发现使用A +和ECMA-262规范中定义的API更容易。

### The Anatomy of a Promise / 一个承诺的解剖

JavaScript promise是通过构造一个符合A+的Promise对象的新实例来创建的，比如ECMAScript 2015规范中详细描述的一个。 
Promise构造函数接受一个参数：一个函数。 
这个函数本身有两个参数，它们都是给出promise一个解决的“命运”的函数（如前面部分所述）。 
这两个函数参数中的第一个是“fulfilled”函数。 当相关联的异步操作成功完成时，将调用此方法。 
当调用“fulfilled”函数时，应传递与完成任务相关的值。 
例如，如果Promise用于监视AJAX请求，则一旦请求成功完成，服务器响应可以被传递到该“fulfilled”函数。 
当一个满足的函数被调用时，promise假设一个“fulfilled”的状态，如前所述。

传递给Promise构造函数的函数参数的第二个参数是一个”reject“函数。 
这应该在promissory任务由于某种原因失败时被调用，并且描述失败的原因应该被传递到这个被拒绝的函数中。 
通常，这将是一个Error对象。 
如果在Promise构造函数中抛出异常，这将自动导致使用抛出的Error作为参数传递给“reject”函数。 
回到AJAX请求示例，如果请求失败，应该调用“reject”函数，传递结果的字符串描述，或者HTTP状态代码。 
当调用拒绝函数时，promise假定为“被拒绝”状态，在前面给出的许诺状态列表的第3号中描述。

当一个函数返回一个Promise时，调用者可以通过几种不同的方式”观察“结果。
处理promissory返回值的最常见方法是在promise实例上调用then方法。
此方法需要两个参数，两个函数。如果满足相关联的承诺，则调用第一个功能参数。
如预期，如果一个值与此实现相关联（例如对于AJAX请求的服务器响应），则将其传递给此第一个函数。
如果promise以某种方式失败，则调用第二个函数参数。
如果您只对实现感兴趣，则可以省略第二个参数（虽然假设您的Promise将成功，通常是不安全的）。
此外，您可以指定值为null或undefined，或任何不被认为是“可调用”的值作为第一个参数，如果您只对promise拒绝感兴趣。
另一个替代方法，也让你专注于错误情况，是在返回的Promise上调用catch方法。
这个catch方法接受一个参数：当/如果相关联的promise错误时被调用的函数。

ECMAScript 2015 Promise对象包括几个其他有用的方法，但是更实用的非实例方法之一是all()，它允许您一次监视许多个promise。 
如果所有受监视的promise都被满足，all方法返回一个满足的新promise，或者一旦被监视的promise中的一个被拒绝就拒绝。 
Promise.race()方法非常类似于Promise.all()，区别在于当满足第一个受监视的Promise时，race()返回的Promise会立即满足。 
它不会等待所有受监视的Promise实例都满足。 
race()的一个用途也可以应用于AJAX请求。 
假设您触发了将相同数据持久保存到多个冗余端点的AJAX请求。 
所有这一点很重要的是一个请求的成功，在这种情况下，Promise.race()更适合，并且比等待所有请求完成Promise.all()更有效率。

    function askForEmail() {
        return new Promise(function (fullfill, reject) {
            promptForText('Enter email:', function (result) {
                if(result.cancel){
                    reject(new Error('User refused to supply email.'))
                }else {
                    fullfill(result.text)
                }
            })
        })
    }
    askForEmail().then(function fulfilled(emailAddress){
        
    },function rejected(error) {
        console.error(error)
    })

在上面的示例中，我们的代码被重写为支持promise，它的声明性和直接性更强。 
askForEmail()函数返回一个Promise，它描述“询问用户的电子邮件”任务的结果。 
调用此函数时，我们可以直观地处理提供的电子邮件地址和不遵循编码标准而未提供电子邮件的实例。 
注意，我们仍然假设promptForText()函数API没有改变，但是如果这个函数也返回一个promise，代码可以进一步简化：

    function askForEmail() {
        return promptForText('Enter email:')
    }
    askForEmail().then(
        function fulfilled(emialAddress) {
            
        },
        function rejected(error) {
            console.log('Unable to get email:' + error.message)
        }
    )

如果promptForText()返回Promise，则如果提供了地址，则它应将用户输入的电子邮件地址传递给完成的函数，
如果用户关闭对话框而不输入电子邮件地址，则会向被拒绝的函数传递描述性错误。 这些实现细节在上面不可见，
但是基于Promise规范，这是我们所期望的。

callbacks部分中的另一个示例演示了XMLHttpRequest提供的onload和onerror回调。 
回顾一下，当请求完成（不管服务器响应状态代码）时调用onload，
如果请求由于某种原因（例如由于CORS或其他网络问题）无法完成，则调用onerror。 
正如第9章提到的，Fetch API带来了XMLHttpRequest的替换，它利用了Promise具体来表示AJAX请求的结果。 
我将深入一个更复杂的例子，使用fetch很快，但首先，让我们从callbacks部分的XMLHttpRequest调用编写一个包装，
提供一个更优雅的接口使用promises：











































































































































































































































































































































       