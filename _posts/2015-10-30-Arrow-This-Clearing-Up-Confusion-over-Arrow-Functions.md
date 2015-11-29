---
layout: post
title: Arrow This 理清箭头函数
---
## Arrow This 理清箭头函数

原文 [Arrow This: Clearing Up Confusion over Arrow Functions](http://blog.getify.com/arrow-this)

ES6中一个最值得称赞的功能是新的箭头函数```=>```即函数表达式(拉姆达)的简写。你很难发现哪个关于ES6的博客文章或者会议讨论或者书籍会不讨论```=>``` 是新的功能。

箭头函数语法甚至充斥在标准和规范文档中，好像它一直在那里而我们只是刚发现它

关注我的人知道我并不是箭头函数的粉丝，由于[一系列原因](https://twitter.com/search?q=arrow%20from%3Agetify&src=typd),不过别担心，本文并不是讨论我为什么不喜欢它，如果你对这个话题感兴趣，请看[第二章：箭头函数](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#arrow-functions) 来自我的书 [你不了解的JS：ES6 & Beyond](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/README.md#you-dont-know-js-es6--beyond)

这里我要理清一些混乱关于箭头函数中的 this 和 argument 等等.其实，我已经快要讲不清楚这个话题，我想清楚记录。例如，这里有我[初次尝试解释它](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch2.md#lexical-this) 在 你不知道的JS系列中.

### 关键字与否？ (Lexical Or Not?)

这是我和很多的人，描述箭头函数中this的行为：关键字 this

```js
    function foo(){
        setTimeout(()=> {
            console.log('id:', this.id)
        },100);
    }
    
    foo.call({id:42});
    //id:42

```
箭头函数在这里将它的this绑定到父函数foo()的this上。如果内部函数有一个常见的function(声明或者表达式)，它的this将会受到setTimeout的控制。如果你对this-绑定的规则感到困惑，请查看[第二章：判断this](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch2.md#determining-this)在我的书[你不知道的JS：this&对象原型](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)

### 关键字声明 this （Lexical Variable this）
一个常见的观察this的行为的方式是

```js
    function foo(){
        var self = this; 
        setTimeout(()=> {
            console.log('id:', self.id)
        },100);
    }
    
    foo.call({id:42});
    //id:42

```

提示：变量名self是一个绝对灾难性，误导性的名字。它暗示this属于函数自己，但几乎永远做不到。var that = this是一个同样无助的声明，尤其是当有多个作用域存在时（that1,that2...），如果你想起一个好名字，使用var context = this，因为这才是this的真实所在：一个动态上下文。

在这个代码片段中，你看到我们没有在使内部函数中使用this,代替性的，我们回退使用了一个更可预测的机制：语法变量。我们声明了一个变量self在外部函数中，并且在内部函数中引用了它。

这样完整的消除了在内部函数中的this-绑定的影响规则，代替为依靠语法作用空间的规则，或者更进一步：闭包。

结果显示了和=>箭头函数一样的结果，换句话说，（不精准）这里的含义是=>箭头函数中语法变量/闭包行为 与 ‘lexical this’行为一致。
但是，这并不精准。

###箭头绑定 this (Arrow-bound this)

另一种观察说明=>箭头函数中this行为是将内部函数进行硬绑定：

```js
    function foo(){
        setTimeout(function(){console.log('id:',this.id);
        }.bind(this),100)
    }
    
    foo.call({id:42});
    //id:42

```

如你所见同.bind(this),内部函数这里硬绑定到了外部函数的this上，意味着无论setTimeout怎么调用给它的函数，那个函数始终使用foo()使用的this.

是的，这个版本与前两个片段的行为一致。所以这说明神门？大多数人假设这就是=>箭头函数的真实行为。

恩...并不正确

###Already Lexical
我对我不精准的解释感到尴尬，和他人的宽容解释它。在过去的一段时间里，TC39制定者 Dave Herman 向我小心并准确的解释了它，但我怀疑我并没有完整额消化他的解释的含义。

Dave对我说，实质上，关键字(lexical)this或许是麻烦的，因为this已经是关键字(lexical)

他继续说“=>改变的不是创建this关键字，更多的是不绑定this给它('not bind a this in it at all')”

我当时没有跟上他的思路，但是我现在明白了这一点。

普通的函数声明了他自己的this,就像前边的规则，=>箭头函数实际上并没有this

等等...这怎么可能，我完全可以在一个箭头函数内使用this啊。你当然可以使用，既然箭头函数没有自己的this,当你使用this时，普通的词法作用域起了作用，即引用了离他最近的作用域定义this.

考虑以下代码

```js
    function foo(){
        return ()=>{
            return ()=>{
                return ()=>{
                    console.log('id:',this.id)
                };
            };
        };
    }
    
    foo.call({id:42})()()();
    //id:42

```

在这个代码片段中，你觉得有多少this-绑定，大概有四个，每个函数一个。

更准确的说：只有一个，在foo()函数内

依次嵌套的=>函数没有声明自己的this,所以this.id引用了上层作用域直到获取到即foo(),第一个明确绑定了this的位置。

这也是普通其他语法变量使用的方式！

换句话说，就像Dave说的，this 是一个关键字 ，总是一个关键字 。=>箭头函数不绑定this变量，所以作用域会继续搜寻它就像对待普通的做法。

###不只是this (Not Just this)

如果你不准确的解释this在=>箭头函数中的行为时一个潜在的风险是你最终会这么想，‘箭头函数只是function的语法糖...’，他们显然不是，就不是var self=this或者bind(this)的语法糖。

这些不精准的解释是一个经典例子关于'获得错误原因的准确答案'。就像高中代数课上，你解出正确答案老师却给你判了错误因为你使用了错误的技术。你怎么得到问题答案。

更进一步，准确的解释--=>不绑定自己的this,允许语法作用域解决方案覆盖--同样解释了=>箭头函数中的其他重要因素：它们不仅改变了this在内部函数中的行为.事实上，=>箭头函数不绑定this,arguments,super(ES6),以及new.target(ES6)

在这全部四个因素中，=>箭头函数不绑定他们的局部变量，所以任何引用都会改变他们作用域到另一个外部作用域

考虑:

```js
    function foo(){
       setTimeout( () => {
        console.log('arguments:',arguments)
       },100)
    }
    
    foo（2，4，6，8）
    //arguments:[2,4,6,8]

```

你看到了吗？

在这个片段中，arguments不绑定到=>,所以它使用foo()的arguments代替。super和new.target也会有同样的行为。

### 为何 this 有问题？
update: 在社区中，很多人问为何有这种事情，关于this的行为却忽视理论与现实。

你知道=>箭头函数不能通过bind来硬绑定他们的this吗？

```js
    function foo(){
        return ()=>{
            console.log('id:',this.id)
        }
    }
    
    var arrowfn = foo.call({id:42});
    
    setTimeout(arrowfn.bind({id:100}), 100);
    
    //id: 42
```

那么为何.bind({...})没能导致输出id:100呢？

如果你没能正确的理解=>箭头函数中的this,那么，你会尝试如此解释它，'this是不变的'，错

这个例子，正确的答案是因为=>没有this,理所当然的，.bind(obj)不能继续操作！相似的，=>箭头不能被new调用，因为没有this,所以new不能绑定任何东西。
