---
layout: post
title: Vuejs 中的 Mixins 和 Plugins
---

![Vue Logo](https://cdn-images-1.medium.com/max/600/0*DjvLsbt2sqGZxhke.png)

使用 Vuejs 这类库进行开发时，有一种趋势是组件优先的方案。这个库可以将功能和视图行为拆分为组件。
但有时可能需要在多个组件/ Vue 实例之间共享功能。
这就是 mixins 和 plugins 可以提供很多帮助的地方。

## Mixins

![mixins](https://cdn-images-1.medium.com/max/600/0*X4EOKgmh4fKjgAnW.jpg)

术语 “mixins” 的起源可以追溯到20世纪70年代的冰淇淋混合物，不仅给予了 [Cold Stone](http://www.coldstone.com.tw/)灵感，而且还体现了Lisp的面向对象的方法。
显然，这种编程语言包括D，Python和Ruby。
在前端Web开发的梦幻世界中，我们也使用Sass，它以一种使 style 更加有趣的方式使用mixin。

如果您熟悉Java / C＃中的继承，那么您可能会记得只能从一个父类进行经典继承（不包括接口）。
许多面向对象编程语言不允许多重继承。
因此，一些语言用于提供类似行为的一条途径是通过mixins。

Mixins允许您将方法和属性应用于多个类。
这也是一种有利于组合继承的方法，似乎已经成为一种共识。
在迷人的的Vue空间中，我们将讨论组件/ Vue实例，而不是传统的类。

mixin只是一个JavaScript对象，具有要传递的functions，props，data，computed properties。

**情景1：Trevor有一组非常棒的组件，并希望为它们添加一个max-height属性。根据这个 prop 的值，他想设置他的组件的最大高度。**

```vuejs
//mixin.js
export default {
    props:{
       maxHeight:{
          type:Number,
          required:false
       }
    }
    mounted(){
       let maxHeight = this.maxHeight;
       if(maxHeight){
          this.$el.style.maxHeight = maxHeight + 'px';
       }
    }
}
//sweetComponent.vue
import mixin from 'mixin.js';
export default{
   mixins:[mixin]
}
```

现在Trevor把他的 mixin 添加到他的组件，他可以自由地解决其他行为。 即使他从组件中添加另一个 `mounted function` ，两个`mounted function `都将运行。

**情景2：Brock需要一个快速的方式来确定他在页面上有多少组件，但他无法访问Vue开发工具，因为他的网络不授权Chrome插件。**

```vuejs
//debugMixin.js
window.components = [];
Vue.mixin({
   mounted(){
      window.components.push(this);
   }
});
```

现在Brock只需要将components.length输入他的控制台。 顺便说一句，这是创建一个全局mixin的方式。 Vue指南强烈反对，因为它影响每个组件。

**情景3：Jake有几个组件具有重复的功能。 他爱他的一些回文，真的想让他的用户知道他们将标题设置为回文。 由于这不适用于每个组件，他需要对其进行定位。**

```vuejs
//alertPalindromeMixin.js
export default {
    computed:{
        isPalindrome(){
           return /[^A-Za-z0–9]/g.test(this.title);
        }
    },
    watch:{
        isPalindrome(newValue){
          if(newValue){
            alert("Hey! That's a palindrome!");
          }
        }
    }
}
//someComponent.vue
import palindromeAlertMixin from 'palindromeAlertMixin.js'
export default {
    data(){
        return{
            title:''
        }
    },
    mixins:[palindromeAlertMixin]
}
```
现在，Jake的应用程序的用户将知道Jake在回文中的位置。 请注意，在这种情况下有紧耦合。 这取决于您是否可以接受。 
在这种情况下，将该标题包含在mixin中可能会更好。 但是，只要您有不同名称的复杂对象，它就变得越来越模糊。

你可能会发现一些更好的灵感：

*[Vuetify](https://github.com/vuetifyjs/vuetify/blob/7b327221c467f3b806fff2ee34f9056286a3c386/src/util/breakpoint.js)
*[Vue Material](https://github.com/vuematerial/vue-material/blob/master/src/core/components/mdTheme/mixin.js)
*[Element](https://github.com/ElemeFE/element/blob/dev/src/mixins/emitter.js)

## Plugins

![plugins](https://cdn-images-1.medium.com/max/600/0*cGqdFOFuzaDwhkqH.jpg)

插件存在于大量软件中。 值得注意的是，我们喜欢我们的IDE插件。 
与左侧的套接字非常相似，术语“插件”表示提供了一个允许扩展的接口。 
VueJS允许这样的扩展性，官方的插件Vuex和Vue-Router是两个最常用的插件。 
这两个插件使我们能够访问集中式存储，并能够对浏览器位置的更改做出反应。

有这样好的插件存在，看这些可能会使我们自己创建有用的插件看起来很困难。 
这是假的，它不仅可以很容易地创建插件，还可以让您以一种很容易转移到其他项目的有用方式扩展Vue组件。
如果你创造超级甜蜜的东西，你应该考虑与社区分享。

**情景4：John 想在他的应用中使用Lodash，而不会重复导入。他真的喜欢Vuex使用的这个$ store格式。**

```vuejs
//lodashPlugin.js
import _ from 'lodash';
let lodashPlugin = {};
lodashPlugin.install = function (Vue, options) {
    Vue.prototype.$_ = _;
};
//app.js
import Vue from 'vue';
import lodashPlugin from 'lodashPlugin.js';
Vue.use(lodashPlugin);

```
现在，John可以通过使用`this.$_`来自由的从他的组件中调用 Lodash。 
请注意，美元符号是 Vue 中插件的常见约定。 
从技术上讲，您不需要它，但如果另一位开发人员阅读您的代码，使用它将增加可读性。

看看这是多么无痛。 这是非常简单的使用插件，但没关系！ 其他常见用途可能包括使用Axios。

**情景5：Jay真的很喜欢Angular，并有一些他喜欢在他的项目中使用的服务。 自从搬到Vue，他想继续使用它们。**

```vuejs
//ng-app.js
var app = angular.module('myApp', []);
app.service('StringService', function() {
    this.isPalindrome = function (str) {
        return /[^A-Za-z0–9]/g.test(str);
    };
    this.isLengthEven = function (str) {
        return str.split('').length % 2 === 0;
    };
});
```
在这个服务中，让我们复制匿名功能，并使我们的插件。

```vuejs
//stringPlugin.js
export default {
    install:function(Vue, options){
        Vue.prototype.$string = (function(){
            return new function(){
                this.isPalindrome = function (str) {
                    return /[^A-Za-z0–9]/g.test(str);
                };
                this.isLengthEven = function (str) {
                    return str.split('').length % 2 === 0;
                };
            }
       })();
    }
};
```
虽然这似乎是一个快速的方式来复制它，这有点尴尬。 最好遵循以下格式：

```vuejs
export default {
    install:function(Vue, options){
        Vue.prototype.$string = {};
        Vue.prototype.$string.isPalindrome = function (str) {
            return /[^A-Za-z0–9]/g.test(str);
        };
        Vue.prototype.$string.isLengthEven = function (str) {
            return str.split('').length % 2 === 0;
        };
    }
};
```
这就很清洁，我相信社区喜欢更好的格式。

**情景6：Peyton有一些甜蜜的Vue指令，他想与社区分享。 为了做到这一点，他想创建一个插件。**

```vuejs
//sweetDirectivesPlugin.js
export default {
    install:function(Vue, options){
      Vue.directive('inserted',{
          inserted:function(el, binding){
              if(binding){
                 binding.value();
              }
          }
      });
    };
};
```

你可能会找到更好的例子：
*[Vue2-Notify](https://github.com/websmurf/vue2-notify/blob/master/src/install.js)
*[Vue-Charts](https://github.com/haydenbbickerton/vue-charts/blob/master/src/main.js)
*[Animated Vue](https://github.com/radical-dreamers/animated-vue/blob/master/src/index.js)

当然还有 Vue-Router 和 Vuex


### 原文地址
[https://medium.com/@denny.headrick/mixins-and-plugins-in-vuejs-ecee9b37d1bd](https://medium.com/@denny.headrick/mixins-and-plugins-in-vuejs-ecee9b37d1bd)        