<template><div><h2 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目</h2>
<p>实现泛型 <code v-pre>TupleToUnion&lt;T&gt;</code>，它返回元组所有值的合集。</p>
<p>例如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Arr</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">Test</span> <span class="token operator">=</span> TupleToUnion<span class="token operator">&lt;</span>Arr<span class="token operator">></span><span class="token punctuation">;</span> <span class="token comment">// expected to be '1' | '2' | '3'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p align='left'>
  点击github查看：
  <a href='https://github.com/W-HanYu/FE-Typescript/blob/master/vuepress/docs/challenge/2.5.turn-to-union.md'>
    <img src='https://img.shields.io/badge/Github-1.8k+-143?logo=typescript&color=3178C6&logoColor=fff' />
  </a>
</p>
<h2 id="挑战" tabindex="-1"><a class="header-anchor" href="#挑战" aria-hidden="true">#</a> 挑战</h2>
<p>::: info 提示
在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。并且记得将答案分享奥。
:::</p>
<CodeBox surl="https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=2.5.turn-to-union.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor" /><!--info-footer-start--><br> <a href="https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=2-5%E5%AE%9E%E7%8E%B0-turn-to-union.md&title=2-5%E5%AE%9E%E7%8E%B0-turn-to-union.md" target="_blank"><img src="https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-分享你的解答-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704" alt="分享你的解答"/></a>  <!--info-footer-end-->
<h2 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h2>
<p>我们需要获取一个数组中的所有元素并将其转化为联合类型。幸运的是，<code v-pre>TypeScript</code> 已经 在其类型系统中实现了这种功能—— <code v-pre>lookup types</code>。 我们可以使用构造 <code v-pre>T[number]</code>得到由 <code v-pre>T</code> 的所有元素所组成的联合类型。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">TupleToUnion<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是，我们得到了一个 <code v-pre>error: Type ‘number’ cannot be used to index type ‘T’</code>。 这时因为我们没有向 T 施加约束，即没有告知编译器 <code v-pre>T</code> 是一个可以被索引的数组。</p>
<p>让我们通过添加 <code v-pre>extends unknown[]</code>解决这个问题。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">TupleToUnion<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types" target="_blank" rel="noopener noreferrer">Lookup Types<ExternalLinkIcon/></a></li>
</ul>
</div></template>


