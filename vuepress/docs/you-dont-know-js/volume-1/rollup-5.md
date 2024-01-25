---
title: 第5章 作用域闭包
date: '2023-05-07'
---

# 第5章：作用域闭包

接下来的内容需要对`作用域工作原理`相关的知识有着非常`深入`的个人见解。

我们将我们的注意力转向这个语言中一个重要到不可思议，但是一直难以捉摸的、_几乎是神话般的_ 部分：**闭包**。如果你至此一直跟随着我们关于词法作用域的讨论，那么你会感觉闭包将在很大程度上没那么令人激动，几乎是显而易见的。_有一个魔法师坐在幕后，现在我们即将见到他_。不，他的名字不是 Crockford！

如果你还对`词法作用域`感到不安，那么现在就是在继续之前回过头去再复习一下第二章的好时机。

## 启示

对于那些对 `JavaScript` 有些经验，但是也许从没全面掌握闭包概念的人来说，_理解闭包_ 看起来就像是必须努力并作出牺牲才能到达的涅槃状态。

回想几年前我对 `JavaScript` 有了牢固的掌握，但是不知道闭包是什么。它暗示着这种语言有着另外的一面，它许诺了甚至比我已经拥有的还多的力量，它取笑并嘲弄我。我记得我通读早期框架的源代码试图搞懂它到底是如何工作的。我记得第一次“模块模式”的某些东西融入我的大脑。我记得那依然栩栩如生的 _啊哈！_ 一刻。

那时我不明白的东西，那个花了我好几年时间才搞懂的东西，那个我即将传授给你的东西，是这个秘密：**在 JavaScript 中闭包无所不在，你只是必须认出它并接纳它**。闭包不是你必须学习新的语法和模式才能使用的特殊的可选的工具。不，闭包甚至不是你必须像卢克在原力中修炼那样，一定要学会使用并掌握的武器。

**闭包是依赖于词法作用域编写代码而产生的结果**。它们就这么发生了。要利用它们你甚至不需要有意地创建闭包。闭包在你的代码中一直在被创建和使用。你 _缺少_ 的是恰当的思维环境，来识别，接纳，并以自己的意志利用闭包。

启蒙的时刻应该是：**哦，闭包已经在我的代码中到处发生了，现在我终于 _看到_ 它们了**。理解闭包就像是尼欧第一次见到母体。

## 实质问题

好了，夸张和对电影的无耻引用够多了。

为了理解和识别闭包，这里有一个你需要知道的简单粗暴的定义：

> 闭包就是函数能够记住并访问它的词法作用域，即使当这个函数在它的词法作用域之外执行时。

让我们跳进代码来说明这个定义：

```js
function foo() {
  var a = 2;
  function bar() {
    console.log(a); // 2
  }
  bar();
}
foo();
```

根据我们对嵌套作用域的讨论，这段代码应当看起来很熟悉。由于词法作用域查询规则（在这个例子中，是一个 RHS 引用查询），函数 `bar()` 可以 _访问_ 外围作用域的变量 `a`。

这是“闭包”吗？

好吧，从技术上讲…… _也许是_。但是根据我们上面的“你需要知道”的定义…… _不确切_。我认为解释 `bar()` 引用 `a` 的最准确的方式是根据词法作用域查询规则，但是那些规则 _仅仅_ 是闭包的（一个很重要的！）**一部分**。

从纯粹的学院派角度讲，上面的代码段被认为是函数 `bar()` 在函数 `foo()` 的作用域上有一个 _闭包_（而且实际上，它甚至对其他的作用域也可以访问，比如这个例子中的全局作用域）。换一种略有不同的说法是，`bar()` 闭住了 `foo()` 的作用域。为什么？因为 `bar()` 嵌套地出现在 `foo()` 内部。就这么简单。

但是，这样一来闭包的定义就是不能直接 _观察到_ 的了，我们也不能看到闭包在这个代码段中 _被行使_。我们清楚地看到词法作用域，但是闭包仍然像代码后面谜一般的模糊阴影。

让我们考虑这段将闭包完全带到聚光灯下的代码：

