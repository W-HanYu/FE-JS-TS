<template><div><h2 id="六、交叉类型" tabindex="-1"><a class="header-anchor" href="#六、交叉类型" aria-hidden="true">#</a> 六、交叉类型</h2>
<p>在 TypeScript 中交叉类型是将多个类型合并为一个类型。通过 &amp; 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">PartialPointX</span> <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">Point</span> <span class="token operator">=</span> PartialPointX <span class="token operator">&amp;</span> <span class="token punctuation">{</span> y<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> point<span class="token operator">:</span> Point <span class="token operator">=</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  y<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面代码中我们先定义了 PartialPointX 类型，接着使用 &amp; 运算符创建一个新的 Point 类型，表示一个含有 x 和 y 坐标的点，然后定义了一个 Point 类型的变量并初始化。</p>
<h3 id="_6-1-同名基础类型属性的合并" tabindex="-1"><a class="header-anchor" href="#_6-1-同名基础类型属性的合并" aria-hidden="true">#</a> 6.1 同名基础类型属性的合并</h3>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="@source/assets/4.5.1.jpeg" alt="1">
为什么接口 X 和接口 Y 混入后，成员 c 的类型会变成 never 呢？这是因为混入后成员 c 的类型为 string &amp; number，即成员 c 的类型既可以是 string 类型又可以是 number 类型。很明显这种类型是不存在的，所以混入后成员 c 的类型为 never。</p>
<h3 id="_6-2-同名非基础类型属性的合并" tabindex="-1"><a class="header-anchor" href="#_6-2-同名非基础类型属性的合并" aria-hidden="true">#</a> 6.2 同名非基础类型属性的合并</h3>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上代码成功运行后，控制台会输出以下结果：</p>
<p><img src="@source/assets/4.5.2.jpeg" alt="1"></p>
<p>由上图可知，在混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并。</p>
</div></template>


