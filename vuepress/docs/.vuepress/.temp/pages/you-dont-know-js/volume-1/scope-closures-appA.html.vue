<template><div><h1 id="附录-a-动态作用域" tabindex="-1"><a class="header-anchor" href="#附录-a-动态作用域" aria-hidden="true">#</a> 附录 A：动态作用域</h1>
<p>在第二章中，作为与 JavaScript 中（事实上，其他大多数语言也是）作用域的工作方式模型 —— “词法作用域”的对比，我们谈到了“动态作用域”。</p>
<p>我们将简单地检视动态作用域，来彻底说明这种比较。但更重要的是，对于 JavaScript 中的另一种机制（<code v-pre>this</code>）来说动态作用域实际上是它的一个近亲表兄，我们将在本系列的“<em>this 与对象原型</em>”中详细讲解这种机制。</p>
<p>正如我们在第二章中看到的，词法作用域是一组关于 <em>引擎</em> 如何查询变量和它在何处能够找到变量的规则。词法作用域的关键性质是，它是在代码编写时被定义的（假定你不使用 <code v-pre>eval()</code> 或 <code v-pre>with</code> 作弊的话）。</p>
<p>动态作用域看起来在暗示，有充分的理由，存在这样一种模型，它的作用域是在运行时被确定的，而不是在编写时静态地确定的。让我们通过代码来说明这样的实际情况：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>foo()</code> 的词法作用域中指向 <code v-pre>a</code> 的 RHS 引用将被解析为全局变量 <code v-pre>a</code>，它将导致输出结果为值 <code v-pre>2</code>。</p>
<p>相比之下，动态作用域本身不关心函数和作用域是在哪里和如何被声明的，而是关心 <strong>它们是从何处被调用的</strong>。换句话说，它的作用域链条是基于调用栈的，而不是代码中作用域的嵌套。</p>
<p>所以，如果 JavaScript 拥有动态作用域，当 <code v-pre>foo()</code> 被执行时，<strong>理论上</strong> 下面的代码将得出 <code v-pre>3</code> 作为输出结果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3  (不是 2!)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这怎么可能？因为当 <code v-pre>foo()</code> 不能为 <code v-pre>a</code> 解析出一个变量引用时，它不会沿着嵌套的（词法）作用域链向上走一层，而是沿着调用栈向上走，以找到 <code v-pre>foo()</code> 是 <em>从何处</em> 被调用的。因为 <code v-pre>foo()</code> 是从 <code v-pre>bar()</code> 中被调用的，它就会在 <code v-pre>bar()</code> 的作用域中检查变量，并且在这里找到持有值 <code v-pre>3</code> 的 <code v-pre>a</code>。</p>
<p>奇怪吗？此时此刻你可能会这样认为。</p>
<p>但这可能只是因为你仅在拥有词法作用域的代码中工作过。所以动态作用域看起来陌生。如果你仅使用动态作用域的语言编写过代码，它看起来就是很自然的，而词法作用域将是个怪东西。</p>
<p>要清楚，JavaScript <strong>实际上没有动态作用域</strong>。它拥有词法作用域。就这么简单。但是 <code v-pre>this</code> 机制有些像动态作用域。</p>
<p>关键的差异：<strong>词法作用域是编写时的，而动态作用域（和 <code v-pre>this</code>）是运行时的</strong>。词法作用域关心的是 <em>函数在何处被声明</em>，但是动态作用域关心的是函数 <em>从何处</em> 被调用。</p>
<p>最后：<code v-pre>this</code> 关心的是 <em>函数是如何被调用的</em>，这揭示了 <code v-pre>this</code> 机制与动态作用域的想法有多么紧密的关联。要了解更多关于 <code v-pre>this</code> 的细节，请阅读 “<em>this 与对象原型</em>”。</p>
</div></template>