```js
function foo() {
  var a = 2;

  function bar() {
    console.log(a);
  }
  return bar;
}
var baz = foo();
baz(); // 2 -- 哇噢，看到闭包了，伙计。
```

函数 `bar()` 对于 `foo()` 内的作用域拥有词法作用域访问权。但是之后，我们拿起 `bar()`，这个函数本身，将它像 _值_ 一样传递。在这个例子中，我们 `return` `bar` 引用的函数对象本身。

在执行 `foo()` 之后，我们将它返回的值（我们的内部 `bar()` 函数）赋予一个称为 `baz` 的变量，然后我们实际地调用 `baz()`，这将理所当然地调用我们内部的函数 `bar()`，只不过是通过一个不同的标识符引用。

`bar()` 被执行了，必然的。但是在这个例子中，它是在它被声明的词法作用域 _外部_ 被执行的。

`foo()` 被执行之后，一般说来我们会期望 `foo()` 的整个内部作用域都将消失，因为我们知道 _引擎_ 启用了 _垃圾回收器_ 在内存不再被使用时来回收它们。因为很显然 `foo()` 的内容不再被使用了，所以看起来它们很自然地应该被认为是 _消失了_。

但是闭包的“魔法”不会让这发生。内部的作用域实际上 _依然_ “在使用”，因此将不会消失。谁在使用它？**函数 `bar()` 本身。**

有赖于它被声明的位置，`bar()` 拥有一个词法作用域闭包覆盖着 `foo()` 的内部作用域，闭包为了能使 `bar()` 在以后任意的时刻可以引用这个作用域而保持它的存在。

**`bar()` 依然拥有对那个作用域的引用，而这个引用称为闭包。**

所以，在几微秒之后，当变量 `baz` 被调用时（调用我们最开始标记为 `bar` 的内部函数），它理所应当地对编写时的词法作用域拥有 _访问_ 权，所以它可以如我们所愿地访问变量 `a`。

这个函数在它被编写时的词法作用域之外被调用。**闭包** 使这个函数可以继续访问它在编写时被定义的词法作用域。

当然，函数可以被作为值传递，而且实际上在其他位置被调用的所有各种方式，都是观察/行使闭包的例子。

```js
function foo() {
  var a = 2;

  function baz() {
    console.log(a); // 2
  }

  bar(baz);
}

function bar(fn) {
  fn(); // 看妈妈，我看到闭包了！
}
```

我们将内部函数 `baz` 传递给 `bar`，并调用这个内部函数（现在被标记为 `fn`），当我们这么做时，它覆盖在 `foo()` 内部作用域的闭包就可以通过 `a` 的访问观察到。

这样的函数传递也可以是间接的。

```js
var fn;

function foo() {
  var a = 2;

  function baz() {
    console.log(a);
  }

  fn = baz; // 将`baz`赋值给一个全局变量
}

function bar() {
  fn(); // 看妈妈，我看到闭包了！
}

foo();

bar(); // 2
```

无论我们使用什么方法将内部函数 _传送_ 到它的词法作用域之外，它都将维护一个指向它最开始被声明时的作用域的引用，而且无论我们什么时候执行它，这个闭包就会被行使。

## 现在我懂了

前面的代码段有些学术化，而且是人工构建来说明 _闭包的使用_ 的。但我保证过给你的东西不止是一个新的酷玩具。我保证过闭包是在你的现存代码中无处不在的东西。现在让我们 _看看_ 真相。

```js
function wait(message) {
  setTimeout(function timer() {
    console.log(message);
  }, 1000);
}

wait("Hello, closure!");
```

我们拿来一个内部函数（名为 `timer`）将它传递给 `setTimeout(..)`。但是 `timer` 拥有覆盖 `wait(..)` 的作用域的闭包，实际上保持并使用着对变量 `message` 的引用。

在我们执行 `wait(..)` 一千毫秒之后，要不是内部函数 `timer` 依然拥有覆盖着 `wait()` 内部作用域的闭包，它早就会消失了。

在 _引擎_ 的内脏深处，内建的工具 `setTimeout(..)` 拥有一些参数的引用，可能称为 `fn` 或者 `func` 或者其他诸如此类的东西。_引擎_ 去调用这个函数，它调用我们的内部 `timer` 函数，而词法作用域依然完好无损。

