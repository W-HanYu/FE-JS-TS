<template><div><h1 id="第1章-this-是什么" tabindex="-1"><a class="header-anchor" href="#第1章-this-是什么" aria-hidden="true">#</a> 第1章: <code v-pre>this</code> 是什么？</h1>
<p>JavaScript 中最令人困惑的机制之一就是 <code v-pre>this</code> 关键字。它是一个在每个函数作用域中自动定义的特殊标识符关键字，但即便是一些老练的 JavaScript 开发者也对它到底指向什么感到困扰。</p>
<blockquote>
<p>任何足够 <em>先进</em> 的技术都跟魔法没有区别。-- Arthur C. Clarke</p>
</blockquote>
<p>JavaScript 的 <code v-pre>this</code> 机制实际上没有 <em>那么</em> 先进，但是开发者们总是在大脑中插入“复杂”和“混乱”来解释这句话，毫无疑问，如果没有清晰的理解，在 <em>你的</em> 困惑中 <code v-pre>this</code> 可能看起来就是彻头彻尾的魔法。</p>
<p><strong>注意：</strong> “this”这个词是在一般的论述中极常用的代词。所以，特别是在口头论述中，很难确定我们是在将“this”作为一个代词使用，还是在将它作为一个实际的关键字标识符使用。为了表意清晰，我会总是使用 <code v-pre>this</code> 来代表特殊的关键字，而在其他情况下使用“this”或 <em>this</em> 或 this。</p>
<h2 id="为什么要用-this" tabindex="-1"><a class="header-anchor" href="#为什么要用-this" aria-hidden="true">#</a> 为什么要用 <code v-pre>this</code>？</h2>
<p>如果对于那些老练的 JavaScript 开发者来说 <code v-pre>this</code> 机制都是如此的令人费解，那么有人会问为什么这种机制会有用？它带来的麻烦不是比好处多吗？在讲解 <em>如何</em> 有用之前，我们应当先来看看 <em>为什么</em> 有用。</p>
<p>让我们试着展示一下 <code v-pre>this</code> 的动机和用途：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">identify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> greeting <span class="token operator">=</span> <span class="token string">"Hello, I'm "</span> <span class="token operator">+</span> <span class="token function">identify</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>greeting<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> me <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Kyle"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> you <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Reader"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">identify</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>me<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// KYLE</span>
<span class="token function">identify</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>you<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// READER</span>

