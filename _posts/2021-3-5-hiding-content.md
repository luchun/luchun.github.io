---
layout: post
title: 几种隐藏内容的方式
---
读到一篇接收各种隐藏文档内容的方式对比，[hiding content responsibly](https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/)

## 预览
|方式 | 可见性 | 可访问 |
|  ----  | ----  | ----  |
|`.sr-only` class | No | Yes |
|`aria-hidden="true"` | Yes | No |
|`hidden=""` | No | No |
|`display: none` | No | No |
|`visibility: hidden` | 不可见，但占用的空间不会折叠 | No |
|`opacity: 0` | 不可见，但占用的空间不会折叠 | 辅助设备决定 |
|`clip-path: circle(0)` | 不可见，但占用的空间不会折叠 | 辅助设备决定 |
|`transform: scale(0)` | 不可见，但占用的空间不会折叠 | Yes |
|`width: 0 ; height: 0` | No | No |
|`content-visibility: hidden` | No | No |

## `.sr-only` class
```css
.sr-only {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
}
```
这个方式胡从页面上隐藏元素，但是屏幕阅读器能继续访问元素，所以它对屏幕阅读器友好。
但要注意的是，隐藏的元素里有可以被聚焦的元素时(input)，可能会引起怪异的行为。

总结：
* 可见性：不可见(从文档流移除了)
* 可访问性： yes
* 元素和子元素能否聚焦：能 (⚠)

## `aria-hidden="true"` 标签
HTML的`aria-hidden`标签被设置为`true`时，内容会从可访问树种移除，但会保持可见。
总结：
* 可见性：yes
* 可访问性： no
* 元素和子元素能否聚焦：能 (⚠)

## `display: none`声明 和 `hidden`标签
这两者做的事情是一样的，都会将元素从渲染树和可访问树中移除
总结：
* 可见性：不可见(从文档流移除了)
* 可访问性： no
* 元素和子元素能否聚焦：no

## `visibility: hidden` 声明
css `visibility: hidden`声明会将元素从视觉上隐藏，但不会影响输出。元素所占用的空间不会折叠。
总结：
* 可见性：不可见(但文档流中存在)
* 可访问性： no
* 元素和子元素能否聚焦：no

## `opacity: 0` 和 `clip-path: circle(0)` 声明
这两个css声明都会将元素从视觉上隐藏，但不会影响输出。元素所占用的空间不会折叠。和`visibility: hidden`一样
但是可访问性会受辅助设备的技术影响，有一些会认为其内容是不可访问的、从而跳过。另一些会读取内容。
* 可见性：不可见(但文档流中存在)
* 可访问性： 依赖设备
* 元素和子元素能否聚焦：能 (⚠)

## `transform: scale(0)` 声明
`transform: scale(0)` 声明会将元素从视觉上隐藏，但不会影响输出。元素所占用的空间不会折叠。
* 可见性：不可见(但文档流中存在)
* 可访问性： yes
* 元素和子元素能否聚焦：能 (⚠)

## `width: 0 ; height: 0` 声明
这两个属性会将元素resize为0*0的盒模型，元素会被隐藏，屏幕阅读器也会跳过该元素，但是会受到SEO惩罚
* 可见性：不可见(文档流移除)
* 可访问性： no
* 元素和子元素能否聚焦：no

## `content-visibility: hidden` 声明
这个新属性可以让浏览器跳过元素的布局和渲染，从而提升加载性能。
* 可见性：不可见(文档流移除)
* 可访问性： no
* 元素和子元素能否聚焦：no