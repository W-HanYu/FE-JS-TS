import{_ as l,r as t,o as r,c as i,a as n,b as p,d as a,e as s,f as o}from"./app.773abf9d.js";const u={},d=o(`<h2 id="\u9898\u76EE" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE" aria-hidden="true">#</a> \u9898\u76EE</h2><p>\u5728\u7C7B\u578B\u7CFB\u7EDF\u91CC\u5B9E\u73B0\u901A\u7528\u7684 <code>Array.push </code>\u3002</p><p>\u4F8B\u5982\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Result</span> <span class="token operator">=</span> Push<span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;3&quot;</span><span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// [1, 2, &#39;3&#39;]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p align="left"> \u70B9\u51FBgithub\u67E5\u770B\uFF1A <a href="https://github.com/W-HanYu/FE-Typescript/blob/master/vuepress/docs/challenge/1.13.push.md"><img src="https://img.shields.io/badge/Github-1.8k+-143?logo=typescript&amp;color=3178C6&amp;logoColor=fff"></a></p><h2 id="\u6311\u6218" tabindex="-1"><a class="header-anchor" href="#\u6311\u6218" aria-hidden="true">#</a> \u6311\u6218</h2><p>::: info \u63D0\u793A \u5728\u8FD9\u4E2A\u6311\u6218\u4E2D\uFF0C\u4F60\u9700\u8981\u4FEE\u6539\u4E0B\u65B9\u7684\u4EE3\u7801\u4F7F\u5F97\u6D4B\u8BD5\u901A\u8FC7\uFF08\u4F7F\u5176\u6CA1\u6709\u7C7B\u578B\u9519\u8BEF\uFF09\u3002\u5E76\u4E14\u8BB0\u5F97\u5C06\u7B54\u6848\u5206\u4EAB\u5965\u3002 :::</p>`,7),k=s("br",null,null,-1),h=s("a",{href:"https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-13%E5%AE%9E%E7%8E%B0-push.md&title=1-13%E5%AE%9E%E7%8E%B0-push.md",target:"_blank"},[s("img",{src:"https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-\u5206\u4EAB\u4F60\u7684\u89E3\u7B54-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704",alt:"\u5206\u4EAB\u4F60\u7684\u89E3\u7B54"})],-1),m=o(`<h2 id="\u89E3\u6790" tabindex="-1"><a class="header-anchor" href="#\u89E3\u6790" aria-hidden="true">#</a> \u89E3\u6790</h2><p>\u8FD9\u4E2A\u5B9E\u9645\u4E0A\u5F88\u7B80\u5355\u3002\u8981\u5B9E\u73B0\u4E00\u4E2A\u5C06\u5143\u7D20\u63D2\u5165\u6570\u7EC4\u7684\u7C7B\u578B\uFF0C\u6211\u4EEC\u9700\u8981\u505A 2 \u4EF6\u4E8B\u3002\u7B2C\u4E00\u4EF6\u4E8B\u662F \u83B7\u53D6\u6570\u7EC4\u7684\u6240\u6709\u5143\u7D20\uFF0C\u7B2C\u4E8C\u4EF6\u4E8B\u662F\u5411\u5B83\u4EEC\u63D2\u5165\u4E00\u4E2A\u989D\u5916\u7684\u5143\u7D20\u3002</p><p>\u8981\u4ECE\u6570\u7EC4\u4E2D\u83B7\u53D6\u6240\u6709\u5143\u7D20\uFF0C\u53EF\u4EE5\u4F7F\u7528\u53EF\u53D8\u53C2\u6570\u5143\u7EC4\u7C7B\u578B\u3002\u56E0\u6B64\uFF0C\u8BA9\u6211\u4EEC\u8FD4\u56DE\u4E00\u4E2A\u5177\u6709\u8F93\u5165\u7C7B \u578B T \u4E2D\u76F8\u540C\u5143\u7D20\u7684\u6570\u7EC4:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Push<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token constant">T</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5F97\u5230\u4E00\u4E2A\u7F16\u8BD1\u9519\u8BEF\u201CA rest element type must be an array type\u201D\u3002\u8FD9\u610F\u5473\u7740\u6211\u4EEC\u4E0D\u80FD\u5728 \u975E\u6570\u7EC4\u7C7B\u578B\u4E0A\u4F7F\u7528\u53EF\u53D8\u5143\u7EC4\u7C7B\u578B\u3002\u56E0\u6B64\uFF0C\u8BA9\u6211\u4EEC\u6DFB\u52A0\u4E00\u4E2A\u901A\u7528\u7684\u7EA6\u675F\u6765\u8868\u660E\u6211\u4EEC\u53EA\u5904\u7406\u6570\u7EC4 :</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Push<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token constant">T</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u73B0\u5728\uFF0C\u6211\u4EEC\u6709\u4E00\u4E2A\u7C7B\u578B\u53C2\u6570 T \u4F20\u5165\u7684\u6570\u7EC4\u526F\u672C\u3002\u5269\u4E0B\u7684\u5C31\u662F\u6DFB\u52A0\u4F20\u5165\u7684\u5143\u7D20 U:</p><details class="custom-container details"><summary>\u53C2\u8003\u7B54\u6848</summary><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Push<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details><p>\u8FD9\u6837\uFF0C\u6211\u4EEC\u5C31\u5728\u7C7B\u578B\u7CFB\u7EDF\u4E2D\u5B9E\u73B0\u4E86\u4E00\u4E2A push \u64CD\u4F5C\u3002</p><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>`,10),g={href:"https://www.typescriptlang.org/docs/handbook/2/generics.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types",target:"_blank",rel:"noopener noreferrer"};function _(y,v){const c=t("CodeBox"),e=t("ExternalLinkIcon");return r(),i("div",null,[d,n(c,{surl:"https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.13.push.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor"}),p("info-footer-start"),k,a(),h,p("info-footer-end"),m,s("ul",null,[s("li",null,[s("a",g,[a("generics"),n(e)])]),s("li",null,[s("a",b,[a("Variadic Tuple Types"),n(e)])])])])}const x=l(u,[["render",_],["__file","1.13.push.html.vue"]]);export{x as default};
