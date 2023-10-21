<template><div><h2 id="挑战" tabindex="-1"><a class="header-anchor" href="#挑战" aria-hidden="true">#</a> 挑战</h2>
<p>这个简单的提问希望让你可以快速上手 Type Challenges。在这里，我们使用了一些神奇的技巧让 TypeScript 通过自身的类型系统来实现自动判题。</p>
<p>在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// 期望是一个 string 类型</span>
<span class="token keyword">type</span> <span class="token class-name">HelloWorld</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token comment">// 你需要使得如下这行不会抛出异常</span>
<span class="token keyword">type</span> <span class="token class-name">test</span> <span class="token operator">=</span> Expect<span class="token operator">&lt;</span>Equal<span class="token operator">&lt;</span>HelloWorld<span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">>></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="解答" tabindex="-1"><a class="header-anchor" href="#解答" aria-hidden="true">#</a> 解答</h2>
<p>::: info 提示
请您在通过修改第 9 行，让 11 行代码不会抛出异常，并且记得将答案提交奥。
:::</p>
<CodeBox surl="https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.1.hello-world.ts&hideExplorer=1&hideNavigation=1&view=editor" /><!--info-footer-start--><br> <a href="https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-hello-world.md&title=1.1.hello-world" target="_blank"><img src="https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-分享你的解答-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704" alt="分享你的解答"/></a>  <!--info-footer-end-->
<h2 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h2>
<p>这是一个热身挑战，让你熟悉他们的练习场，如何接受挑战等等。我们在这里需要做的只是 将类型设置为’ string ‘替代原来的’ any ‘:</p>
<details class="custom-container details"><summary>答案</summary>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">HelloWorld</span> <span class="token operator">=</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><RouterLink to="/theme-reco/base-2.html">二 typescript-基础类型</RouterLink></li>
<li><a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">Typed JavaScript at Any Scale<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/intro.html" target="_blank" rel="noopener noreferrer">The TypeScript Handbook<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html" target="_blank" rel="noopener noreferrer">TypeScript for Java/C# Programmers<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html" target="_blank" rel="noopener noreferrer">TypeScript for Functional Programmers<ExternalLinkIcon/></a></li>
</ul>
</div></template>


