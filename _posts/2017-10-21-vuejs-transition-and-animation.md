---
layout: post
title: Vue.js中的 Transition 和 Animation  
---
**Animations & transitions.** 将您的网站或网络应用程序带入生活，吸引用户探索。
动画和过渡是UX和UI设计的组成部分。
但是，他们很容易出错。
在复杂情况下，如处理处理列表。依赖原生JavaScript和CSS的时候，几乎不可能实现出来。
每当我问后台开发人员为什么他们不喜欢这个前台时，他们的反应通常都是“...动画”的一部分。
<!-- more -->

Vue.js这样的框架，将setTimeout函数的猜测工作和笨拙的链从 Transition 中抽出来。
已经有无数的文章概述了基本的使用模式，
但很少有人会告诉你如何在现实世界中一起使用它们。

## Transitions vs. animations: key differences

在开始之前，我想理清一些东西。
术语 Transitions 和 Animations 通常可以互换使用，但在我看来，并不一样：

* `transition` 是 元素样式属性的简单更改，通过一步实现。他们通常通过CSS处理。
* `animation` 是一个更复杂的，通常是多步的，有时连续的外观变化。
动画经常要求JavaScript来取代CSS缺乏逻辑的地方。
它可以是添加一个类并触发动画，或者进行反映到DOM上的复杂状态转换。

当进入Vue的世界时，这是一个重要的区别，因为两者都有非常不同的方法和工具箱。
### 1. Transitions