**闭包。**

或者，如果你信仰 jQuery（或者就此而言，其他的任何 JS 框架）：

```js
function setupBot(name, selector) {
  $(selector).click(function activator() {
    console.log("Activating: " + name);
  });
}

setupBot("Closure Bot 1", "#bot_1");
setupBot("Closure Bot 2", "#bot_2");
```

我不确定你写的是什么代码，但我通常写一些代码来负责控制全球的闭包无人机军团，所以这完全是真实的！

把玩笑放在一边，实质上 _无论何时何地_ 只要你将函数作为头等的值看待并将它们传来传去的话，你就可能看到这些函数行使闭包。计时器、事件处理器、Ajax 请求、跨窗口消息、web worker、或者任何其他的异步（或同步！）任务，当你传入一个 _回调函数_，你就在它周围悬挂了一些闭包！

**注意：** 第三章介绍了 IIFE 模式。虽然人们常说 IIFE（独自）是一个可以观察到闭包的例子，但是根据我们上面的定义，我有些不同意。

```js
var a = 2;

(function IIFE() {
  console.log(a);
})();
```

这段代码“好用”，但严格来说它不是在观察闭包。为什么？因为这个函数（就是我们这里命名为“IIFE”的那个）没有在它的词法作用域之外执行。它仍然在它被声明的相同作用域中（那个同时持有 `a` 的外围/全局作用域）被调用。`a` 是通过普通的词法作用域查询找到的，不是通过真正的闭包。

虽说技术上闭包可能发生在声明时，但它 _不是_ 严格地可以观察到的，因此，就像人们说的，_它是一颗在森林中倒掉的树，但周围没人去听到它_。

虽然 IIFE _本身_ 不是一个闭包的例子，但是它绝对创建了作用域，而且它是我们用来创建可以被闭包的作用域的最常见工具之一。所以 IIFE 确实与闭包有强烈的关联，即便它们本身不行使闭包。

亲爱的读者，现在把这本书放下。我有一个任务给你。去打开一些你最近的 JavaScript 代码。寻找那些被你作为值的函数，并识别你已经在那里使用了闭包，而你以前甚至可能不知道它。

我会等你。

现在……你看到了！

## 循环 & 闭包

用来展示闭包最常见最权威的例子是老实巴交的 for 循环。

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

**注意：** 当你将函数放在循环内部时 Linter 经常会抱怨，因为不理解闭包的错误 **在开发者中太常见了**。我们在这里讲解如何正确地利用闭包的全部力量。但是 Linter 通常不理解这样的微妙之处，所以它们不管怎样都将抱怨，认为你 _实际上_ 不知道你在做什么。

这段代码的精神是，我们一般将 _期待_ 它的行为是分别打印数字“1”，“2”，……“5”，一次一个，一秒一个。

实际上，如果你运行这段代码，你会得到“6”被打印 5 次，一秒一个。

**啊？**

首先，让我们解释一下“6”是从哪儿来的。循环的终结条件是 `i` _不_ `<=5`。第一次满足这个条件时 `i` 是 6。所以，输出的结果反映的是 `i` 在循环终结后的最终值。

如果多看两眼的话这其实很明显。超时的回调函数都将在循环的完成之后立即运行。实际上，就计时器而言，即便在每次迭代中它是 `setTimeout(.., 0)`，所有这些回调函数也都仍然是严格地在循环之后运行的，因此每次都打印 `6`。

但是这里有个更深刻的问题。要是想让它实际上如我们在语义上暗示的那样动作，我们的代码缺少了什么？

缺少的东西是，我们试图 _暗示_ 在迭代期间，循环的每次迭代都“捕捉”一份对 `i` 的拷贝。但是，虽然所有这 5 个函数在每次循环迭代中分离地定义，由于作用域的工作方式，它们 **都闭包在同一个共享的全局作用域上**，而它事实上只有一个 `i`。

这么说来，所有函数共享一个指向相同的 `i` 的引用是 _理所当然_ 的。循环结构的某些东西往往迷惑我们，使我们认为这里有其他更精巧的东西在工作。但是这里没有。这与根本没有循环，5 个超时回调仅仅一个接一个地被声明没有区别。

