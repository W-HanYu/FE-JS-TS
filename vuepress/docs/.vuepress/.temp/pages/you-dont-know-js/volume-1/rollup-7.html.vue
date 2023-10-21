<template><div><h1 id="第2章-this-全面解析" tabindex="-1"><a class="header-anchor" href="#第2章-this-全面解析" aria-hidden="true">#</a> 第2章: <code v-pre>this</code> 全面解析 ！</h1>
<p>在第一章中，我们摒弃了种种对 <code v-pre>this</code> 的误解，并且知道了 <code v-pre>this</code> 是一个完全根据<strong>调用点</strong>（函数是如何被调用的）而为每次函数调用建立的绑定。</p>
<h2 id="调用点-call-site" tabindex="-1"><a class="header-anchor" href="#调用点-call-site" aria-hidden="true">#</a> 调用点（Call-site）</h2>
<p>为了理解 <code v-pre>this</code> 绑定，我们不得不理解调用点：函数在代码中被调用的位置（<strong>不是被声明的位置</strong>）。我们必须考察调用点来回答这个问题：这个 <code v-pre>this</code> 指向什么？</p>
<p>一般来说寻找调用点就是：“找到一个函数是在哪里被调用的”，但它不总是那么简单，比如某些特定的编码模式会使 <em>真正的</em> 调用点变得不那么明确。</p>
<p>考虑 <strong>调用栈（call-stack）</strong> （使我们到达当前执行位置而被调用的所有方法的堆栈）是十分重要的。我们关心的调用点就位于当前执行中的函数 <em>之前</em> 的调用。</p>
<p>我们来展示一下调用栈和调用点：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 调用栈是: `baz`</span>
    <span class="token comment">// 我们的调用点是 global scope（全局作用域）</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"baz"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;-- `bar` 的调用点</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 调用栈是: `baz` -> `bar`</span>
    <span class="token comment">// 我们的调用点位于 `baz`</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"bar"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;-- `foo` 的 call-site</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 调用栈是: `baz` -> `bar` -> `foo`</span>
    <span class="token comment">// 我们的调用点位于 `bar`</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"foo"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;-- `baz` 的调用点</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在分析代码来寻找（从调用栈中）真正的调用点时要小心，因为它是影响 <code v-pre>this</code> 绑定的唯一因素。</p>
<p><strong>注意：</strong> 你可以通过按顺序观察函数的调用链在你的大脑中建立调用栈的视图，就像我们在上面代码段中的注释那样。但是这很痛苦而且易错。另一种观察调用栈的方式是使用你的浏览器的调试工具。大多数现代的桌面浏览器都内建开发者工具，其中就包含 JS 调试器。在上面的代码段中，你可以在调试工具中为 <code v-pre>foo()</code> 函数的第一行设置一个断点，或者简单的在这第一行上插入一个 <code v-pre>debugger</code> 语句。当你运行这个网页时，调试工具将会停止在这个位置，并且向你展示一个到达这一行之前所有被调用过的函数的列表，这就是你的调用栈。所以，如果你想调查<code v-pre>this</code> 绑定，可以使用开发者工具取得调用栈，之后从上向下找到第二个记录，那就是你真正的调用点。</p>
<h2 id="仅仅是规则" tabindex="-1"><a class="header-anchor" href="#仅仅是规则" aria-hidden="true">#</a> 仅仅是规则</h2>
<p>现在我们将注意力转移到调用点 <em>如何</em> 决定在函数执行期间 <code v-pre>this</code> 指向哪里。</p>
<p>你必须考察调用点并判定4种规则中的哪一种适用。我们将首先独立地解释一下这4种规则中的每一种，之后我们来展示一下如果有多种规则可以适用于调用点时，它们的优先顺序。</p>
<h3 id="默认绑定-default-binding" tabindex="-1"><a class="header-anchor" href="#默认绑定-default-binding" aria-hidden="true">#</a> 默认绑定（Default Binding）</h3>
<p>我们要考察的第一种规则源于函数调用的最常见的情况：独立函数调用。可以认为这种 <code v-pre>this</code> 规则是在没有其他规则适用时的默认规则。</p>
<p>考虑这个代码段：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一点要注意的，如果你还没有察觉到，是在全局作用域中的声明变量，也就是<code v-pre>var a = 2</code>，是全局对象的同名属性的同义词。它们不是互相拷贝对方，它们 <em>就是</em> 彼此。正如一个硬币的两面。</p>
<p>第二，我们看到当<code v-pre>foo()</code>被调用时，<code v-pre>this.a</code>解析为我们的全局变量<code v-pre>a</code>。为什么？因为在这种情况下，对此方法调用的 <code v-pre>this</code> 实施了 <em>默认绑定</em>，所以使 <code v-pre>this</code> 指向了全局对象。</p>
<p>我们怎么知道这里适用 <em>默认绑定</em> ？我们考察调用点来看看 <code v-pre>foo()</code> 是如何被调用的。在我们的代码段中，<code v-pre>foo()</code> 是被一个直白的，毫无修饰的函数引用调用的。没有其他的我们将要展示的规则适用于这里，所以 <em>默认绑定</em> 在这里适用。</p>
<p>如果 <code v-pre>strict mode</code> 在这里生效，那么对于 <em>默认绑定</em> 来说全局对象是不合法的，所以 <code v-pre>this</code> 将被设置为 <code v-pre>undefined</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token string">"use strict"</span><span class="token punctuation">;</span>

	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// TypeError: `this` is `undefined`</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个微妙但是重要的细节是：即便所有的 <code v-pre>this</code> 绑定规则都是完全基于调用点的，但如果 <code v-pre>foo()</code> 的 <strong>内容</strong> 没有在 <code v-pre>strict mode</code> 下执行，对于 <em>默认绑定</em> 来说全局对象是 <strong>唯一</strong> 合法的；<code v-pre>foo()</code> 的调用点的 <code v-pre>strict mode</code> 状态与此无关。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token string">"use strict"</span><span class="token punctuation">;</span>

	<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 在你的代码中故意混用 <code v-pre>strict mode</code> 和非 <code v-pre>strict mode</code> 通常是让人皱眉头的。你的程序整体可能应当不是 <strong>Strict</strong> 就是 <strong>非 Strict</strong>。然而，有时你可能会引用与你的 <strong>Strict</strong> 模式不同的第三方包，所以对这些微妙的兼容性细节要多加小心。</p>
