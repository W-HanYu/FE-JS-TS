<template><div><h2 id="五、联合类型和类型别名" tabindex="-1"><a class="header-anchor" href="#五、联合类型和类型别名" aria-hidden="true">#</a> 五、联合类型和类型别名</h2>
<h3 id="_5-1-联合类型" tabindex="-1"><a class="header-anchor" href="#_5-1-联合类型" aria-hidden="true">#</a> 5.1 联合类型</h3>
<p>联合类型通常和 null 或 undefined 一起使用。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token punctuation">(</span>name<span class="token operator">:</span><span class="token builtin">string</span>｜<span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/***/
<span class="token punctuation">}</span>;
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，这里 name 的类型是 string ｜ undefined 意味可以将 string 和 undefined 的值传递给 sayHello 函数：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token string">"semlinker"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这个示例，你可以凭直觉知道类型 A 和类型 B 联合后的类型是同时接受 A 和 B 值的类型。此外，对于联合类型来说，你可能会遇到以下的用法：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> num<span class="token operator">:</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token number">2</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">EventNames</span> <span class="token operator">=</span> <span class="token string">"click"</span> <span class="token operator">|</span> <span class="token string">"scroll"</span> <span class="token operator">|</span> <span class="token string">"mousemove"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>以上示例中的 1、2 或 'click' 被称为字面量类型，用来约束取值只能是某几个值中的一个。</p>
<h3 id="_5-2-可辨识联合" tabindex="-1"><a class="header-anchor" href="#_5-2-可辨识联合" aria-hidden="true">#</a> 5.2 可辨识联合</h3>
<p>TypeScript 可辨识联合（Discriminated Unions）类型，也称为代数数据类型或标签联合类型。它包含 3 个要点：可辨识、联合类型和类型守卫。</p>
<p>这种类型的本质是结合联合类型和字面量类型的一种类型保护方法。如果一个类型是多个类型的联合类型，且多个类型含有一个公共属性，那么就可以利用这个公共属性，来创建不同的类型保护区块。</p>
<h4 id="_5-2-1-可辨识" tabindex="-1"><a class="header-anchor" href="#_5-2-1-可辨识" aria-hidden="true">#</a> 5.2.1 可辨识</h4>
<p>可辨识要求联合类型中的每个元素都含有一个单例类型属性，比如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> CarTransmission <span class="token punctuation">{</span>
  Automatic <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">,</span>
  Manual <span class="token operator">=</span> <span class="token number">300</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Motorcycle</span> <span class="token punctuation">{</span>
  vType<span class="token operator">:</span> <span class="token string">"motorcycle"</span><span class="token punctuation">;</span> <span class="token comment">// discriminant</span>
  make<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token comment">// year</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>
  vType<span class="token operator">:</span> <span class="token string">"car"</span><span class="token punctuation">;</span> <span class="token comment">// discriminant</span>
  transmission<span class="token operator">:</span> CarTransmission<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Truck</span> <span class="token punctuation">{</span>
  vType<span class="token operator">:</span> <span class="token string">"truck"</span><span class="token punctuation">;</span> <span class="token comment">// discriminant</span>
  capacity<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token comment">// in tons</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们分别定义了 Motorcycle、 Car 和 Truck 三个接口，在这些接口中都包含一个 vType 属性，该属性被称为可辨识的属性，而其它的属性只跟特性的接口相关。</p>
<h4 id="_5-2-2-联合类型" tabindex="-1"><a class="header-anchor" href="#_5-2-2-联合类型" aria-hidden="true">#</a> 5.2.2 联合类型</h4>
<p>基于前边的三个接口，我们可以创建 Vehicle 联合类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Vehicle</span> <span class="token operator">=</span> Motorcycle <span class="token operator">|</span> Car <span class="token operator">|</span> Truck<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在我们就可以开始使用 Vehicle 联合类型，对于 Vehicle 类型的变量，它可以表示不同类型的车辆。</p>
<h4 id="_5-2-3-类型守卫" tabindex="-1"><a class="header-anchor" href="#_5-2-3-类型守卫" aria-hidden="true">#</a> 5.2.3.类型守卫</h4>
<p>下面我们来定义一个 evaluatePrice 方法，该方法用于根据车辆的类型、容量和评估因子来计算价格，具体实现如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token constant">EVALUATION_FACTOR</span> <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">evaluatePrice</span><span class="token punctuation">(</span>vehicle<span class="token operator">:</span> Vehicle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> vehicle<span class="token punctuation">.</span>capacity <span class="token operator">*</span> <span class="token constant">EVALUATION_FACTOR</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> myTruck<span class="token operator">:</span> Truck <span class="token operator">=</span> <span class="token punctuation">{</span> vType<span class="token operator">:</span> <span class="token string">"truck"</span><span class="token punctuation">,</span> capacity<span class="token operator">:</span> <span class="token number">9.5</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function">evaluatePrice</span><span class="token punctuation">(</span>myTruck<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于以上代码，TypeScript 编译器将会提示以下错误信息：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>Property <span class="token string">'capacity'</span> does not exist on <span class="token keyword">type</span> <span class="token string">'Vehicle'</span><span class="token punctuation">.</span>
Property <span class="token string">'capacity'</span> does not exist on <span class="token keyword">type</span> <span class="token string">'Motorcycle'</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>原因是在 Motorcycle 接口中，并不存在 capacity 属性，而对于 Car 接口来说，它也不存在 capacity 属性。那么，现在我们应该如何解决以上问题呢？这时，我们可以使用类型守卫。下面我们来重构一下前面定义的 evaluatePrice 方法，重构后的代码如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">evaluatePrice</span><span class="token punctuation">(</span>vehicle<span class="token operator">:</span> Vehicle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">switch</span><span class="token punctuation">(</span>vehicle<span class="token punctuation">.</span>vType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">case</span> <span class="token string">"car"</span><span class="token operator">:</span>
<span class="token keyword">return</span> vehicle<span class="token punctuation">.</span>transmission _ <span class="token constant">EVALUATION_FACTOR</span><span class="token punctuation">;</span>
<span class="token keyword">case</span> <span class="token string">"truck"</span><span class="token operator">:</span>
<span class="token keyword">return</span> vehicle<span class="token punctuation">.</span>capacity _ <span class="token constant">EVALUATION_FACTOR</span><span class="token punctuation">;</span>
<span class="token keyword">case</span> <span class="token string">"motorcycle"</span><span class="token operator">:</span>
<span class="token keyword">return</span> vehicle<span class="token punctuation">.</span>make \<span class="token operator">*</span> <span class="token constant">EVALUATION_FACTOR</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在以上代码中，我们使用 switch 和 case 运算符来实现类型守卫，从而确保在 evaluatePrice 方法中，我们可以安全地访问 vehicle 对象中的所包含的属性，来正确的计算该车辆类型所对应的价格。</p>
<h3 id="_5-3-类型别名" tabindex="-1"><a class="header-anchor" href="#_5-3-类型别名" aria-hidden="true">#</a> 5.3 类型别名</h3>
<p>类型别名用来给一个类型起个新名字。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Message</span> <span class="token operator">=</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token function-variable function">greet</span> <span class="token operator">=</span> <span class="token punctuation">(</span>message<span class="token operator">:</span> Message<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


