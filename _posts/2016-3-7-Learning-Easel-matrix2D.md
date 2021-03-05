---
layout: post
title: 学习createjs中的Matrix2D
---

借鉴了[这篇文章](http://kudox.jp/java-script/createjs-easeljs-matrix2d)，理解下Createjs中的Matrix2D类。
<!-- more -->

### 应用Matrix2D实例的生成和对象

要应用转换矩阵到一个对象 ，使用decompose()。参数为指定作用的对象，它会将转换矩阵施加到一个对象上。下边的李子中，它将四边形斜拉并便宜到画布中间。

    _shape = new createjs.Shape();
    _shape.graphics.beginFill("#0066cc").drawRect(-50, -50, 100, 100).endFill();
    _stage.addChild(_shape);
    /*
    * a c tx
    * b d ty
    * 0 0 1
    */
    var a = 1;
    var b = 0;
    var c = -1;
    var d = 1;
    var tx = _canvas.width >> 1;
    var ty = _canvas.height >> 1;
    var matrix = new createjs.Matrix2D(a, b, c, d, tx, ty);
    matrix.decompose(_shape);
    
根据我的上一篇学习记载，matrix的默认值为`(1,0,0,1,0,0)；`而`b,c`变化表示拉伸 `(matrix(1, tan(0y), tan(0x), 1, 0, 0))`

而tan(-45°)等于-1，可以c为-1表示x坐标拉伸为45度。

js中的左移位操作符(>>1)可以用来求半值，效果类似于 `Math.floor(num/2);`原因是位操作符是在二进制上进行了，左移了一位既是抛弃个位，将剩下的值除2。这里tx,ty约为宽高的一半

根据上一篇学习记录，matrix的e,f值表示偏移量，加上中心点是中央，可以知道这会将元素移动到画布中央。


[<img src="{{ site.baseurl }}/images/cjz1.jpg" alt="矩阵1"/>]({{ site.baseurl }}/)


### 移动坐标 translate()

DisplayObject 可以通过getMatrix 获得该对象当前的变换矩阵。
translate()的第一，二哥参数指定x,y的移动量，结果是实例的矩阵值改变


    _shape = new createjs.Shape();
    _shape.graphics.beginFill("#0066cc").drawRect(-50, -50, 100, 100).endFill();
    _stage.addChild(_shape);
    var matrix = _shape.getMatrix();
    console.log(matrix.toString()); // [Matrix2D (a=1 b=0 c=0 d=1 tx=0 ty=0)]
    matrix.translate(_canvas.width >> 1, _canvas.height >> 1);
    console.log(matrix.toString()); // [Matrix2D (a=1 b=0 c=0 d=1 tx=320 ty=180)]
    matrix.decompose(_shape);

### 旋转 rotate()

指定ratate()参数为要旋转的弧度值，需要注意的是旋转围绕对象的基准点进行，在下面的例子，对象45°旋转和放置在画布的中心，顺序不同会导致不一样的效果。

    _shape = new createjs.Shape();
    _shape.graphics.beginFill("#0066cc").drawRect(-50, -50, 100, 100).endFill();
    _stage.addChild(_shape);
    var matrix = _shape.getMatrix();
    matrix.rotate(45 * createjs.Matrix2D.DEG_TO_RAD);
    matrix.translate(_canvas.width >> 1, _canvas.height >> 1);
    matrix.decompose(_shape);

### 扩张/收缩 scale()

第一个参数为x方向的收缩率，第二个参数为y轴方向的收缩率

    _shape = new createjs.Shape();
    _shape.graphics.beginFill("#0066cc").drawRect(-50, -50, 100, 100).endFill();
    _stage.addChild(_shape);
    var matrix = _shape.getMatrix();
    matrix.rotate(45 * createjs.Matrix2D.DEG_TO_RAD);
    matrix.scale(2, 0.5);
    matrix.translate(_canvas.width >> 1, _canvas.height >> 1);
    matrix.decompose(_shape);


### 由变换矩阵到当前变换矩阵参数相乘 appendMatrix()

其实就是叠加多个效果后作用到某一元素上,可以分解matrix到多个容易理解的小矩阵中。类似的还有prependMatrix(),是先后的区别

    _shape = new createjs.Shape();
    _shape.graphics.beginFill("#0066cc").drawRect(-50, -50, 100, 100).endFill();
    _stage.addChild(_shape);
    var angle = 45 * createjs.Matrix2D.DEG_TO_RAD;
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var rotateMatrix = new createjs.Matrix2D(cos, sin, -sin, cos, 0, 0);
    var scaleX = 2;
    var scaleY = 0.5;
    var scaleMatrix = new createjs.Matrix2D(scaleX, 0, 0, scaleY, 0, 0);
    var centerX = _canvas.width >> 1;
    var centerY = _canvas.height >> 1;
    var translateMatrix = new createjs.Matrix2D(1, 0, 0, 1, centerX, centerY);
    var matrix = _shape.getMatrix();
    matrix.appendMatrix(translateMatrix);
    matrix.appendMatrix(scaleMatrix);
    matrix.appendMatrix(rotateMatrix);
    matrix.decompose(_shape);


### 转换成逆矩阵 invert()

invert()它转换当前转换矩阵的逆矩阵。逆矩阵，即成为和单位矩阵相乘到目标矩阵的矩阵，可以被认为是一个变换矩阵用于返回到原来的变形。

    _shape = new createjs.Shape();
    _shape.graphics.beginFill("#0066cc").drawRect(-50, -50, 100, 100).endFill();
    _stage.addChild(_shape);
    var angle = 45 * createjs.Matrix2D.DEG_TO_RAD;
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var rotateMatrix = new createjs.Matrix2D(cos, sin, -sin, cos, 0, 0);
    var scaleX = 2;
    var scaleY = 0.5;
    var scaleMatrix = new createjs.Matrix2D(scaleX, 0, 0, scaleY, 0, 0);
    var centerX = _canvas.width >> 1;
    var centerY = _canvas.height >> 1;
    var translateMatrix = new createjs.Matrix2D(1, 0, 0, 1, centerX, centerY);
    var invertScaleMatrix = scaleMatrix.clone().invert();
    console.log(scaleMatrix.toString()); // ：[Matrix2D (a=2 b=0 c=0 d=0.5 tx=0 ty=0)]
    console.log(invertScaleMatrix.toString()); // ：[Matrix2D (a=0.5 b=0 c=0 d=2 tx=0 ty=0)]
    var matrix = _shape.getMatrix();
    matrix.prependMatrix(rotateMatrix);
    matrix.prependMatrix(scaleMatrix);
    matrix.prependMatrix(invertScaleMatrix);
    matrix.prependMatrix(translateMatrix);
    matrix.decompose(_shape);






























