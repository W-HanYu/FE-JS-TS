<template><div><h2 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目</h2>
<p>在类型系统里实现通用的 <code v-pre>Array.push </code>。</p>
<p>例如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Result</span> <span class="token operator">=</span> Push<span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token operator">></span><span class="token punctuation">;</span> <span class="token comment">// [1, 2, '3']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p align='left'>
  点击github查看：
  <a href='https://github.com/W-HanYu/FE-Typescript/blob/master/vuepress/docs/challenge/1.13.push.md'>
    <img src='https://img.shields.io/badge/Github-1.8k+-143?logo=typescript&color=3178C6&logoColor=fff' />
  </a>
</p>
<h2 id="挑战" tabindex="-1"><a class="header-anchor" href="#挑战" aria-hidden="true">#</a> 挑战</h2>
<p>::: info 提示
在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。并且记得将答案分享奥。
:::</p>
<CodeBox surl="https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.13.push.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor" /><!--info-footer-start--><br> <a href="https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-13%E5%AE%9E%E7%8E%B0-push.md&title=1-13%E5%AE%9E%E7%8E%B0-push.md" target="_blank"><img src="https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-分享你的解答-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704" alt="分享你的解答"/></a>  <!--info-footer-end-->
<h2 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h2>
<p>这个实际上很简单。要实现一个将元素插入数组的类型，我们需要做 2 件事。第一件事是 获取数组的所有元素，第二件事是向它们插入一个额外的元素。</p>
<p>要从数组中获取所有元素，可以使用可变参数元组类型。因此，让我们返回一个具有输入类 型 T 中相同元素的数组:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Push<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token constant">T</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>得到一个编译错误“A rest element type must be an array type”。这意味着我们不能在 非数组类型上使用可变元组类型。因此，让我们添加一个通用的约束来表明我们只处理数组 :</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Push<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token constant">T</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们有一个类型参数 T 传入的数组副本。剩下的就是添加传入的元素 U:</p>
<details class="custom-container details"><summary>参考答案</summary>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Push<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<p>这样，我们就在类型系统中实现了一个 push 操作。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/generics.html" target="_blank" rel="noopener noreferrer">generics<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types" target="_blank" rel="noopener noreferrer">Variadic Tuple Types<ExternalLinkIcon/></a></li>
</ul>
</div></template>


