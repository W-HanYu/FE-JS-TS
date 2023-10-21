<template><div><h2 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目</h2>
<p>创建一个通用的<code v-pre>Length</code>，接受一个<code v-pre>readonly</code>的数组，返回这个数组的长度。</p>
<p>例如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">tesla</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"tesla"</span><span class="token punctuation">,</span> <span class="token string">"model 3"</span><span class="token punctuation">,</span> <span class="token string">"model X"</span><span class="token punctuation">,</span> <span class="token string">"model Y"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">spaceX</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token string">"FALCON 9"</span><span class="token punctuation">,</span>
  <span class="token string">"FALCON HEAVY"</span><span class="token punctuation">,</span>
  <span class="token string">"DRAGON"</span><span class="token punctuation">,</span>
  <span class="token string">"STARSHIP"</span><span class="token punctuation">,</span>
  <span class="token string">"HUMAN SPACEFLIGHT"</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">teslaLength</span> <span class="token operator">=</span> Length<span class="token operator">&lt;</span>tesla<span class="token operator">></span><span class="token punctuation">;</span> <span class="token comment">// expected 4</span>
<span class="token keyword">type</span> <span class="token class-name">spaceXLength</span> <span class="token operator">=</span> Length<span class="token operator">&lt;</span>spaceX<span class="token operator">></span><span class="token punctuation">;</span> <span class="token comment">// expected 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">arr1</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token string">"b"</span><span class="token punctuation">,</span> <span class="token string">"c"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">arr2</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">head1</span> <span class="token operator">=</span> First<span class="token operator">&lt;</span>arr1<span class="token operator">></span><span class="token punctuation">;</span> <span class="token comment">// expected to be 'a'</span>
<span class="token keyword">type</span> <span class="token class-name">head2</span> <span class="token operator">=</span> First<span class="token operator">&lt;</span>arr2<span class="token operator">></span><span class="token punctuation">;</span> <span class="token comment">// expected to be 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p align='left'>
  点击github查看：
  <a href='https://github.com/paiDaXing-web/You-Don-t-Know-TS/blob/main/vuepress/docs/challenge/1.7.Length-of-Tuple.md'>
    <img src='https://img.shields.io/badge/Github-1.8k+-143?logo=typescript&color=3178C6&logoColor=fff' />
  </a>
</p>
<h2 id="解答" tabindex="-1"><a class="header-anchor" href="#解答" aria-hidden="true">#</a> 解答</h2>
<p>::: info 提示
在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。，并且记得将答案分享奥。
:::</p>
<CodeBox surl="https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.7.length-of-tuple.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor" /><!--info-footer-start--><br> <a href="https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-7-%E5%AE%9E%E7%8E%B0Length-of-Tuple.md&title=1-7-%E5%AE%9E%E7%8E%B0Length-of-Tuple.md" target="_blank"><img src="https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-分享你的解答-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704" alt="分享你的解答"/></a>  <!--info-footer-end-->
<h2 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h2>
<p>知识点：</p>
<h3 id="元组类型-tuple-types" tabindex="-1"><a class="header-anchor" href="#元组类型-tuple-types" aria-hidden="true">#</a> 元组类型（Tuple Types)</h3>
<p>今天提到的新知识点就是 元组类型（Tuple Types) 具体的介绍大家可以看一下文档，这里放上由冴羽基于最新的 ts 英文文档翻译的中文文档。</p>
<p><a href="https://link.juejin.cn/?target=http%3A%2F%2Fts.yayujs.com%2Flearn-typescript%2Fhandbook%2FObjectTypes.html%23%25E5%2585%2583%25E7%25BB%2584%25E7%25B1%25BB%25E5%259E%258B-tuple-types" target="_blank" rel="noopener noreferrer">TypeScript4 中文文档 (yayujs.com)<ExternalLinkIcon/></a></p>
<p>对于 元组类型（Tuple Types) 的介绍中，第一句就是 元组类型是另外一种  Array  类型，当你明确知道数组包含多少个元素，并且每个位置元素的类型都明确知道的时候，就适合使用元组类型。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">StringNumberPair</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>元组类型会具体的告诉你这个数组每一个位置的类型是什么，以及限制数组的长度，这就是和数组类型不同的地方。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">a</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">sArrType</span> <span class="token operator">=</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">a1</span> <span class="token operator">=</span> a<span class="token punctuation">[</span><span class="token string">"length"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">a2</span> <span class="token operator">=</span> sArrType<span class="token punctuation">[</span><span class="token string">"length"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">A</span><span class="token operator">:</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"11"</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于元组来说，每个位置的类型都是定死的</p>
<p>就像以上，元组的长度是能够直接获得的，但是普通数组只能够限制它的长度是一个 number 类型，这就是数组类型和元组类型的不同之处。</p>
<p>我们知道在 JavaScript 中可以使用属性 length 来访问数组的长度。我们也可以在类型上 做同样的事情:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Length<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token builtin">any</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token string">"length"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是按照这种方式，我们将得到编译错误“Type ‘length’ cannot be used to index type ‘T’.”。所以我们需要给 TypeScript 一个提示，告知我们的输入类型参数有这个属性:</p>
<details class="custom-container details"><summary>答案</summary>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Length<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">{</span> length<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token string">"length"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html" target="_blank" rel="noopener noreferrer">Index Type<ExternalLinkIcon/></a></li>
</ul>
</div></template>