<iframe height='800' scrolling='no' title='VueJS transition & transition-group demo' src='//codepen.io/lu7965/embed/aLPExP/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/lu7965/pen/aLPExP/'>VueJS transition & transition-group demo</a> by luchun (<a href='https://codepen.io/lu7965'>@lu7965</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

在页面上实现 transition 效果的最简单方法是通过Vue的<transition>组件。
它使事情变得简单，几乎就像作弊一样。
Vue将检测是否使用任何CSS动画或转换，并会自动切换转换内容上的类，从而实现完美的定时转换系统和完整的控制。

第一步是确定我们的范围。我们告诉 Vue 前置的 transition class 是 `modal` , 通过设置组件的 `name` 标签。
然后触发转换，您只需要使用v-if或v-show属性切换内容的可见性即可。 Vue将相应地添加/删除类。

有两个“方向”，进入(enter)和离开(leave)过渡。 当元素从隐藏到可见的元素时，前者被使用。自然地，后者是相反的。

Vue然后提供3个“钩子”，表示转换中的不同时间范围：

* `.tray-enter-active` / `.tray-leave-active`:  这些将在整个转换过程中出现，并应用您的CSS`transition`声明。您还可以声明需要从头到尾应用的样式。
* `.tray-enter` / `.tray-leave`: 使用这些类来定义元素在开始转换之前的 style 。
* `.tray-enter-to` / `.tray-leave-to`: 这些确定了您希望转变为“完成”状态的 style。

为了可视化整个过程，请从Vue的文档中查看此图表：

![transition](http://ofn6njofy.bkt.clouddn.com/vuejs-transition-process.png)

那么这怎么转化为代码呢？假如我们只是想淡入淡出，把这些东西放在一起就像这样：

```vue
<transition name="modal">
    <div v-if="showFilters" class="filters">
        <!-- ... -->
    </div>
</transition>
```
```css
/*modal显示前 和 隐藏后 opacity 是 0*/
.modal-enter,
.modal-leave-to { opacity: 0 }

/*modal隐藏前 和 显示后 opacity 是 1*/
.modal-leave,
.modal-enter-to { opacity: 1 }

/*在这里写 transition */
.modal-enter-active,
.modal-leave-active { transition: opacity 300ms }
```

这可能是您遇到的最基本的实现。
transition系统还可以处理内容更改。 
例如，您可以对Vue的动态<component>中的更改做出反应。

```vue
<transition name="slide">
    <component :is="selectedView" :key="selectedView"/>
</transition>
```

```css
.enter { transform: translateX(100%) }
.enter-to { transform: translateX(0) }
.slide-enter-active { position: absolute }

.leave { transform: translateX(0) }
.leave-to { transform: translateX(-100%) }

.slide-enter-active,
.slide-leave-active { transition: all 750ms ease-in-out }
```

只要 `selectedView` 更改，旧组件将向左滑动，新的组件将从右侧进入。

#### 1.1 lists

当我们开始处理列表时，事情变得有趣。
无论是一些项目符号还是网格的博客文章，Vue提供了 `<transition-group>` 组件。

值得注意的是，虽然 `<transition> `组件实际上并没有渲染一个元素，但是`<transition-group>`会。
默认行为是使用<span>，但您可以通过设置 `transition-group` 上的 `tag` 属性来覆盖此选项。

另一个问题是所有列表项都需要有一个唯一的 `key` 属性。
Vue就可以单独跟踪每个项目，并优化其性能。

在我们的演示中，我们循环了公司列表，每个公司都有唯一的ID。 所以我们可以这样设置我们的列表：

```vue
<transition-group tag="ul" class="content__list" name="company">
  <li class="company" v-for="company in list" :key="company.id">
    <!-- ... -->
  </li>
</transition-group>
```
transition-group 最令人印象深刻的功能是Vue如何无缝地处理列表顺序的更改。
为此，可以使用一个额外的过渡类，.company-move（非常类似于进入和离开的活动类），它将应用于正在移动但将保持可见的列表项。

在演示中，我将其分解了一下，以显示如何利用不同的状态来获得更清晰的最终结果。 这是一个简化和整洁的版本的样式：

```css
/* base */
.company {
  backface-visibility: hidden;
  z-index: 1;
}

/* moving */
.company-move {
  transition: all 600ms ease-in-out 50ms;
}

/* appearing */
.company-enter-active {
  transition: all 400ms ease-out;
}

/* disappearing */
.company-leave-active {
  transition: all 200ms ease-in;
  position: absolute;
  z-index: 0;
}

/* appear at / disappear to */
.company-enter,
.company-leave-to {
  opacity: 0;
}
```
```markdown
    提示：在元素上使用 backface-visibility: hidden ，即使在没有3D变换的情况下，
    也将确保柔和的60fps转换，并通过欺骗浏览器来利用硬件加速来避免转换期间的模糊文本渲染。
```
在上面的代码段中，我将基本样式设置为`z-index：1`。
这保证页面上的元素总是会出现在离开的元素之上。
我也对离开自然流的项目施加绝对的定位，触发其余项目的移动过渡。

这就是我们需要的！ 结果坦白说，几乎是魔术。

### 2. Animations

<iframe height='800' scrolling='no' title='SVG path animation with VueJS & TweenLite' src='//codepen.io/lu7965/embed/XeoqyB/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/lu7965/pen/XeoqyB/'>SVG path animation with VueJS & TweenLite</a> by luchun (<a href='https://codepen.io/lu7965'>@lu7965</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

可能性和方法几乎是无止境的，所以我选择了我最喜欢的技术之一，展示如何使用Vue.js来动画化数据。

本质上，我们将使用GSAP的TweenLite库将缓动函数应用于状态的更改，并让Vue的快速反应反映在DOM上。Vue使用内联SVG与使用HTML一样舒适。

我们将创建一个具有5个点的线形图，沿X轴均匀间隔，Y轴将代表一个百分比。 

让我们开始我们组件的逻辑：
```vuejs
new Vue({
  el: '#app',
  // this is the data-set that will be animated
  data() {
    return {
      points: { a: -1, b: -1, c: -1, d: -1, e: -1 }
    }
  },
  
  // this computed property builds an array of coordinates that
  // can be used as is in our path
  computed: {
    path() {
      return Object.keys(this.points)
        // we need to filter the array to remove any
        // properties TweenLite has added
        .filter(key => ~'abcde'.indexOf(key))
        // calculate X coordinate for 5 points evenly spread
        // then reverse the data-point, a higher % should
        // move up but Y coordinates increase downwards
        .map((key, i) => [i * 100, 100 - this.points[key]])
    }
  },
  
  methods: {
    // our randomly generated destination values
    // could be replaced by an array.unshift process
    setPoint(key) {
      let duration = this.random(3, 5)
      let destination = this.random(0, 100)
      this.animatePoint({ key, duration, destination })
    },
    // start the tween on this given object key and call setPoint
    // once complete to start over again, passing back the key
    animatePoint({ key, duration, destination }) {
      TweenLite.to(this.points, duration, {
        [key]: destination,
        ease: Sine.easeInOut,
        onComplete: this.setPoint,
        onCompleteParams: [key]
      })
    },
    random(min, max) {
      return ((Math.random() * (max - min)) + min).toFixed(2)
    }
  },
  
  // finally, trigger the whole process when ready
  mounted() {
    Object.keys(this.points).forEach(key => {
      this.setPoint(key)
    })
  }
})
```

模板: 
```vue
<main id="app" class="chart">
  <figure class="chart__content">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -25 440 125">
      <path class="chart__path" :d="`M${path}`"
        fill="none" stroke="rgba(255, 255, 255, 0.3)"
        stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      
      <text v-for="([ x, y ]) in path" :x="x - 10" :y="y - 7.5"
        font-size="10" font-weight="200" fill="currentColor">
        {{ 100 - (y | 0) + '%' }}
      </text>
    </svg>
  </figure>
</main>
```
注意我们如何简单地将我们的路径计算属性绑定到路径元素的d属性。 
我们做的事情类似于输出当前值的文本节点。 
当TweenLite更新数据时，Vue会立即作出反应，并使DOM保持同步。

就这些！ 当然，额外的style应用于使事情变得美丽，在这一点上你可能会意识到需要更多的工作。

## 后 
 查看 [Vue.js' documentation](https://vuejs.org/v2/guide/transitions.html)  获得更多信息
### 原文地址
[https://snipcart.com/blog/vuejs-transitions-animations](https://snipcart.com/blog/vuejs-transitions-animations)

        