好了，那么，回到我们火烧眉毛的问题。缺少了什么？我们需要更多 ~~铃声~~ 被闭包的作用域。明确地说，我们需要为循环的每次迭代都准备一个新的被闭包的作用域。

我们在第三章中学到，IIFE 通过声明并立即执行一个函数来创建作用域。

让我们试试：

```js
for (var i = 1; i <= 5; i++) {
  (function () {
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  })();
}
```

这好用吗？试试。我还会等你。

我来为你终结悬念。**不好用。** 但是为什么？很明显我们现在有了更多的词法作用域。每个超时回调函数确实闭包在每次迭代时分别被每个 IIFE 创建的作用域中。

拥有一个被闭包的 **空的作用域** 是不够的。仔细观察。我们的 IIFE 只是一个空的什么也不做的作用域。它内部需要 _一些东西_ 才能变得对我们有用。

它需要它自己的变量，在每次迭代时持有值 `i` 的一个拷贝。

```js
for (var i = 1; i <= 5; i++) {
  (function () {
    var j = i;
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })();
}
```

**万岁！它好用了！**

有些人偏好一种稍稍变形的形式：

```js
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })(i);
}
```

当然，因为这些 IIFE 只是函数，我们可以传入 `i`，如果我们乐意的话可以称它为 `j`，或者我们甚至可以再次称它为 `i`。不管哪种方式，这段代码都能工作。

在每次迭代内部使用的 IIFE 为每次迭代创建了新的作用域，这给了我们的超时回调函数一个机会，在每次迭代时闭包一个新的作用域，这些作用域中的每一个都拥有一个持有正确的迭代值的变量给我们访问。

问题解决了！

### 重温块作用域

仔细观察我们前一个解决方案的分析。我们使用了一个 IIFE 来在每一次迭代中创建新的作用域。换句话说，我们实际上每次迭代都 _需要_ 一个 **块儿作用域**。我们在第三章展示了 `let` 声明，它劫持一个块儿并且就在这个块儿中声明一个变量。

**这实质上将块儿变成了一个我们可以闭包的作用域**。所以接下来的牛逼代码“就是好用”：

```js
for (var i = 1; i <= 5; i++) {
  let j = i; // 呀，给闭包的块儿作用域！
  setTimeout(function timer() {
    console.log(j);
  }, j * 1000);
}
```

_但是，这还不是全部！_（用我最棒的 Bob Barker 嗓音）在用于 for 循环头部的 `let` 声明被定义了一种特殊行为。这种行为说，这个变量将不是只为循环声明一次，**而是为每次迭代声明一次**。并且，它将在每次后续的迭代中被上一次迭代末尾的值初始化。

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

这有多酷？块儿作用域和闭包携手工作，解决世界上所有的问题。我不知道你怎么样，但这使我成了一个快乐的 JavaScript 开发者。

## 模块

还有其他的代码模式利用了闭包的力量，但是它们都不像回调那样浮于表面。让我们来检视它们中最强大的一种：_模块_。

```js
function foo() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join(" ! "));
  }
}
```

就现在这段代码来说，没有发生明显的闭包。我们只是拥有一些私有数据变量 `something` 和 `another`，以及几个内部函数 `doSomething()` 和 `doAnother()`，它们都拥有覆盖在 `foo()` 内部作用域上的词法作用域（因此是闭包！）。

但是现在考虑这段代码：

