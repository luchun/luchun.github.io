---
layout: post
title: 测试HTML5 Notification
---

### 旧的实现方法

    setInterval(function () {
        var title = document.title;
        if (newMessage) {
            if(/新/.test(title) == false) {
                document.title = '【你有新短消息】';
            } else {
                document.title = '【            】'
            }
        } else {
            document.title = titleInit;
        }
    }, 500);
    
    
### 新的实现方法

     //语法一 Notification.requestPermission().then(function(permission) { ... });
        //语法二 Notification.requestPermission(callback);
        Notification.requestPermission().then(function (result) {
            //result 表示用户是否允许通知 granted (允许) denied(拒绝) default(默认)
            console.log(result);
            //也可以直接查看 Notification.permission 这是一个静态属性，值就是上边的granted denied default
            //所以调用Notification.permission 和 result 效果一样
            console.log(Notification.permission);

            // Notification 作为构造函数   new Notification(title, options)
            var notification = new Notification('一条新的消息',{
                dir: 'rtl',// ltr rtl auto(default) 表示内容的水平书写顺序
                body: '消息的主题内容', //消息的主题内容，字符串
                tag:'a',// 包含body的标签类型
                icon:'avatar.png' // 左边的图标
            });
            // 关闭使用  Notification.close() ,默认5s会自动关闭

            // 点击触发的事件
            notification.onclick = function () {
                window.location.href = 'http://www.baidu.com'
            };

            //关闭事件
            notification.onclose = function () {
                alert('您关闭的消息');
                clearInterval(changeTitle);
                document.title = titleInit;
            }

        })
    
### 测试地址

[netlify](http://lecturer-opposites-87078.netlify.com/)