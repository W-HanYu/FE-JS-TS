import{_ as l,r as t,o as i,c as r,a as n,b as o,d as a,e as s,f as p}from"./app.773abf9d.js";const d={},u=p('<h2 id="\u9898\u76EE" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE" aria-hidden="true">#</a> \u9898\u76EE</h2><p>\u5728\u7C7B\u578B\u7CFB\u7EDF\u91CC\u5B9E\u73B0 JavaScript \u7684 Array.includes \u65B9\u6CD5\uFF0C\u8FD9\u4E2A\u7C7B\u578B\u63A5\u53D7\u4E24\u4E2A\u53C2\u6570\uFF0C\u8FD4\u56DE\u7684\u7C7B\u578B\u8981\u4E48\u662F true \u8981\u4E48\u662F false\u3002</p><p>\u4F8B\u5982\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">isPillarMen</span> <span class="token operator">=</span> Includes<span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token string">&quot;Kars&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Esidisi&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Wamuu&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Santana&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;Dio&quot;</span><span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// expected to be `false`</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p align="left"> \u70B9\u51FBgithub\u67E5\u770B\uFF1A <a href="https://github.com/W-HanYu/FE-Typescript/blob/master/vuepress/docs/challenge/1.11.includes.md"><img src="https://img.shields.io/badge/Github-1.8k+-143?logo=typescript&amp;color=3178C6&amp;logoColor=fff"></a></p><h2 id="\u6311\u6218" tabindex="-1"><a class="header-anchor" href="#\u6311\u6218" aria-hidden="true">#</a> \u6311\u6218</h2><p>::: info \u63D0\u793A \u5728\u8FD9\u4E2A\u6311\u6218\u4E2D\uFF0C\u4F60\u9700\u8981\u4FEE\u6539\u4E0B\u65B9\u7684\u4EE3\u7801\u4F7F\u5F97\u6D4B\u8BD5\u901A\u8FC7\uFF08\u4F7F\u5176\u6CA1\u6709\u7C7B\u578B\u9519\u8BEF\uFF09\u3002\u5E76\u4E14\u8BB0\u5F97\u5C06\u7B54\u6848\u5206\u4EAB\u5965\u3002 :::</p>',7),k=s("br",null,null,-1),m=s("a",{href:"https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-11%E5%AE%9E%E7%8E%B0-includes.md&title=1-11%E5%AE%9E%E7%8E%B0-includes.md",target:"_blank"},[s("img",{src:"https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-\u5206\u4EAB\u4F60\u7684\u89E3\u7B54-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704",alt:"\u5206\u4EAB\u4F60\u7684\u89E3\u7B54"})],-1),b=p(`<h2 id="\u89E3\u6790" tabindex="-1"><a class="header-anchor" href="#\u89E3\u6790" aria-hidden="true">#</a> \u89E3\u6790</h2><p>\u6211\u4EEC\u9996\u5148\u7F16\u5199\u63A5\u53D7\u4E24\u4E2A\u53C2\u6570\u7684\u7C7B\u578B:T(\u5143\u7EC4)\u548C U(\u6211\u4EEC\u6B63\u5728\u5BFB\u627E\u7684)\u3002</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Includes<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token builtin">never</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5728\u6211\u4EEC\u771F\u6B63\u80FD\u5728\u5143\u7EC4\u4E2D\u627E\u5230\u4E00\u4E9B\u4E1C\u897F\u4E4B\u524D\uFF0C\u5C06\u5176\u201C\u8F6C\u6362\u201D\u4E3A\u8054\u5408<code>\uFF08union\uFF09</code>\u6BD4\u4F1A\u5143\u7EC4<code>\uFF08tuple\uFF09</code> \u66F4\u5BB9\u6613\u4E00\u4E9B\u3002\u4E3A\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u7D22\u5F15\u7C7B\u578B<code>\uFF08indexed types\uFF09</code>\u3002\u5982\u679C\u6211\u4EEC\u8BBF \u95EE <code>T[number]</code>\uFF0C<code>TypeScript</code> \u4F1A\u8FD4\u56DE <code>T</code> \u4E2D\u6240\u6709\u5143\u7D20\u7684\u8054\u5408<code>\uFF08union\uFF09</code>\u3002\u4F8B\u5982\uFF0C\u5982\u679C\u4F60\u6709\u4E00 \u4E2A <code>T = [1, 2, 3]</code>\uFF0C\u901A\u8FC7 <code>T = [1, 2, 3]</code>\u8BBF\u95EE\u5C06\u8FD4\u56DE <code>1 | 2 | 3</code>\u3002</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Includes<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4F46\u662F\uFF0C\u8FD9\u91CC\u6709\u4E00\u4E2A\u9519\u8BEF\uFF0C<code>\u201CType \u2018number\u2019 cannot be used to index type \u2018T\u2019\u201D</code>\u3002\u8FD9\u662F\u56E0\u4E3A \u7C7B\u578B T \u6CA1\u6709\u7EA6\u675F\u3002\u6211\u4EEC\u9700\u8981\u544A\u8BC9 <code>TypeScript</code>\uFF0C<code>T</code> \u662F\u4E00\u4E2A\u6570\u7EC4\u3002</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Includes<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6211\u4EEC\u6709\u4E86\u5143\u7D20\u7684\u8054\u5408<code>\uFF08union\uFF09</code>\u3002\u6211\u4EEC\u5982\u4F55\u68C0\u67E5\u5143\u7D20\u662F\u5426\u5B58\u5728\u4E8E\u8054\u5408<code>\uFF08union\uFF09</code>\u4E2D\uFF1F\u6761\u4EF6\u7C7B\u578B \u5206\u914D<code>\uFF08Distributive\uFF09</code>!\u6211\u4EEC\u53EF\u4EE5\u4E3A\u8054\u5408<code>\uFF08union\uFF09</code>\u7F16\u5199\u6761\u4EF6\u7C7B\u578B\uFF0C<code>TypeScript </code>\u4F1A\u81EA\u52A8\u5C06\u6761 \u4EF6\u5E94\u7528\u5230\u8054\u5408<code>\uFF08union\uFF09</code>\u7684\u6BCF\u4E2A\u5143\u7D20\u4E0A\u3002</p><p>\u4F8B\u5982\uFF0C\u5982\u679C\u4F60\u5199 <code>2 extends 1 | 2</code>\uFF0C<code>TypeScript</code> \u5B9E\u9645\u4E0A\u4F1A\u628A\u5B83\u66FF\u6362\u6210 <code>2</code> \u4E2A\u6761\u4EF6\u8BED \u53E5<code> 2 extends 1</code> \u548C<code> 2 extends 2</code>\u3002</p><p>\u6211\u4EEC\u53EF\u4EE5\u5229\u7528\u5B83\u68C0\u67E5 <code>U</code> \u662F\u5426\u5728 <code>T[number]</code>\u4E2D\uFF0C\u5982\u679C\u5728\u5219\u8FD4\u56DE<code> true</code>\u3002</p><details class="custom-container details"><summary>\u53C2\u8003</summary><ol><li>\u9012\u5F52\u89E3\u7B54</li></ol><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Includes<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token keyword">readonly</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">[</span><span class="token keyword">infer</span> <span class="token constant">R</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token keyword">infer</span> <span class="token constant">K</span><span class="token punctuation">]</span>
  <span class="token operator">?</span> Equal<span class="token operator">&lt;</span><span class="token constant">U</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token boolean">true</span></span>
    <span class="token operator">?</span> <span class="token boolean">true</span>
    <span class="token operator">:</span> Includes<span class="token operator">&lt;</span><span class="token constant">K</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span>
  <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>\u5FAA\u73AF\u6BD4\u8F83</li></ol><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Includes<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token keyword">readonly</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">K</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> Equal<span class="token operator">&lt;</span><span class="token constant">U</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">K</span><span class="token punctuation">]</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">]</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token boolean">false</span></span>
  <span class="token operator">?</span> <span class="token boolean">false</span>
  <span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>`,12),h={href:"https://www.typescriptlang.org/docs/handbook/2/generics.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints",target:"_blank",rel:"noopener noreferrer"},y={href:"https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html",target:"_blank",rel:"noopener noreferrer"};function _(w,x){const c=t("CodeBox"),e=t("ExternalLinkIcon");return i(),r("div",null,[u,n(c,{surl:"https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.11.includes.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor"}),o("info-footer-start"),k,a(),m,o("info-footer-end"),b,s("ul",null,[s("li",null,[s("a",h,[a("generics"),n(e)])]),s("li",null,[s("a",g,[a("Generic Constraints"),n(e)])]),s("li",null,[s("a",y,[a("Conditional Types"),n(e)])]),s("li",null,[s("a",v,[a("Distributive Conditional Types"),n(e)])]),s("li",null,[s("a",f,[a("Index Types"),n(e)])])])])}const E=l(d,[["render",_],["__file","1.11.includes.html.vue"]]);export{E as default};
