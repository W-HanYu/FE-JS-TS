<template><div><p>TypeScript 类型编程的代码看起来比较复杂，但其实这些逻辑用 JS 大家都会写，之所以到了类型体操就不会了，那是因为还不熟悉一些套路。</p>
<p>所以，这节开始我们就来学习一些类型体操的套路，熟悉这些套路之后，各种类型体操逻辑就能够很顺畅的写出来。</p>
<p>首先，我们来学习类型体操的第一个套路：模式匹配做提取。</p>
<h2 id="模式匹配" tabindex="-1"><a class="header-anchor" href="#模式匹配" aria-hidden="true">#</a> 模式匹配</h2>
<p>我们知道，字符串可以和正则做模式匹配，找到匹配的部分，提取子组，之后可以用 1,2 等引用匹配的子组。</p>
<p>Typescript 的类型也同样可以做模式匹配。</p>
<p>比如这样一个 Promise 类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">p</span> <span class="token operator">=</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token string">"tao"</span><span class="token operator">></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们想提取 value 的类型，可以这样做：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">GetValueType<span class="token operator">&lt;</span><span class="token constant">P</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">P</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">infer</span> Value<span class="token operator">></span></span> <span class="token operator">?</span> Value <span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过 extends 对传入的类型参数 P 做模式匹配，其中值的类型是需要提取的，通过 infer 声明一个局部变量 Value 来保存，如果匹配，就返回匹配到的 Value，否则就返回 never 代表没匹配到。</p>
<p>这就是 Typescript 类型的模式匹配：</p>
<p>Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，结果保存到通过 infer 声明的局部类型变量里，如果匹配就能从该局部变量里拿到提取出的类型。</p>
<p>这个模式匹配的套路有多有用呢？我们来看下在数组、字符串、函数、构造器等类型里的应用。</p>
<h2 id="数组类型" tabindex="-1"><a class="header-anchor" href="#数组类型" aria-hidden="true">#</a> 数组类型</h2>
<h3 id="first" tabindex="-1"><a class="header-anchor" href="#first" aria-hidden="true">#</a> First</h3>
<p>数组类型想提取第一个元素的类型怎么做呢？</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">arr</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>用它来匹配一个模式类型，提取第一个元素的类型到通过 <code v-pre>infer</code> 声明的局部变量里返回。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">GetFirst<span class="token operator">&lt;</span>Arr <span class="token keyword">extends</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span> <span class="token operator">=</span> Arr <span class="token keyword">extends</span> <span class="token punctuation">[</span><span class="token keyword">infer</span> First<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
  <span class="token operator">?</span> First
  <span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类型参数 Arr 通过 <code v-pre>extends</code> 约束为只能是数组类型，数组元素是 <code v-pre>unkown</code> 也就是可以是任何值。</p>
<blockquote>
<p>any 和 unknown 的区别： any 和 unknown 都代表任意类型，但是 unknown 只能接收任意类型的值，而 any 除了可以接收任意类型的值，也可以赋值给任意类型（除了 never）。类型体操中经常用 unknown 接受和匹配任何类型，而很少把任何类型赋值给某个类型变量。</p>
</blockquote>
<p>对 Arr 做模式匹配，把我们要提取的第一个元素的类型放到通过 <code v-pre>infer</code> 声明的 <code v-pre>First</code> 局部变量里，后面的元素可以是任何类型，用 <code v-pre>unknown</code> 接收，然后把局部变量 <code v-pre>First</code> 返回。</p>
<ul>
<li>
<p>当类型参数 Arr 为 ['a','b','c'] 时：</p>
<img src="@source/ts-type-gymnastics/assets/1.GetArrFirstValue.png" width="400px">
</li>
<li>
<p>当类型参数 Arr 为 [] 时：</p>
<img src="@source/ts-type-gymnastics/assets/1.GetFirstArrValue-e.png" width="400px">
</li>
</ul>
<p><a href="https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwDECWAnAzsAPAQRSqEAHsBAHYAmaUArqQNakD2A7qQNoC6AfFALxS58REhSpskpAGYR8ydMAA0UAHSraDFuw4coAfihyMUAFxRSEAG4yA3AChboSFADm8Q8ABqAQwA21CACMfLBuqBiYbADkXpEKkQBGsZEAxpHcdg7g0K6IYZ6+-gBMwXC58hHpQA" target="_blank" rel="noopener noreferrer">试一哈<ExternalLinkIcon/></a></p>
<h3 id="last" tabindex="-1"><a class="header-anchor" href="#last" aria-hidden="true">#</a> Last</h3>
<p>同理，可以提取最后一个元素</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">GetLast<span class="token operator">&lt;</span>Arr <span class="token keyword">extends</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span> <span class="token operator">=</span> Arr <span class="token keyword">extends</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">infer</span> Last<span class="token punctuation">]</span>
  <span class="token operator">?</span> Last
  <span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>当类型参数 Arr 为 ['a','b','c'] 时：</p>