```js
function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join(" ! "));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother,
  };
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

在 JavaScript 中我们称这种模式为 _模块_。实现模块模式的最常见方法经常被称为“揭示模块”，它是我们在这里展示的方式的变种。

让我们检视关于这段代码的一些事情。

首先，`CoolModule()` 只是一个函数，但它 _必须被调用_ 才能成为一个被创建的模块实例。没有外部函数的执行，内部作用域的创建和闭包都不会发生。

第二，`CoolModule()` 函数返回一个对象，通过对象字面量语法 `{ key: value, ... }` 标记。这个我们返回的对象拥有指向我们内部函数的引用，但是 _没有_ 指向我们内部数据变量的引用。我们可以将它们保持为隐藏和私有的。可以很恰当地认为这个返回值对象实质上是一个 **我们模块的公有 API**。

这个返回值对象最终被赋值给外部变量 `foo`，然后我们可以在这个 API 上访问那些属性，比如 `foo.doSomething()`。

**注意：** 从我们的模块中返回一个实际的对象（字面量）不是必须的。我们可以仅仅直接返回一个内部函数。jQuery 就是一个很好地例子。`jQuery` 和 `$` 标识符是 jQuery “模块”的公有 API，但是它们本身只是一个函数（这个函数本身可以有属性，因为所有的函数都是对象）。

`doSomething()` 和 `doAnother()` 函数拥有模块“实例”内部作用域的闭包（通过实际调用 `CoolModule()` 得到的）。当我们通过返回值对象的属性引用，将这些函数传送到词法作用域外部时，我们就建立好了可以观察和行使闭包的条件。

更简单地说，行使模块模式有两个“必要条件”：

1. 必须有一个外部的外围函数，而且它必须至少被调用一次（每次创建一个新的模块实例）。

2. 外围的函数必须至少返回一个内部函数，这样这个内部函数才拥有私有作用域的闭包，并且可以访问和/或修改这个私有状态。

仅一个带有函数属性的对象本身不是 _真正_ 的模块。从可观察的角度来说，一个从函数调用中返回的对象，仅带有数据属性而没有闭包的函数，也不是 _真正_ 的模块。

上面的代码段展示了一个称为 `CoolModule()` 独立的模块创建器，它可以被调用任意多次，每次创建一个新的模块实例。这种模式的一个稍稍的变化是当你只想要一个实例的时候，某种“单例”：

```js
var foo = (function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join(" ! "));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother,
  };
})();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

这里，我们将模块放进一个 IIFE（见第三章）中，而且我们 _立即_ 调用它，并把它的返回值直接赋值给我们单独的模块实例标识符 `foo`。

模块只是函数，所以它们可以接收参数：

```js
function CoolModule(id) {
  function identify() {
    console.log(id);
  }

  return {
    identify: identify,
  };
}

var foo1 = CoolModule("foo 1");
var foo2 = CoolModule("foo 2");

foo1.identify(); // "foo 1"
foo2.identify(); // "foo 2"
```

另一种在模块模式上微小但是强大的变化是，为你作为公有 API 返回的对象命名：

```js
var foo = (function CoolModule(id) {
  function change() {
    // 修改公有 API
    publicAPI.identify = identify2;
  }

  function identify1() {
    console.log(id);
  }

  function identify2() {
    console.log(id.toUpperCase());
  }

  var publicAPI = {
    change: change,
    identify: identify1,
  };

  return publicAPI;
})("foo module");

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE
```

通过在模块实例内部持有一个指向公有 API 对象的内部引用，你可以 **从内部** 修改这个模块，包括添加和删除方法，属性，_和_ 改变它们的值。

### 现代的模块

各种模块依赖加载器/消息机制实质上都是将这种模块定义包装进一个友好的 API。与其检视任意一个特定的库，不如让我 **（仅）为了说明的目的** 展示一个 _非常简单_ 的概念证明：

```js
var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }

  return {
    define: define,
    get: get,
  };
})();
```

这段代码的关键部分是 `modules[name] = impl.apply(impl, deps)`。这为一个模块调用了它的定义的包装函数（传入所有依赖），并将返回值，也就是模块的 API，存储到一个用名称追踪的内部模块列表中。

这里是我可能如何使用它来定义一个模块：

```js
MyModules.define("bar", [], function () {
  function hello(who) {
    return "Let me introduce: " + who;
  }

  return {
    hello: hello,
  };
});

MyModules.define("foo", ["bar"], function (bar) {
  var hungry = "hippo";

  function awesome() {
    console.log(bar.hello(hungry).toUpperCase());
  }

  return {
    awesome: awesome,
  };
});

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

console.log(bar.hello("hippo")); // Let me introduce: hippo

foo.awesome(); // LET ME INTRODUCE: HIPPO
```