<h3 id="隐含绑定-implicit-binding" tabindex="-1"><a class="header-anchor" href="#隐含绑定-implicit-binding" aria-hidden="true">#</a> 隐含绑定（Implicit Binding）</h3>
<p>另一种要考虑的规则是：调用点是否有一个环境对象（context object），也称为拥有者（owning）或容器（containing）对象，虽然这些名词可能有些误导人。</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
	<span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，注意 <code v-pre>foo()</code> 被声明然后作为引用属性添加到 <code v-pre>obj</code> 上的方式。无论 <code v-pre>foo()</code> 是否一开始就在 <code v-pre>obj</code> 上被声明，还是后来作为引用添加（如上面代码所示），这个 <strong>函数</strong> 都不被 <code v-pre>obj</code> 所真正“拥有”或“包含”。</p>
<p>然而，调用点 <em>使用</em> <code v-pre>obj</code> 环境来 <strong>引用</strong> 函数，所以你 <em>可以说</em> <code v-pre>obj</code> 对象在函数被调用的时间点上“拥有”或“包含”这个 <strong>函数引用</strong>。</p>
<p>不论你怎样称呼这个模式，在 <code v-pre>foo()</code> 被调用的位置上，它被冠以一个指向 <code v-pre>obj</code> 的对象引用。当一个方法引用存在一个环境对象时，<em>隐含绑定</em> 规则会说：是这个对象应当被用于这个函数调用的 <code v-pre>this</code> 绑定。</p>
<p>因为 <code v-pre>obj</code> 是 <code v-pre>foo()</code> 调用的 <code v-pre>this</code>，所以 <code v-pre>this.a</code> 就是 <code v-pre>obj.a</code> 的同义词。</p>
<p>只有对象属性引用链的最后一层是影响调用点的。比如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">42</span><span class="token punctuation">,</span>
	<span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
	<span class="token literal-property property">obj2</span><span class="token operator">:</span> obj2
<span class="token punctuation">}</span><span class="token punctuation">;</span>

obj1<span class="token punctuation">.</span>obj2<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="隐含丢失-implicitly-lost" tabindex="-1"><a class="header-anchor" href="#隐含丢失-implicitly-lost" aria-hidden="true">#</a> 隐含丢失（Implicitly Lost）</h4>
<p><code v-pre>this</code> 绑定最常让人沮丧的事情之一，就是当一个 <em>隐含绑定</em> 丢失了它的绑定，这通常意味着它会退回到 <em>默认绑定</em>， 根据 <code v-pre>strict mode</code> 的状态，其结果不是全局对象就是 <code v-pre>undefined</code>。</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
	<span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> bar <span class="token operator">=</span> obj<span class="token punctuation">.</span>foo<span class="token punctuation">;</span> <span class="token comment">// 函数引用！</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"oops, global"</span><span class="token punctuation">;</span> <span class="token comment">// `a` 也是一个全局对象的属性</span>

<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "oops, global"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管 <code v-pre>bar</code> 似乎是 <code v-pre>obj.foo</code> 的引用，但实际上它只是另一个 <code v-pre>foo</code> 本身的引用而已。另外，起作用的调用点是 <code v-pre>bar()</code>，一个直白，毫无修饰的调用，因此 <em>默认绑定</em> 适用于这里。</p>
<p>这种情况发生的更加微妙，更常见，而且更意外的方式，是当我们考虑传递一个回调函数时：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">doFoo</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// `fn` 只不过 `foo` 的另一个引用</span>

	<span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;-- 调用点!</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
	<span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"oops, global"</span><span class="token punctuation">;</span> <span class="token comment">// `a` 也是一个全局对象的属性</span>