<img src="@source/ts-type-gymnastics/assets/2.GetArrLstValue.png" width="400px">
</li>
</ul>
<p><a href="https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwBkCGBnYAeAggJ21CAHsBAHYAmKUAriQNYkD2A7iQNoC6AfFALxQ55CxcpVYA6CTXrM27ADQBLEgDMIeZGjlR2UAPxQNwKAC4oJCADc1AbgBQ90JCgBzeIYBqSADZVofOIioGKwA5EghciEARhEhAMYhXHZAA" target="_blank" rel="noopener noreferrer">试一哈<ExternalLinkIcon/></a></p>
<h3 id="poparr" tabindex="-1"><a class="header-anchor" href="#poparr" aria-hidden="true">#</a> PopArr</h3>
<p>我们分别取了首尾元素，当然也可以取剩余的数组，比如取去掉了最后一个元素的数组：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">PopArr<span class="token operator">&lt;</span>Arr <span class="token keyword">extends</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span> <span class="token operator">=</span> Arr <span class="token keyword">extends</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token operator">:</span> Arr <span class="token keyword">extends</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token keyword">infer</span> Rest<span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token punctuation">]</span>
  <span class="token operator">?</span> Rest
  <span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是空数组，就直接返回，否则匹配剩余的元素，放到 infer 声明的局部变量 Rest 里，返回 Rest。</p>
