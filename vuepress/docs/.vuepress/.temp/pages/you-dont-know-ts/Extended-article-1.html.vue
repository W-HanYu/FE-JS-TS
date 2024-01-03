<template><div><h1 id="typescript-泛型中的-k、t-和-v-是什么" tabindex="-1"><a class="header-anchor" href="#typescript-泛型中的-k、t-和-v-是什么" aria-hidden="true">#</a> TypeScript 泛型中的 K、T 和 V 是什么？</h1>
<p><img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*NXvlzFcY5a50_wf137qjjQ.jpeg" alt="1"></p>
<p>欢迎来到掌握 TypeScript 系列。本系列将以动画的形式介绍 TypeScript 的核心知识和技术。一起来学习吧!</p>
<p>当你第一次看到 TypeScript 泛型中的 <code v-pre>T</code> 时，是不是觉得很奇怪？</p>
<p><img src="@source/assets/article/01.gif" alt=""></p>
<p>该公式称为泛型类型参数，它是我们希望传递给恒等函数的类型占位符。</p>
<p>就像传递参数一样，我们获取用户指定的实际类型并将其链接到参数类型和返回值类型。</p>
<p><img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*58mhLNgQAejgD8p_S0UjNw.gif" alt=""></p>
<p><img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*SYbldGfuNQhNmE4-Lv4bdQ.jpeg" alt=""></p>
<p>那么 <code v-pre>T</code> 是什么意思呢？图中的泛型类型参数 <code v-pre>T</code> 代表 <code v-pre>Type</code>，实际上 <code v-pre>T</code> 可以替换为任何有效的名称。除了 <code v-pre>T</code> 之外，常见的泛型变量还有 <code v-pre>K</code>、<code v-pre>V</code>、<code v-pre>E</code> 等。</p>
<ul>
<li>K(Key)：表示对象中 key 的类型</li>
<li>V(Value)：表示对象中值的类型</li>
<li>E(Element)：表示元素类型</li>
</ul>
<p><img src="https://youjia.sx.cn/you-dont-know-ts/assets/04.5831239b.gif" alt=""></p>
<p>当然，你不必只定义一个类型参数，你可以引入任意数量的类型参数。这里我们引入一个新的类型参数 U，它扩展了我们定义的恒等函数。</p>
<p><img src="https://youjia.sx.cn/you-dont-know-ts/assets/05.bf472a28.gif" alt=""></p>
<p><img src="https://youjia.sx.cn/you-dont-know-ts/assets/06.296df9c9.webp" alt=""></p>
<p>在调用 identity 函数时，我们可以显式指定泛型参数的实际类型。当然，你也可以不指定泛型参数的类型，让 TypeScript 自动帮我们完成类型推断。</p>
<p><img src="https://youjia.sx.cn/you-dont-know-ts/assets/07.8f0c094d.gif" alt=""></p>
<p><img src="https://youjia.sx.cn/you-dont-know-ts/assets/08.9d577f89.webp" alt=""></p>
<p>看完上面的动画，你是否已经了解泛型类型参数了？</p>
<p>If you like to learn TypeScript in the form of animation, you can follow me on Medium or Twitter to read more about TS and JS!</p>
</div></template>