<span class="token function">doFoo</span><span class="token punctuation">(</span> obj<span class="token punctuation">.</span>foo <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "oops, global"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数传递仅仅是一种隐含的赋值，而且因为我们在传递一个函数，它是一个隐含的引用赋值，所以最终结果和我们前一个代码段一样。</p>
<p>那么如果接收你所传递回调的函数不是你的，而是语言内建的呢？没有区别，同样的结果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
	<span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"oops, global"</span><span class="token punctuation">;</span> <span class="token comment">// `a` 也是一个全局对象的属性</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span> obj<span class="token punctuation">.</span>foo<span class="token punctuation">,</span> <span class="token number">100</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "oops, global"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把这个粗糙的，理论上的 <code v-pre>setTimeout()</code> 假想实现当做 JavaScript 环境内建的实现的话：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span>delay</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// （通过某种方法）等待 `delay` 毫秒</span>
	<span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;-- 调用点!</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们刚刚看到的，我们的回调函数丢掉他们的 <code v-pre>this</code> 绑定是十分常见的事情。但是 <code v-pre>this</code> 使我们吃惊的另一种方式是，接收我们回调的函数故意改变调用的 <code v-pre>this</code>。那些很流行的 JavaScript 库中的事件处理器就十分喜欢强制你的回调的 <code v-pre>this</code> 指向触发事件的 DOM 元素。虽然有时这很有用，但其他时候这简直能气死人。不幸的是，这些工具很少给你选择。</p>
<p>不管哪一种意外改变 <code v-pre>this</code> 的方式，你都不能真正地控制你的回调函数引用将如何被执行，所以你（还）没有办法控制调用点给你一个故意的绑定。我们很快就会看到一个方法，通过 <em>固定</em> <code v-pre>this</code> 来解决这个问题。</p>
<h3 id="明确绑定-explicit-binding" tabindex="-1"><a class="header-anchor" href="#明确绑定-explicit-binding" aria-hidden="true">#</a> 明确绑定（Explicit Binding）</h3>
<p>用我们刚看到的 <em>隐含绑定</em>，我们不得不改变目标对象使它自身包含一个对函数的引用，而后使用这个函数引用属性来间接地（隐含地）将 <code v-pre>this</code> 绑定到这个对象上。</p>
<p>但是，如果你想强制一个函数调用使用某个特定对象作为 <code v-pre>this</code> 绑定，而不在这个对象上放置一个函数引用属性呢？</p>
<p>JavaScript 语言中的“所有”函数都有一些工具（通过他们的 <code v-pre>[[Prototype]]</code> —— 待会儿详述）可以用于这个任务。具体地说，函数拥有 <code v-pre>call(..)</code> 和 <code v-pre>apply(..)</code> 方法。从技术上讲，JavaScript 宿主环境有时会提供一些（说得好听点儿！）很特别的函数，它们没有这些功能。但这很少见。绝大多数被提供的函数，当然还有你将创建的所有的函数，都可以访问 <code v-pre>call(..)</code> 和 <code v-pre>apply(..)</code>。</p>
<p>这些工具如何工作？它们接收的第一个参数都是一个用于 <code v-pre>this</code> 的对象，之后使用这个指定的 <code v-pre>this</code> 来调用函数。因为你已经直接指明你想让 <code v-pre>this</code> 是什么，所以我们称这种方式为 <em>明确绑定（explicit binding)</em>。</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> obj <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <code v-pre>foo.call(..)</code> 使用 <em>明确绑定</em> 来调用 <code v-pre>foo</code>，允许我们强制函数的 <code v-pre>this</code> 指向 <code v-pre>obj</code>。</p>
<p>如果你传递一个简单基本类型值（<code v-pre>string</code>，<code v-pre>boolean</code>，或 <code v-pre>number</code> 类型）作为 <code v-pre>this</code> 绑定，那么这个基本类型值会被包装在它的对象类型中（分别是 <code v-pre>new String(..)</code>，<code v-pre>new Boolean(..)</code>，或 <code v-pre>new Number(..)</code>）。这通常称为“封箱（boxing）”。</p>
<p><strong>注意：</strong> 就 <code v-pre>this</code> 绑定的角度讲，<code v-pre>call(..)</code> 和 <code v-pre>apply(..)</code> 是完全一样的。它们确实在处理其他参数上的方式不同，但那不是我们当前关心的。</p>
<p>不幸的是，单独依靠 <em>明确绑定</em> 仍然不能为我们先前提到的问题提供解决方案，也就是函数“丢失”自己原本的 <code v-pre>this</code> 绑定，或者被第三方框架覆盖，等等问题。</p>
<h4 id="硬绑定-hard-binding" tabindex="-1"><a class="header-anchor" href="#硬绑定-hard-binding" aria-hidden="true">#</a> 硬绑定（Hard Binding）</h4>
<p>但是有一个 <em>明确绑定</em> 的变种确实可以实现这个技巧。考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> <span class="token function-variable function">bar</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> obj <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span> bar<span class="token punctuation">,</span> <span class="token number">100</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>

