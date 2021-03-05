---
layout: post
title: 用checkbox实现单选
---
用checkbox实现单选
<!-- more -->
```js

    $('input').on('change', function() {
        $('input[type="checkbox"]').not(this).prop('checked', false);
        console.log($(this).val())
    });

```

根本不需要判断自己是否有没有选中啥的