<span class="token function">speak</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>me<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello, I'm KYLE</span>
<span class="token function">speak</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>you<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello, I'm READER</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果这个代码段 <em>如何</em> 工作让你困惑，不要担心！我们很快就会讲解它。只是简要地将这些问题放在旁边，以便于我们可以更清晰的探究 <em>为什么</em>。</p>
<p>这个代码片段允许 <code v-pre>identify()</code> 和 <code v-pre>speak()</code> 函数对多个 <em>环境</em> 对象（<code v-pre>me</code> 和 <code v-pre>you</code>）进行复用，而不是针对每个对象定义函数的分离版本。</p>
<p>与使用 <code v-pre>this</code> 相反地，你可以明确地将环境对象传递给 <code v-pre>identify()</code> 和 <code v-pre>speak()</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">identify</span><span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> context<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">speak</span><span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> greeting <span class="token operator">=</span> <span class="token string">"Hello, I'm "</span> <span class="token operator">+</span> <span class="token function">identify</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>greeting<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">identify</span><span class="token punctuation">(</span>you<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// READER</span>
<span class="token function">speak</span><span class="token punctuation">(</span>me<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello, I'm KYLE</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，<code v-pre>this</code> 机制提供了更优雅的方式来隐含地“传递”一个对象引用，导致更加干净的 API 设计和更容易的复用。</p>
<p>你的使用模式越复杂，你就会越清晰地看到：将执行环境作为一个明确参数传递，通常比传递 <code v-pre>this</code> 执行环境要乱。当我们探索对象和原型时，你将会看到一组可以自动引用恰当执行环境对象的函数是多么有用。</p>
<h2 id="困惑" tabindex="-1"><a class="header-anchor" href="#困惑" aria-hidden="true">#</a> 困惑</h2>
<p>我们很快就要开始讲解 <code v-pre>this</code> 是如何 <em>实际</em> 工作的，但我们首先要摒弃一些误解——它实际上 <em>不是</em> 如何工作的。</p>
<p>在开发者们用太过于字面的方式考虑“this”这个名字时就会产生困惑。这通常会产生两种臆测，但都是不对的。</p>
<h3 id="它自己" tabindex="-1"><a class="header-anchor" href="#它自己" aria-hidden="true">#</a> 它自己</h3>
<p>第一种常见的倾向是认为 <code v-pre>this</code> 指向函数自己。至少，这是一种语法上的合理推测。</p>
<p>为什么你想要在函数内部引用它自己？最常见的理由是递归（在函数内部调用它自己）这样的情形，或者是一个在第一次被调用时会解除自己绑定的事件处理器。</p>
<p>初次接触 JS 机制的开发者们通常认为，将函数作为一个对象（JavaScript 中所有的函数都是对象！），可以让你在方法调用之间储存 <em>状态</em>（属性中的值）。这当然是可能的，而且有一些有限的用处，但这本书的其余部分将会阐述许多其他的模式，提供比函数对象 <em>更好</em> 的地方来存储状态。</p>
<p>过一会儿我们将探索一个模式，来展示 <code v-pre>this</code> 是如何不让一个函数像我们可能假设的那样，得到它自身的引用的。</p>
<p>考虑下面的代码，我们试图追踪函数(<code v-pre>foo</code>)被调用了多少次：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"foo: "</span> <span class="token operator">+</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 追踪 `foo` 被调用了多少次</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

foo<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> i<span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">></span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">foo</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// foo: 6</span>
<span class="token comment">// foo: 7</span>
<span class="token comment">// foo: 8</span>
<span class="token comment">// foo: 9</span>

<span class="token comment">// `foo` 被调用了多少次？</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0 -- 这他妈怎么回事……？</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>foo.count</code> <em>依然</em> 是 <code v-pre>0</code>, 即便四个 <code v-pre>console.log</code> 语句明明告诉我们 <code v-pre>foo(..)</code> 实际上被调用了四次。这种挫败来源于对于 <code v-pre>this</code>（在 <code v-pre>this.count++</code> 中）的含义进行了 <em>过于字面化</em> 的解释。</p>
<p>当代码执行 <code v-pre>foo.count = 0</code> 时，它确实向函数对象 <code v-pre>foo</code> 添加了一个 <code v-pre>count</code> 属性。但是对于函数内部的 <code v-pre>this.count</code> 引用，<code v-pre>this</code> 其实 <em>根本就不</em> 指向那个函数对象，即便属性名称一样，但根对象也不同，因而产生了混淆。</p>
<p><strong>注意：</strong> 一个负责任的开发者 <em>应当</em> 在这里提出一个问题：“如果我递增的 <code v-pre>count</code> 属性不是我以为的那个，那是哪个 <code v-pre>count</code> 被我递增了？”。实际上，如果他再挖的深一些，他会发现自己不小心创建了一个全局变量 <code v-pre>count</code>（第二章解释了这是 <em>如何</em> 发生的！），而且它当前的值是 <code v-pre>NaN</code>。当然，一旦他发现这个不寻常的结果后，他会有一堆其他的问题：“它怎么是全局的？为什么它是 <code v-pre>NaN</code> 而不是某个正确的计数值？”。（见第二章）</p>
<p>与停在这里来深究为什么 <code v-pre>this</code> 引用看起来不是如我们 <em>期待</em> 的那样工作，并且回答那些尖锐且重要的问题相反，许多开发者简单地完全回避这个问题，转向一些其他的另类解决方法，比如创建另一个对象来持有 <code v-pre>count</code> 属性：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"foo: "</span> <span class="token operator">+</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 追踪 `foo` 被调用了多少次</span>
  data<span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> i<span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">></span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">foo</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// foo: 6</span>
<span class="token comment">// foo: 7</span>
<span class="token comment">// foo: 8</span>
<span class="token comment">// foo: 9</span>

<span class="token comment">// `foo` 被调用了多少次？</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这种方式“解决”了问题是事实，但不幸的是它简单地忽略了真正的问题 —— 缺乏对于 <code v-pre>this</code> 的含义和其工作方式上的理解 —— 反而退回到了一个他更加熟悉的机制的舒适区：词法作用域。</p>
<p><strong>注意：</strong> 词法作用域是一个完善且有用的机制；我不是在用任何方式贬低它的作用（参见本系列的 <em>&quot;作用域与闭包&quot;</em>）。但在如何使用 <code v-pre>this</code> 这个问题上总是靠 <em>猜</em>，而且通常都猜 <em>错</em>，并不是一个退回到词法作用域，而且从不学习 <em>为什么</em> <code v-pre>this</code> 不跟你合作的好理由。</p>
<p>为了从函数对象内部引用它自己，一般来说通过 <code v-pre>this</code> 是不够的。你通常需要通过一个指向它的词法标识符（变量）得到函数对象的引用。</p>
<p>考虑这两个函数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  foo<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span> <span class="token comment">// `foo` 引用它自己</span>
<span class="token punctuation">}</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 匿名函数（没有名字）不能引用它自己</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个函数，称为“命名函数”，<code v-pre>foo</code> 是一个引用，可以用于在它内部引用自己。</p>
<p>但是在第二个例子中，传递给 <code v-pre>setTimeout(..)</code> 的回调函数没有名称标识符（所以被称为“匿名函数”），所以没有合适的办法引用函数对象自己。</p>
<p><strong>注意：</strong> 在函数中有一个老牌儿但是现在被废弃的，而且令人皱眉头的 <code v-pre>arguments.callee</code> 引用 <em>也</em> 指向当前正在执行的函数的函数对象。这个引用通常是匿名函数在自己内部访问函数对象的唯一方法。然而，最佳的办法是完全避免使用匿名函数，至少是对于那些需要自引用的函数，而使用命名函数（表达式）。<code v-pre>arguments.callee</code> 已经被废弃而且不应该再使用。</p>
<p>对于当前我们的例子来说，另一个 <em>好用的</em> 解决方案是在每一个地方都使用 <code v-pre>foo</code> 标识符作为函数对象的引用，而根本不用<code v-pre>this</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"foo: "</span> <span class="token operator">+</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 追踪 `foo` 被调用了多少次</span>
  foo<span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

