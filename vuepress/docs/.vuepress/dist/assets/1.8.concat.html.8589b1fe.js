import{_ as r,r as s,o as l,c as i,a,b as e,d as t,e as n,f as p}from"./app.c62ce33e.js";const u={},d=p(`<h2 id="\u9898\u76EE" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE" aria-hidden="true">#</a> \u9898\u76EE</h2><p>\u5728\u7C7B\u578B\u7CFB\u7EDF\u91CC\u5B9E\u73B0 <code>JavaScript</code> \u5185\u7F6E\u7684 <code>Array.conca</code>t \u65B9\u6CD5\uFF0C\u8FD9\u4E2A\u7C7B\u578B\u63A5\u53D7\u4E24\u4E2A\u53C2\u6570\uFF0C\u8FD4\u56DE\u7684\u65B0\u6570\u7EC4\u7C7B\u578B\u5E94\u8BE5\u6309\u7167\u8F93\u5165\u53C2\u6570\u4ECE\u5DE6\u5230\u53F3\u7684\u987A\u5E8F\u5408\u5E76\u4E3A\u4E00\u4E2A\u65B0\u7684\u6570\u7EC4\u3002</p><p>\u4F8B\u5982\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Result</span> <span class="token operator">=</span> Concat<span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// expected to be [1, 2]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p align="left"> \u70B9\u51FBgithub\u67E5\u770B\uFF1A <a href="https://github.com/W-HanYu/FE-Typescript/blob/master/vuepress/docs/challenge/1.8.concat.md"><img src="https://img.shields.io/badge/Github-1.8k+-143?logo=typescript&amp;color=3178C6&amp;logoColor=fff"></a></p><h2 id="\u6311\u6218" tabindex="-1"><a class="header-anchor" href="#\u6311\u6218" aria-hidden="true">#</a> \u6311\u6218</h2><p>::: info \u63D0\u793A \u5728\u8FD9\u4E2A\u6311\u6218\u4E2D\uFF0C\u4F60\u9700\u8981\u4FEE\u6539\u4E0B\u65B9\u7684\u4EE3\u7801\u4F7F\u5F97\u6D4B\u8BD5\u901A\u8FC7\uFF08\u4F7F\u5176\u6CA1\u6709\u7C7B\u578B\u9519\u8BEF\uFF09\u3002\uFF0C\u5E76\u4E14\u8BB0\u5F97\u5C06\u7B54\u6848\u5206\u4EAB\u5965\u3002 :::</p>`,7),k=n("br",null,null,-1),h=n("a",{href:"https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-8%E5%AE%9E%E7%8E%B0-concat.md&title=1-8%E5%AE%9E%E7%8E%B0-concat.md",target:"_blank"},[n("img",{src:"https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-\u5206\u4EAB\u4F60\u7684\u89E3\u7B54-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704",alt:"\u5206\u4EAB\u4F60\u7684\u89E3\u7B54"})],-1),m=p(`<h2 id="\u89E3\u6790" tabindex="-1"><a class="header-anchor" href="#\u89E3\u6790" aria-hidden="true">#</a> \u89E3\u6790</h2><p>\u5728 TypeScript \u4E2D\u5904\u7406\u6570\u7EC4\u65F6\uFF0C\u53D8\u53C2\u5143\u7EC4\u7C7B\u578B\u901A\u5E38\u4F1A\u5728\u67D0\u4E9B\u60C5\u51B5\u4E0B\u53D1\u6325\u4F5C\u7528\u3002\u4ED6\u4EEC\u5141\u8BB8\u6211\u4EEC \u8FDB\u884C\u6CDB\u578B\u5C55\u5F00\u3002\u7A0D\u540E\u6211\u4F1A\u8BD5\u7740\u8BF4\u660E\u3002</p><p>\u8BA9\u6211\u5411\u4F60\u5C55\u793A\u5728 JavaScript \u4E2D\u8FDE\u63A5\u4E24\u4E2A\u6570\u7EC4\u7684\u5B9E\u73B0:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">concat</span><span class="token punctuation">(</span>arr1<span class="token punctuation">,</span> arr2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token operator">...</span>arr1<span class="token punctuation">,</span> <span class="token operator">...</span>arr2<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u5C55\u5F00\u64CD\u4F5C\u7B26\u5C06 arr1 \u4E2D\u7684\u6240\u6709\u5143\u7D20\u653E\u5165\u53E6\u5916\u4E00\u4E2A\u6570\u7EC4\u4E2D\u3002\u6211\u4EEC\u53EF\u4EE5\u5BF9 arr2 \u8FDB \u884C\u540C\u6837\u7684\u64CD\u4F5C\u3002\u8FD9\u91CC\u7684\u5173\u952E\u662F\uFF0C\u5B83\u8FED\u4EE3\u6570\u7EC4\u6216\u5143\u7EC4\u4E2D\u7684\u5143\u7D20\uFF0C\u5E76\u5C06\u5B83\u4EEC\u7C98\u8D34\u5230\u4F7F\u7528\u5C55\u5F00\u64CD\u4F5C \u7B26\u7684\u5730\u65B9\u3002</p><p>\u53EF\u53D8\u5143\u7EC4\u7C7B\u578B\u5141\u8BB8\u6211\u4EEC\u5728\u7C7B\u578B\u7CFB\u7EDF\u4E2D\u5EFA\u6A21\u76F8\u540C\u7684\u884C\u4E3A\u3002\u5982\u679C\u6211\u4EEC\u60F3\u8981\u8FDE\u63A5\u4E24\u4E2A\u6CDB\u578B\u6570\u7EC4\uFF0C\u53EF \u4EE5\u4F7F\u7528\u5C55\u5F00\u64CD\u4F5C\u7B26\u8FD4\u56DE\u5408\u5E76\u540E\u7684\u65B0\u6570\u7EC4:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Concat<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token constant">U</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6211\u4EEC\u9047\u5230\u4E00\u4E2A\u9519\u8BEF\u201CA rest element type must be an array type.\u201D\u3002\u8BA9\u6211\u4EEC\u6765\u4FEE\u590D\u5B83\u5E76\u8BA9 \u7F16\u8BD1\u5668\u77E5\u9053\u8FD9\u4E9B\u7C7B\u578B\u662F\u6570\u7EC4\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Concat<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token constant">U</span> <span class="token keyword">extends</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token constant">U</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>`,10),b={href:"https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types",target:"_blank",rel:"noopener noreferrer"};function g(v,y){const o=s("CodeBox"),c=s("ExternalLinkIcon");return l(),i("div",null,[d,a(o,{surl:"https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.8.concat.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor"}),e("info-footer-start"),k,t(),h,e("info-footer-end"),m,n("ul",null,[n("li",null,[n("a",b,[t("Variadic Tuple Types"),a(c)])])])])}const f=r(u,[["render",g],["__file","1.8.concat.html.vue"]]);export{f as default};