<span class="token comment">// `bar` 将 `foo` 的 `this` 硬绑定到 `obj`</span>
<span class="token comment">// 所以它不可以被覆盖</span>
<span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> window <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们来看看这个变种是如何工作的。我们创建了一个函数 <code v-pre>bar()</code>，在它的内部手动调用 <code v-pre>foo.call(obj)</code>，由此强制 <code v-pre>this</code> 绑定到 <code v-pre>obj</code> 并调用 <code v-pre>foo</code>。无论你过后怎样调用函数 <code v-pre>bar</code>，它总是手动使用 <code v-pre>obj</code> 调用 <code v-pre>foo</code>。这种绑定即明确又坚定，所以我们称之为 <em>硬绑定（hard binding）</em></p>
<p>用 <em>硬绑定</em> 将一个函数包装起来的最典型的方法，是为所有传入的参数和传出的返回值创建一个通道：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">something</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">,</span> something <span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+</span> something<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> <span class="token function-variable function">bar</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span> obj<span class="token punctuation">,</span> arguments <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">(</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2 3</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> b <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种表达这种模式的方法是创建一个可复用的帮助函数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">something</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">,</span> something <span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+</span> something<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 简单的 `bind` 帮助函数</span>
<span class="token keyword">function</span> <span class="token function">bind</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span> obj<span class="token punctuation">,</span> arguments <span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">bind</span><span class="token punctuation">(</span> foo<span class="token punctuation">,</span> obj <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">(</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2 3</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> b <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于 <em>硬绑定</em> 是一个如此常用的模式，它已作为 ES5 的内建工具提供：<code v-pre>Function.prototype.bind</code>，像这样使用：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">something</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">,</span> something <span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+</span> something<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span> obj <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">(</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2 3</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> b <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>bind(..)</code> 返回一个硬编码的新函数，它使用你指定的 <code v-pre>this</code> 环境来调用原本的函数。</p>
<p><strong>注意：</strong> 在 ES6 中，<code v-pre>bind(..)</code> 生成的硬绑定函数有一个名为 <code v-pre>.name</code> 的属性，它源自于原始的 <em>目标函数（target function）</em>。举例来说：<code v-pre>bar = foo.bind(..)</code> 应该会有一个 <code v-pre>bar.name</code> 属性，它的值为 <code v-pre>&quot;bound foo&quot;</code>，这个值应当会显示在调用栈轨迹的函数调用名称中。</p>
<h4 id="api-调用的-环境" tabindex="-1"><a class="header-anchor" href="#api-调用的-环境" aria-hidden="true">#</a> API 调用的“环境”</h4>
<p>确实，许多库中的函数，和许多在 JavaScript 语言以及宿主环境中的内建函数，都提供一个可选参数，通常称为“环境（context）”，这种设计作为一种替代方案来确保你的回调函数使用特定的 <code v-pre>this</code> 而不必非得使用 <code v-pre>bind(..)</code>。</p>
<p>举例来说：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> el<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">"awesome"</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 使用 `obj` 作为 `this` 来调用 `foo(..)`</span>
<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span> foo<span class="token punctuation">,</span> obj <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 awesome  2 awesome  3 awesome</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从内部来说，几乎可以确定这种类型的函数是通过 <code v-pre>call(..)</code> 或 <code v-pre>apply(..)</code> 来使用 <em>明确绑定</em> 以节省你的麻烦。</p>
<h3 id="new-绑定-new-binding" tabindex="-1"><a class="header-anchor" href="#new-绑定-new-binding" aria-hidden="true">#</a> <code v-pre>new</code> 绑定（<code v-pre>new</code> Binding）</h3>
<p>第四种也是最后一种 <code v-pre>this</code> 绑定规则，要求我们重新思考 JavaScript 中关于函数和对象的常见误解。</p>
<p>在传统的面向类语言中，“构造器”是附着在类上的一种特殊方法，当使用 <code v-pre>new</code> 操作符来初始化一个类时，这个类的构造器就会被调用。通常看起来像这样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>something <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>JavaScript 拥有 <code v-pre>new</code> 操作符，而且使用它的代码模式看起来和我们在面向类语言中看到的基本一样；大多数开发者猜测 JavaScript 机制在做某种相似的事情。但是，实际上 JavaScript 的机制和 <code v-pre>new</code> 在 JS 中的用法所暗示的面向类的功能 <em>没有任何联系</em>。</p>
<p>首先，让我们重新定义 JavaScript 的“构造器”是什么。在 JS 中，构造器 <strong>仅仅是一个函数</strong>，它们偶然地与前置的 <code v-pre>new</code> 操作符一起调用。它们不依附于类，它们也不初始化一个类。它们甚至不是一种特殊的函数类型。它们本质上只是一般的函数，在被使用 <code v-pre>new</code> 来调用时改变了行为。</p>
<p>例如，引用 ES5.1 的语言规范，<code v-pre>Number(..)</code> 函数作为一个构造器来说：</p>
<blockquote>
<p>15.7.2 Number 构造器</p>
<p>当 Number 作为 new 表达式的一部分被调用时，它是一个构造器：它初始化这个新创建的对象。</p>
</blockquote>
<p>所以，可以说任何函数，包括像 <code v-pre>Number(..)</code>（见第三章）这样的内建对象函数都可以在前面加上 <code v-pre>new</code> 来被调用，这使函数调用成为一个 <em>构造器调用（constructor call）</em>。这是一个重要而微妙的区别：实际上不存在“构造器函数”这样的东西，而只有函数的构造器调用。</p>
<p>当在函数前面被加入 <code v-pre>new</code> 调用时，也就是构造器调用时，下面这些事情会自动完成：</p>
<ol>
<li>一个全新的对象会凭空创建（就是被构建）</li>
<li><em>这个新构建的对象会被接入原形链（<code v-pre>[[Prototype]]</code>-linked）</em></li>
<li>这个新构建的对象被设置为函数调用的 <code v-pre>this</code> 绑定</li>
<li>除非函数返回一个它自己的其他 <strong>对象</strong>，否则这个被 <code v-pre>new</code> 调用的函数将 <em>自动</em> 返回这个新构建的对象。</li>
</ol>
<p>步骤 1，3 和 4 是我们当下要讨论的。我们现在跳过第 2 步，在第五章回过头来讨论。</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">=</span> a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">foo</span><span class="token punctuation">(</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> bar<span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过在前面使用 <code v-pre>new</code> 来调用 <code v-pre>foo(..)</code>，我们构建了一个新的对象并把这个新对象作为 <code v-pre>foo(..)</code> 调用的 <code v-pre>this</code>。 <strong><code v-pre>new</code> 是函数调用可以绑定 <code v-pre>this</code> 的最后一种方式</strong>，我们称之为 <em>new 绑定（new binding）</em>。</p>
<h2 id="一切皆有顺序" tabindex="-1"><a class="header-anchor" href="#一切皆有顺序" aria-hidden="true">#</a> 一切皆有顺序</h2>
<p>如此，我们已经揭示了函数调用中的四种 <code v-pre>this</code> 绑定规则。你需要做的 <em>一切</em> 就是找到调用点然后考察哪一种规则适用于它。但是，如果调用点上有多种规则都适用呢？这些规则一定有一个优先顺序，我们下面就来展示这些规则以什么样的优先顺序实施。</p>
<p>很显然，<em>默认绑定</em> 在四种规则中优先权最低的。所以我们先把它放在一边。</p>
<p><em>隐含绑定</em> 和 <em>明确绑定</em> 哪一个更优先呢？我们来测试一下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
	<span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
	<span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span><span class="token punctuation">;</span>

obj1<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
obj2<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>

obj1<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> obj2 <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
obj2<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> obj1 <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以, <em>明确绑定</em> 的优先权要高于 <em>隐含绑定</em>，这意味着你应当在考察 <em>隐含绑定</em> 之前 <strong>首先</strong> 考察 <em>明确绑定</em> 是否适用。</p>
<p>现在，我们只需要搞清楚 <em>new 绑定</em> 的优先级位于何处。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">something</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">=</span> something<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

obj1<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> obj1<span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>

obj1<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> obj2<span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> obj2<span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>

<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">obj1<span class="token punctuation">.</span>foo</span><span class="token punctuation">(</span> <span class="token number">4</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> obj1<span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> bar<span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了，<em>new 绑定</em> 的优先级要高于 <em>隐含绑定</em>。那么你觉得 <em>new 绑定</em> 的优先级较之于 <em>明确绑定</em> 是高还是低呢？</p>
<p><strong>注意：</strong> <code v-pre>new</code> 和 <code v-pre>call</code>/<code v-pre>apply</code> 不能同时使用，所以 <code v-pre>new foo.call(obj1)</code> 是不允许的，也就是不能直接对比测试 <em>new 绑定</em> 和 <em>明确绑定</em>。但是我们依然可以使用 <em>硬绑定</em> 来测试这两个规则的优先级。</p>
<p>在我们进入代码中探索之前，回想一下 <em>硬绑定</em> 物理上是如何工作的，也就是 <code v-pre>Function.prototype.bind(..)</code> 创建了一个新的包装函数，这个函数被硬编码为忽略它自己的 <code v-pre>this</code> 绑定（不管它是什么），转而手动使用我们提供的。</p>
<p>因此，这似乎看起来很明显，<em>硬绑定</em>（<em>明确绑定的一种</em>）的优先级要比 <em>new 绑定</em> 高，而且不能被 <code v-pre>new</code> 覆盖。</p>
<p>我们检验一下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">something</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">=</span> something<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span> obj1 <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">bar</span><span class="token punctuation">(</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> obj1<span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>

<span class="token keyword">var</span> baz <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">bar</span><span class="token punctuation">(</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> obj1<span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> baz<span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>哇！<code v-pre>bar</code> 是硬绑定到 <code v-pre>obj1</code> 的，但是 <code v-pre>new bar(3)</code> 并 <strong>没有</strong> 像我们期待的那样将 <code v-pre>obj1.a</code> 变为 <code v-pre>3</code>。反而，<em>硬绑定</em>（到 <code v-pre>obj1</code>）的 <code v-pre>bar(..)</code> 调用 <em><strong>可以</strong></em> 被 <code v-pre>new</code> 所覆盖。因为 <code v-pre>new</code> 被实施，我们得到一个名为 <code v-pre>baz</code> 的新创建的对象，而且我们确实看到 <code v-pre>baz.a</code> 的值为 <code v-pre>3</code>。</p>
<p>如果你回头看看我们的“山寨”绑定帮助函数，这很令人吃惊：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">bind</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span> obj<span class="token punctuation">,</span> arguments <span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你推导这段帮助代码如何工作，会发现对于 <code v-pre>new</code> 操作符调用来说没有办法去像我们观察到的那样，将绑定到 <code v-pre>obj</code> 的硬绑定覆盖。</p>
<p>但是 ES5 的内建 <code v-pre>Function.prototype.bind(..)</code> 更加精妙，实际上十分精妙。这里是 MDN 网页上为 <code v-pre>bind(..)</code> 提供的（稍稍格式化后的）polyfill（低版本兼容填补工具）：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>bind<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">bind</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">oThis</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token keyword">this</span> <span class="token operator">!==</span> <span class="token string">"function"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 可能的与 ECMAScript 5 内部的 IsCallable 函数最接近的东西，</span>
			<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span> <span class="token string">"Function.prototype.bind - what "</span> <span class="token operator">+</span>
				<span class="token string">"is trying to be bound is not callable"</span>
			<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">var</span> aArgs <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> arguments<span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
			fToBind <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">,</span>
			<span class="token function-variable function">fNOP</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token function-variable function">fBound</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token keyword">return</span> <span class="token function">fToBind</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>
					<span class="token punctuation">(</span>
						<span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">fNOP</span> <span class="token operator">&amp;&amp;</span>
						oThis <span class="token operator">?</span> <span class="token keyword">this</span> <span class="token operator">:</span> oThis
					<span class="token punctuation">)</span><span class="token punctuation">,</span>
					aArgs<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> arguments <span class="token punctuation">)</span> <span class="token punctuation">)</span>
				<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">;</span>

		fNOP<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
		fBound<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">fNOP</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">return</span> fBound<span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 就将与 <code v-pre>new</code> 一起使用的硬绑定函数（参照下面来看为什么这有用）而言，上面的 <code v-pre>bind(..)</code> polyfill 与 ES5 中内建的 <code v-pre>bind(..)</code> 是不同的。因为 polyfill 不能像内建工具那样，没有 <code v-pre>.prototype</code> 就能创建函数，这里使用了一些微妙而间接的方法来近似模拟相同的行为。如果你打算将硬绑定函数和 <code v-pre>new</code> 一起使用而且依赖于这个 polyfill，应当多加小心。</p>
