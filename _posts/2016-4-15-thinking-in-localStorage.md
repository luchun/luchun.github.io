---
layout: post
title: 关于 LocalStorage 的一些思考
---
关于 LocalStorage 的一些思考
<!-- more -->

今天又看了一下 LocalStorage ，LocalStorage 是 HTML5 提供的客户端存储数据的[新方法](http://www.w3school.com.cn/html5/html_5_webstorage.asp)。它主要有五个方法：
*   `LocalStorage.clear()` 不接收参数，无返回值。作用是将所有保存的数据清理。
*   `LocalStorage.getItem(keyName)` 接收一个键名 返回键名的值 ，键和值都是String，确切的说，都是 [DOMString](https://developer.mozilla.org/en-US/docs/Web/API/DOMString)
*   `LocalStorage.key(key)` 接收一个 integer  型参数，返回LocalStorage中第 n(key)条数据的值。LocalStorage中数据的排序是按被添加的顺序排列的。这个方法并不可靠。
*   `LocalStorage.removeItem(keyName);` 接收一个键名，无返回值。作用是将该条数据从LocalStorage中移除。
*   `LocalStorage.setItem(keyName, keyValue);`接收键名和键值，无返回值。将数据保存到本地LocalStorage。

LocalStorage内部实现我并不了解，假设它的setItem内部会调用一个方法，将数据保存到本地中。
我要说的是它的一个有趣的事情：

     LocalStorage.keyName = keyValue
     
我发现除了setItem以外，还可以直接给LocalStorage对象添加属性，一样可以保存到LocalStorage,之后用LocalStorage.getItem(keyName)一样可以取到这条数据。
我说假设setItem内部会有方法将键值对存储到本地，或者就是单纯的为LocalStorage添加属性时，它一样可以将新添加的属性保存到本地。

那么，我们的JavaScript有什么办法可以在为对象新加属性的时候，触发一个事件吗？是没有的。

### setter / getter

[setter](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/set) / [get](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/get)

JavaScript中有 getter 和 setter 可以用来修改对象属性的读写操作。
    
    var o = {
      storage : {
        somePorperty:'123'
        },
      setItem:function(key, val){
        this.storage[key] = val
        },
      getItem:function(key){
        return this.storage[key]
        }
    }
    Object.defineProperty(o, 'somePorperty',{
      get: function() {return o.storage.somePorperty},
      set: function(newValue) { return o.storage.somePorperty = newValue},
      enumerable: true,
      configurable: true
    })
    
    o.getItem('somePorperty')
     >> "123"
    o.somePorperty
     >> "123"
    o.setItem('somePorperty', 234)
     >> undefined
    o.somePorperty
     >> 234

Object.defineProperty就是用来为对象定义属性的操作方法，不过用它能否为自定义对象实现类似LocalStorage的方法呢，答案是不能的：`Object.defineProperty`必须明确指出属性名作为它的第二个参数，对于在对象上后天的属性则无能为力了。

### Proxy

在我查询了很多内容之后，终于发现了解决方案。 那就是ES6 的 [Proxy](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

Proxy 对象被用来定义基本操作（如查找，分配，枚举函数调用等），以及自定义行为。

简单来说，使用了Proxy之后，添加属性，更改属性等等基础操作，都是可以被截获并修改默认操作的。下边就是我实现的一个类似LocalStorage的setItem,getItem的方法。

        let porpertiesListner = {
        set: function (obj, prop, value) {
            if (prop !== 'setItem' && prop !== 'storage' && prop !== 'getItem') {
                obj.setItem(prop, value)
            }
        },
        get: function (obj, prop) {
            if (prop == 'setItem' || prop == 'getItem'|| prop == 'storage') {
                return obj[prop]
            }else {
                return obj.storage[prop]
            }
        }
        }

        let person = new Proxy({
            storage: {},
            setItem: function (prop, value) {
                this.storage[prop] = value;
            },
            getItem: function (prop) {
                return this.storage[prop];
            }
        }, porpertiesListner);


        console.log('方法测试')
        person.test1 = '123'
        console.log('person.test1 ' + person.test1)
        console.log("person.getItem('test1') " + person.getItem('test1'))

        person.setItem('test2','234')
        console.log('person.test2 ' + person.test2)
        console.log("person.getItem('test2') " + person.getItem('test2'))
        
我可以预计，Proxy在今后的开发中可以大放异彩，因为我们对对象可以控制的更多了。

### Proxy的支持情况

由于ES5的限制，polyfill也无法实现Proxy。所以[Babel](http://babeljs.io/docs/learn-es2015/#proxies)是不支持Proxy的。
但是呢最新款的浏览器已经支持了，具体可以[查看这里](https://kangax.github.io/compat-table/es6/),包括Edge ,Firefox45, Chrome 50 都已经支持了。