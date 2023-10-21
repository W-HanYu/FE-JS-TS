<template><div><h2 id="第四章-ts-中奇怪的符号" tabindex="-1"><a class="header-anchor" href="#第四章-ts-中奇怪的符号" aria-hidden="true">#</a> 第四章 TS 中奇怪的符号</h2>
<h3 id="_4-1-非空断言操作符" tabindex="-1"><a class="header-anchor" href="#_4-1-非空断言操作符" aria-hidden="true">#</a> 4.1 ！非空断言操作符</h3>
<p>在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型。具体而言，x! 将从 x 值域中排除 null 和 undefined 。</p>
<p>那么非空断言操作符到底有什么用呢？下面我们先来看一下非空断言操作符的一些使用场景。</p>
<h4 id="_4-1-1-忽略-undefined-和-null" tabindex="-1"><a class="header-anchor" href="#_4-1-1-忽略-undefined-和-null" aria-hidden="true">#</a> 4.1.1 忽略 undefined 和 null</h4>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">myFunc</span><span class="token punctuation">(</span>maybeString<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Type 'string | null | undefined' is not assignable to type 'string'.</span>
  <span class="token comment">// Type 'undefined' is not assignable to type 'string'.</span>
  <span class="token keyword">const</span> onlyString<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> maybeString<span class="token punctuation">;</span> <span class="token comment">// Error</span>
  <span class="token keyword">const</span> ignoreUndefinedAndNull<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> maybeString<span class="token operator">!</span><span class="token punctuation">;</span> <span class="token comment">// Ok</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-1-2-调用函数时忽略-undefined-类型" tabindex="-1"><a class="header-anchor" href="#_4-1-2-调用函数时忽略-undefined-类型" aria-hidden="true">#</a> 4.1.2 调用函数时忽略 undefined 类型</h4>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">NumGenerator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">number</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">myFunc</span><span class="token punctuation">(</span>numGenerator<span class="token operator">:</span> NumGenerator <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Object is possibly 'undefined'.(2532)</span>
  <span class="token comment">// Cannot invoke an object which is possibly 'undefined'.(2722)</span>
  <span class="token keyword">const</span> num1 <span class="token operator">=</span> <span class="token function">numGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Error</span>
  <span class="token keyword">const</span> num2 <span class="token operator">=</span> numGenerator<span class="token operator">!</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//OK</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为 ! 非空断言操作符会从编译生成的 JavaScript 代码中移除，所以在实际使用的过程中，要特别注意。比如下面这个例子：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> a<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> a<span class="token operator">!</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上 TS 代码编译生成 ES5 代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token string">"use strict"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> a<span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然在 TS 代码中，我们使用了非空断言，使得 const b: number = a!; 语句可以通过 TypeScript 类型检查器的检查。但在生成的 ES5 代码中，! 非空断言操作符被移除了，所以在浏览器中执行以上代码，在控制台会输出 undefined。</p>