<p>允许 <code v-pre>new</code> 进行覆盖的部分是这里：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">fNOP</span> <span class="token operator">&amp;&amp;</span>
oThis <span class="token operator">?</span> <span class="token keyword">this</span> <span class="token operator">:</span> oThis

<span class="token comment">// ... 和：</span>

fNOP<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
fBound<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">fNOP</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们不会实际深入解释这个花招儿是如何工作的（这很复杂而且超出了我们当前的讨论范围），但实质上这个工具判断硬绑定函数是否是通过 <code v-pre>new</code> 被调用的（导致一个新构建的对象作为它的 <code v-pre>this</code>），如果是，它就用那个新构建的 <code v-pre>this</code> 而非先前为 <code v-pre>this</code> 指定的 <em>硬绑定</em>。</p>
<p>为什么 <code v-pre>new</code> 可以覆盖 <em>硬绑定</em> 这件事很有用？</p>
<p>这种行为的主要原因是，创建一个实质上忽略 <code v-pre>this</code> 的 <em>硬绑定</em> 而预先设置一部分或所有的参数的函数（这个函数可以与 <code v-pre>new</code> 一起使用来构建对象）。<code v-pre>bind(..)</code> 的一个能力是，任何在第一个 <code v-pre>this</code> 绑定参数之后被传入的参数，默认地作为当前函数的标准参数（技术上这称为“局部应用（partial application）”，是一种“柯里化（currying）”）。</p>
<p>例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">p1<span class="token punctuation">,</span>p2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>val <span class="token operator">=</span> p1 <span class="token operator">+</span> p2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 在这里使用 `null` 是因为在这种场景下我们不关心 `this` 的硬绑定</span>
<span class="token comment">// 而且反正它将会被 `new` 调用覆盖掉！</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">"p1"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> baz <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">bar</span><span class="token punctuation">(</span> <span class="token string">"p2"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

