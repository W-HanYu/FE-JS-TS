<template><div><h1 id="附录-c-this-词法" tabindex="-1"><a class="header-anchor" href="#附录-c-this-词法" aria-hidden="true">#</a> 附录 C：this 词法</h1>
<p>这本书通篇没有讲解 <code v-pre>this</code> 机制的任何细节，有一个 ES6 的话题以一种重要的方式将 <code v-pre>this</code> 与词法作用域联系了起来，我们将快速检视它一下。</p>
<p>ES6 为函数声明增加了一种特殊的语法形式，称为“箭头函数”。它看起来像这样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个所谓的“大箭头”经常被称为是 <em>乏味烦冗的</em>（讽刺）<code v-pre>function</code> 关键字的缩写。</p>
<p>但是在箭头函数上发生的一些事情要重要得多，而且这与在你的声明中少敲几下键盘无关。</p>
<p>简单地说，这段代码有一个问题：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">"awesome"</span><span class="token punctuation">,</span>
  <span class="token function-variable function">cool</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">coolFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> id <span class="token operator">=</span> <span class="token string">"not awesome"</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span><span class="token function">cool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// awesome</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>cool<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// not awesome</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个问题就是在 <code v-pre>cool()</code> 函数上丢失了 <code v-pre>this</code> 绑定。有各种方法可以解决这个问题，但一个经常被重复的解决方案是 <code v-pre>var self = this;</code>。</p>
<p>它可能看起来像：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token function-variable function">cool</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">coolFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>count <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        self<span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"awesome?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span><span class="token function">cool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// awesome?</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用不过于深入细节的方式讲，<code v-pre>var self = this</code> 的“解决方案”免除了理解和正确使用 <code v-pre>this</code> 绑定的整个问题，而是退回到我们也许感到更舒服的东西上面：词法作用域。<code v-pre>self</code> 变成了一个可以通过词法作用域和闭包解析的标识符，而且一直不关心 <code v-pre>this</code> 绑定发生了什么。</p>
<p>人们不喜欢写繁冗的东西，特别是当他们一次又一次重复它的时候。于是，ES6 的一个动机是帮助缓和这些场景，将常见的惯用法问题 <em>固定</em> 下来，就像这一个。</p>
<p>ES6 的解决方案，箭头函数，引入了一种称为“词法 this”的行为。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token function-variable function">cool</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">coolFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 箭头函数能好用？</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"awesome?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span><span class="token function">cool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// awesome?</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单的解释是，当箭头函数遇到它们的 <code v-pre>this</code> 绑定时，它们的行为与一般的函数根本不同。它们摒弃了 <code v-pre>this</code> 绑定的所有一般规则，而是采用它们的直接外围词法作用域的 <code v-pre>this</code> 的值，无论它是什么。</p>
<p>于是，在这个代码段中，箭头函数不会以不可预知的方式丢掉 <code v-pre>this</code> 绑定，它只是“继承” <code v-pre>cool()</code> 函数的 <code v-pre>this</code> 绑定（如果像我们展示的那样调用它就是正确的！）。</p>
<p>虽然这使代码更短，但在我看来，箭头函数只不过是将一个开发者们常犯的错误固化成了语言的语法，这混淆了“this 绑定”规则与“词法作用域”规则。</p>
<p>换一种说法：为什么要使用 <code v-pre>this</code> 风格的编码形式来招惹麻烦和繁冗？只要通过将它与词法作用域混合把它剔除掉就好。对于给定的一段代码只采纳一种方式或另一种看起来才是自然的，而不是在同一段代码中将它们混在一起。</p>
<p><strong>注意：</strong> 源自箭头函数的另一个非议是，它们是匿名的，不是命名的。参见第三章来了解为什么匿名函数不如命名函数理想的原因。</p>
<p>在我看来，这个“问题”的更恰当的解决方式是，正确地使用并接受<code v-pre>this</code>机制。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token function-variable function">cool</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">coolFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span>
        <span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token comment">// `this` 因为 `bind(..)` 所以安全</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"more awesome"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token number">100</span>
      <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 看，`bind()`!</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span><span class="token function">cool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// more awesome</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不管你是偏好箭头函数的新的词法 this 行为，还是偏好经得起考验的 <code v-pre>bind()</code>，重要的是要注意箭头函数 <strong>不</strong> 仅仅是关于可以少打一些“function”。</p>
<p>它们拥有一种我们应当学习并理解的，<em>有意的行为上的不同</em>，而且如果我们这样选择，就可以利用它们。</p>
<p>现在我们完全理解了词法作用域（和闭包！），理解词法 this 应该是小菜一碟！</p>
</div></template>


