<template><div><h2 id="_3-装饰器-decorators" tabindex="-1"><a class="header-anchor" href="#_3-装饰器-decorators" aria-hidden="true">#</a> 3.装饰器 Decorators</h2>
<h3 id="_3-1-装饰者模式" tabindex="-1"><a class="header-anchor" href="#_3-1-装饰者模式" aria-hidden="true">#</a> 3.1 装饰者模式</h3>
<p>装饰者模式（Decorator Pattern）也称为装饰器模式，在不改变对象自身的基础上，动态增加额外的职责。属于结构型模式的一种。</p>
<p>使用装饰者模式的优点：把对象核心职责和要装饰的功能分开了。非侵入式的行为修改。</p>
<p>举个例子来说，原本长相一般的女孩，借助美颜功能，也能拍出逆天的颜值。只要善于运用辅助的装饰功能，开启瘦脸，增大眼睛，来点磨皮后，咔嚓一拍，惊艳无比。</p>
<p>经过这一系列叠加的装饰，你还是你，长相不增不减，却能在镜头前增加了多重美。如果你愿意，还可以尝试不同的装饰风格，只要装饰功能做的好，你就能成为“百变星君”。</p>
<p>可以用代码表示，把每个功能抽象成一个类：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// 女孩子</span>
<span class="token keyword">class</span> <span class="token class-name">Girl</span> <span class="token punctuation">{</span>
  <span class="token function">faceValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我原本的脸"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ThinFace</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>girl<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>girl <span class="token operator">=</span> girl<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">faceValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>girl<span class="token punctuation">.</span><span class="token function">faceValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"开启瘦脸"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">IncreasingEyes</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>girl<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>girl <span class="token operator">=</span> girl<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">faceValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>girl<span class="token punctuation">.</span><span class="token function">faceValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"增大眼睛"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从代码的表现来看，将一个对象嵌入到另一个对象中，相当于通过一个对象对另一个对象进行包装，形成一条包装链。调用后，随着包装的链条传递给每一个对象，让每个对象都有处理的机会。</p>
<p>这种方式在增加删除装饰功能上都有极大的灵活性，假如你有勇气展示真实的脸，去掉瘦脸的包装即可，这对其他功能毫无影响；假如要增加磨皮，再来个功能类，继续装饰下去，对其他功能也无影响，可以并存运行。</p>
<p>在 javascript 中增加小功能使用类，显的有点笨重，JavaScript 的优点是灵活，可以使用对象来表示：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> girl <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">faceValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我原本的脸"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">thinFace</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"开启瘦脸"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">IncreasingEyes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"增大眼睛"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

girl<span class="token punctuation">.</span>faceValue <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> originalFaveValue <span class="token operator">=</span> girl<span class="token punctuation">.</span>faceValue<span class="token punctuation">;</span> <span class="token comment">// 原来的功能</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">originalFaveValue</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>girl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">thinFace</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>girl<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
girl<span class="token punctuation">.</span>faceValue <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> originalFaveValue <span class="token operator">=</span> girl<span class="token punctuation">.</span>faceValue<span class="token punctuation">;</span> <span class="token comment">// 原来的功能</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">originalFaveValue</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>girl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">IncreasingEyes</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>girl<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在不改变原来代码的基础上，通过先保留原来函数，重新改写，在重写的代码中调用原来保留的函数。</p>
<p>用一张图来表示装饰者模式的原理：</p>
<p><img src="@source/assets/decorators.png" alt="3"></p>
<p>从图中可以看出来，通过一层层的包装，增加了原先对象的功能。</p>
<h3 id="_3-2-typescript-装饰器" tabindex="-1"><a class="header-anchor" href="#_3-2-typescript-装饰器" aria-hidden="true">#</a> 3.2 Typescript 装饰器</h3>
<p>Javascript 规范里的装饰器目前处在 建议征集的第二阶段，也就意味着不能在原生代码中直接使用，浏览器暂不支持。</p>
<p>可以通过 babel 或 TypeScript 工具在编译阶段，把装饰器语法转换成浏览器可执行的代码。（最后会有编译后的源码分析）</p>
<p>以下主要讨论 TypeScript 中装饰器的使用。</p>
<p>TypeScript 中的装饰器可以被附加到类声明、方法、 访问符(getter/setter)、属性和参数上。</p>
<p>开启对装饰器的支持，命令行 编译文件时</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>tsc <span class="token operator">--</span>target <span class="token constant">ES5</span> <span class="token operator">--</span>experimentalDecorators test<span class="token punctuation">.</span>ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置文件 tsconfig.json</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token punctuation">{</span>
    <span class="token string-property property">"compilerOptions"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">"target"</span><span class="token operator">:</span> <span class="token string">"ES5"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"experimentalDecorators"</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-装饰器的使用" tabindex="-1"><a class="header-anchor" href="#_3-3-装饰器的使用" aria-hidden="true">#</a> 3.3 装饰器的使用</h3>
<p>装饰器实际上就是一个函数，在使用时前面加上 @ 符号，写在要装饰的声明之前，多个装饰器同时作用在一个声明时，可以写一行或换行写：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// 换行写</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">test1</span></span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">test2</span></span>
declaration

<span class="token comment">//写一行</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">test1</span></span> <span class="token decorator"><span class="token at operator">@</span><span class="token function">test2</span></span> <span class="token operator">...</span>
declaration
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义 face.ts 文件：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">thinFace</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"开启瘦脸"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">thinFace</span></span>
<span class="token keyword">class</span> <span class="token class-name">Girl</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译成 js 代码，在运行时，会直接调用 thinFace 函数。这个装饰器作用在类上，称之为类装饰器。</p>
<p>如果需要附加多个功能，可以组合多个装饰器一起使用：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">thinFace</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"开启瘦脸"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">IncreasingEyes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"增大眼睛"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">thinFace</span></span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">IncreasingEyes</span></span>
<span class="token keyword">class</span> <span class="token class-name">Girl</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多个装饰器组合在一起，在运行时，要注意，调用顺序是 从下至上 依次调用，正好和书写的顺序相反。例子中给出的运行结果是：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token string">"增大眼睛"</span><span class="token punctuation">;</span>
<span class="token string">"开启瘦脸"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你要在一个装饰器中给类添加属性，在其他的装饰器中使用，那就要写在最后一个装饰器中，因为最后写的装饰器最先调用。</p>
<h3 id="_3-4-装饰器工厂" tabindex="-1"><a class="header-anchor" href="#_3-4-装饰器工厂" aria-hidden="true">#</a> 3.4 装饰器工厂</h3>
<p>有时需要给装饰器传递一些参数，这要借助于装饰器工厂函数。装饰器工厂函数实际上就是一个高阶函数，在调用后返回一个函数，返回的函数作为装饰器函数。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">thinFace</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"1-瘦脸工厂方法"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">4-我是瘦脸的装饰器，要瘦脸</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">IncreasingEyes</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"2-增大眼睛工厂方法"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">3-我是增大眼睛的装饰器，要</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">thinFace</span></span><span class="token punctuation">(</span><span class="token string">"50%"</span><span class="token punctuation">)</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">IncreasingEyes</span></span><span class="token punctuation">(</span><span class="token string">"增大一倍"</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">Girl</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@ 符号后为调用工厂函数，依次从上到下执行，目的是求得装饰器函数。装饰器函数的运行顺序依然是从下到上依次执行。</p>
<p>运行的结果为：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token number">1</span><span class="token operator">-</span>瘦脸工厂方法
<span class="token number">2</span><span class="token operator">-</span>增大眼睛工厂方法
<span class="token number">3</span><span class="token operator">-</span>我是增大眼睛的装饰器，要增大一倍
<span class="token number">4</span><span class="token operator">-</span>我是瘦脸的装饰器，要瘦脸<span class="token number">50</span><span class="token operator">%</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>总结一下：</p>
<ul>
<li>写了工厂函数，从上到下依次执行，求得装饰器函数。</li>
<li>装饰器函数的执行顺序是 从下到上 依次执行。</li>
</ul>
</li>
</ul>
<h3 id="_3-5-类装饰器" tabindex="-1"><a class="header-anchor" href="#_3-5-类装饰器" aria-hidden="true">#</a> 3.5 类装饰器</h3>
<p>作用在类声明上的装饰器，可以给我们改变类的机会。在执行装饰器函数时，会把类构造函数传递给装饰器函数。</p>
<p>类装饰器在类声明之前被声明（紧靠着类声明）。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。 类装饰器不能用在声明文件中( .d.ts)，也不能用在任何外部上下文中（比如 declare 的类）。</p>
<p>类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。</p>
<p>如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。</p>
<p>注意 如果你要返回一个新的构造函数，你必须注意处理好原来的原型链。 在运行时的装饰器调用逻辑中 不会为你做这些。</p>
<p>下面是使用类装饰器(@sealed)的例子，应用在 Greeter 类：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">sealed</span></span>
<span class="token keyword">class</span> <span class="token class-name">Greeter</span> <span class="token punctuation">{</span>
  greeting<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>greeting <span class="token operator">=</span> message<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">greet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"Hello, "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>greeting<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以这样定义@sealed 装饰器：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">sealed</span><span class="token punctuation">(</span>constructor<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Object<span class="token punctuation">.</span><span class="token function">seal</span><span class="token punctuation">(</span>constructor<span class="token punctuation">)</span><span class="token punctuation">;</span>
  Object<span class="token punctuation">.</span><span class="token function">seal</span><span class="token punctuation">(</span>constructor<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当@sealed 被执行的时候，它将密封此类的构造函数和原型。(注：参见 Object.seal)</p>
<p>下面是一个重载构造函数的例子。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token generic-function"><span class="token function">classDecorator</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">{</span> <span class="token keyword">new</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>
  constructor<span class="token operator">:</span> <span class="token constant">T</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">class</span> <span class="token class-name"><span class="token keyword">extends</span></span> constructor <span class="token punctuation">{</span>
    newProperty <span class="token operator">=</span> <span class="token string">"new property"</span><span class="token punctuation">;</span>
    hello <span class="token operator">=</span> <span class="token string">"override"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">classDecorator</span></span>
<span class="token keyword">class</span> <span class="token class-name">Greeter</span> <span class="token punctuation">{</span>
  property <span class="token operator">=</span> <span class="token string">"property"</span><span class="token punctuation">;</span>
  hello<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>m<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>hello <span class="token operator">=</span> m<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Greeter</span><span class="token punctuation">(</span><span class="token string">"world"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">classDecorator</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>constructor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"接收一个构造函数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">thinFace</span><span class="token punctuation">(</span>constructor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  constructor<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">thinFaceFeature</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"瘦脸功能"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">thinFace</span></span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">classDecorator</span></span><span class="token punctuation">(</span><span class="token string">"类装饰器"</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">Girl</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">let</span> g <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Girl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

g<span class="token punctuation">.</span><span class="token function">thinFaceFeature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '瘦脸功能'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子中，拿到传递构造函数后，就可以给构造函数原型上增加新的方法，甚至也可以继承别的类。</p>
<h3 id="_3-6-方法装饰器" tabindex="-1"><a class="header-anchor" href="#_3-6-方法装饰器" aria-hidden="true">#</a> 3.6 方法装饰器</h3>
<p>方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。 方法装饰器不能用在声明文件( .d.ts)，重载或者任何外部上下文（比如 declare 的类）中。</p>
<p>方法装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数：</p>
<p>对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
成员的名字。
成员的属性描述符。
注意   如果代码输出目标版本小于 ES5，属性描述符将会是 undefined。</p>
<p>如果方法装饰器返回一个值，它会被用作方法的属性描述符。</p>
<p>注意   如果代码输出目标版本小于 ES5 返回值会被忽略。</p>
<p>下面是一个方法装饰器（@enumerable）的例子，应用于 Greeter 类的方法上：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Greeter</span> <span class="token punctuation">{</span>
  greeting<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>greeting <span class="token operator">=</span> message<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">enumerable</span></span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token function">greet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"Hello, "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>greeting<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以用下面的函数声明来定义@enumerable 装饰器：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">enumerable</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
    target<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span>
    propertyKey<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    descriptor<span class="token operator">:</span> PropertyDescriptor
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    descriptor<span class="token punctuation">.</span>enumerable <span class="token operator">=</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的@enumerable(false)是一个装饰器工厂。 当装饰器 @enumerable(false)被调用时，它会修改属性描述符的 enumerable 属性。</p>
<p>作用在类的方法上，有静态方法和原型方法。作用在静态方法上，装饰器函数接收的是类构造函数；作用在原型方法上，装饰器函数接收的是原型对象。
这里拿作用在原型方法上举例。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">methodDecorator</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> Girl<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>prototype<span class="token punctuation">,</span> key<span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      <span class="token string">"接收原型对象，装饰的属性名，属性描述符"</span><span class="token punctuation">,</span>
      Girl<span class="token punctuation">.</span>prototype <span class="token operator">===</span> prototype
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">thinFace</span><span class="token punctuation">(</span>prototype<span class="token punctuation">,</span> key<span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 保留原来的方法逻辑</span>
  <span class="token keyword">let</span> originalMethod <span class="token operator">=</span> descriptor<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token comment">// 改写，增加逻辑，并执行原有逻辑</span>
  descriptor<span class="token punctuation">.</span><span class="token function-variable function">value</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">originalMethod</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 注意修改 this 的指向</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"开启瘦脸模式"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Girl</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">thinFace</span></span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">methodDecorator</span></span><span class="token punctuation">(</span><span class="token string">"方式装饰器"</span><span class="token punctuation">,</span> Girl<span class="token punctuation">)</span>
  <span class="token function">faceValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我是原本的面目"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> g <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Girl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

g<span class="token punctuation">.</span><span class="token function">faceValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从代码中可以看出，装饰器函数接收三个参数，原型对象、方法名、描述对象。对描述对象陌生的，可以参考 这里;</p>
<p>要增强功能，可以先保留原来的函数，改写描述对象的 value 为另一函数。</p>
<p>当使用 g.faceValue() 访问方法时，访问的就是描述对象 value 对应的值。</p>
<p>在改写的函数中增加逻辑，并执行原来保留的原函数。注意原函数要用 call 或 apply 将 this 指向原型对象。</p>
<h3 id="_3-7-属性装饰器" tabindex="-1"><a class="header-anchor" href="#_3-7-属性装饰器" aria-hidden="true">#</a> 3.7 属性装饰器</h3>
<p>作用在类中定义的属性上，这些属性不是原型上的属性，而是通过类实例化得到的实例对象上的属性。</p>
<p>装饰器同样会接受两个参数，原型对象，和属性名。而没有属性描述对象，为什么呢？这与 TypeScript 是如何初始化属性装饰器的有关。 目前没有办法在定义一个原型对象的成员时描述一个实例属性。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">propertyDecorator</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> Girl<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>prototype<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      <span class="token string">"接收原型对象，装饰的属性名，属性描述符"</span><span class="token punctuation">,</span>
      Girl<span class="token punctuation">.</span>prototype <span class="token operator">===</span> prototype
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">thinFace</span><span class="token punctuation">(</span>prototype<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>prototype<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Girl</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">thinFace</span></span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">propertyDecorator</span></span><span class="token punctuation">(</span><span class="token string">"属性装饰器"</span><span class="token punctuation">,</span> Girl<span class="token punctuation">)</span>
  <span class="token keyword">public</span> age<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> g <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Girl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>g<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 18</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-8-其他装饰器的写法" tabindex="-1"><a class="header-anchor" href="#_3-8-其他装饰器的写法" aria-hidden="true">#</a> 3.8 其他装饰器的写法</h3>
<p>下面组合多个装饰器写在一起，出了上面提到的三种，还有 访问符装饰器、参数装饰器。这些装饰器在一起时，会有执行顺序。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">classDecorator</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">propertyDecorator</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"propertyDecorator"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">methodDecorator</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"methodDecorator"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">paramDecorator</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"paramDecorator"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">AccessDecorator</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"AccessDecorator"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">thinFace</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"瘦脸"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">IncreasingEyes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"增大眼睛"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">thinFace</span></span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">classDecorator</span></span><span class="token punctuation">(</span><span class="token string">"类装饰器"</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">Girl</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">propertyDecorator</span></span><span class="token punctuation">(</span><span class="token string">"属性装饰器"</span><span class="token punctuation">)</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">AccessDecorator</span></span><span class="token punctuation">(</span><span class="token string">"访问符装饰器"</span><span class="token punctuation">)</span>
  <span class="token keyword">get</span> <span class="token function">city</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">methodDecorator</span></span><span class="token punctuation">(</span><span class="token string">"方法装饰器"</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">IncreasingEyes</span></span>
  <span class="token function">faceValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"原本的脸"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">paramDecorator</span></span><span class="token punctuation">(</span><span class="token string">"参数装饰器"</span><span class="token punctuation">)</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行了这段编译后的代码，会发现这些访问器的顺序是，属性装饰器 -&gt; 访问符装饰器 -&gt; 方法装饰器 -&gt; 参数装饰器 -&gt; 类装饰器。</p>
<p><a href="https://www.tslang.cn/docs/handbook/decorators.html#decorator-factories" target="_blank" rel="noopener noreferrer">更详细的用法可以参考官网文档<ExternalLinkIcon/></a></p>
<h3 id="_3-9-装饰器运行时代码分析" tabindex="-1"><a class="header-anchor" href="#_3-9-装饰器运行时代码分析" aria-hidden="true">#</a> 3.9 装饰器运行时代码分析</h3>
<p>装饰器在浏览器中不支持，没办法直接使用，需要经过工具编译成浏览器可执行的代码。</p>
<p>分析一下通过工具编译后的代码。</p>
<p>生成 face.js 文件：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>

tsc <span class="token operator">--</span>target <span class="token constant">ES5</span> <span class="token operator">--</span>experimentalDecorators face<span class="token punctuation">.</span>ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开 face.js 文件，会看到一段被压缩后的代码，可以格式化一下。</p>
<p>先看这段代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token operator">**</span><span class="token function">decorate</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
<span class="token function">propertyDecorator</span><span class="token punctuation">(</span><span class="token string">'属性装饰器'</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span> Girl<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">**</span><span class="token function">decorate</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
<span class="token function">AccessDecorator</span><span class="token punctuation">(</span><span class="token string">'访问符装饰器'</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span> Girl<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">"city"</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">**</span><span class="token function">decorate</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
<span class="token function">methodDecorator</span><span class="token punctuation">(</span><span class="token string">'方法装饰器'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
IncreasingEyes
<span class="token punctuation">]</span><span class="token punctuation">,</span> Girl<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">"faceValue"</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">**</span><span class="token function">decorate</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
<span class="token function">__param</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">paramDecorator</span><span class="token punctuation">(</span><span class="token string">'参数装饰器'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span> Girl<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">"getAge"</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Girl <span class="token operator">=</span> <span class="token operator">**</span><span class="token function">decorate</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
thinFace<span class="token punctuation">,</span>
<span class="token function">classDecorator</span><span class="token punctuation">(</span><span class="token string">'类装饰器'</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span> Girl<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**decorate 的作用就是执行装饰器函数，从这段代码中能够看出很多信息，印证上面得到的结论。</p>
<p>通过__decorate 调用顺序，可以看出来，多个类型的装饰器一起使用时，顺序是，属性装饰器 -&gt; 访问符装饰器 -&gt; 方法装饰器 -&gt; 参数装饰器 -&gt; 类装饰器。</p>
<p>调用了 __decorate 函数，根据使用的装饰器类型不同，传入的参数也不相同。</p>
<p>第一个参数传入的都一样，为数组，这样确保和我们书写的顺序一致，每一项是求值后的装饰器函数，如果写的是 @propertyDecorator() 则一上来就执行，得到装饰器函数，这跟上面分析的一致。</p>
<p>类装饰器会把类作为第二个参数，其他的装饰器，把原型对象作为第二个参数，属性名作为第三个，第四个是 null 或 void 0。void 0 的值为 undefined，也就等于没传参数</p>
<p>要记住传给 **decorate 函数参数的个数和值，在深入到 **decorate 源码中， 会根据这些值来决定执行装饰器函数时，传入参数的多少。</p>
<p>好，来看 __decorate 函数实现：</p>
<p>// 已存在此函数，直接使用，否则自己定义</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">var</span> <span class="token operator">**</span>decorate <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token operator">**</span>decorate<span class="token punctuation">)</span> <span class="token operator">||</span>
<span class="token comment">// 接收四个参数：</span>
<span class="token comment">//decorators 存放装饰器函数的数组、target 原型对象|类，</span>
<span class="token comment">//key 属性名、desc 描述（undefined 或 null）</span>
<span class="token keyword">function</span><span class="token punctuation">(</span>decorators<span class="token punctuation">,</span> target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> desc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">,</span>
<span class="token comment">// 拿到参数的个数</span>
r <span class="token operator">=</span> c <span class="token operator">&lt;</span> <span class="token number">3</span> <span class="token comment">// 参数小于三个，说明是类装饰器，直接拿到类</span>
<span class="token operator">?</span> target
<span class="token operator">:</span> desc <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token comment">// 第四个参数为 null，则需要描述对象；属性装饰器传入是 void 0，没有描述对象。</span>
<span class="token operator">?</span> desc <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
<span class="token operator">:</span> desc<span class="token punctuation">,</span>
d<span class="token punctuation">;</span>
<span class="token comment">// 如果提供了 Reflect.decorate 方法，直接调用；否则自己实现</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> Reflect <span class="token operator">===</span> <span class="token string">"object"</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> Reflect<span class="token punctuation">.</span>decorate <span class="token operator">===</span> <span class="token string">"function"</span><span class="token punctuation">)</span>
r <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">decorate</span><span class="token punctuation">(</span>decorators<span class="token punctuation">,</span> target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> desc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">else</span>
<span class="token comment">// 装饰器函数执行顺序和书写的顺序相反，从下至上 执行</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> decorators<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>d <span class="token operator">=</span> decorators<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 拿到装饰器函数</span>
r <span class="token operator">=</span> <span class="token punctuation">(</span>c <span class="token operator">&lt;</span> <span class="token number">3</span> <span class="token comment">// 参数小于 3 个，说明是类装饰器，执行装饰器函数，直接传入类</span>
<span class="token operator">?</span> <span class="token function">d</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
<span class="token operator">:</span> c <span class="token operator">></span> <span class="token number">3</span> <span class="token comment">// 参数大于三个，是方法装饰器、访问符装饰器、参数装饰器，则执行传入描述对象</span>
<span class="token operator">?</span> <span class="token function">d</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
<span class="token operator">:</span> <span class="token function">d</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token comment">// 为属性装饰器，不传入描述对象</span>
<span class="token punctuation">)</span> <span class="token operator">||</span> r<span class="token punctuation">;</span>

<span class="token comment">// 给被装饰的属性，设置得到的描述对象，主要是针对，方法、属性来说的</span>
<span class="token operator">/</span>_\<span class="token operator">*</span>\<span class="token operator">*</span>
_ r 的值分两种情况，
_ 一种是通过上面的 Object<span class="token punctuation">.</span>getOwnPropertyDescriptor 得到的值
_ 另一种，是装饰器函数执行后的返回值，作为描述对象。
_ 一般不给装饰器函数返回值。
_<span class="token operator">/</span>
<span class="token keyword">return</span> c <span class="token operator">></span> <span class="token number">3</span> <span class="token operator">&amp;&amp;</span> r <span class="token operator">&amp;&amp;</span> Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> r<span class="token punctuation">)</span><span class="token punctuation">,</span>r<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的参数装饰器，调用了一个函数为 __params，</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">var</span> <span class="token operator">**</span>param <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token operator">**</span>param<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>paramIndex<span class="token punctuation">,</span> decorator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">decorator</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> paramIndex<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token template-punctuation string">`</span></span>`
目的是，要给装饰器函数传入参数的位置 paramIndex。

看了编译后的源码，相信会对装饰器的理解更深刻。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


