---
layout: post
title: 编写一个迷你 Redux
---
[原文](http://blog.jakoblind.no/2017/03/13/learn-redux-by-coding-a-mini-redux/?utm_source=reactnl&utm_medium=email)

现在有很多 Redux 学习资源。包括官方文档，示例，教程，博客，脚手架, Youtube视频，播客 ...等等。
尽管我们有如此多的资源可以学习，开发者在刚上手的时候一样会有些困惑。这些压倒性的内容，让人很难过滤掉相关的东西。

一个不同的学习策略是，自己写一个简单的Redux，可以深入的理解Redux的核心理念。比如我，早学习的过程中真的有突破。
现在我感觉自己 'get' 到了Redux。

不必担心，这并不复杂。Redux核心其实超级简单。

在开始前，我们先看看Redux是做什么的。

## Redux是做什么的?

Redex的全部要点就是为应用程序状态提供一个唯一可信来源。状态被保存在一个 JavaScript 纯对象：Redux *Store* 。
状态对象是只读的。如果你想改变状态，你就需要发射一个 *Action* ，它也是一个JavaScript 纯对象。

应用程序可以 *subscribe* 在store改变时得到通知。当 React 使用 Redux 时，就是React 组件会在状态改变时得到通知。
并可以基于store中的新内容来重新渲染。
![Redux loop](http://ofn6njofy.bkt.clouddn.com/redux.png)
store需要在得到一个action后知道如何更新store中的状态。它使用了一个JavaScript纯函数叫做 *reducer*。
reducer函数在 store被创建的时候被传入的。

## 开始编码吧！
总结起来，我们的 store需要能做三件事情：
1. 获取store的当前状态。
2. dispatch 一个 action,它作为reducer的一个参数被传入，用来更新store中的state。
3. 监听store的改变。

同样需要在创建时定义 reducer 和 初始状态。

  function createStore(reducer, initialState){
    var currentReducer = reducer;
    var currentState = initialState;
  }

### 1. 获取 state  

刚才我们只是定义了一个函数，并将初始状态和reducer 保存为了 本地变量。现在来实现 获取 store的state的能力。

  function createStore(reducer, initialState){
    var currentReducer = reducer;
    var currentState = initialState;

    return {
      getState(){
        return currentState;
      }
    }
  }

现在我们可以通过 `getState()` 来获取state 对象，超级简单。

### 2. dispatch 一个 action

下一步是实现对 dispatch action 的支持。

    function createStore(reducer, initialState){
      var currentReducer = reducer;
      var currentState = initialState;
      return {
        getState(){
          return currentState;
        },
        dispatch(action){
          currentState = currentReducer(currentState, action);
          return action;
        }
      }
    }

`dispatch` 函数传入当前状态，并通过初始化时定义的 reducer 来dispatch 一个 Action.接着他用新的state覆盖了之前的state。

### 3. subscribe 改变

现在我们可以获得当前的state并更新state了！下一步是监听改变。

      function createStore(reducer, initialState){
        var currentReducer = reducer;
        var currentState = initialState;
        var listener = ()=>{};

        return {
          getState(){
            return currentState;
          },
          dispatch(action){
            currentState = currentReducer(currentState, action);
            listener();
            return action;
          },
          subscribe(newlistener){
            listener = newlistener;
          }
        }  
      }

现在我们可以使用 `subscribe` 并传入一个函数作为参数, 并且在 action 被 dispatch的时候被调用。

## 开始使用

这就是整个 mini Redux 的实现，这实际是一个真正 Redux 代码的精简。

在官方文档上，有一个如何使用Redux的示例。我们可以 复制粘贴来使用我们的 Redux实现。

  function counter(state = 0, action) {
      switch (action.type) {
          case 'INCREMENT':
            return state + 1
          case 'DECREMENT':
            return state - 1
          default:
            return state
          }
      }

  let store = createStore(counter)

  store.subscribe(() =>
    console.log(store.getState())
    )

    store.dispatch({ type: 'INCREMENT' })
    store.dispatch({ type: 'INCREMENT' })
    store.dispatch({ type: 'DECREMENT' })

## 结语

我们只用了18行就实现了一个可以工作的 Redux。

我们的代码明显 不能应用于产品的。对比真正的 Redux, 我们没有错误处理，不支持多个 listeners,不支持中间件,等等。

但现在你已经知道了Redux工作的基础，你可以更好的继续学习之旅了。

在下一篇博文中没我们将编写 connect 函数，来绑定 React和 你的 Redux store。