foo<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> i<span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">></span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">foo</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// foo: 6</span>
<span class="token comment">// foo: 7</span>
<span class="token comment">// foo: 8</span>
<span class="token comment">// foo: 9</span>

<span class="token comment">// `foo` 被调用了多少次？</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，这种方法也类似地回避了对 <code v-pre>this</code> 的 <em>真正</em> 理解，而且完全依靠变量 <code v-pre>foo</code> 的词法作用域。</p>
<p>另一种解决这个问题的方法是强迫 <code v-pre>this</code> 指向 <code v-pre>foo</code> 函数对象：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"foo: "</span> <span class="token operator">+</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 追踪 `foo` 被调用了多少次</span>
  <span class="token comment">// 注意：由于 `foo` 的被调用方式（见下方），`this` 现在确实是 `foo`</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

foo<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> i<span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">></span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 使用 `call(..)`，我们可以保证 `this` 指向函数对象(`foo`)</span>
    <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// foo: 6</span>
<span class="token comment">// foo: 7</span>
<span class="token comment">// foo: 8</span>
<span class="token comment">// foo: 9</span>

<span class="token comment">// `foo` 被调用了多少次？</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>与回避 <code v-pre>this</code> 相反，我们接受它。</strong> 我们马上将会更完整地讲解这样的技术 <em>如何</em> 工作，所以如果你依然有点儿糊涂，不要担心！</p>
<h3 id="它的作用域" tabindex="-1"><a class="header-anchor" href="#它的作用域" aria-hidden="true">#</a> 它的作用域</h3>
<p>对 <code v-pre>this</code> 的含义第二常见的误解，是它不知怎的指向了函数的作用域。这是一个刁钻的问题，因为在某一种意义上它有正确的部分，而在另外一种意义上，它是严重的误导。</p>
<p>明确地说，<code v-pre>this</code> 不会以任何方式指向函数的 <strong>词法作用域</strong>。作用域好像是一个将所有可用标识符作为属性的对象，这从内部来说是对的。但是 JavasScript 代码不能访问作用域“对象”。它是 <em>引擎</em> 的内部实现。</p>
<p>考虑下面代码，它（失败的）企图跨越这个边界，用 <code v-pre>this</code> 来隐含地引用函数的词法作用域：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个代码段里不只有一个错误。虽然它看起来是在故意瞎搞，但你看到的这段代码，提取自在公共社区的帮助论坛中被交换的真实代码。真是难以想象对 <code v-pre>this</code> 的臆想是多么的误导人。</p>
<p>首先，试图通过 <code v-pre>this.bar()</code> 来引用 <code v-pre>bar()</code> 函数。它几乎可以说是 <em>碰巧</em> 能够工作，我们过一会儿再解释它是 <em>如何</em> 工作的。调用 <code v-pre>bar()</code> 最自然的方式是省略开头的 <code v-pre>this.</code>，而仅使用标识符进行词法引用。</p>
<p>然而，写下这段代码的开发者试图用 <code v-pre>this</code> 在 <code v-pre>foo()</code> 和 <code v-pre>bar()</code> 的词法作用域间建立一座桥，使得<code v-pre>bar()</code> 可以访问 <code v-pre>foo()</code>内部作用域的变量 <code v-pre>a</code>。<strong>这样的桥是不可能的。</strong> 你不能使用 <code v-pre>this</code> 引用在词法作用域中查找东西。这是不可能的。</p>
<p>每当你感觉自己正在试图使用 <code v-pre>this</code> 来进行词法作用域的查询时，提醒你自己：<em>这里没有桥</em>。</p>
<h2 id="什么是-this" tabindex="-1"><a class="header-anchor" href="#什么是-this" aria-hidden="true">#</a> 什么是 <code v-pre>this</code>？</h2>
<p>我们已经列举了各种不正确的臆想，现在让我们把注意力转移到 <code v-pre>this</code> 机制是如何真正工作的。</p>
<p>我们早先说过，<code v-pre>this</code> 不是编写时绑定，而是运行时绑定。它依赖于函数调用的上下文条件。<code v-pre>this</code> 绑定与函数声明的位置没有任何关系，而与函数被调用的方式紧密相连。</p>
<p>当一个函数被调用时，会建立一个称为执行环境的活动记录。这个记录包含函数是从何处（调用栈 —— call-stack）被调用的，函数是 <em>如何</em> 被调用的，被传递了什么参数等信息。这个记录的属性之一，就是在函数执行期间将被使用的 <code v-pre>this</code> 引用。</p>
<p>下一章中，我们将会学习寻找函数的 <strong>调用点（call-site）</strong> 来判定它的执行如何绑定 <code v-pre>this</code>。</p>
<h2 id="复习" tabindex="-1"><a class="header-anchor" href="#复习" aria-hidden="true">#</a> 复习</h2>
<p>对于那些没有花时间学习 <code v-pre>this</code> 绑定机制如何工作的 JavaScript 开发者来说，<code v-pre>this</code> 绑定一直是困惑的根源。对于 <code v-pre>this</code> 这么重要的机制来说，猜测、试错、或者盲目地从 Stack Overflow 的回答中复制粘贴，都不是有效或正确利用它的方法。</p>
<p>为了学习 <code v-pre>this</code>，你必须首先学习 <code v-pre>this</code><em>不是</em> 什么，不论是哪种把你误导至何处的臆测或误解。<code v-pre>this</code> 既不是函数自身的引用，也不是函数 <em>词法</em> 作用域的引用。</p>
<p><code v-pre>this</code> 实际上是在函数被调用时建立的一个绑定，它指向 <em>什么</em> 是完全由函数被调用的调用点来决定的。</p>
</div></template>


