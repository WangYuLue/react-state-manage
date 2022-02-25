# 浅谈 React 状态管理工具

## react 挑选状态管理时有哪些指标？

- 细粒度render
- 派生状态（联级派生）
- 异步（联级异步）
- 在非 react 上下文也可以订阅和更新
- 状态管理的范围

## 疑问

### 后端有没有状态管理工具？

首先有状态的地方就有状态管理，后端当然也不例外。

前端常常聊的状态管理只是一个狭义上的概念，指的是**一种实现跨组件通信和数据共享的方式。**，它的特殊之处在于状态变更后自动更新用到该状态的相应组件。最好可以做到细粒度的更新，即只更新真正需要更新的 component.

### vue 和 angular 为什么没有像 react 这样纷杂的这么多种状态管理工具？

vue 和 angular 的数据都是响应式的，当数据变更时，什么时候刷新视图，刷新的粒度怎么样，开发者无需关心，这一切交给框架本身去做就好了。

所以 vue 基本用 vuex 就够了（最近又出了个Pinia）；angular 的数据管理交给 service 也就够了。

而 react 不一样，react 认为 UI 本身只是一个函数（UI = fn(state)），状态怎么变更，什么时候变更，react把这些权利完全交给了开发者。这也就给各种状态管理发挥和想象的空间。造成 react 社区状态管理工具百家争鸣的现象。

## react 状态管理工具的门派？

- 没有状态管理工具：直接用 props 或者 context
- 单项数据流：`redux`、`zustand`
- 双向绑定：`mobx`、`valtio`
- 状态原子化：`jotai`、`recoil`
- 有限状态机：`xstate`

其中 `单项数据流`、`双向绑定`、`状态原子化` 本质上都是发布订阅模式。

## react 状态管理工具

### 原生 props

项目越大，写起来越难受，会有 `props drilling` 问题。

### 原生 context

写起来很方便，但是项目一大会哟性能问题，每一次对 props 的变更都会引起全局的渲染。

可以用 memo 解决一部分性能问题。

### redux

社区用的最多的状态管理工具，概念很多，样本代码也很多。

写起来很麻烦，要定义 action、reducer，还要通过 dispatch 来触发更新，啰里八嗦的。

然后缺乏计算属性的功能，项目复杂起来计算属性很有必要，可惜 redux 没有。

官方为了减少 redux 的复杂和样板代码还推出了 redux-toolkit，但是看了一样文档感觉这玩意是个四不像，不像传统的 redux，上手感觉还是很麻烦，没有上手的欲望。

### rxjs

JS 领域的神器，基本可以完成状态管理中的所有功能：

- 细粒度 render
- 计算属性
- 异步
- 非 react 上下文订阅和更新

不过 rxjs 并不是专业做 状态管理的，所以当作状态管理工具来用样板代码比较多。

而且 rxjs 概念很多、操作符很多，学习路径相对陡峭。

所以总结是：rxjs 可以实现 状态管理 的需求，但不是最合适的选择。就像坦克可以载人，但总没有轿车来的舒服。

### mobx

大道至简！

mobx 用起来最为简单，类的属性是 Observable，类的 get 方法是 Computed，类的 函数是 Action；一切都是自然而然。

再用 observer 把组件包一下，切都是相应式的变更了。连 memo 都不要了，observer 会自动 memo，只 render 真正需要 render 的地方。

### zustand

最近社区推崇的比较火，用起来比 redux 方便多了。但是 store 的定义比较怪异，不太适应。

还有个缺点是不支持计算属性。

### jotai

难用，有设计缺陷：

- 处理异步时很麻烦
- 无法在非 react 上下问中使用

优点是支持计算属性，但是瑜不掩瑕。

### recoil

更难用，还是官方维护的，感觉有点走火入魔了：

- 定义 atom 还要设置一个 key, 反人类设计
- 和 react、 react-dom 强绑定，不愧是官方出品（意味着无法在非 react 上下问中使用）

### [xstate](https://xstate.js.org/docs/zh/about/concepts.html#%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E6%9C%BA)

使用有限状态机来进行状态管理。

个人认为其不适用用 UI 上的状态管理，而更适用于对于复杂业务逻辑的状态管理。

比如电商中订单的状态有：【待付款】、【待发货】、【待收货】、【待评价】、【交易完成】、【用户取消】、【仅退款】、【退货退款】。

这些状态中每个状态又都可以通过某些 action 进行状态转移，如果放在一般的编程中，需要写大量的 if-else 代码，造成维护困难。这时候可以通过有限状态机来维护这些状态，并通过可视化工具清晰的看到状态的转移路径。

### valtio

很不错的库，使用体验和 mobx 基本一致。支持：

- 细粒度 render
- 计算属性
- 非 react 上下文订阅和更新

不过作者 typescript 类型推断功底不太好，有一些类型推断的 bug, 和 jotai 是同一个作者写的。

### 发布订阅

上面 rxjs 实现的那一套，基本可以用发布订阅模式实现（管道符的实现除外）。而且也可以做到细粒度更新。

事实上，状态管理没有什么玄乎奇神的东西，各种门派 `单项数据流`、`双向绑定`、`状态原子化`，本质上都是发布订阅模式。

### hox

阿里出的一个状态管理库，看 npm 下载量就知道基本没人用；

- 没发自然做到细粒度渲染（需要手动控制依赖项才能细粒度更新）
- 计算属性的支持很别扭
- 只能在 react 上下问中才能使用

### resso

国人设计的状态管理工具，很有意思，设计上更加激进。

非常简洁，号称是最简单的状态管理工具。

源码也很短，加类型定义不到 50 行。

想法很好，不过现阶段（v0.2.2）似乎有严重的性能问题 和 bug。

- [相关链接](https://lequ7.com/guan-yu-reactjsresso-shi-jie-shang-zui-jian-dan-de-react-zhuang-tai-guan-li-qi.html)

## 其他前端框架状态管理对比（todo）

- 使用 angular 的状态管理
- 使用 vue2 的状态管理
- 使用 vue3 的状态管理
- 使用 Svelte 的状态管理
- 使用 Solid 的状态管理
- 使用 Lit 的状态管理
- 使用 Stencil 的状态管理（试用一下props）

### 参考资料

- [Picking From 20 React State Managers](https://www.youtube.com/watch?v=P95DuIBwnqw&ab_channel=JackHerrington)
- [React State Management Libraries and How to Choose](https://daveceddia.com/react-state-management/)
