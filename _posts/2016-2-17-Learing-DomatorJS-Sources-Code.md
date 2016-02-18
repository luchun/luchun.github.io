---
layout: post
title: Domator.js 源代码学习
---

通过学习Domator.js源代码以及打包方法，学习到了一些npm知识和ES2016方法，以及一些语法

### Domator

简洁的DOM元素创建方法，使用Jade类似的语法。并可以在服务器端运行，[Github主页](https://github.com/mjlescano/domator)

首先是它的 `package.json` 

    "scripts": {
        "test": "mocha --require babel-core/register",
        "compile": "babel -d . src && browserify src/domator.js -t babelify -o dist/domator.js && browserify src/domator.js -t babelify | uglifyjs -c > dist/domator.min.js",
        "prepublish": "npm run compile"
    },

根据[npm文档](https://docs.npmjs.com/misc/scripts)中的介绍
npm支持package.json中的"script"属性，包括以下脚本

* `prepublish` 在package发布前运行.(同样在本地执行 ** npm install ** 不带参数 时也会执行)
* `publish,postpublish` 在package发布后执行
* `preinstall` 在package被安装前执行
* `install,postinstall` 在package安装后执行
* `preuninstall, uninstall` 在package被卸载前执行
* `postuninstall` 在package被卸载后执行
* `preversion, version` 在更新版本号前执行
* `postversion` 在更新版本号后执行
* `pretest, test, posttest` 会被 ** npm test ** 命令执行
* `prestop, stop, poststop` 会被 ** npm stop ** 命令执行
* `prestart, start, poststart` 会被 ** npm start ** 命令执行
* `prerestart, restart, postrestart` 会被 ** npm restart **命令执行，主义 如果没有提供`resart`脚本，**npm restart**会执行 stop 和 start 命令

#### COMMON USES

如果你想让你的包在使用前进行一些操作，并且不依赖与操作系统或目标系统的体系结构，使用**prepublish** 脚本，它可以包括如下的任务：

* 将CoffeeScript 源代码转译成Javascript
* 创建Javascript 源代码的压缩版本
* 获取你的代码将会使用到的远程资源

建议使用 *prepublish*来做这些事情是因为它可以一次性执行，在一个位置，这可以减少复杂度和变量。附加的，这意味着：

* 你可以依赖 **coffee-script** 作为 **devDependency** ，而你的用户则不必必须安装它。
* 你不需要包含你的包的压缩版本，从而减小体积
* 你不需要你用户的机器上拥有 **curl** 或 **wget** 或者之类的系统工具


可以知道，作者这里加入了一个自己的compile 编译命令，并且在用户安装时会执行它。

## Complite 命令

babel.js的[文档](https://babeljs.io/docs/usage/cli/) 中

### Compile Directories

将完整的 `src` 路径 编译 并输出到 `lib` 路径下，需要使用 `--out-dir` 或者 `-d`

    $ babel src --out-dir lib
    
所以这里的第一个命令 `babel -d . src` 是将 src文件夹编译到当前目录

[browserify](https://github.com/substack/node-browserify#usage) 是一个打包工具，可以打包文件的所有依赖

`--transform, -t ` 对顶级文件使用一个transform 模块

`--outfile, -o` 写入一个打包文件，如果没有指定，则输出到输出流

` --command, -c ` 对顶级文件使用一个transform 命令
    
[babelify](https://github.com/babel/babelify) 是供 browserify transform 使用的模块，由于Babel 6.0.0开始不再默认包含插件，为了更好的使用 babelify ，你必须包含一些 presets 或者 plugins，所以需要在.babelrc文件中写入  "presets": ["es2015"] 

所以这里的第二个命令 ` browserify src/domator.js -t babelify -o dist/domator.js ` 就可以理解为将src下的domator.js先进行babel编译再输出到dist下的domator.js


第三个命令 ` browserify src/domator.js -t babelify | uglifyjs -c > dist/domator.min.js ` 就可以理解为将src下的domator.js先进行babel编译再进行压缩最后输出到dist下的domator.min.js


## 代码部分

    import isArray from 'is-array';
    import forEach from 'array-foreach';
    import deepmerge from 'deepmerge';
    
先是引入三个模块 ，看名字就可以猜出来，分别是判断是否为数组，forEach遍历方法，和深度merge方法

    const regexes = {
        tag: /^([a-z0-9\-]+)/,
        id: /^#([a-z0-9\-]+)/,
        className: /^\.([a-z0-9\-]+)/,
        attr:/^\[([a-z\-0-9]+)(?:="([^"]+)")?\]/,
        text:/^\s(.+)/
    }

接着是一个常量 定义了一些正则 可以通过 [REGEXPER](http://regexper.com/) 这个网站来辅助理解 
* tag 标签名 可以包括 `a-z , 0-9 ,-` 中的一个或多个 ，我理解中的tag应该只包括a-z ，除非是自定义的tag
* id  id名 以#开头 之后可以包括`a-z , 0-9 ,-` 中的一个或多个,这符合id的要求
* className class名 以. 开头 之后可以包括`a-z , 0-9 ,-` 中的一个或多个,这符合class的要求
* attr 包含在[]中 标签名可以是 `a-z0-9\-` ，如果包含 '=' 则等号后边的属性值在" " 冒号中且属性值不能包含"
* text 以空格开头之后包含任何字符


    let doc
    
接下来定义了一个叫 `doc`的变量，但没有赋值

    export default function domator (...args) {
        if (!doc) {
            throw new Error('Need to call domator.setDocument(document) first.')
        }
    
        return render(parse(args))
    }   


根据[MDN export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)的介绍，一个模块可以有多个export,但只能有一个 default export 所以这里表示该模块默认导出一个domator函数.

es6新增了一个结构赋值 `...`代表余下的，比如 `let [head, ...tail] = [1, 2, 3, 4];` head值为1，而tail 值为[2,3,4];当`let [head, ...tail] = [1, 2, 3, 4， 5];`时 head 值为1 ，tail值为[2,3,4,5]。这个功能给予es6中赋值以很大的灵活性。在这里...args表示不管有多少参数，都把它arg作为参数传给内部的parse函数。虽然使用es5中的arguments也可以做到，但并不直观。

在domator函数内部，先判断doc是否有值，没有的话报错；有的话则先调用parse(arg)再调用render()。


    domator.setDocument = function setDocument (newDoc) {
        doc = newDoc
        return domator
    }

`domator.setDocument` 是一个给doc变量赋值的函数

    domator.toString = function toString (node) {
        const div = doc.createElement('div')
        if ('outerHTML' in div) return node.outerHTML
        div.appendChild(node.cloneNode(true))
        return div.innerHTML
    }

`domator.toString` 该方法其实是先验证浏览器是否支持'outerHTML'这个方法，如果存在的话就返回节点的outerHTML。由于在部分老款浏览器中不支持该属性，就将节点插入到div中再返回div的innerHTML。而单纯的appendChild会先移除原有的节点再将它插入新位置，所以要先克隆再插入。

    domator.create = function create (name = '', attrs = {}) {
        name = parseName(name)
    
        ;['class', 'className'].forEach(key => {
            if (typeof name[key] === 'string') name[key] = [name[key]]
            if (typeof attrs[key] === 'string') attrs[key] = [attrs[key]]
        })
    
        attrs = deepmerge(name, attrs)
    
        const el = doc.createElement(attrs.tag || 'div')
        delete attrs.tag
    
        if (attrs.text) {
            el.textContent = attrs.text
            delete attrs.text
        }
    
        setAttributes(el, attrs)
    
        return el
    }
    
`domator.create(element, attributes)` tag名默认为空字符串，属性名默认为空对象

由于该方法比较灵活 可以这么用 `var el = d('div', {'data-custom': 'the-custom-value',text: 'Hello!',className: 'the-class', id: 'the-id'})`

也可以这么用  `var el = d('#the-id.the-class[data-custom="the-custom-value"] Hello!')`

灵活性很高，所以要第一步先解析`name` 这个参数。返回一个对象，这个对象类似于后边的attrs参数，同时由于可以用'class'也可以用'className'，而class是可以同时有多个值的，在这个forEach里，将name对象和attrs对象的'class'属性、'className'属性变更为数组，方便merge时是合并而不是后边的替换前边值。

下一步是合并name 和 attrs 为attrs，在这一步attrs对象中的属性值会替换掉name对象中的属性值 比如id。而class则会合并为数组。

下一步创建el dom元素，如果有tag则为tag,默认为div。
创建后在attrs对象中删除tag属性

接着判断如果有text属性值则给el的textContext赋值并删除该属性

接着将attrs中剩余的属性和值都作为attributes进行设置

最后返回创建好的el

    function setAttributes (el, attrs = {}) {
        attrs['class'] = (attrs['class'] || []).concat(attrs.className).join(' ')
        if (attrs.className) delete attrs.className
        if (!attrs['class']) delete attrs['class']

        for (let prop in attrs) if (attrs.hasOwnProperty(prop)) {
            el.setAttribute(prop, attrs[prop] || prop)
        }

        return el
    }   

`setAttributes(node,attrs)` 这个函数就是循环调用dom的setAttribute()方法，对于没有属性值的属性，也设置为同名属性值，像 autofocus,disabled这种适用。

在设置前先合并class属性和className属性，并删除className属性，如果不存在class属性也进行删除。

最后返回接收到的node节点

    function render (item) {
        if (isArray(item)) {
            if (item.length === 1) return render(item[0])

            let wrapper = doc.createDocumentFragment()

            forEach(item, function (item) {
                let el = render(item)
                wrapper.appendChild(el)
            })

            return wrapper
        }

        if (item.tag) {
            item.el = domator.create(item.tag, item.attrs)
        } else {
            setAttributes(item.el, item.attrs)
        }

        if (item.children) {
            forEach(item.children, function (child) {
               item.el.appendChild(render(child))
            })
        }

        return item.el
    }

render 方法就是将数组创建为节点的，可以当作递归使用。

    function parseName (name) {
        const attrs = {}
        let pending = name

        let m
        do {
            m = null

            if ((m = pending.match(regexes.tag))) {
                attrs.tag = m[1]
            } else if ((m = pending.match(regexes.id))) {
                attrs.id = m[1]
            } else if ((m = pending.match(regexes.className))) {
                if (!attrs.className) attrs.className = []
                attrs.className.push(m[1])
            } else if ((m = pending.match(regexes.attr))) {
                attrs[m[1]] = m[2]
            }

            if (m) pending = pending.slice(m[0].length)
     } while (m)

        if (pending && (m = pending.match(regexes.text))) {
            attrs.text = m[1]
         pending = pending.slice(m[0].length)
        }

        if (pending) {
            throw new Error(`There was an error when parsing element name: "${name}"`)
        }
    
      return attrs
    }
parseName用来解析，主要是依赖前边的正则，循环过滤，并保存到对象中

    function parse (args) {
        const items = []
        let item
        while ((item = parseNext(args))) items.push(item)
        return items
    }
    
parse函数在一开始就用来解析参数，循环调用parseNext


    function parseNext (args) {
        if (!args.length) return null
        var item = {children: []}

        while (true) {
            var val = args.shift()

            if (val instanceof doc.defaultView.Node) {
                item.el = val
            } else if (typeof val === 'string') {
                item.tag = val
            } else if (isArray(val)) {
                let child
                while ((child = parseNext(val))) item.children.push(child)
            } else if (typeof val === 'object') {
                item.attrs = val
            } else {
                throw new Error('Incorrect value.')
            }

            if (!args[0]) break
            if (args[0] instanceof doc.defaultView.Node) break
            if (typeof args[0] === 'string') break
        }

        return item
    }
    
 document.defaultView.Node 的用法我没有理解，我尝试了下 document.createElement('span') instanceof window.Node 返回的也是true
 
    if (typeof window !== 'undefined' && window.document) {
        domator.setDocument(window.document)
        }
        
设定doc

    if (typeof module === 'undefined') {
        if (typeof define === 'function' && define.amd) {
            define([], function () {
                return domator
            })
        } else if (typeof window !== 'undefined') {
            window.domator = domator
        }
    }
    
一点AMD设置

### 总结
    
整体上 就最后doc.defaultView.Node没有理解上来。

 