<ul>
<li>
<p>当类型参数 Arr 为 [1,2,3] 时：</p>
<img src="@source/ts-type-gymnastics/assets/3.PopArr1.png" width="400px">
</li>
<li>
<p>当类型参数 Arr 为 [] 时：</p>
<img src="@source/ts-type-gymnastics/assets/3.PopArr2.png" width="400px">
</li>
</ul>
<p><a href="https://www.typescriptlang.org/play?#code/C4TwDgpgBACg9mAggJ2QHhcqEAewIB2AJgM5QCuBA1gXAO4EDaAugHxQC8UAUFH1Jmx5CpKCygB+Mc1785ALgGoh+YmUYA6LQEsCAMwhYAShBLAoAGko16BZpKgmzURQQgA3Q926hIUMAiYAIycsIGoaCys3r7QAUioAEyh8AnojEEWiRYAzGxAA" target="_blank" rel="noopener noreferrer">试一哈<ExternalLinkIcon/></a></p>
<h3 id="shiftarr" tabindex="-1"><a class="header-anchor" href="#shiftarr" aria-hidden="true">#</a> ShiftArr</h3>
<p>同理可得 ShiftArr 的实现：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">ShiftArr<span class="token operator">&lt;</span>Arr <span class="token keyword">extends</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span> <span class="token operator">=</span> Arr <span class="token keyword">extends</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token operator">:</span> Arr <span class="token keyword">extends</span> <span class="token punctuation">[</span><span class="token builtin">unknown</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token keyword">infer</span> Rest<span class="token punctuation">]</span>
  <span class="token operator">?</span> Rest
  <span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>当类型参数 Arr 为 [1,2,3] 时：</p>
<img src="@source/ts-type-gymnastics/assets/4.ShiftArr2.png" width="400px">
</li>
<li>
<p>当类型参数 Arr 为 [] 时：</p>
<img src="@source/ts-type-gymnastics/assets/4.ShiftArr1.png" width="400px">
[试一哈](https://www.typescriptlang.org/play?#code/C4TwDgpgBAygFgSwGbAIICd0B4PqhAD2AgDsATAZygFcSBrEgewHcSBtAXQD4oBeKAFBRhUXPiKlKUTlAD80jkJHKAXKMzji5Km1oMWJADQA6UwhJIIeAEoQKwDnKi37UNSQgA3KwKXLhAqCQUBSIKLgAjHywYWiYWJxcvoHg0KHIcegATNHwGbgJEYZZhgDM3AJAA)
</li>
</ul>
<h2 id="字符串类型" tabindex="-1"><a class="header-anchor" href="#字符串类型" aria-hidden="true">#</a> 字符串类型</h2>
<hr>
<p>字符串类型也同样可以做模式匹配，匹配一个模式字符串，把需要提取的部分放到 infer 声明的局部变量里。</p>
<h3 id="startwith" tabindex="-1"><a class="header-anchor" href="#startwith" aria-hidden="true">#</a> StartWith</h3>
<p>判断字符串是否以某个前缀开头，也是通过模式匹配：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">StartWith<span class="token operator">&lt;</span>
  Str <span class="token keyword">extends</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  Prefix <span class="token keyword">extends</span> <span class="token builtin">string</span>
<span class="token operator">></span></span> <span class="token operator">=</span> Str <span class="token keyword">extends</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>Prefix<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token builtin">string</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span> <span class="token operator">?</span> <span class="token boolean">true</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>当匹配时：</p>
<img src="@source/ts-type-gymnastics/assets/2.1.StartWithRes1.png" width="400px">
</li>
<li>
<p>不匹配时：</p>
<img src="@source/ts-type-gymnastics/assets/2.1.StartWithRes2.png" width="400px">
</li>
</ul>
<p><a href="https://www.typescriptlang.org/play?#code/C4TwDgpgBAysCGAnYB1AlsAFgHjoqEAHsBAHYAmAzlJcImqQOYA0ACohAGZqEHFlUadBowB8UALxQAUFDmw6fEhWoADACQBvdlx4BfLbXpM9qqAH4odAK7QAXFE7wANpQjSPoSEKSoMmACUISgBGSQVfdCxsAHIEAHsEmOY4+HiY0U9waFpI-yDKACZwuDzo1MS05JjMeFIMoA" target="_blank" rel="noopener noreferrer">试一哈<ExternalLinkIcon/></a></p>
<h3 id="replace" tabindex="-1"><a class="header-anchor" href="#replace" aria-hidden="true">#</a> Replace</h3>
<h3 id="trim" tabindex="-1"><a class="header-anchor" href="#trim" aria-hidden="true">#</a> Trim</h3>
<p>能够匹配和替换字符串，那也就能实现去掉空白字符的 Trim：</p>
<p>不过因为我们不知道有多少个空白字符，所以只能一个个匹配和去掉，需要递归。</p>
<p>先实现 TrimRight:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">TrimRight<span class="token operator">&lt;</span>Str <span class="token keyword">extends</span> <span class="token builtin">string</span><span class="token operator">></span></span> <span class="token operator">=</span> Str <span class="token keyword">extends</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">infer</span> Rest<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>
  <span class="token operator">|</span> <span class="token string">" "</span>
  <span class="token operator">|</span> <span class="token string">"\n"</span>
  <span class="token operator">|</span> <span class="token string">"\t"</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
  <span class="token operator">?</span> TrimRight<span class="token operator">&lt;</span>Rest<span class="token operator">></span>
  <span class="token operator">:</span> Str<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类型参数 Str 是要 Trim 的字符串。</p>
<p>如果 Str 匹配字符串 + 空白字符 (空格、换行、制表符)，那就把字符串放到 infer 声明的局部变量 Rest 里。</p>
<p>把 Rest 作为类型参数递归 TrimRight，直到不匹配，这时的类型参数 Str 就是处理结果。</p>
<img src="@source/ts-type-gymnastics/assets/2.2.TrimRes1.png" width="400px">
<p>同理可得 TrimLeft：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">TrimLeft<span class="token operator">&lt;</span>Str <span class="token keyword">extends</span> <span class="token builtin">string</span><span class="token operator">></span></span> <span class="token operator">=</span> Str <span class="token keyword">extends</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>
  <span class="token operator">|</span> <span class="token string">" "</span>
  <span class="token operator">|</span> <span class="token string">"\n"</span>
  <span class="token operator">|</span> <span class="token string">"\t"</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">infer</span> Rest<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
  <span class="token operator">?</span> TrimLeft<span class="token operator">&lt;</span>Rest<span class="token operator">></span>
  <span class="token operator">:</span> Str<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="@source/ts-type-gymnastics/assets/2.2.TrimRes2.png" width="400px">
<p>TrimRight 和 TrimLeft 结合就是 Trim：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">TrimStr<span class="token operator">&lt;</span>Str <span class="token keyword">extends</span> <span class="token builtin">string</span><span class="token operator">></span></span> <span class="token operator">=</span> TrimRight<span class="token operator">&lt;</span>TrimLeft<span class="token operator">&lt;</span>Str<span class="token operator">>></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="@source/ts-type-gymnastics/assets/2.2.TrimRes.png" width="400px">
<p><a href="https://www.typescriptlang.org/play?ssl=10&amp;ssc=60&amp;pln=10&amp;pc=1#code/C4TwDgpgBAKgTgSwLYCUEHMAWwA8BlYOKCAD2AgDsATAZyhsIQvQD4oBeKAKCl6gKKly1OgAMAJAG8mAMwhEUEBgF8pAcihqAPmoA6FbXuBrloqAH5ufa7ESoM2HIoZsAXP0JcvoSLeQAZCBlcAWIySlp6RmY2Th4+UKEIsXVNHX1DXWNVaQo5BSVgUwsrG154AKDcZ2A3DzhvcGgKpAF8QjDhSIZEGI4-eyxcFsDg9rgWFniyxt9o5wBGfpa0IZxRYABDAHtp6z2+USnZ6HmlACZlu1HcUS8uLe2j+59T3ucr5Da76ceD3h4zy8QA" target="_blank" rel="noopener noreferrer">试一哈<ExternalLinkIcon/></a></p>
<h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2>
<hr>
<p>函数同样也可以做类型匹配，比如提取参数、返回值的类型。</p>
<h3 id="getparameters" tabindex="-1"><a class="header-anchor" href="#getparameters" aria-hidden="true">#</a> GetParameters</h3>
<p>函数类型可以通过模式匹配来提取参数的类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">GetParameters<span class="token operator">&lt;</span>Func <span class="token keyword">extends</span> <span class="token builtin">Function</span><span class="token operator">></span></span> <span class="token operator">=</span> Func <span class="token keyword">extends</span> <span class="token punctuation">(</span>
  <span class="token operator">...</span>args<span class="token operator">:</span> <span class="token keyword">infer</span> Args
<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">unknown</span>
  <span class="token operator">?</span> Args
  <span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类型参数 Func 是要匹配的函数类型，通过 extends 约束为 Function。</p>
<p>Func 和模式类型做匹配，参数类型放到用 infer 声明的局部变量 Args 里，返回值可以是任何类型，用 unknown。</p>
<p>返回提取到的参数类型 Args。</p>
<img src="@source/ts-type-gymnastics/assets/3.GetParametersRes.png" width="400px">
<p><a href="https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwAUCGAnJBbeEUGcA8AYgK4B2AxlBAB7AQkAmOUx5wAlgPYkB8UAvFABQUEc1IVqtBkwAUAOgWoA5jgBcbEgDNsUAIIoVASj69SAaxIcA7iSgB+PQaaqoJCADdsg76EhQl8MhomLS4AEoQTAJwiKgYWLh4MiTxqjjAKBpKADRIAaokROgARtjG3OmZJErcQA" target="_blank" rel="noopener noreferrer">试一哈<ExternalLinkIcon/></a></p>
<h3 id="getreturntype" tabindex="-1"><a class="header-anchor" href="#getreturntype" aria-hidden="true">#</a> GetReturnType</h3>
<p>能提取参数类型，同样也可以提取返回值类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">GetReturnType<span class="token operator">&lt;</span>Func <span class="token keyword">extends</span> <span class="token builtin">Function</span><span class="token operator">></span></span> <span class="token operator">=</span> Func <span class="token keyword">extends</span> <span class="token punctuation">(</span>
  <span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">infer</span> ReturnType
  <span class="token operator">?</span> ReturnType
  <span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Func 和模式类型做匹配，提取返回值到通过 infer 声明的局部变量 ReturnType 里返回。</p>
<p>参数类型可以是任意类型，也就是 any[]（注意，这里不能用 unknown，这里的解释涉及到参数的逆变性质，具体原因逆变那一节会解释）。</p>
<img src="@source/ts-type-gymnastics/assets/3.2.GetReturnRes.png" width = "400px">
<p><a href="https://www.typescriptlang.org/play?ssl=2&amp;ssc=75&amp;pln=1&amp;pc=1#code/C4TwDgpgBA4hwCV4FcBOA7AKuCAeAYsugMZQQAewE6AJgM5SEnACWA9ugHxQC8UAUFCGMipClVoMAFADo5AQ1QBzOgC556EAG0AugEpe3FugBmEVFCTA0WHEID8llBmyQoqqOggA3c-3+gbkrwVjZIDHxwiM62kLhS6PIAthCqdMCoxkoANPLBqujISQBG5no8nOmZ6EqcQA" target="_blank" rel="noopener noreferrer">试一哈<ExternalLinkIcon/></a></p>
</div></template>


