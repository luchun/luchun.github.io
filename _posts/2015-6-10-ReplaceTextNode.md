---
layout: post
title: 写一个ReplaceTextNode函数
---
## 2015/2/27 写一个ReplaceTextNode函数

今天遇到一个问题，替换节点中的文字，由于这不是一个简单的节点，它内部实际上包括两个节点，一个是图片节点一个是文字节点。使用innerHTML不行，因为会不小心把img删掉了，所以我写了一个函数，保存下来以后还会用到。


```js

    function replaceTextNode() {
        var node = document.getElementById(arguments[0]),
                textnode = document.createTextNode(arguments[1]);
        for (var i = 0; i < node.childNodes.length; i++) {
            if (node.childNodes[i].nodeType === 3) {
                node.replaceChild(textnode, node.childNodes[i]);
                break;
            }
        }
    }
    
    /* PLACEHOLDER */
    replaceTextNode("party_location", data.location);

```

当然有一定的缺陷，只支持id