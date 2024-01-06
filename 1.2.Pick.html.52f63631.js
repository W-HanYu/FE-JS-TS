import{_ as i,r as t,o as r,c as d,a as s,b as o,d as a,e as n,w as u,f as p}from"./app.773abf9d.js";const k={},h=p(`<h2 id="\u6311\u6218" tabindex="-1"><a class="header-anchor" href="#\u6311\u6218" aria-hidden="true">#</a> \u6311\u6218</h2><p>\u5B9E\u73B0 TS \u5185\u7F6E\u7684 Pick&lt;T, K&gt;\uFF0C\u4F46\u4E0D\u53EF\u4EE5\u4F7F\u7528\u5B83\u3002</p><p>\u4ECE\u7C7B\u578B T \u4E2D\u9009\u62E9\u51FA\u5C5E\u6027 K\uFF0C\u6784\u9020\u6210\u4E00\u4E2A\u65B0\u7684\u7C7B\u578B\u3002</p><p>\u5728\u8FD9\u4E2A\u6311\u6218\u4E2D\uFF0C\u4F60\u9700\u8981\u4FEE\u6539\u4E0B\u65B9\u7684\u4EE3\u7801\u4F7F\u5F97\u6D4B\u8BD5\u901A\u8FC7\uFF08\u4F7F\u5176\u6CA1\u6709\u7C7B\u578B\u9519\u8BEF\uFF09\u3002</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Todo</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  description<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  completed<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">TodoPreview</span> <span class="token operator">=</span> MyPick<span class="token operator">&lt;</span>Todo<span class="token punctuation">,</span> <span class="token string">&quot;title&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;completed&quot;</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> todo<span class="token operator">:</span> TodoPreview <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">&quot;Clean room&quot;</span><span class="token punctuation">,</span>
  completed<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u89E3\u7B54" tabindex="-1"><a class="header-anchor" href="#\u89E3\u7B54" aria-hidden="true">#</a> \u89E3\u7B54</h2><p>::: info \u63D0\u793A \u8BF7\u60A8\u5728\u901A\u8FC7\u4FEE\u6539\u7B2C 9 \u884C\uFF0C\u8BA9 11 \u884C\u4EE3\u7801\u4E0D\u4F1A\u629B\u51FA\u5F02\u5E38\uFF0C\u5E76\u4E14\u8BB0\u5F97\u5C06\u7B54\u6848\u63D0\u4EA4\u5965\u3002 :::</p>`,7),m=n("br",null,null,-1),b=n("a",{href:"https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-2-%E5%AE%9E%E7%8E%B0pick.md&title=1.2.%E5%AE%9E%E7%8E%B0Pick",target:"_blank"},[n("img",{src:"https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-\u5206\u4EAB\u4F60\u7684\u89E3\u7B54-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704",alt:"\u5206\u4EAB\u4F60\u7684\u89E3\u7B54"})],-1),v=p(`<h2 id="\u89E3\u6790" tabindex="-1"><a class="header-anchor" href="#\u89E3\u6790" aria-hidden="true">#</a> \u89E3\u6790</h2><p>\u4E3A\u4E86\u89E3\u51FA\u8FD9\u4E2A\u6311\u6218\uFF0C\u6211\u4EEC\u9700\u8981\u4F7F\u7528\u67E5\u627E\u7C7B\u578B\u548C\u6620\u5C04\u7C7B\u578B\u3002</p><p>\u67E5\u627E\u7C7B\u578B\u5141\u8BB8\u6211\u4EEC\u901A\u8FC7\u540D\u79F0\u4ECE\u53E6\u4E00\u4E2A\u7C7B\u578B\u4E2D\u63D0\u53D6\u4E00\u4E2A\u7C7B\u578B\u3002\u7C7B\u4F3C\u4E8E\u4F7F\u7528\u952E\u503C\u4ECE\u4E00\u4E2A\u5BF9\u8C61\u4E2D\u83B7 \u53D6\u503C\u3002</p><p>\u6620\u5C04\u7C7B\u578B\u5141\u8BB8\u6211\u4EEC\u5C06\u4E00\u4E2A\u7C7B\u578B\u4E2D\u7684\u6BCF\u4E2A\u5C5E\u6027\u8F6C\u6362\u4E3A\u4E00\u4E2A\u65B0\u7C7B\u578B\u3002</p><p>\u4F60\u53EF\u4EE5\u5728 TypeScript \u7F51 \u7AD9 lookup types \u548C mapped types \u4E0A \u4E86\u89E3\u66F4\u591A\u5B83\u4EEC\u5F97\u4FE1\u606F\uFF0C\u5E76\u4E86\u89E3\u5B83\u4EEC\u5728\u505A\u4EC0\u4E48\u3002</p><p>\u73B0\u5728\uFF0C\u6211\u4EEC\u77E5\u9053 TypeScript \u4E2D\u6709\u67E5\u627E\u7C7B\u578B\u548C\u6620\u5C04\u7C7B\u578B\u3002\u5982\u4F55\u5B9E\u73B0\u6240\u9700\u7684\u7C7B\u578B?</p><p>\u6211\u4EEC\u9700\u8981\u4ECE\u8054\u5408\uFF08union\uFF09K \u53D6\u5F97\u6240\u6709\u5185\u5BB9\uFF0C\u8FDB\u884C\u904D\u5386\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u4EC5\u5305\u542B\u8FD9\u4E9B\u952E\u7684\u65B0\u7C7B\u578B \u3002\u8FD9\u6B63\u662F\u6620\u5C04\u7C7B\u578B\u6240\u505A\u7684\u4E8B\u3002</p><p>\u5C3D\u7BA1\u6211\u4EEC\u9700\u8981\u4ECE\u539F\u59CB\u7C7B\u578B\u4E2D\u83B7\u53D6\u5B83\u7684\u7C7B\u578B\uFF0C\u503C\u7684\u7C7B\u578B\u672C\u8EAB\u5E76\u6CA1\u6709\u53D8\u5316\u3002\u8FD9\u5C31\u662F\u67E5\u627E\u7C7B\u578B\u7684\u7528 \u5904\u6240\u5728\uFF1A</p><details class="custom-container details"><summary>\u7B54\u6848</summary><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyPick<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token constant">K</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6211\u4EEC\u8BF4\u201C\u4ECE K \u4E2D\u83B7\u53D6\u6240\u6709\u5185\u5BB9\uFF0C\u547D\u540D\u4E3A P \u5E76\u5C06\u5176\u4F5C\u4E3A\u6211\u4EEC\u65B0\u5BF9\u8C61\u7684\u4E00\u4E2A\u65B0\u952E\uFF0C\u5176\u503C\u7C7B\u578B\u53D6 \u81EA\u8F93\u5165\u7C7B\u578B\u201D\u3002\u4E00\u5F00\u59CB\u7406\u89E3\u5F88\u96BE\uFF0C\u6240\u4EE5\u4F60\u4E00\u65E6\u4E0D\u7406\u89E3\u4EC0\u4E48\uFF0C\u5C31\u5C1D\u8BD5\u91CD\u8BFB\u4E00\u904D\uFF0C\u518D\u4E00\u6B65\u6B65\u7684\u5728 \u8111\u6D77\u91CC\u601D\u8003\u3002</p></details><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>`,10),_={href:"https://javascript.plainenglish.io/use-typescript-conditional-types-like-a-pro-7baea0ad05c5",target:"_blank",rel:"noopener noreferrer"},y={href:"https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html",target:"_blank",rel:"noopener noreferrer"};function w(x,E){const c=t("CodeBox"),l=t("RouterLink"),e=t("ExternalLinkIcon");return r(),d("div",null,[h,s(c,{surl:"https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.2.Pick.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor"}),o("info-footer-start"),m,a(),b,o("info-footer-end"),v,n("ul",null,[n("li",null,[s(l,{to:"/theme-reco/Advanced-1.html#14-%E6%9D%A1%E4%BB%B6%E7%B1%BB%E5%9E%8B"},{default:u(()=>[a("1.4 \u6761\u4EF6\u7C7B\u578B")]),_:1})]),n("li",null,[n("a",_,[a("Using TypeScript Conditional Types Like a Pro"),s(e)])]),n("li",null,[n("a",y,[a("Lookup Types"),s(e)])]),n("li",null,[n("a",g,[a("Mapped Types"),s(e)])]),n("li",null,[n("a",f,[a("Indexed Types"),s(e)])])])])}const B=i(k,[["render",w],["__file","1.2.Pick.html.vue"]]);export{B as default};
