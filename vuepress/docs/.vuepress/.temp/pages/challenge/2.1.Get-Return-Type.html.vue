<template><div><h2 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目</h2>
<p>不使用 <code v-pre>ReturnType</code> 实现 <code v-pre>TypeScript</code> 的 <code v-pre>ReturnType&lt;T&gt;</code> 泛型。</p>
<p>例如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>v<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>v<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">else</span> <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">a</span> <span class="token operator">=</span> MyReturnType<span class="token operator">&lt;</span><span class="token keyword">typeof</span> fn<span class="token operator">></span><span class="token punctuation">;</span> <span class="token comment">// 应推导出 "1 | 2"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p align='left'>
  点击github查看：
  <a href='https://github.com/W-HanYu/FE-Typescript/blob/master/vuepress/docs/challenge/2.1.Get-Return-Type.md'>
    <img src='https://img.shields.io/badge/Github-1.8k+-143?logo=typescript&color=3178C6&logoColor=fff' />
  </a>
</p>
<h2 id="挑战" tabindex="-1"><a class="header-anchor" href="#挑战" aria-hidden="true">#</a> 挑战</h2>
<p>::: info 提示
在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。并且记得将答案分享奥。
:::</p>
<CodeBox surl="https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=2.1.Get-Return-Type.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor" /><!--info-footer-start--><br> <a href="https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=2-1-%E5%AE%9E%E7%8E%B0Get-Return-Type.md&title=2-1-%E5%AE%9E%E7%8E%B0Get-Return-Type.md" target="_blank"><img src="https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-分享你的解答-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704" alt="分享你的解答"/></a>  <!--info-footer-end-->
<h2 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h2>
<p>在条件类型中使用类型推导的 经验法则是当你不确定类型必须是什么的时候。这正好适用本次挑战的情况。我们不知道函 数所返回的类型，但是我们的任务是获取它。</p>
<p>我们有一个在类型系统中看起来为 <code v-pre>() =&gt; void</code> 的函数。但是我们不知道 <code v-pre>void</code> 的位置 必须是什么。所以让我们用 infer R 替换它，这将是我们对解决方案的第一次迭代：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyReturnType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">infer</span> <span class="token constant">R</span> <span class="token operator">?</span> <span class="token constant">R</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们的类型 <code v-pre>T</code> 可以分配给函数，我们推断它的返回类型并将其返回，否则我们返回 <code v-pre>T</code> 本身。比较直截了当。</p>
<p>这个解决方案的问题是，如果我们传递一个带参数的函数，它将不能分配给我们的类型 <code v-pre>() =&gt; infer R</code>。</p>
<p>让我们通过添加 <code v-pre>...args: any[]</code> 来表明我们可以接受任何参数并且我们不关心它们：</p>
<details class="custom-container details"><summary>参考答案</summary>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyReturnType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">infer</span> <span class="token constant">R</span> <span class="token operator">?</span> <span class="token constant">R</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html" target="_blank" rel="noopener noreferrer">Conditional Types<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types" target="_blank" rel="noopener noreferrer">Type inference in conditional types<ExternalLinkIcon/></a></li>
</ul>
</div></template>


