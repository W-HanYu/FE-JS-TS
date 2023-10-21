<template><div><h2 id="挑战" tabindex="-1"><a class="header-anchor" href="#挑战" aria-hidden="true">#</a> 挑战</h2>
<p>假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。</p>
<p>例如：Promise，请你返回 ExampleType 类型。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Todo</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  description<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  completed<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">TodoPreview</span> <span class="token operator">=</span> MyPick<span class="token operator">&lt;</span>Todo<span class="token punctuation">,</span> <span class="token string">"title"</span> <span class="token operator">|</span> <span class="token string">"completed"</span><span class="token operator">></span><span class="token punctuation">;</span>

<span class="token keyword">const</span> todo<span class="token operator">:</span> TodoPreview <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">"Clean room"</span><span class="token punctuation">,</span>
  completed<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="解答" tabindex="-1"><a class="header-anchor" href="#解答" aria-hidden="true">#</a> 解答</h2>
<p>::: info 提示
请您在通过修改第 3 行，让 15-19 行代码不会抛出异常，并且记得将答案提交奥。
:::</p>
<CodeBox surl="https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.3.Awaited.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor" /><!--info-footer-start--><br> <a href="https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-3-%E5%AE%9E%E7%8E%B0Awaited.md&title=1.3.%E5%AE%9E%E7%8E%B0Awaited" target="_blank"><img src="https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-分享你的解答-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704" alt="分享你的解答"/></a>  <!--info-footer-end-->
<h2 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h2>
<p>这是一个非常有趣的挑战，它要求我们了解 TypeScript 的一个被低估的特性，恕我直言。</p>
<p>但是，在说明我的意思之前，让我们来分析一下这个挑战。作者要求我们展开类型。什么是 展开? 展开是从另一个类型中提取内部类型。</p>
<p>让我用一个例子来说明。如果你有一个类型 Promise&lt;string&gt;，展开 Promise 类型将得到 类型 string。我们从外部类型得到其内部类型。</p>
<p>注意，你还需要递归地展开类型。例如，如果你有类型 Promise&lt;Promise&lt;string&gt;&gt;，你需 要返回类型 string。</p>
<p>现在，言归正传。我将从最简单的例子开始。如果我们的 Awaited 类型得 到 Promise&lt;string&gt;，我们需要返回 string，否则我们返回 T 本身，因为它不是一个 Promise:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Awaited<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span></span> <span class="token operator">?</span> <span class="token builtin">string</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是有一个问题。这样，我们只能处理 string 类型在 Promise 中的情况，而我们需要的 是可以处理任何情况。怎么做呢? 在我们不知道类型的情况下，如何从 Promise 获取类型?</p>
<p>出于这些目的，TypeScript 在条件类型中有类型推断功能! 你可以对编译器说”嘿，一旦你 知道了类型是什么，请把它赋给我的类型参数”。你可以在这里阅读更多关 于条件类型中的类型推断。</p>
<p>了解了类型推断之后，我们可以更新我们的解答。我们没有在条件类型中检 查 Promise&lt;string&gt;
，而是将 string 替换为 infer R，因为我们不知道那里必须有什么 。我们只知道它是 Promise&lt;T&gt;
，其内部包含某种类型。</p>
<p>一旦 TypeScript 确定了 Promise 中的类型，它就会把它赋给我们的类型参数 R，并在 “true”分支中可用。我们正是从这里返回它的：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Awaited<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">infer</span> <span class="token constant">R</span><span class="token operator">></span></span> <span class="token operator">?</span> <span class="token constant">R</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们几乎完成了，但从类型 Promise&lt;Promise&lt;string&gt;&gt;我们得到类 型 Promise&lt;string&gt;。因此，我们需要递归地重复相同的过程，这是通过调用 Awaited 本 身来实现的:</p>
<details class="custom-container details"><summary>答案</summary>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Awaited<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">infer</span> <span class="token constant">R</span><span class="token operator">></span></span> <span class="token operator">?</span> Awaited<span class="token operator">&lt;</span><span class="token constant">R</span><span class="token operator">></span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们说“从 K 中获取所有内容，命名为 P 并将其作为我们新对象的一个新键，其值类型取 自输入类型”。一开始理解很难，所以你一旦不理解什么，就尝试重读一遍，再一步步的在 脑海里思考。</p>
</details>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html" target="_blank" rel="noopener noreferrer">Conditional Types<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types" target="_blank" rel="noopener noreferrer">Type Inference in Conditional Types<ExternalLinkIcon/></a></li>
</ul>
</div></template>


