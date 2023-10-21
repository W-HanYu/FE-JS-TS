<template><div><h2 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目</h2>
<blockquote>
<p>欢迎 PR 改进翻译质量。</p>
</blockquote>
<p>不要使用内置的<code v-pre>Readonly&lt;T&gt;</code>，自己实现一个。</p>
<p>该 <code v-pre>Readonly</code> 会接收一个 <em>泛型参数</em>，并返回一个完全一样的类型，只是所有属性都会被 <code v-pre>readonly</code> 所修饰。</p>
<p>也就是不可以再对该对象的属性赋值。</p>
<p>例如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Todo</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  description<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> todo<span class="token operator">:</span> MyReadonly<span class="token operator">&lt;</span>Todo<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">"Hey"</span><span class="token punctuation">,</span>
  description<span class="token operator">:</span> <span class="token string">"foobar"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

todo<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">"Hello"</span><span class="token punctuation">;</span> <span class="token comment">// Error: cannot reassign a readonly property</span>
todo<span class="token punctuation">.</span>description <span class="token operator">=</span> <span class="token string">"barFoo"</span><span class="token punctuation">;</span> <span class="token comment">// Error: cannot reassign a readonly property</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="解答" tabindex="-1"><a class="header-anchor" href="#解答" aria-hidden="true">#</a> 解答</h2>
<p>::: info 提示
在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。，并且记得将答案分享奥。
:::</p>
<CodeBox surl="https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.4.Readonly.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor" /><!--info-footer-start--><br> <a href="https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-4%E5%AE%9E%E7%8E%B0Readonly.md&title=1.4.%E5%AE%9E%E7%8E%B0Readonly" target="_blank"><img src="https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-分享你的解答-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704" alt="分享你的解答"/></a>  <!--info-footer-end-->
<h2 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h2>
<p>我们需要使对象中的所有属性都是只读的。因此，我们需要迭代所有的属性，并为它们添加 一个修饰符。</p>
<p>我们将在这里使 用映射类型， 很简单。对于该类型的每个属性，我们获取它的键并为其添加一个 readonly 修饰符：</p>
<details class="custom-container details"><summary>答案</summary>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyReadonly<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">readonly</span> <span class="token punctuation">[</span><span class="token constant">K</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">K</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/mapped-types.html" target="_blank" rel="noopener noreferrer">Mapped Types<ExternalLinkIcon/></a></li>
<li><RouterLink to="/theme-reco/Advanced-2.html#23-readonlytype">2.3 Readonly&lt;Type&gt;</RouterLink></li>
</ul>
</div></template>