baz<span class="token punctuation">.</span>val<span class="token punctuation">;</span> <span class="token comment">// p1p2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="判定-this" tabindex="-1"><a class="header-anchor" href="#判定-this" aria-hidden="true">#</a> 判定 <code v-pre>this</code></h3>
<p>现在，我们可以按照优先顺序来总结一下从函数调用的调用点来判定 <code v-pre>this</code> 的规则了。按照这个顺序来问问题，然后在第一个规则适用的地方停下。</p>
<ol>
<li>
<p>函数是通过 <code v-pre>new</code> 被调用的吗（<strong>new 绑定</strong>）？如果是，<code v-pre>this</code> 就是新构建的对象。</p>
<p><code v-pre>var bar = new foo()</code></p>
</li>
<li>
<p>函数是通过 <code v-pre>call</code> 或 <code v-pre>apply</code> 被调用（<strong>明确绑定</strong>），甚至是隐藏在 <code v-pre>bind</code> <em>硬绑定</em> 之中吗？如果是，<code v-pre>this</code> 就是那个被明确指定的对象。</p>
<p><code v-pre>var bar = foo.call( obj2 )</code></p>
</li>
<li>
<p>函数是通过环境对象（也称为拥有者或容器对象）被调用的吗（<strong>隐含绑定</strong>）？如果是，<code v-pre>this</code> 就是那个环境对象。</p>
<p><code v-pre>var bar = obj1.foo()</code></p>
</li>
<li>
<p>否则，使用默认的 <code v-pre>this</code>（<strong>默认绑定</strong>）。如果在 <code v-pre>strict mode</code> 下，就是 <code v-pre>undefined</code>，否则是 <code v-pre>global</code> 对象。</p>
<p><code v-pre>var bar = foo()</code></p>
</li>
</ol>
<p>以上，就是理解对于普通的函数调用来说的 <code v-pre>this</code> 绑定规则 <em>所需的全部</em>。是的……几乎是全部。</p>
<h2 id="绑定的特例" tabindex="-1"><a class="header-anchor" href="#绑定的特例" aria-hidden="true">#</a> 绑定的特例</h2>
<p>正如通常的那样，对于“规则”总有一些 <em>例外</em>。</p>
<p>在某些场景下 <code v-pre>this</code> 绑定会让人很吃惊，比如在你试图实施一种绑定，然而最终得到的却是 <em>默认绑定</em> 规则的绑定行为（见前面的内容）。</p>
<h3 id="被忽略的-this" tabindex="-1"><a class="header-anchor" href="#被忽略的-this" aria-hidden="true">#</a> 被忽略的 <code v-pre>this</code></h3>
<p>如果你传递 <code v-pre>null</code> 或 <code v-pre>undefined</code> 作为 <code v-pre>call</code>、<code v-pre>apply</code> 或 <code v-pre>bind</code> 的 <code v-pre>this</code> 绑定参数，那么这些值会被忽略掉，取而代之的是 <em>默认绑定</em> 规则将适用于这个调用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> <span class="token keyword">null</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为什么你会向 <code v-pre>this</code> 绑定故意传递像 <code v-pre>null</code> 这样的值？</p>
<p>一个很常见的做法是，使用 <code v-pre>apply(..)</code> 来将一个数组散开，从而作为函数调用的参数。相似地，<code v-pre>bind(..)</code> 可以柯里化参数（预设值），也可能非常有用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span>b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"a:"</span> <span class="token operator">+</span> a <span class="token operator">+</span> <span class="token string">", b:"</span> <span class="token operator">+</span> b <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 将数组散开作为参数</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// a:2, b:3</span>

<span class="token comment">// 用 `bind(..)` 进行柯里化</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">bar</span><span class="token punctuation">(</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// a:2, b:3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这两种工具都要求第一个参数是 <code v-pre>this</code> 绑定。如果目标函数不关心 <code v-pre>this</code>，你就需要一个占位值，而且正如这个代码段中展示的，<code v-pre>null</code> 看起来是一个合理的选择。</p>
<p><strong>注意：</strong> 虽然我们在这本书中没有涵盖，但是 ES6 中有一个扩散操作符：<code v-pre>...</code>，它让你无需使用 <code v-pre>apply(..)</code> 而在语法上将一个数组“散开”作为参数，比如 <code v-pre>foo(...[1,2])</code> 表示 <code v-pre>foo(1,2)</code> —— 如果 <code v-pre>this</code> 绑定没有必要，可以在语法上回避它。不幸的是，柯里化在 ES6 中没有语法上的替代品，所以 <code v-pre>bind(..)</code> 调用的 <code v-pre>this</code> 参数依然需要注意。</p>
<p>可是，在你不关心 <code v-pre>this</code> 绑定而一直使用 <code v-pre>null</code> 的时候，有些潜在的“危险”。如果你这样处理一些函数调用（比如，不归你管控的第三方包），而且那些函数确实使用了 <code v-pre>this</code> 引用，那么 <em>默认绑定</em> 规则意味着它可能会不经意间引用（或者改变，更糟糕！）<code v-pre>global</code> 对象（在浏览器中是 <code v-pre>window</code>）。</p>
<p>很显然，这样的陷阱会导致多种 <em>非常难</em> 诊断和追踪的 Bug。</p>
<h4 id="更安全的-this" tabindex="-1"><a class="header-anchor" href="#更安全的-this" aria-hidden="true">#</a> 更安全的 <code v-pre>this</code></h4>
<p>也许某些“更安全”的做法是：为了 <code v-pre>this</code> 而传递一个特殊创建好的对象，这个对象保证不会对你的程序产生副作用。从网络学（或军事）上借用一个词，我们可以建立一个“DMZ”（非军事区）对象 —— 只不过是一个完全为空，没有委托（见第五，六章）的对象。</p>
<p>如果我们为了忽略自己认为不用关心的 <code v-pre>this</code> 绑定，而总是传递一个 DMZ 对象，那么我们就可以确定任何对 <code v-pre>this</code> 的隐藏或意外的使用将会被限制在这个空对象中，也就是说这个对象将 <code v-pre>global</code> 对象和副作用隔离开来。</p>
<p>因为这个对象是完全为空的，我个人喜欢给它一个变量名为 <code v-pre>ø</code>（空集合的数学符号的小写）。在许多键盘上（比如 Mac 的美式键盘），这个符号可以很容易地用 <code v-pre>⌥</code>+<code v-pre>o</code>（option+<code v-pre>o</code>）打出来。有些系统还允许你为某个特殊符号设置快捷键。如果你不喜欢 <code v-pre>ø</code> 符号，或者你的键盘没那么好打，你当然可以叫它任意你希望的名字。</p>
<p>无论你叫它什么，创建 <strong>完全为空的对象</strong> 的最简单方法就是 <code v-pre>Object.create(null)</code>（见第五章）。<code v-pre>Object.create(null)</code> 和 <code v-pre>{}</code> 很相似，但是没有指向 <code v-pre>Object.prototype</code> 的委托，所以它比 <code v-pre>{}</code> “空得更彻底”。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span>b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"a:"</span> <span class="token operator">+</span> a <span class="token operator">+</span> <span class="token string">", b:"</span> <span class="token operator">+</span> b <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 我们的 DMZ 空对象</span>
<span class="token keyword">var</span> ø <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span> <span class="token keyword">null</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 将数组散开作为参数</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span> ø<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// a:2, b:3</span>

