<template><div><h2 id="挑战" tabindex="-1"><a class="header-anchor" href="#挑战" aria-hidden="true">#</a> 挑战</h2>
<p>实现 TS 内置的 Pick&lt;T, K&gt;，但不可以使用它。</p>
<p>从类型 T 中选择出属性 K，构造成一个新的类型。</p>
<p>在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。</p>
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
请您在通过修改第 9 行，让 11 行代码不会抛出异常，并且记得将答案提交奥。
:::</p>
<CodeBox surl="https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.2.Pick.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor" /><!--info-footer-start--><br> <a href="https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-2-%E5%AE%9E%E7%8E%B0pick.md&title=1.2.%E5%AE%9E%E7%8E%B0Pick" target="_blank"><img src="https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-分享你的解答-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704" alt="分享你的解答"/></a>  <!--info-footer-end-->
<h2 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h2>
<p>为了解出这个挑战，我们需要使用查找类型和映射类型。</p>
<p>查找类型允许我们通过名称从另一个类型中提取一个类型。类似于使用键值从一个对象中获 取值。</p>
<p>映射类型允许我们将一个类型中的每个属性转换为一个新类型。</p>
<p>你可以在 TypeScript 网 站 lookup types 和 mapped types 上 了解更多它们得信息，并了解它们在做什么。</p>
<p>现在，我们知道 TypeScript 中有查找类型和映射类型。如何实现所需的类型?</p>
<p>我们需要从联合（union）K 取得所有内容，进行遍历，并返回一个仅包含这些键的新类型 。这正是映射类型所做的事。</p>
<p>尽管我们需要从原始类型中获取它的类型，值的类型本身并没有变化。这就是查找类型的用 处所在：</p>
<details class="custom-container details"><summary>答案</summary>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyPick<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token constant">K</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们说“从 K 中获取所有内容，命名为 P 并将其作为我们新对象的一个新键，其值类型取 自输入类型”。一开始理解很难，所以你一旦不理解什么，就尝试重读一遍，再一步步的在 脑海里思考。</p>
</details>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><RouterLink to="/theme-reco/Advanced-1.html#14-%E6%9D%A1%E4%BB%B6%E7%B1%BB%E5%9E%8B">1.4 条件类型</RouterLink></li>
<li><a href="https://javascript.plainenglish.io/use-typescript-conditional-types-like-a-pro-7baea0ad05c5" target="_blank" rel="noopener noreferrer">Using TypeScript Conditional Types Like a Pro<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types" target="_blank" rel="noopener noreferrer">Lookup Types<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/mapped-types.html" target="_blank" rel="noopener noreferrer">Mapped Types<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html" target="_blank" rel="noopener noreferrer">Indexed Types<ExternalLinkIcon/></a></li>
</ul>
</div></template>


