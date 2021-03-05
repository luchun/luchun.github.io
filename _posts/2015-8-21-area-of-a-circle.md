---
layout: post
title: Ruby数值类基础题
---
这是一道简单的入门级题目，计算给出半径的圆面积，我基础不好，所以在类型判断上遇到了一点问题。
<!-- more -->

##Ruby数值类基础题

原题地址在 [codewars](http://www.codewars.com/kata/537baa6f8f4b300b5900106c/train/ruby)


因为需要对给入的半径值进行判断，但是Ruby中并没有typeof 这种操作符。
我查了一下，Ruby中可用的方法有以下几个
instance_of?  只能判断确切的类，而不是超类，比如 数字5， 

```
5.instance_of? Fixnum #true
5.instance_of? Numeric #false
```

kind_of? 和 is_a? 是同义的，可以判断是否来自某个类的子类

```
5.kind_of? Numeric #true

```

借助这个方法，我写出的方法如下，其中遇到了一个问题是PI，在Ruby中不能像js中使用Math.PI那样获取类中的常量，而是使用::

```
def circle_area r
  if !(r.kind_of? Numeric) || (r<=0)
     false
  else
    (Math::PI * r**2).round(2)
end
end
```

最优的解决方法如下

```

def circle_area r
  r.to_f > 0 ? (Math::PI * r * r).round(2) : false
end

```