模块“foo”和“bar”都使用一个返回公有 API 的函数来定义。“foo”甚至接收一个“bar”的实例作为依赖参数，并且可以因此使用它。

花些时间检视这些代码段，来完全理解将闭包的力量付诸实践给我们带来的好处。关键之处在于，对于模块管理器来说真的没有什么特殊的“魔法”。它们只是满足了我在上面列出的模块模式的两个性质：调用一个函数定义包装器，并将它的返回值作为这个模块的 API 保存下来。

换句话说，模块就是模块，即便你在它们上面放了一个友好的包装工具。

### 未来的模块

ES6 为模块的概念增加了头等的语法支持。当通过模块系统加载时，ES6 将一个文件视为一个独立的模块。每个模块可以导入其他的模块或者特定的 API 成员，也可以导出它们自己的公有 API 成员。

**注意：** 基于函数的模块不是一个可以被静态识别的模式（编译器可以知道的东西），所以它们的 API 语义直到运行时才会被考虑。也就是，你实际上可以在运行时期间修改模块的 API（参见早先 `publicAPI` 的讨论）。

相比之下，ES6 模块 API 是静态的（这些 API 不会在运行时改变）。因为编译器知道它，它可以（也确实在这么作！）在（文件加载和）编译期间检查一个指向被导入模块的成员的引用是否 _实际存在_。如果 API 引用不存在，编译器就会在编译时抛出一个“早期”错误，而不是等待传统的动态运行时解决方案（和错误，如果有的话）。

ES6 模块 **没有** “内联”格式，它们必须被定义在一个分离的文件中（每个模块一个）。浏览器/引擎拥有一个默认的“模块加载器”（它是可以被覆盖的，但是这超出我们在此讨论的范围），它在模块被导入时同步地加载模块文件。

考虑这段代码：

**bar.js**

```js
function hello(who) {
	return "Let me introduce: " + who;
}

export hello;
```

**foo.js**

```js
// 仅导入“bar”模块中的`hello()`
import hello from "bar";

var hungry = "hippo";

function awesome() {
	console.log(
		hello( hungry ).toUpperCase()
	);
}

export awesome;
```

```js
// 导入`foo`和`bar`整个模块
module foo from "foo";
module bar from "bar";

console.log(
	bar.hello( "rhino" )
); // Let me introduce: rhino

foo.awesome(); // LET ME INTRODUCE: HIPPO
```

**注意：** 需要使用前两个代码片段中的内容分别创建两个分离的文件 **“foo.js”** 和 **“bar.js”**。然后，你的程序将加载/导入这些模块来使用它们，就像第三个片段那样。

`import` 在当前的作用域中导入一个模块的 API 的一个或多个成员，每个都绑定到一个变量（这个例子中是 `hello`）。`module` 将整个模块的 API 导入到一个被绑定的变量（这个例子中是 `foo`，`bar`）。`export` 为当前模块的公有 API 导出一个标识符（变量，函数）。在一个模块的定义中，这些操作符可以根据需要使用任意多次。

在 _模块文件_ 内部的内容被视为像是包围在一个作用域闭包中，就像早先看到的使用函数闭包的模块那样。

## 复习

对于那些还蒙在鼓里的人来说，闭包就像在 JavaScript 内部被隔离开的魔法世界，只有很少一些最勇敢的灵魂才能到达。但是它实际上只是一个标准的，而且几乎明显的事实 —— 我们如何在函数即是值，而且可以被随意传递的词法作用域环境中编写代码，

**闭包就是当一个函数即使是在它的词法作用域之外被调用时，也可以记住并访问它的词法作用域。**

如果我们不能小心地识别它们和它们的工作方式，闭包可能会绊住我们，例如在循环中。但它们也是一种极其强大的工具，以各种形式开启了像 _模块_ 这样的模式。

模块要求两个关键性质：1）一个被调用的外部包装函数，来创建外围作用域。2）这个包装函数的返回值必须包含至少一个内部函数的引用，这个函数才拥有包装函数内部作用域的闭包。

现在我们看到了闭包在我们的代码中无处不在，而且我们有能力识别它们，并为了我们自己的利益利用它们！