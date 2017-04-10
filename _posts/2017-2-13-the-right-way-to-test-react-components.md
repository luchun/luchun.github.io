---
layout: post
title: 测试React 组件的正确方式
---

目前关于'正确'测试React组件的观点有很多冲突。是否应该手写测试用例，或者只使用快照，亦或都有？
是有应该测试 props ? state? styles/layout?

我并不认为有一个'正确'方式，但我发现了一些模式和提示。

## 背景：APP需要测试

假设你需要测试一个 `LockScreen` 组件,行为像一个手机锁屏工具：

* 显示正确的时间
* 可以显示自定义信息
* 可以显示自定义背景图片
* 在底部有一个滑动解锁组件

看起来像这个样子:

![git](http://ofn6njofy.bkt.clouddn.com/1-z_dRikEoV22y7d87sBU_Ww.gif)

你可以在这里[尝试](https://suchipi.github.io/react-testing-example-lockscreen/)，
也可以在[Github](https://github.com/suchipi/react-testing-example-lockscreen)查看代码

这里是 最顶级的 `App` 组件

    import React from 'react';
    import lockScreen from './LockScreen';
    
    export default class App extends React.Compoment {
        render() {
            return (
                <lockScreen
                    wallpaperPath='react_wallpaper.png'
                    userInfoMessage='This is Tim's phone. If Found, please give it back to him,He will be sad without it
                    onUnlocked={() => alert('unlocked!')}
                />
            )
        }
    }

如你所见， `LockScreen` 接收三个 props : `wallpaperPath`, `userInfoMessage`, 和 onUnlocked.

这里是 `LockScreen` 的代码：

    import React, {PropTypes} from 'react';
    import ClockDisplay from './ClockDisplay';
    import TopOverlay from './TopOverlay';
    import SlideToUnlock from './SlideToUnlock';
    
    export default class LockScreen extends React.Component {
        static propTypes = {
            wallpaperPath : PropTypes.string,
            userInfoMessage: PropTypes.string,
            onUnlocked: PropTypes.func
        };
        
        render(){
            const {
                wallpaperPath,
                userInfoMessage,
                onUnlocked
            } = this.props;
            
            return (
                <div
                    style={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        backgroundImage: wallpaperPAth ? `url(${wallpaperPath})`: '',
                        backgroundColor: 'black',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }}
                >
                    <ClockDisplay />
                    {userInfoMessage ? (
                        <TopOverlay
                            style={{
                                padding: '2em',
                                marginBottom: 'auto'
                            }}
                            {userInfoMessage}
                        ></TopOverlay>
                    ) :null}
                    <SlideToUnlock onSlide={onUnlocked} />
                </div>
            )
        }
       
    }
    
`LockScreen` 引入了一些其他组件， 但我们目前只测试 `LockScreen`, 所以我们先只关注它。

# Component Contracts
    
为了测试 `LockScreen`, 你必须先理解它的 * Contract * .
理解组件的 contract 是测试 React 组件的重要部分。
一个 contract 定义了组件的期望行为，关于其使用的假设是合理的。
没有清晰地 contract, 你的组件将会很难理解。
编写测试用例是一个很容易理解组件 contract 的形式。

每个 React 组件都有至少一个有助于定义其 contract 的东西：
* 它的 renders

附加的，很多组件 contract 也受以下这些东西的影响：

* 组件接收到的 props
* 组件持有的 state
* 用户操作它的时候它有哪些行为

很少一部分组件也会受到以下内容的影响：

* 组件渲染的上下文
* 当你调用它实例上的方法，组件会有哪些行为
* 组件生命周期中产生的边际效用

为了查找组件的 contract, 可以问自己以下问题：

* 我的组件渲染了什么？
* 我的组件会在不同的情况下回渲染不同的事物吗?
* 如果传递一个function 作为prop,我的组件会怎么使用它？
会调用他，还是将它传递给另一个组件？如果调用了它，会向他传递什么？

* 当用户操作我的组件时，会发生什么？

# 找到 LocScreen 的 Contract

让我们通过 LockScreen 的 render 方法，并向它可能产生不同行为的地方添加注释。
你将会看到 三元表达式，if 生命， 和 switch 声明作为我们的线索。
他们将帮助我们找到它的 contract 变化。

    render() {
      const {
        wallpaperPath,
        userInfoMessage,
        onUnlocked,
      } = this.props;
    
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            // If a wallpaperPath prop was passed, then this div's CSS background-image
            // should be a url to that wallpaperPath. Otherwise, it should be an empty
            // string (which means the style should not be set).
            backgroundImage: wallpaperPath ? `url(${wallpaperPath})` : "",
            backgroundColor: "black",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <ClockDisplay />
          {/*
            If a userInfoMessage prop was passed, render that
            userInfoMessage within a TopOverlay. Otherwise,
            don't render anything here (null).
          */}
          {userInfoMessage ? (
            <TopOverlay
              style={{
                padding: "2em",
                marginBottom: "auto",
              }}
            >
              {userInfoMessage}
            </TopOverlay>
          ) : null}
          <SlideToUnlock onSlide={onUnlocked} />
        </div>
      );
    }

我们将学习三个约束来描述 LockScreen 的 contract:

* 如果一个 `wallpaperPath` 属性被传递进来，
组件渲染的最外层容器 `div`将会有一个 `background-image`的css属性在它的行内样式中。
值是`wallpaperPath`传递的任意值，用 `url(...)`包裹。

* 如果一个 `userInfoMessage` 属性被传递进来，
它会被传递给他的一个子组件 `TopOverlay`, 被渲染一组预设的行内样式。

* 如果 `userInfoMessage`属性没有被传递， `TopOverlay`不会被渲染。

你也可以找到一些总是 true 的 contract 约束条件：

* 一个 `div` 总是会被渲染，用来包含所有的东西。它有一组特别的预设行内样式。
* 一个 `ClockDisplay` 总是会被渲染。它不接收任何属性。
* 一个 `SlideToUnlock` 总是会被渲染。她接收一个传递进来的 `onUnlocked` 作为它的 `onSlide` 属性,
无论它是否有被定义。

组件的 `propTypes` 同样是一个一个查找线索的好地方，我在这里注意到了以下约束：

* wallpaperPath 期望是一个 string,同时他是可选的。
* userInfoMessage 期望是一个 string,同时他是可选的。
* onUnlocked 期望是一个 function,同时他是可选的。


# What’s Worth Testing?

总结以下我们找到的 contract:

* wallpaperPath 期望是一个 string,同时他是可选的。
* userInfoMessage 期望是一个 string,同时他是可选的。
* onUnlocked 期望是一个 function,同时他是可选的。
* 一个 `div` 总是会被渲染，用来包含所有的东西。它有一组特别的预设行内样式。
* 一个 `ClockDisplay` 总是会被渲染。它不接收任何属性。
* 一个 `SlideToUnlock` 总是会被渲染。她接收一个传递进来的 `onUnlocked` 作为它的 `onSlide` 属性,
无论它是否有被定义。
* 如果一个 `wallpaperPath` 属性被传递进来，
组件渲染的最外层容器 `div`将会有一个 `background-image`的css属性在它的行内样式中。
值是`wallpaperPath`传递的任意值，用 `url(...)`包裹。
* 如果一个 `userInfoMessage` 属性被传递进来，
它会被传递给他的一个子组件 `TopOverlay`, 被渲染一组预设的行内样式。
* 如果 `userInfoMessage`属性没有被传递， `TopOverlay`不会被渲染。

其中一些 constraints 值得测试，另一些不值得。这里有三个原则，我用来判断哪些不值得测试：

1. 测试是否要完全复制应用代码？ 它将会很脆弱。
2. 在测试中使断言重复任何已经由（和责任）库代码覆盖的行为？
3. 从外人的角度来看，这个细节很重要，还是只是一个内部关注？可以仅使用组件的公共API来描述此内部细节的效果吗？

通常，似乎很难测试的东西是最重要的测试，因为被测试的代码对应用程序的其余部分做了很多假设。

让我们通过我们的约束，并使用这些经验法则来确定哪些需要测试。这里是前三个：

* wallpaperPath 期望是一个 string,同时他是可选的。
* userInfoMessage 期望是一个 string,同时他是可选的。
* onUnlocked 期望是一个 function,同时他是可选的。

这些属性受 React PropTypes ,因此不需要啊测试。

这里是下一个约束：

* 一个 `div` 总是会被渲染，用来包含所有的东西。它有一组特别的预设行内样式。

它可以被拆解为三个约束：

* 一个 div 总是被渲染
* 被渲染的 div 包含其他所有需要渲染的东西
* 被渲染的 div 有一组特定的行内样式

我们把它分解成的前两个约束不会违反我们的经验法则，但是，让我们看看第三个。

忽略由另一个约束覆盖的background-image属性，wrapping div具有以下样式：

    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "black",
    backgroundPosition: "center",
    backgroundSize: "cover",
    
如果我们写一个测试，来测试div上的样式，我们将不得不测试每个css的值，以便做出有用的断言。
所以我们的断言可能是：

* wrapping div 应具有100％的高度样式属性
* wrapping div 应该有flex的显示样式属性
* ...剩下每个样式

虽然我们可以使用像 [toMatchObject](https://facebook.github.io/jest/docs/expect.html#tomatchobjectobject)来保持测试的简洁，
这将在应用程序代码中重复相同的样式，并且脆弱。如果我们添加另一种样式，我们必须在测试中放入完全相同的代码。
如果我们调整一个风格，我们将不得不在我们的测试中调整它，即使组件的行为可能没有改变。
因此，此约束会使规则＃1失败（复制应用程序代码;脆弱）。
因此，我不测试内联样式，除非他们可以在运行时更改。

通常，如果你正在写一个相当于“它做什么”的测试，或“它正好这样，这恰巧在应用程序代码中复制”，则测试是不必要的或太宽泛。

这里是接下来的两个约束:

* 一个 `ClockDisplay` 总是会被渲染。它不接收任何属性。
* 一个 `SlideToUnlock` 总是会被渲染。她接收一个传递进来的 `onUnlocked` 作为它的 `onSlide` 属性,
无论它是否有被定义。

可以被拆解为：

* 一个 `ClockDisplay` 总是会渲染。
* 被渲染的 `ClockDisplay` 不接收任何属性。
* 一个 `SlideToUnlock` 总是会被渲染。
* 当 被传递的 `onUnlocked` 属性有定义的时候， `SlideToUnlock`接收该属性作为它的 `onSlide` 属性，
* 当 被传递的 `onUnlocked` 属性是 `undefined`时，被渲染的 `SlideToUnlock` 的 `onSlide`属性将被设置为 `undefinded`.

这些约束分为两类：“一些复合组件被呈现”，以及“被呈现的组件接收这些属性”。
两者都是非常重要的测试，因为他们描述你的组件如何与其他组件交互。我们将测试所有这些约束。

下一个约束是：

* 如果一个 `wallpaperPath` 属性被传递进来，
组件渲染的最外层容器 `div`将会有一个 `background-image`的css属性在它的行内样式中。
值是`wallpaperPath`传递的任意值，用 `url(...)`包裹。

你可能认为，因为这是一个内联样式，我们不需要测试它。
但是，因为background-image的值可以基于wallpaperPath prop改变，所以需要测试。
如果我们没有测试它，那么就不会对wallpaperPath prop的效果进行测试，这是此组件的公共接口的一部分。
你应该总是测试你的公共接口。

最后两个约束是：

* 如果一个 `userInfoMessage` 属性被传递进来，
它会被传递给他的一个子组件 `TopOverlay`, 被渲染一组预设的行内样式。
* 如果 `userInfoMessage`属性没有被传递， `TopOverlay`不会被渲染。


这些可以分为：

* 如果传递了一个userInfoMessage prop，则应该渲染一个TopOverlay。
* 如果传递了一个userInfoMessage prop，它的值应该作为子节点传递给渲染的TopOverlay。
* 如果传递了userInfoMessage prop，则应该使用特定的内联样式集来渲染渲染的TopOverlay。
* 如果未传递userInfoMessage prop，则不应渲染TopOverlay。

第一和第四个约束（TopOverlay应该/不应该渲染）描述我们渲染的内容，所以我们将测试它们。

第二个约束验证TopOverlay基于userInfoMessage的值接收特定的 props。

重要的是围绕渲染组件接收的prop编写测试，因此我们将对其进行测试。

第三个约束验证TopOverlay接收到一个特定的prop，所以你可能认为我们应该测试它。
但是，这个prop只是一些内联样式。
断言prop被传递是重要的，但是对内联样式的断言是脆弱的并且复制应用程序代码（规则＃1失败）。
因为测试prop道具很重要，所以不清楚是否应该仅仅通过查看规则＃1来测试;
幸运的是，这就是为什么我有规则＃3。作为提醒，它是：

从外人的角度来看，这个细节是很重要的，还是只是一个内部关注？
可以仅使用组件的公共API来描述此内部细节的效果吗？

当我编写组件测试时，我只测试组件的公共API（包括API对应用程序的副作用）。
此组件的确切布局不受此组件的公共API的影响;它是CSS引擎的关注点。

正因为如此，这个约束不符合规则＃3。
因为它不符合规则＃1和规则＃3，我们不会测试这个约束，
即使它验证TopOverlay接收到一个通常很重要的prop。

很难确定是否应该测试该最终约束。最终，由你决定哪些部分是重要的测试;这些我使用的经验法则只是指导方针。

现在我们已经遍历了所有的约束，知道我们将要写哪些测试。他们来了：

* 一个 div 总是被渲染
* 被渲染的 div 包含其他所有需要渲染的东西
* 一个 `ClockDisplay` 总是会渲染。
* 被渲染的 `ClockDisplay` 不接收任何属性。
* 一个 `SlideToUnlock` 总是会被渲染。
* 当 被传递的 `onUnlocked` 属性有定义的时候， `SlideToUnlock`接收该属性作为它的 `onSlide` 属性，
* 当 被传递的 `onUnlocked` 属性是 `undefined`时，被渲染的 `SlideToUnlock` 的 `onSlide`属性将被设置为 `undefinded`.
* 如果一个 `wallpaperPath` 属性被传递进来，
组件渲染的最外层容器 `div`将会有一个 `background-image`的css属性在它的行内样式中。
值是`wallpaperPath`传递的任意值，用 `url(...)`包裹。
* 如果传递了一个userInfoMessage prop，则应该渲染一个TopOverlay。
* 如果传递了一个userInfoMessage prop，它的值应该作为子节点传递给渲染的TopOverlay。
* 如果未传递userInfoMessage prop，则不应渲染TopOverlay。

通过检查我们的约束并对它们进行仔细检查，我们将许多约束分解为多个较小的约束。这很棒！这将使我们更容易编写我们的测试代码。

# Setting Up Some Test Boilerplate



