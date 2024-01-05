---
title: 1. TypeScript 泛型中的 K、T 和 V 是什么？
date: 2023/11/26
---

# TypeScript 泛型中的 K、T 和 V 是什么？

![1](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*NXvlzFcY5a50_wf137qjjQ.jpeg)

欢迎来到掌握 TypeScript 系列。本系列将以动画的形式介绍 TypeScript 的核心知识和技术。一起来学习吧!

当你第一次看到 TypeScript 泛型中的 `T` 时，是不是觉得很奇怪？

<!-- ![](../assets/article/01.gif) -->

该公式称为泛型类型参数，它是我们希望传递给恒等函数的类型占位符。

就像传递参数一样，我们获取用户指定的实际类型并将其链接到参数类型和返回值类型。

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*58mhLNgQAejgD8p_S0UjNw.gif)

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*SYbldGfuNQhNmE4-Lv4bdQ.jpeg)

那么 `T` 是什么意思呢？图中的泛型类型参数 `T` 代表 `Type`，实际上 `T` 可以替换为任何有效的名称。除了 `T` 之外，常见的泛型变量还有 `K`、`V`、`E` 等。

- K(Key)：表示对象中 key 的类型
- V(Value)：表示对象中值的类型
- E(Element)：表示元素类型

![](https://youjia.sx.cn/you-dont-know-ts/assets/04.5831239b.gif)

当然，你不必只定义一个类型参数，你可以引入任意数量的类型参数。这里我们引入一个新的类型参数 U，它扩展了我们定义的恒等函数。

![](https://youjia.sx.cn/you-dont-know-ts/assets/05.bf472a28.gif)

![](https://youjia.sx.cn/you-dont-know-ts/assets/06.296df9c9.webp)

在调用 identity 函数时，我们可以显式指定泛型参数的实际类型。当然，你也可以不指定泛型参数的类型，让 TypeScript 自动帮我们完成类型推断。

![](https://youjia.sx.cn/you-dont-know-ts/assets/07.8f0c094d.gif)

![](https://youjia.sx.cn/you-dont-know-ts/assets/08.9d577f89.webp)

看完上面的动画，你是否已经了解泛型类型参数了？

If you like to learn TypeScript in the form of animation, you can follow me on Medium or Twitter to read more about TS and JS!