<span class="token comment">// 用 `bind(..)` 进行 currying</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span> ø<span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">bar</span><span class="token punctuation">(</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// a:2, b:3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不仅在功能上更“安全”，<code v-pre>ø</code> 还会在代码风格上产生些好处，它在语义上可能会比 <code v-pre>null</code> 更清晰的表达“我想让 <code v-pre>this</code> 为空”。当然，你可以随自己喜欢来称呼你的 DMZ 对象。</p>
<h3 id="间接" tabindex="-1"><a class="header-anchor" href="#间接" aria-hidden="true">#</a> 间接</h3>
<p>另外一个要注意的是，你可以（有意或无意地！）创建对函数的“间接引用（indirect reference）”，在那样的情况下，当那个函数引用被调用时，<em>默认绑定</em> 规则也会适用。</p>
<p>一个最常见的 <em>间接引用</em> 产生方式是通过赋值：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> o <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> foo <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

o<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
<span class="token punctuation">(</span>p<span class="token punctuation">.</span>foo <span class="token operator">=</span> o<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>赋值表达式 <code v-pre>p.foo = o.foo</code> 的 <em>结果值</em> 是一个刚好指向底层函数对象的引用。如此，起作用的调用点就是 <code v-pre>foo()</code>，而非你期待的 <code v-pre>p.foo()</code> 或 <code v-pre>o.foo()</code>。根据上面的规则，<em>默认绑定</em> 适用。</p>
<p>提醒： 无论你如何得到适用 <em>默认绑定</em> 的函数调用，被调用函数的 <strong>内容</strong> 的 <code v-pre>strict mode</code> 状态 —— 而非函数的调用点 —— 决定了 <code v-pre>this</code> 引用的值：不是 <code v-pre>global</code> 对象（在非 <code v-pre>strict mode</code> 下），就是 <code v-pre>undefined</code>（在 <code v-pre>strict mode</code> 下）。</p>
<h3 id="软化绑定-softening-binding" tabindex="-1"><a class="header-anchor" href="#软化绑定-softening-binding" aria-hidden="true">#</a> 软化绑定（Softening Binding）</h3>
<p>我们之前看到 <em>硬绑定</em> 是一种通过将函数强制绑定到特定的 <code v-pre>this</code> 上，来防止函数调用在不经意间退回到 <em>默认绑定</em> 的策略（除非你用 <code v-pre>new</code> 去覆盖它！）。问题是，<em>硬绑定</em> 极大地降低了函数的灵活性，阻止我们手动使用 <em>隐含绑定</em> 或后续的 <em>明确绑定</em> 来覆盖 <code v-pre>this</code>。</p>
<p>如果有这样的办法就好了：为 <em>默认绑定</em> 提供不同的默认值（不是 <code v-pre>global</code> 或 <code v-pre>undefined</code>），同时保持函数可以通过 <em>隐含绑定</em> 或 <em>明确绑定</em> 技术来手动绑定 <code v-pre>this</code>。</p>
<p>我们可以构建一个所谓的 <em>软绑定</em> 工具来模拟我们期望的行为。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>softBind<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">softBind</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">var</span> fn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">,</span>
			curried <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> arguments<span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token function-variable function">bound</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">bound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>
					<span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span> <span class="token operator">||</span>
						<span class="token punctuation">(</span><span class="token keyword">typeof</span> window <span class="token operator">!==</span> <span class="token string">"undefined"</span> <span class="token operator">&amp;&amp;</span>
							<span class="token keyword">this</span> <span class="token operator">===</span> window<span class="token punctuation">)</span> <span class="token operator">||</span>
						<span class="token punctuation">(</span><span class="token keyword">typeof</span> global <span class="token operator">!==</span> <span class="token string">"undefined"</span> <span class="token operator">&amp;&amp;</span>
							<span class="token keyword">this</span> <span class="token operator">===</span> global<span class="token punctuation">)</span>
					<span class="token punctuation">)</span> <span class="token operator">?</span> obj <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">,</span>
					curried<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span> curried<span class="token punctuation">,</span> arguments <span class="token punctuation">)</span>
				<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">;</span>
		bound<span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span> fn<span class="token punctuation">.</span>prototype <span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> bound<span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里提供的 <code v-pre>softBind(..)</code> 工具的工作方式和 ES5 内建的 <code v-pre>bind(..)</code> 工具很相似，除了我们的 <em>软绑定</em> 行为。它用一种逻辑将指定的函数包装起来，这个逻辑在函数调用时检查 <code v-pre>this</code>，如果它是 <code v-pre>global</code> 或 <code v-pre>undefined</code>，就使用预先指定的 <em>默认值</em> （<code v-pre>obj</code>），否则保持 <code v-pre>this</code> 不变。它也提供了可选的柯里化行为（见先前的 <code v-pre>bind(..)</code> 讨论）。</p>
