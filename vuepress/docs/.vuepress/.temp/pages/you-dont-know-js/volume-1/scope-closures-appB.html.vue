<template><div><h1 id="附录-b-填补块作用域" tabindex="-1"><a class="header-anchor" href="#附录-b-填补块作用域" aria-hidden="true">#</a> 附录 B：填补块作用域</h1>
<p>在第三章中，我们探索了块作用域。我们看到最早在 ES3 中引入的 <code v-pre>with</code> 和 <code v-pre>catch</code> 子句都是存在于 JavaScript 中的块儿作用域的小例子。</p>
<p>但是 ES6 引入的 <code v-pre>let</code> 最终使我们的代码有了完整的，不受约束的块作用域能力。不论是在功能上还是在代码风格上，块作用域都使许多激动人心的事情成为可能。</p>
<p>但要是我们想在前 ES6 环境中使用块作用域呢？</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它在 ES6 环境下工作的非常好。但是我们能在前 ES6 中这么做吗？<code v-pre>catch</code> 就是答案。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>哇！这真是难看和奇怪的代码。我们看到一个 <code v-pre>try/catch</code> 似乎强制抛出一个错误，但是这个它抛出的“错误”只是一个值 <code v-pre>2</code>。然后接收它的变量声明是在 <code v-pre>catch(a)</code> 子句中。三观：毁尽。</p>
<p>没错，<code v-pre>catch</code> 子句拥有块作用域，这意味着它可以被用于在前 ES6 环境中填补块作用域。</p>
<p>“但是……”，你说。“……没人愿意写这么丑的代码！”你是对的。也没人编写由 CoffeeScript 编译器输出的（某些）代码。这不是重点。</p>
<p>重点是工具可以将 ES6 代码转译为能够在前 ES6 环境中工作的代码。你可以使用块作用域编写代码，并从这样的功能中获益，然后让一个编译工具来掌管生成将在部署之后实际 <em>工作</em> 的代码。</p>
<p>这实际上是所有（嗯哼，大多数）ES6 特性首选的迁移路径：在从前 ES6 到 ES6 的转变过程中，使用一个代码转译器将 ES6 代码转换为 ES5 兼容的代码。</p>
<h2 id="traceur" tabindex="-1"><a class="header-anchor" href="#traceur" aria-hidden="true">#</a> Traceur</h2>
<p>Google 维护着一个称为“Traceur”的项目，它的任务正是为了广泛使用 ES6 特性而将它转译为前 ES6（大多数是 ES5，但不是全部！）代码。TC39 协会依赖这个工具（和其他的工具）来测试他们所规定的特性的语义。</p>
<p>Traceur 将从我们的代码段中产生出什么？你猜对了！</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，使用这种工具，我们可以开始利用块儿作用域，无论我们是否面向 ES6，因为 <code v-pre>try/catch</code> 从 ES3 那时就开始存在了（并且这样工作）。</p>
<h2 id="隐含的与明确的块儿" tabindex="-1"><a class="header-anchor" href="#隐含的与明确的块儿" aria-hidden="true">#</a> 隐含的与明确的块儿</h2>
<p>在第三章中，在我们介绍块作用域时，我们认识了一些关于代码可维护性/可重构性的潜在陷阱。有什么其他的方法可以利用块作用域同时减少这些负面影响吗？</p>
<p>考虑一下 <code v-pre>let</code> 的这种形式，它被称为“let 块儿”或“let 语句”（和以前的“let 声明”对比来说）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token punctuation">(</span>a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与隐含地劫持一个既存的块儿不同，let 语句为它的作用域绑定明确地创建了一个块儿。这个明确的块儿不仅更显眼，而且在代码重构方面健壮得多，从文法上讲，它通过强制所有的声明都位于块的顶部而产生了某种程度上更干净的代码。这使任何块都更易于观察，更易于知道什么属于这个作用域和什么不属于这个作用域。</p>
<p>作为一种模式，它是与许多人在函数作用域中采纳的方式相对称的 —— 它们手动地将所有<code v-pre>var</code>声明移动/提升到函数的顶部。let 语句有意地将它们放在块儿的顶部，而且如果你没有通篇到处使用 <code v-pre>let</code> 声明，那么你的块儿作用域声明就会在某种程度上更易于识别和维护。</p>
<p>但是，这里有一个问题。let 语句的形式没有包含在 ES6 中。就连官方的 Traceur 编译器也不接受这种形式的代码。</p>
<p>我们有两个选择。我们可以使用 ES6 合法的语法格式化，再加上一点儿代码规则：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/*let*/</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，工具就意味着要解决我们的问题。所以另一个选项是编写明确的 let 语句块儿，并让工具将他转换为合理的，可以工作的代码。</p>
<p>所以，我建造了一个称为“let-er”的工具来解决这个问题。<em>let-er</em> 是一个编译期代码转译器，它唯一的任务就是找到 let 语句形式并转译它们。它将你的代码其他部分原封不动地留下，包括任何 let 声明。你可以安全地将 <em>let-er</em> 用于 ES6 转译器的第一步，然后如果有需要，你可以将你的代码通过 <code v-pre>Traceur</code> 这样的东西。</p>
<p>另外，<em>let-er</em> 有一个配置标志 <code v-pre>--es6</code>，当它打开时（默认是关闭），会改变生成的代码的种类。与使用 <code v-pre>try/catch</code> 的 ES3 填补黑科技不同的是，<em>let-er</em> 将拿着我们的代码并产生完全兼容 ES6 的代码，没有黑科技：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，你可以立即开始使用 <em>let-er</em>，而且可以面向所有前 ES6 环境，当你仅关心 ES6 时，你可以加入配置标志并立即仅面向 ES6。</p>
<p>而且最重要的是，<strong>你可以使用更好的和更明确的 let 语句形式</strong>，即便它（还）不是任何 ES 官方版本的一部分。</p>
<h2 id="性能" tabindex="-1"><a class="header-anchor" href="#性能" aria-hidden="true">#</a> 性能</h2>
<p>让我在 <code v-pre>try/catch</code> 的性能问题上加入最后一个快速的说明，并/或解决这个问题：“为什么不使用一个 IIFE 来创建作用域？”</p>
<p>首先，<code v-pre>try/catch</code> 的性能 <em>是</em> 慢一些，但是没有任何合理的假设表明它 <em>必须</em> 是这样，或者它 <em>总是</em> 这样。因为 TC39 认可的官方 ES6 转译器使用 <code v-pre>try/catch</code>，Traceur 团队已经让 Chrome 去改进 <code v-pre>try/catch</code> 的性能了，而且它们有很明显的动力这样做。</p>
<p>第二，IIFE 和 <code v-pre>try/catch</code> 不是一个合理的“苹果对苹果”的比较，因为一个包装着任意代码的函数改变了这段代码的含义，以及它的 <code v-pre>this</code>、<code v-pre>return</code>、<code v-pre>break</code>、和 <code v-pre>continue</code> 的含义。IIFE 不是一个合适一般替代品。它只能在特定的情况下手动使用。</p>
<p>真正的问题变成了：你是否想要使用块儿作用域。如果是，这些工具给你提供了这些选择。如果不，那就在你的代码中继续使用 <code v-pre>var</code>！</p>
</div></template>