<h3 id="_4-2-运算符" tabindex="-1"><a class="header-anchor" href="#_4-2-运算符" aria-hidden="true">#</a> 4.2 ?. 运算符</h3>
<p>TypeScript 3.7 实现了呼声最高的 ECMAScript 功能之一：可选链（Optional Chaining）。有了可选链后，我们编写代码时如果遇到 null 或 undefined 就可以立即停止某些表达式的运行。可选链的核心是新的 ?. 运算符，它支持以下语法：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token operator">></span> obj<span class="token operator">?.</span>prop
<span class="token operator">></span> obj<span class="token operator">?.</span><span class="token punctuation">[</span>expr<span class="token punctuation">]</span>
<span class="token operator">></span> arr<span class="token operator">?.</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span>
<span class="token operator">></span> func<span class="token operator">?.</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span>
<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们来举一个可选的属性访问的例子：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> val <span class="token operator">=</span> a<span class="token operator">?.</span>b<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了更好的理解可选链，我们来看一下该 const val = a?.b 语句编译生成的 ES5 代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">var</span> val <span class="token operator">=</span> a <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> a <span class="token operator">===</span> <span class="token keyword">void</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token keyword">void</span> <span class="token number">0</span> <span class="token operator">:</span> a<span class="token punctuation">.</span>b<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述的代码会自动检查对象 a 是否为 null 或 undefined，如果是的话就立即返回 undefined，这样就可以立即停止某些表达式的运行。你可能已经想到可以使用 ?. 来替代很多使用 &amp;&amp; 执行空检查的代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">&amp;&amp;</span> a<span class="token punctuation">.</span>b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token operator">?.</span>b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * if(a?.b)<span class="token punctuation">{</span> <span class="token punctuation">}</span> 编译后的ES5代码
 *
 * if(
 *  a === null || a === void 0
 *  ? void 0 : a.b) <span class="token punctuation">{</span>
 * <span class="token punctuation">}</span>
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但需要注意的是，?. 与 &amp;&amp; 运算符行为略有不同，&amp;&amp; 专门用于检测 falsy 值，比如空字符串、0、NaN、null 和 false 等。而 ?. 只会验证对象是否为 null 或 undefined，对于 0 或空字符串来说，并不会出现 “短路”。</p>
<h4 id="_4-2-1-可选元素访问" tabindex="-1"><a class="header-anchor" href="#_4-2-1-可选元素访问" aria-hidden="true">#</a> 4.2.1 可选元素访问</h4>
<p>可选链除了支持可选属性的访问之外，它还支持可选元素的访问，它的行为类似于可选属性的访问，只是可选元素的访问允许我们访问非标识符的属性，比如任意字符串、数字索引和 Symbol：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token generic-function"><span class="token function">tryGetArrayElement</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>arr<span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> index<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> arr<span class="token operator">?.</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上代码经过编译后会生成以下 ES5 代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token string">"use strict"</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">tryGetArrayElement</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> arr <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> arr <span class="token operator">===</span> <span class="token keyword">void</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token keyword">void</span> <span class="token number">0</span> <span class="token operator">:</span> arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过观察生成的 ES5 代码，很明显在 tryGetArrayElement 方法中会自动检测输入参数 arr 的值是否为 null 或 undefined，从而保证了我们代码的健壮性。</p>
<h4 id="_4-2-2-可选链余函数调用" tabindex="-1"><a class="header-anchor" href="#_4-2-2-可选链余函数调用" aria-hidden="true">#</a> 4.2.2 可选链余函数调用</h4>
<p>当尝试调用一个可能不存在的方法时也可以使用可选链。在实际开发过程中，这是很有用的。系统中某个方法不可用，有可能是由于版本不一致或者用户设备兼容性问题导致的。函数调用时如果被调用的方法不存在，使用可选链可以使表达式自动返回 undefined 而不是抛出一个异常。</p>
<p>可选调用使用起来也很简单，比如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> result <span class="token operator">=</span> obj<span class="token punctuation">.</span>customMethod<span class="token operator">?.</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该 TypeScript 代码编译生成的 ES5 代码如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">var</span> result <span class="token operator">=</span>
  <span class="token punctuation">(</span>_a <span class="token operator">=</span> obj<span class="token punctuation">.</span>customMethod<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> _a <span class="token operator">===</span> <span class="token keyword">void</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token keyword">void</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token function">_a</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>另外在使用可选调用的时候，我们要注意以下两个注意事项：</p>
<ul>
<li>
<p><strong>如果存在一个属性名且该属性名对应的值不是函数类型，使用 ?. 仍然会产生一个 TypeError 异常。</strong></p>
</li>
<li>
<p><strong>可选链的运算行为被局限在属性的访问、调用以及元素的访问 —— 它不会沿伸到后续的表达式中，也就是说可选调用不会阻止 a?.b / someMethod() 表达式中的除法运算或 someMethod 的方法调用。</strong></p>
</li>
</ul>
<h3 id="_4-3-空值合并运算符" tabindex="-1"><a class="header-anchor" href="#_4-3-空值合并运算符" aria-hidden="true">#</a> 4.3 ?? 空值合并运算符</h3>
<p>在 TypeScript 3.7 版本中除了引入了前面介绍的可选链 ?. 之外，也引入了一个新的逻辑运算符 —— 空值合并运算符 ??。<strong>当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数。</strong></p>
<p>与逻辑或 || 运算符不同，逻辑或会在左操作数为 falsy 值时返回右侧操作数。也就是说，如果你使用 || 来为某些变量设置默认的值时，你可能会遇到意料之外的行为。比如为 falsy 值（’’、NaN 或 0）时。</p>
<p>这里来看一个具体的例子：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token operator">??</span> <span class="token string">"default string"</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出："default string"</span>
<span class="token keyword">const</span> baz <span class="token operator">=</span> <span class="token number">0</span> <span class="token operator">??</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>baz<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出：0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译之后，生成 ES5 代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token string">"use strict"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> _a<span class="token punctuation">,</span> _b<span class="token punctuation">;</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">(</span>_a <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> _a <span class="token operator">!==</span> <span class="token keyword">void</span> <span class="token number">0</span> <span class="token operator">?</span> _a <span class="token operator">:</span> <span class="token string">"default string"</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出："default string"</span>

<span class="token keyword">var</span> baz <span class="token operator">=</span> <span class="token punctuation">(</span>_b <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> _b <span class="token operator">!==</span> <span class="token keyword">void</span> <span class="token number">0</span> <span class="token operator">?</span> _b <span class="token operator">:</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>baz<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出：0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过观察以上代码，我们更加直观的了解到，空值合并运算符是如何解决前面 || 运算符存在的潜在问题。下面我们来介绍空值合并运算符的特性和使用时的一些注意事项。</p>
<h4 id="_4-3-1-短路" tabindex="-1"><a class="header-anchor" href="#_4-3-1-短路" aria-hidden="true">#</a> 4.3.1 短路</h4>
<p>当空值合并运算符的左表达式不为 null 或 undefined 时，不会对右表达式进行求值。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"A was called"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token constant">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"B was called"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token constant">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"C was called"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token string">"foo"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">??</span> <span class="token constant">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">??</span> <span class="token constant">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码运行后，控制台会输出以下结果：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token constant">A</span> was called
<span class="token constant">C</span> was called
foo
<span class="token constant">B</span> was called
<span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-3-2-不可以和-或-操作符共运" tabindex="-1"><a class="header-anchor" href="#_4-3-2-不可以和-或-操作符共运" aria-hidden="true">#</a> 4.3.2 不可以和&amp;&amp;或｜｜ 操作符共运</h4>
<p>若空值合并运算符 ?? 直接与 AND（&amp;&amp;）和 OR（||）操作符组合使用 ?? 是不行的。这种情况下会抛出 SyntaxError。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// '||' and '??' operations cannot be mixed without parentheses.(5076)</span>
<span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token operator">??</span> <span class="token string">"foo"</span><span class="token punctuation">;</span> <span class="token comment">// raises a SyntaxError</span>

<span class="token comment">// '&amp;&amp;' and '??' operations cannot be mixed without parentheses.(5076)</span>
<span class="token punctuation">(</span><span class="token boolean">true</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token operator">??</span> <span class="token string">"foo"</span><span class="token punctuation">;</span> <span class="token comment">// raises a SyntaxError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但当使用括号来显式表明优先级时是可行的，比如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token operator">??</span> <span class="token string">"foo"</span><span class="token punctuation">;</span> <span class="token comment">// 返回 "foo"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4-3-3-与可选链操作符-关系" tabindex="-1"><a class="header-anchor" href="#_4-3-3-与可选链操作符-关系" aria-hidden="true">#</a> 4.3.3 与可选链操作符？.关系</h4>
<p>空值合并运算符针对 undefined 与 null 这两个值，可选链式操作符 ?. 也是如此。可选链式操作符，对于访问属性可能为 undefined 与 null 的对象时非常有用。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Customer</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  city<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> customer<span class="token operator">:</span> Customer <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"Semlinker"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> customerCity <span class="token operator">=</span> customer<span class="token operator">?.</span>city <span class="token operator">??</span> <span class="token string">"Unknown city"</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>customerCity<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出：Unknown city</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前面我们已经介绍了空值合并运算符的应用场景和使用时的一些注意事项，该运算符不仅可以在 TypeScript 3.7 以上版本中使用。当然你也可以在 JavaScript 的环境中使用它，但你需要借助 Babel，在 Babel 7.8.0 版本也开始支持空值合并运算符。</p>
<h3 id="_4-4-可选属性" tabindex="-1"><a class="header-anchor" href="#_4-4-可选属性" aria-hidden="true">#</a> 4.4 可选属性?:</h3>
<p>在面向对象语言中，接口是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类去实现。 <strong><em>TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。</em></strong>
在 TypeScript 中使用 interface 关键字就可以声明一个接口：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> semlinker<span class="token operator">:</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"semlinker"</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">33</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在以上代码中，我们声明了 Person 接口，它包含了两个必填的属性 name 和 age。在初始化 Person 类型变量时，如果缺少某个属性，TypeScript 编译器就会提示相应的错误信息，比如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.(2741)</span>
<span class="token keyword">let</span> lolo<span class="token operator">:</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// Error</span>
  name<span class="token operator">:</span> <span class="token string">"lolo"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了解决上述的问题，我们可以把某个属性声明为可选的：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> lolo<span class="token operator">:</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"lolo"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-4-1-工具-partial-t" tabindex="-1"><a class="header-anchor" href="#_4-4-1-工具-partial-t" aria-hidden="true">#</a> 4.4.1 工具 Partial&lt;T&gt;</h4>
<p>在实际项目开发过程中，为了提高代码复用率，我们可以利用 TypeScript 内置的工具类型 Partial&lt;T&gt; 来快速把某个接口类型中定义的属性变成可选的：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">PullDownRefreshConfig</span> <span class="token punctuation">{</span>
  threshold<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  stop<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * type PullDownRefreshOptions = <span class="token punctuation">{</span>
 *   threshold?: number | undefined;
 *   stop?: number | undefined;
 * <span class="token punctuation">}</span>
 */</span>
<span class="token keyword">type</span> <span class="token class-name">PullDownRefreshOptions</span> <span class="token operator">=</span> Partial<span class="token operator">&lt;</span>PullDownRefreshConfig<span class="token operator">></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是不是觉得 Partial&lt;T&gt; 很方便，下面让我们来看一下它是如何实现的：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Make all properties in T optional
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Partial<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-4-2-工具-required-t" tabindex="-1"><a class="header-anchor" href="#_4-4-2-工具-required-t" aria-hidden="true">#</a> 4.4.2 工具 Required&lt;T&gt;</h4>
<p>既然可以快速地把某个接口中定义的属性全部声明为可选，那能不能把所有的可选的属性变成必选的呢？答案是可以的，针对这个需求，我们可以使用 Required&lt;T&gt; 工具类型，具体的使用方式如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">PullDownRefreshConfig</span> <span class="token punctuation">{</span>
  threshold<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  stop<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">PullDownRefreshOptions</span> <span class="token operator">=</span> Partial<span class="token operator">&lt;</span>PullDownRefreshConfig<span class="token operator">></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * type PullDownRefresh = <span class="token punctuation">{</span>
 *   threshold: number;
 *   stop: number;
 * <span class="token punctuation">}</span>
 */</span>
<span class="token keyword">type</span> <span class="token class-name">PullDownRefresh</span> <span class="token operator">=</span> Required<span class="token operator">&lt;</span>Partial<span class="token operator">&lt;</span>PullDownRefreshConfig<span class="token operator">>></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们来看一下 Required&lt;T&gt; 工具类型是如何实现的：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Make all properties in T required
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Required<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原来在 Required&lt;T&gt;
工具类型内部，通过 -? 移除了可选属性中的 ?，使得属性从可选变为必选的。</p>
<h3 id="_4-5-运算符" tabindex="-1"><a class="header-anchor" href="#_4-5-运算符" aria-hidden="true">#</a> 4.5 &amp; 运算符</h3>
<p>在 TypeScript 中交叉类型是将多个类型合并为一个类型。通过 &amp; 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">PartialPointX</span> <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">Point</span> <span class="token operator">=</span> PartialPointX <span class="token operator">&amp;</span> <span class="token punctuation">{</span> y<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> point<span class="token operator">:</span> Point <span class="token operator">=</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  y<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面代码中我们先定义了 PartialPointX 类型，接着使用 &amp; 运算符创建一个新的 Point 类型，表示一个含有 x 和 y 坐标的点，然后定义了一个 Point 类型的变量并初始化。</p>
<h4 id="_4-5-1-同名基础类型属性的合并" tabindex="-1"><a class="header-anchor" href="#_4-5-1-同名基础类型属性的合并" aria-hidden="true">#</a> 4.5.1 同名基础类型属性的合并</h4>
<p>那么现在问题来了，假设在合并多个类型的过程中，刚好出现某些类型存在相同的成员，但对应的类型又不一致，比如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">X</span></span> <span class="token punctuation">{</span>
  c<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  d<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">Y</span></span> <span class="token punctuation">{</span>
  c<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  e<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">XY</span></span> <span class="token operator">=</span> <span class="token constant">X</span> <span class="token operator">&amp;</span> <span class="token constant">Y</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">YX</span></span> <span class="token operator">=</span> <span class="token constant">Y</span> <span class="token operator">&amp;</span> <span class="token constant">X</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> p<span class="token operator">:</span> <span class="token constant">XY</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> q<span class="token operator">:</span> <span class="token constant">YX</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，接口 X 和接口 Y 都含有一个相同的成员 c，但它们的类型不一致。对于这种情况，此时 XY 类型或 YX 类型中成员 c 的类型是不是可以是 string 或 number 类型呢？比如下面的例子：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>p <span class="token operator">=</span> <span class="token punctuation">{</span> c<span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span> d<span class="token operator">:</span> <span class="token string">"d"</span><span class="token punctuation">,</span> e<span class="token operator">:</span> <span class="token string">"e"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="@source/assets/4.5.jpeg" alt="1"></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>q <span class="token operator">=</span> <span class="token punctuation">{</span> c<span class="token operator">:</span> <span class="token string">"c"</span><span class="token punctuation">,</span> d<span class="token operator">:</span> <span class="token string">"d"</span><span class="token punctuation">,</span> e<span class="token operator">:</span> <span class="token string">"e"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="@source/assets/4.5.1.jpeg" alt="1"></p>
<h4 id="_4-5-2-同名非基础类型属性的合并" tabindex="-1"><a class="header-anchor" href="#_4-5-2-同名非基础类型属性的合并" aria-hidden="true">#</a> 4.5.2 同名非基础类型属性的合并</h4>
<p>在上面示例中，刚好接口 X 和接口 Y 中内部成员 c 的类型都是基本数据类型，那么如果是非基本数据类型的话，又会是什么情形。我们来看个具体的例子：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">D</span></span> <span class="token punctuation">{</span>
  d<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">E</span></span> <span class="token punctuation">{</span>
  e<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">F</span></span> <span class="token punctuation">{</span>
  f<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token constant">D</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token constant">E</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">C</span></span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token constant">F</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">ABC</span></span> <span class="token operator">=</span> <span class="token constant">A</span> <span class="token operator">&amp;</span> <span class="token constant">B</span> <span class="token operator">&amp;</span> <span class="token constant">C</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> abc<span class="token operator">:</span> <span class="token constant">ABC</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token punctuation">{</span>
    d<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    e<span class="token operator">:</span> <span class="token string">"semlinker"</span><span class="token punctuation">,</span>
    f<span class="token operator">:</span> <span class="token number">666</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"abc:"</span><span class="token punctuation">,</span> abc<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上代码成功运行后，控制台会输出以下结果：
<img src="@source/assets/4.5.2.jpeg" alt="1">
由上图可知，在混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并。</p>
<h3 id="_4-6-分隔符" tabindex="-1"><a class="header-anchor" href="#_4-6-分隔符" aria-hidden="true">#</a> 4.6 ｜ 分隔符</h3>
<p>在 TypeScript 中联合类型（Union Types）表示取值可以为多种类型中的一种，联合类型使用 | 分隔每个类型。联合类型通常与 null 或 undefined 一起使用：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">/* ... */</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上示例中 name 的类型是 string | undefined 意味着可以将 string 或 undefined 的值传递给 sayHello 函数。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token string">"semlinker"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，对于联合类型来说，你可能会遇到以下的用法：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> num<span class="token operator">:</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token number">2</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">EventNames</span> <span class="token operator">=</span> <span class="token string">"click"</span> <span class="token operator">|</span> <span class="token string">"scroll"</span> <span class="token operator">|</span> <span class="token string">"mousemove"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例中的 1、2 或 'click' 被称为字面量类型，用来约束取值只能是某几个值中的一个。</p>
<h4 id="_4-6-1-类型保护" tabindex="-1"><a class="header-anchor" href="#_4-6-1-类型保护" aria-hidden="true">#</a> 4.6.1 类型保护</h4>
<p>当使用联合类型时，我们必须尽量把当前值的类型收窄为当前值的实际类型，而类型保护就是实现类型收窄的一种手段。</p>
<p>类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。换句话说，类型保护可以保证一个字符串是一个字符串，尽管它的值也可以是一个数字。类型保护与特性检测并不是完全不同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。</p>
<p>目前主要有四种的方式来实现类型保护：</p>
<ul>
<li>in 关键字</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Admin</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  privileges<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  startDate<span class="token operator">:</span> Date<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">UnknownEmployee</span> <span class="token operator">=</span> Employee <span class="token operator">|</span> Admin<span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">printEmployeeInformation</span><span class="token punctuation">(</span>emp<span class="token operator">:</span> UnknownEmployee<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Name: "</span> <span class="token operator">+</span> emp<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"privileges"</span> <span class="token keyword">in</span> emp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Privileges: "</span> <span class="token operator">+</span> emp<span class="token punctuation">.</span>privileges<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"startDate"</span> <span class="token keyword">in</span> emp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Start Date: "</span> <span class="token operator">+</span> emp<span class="token punctuation">.</span>startDate<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>typeof 关键字</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">padLeft</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> padding<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> padding <span class="token operator">===</span> <span class="token string">"number"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">Array</span><span class="token punctuation">(</span>padding <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">" "</span><span class="token punctuation">)</span> <span class="token operator">+</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> padding <span class="token operator">===</span> <span class="token string">"string"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> padding <span class="token operator">+</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Expected string or number, got '</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>padding<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">'.</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>typeof 类型保护只支持两种形式：typeof v === &quot;typename&quot; 和 typeof v !== typename，&quot;typename&quot; 必须是 &quot;number&quot;， &quot;string&quot;， &quot;boolean&quot; 或 &quot;symbol&quot;。 但是 TypeScript 并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护。</p>
<ul>
<li>instanceof 关键字</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Padder</span> <span class="token punctuation">{</span>
  <span class="token function">getPaddingString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">SpaceRepeatingPadder</span> <span class="token keyword">implements</span> <span class="token class-name">Padder</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> numSpaces<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">getPaddingString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>numSpaces <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">" "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">StringPadder</span> <span class="token keyword">implements</span> <span class="token class-name">Padder</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">getPaddingString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> padder<span class="token operator">:</span> Padder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SpaceRepeatingPadder</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>padder <span class="token keyword">instanceof</span> <span class="token class-name">SpaceRepeatingPadder</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// padder的类型收窄为 'SpaceRepeatingPadder'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>自定义类型保护的(is)类型谓词（type predicate）</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">isNumber</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> x <span class="token keyword">is</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">typeof</span> x <span class="token operator">===</span> <span class="token string">"number"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">isString</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> x <span class="token keyword">is</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">typeof</span> x <span class="token operator">===</span> <span class="token string">"string"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-7-数字分割符" tabindex="-1"><a class="header-anchor" href="#_4-7-数字分割符" aria-hidden="true">#</a> 4.7 _ 数字分割符</h3>
<p>TypeScript 2.7 带来了对数字分隔符的支持，正如数值分隔符 ECMAScript 提案中所概述的那样。对于一个数字字面量，你现在可以通过把一个下划线作为它们之间的分隔符来分组数字：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> inhabitantsOfMunich <span class="token operator">=</span> <span class="token number">1_464_301</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> distanceEarthSunInKm <span class="token operator">=</span> <span class="token number">149_600_000</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> fileSystemPermission <span class="token operator">=</span> <span class="token number">0b111_111_000</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> bytes <span class="token operator">=</span> <span class="token number">0b1111_10101011_11110000_00001101</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分隔符不会改变数值字面量的值，但逻辑分组使人们更容易一眼就能读懂数字。以上 TS 代码经过编译后，会生成以下 ES5 代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token string">"use strict"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> inhabitantsOfMunich <span class="token operator">=</span> <span class="token number">1464301</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> distanceEarthSunInKm <span class="token operator">=</span> <span class="token number">149600000</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> fileSystemPermission <span class="token operator">=</span> <span class="token number">504</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> bytes <span class="token operator">=</span> <span class="token number">262926349</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-7-1-使用限制" tabindex="-1"><a class="header-anchor" href="#_4-7-1-使用限制" aria-hidden="true">#</a> 4.7.1 使用限制</h4>
<p>虽然数字分隔符看起来很简单，但在使用时还是有一些限制。比如你只能在两个数字之间添加 _ 分隔符。以下的使用方式是非法的：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// Numeric separators are not allowed here.(6188)</span>
3_<span class="token punctuation">.</span><span class="token number">141592</span> <span class="token comment">// Error</span>
<span class="token number">3</span><span class="token punctuation">.</span>_141592 <span class="token comment">// Error</span>

<span class="token comment">// Numeric separators are not allowed here.(6188)</span>
1_e10 <span class="token comment">// Error</span>
1e_10 <span class="token comment">// Error</span>

<span class="token comment">// Cannot find name '_126301'.(2304)</span>
_126301  <span class="token comment">// Error</span>
<span class="token comment">// Numeric separators are not allowed here.(6188)</span>
126301_ <span class="token comment">// Error</span>

<span class="token comment">// Cannot find name 'b111111000'.(2304)</span>
<span class="token comment">// An identifier or keyword cannot immediately follow a numeric literal.(1351)</span>
0_b111111000 <span class="token comment">// Error</span>

<span class="token comment">// Numeric separators are not allowed here.(6188)</span>
0b_111111000 <span class="token comment">// Error</span>
当然你也不能连续使用多个 _ 分隔符，比如：

<span class="token comment">// Multiple consecutive numeric separators are not permitted.(6189)</span>
123__456 <span class="token comment">// Error</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-7-2-解析分隔符" tabindex="-1"><a class="header-anchor" href="#_4-7-2-解析分隔符" aria-hidden="true">#</a> 4.7.2 解析分隔符</h4>
<p>此外，需要注意的是以下用于解析数字的函数是不支持分隔符：</p>
<ul>
<li>Number()</li>
<li>parseInt()</li>
<li>parseFloat()
这里我们来看一下实际的例子：</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">"123_456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token number">NaN</span><span class="token punctuation">;</span>
<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">"123_456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token number">123</span><span class="token punctuation">;</span>
<span class="token function">parseFloat</span><span class="token punctuation">(</span><span class="token string">"123_456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token number">123</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很明显对于以上的结果不是我们所期望的，所以在处理分隔符时要特别注意。当然要解决上述问题，也很简单只需要非数字的字符删掉即可。这里我们来定义一个 removeNonDigits 的函数：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token constant">RE_NON_DIGIT</span> <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[^0-9]</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gu</span></span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">removeNonDigits</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token constant">RE_NON_DIGIT</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token function">Number</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数通过调用字符串的 replace 方法来移除非数字的字符，具体的使用方式如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token function">removeNonDigits</span><span class="token punctuation">(</span><span class="token string">"123_456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token number">123456</span><span class="token punctuation">;</span>
<span class="token function">removeNonDigits</span><span class="token punctuation">(</span><span class="token string">"149,600,000"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token number">149600000</span><span class="token punctuation">;</span>
<span class="token function">removeNonDigits</span><span class="token punctuation">(</span><span class="token string">"1,407,836"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token number">1407836</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-8-type-语法" tabindex="-1"><a class="header-anchor" href="#_4-8-type-语法" aria-hidden="true">#</a> 4.8 &lt;Type&gt; 语法</h3>
<h4 id="_4-8-1-ts-断言" tabindex="-1"><a class="header-anchor" href="#_4-8-1-ts-断言" aria-hidden="true">#</a> 4.8.1 TS 断言</h4>
<p>有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。</p>
<p>通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。</p>
<p>类型断言有两种形式：</p>
<ul>
<li>“尖括号” 语法</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> someValue<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token string">"this is a string"</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> strLength<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span>someValue<span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>as 语法</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> someValue<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token string">"this is a string"</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> strLength<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token punctuation">(</span>someValue <span class="token keyword">as</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-8-2-typescript-泛型" tabindex="-1"><a class="header-anchor" href="#_4-8-2-typescript-泛型" aria-hidden="true">#</a> 4.8.2 TypeScript 泛型</h4>
<p>对于刚接触 TypeScript 泛型的读者来说，首次看到 &lt;T&gt; 语法会感到陌生。其实它没有什么特别，就像传递参数一样，我们传递了我们想要用于特定函数调用的类型。</p>
<p><img src="@source/assets/4.8.1.jpeg" alt="2"></p>
<p>参考上面的图片，当我们调用 identity&lt;Number&gt;(1) ，Number 类型就像参数 1 一样，它将在出现 T 的任何位置填充该类型。图中 &lt;T&gt; 内部的 T 被称为类型变量，它是我们希望传递给 identity 函数的类型占位符，同时它被分配给 value 参数用来代替它的类型：此时 T 充当的是类型，而不是特定的 Number 类型。
其中 T 代表 Type，在定义泛型时通常用作第一个类型变量名称。但实际上 T 可以用任何有效名称代替。除了 T 之外，以下是常见泛型变量代表的意思：</p>
<ul>
<li>K（Key）：表示对象中的键类型；</li>
<li>V（Value）：表示对象中的值类型；</li>
<li>E（Element）：表示元素类型。
其实并不是只能定义一个类型变量，我们可以引入希望定义的任何数量的类型变量。比如我们引入一个新的类型变量 U，用于扩展我们定义的 identity 函数：</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token generic-function"><span class="token function">identity</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> message<span class="token operator">:</span> <span class="token constant">U</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token generic-function"><span class="token function">identity</span><span class="token generic class-name"><span class="token operator">&lt;</span>Number<span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token number">68</span><span class="token punctuation">,</span> <span class="token string">"Semlinker"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/assets/4.8.2.jpeg" alt="2">
除了为类型变量显式设定值之外，一种更常见的做法是使编译器自动选择这些类型，从而使代码更简洁。我们可以完全省略尖括号，比如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token generic-function"><span class="token function">identity</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> message<span class="token operator">:</span> <span class="token constant">U</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token number">68</span><span class="token punctuation">,</span> <span class="token string">"Semlinker"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于上述代码，编译器足够聪明，能够知道我们的参数类型，并将它们赋值给 T 和 U，而不需要开发人员显式指定它们。</p>
<h3 id="_4-9-xxx-装饰器" tabindex="-1"><a class="header-anchor" href="#_4-9-xxx-装饰器" aria-hidden="true">#</a> 4.9 @XXX 装饰器</h3>
<h4 id="_4-9-1-装饰器语法" tabindex="-1"><a class="header-anchor" href="#_4-9-1-装饰器语法" aria-hidden="true">#</a> 4.9.1 装饰器语法</h4>
<p>对于一些刚接触 TypeScript 的小伙伴来说，在第一次看到 @Plugin({...}) 这种语法可能会觉得很惊讶。其实这是装饰器的语法，装饰器的本质是一个函数，通过装饰器我们可以方便地定义与对象相关的元数据。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">Plugin</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  pluginName<span class="token operator">:</span> <span class="token string">"Device"</span><span class="token punctuation">,</span>
  plugin<span class="token operator">:</span> <span class="token string">"cordova-plugin-device"</span><span class="token punctuation">,</span>
  pluginRef<span class="token operator">:</span> <span class="token string">"device"</span><span class="token punctuation">,</span>
  repo<span class="token operator">:</span> <span class="token string">"https://github.com/apache/cordova-plugin-device"</span><span class="token punctuation">,</span>
  platforms<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"Android"</span><span class="token punctuation">,</span> <span class="token string">"Browser"</span><span class="token punctuation">,</span> <span class="token string">"iOS"</span><span class="token punctuation">,</span> <span class="token string">"macOS"</span><span class="token punctuation">,</span> <span class="token string">"Windows"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Device</span> <span class="token keyword">extends</span> <span class="token class-name">IonicNativePlugin</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在以上代码中，我们通过装饰器来保存 ionic-native 插件的相关元信息，而 @Plugin({...}) 中的 @ 符号只是语法糖，为什么说是语法糖呢？这里我们来看一下编译生成的 ES5 代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">var</span> __decorate <span class="token operator">=</span>
  <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>__decorate<span class="token punctuation">)</span> <span class="token operator">||</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span>decorators<span class="token punctuation">,</span> target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> desc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> c <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">,</span>
      r <span class="token operator">=</span>
        c <span class="token operator">&lt;</span> <span class="token number">3</span>
          <span class="token operator">?</span> target
          <span class="token operator">:</span> desc <span class="token operator">===</span> <span class="token keyword">null</span>
          <span class="token operator">?</span> <span class="token punctuation">(</span>desc <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token operator">:</span> desc<span class="token punctuation">,</span>
      d<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> Reflect <span class="token operator">===</span> <span class="token string">"object"</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> Reflect<span class="token punctuation">.</span>decorate <span class="token operator">===</span> <span class="token string">"function"</span><span class="token punctuation">)</span>
      r <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">decorate</span><span class="token punctuation">(</span>decorators<span class="token punctuation">,</span> target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> desc<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> decorators<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>d <span class="token operator">=</span> decorators<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          r <span class="token operator">=</span> <span class="token punctuation">(</span>c <span class="token operator">&lt;</span> <span class="token number">3</span> <span class="token operator">?</span> <span class="token function">d</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span> <span class="token operator">:</span> c <span class="token operator">></span> <span class="token number">3</span> <span class="token operator">?</span> <span class="token function">d</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> r<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">d</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span> r<span class="token punctuation">;</span>
    <span class="token keyword">return</span> c <span class="token operator">></span> <span class="token number">3</span> <span class="token operator">&amp;&amp;</span> r <span class="token operator">&amp;&amp;</span> Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> r<span class="token punctuation">)</span><span class="token punctuation">,</span> r<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> Device <span class="token operator">=</span> <span class="token doc-comment comment">/** <span class="token keyword">@class</span> */</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>_super<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">__extends</span><span class="token punctuation">(</span>Device<span class="token punctuation">,</span> _super<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">Device</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>_super <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token function">_super</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  Device <span class="token operator">=</span> <span class="token function">__decorate</span><span class="token punctuation">(</span>
    <span class="token punctuation">[</span>
      <span class="token function">Plugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        pluginName<span class="token operator">:</span> <span class="token string">"Device"</span><span class="token punctuation">,</span>
        plugin<span class="token operator">:</span> <span class="token string">"cordova-plugin-device"</span><span class="token punctuation">,</span>
        pluginRef<span class="token operator">:</span> <span class="token string">"device"</span><span class="token punctuation">,</span>
        repo<span class="token operator">:</span> <span class="token string">"https://github.com/apache/cordova-plugin-device"</span><span class="token punctuation">,</span>
        platforms<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"Android"</span><span class="token punctuation">,</span> <span class="token string">"Browser"</span><span class="token punctuation">,</span> <span class="token string">"iOS"</span><span class="token punctuation">,</span> <span class="token string">"macOS"</span><span class="token punctuation">,</span> <span class="token string">"Windows"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token function">Injectable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    Device
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> Device<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>IonicNativePlugin<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过生成的代码可知，@Plugin({...}) 和 @Injectable() 最终会被转换成普通的方法调用，它们的调用结果最终会以数组的形式作为参数传递给 **decorate 函数，而在 **decorate 函数内部会以 Device 类作为参数调用各自的类型装饰器，从而扩展对应的功能。</p>
<h4 id="_4-9-2-装饰器的分类" tabindex="-1"><a class="header-anchor" href="#_4-9-2-装饰器的分类" aria-hidden="true">#</a> 4.9.2 装饰器的分类</h4>
<p>在 TypeScript 中装饰器分为类装饰器、属性装饰器、方法装饰器和参数装饰器四大类。</p>
<ul>
<li>类装饰器
类装饰器声明：</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">type</span> <span class="token class-name">ClassDecorator</span> <span class="token operator">=</span> <span class="token operator">&lt;</span>TFunction <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">Function</span></span><span class="token operator">></span><span class="token punctuation">(</span>
  target<span class="token operator">:</span> TFunction
<span class="token punctuation">)</span> <span class="token operator">=></span> TFunction <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类装饰器顾名思义，就是用来装饰类的。它接收一个参数：</p>
<blockquote>
<p>target: TFunction - 被装饰的类
看完第一眼后，是不是感觉都不好了。没事，我们马上来个例子：</p>
</blockquote>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">Greeter</span><span class="token punctuation">(</span>target<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  target<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">greet</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Hello Semlinker!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Greeter</span></span>
<span class="token keyword">class</span> <span class="token class-name">Greeting</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 内部实现</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> myGreeting <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Greeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myGreeting<span class="token punctuation">.</span><span class="token function">greet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// console output: 'Hello Semlinker!';</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子中，我们定义了 Greeter 类装饰器，同时我们使用了 @Greeter 语法糖，来使用装饰器。</p>
<blockquote>
<blockquote>
<p>友情提示：读者可以直接复制上面的代码，在 TypeScript Playground 中运行查看结果。</p>
</blockquote>
</blockquote>
<ul>
<li>属性装饰器
属性装饰器声明：</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">type</span> <span class="token class-name">PropertyDecorator</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
  target<span class="token operator">:</span> Object<span class="token punctuation">,</span>
  propertyKey<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">symbol</span>
<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>属性装饰器顾名思义，用来装饰类的属性。它接收两个参数：</p>
<blockquote>
<p>target: Object - 被装饰的类
propertyKey: string | symbol - 被装饰类的属性名
趁热打铁，马上来个例子热热身：</p>
</blockquote>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">logProperty</span><span class="token punctuation">(</span>target<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">delete</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> backingField <span class="token operator">=</span> <span class="token string">"_"</span> <span class="token operator">+</span> key<span class="token punctuation">;</span>

  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> backingField<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    writable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    enumerable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    configurable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// property getter</span>
  <span class="token keyword">const</span> <span class="token function-variable function">getter</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> currVal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">[</span>backingField<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Get: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> => </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>currVal<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> currVal<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">// property setter</span>
  <span class="token keyword">const</span> <span class="token function-variable function">setter</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> newVal<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Set: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> => </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>newVal<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">[</span>backingField<span class="token punctuation">]</span> <span class="token operator">=</span> newVal<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">// Create new property with getter and setter</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    get<span class="token operator">:</span> getter<span class="token punctuation">,</span>
    set<span class="token operator">:</span> setter<span class="token punctuation">,</span>
    enumerable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    configurable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">logProperty</span></span>
  <span class="token keyword">public</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"semlinker"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p1<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"kakuqo"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上代码我们定义了一个 logProperty 函数，来跟踪用户对属性的操作，当代码成功运行后，在控制台会输出以下结果：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token function-variable function">Set</span><span class="token operator">:</span> <span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">=></span> semlinker<span class="token punctuation">;</span>
<span class="token function-variable function">Set</span><span class="token operator">:</span> <span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">=></span> kakuqo<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>方法装饰器
方法装饰器声明：</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">type</span> <span class="token class-name">MethodDecorator</span> <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">(</span>
  target<span class="token operator">:</span> Object<span class="token punctuation">,</span>
  propertyKey<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">symbol</span><span class="token punctuation">,</span>
  descriptor<span class="token operator">:</span> TypePropertyDescript<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>
<span class="token punctuation">)</span> <span class="token operator">=></span> TypedPropertyDescriptor<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span> <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法装饰器顾名思义，用来装饰类的方法。它接收三个参数：</p>
<blockquote>
<ul>
<li>target: Object - 被装饰的类</li>
<li>propertyKey: string | symbol - 方法名</li>
<li>descriptor: TypePropertyDescript - 属性描述符</li>
</ul>
</blockquote>
<p>废话不多说，直接上例子：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">LogOutput</span><span class="token punctuation">(</span>tarage<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> descriptor<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> originalMethod <span class="token operator">=</span> descriptor<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token keyword">let</span> <span class="token function-variable function">newMethod</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> result<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token function">originalMethod</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>loggedOutput<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>loggedOutput <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>loggedOutput<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      method<span class="token operator">:</span> key<span class="token punctuation">,</span>
      parameters<span class="token operator">:</span> args<span class="token punctuation">,</span>
      output<span class="token operator">:</span> result<span class="token punctuation">,</span>
      timestamp<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  descriptor<span class="token punctuation">.</span>value <span class="token operator">=</span> newMethod<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Calculator</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">LogOutput</span></span>
  <span class="token function">double</span><span class="token punctuation">(</span>num<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> num <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> calc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Calculator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
calc<span class="token punctuation">.</span><span class="token function">double</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// console ouput: [{method: "double", output: 22, ...}]</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>calc<span class="token punctuation">.</span>loggedOutput<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>参数装饰器
参数装饰器声明：</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">type</span> <span class="token class-name">ParameterDecorator</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
  target<span class="token operator">:</span> Object<span class="token punctuation">,</span>
  propertyKey<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">symbol</span><span class="token punctuation">,</span>
  parameterIndex<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数装饰器顾名思义，是用来装饰函数参数，它接收三个参数：</p>
<blockquote>
<ul>
<li>target: Object - 被装饰的类</li>
<li>propertyKey: string | symbol - 方法名</li>
<li>parameterIndex: number - 方法中参数的索引值</li>
</ul>
</blockquote>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">Log</span><span class="token punctuation">(</span>target<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> parameterIndex<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> functionLogged <span class="token operator">=</span> key <span class="token operator">||</span> target<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">The parameter in position </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>parameterIndex<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> at </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>functionLogged<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> has
	been decorated</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Greeter</span> <span class="token punctuation">{</span>
  greeting<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Log</span></span> phrase<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>greeting <span class="token operator">=</span> phrase<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// console output: The parameter in position 0</span>
<span class="token comment">// at Greeter has been decorated</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-10-xxx-私有字段" tabindex="-1"><a class="header-anchor" href="#_4-10-xxx-私有字段" aria-hidden="true">#</a> 4.10#XXX 私有字段</h3>
<p>在 TypeScript 3.8 版本就开始支持 ECMAScript 私有字段，使用方式如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  #name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>#name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">greet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello, my name is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>#name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> semlinker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"Semlinker"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

semlinker<span class="token punctuation">.</span>#name<span class="token punctuation">;</span>
<span class="token comment">//     ~~~~~</span>
<span class="token comment">// Property '#name' is not accessible outside class 'Person'</span>
<span class="token comment">// because it has a private identifier.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与常规属性（甚至使用 private 修饰符声明的属性）不同，私有字段要牢记以下规则：</p>
<blockquote>
<ul>
<li>私有字段以 # 字符开头，有时我们称之为私有名称；</li>
<li>每个私有字段名称都唯一地限定于其包含的类；</li>
<li>不能在私有字段上使用 TypeScript 可访问性修饰符（如 public 或 private）；</li>
<li>私有字段不能在包含的类之外访问，甚至不能被检测到。</li>
</ul>
</blockquote>
<h4 id="_4-10-1-私有字段与-private-的区别" tabindex="-1"><a class="header-anchor" href="#_4-10-1-私有字段与-private-的区别" aria-hidden="true">#</a> 4.10.1 私有字段与 private 的区别</h4>
<p>说到这里使用 # 定义的私有字段与 private 修饰符定义字段有什么区别呢？现在我们先来看一个 private 的示例：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"Semlinker"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面代码中，我们创建了一个 Person 类，该类中使用 private 修饰符定义了一个私有属性 name，接着使用该类创建一个 person 对象，然后通过 person.name 来访问 person 对象的私有属性，这时 TypeScript 编译器会提示以下异常：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>
Property <span class="token string">'name'</span> <span class="token keyword">is</span> <span class="token keyword">private</span> and only accessible within <span class="token keyword">class</span> <span class="token string">'Person'</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token number">2341</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>那如何解决这个异常呢？当然你可以使用类型断言把 person 转为 any 类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">(</span>person <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过这种方式虽然解决了 TypeScript 编译器的异常提示，但是在运行时我们还是可以访问到 Person 类内部的私有属性，为什么会这样呢？我们来看一下编译生成的 ES5 代码，也许你就知道答案了：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">var</span> Person <span class="token operator">=</span> <span class="token doc-comment comment">/** <span class="token keyword">@class</span> */</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> Person<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"Semlinker"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时相信有些小伙伴会好奇，在 TypeScript 3.8 以上版本通过 # 号定义的私有字段编译后会生成什么代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  #name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>#name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">greet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello, my name is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>#name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上代码目标设置为 ES2015，会编译生成以下代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token string">"use strict"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> __classPrivateFieldSet <span class="token operator">=</span>
  <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>__classPrivateFieldSet<span class="token punctuation">)</span> <span class="token operator">||</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span>receiver<span class="token punctuation">,</span> privateMap<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>privateMap<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>receiver<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">"attempted to set private field on non-instance"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    privateMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>receiver<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> __classPrivateFieldGet <span class="token operator">=</span>
  <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>__classPrivateFieldGet<span class="token punctuation">)</span> <span class="token operator">||</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span>receiver<span class="token punctuation">,</span> privateMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>privateMap<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>receiver<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">"attempted to get private field on non-instance"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> privateMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> _name<span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    _name<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">__classPrivateFieldSet</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> _name<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">greet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello, my name is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">__classPrivateFieldGet</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> _name<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
_name <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过观察上述代码，使用 # 号定义的 ECMAScript 私有字段，会通过 WeakMap 对象来存储，同时编译器会生成 **classPrivateFieldSet 和 **classPrivateFieldGet 这两个方法用于设置值和获取值。</p>
<h3 id="_4-11-参考资料" tabindex="-1"><a class="header-anchor" href="#_4-11-参考资料" aria-hidden="true">#</a> 4.11 参考资料</h3>
<ul>
<li><a href="https://2ality.com/2018/02/numeric-separators.html" target="_blank" rel="noopener noreferrer">ES proposal: numeric separators<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">typescriptlang.org<ExternalLinkIcon/></a></li>
</ul>
</div></template>


