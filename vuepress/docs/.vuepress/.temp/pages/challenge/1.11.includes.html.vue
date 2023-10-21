<template><div><h2 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目</h2>
<p>在类型系统里实现 JavaScript 的 Array.includes 方法，这个类型接受两个参数，返回的类型要么是 true 要么是 false。</p>
<p>例如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">isPillarMen</span> <span class="token operator">=</span> Includes<span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token string">"Kars"</span><span class="token punctuation">,</span> <span class="token string">"Esidisi"</span><span class="token punctuation">,</span> <span class="token string">"Wamuu"</span><span class="token punctuation">,</span> <span class="token string">"Santana"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">"Dio"</span><span class="token operator">></span><span class="token punctuation">;</span> <span class="token comment">// expected to be `false`</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p align='left'>
  点击github查看：
  <a href='https://github.com/W-HanYu/FE-Typescript/blob/master/vuepress/docs/challenge/1.11.includes.md'>
    <img src='https://img.shields.io/badge/Github-1.8k+-143?logo=typescript&color=3178C6&logoColor=fff' />
  </a>
</p>
<h2 id="挑战" tabindex="-1"><a class="header-anchor" href="#挑战" aria-hidden="true">#</a> 挑战</h2>
<p>::: info 提示
在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。并且记得将答案分享奥。
:::</p>
<CodeBox surl="https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.11.includes.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor" /><!--info-footer-start--><br> <a href="https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-11%E5%AE%9E%E7%8E%B0-includes.md&title=1-11%E5%AE%9E%E7%8E%B0-includes.md" target="_blank"><img src="https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-分享你的解答-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704" alt="分享你的解答"/></a>  <!--info-footer-end-->
<h2 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h2>
<p>我们首先编写接受两个参数的类型:T(元组)和 U(我们正在寻找的)。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Includes<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token builtin">never</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在我们真正能在元组中找到一些东西之前，将其“转换”为联合<code v-pre>（union）</code>比会元组<code v-pre>（tuple）</code> 更容易一些。为此，我们可以使用索引类型<code v-pre>（indexed types）</code>。如果我们访 问 <code v-pre>T[number]</code>，<code v-pre>TypeScript</code> 会返回 <code v-pre>T</code> 中所有元素的联合<code v-pre>（union）</code>。例如，如果你有一 个 <code v-pre>T = [1, 2, 3]</code>，通过 <code v-pre>T = [1, 2, 3]</code>访问将返回 <code v-pre>1 | 2 | 3</code>。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Includes<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是，这里有一个错误，<code v-pre>“Type ‘number’ cannot be used to index type ‘T’”</code>。这是因为 类型 T 没有约束。我们需要告诉 <code v-pre>TypeScript</code>，<code v-pre>T</code> 是一个数组。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Includes<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们有了元素的联合<code v-pre>（union）</code>。我们如何检查元素是否存在于联合<code v-pre>（union）</code>中？条件类型 分配<code v-pre>（Distributive）</code>!我们可以为联合<code v-pre>（union）</code>编写条件类型，<code v-pre>TypeScript </code>会自动将条 件应用到联合<code v-pre>（union）</code>的每个元素上。</p>
<p>例如，如果你写 <code v-pre>2 extends 1 | 2</code>，<code v-pre>TypeScript</code> 实际上会把它替换成 <code v-pre>2</code> 个条件语 句<code v-pre> 2 extends 1</code> 和<code v-pre> 2 extends 2</code>。</p>
<p>我们可以利用它检查 <code v-pre>U</code> 是否在 <code v-pre>T[number]</code>中，如果在则返回<code v-pre> true</code>。</p>
<details class="custom-container details"><summary>参考</summary>
<ol>
<li>递归解答</li>
</ol>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Includes<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token keyword">readonly</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">[</span><span class="token keyword">infer</span> <span class="token constant">R</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token keyword">infer</span> <span class="token constant">K</span><span class="token punctuation">]</span>
  <span class="token operator">?</span> Equal<span class="token operator">&lt;</span><span class="token constant">U</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">></span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token boolean">true</span></span>
    <span class="token operator">?</span> <span class="token boolean">true</span>
    <span class="token operator">:</span> Includes<span class="token operator">&lt;</span><span class="token constant">K</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span>
  <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>循环比较</li>
</ol>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Includes<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token keyword">readonly</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">K</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> Equal<span class="token operator">&lt;</span><span class="token constant">U</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">K</span><span class="token punctuation">]</span><span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">]</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token boolean">false</span></span>
  <span class="token operator">?</span> <span class="token boolean">false</span>
  <span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/generics.html" target="_blank" rel="noopener noreferrer">generics<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints" target="_blank" rel="noopener noreferrer">Generic Constraints<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html" target="_blank" rel="noopener noreferrer">Conditional Types<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types" target="_blank" rel="noopener noreferrer">Distributive Conditional Types<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html" target="_blank" rel="noopener noreferrer">Index Types<ExternalLinkIcon/></a></li>
</ul>
</div></template>