<p>我们来看看它的用法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"name: "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"obj"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    obj2 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"obj2"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    obj3 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"obj3"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> fooOBJ <span class="token operator">=</span> foo<span class="token punctuation">.</span><span class="token function">softBind</span><span class="token punctuation">(</span> obj <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">fooOBJ</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// name: obj</span>

obj2<span class="token punctuation">.</span>foo <span class="token operator">=</span> foo<span class="token punctuation">.</span><span class="token function">softBind</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
obj2<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// name: obj2   &lt;---- 看!!!</span>

<span class="token function">fooOBJ</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> obj3 <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// name: obj3   &lt;---- 看!</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span> obj2<span class="token punctuation">.</span>foo<span class="token punctuation">,</span> <span class="token number">10</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// name: obj   &lt;---- 退回到软绑定</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>软绑定版本的 <code v-pre>foo()</code> 函数可以如展示的那样被手动 <code v-pre>this</code> 绑定到 <code v-pre>obj2</code> 或 <code v-pre>obj3</code>，如果 <em>默认绑定</em> 适用时会退到 <code v-pre>obj</code>。</p>
<h2 id="词法-this" tabindex="-1"><a class="header-anchor" href="#词法-this" aria-hidden="true">#</a> 词法 <code v-pre>this</code></h2>
<p>我们刚刚涵盖了一般函数遵守的四种规则。但是 ES6 引入了一种不适用于这些规则特殊的函数：箭头函数（arrow-function）。</p>
<p>箭头函数不是通过 <code v-pre>function</code> 关键字声明的，而是通过所谓的“大箭头”操作符：<code v-pre>=&gt;</code>。与使用四种标准的 <code v-pre>this</code> 规则不同的是，箭头函数从封闭它的（函数或全局）作用域采用 <code v-pre>this</code> 绑定。</p>
<p>我们来展示一下箭头函数的词法作用域：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 返回一个箭头函数</span>
	<span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里的 `this` 是词法上从 `foo()` 采用的</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> obj1 <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> obj2 <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2, 不是3!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>foo()</code> 中创建的箭头函数在词法上捕获 <code v-pre>foo()</code> 被调用时的 <code v-pre>this</code>，不管它是什么。因为 <code v-pre>foo()</code> 被 <code v-pre>this</code> 绑定到 <code v-pre>obj1</code>，<code v-pre>bar</code>（被返回的箭头函数的一个引用）也将会被 <code v-pre>this</code> 绑定到 <code v-pre>obj1</code>。一个箭头函数的词法绑定是不能被覆盖的（就连 <code v-pre>new</code> 也不行！）。</p>
<p>最常见的用法是用于回调，比如事件处理器或计时器：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
		<span class="token comment">// 这里的 `this` 是词法上从 `foo()` 采用</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> obj <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然箭头函数提供除了使用 <code v-pre>bind(..)</code> 外，另外一种在函数上来确保 <code v-pre>this</code> 的方式，这看起来很吸引人，但重要的是要注意它们本质是使用广为人知的词法作用域来禁止了传统的 <code v-pre>this</code> 机制。在 ES6 之前，为此我们已经有了相当常用的模式，这些模式几乎和 ES6 的箭头函数的精神没有区别：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span> <span class="token comment">// 词法上捕获 `this`</span>
	<span class="token function">setTimeout</span><span class="token punctuation">(</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> self<span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> obj <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然对不想用 <code v-pre>bind(..)</code> 的人来说 <code v-pre>self = this</code> 和箭头函数都是看起来不错的“解决方案”，但它们实质上逃避了 <code v-pre>this</code> 而非理解和接受它。</p>
<p>如果你发现你在写 <code v-pre>this</code> 风格的代码，但是大多数或全部时候，你都用词法上的 <code v-pre>self = this</code> 或箭头函数“技巧”抵御 <code v-pre>this</code> 机制，那么也许你应该：</p>
<ol>
<li>
<p>仅使用词法作用域并忘掉虚伪的 <code v-pre>this</code> 风格代码。</p>
</li>
<li>
<p>完全接受 <code v-pre>this</code> 风格机制，包括在必要的时候使用 <code v-pre>bind(..)</code>，并尝试避开 <code v-pre>self = this</code> 和箭头函数的“词法 this”技巧。</p>
</li>
</ol>
<p>一个程序可以有效地同时利用两种风格的代码（词法和 <code v-pre>this</code>），但是在同一个函数内部，特别是对同种类型的查找，混合这两种机制通常是自找很难维护的代码，而且可能是聪明过了头。</p>
<h2 id="复习" tabindex="-1"><a class="header-anchor" href="#复习" aria-hidden="true">#</a> 复习</h2>
<p>为执行中的函数判定 <code v-pre>this</code> 绑定需要找到这个函数的直接调用点。找到之后，四种规则将会以这种优先顺序施用于调用点：</p>
<ol>
<li>
<p>通过 <code v-pre>new</code> 调用？使用新构建的对象。</p>
</li>
<li>
<p>通过 <code v-pre>call</code> 或 <code v-pre>apply</code>（或 <code v-pre>bind</code>）调用？使用指定的对象。</p>
</li>
<li>
<p>通过持有调用的环境对象调用？使用那个环境对象。</p>
</li>
<li>
<p>默认：<code v-pre>strict mode</code> 下是 <code v-pre>undefined</code>，否则就是全局对象。</p>
</li>
</ol>
<p>小心偶然或不经意的 <em>默认绑定</em> 规则调用。如果你想“安全”地忽略 <code v-pre>this</code> 绑定，一个像 <code v-pre>ø = Object.create(null)</code> 这样的“DMZ”对象是一个很好的占位值，以保护 <code v-pre>global</code> 对象不受意外的副作用影响。</p>
<p>与这四种绑定规则不同，ES6 的箭头方法使用词法作用域来决定 <code v-pre>this</code> 绑定，这意味着它们采用封闭他们的函数调用作为 <code v-pre>this</code> 绑定（无论它是什么）。它们实质上是 ES6 之前的 <code v-pre>self = this</code> 代码的语法替代品。</p>
</div></template>


