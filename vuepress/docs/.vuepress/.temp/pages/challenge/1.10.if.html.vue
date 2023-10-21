<template><div><h2 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目</h2>
<p>实现一个 <code v-pre>IF</code> 类型，它接收一个条件类型 <code v-pre>C</code> ，一个判断为真时的返回类型 <code v-pre>T</code> ，以及一个判断为假时的返回类型 <code v-pre>F</code>。 <code v-pre>C</code> 只能是 <code v-pre>true</code> 或者 <code v-pre>false</code>， <code v-pre>T</code> 和 <code v-pre>F</code> 可以是任意类型。</p>
<p>例如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token operator">=</span> If<span class="token operator">&lt;</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token string">"b"</span><span class="token operator">></span><span class="token punctuation">;</span> <span class="token comment">// expected to be 'a'</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token operator">=</span> If<span class="token operator">&lt;</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token string">"b"</span><span class="token operator">></span><span class="token punctuation">;</span> <span class="token comment">// expected to be 'b'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p align='left'>
  点击github查看：
  <a href='https://github.com/W-HanYu/FE-Typescript/blob/master/vuepress/docs/challenge/1.10.if.md'>
    <img src='https://img.shields.io/badge/Github-1.8k+-143?logo=typescript&color=3178C6&logoColor=fff' />
  </a>
</p>
<h2 id="挑战" tabindex="-1"><a class="header-anchor" href="#挑战" aria-hidden="true">#</a> 挑战</h2>
<p>::: info 提示
在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。并且记得将答案分享奥。
:::</p>
<CodeBox surl="https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.10.if.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor" /><!--info-footer-start--><br> <a href="https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-10%E5%AE%9E%E7%8E%B0-if.md&title=1-10%E5%AE%9E%E7%8E%B0-if.md" target="_blank"><img src="https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-分享你的解答-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704" alt="分享你的解答"/></a>  <!--info-footer-end-->
<h2 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h2>
<p>如果你不确定什么时候在 TypeScript 中使 用条件类型， 那就是你需要对类型使用“if”语句的时候。这正是我们这里要做的。</p>
<p>如果条件类型的计算结果为 true，我们需要取“true”分支，否则“false”分支:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">If<span class="token operator">&lt;</span><span class="token constant">C</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">F</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">C</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token boolean">true</span></span> <span class="token operator">?</span> <span class="token constant">T</span> <span class="token operator">:</span> <span class="token constant">F</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样我们会得到一个编译错误，因为我们试图将 C 赋值给布尔类型，而没有一个显式的约 束。因此，让我们通过在类型参数 C 中添加 extends boolean 来修复它:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">If<span class="token operator">&lt;</span><span class="token constant">C</span> <span class="token keyword">extends</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">F</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">C</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token boolean">true</span></span> <span class="token operator">?</span> <span class="token constant">T</span> <span class="token operator">:</span> <span class="token constant">F</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html" target="_blank" rel="noopener noreferrer">Conditional Types<ExternalLinkIcon/></a></li>
</ul>
</div></template>


