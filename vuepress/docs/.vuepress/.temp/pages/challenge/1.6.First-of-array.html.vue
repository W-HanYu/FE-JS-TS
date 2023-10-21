<template><div><h2 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目</h2>
<p>实现一个通用<code v-pre>First&lt;T&gt;</code>，它接受一个数组<code v-pre>T</code>并返回它的第一个元素的类型。</p>
<p>例如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">arr1</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token string">"b"</span><span class="token punctuation">,</span> <span class="token string">"c"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">arr2</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">head1</span> <span class="token operator">=</span> First<span class="token operator">&lt;</span>arr1<span class="token operator">></span><span class="token punctuation">;</span> <span class="token comment">// expected to be 'a'</span>
<span class="token keyword">type</span> <span class="token class-name">head2</span> <span class="token operator">=</span> First<span class="token operator">&lt;</span>arr2<span class="token operator">></span><span class="token punctuation">;</span> <span class="token comment">// expected to be 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="解答" tabindex="-1"><a class="header-anchor" href="#解答" aria-hidden="true">#</a> 解答</h2>
<p>::: info 提示
在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。，并且记得将答案分享奥。
:::</p>
<CodeBox surl="https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.6.first-of-array.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor" /><!--info-footer-start--><br> <a href="https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-6-%E5%AE%9E%E7%8E%B0First%3CT%3E.md&title=1-6-%E5%AE%9E%E7%8E%B0First%3CT%3E" target="_blank"><img src="https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-分享你的解答-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704" alt="分享你的解答"/></a>  <!--info-footer-end-->
<h2 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h2>
<p>首先我们想到的就是使用查询类型，然后写出 T[0]：</p>
<p>type First&lt;T extends any[]&gt; = T[0];
但是这里有个临界情况我们需要去处理。如果我们传入一个空数组，T[0]不能正常工作， 因为它没有元素。</p>
<p>因此，在访问数组中的第一个元素之前，我们需要检查数组是否为空。为此，我们可以在 TypeScript 中使 用条件类型。</p>
<p>它们背后的理念非常简单。如果我们可以将该类型分配给条件类型，它将进入“true”分支， 否则它将采取“false”分支。</p>
<p>我们接下来检查，如果数组为空，则什么也不返回，否则返回数组的第一个元素:</p>
<details class="custom-container details"><summary>答案</summary>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">First<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">?</span> <span class="token builtin">never</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><RouterLink to="/theme-reco/Advanced-1.html#14-%E6%9D%A1%E4%BB%B6%E7%B1%BB%E5%9E%8B">1.4 条件类型</RouterLink></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/mapped-types.html" target="_blank" rel="noopener noreferrer">Mapped Types<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html" target="_blank" rel="noopener noreferrer">Index Type<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html" target="_blank" rel="noopener noreferrer">Conditional Types<ExternalLinkIcon/></a></li>
</ul>
</div></template>


