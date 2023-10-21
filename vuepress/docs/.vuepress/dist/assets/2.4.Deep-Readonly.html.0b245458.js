import{_ as l,r as t,o as r,c as i,a as s,b as o,d as a,e as n,f as p}from"./app.c62ce33e.js";const d={},u=p(`<h2 id="\u9898\u76EE" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE" aria-hidden="true">#</a> \u9898\u76EE</h2><p>\u5B9E\u73B0\u4E00\u4E2A\u901A\u7528\u7684 <code>DeepReadonly&lt;T&gt;</code>\uFF0C\u5B83\u5C06\u5BF9\u8C61\u7684\u6BCF\u4E2A\u53C2\u6570\u53CA\u5176\u5B50\u5BF9\u8C61\u9012\u5F52\u5730\u8BBE\u4E3A\u53EA\u8BFB\u3002</p><p>\u60A8\u53EF\u4EE5\u5047\u8BBE\u5728\u6B64\u6311\u6218\u4E2D\u6211\u4EEC\u4EC5\u5904\u7406\u5BF9\u8C61\u3002\u6570\u7EC4\uFF0C\u51FD\u6570\uFF0C\u7C7B\u7B49\u90FD\u65E0\u9700\u8003\u8651\u3002\u4F46\u662F\uFF0C\u60A8\u4ECD\u7136\u53EF\u4EE5\u901A\u8FC7\u8986\u76D6\u5C3D\u53EF\u80FD\u591A\u7684\u4E0D\u540C\u6848\u4F8B\u6765\u6311\u6218\u81EA\u5DF1\u3002</p><p>\u4F8B\u5982\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name"><span class="token constant">X</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
    b<span class="token operator">:</span> <span class="token string">&quot;hi&quot;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  y<span class="token operator">:</span> <span class="token string">&quot;hey&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">Expected</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">readonly</span> x<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">readonly</span> a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">readonly</span> b<span class="token operator">:</span> <span class="token string">&quot;hi&quot;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">readonly</span> y<span class="token operator">:</span> <span class="token string">&quot;hey&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">Todo</span> <span class="token operator">=</span> DeepReadonly<span class="token operator">&lt;</span><span class="token constant">X</span><span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// should be same as \`Expected\`</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p align="left"> \u70B9\u51FBgithub\u67E5\u770B\uFF1A <a href="https://github.com/W-HanYu/FE-Typescript/blob/master/vuepress/docs/challenge/2.4.Deep-Readonly.md"><img src="https://img.shields.io/badge/Github-1.8k+-143?logo=typescript&amp;color=3178C6&amp;logoColor=fff"></a></p><h2 id="\u6311\u6218" tabindex="-1"><a class="header-anchor" href="#\u6311\u6218" aria-hidden="true">#</a> \u6311\u6218</h2><p>::: info \u63D0\u793A \u5728\u8FD9\u4E2A\u6311\u6218\u4E2D\uFF0C\u4F60\u9700\u8981\u4FEE\u6539\u4E0B\u65B9\u7684\u4EE3\u7801\u4F7F\u5F97\u6D4B\u8BD5\u901A\u8FC7\uFF08\u4F7F\u5176\u6CA1\u6709\u7C7B\u578B\u9519\u8BEF\uFF09\u3002\u5E76\u4E14\u8BB0\u5F97\u5C06\u7B54\u6848\u5206\u4EAB\u5965\u3002 :::</p>`,8),k=n("br",null,null,-1),h=n("a",{href:"https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=2-4-%E5%AE%9E%E7%8E%B0Deep-Readonly.md&title=2-4-%E5%AE%9E%E7%8E%B0Deep-Readonly.md",target:"_blank"},[n("img",{src:"https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-\u5206\u4EAB\u4F60\u7684\u89E3\u7B54-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704",alt:"\u5206\u4EAB\u4F60\u7684\u89E3\u7B54"})],-1),m=p(`<h2 id="\u89E3\u6790" tabindex="-1"><a class="header-anchor" href="#\u89E3\u6790" aria-hidden="true">#</a> \u89E3\u6790</h2><p>\u5728\u8FD9\u4E2A\u6311\u6218\u4E2D\uFF0C\u6211\u4EEC\u9700\u8981\u521B\u5EFA\u76F8\u540C\u7684 <code>Readonly&lt;T&gt;</code> \u7C7B\u578B\u3002\u552F\u4E00 \u7684\u533A\u522B\u662F\u6211\u4EEC\u9700\u8981\u4F7F\u5B83\u9012\u5F52\u5316\u3002</p><p>\u8BA9\u6211\u4EEC\u4ECE\u7ECF\u5178\u5F00\u59CB\uFF0C\u5B9E\u73B0\u5E38\u89C4\u7684 <code>Readonly&lt;T&gt;</code> \u7C7B\u578B\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">DeepReadonly<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">readonly</span> <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4F46\u662F\uFF0C\u6B63\u5982\u4F60\u5DF2\u7ECF\u77E5\u9053\u7684\uFF0C\u8FD9\u4E2A\u7C7B\u578B\u4E0D\u4F1A\u5C06\u6240\u6709\u5185\u5BB9\u90FD\u8BBE\u4E3A\u53EA\u8BFB\uFF0C\u4EC5\u662F\u6CA1\u6709\u6DF1\u5EA6\u7684\u5B57\u6BB5\u3002\u539F \u56E0\u662F\u5F53\u6211\u4EEC\u7684 <code>T[P]</code> \u4E0D\u662F\u539F\u59CB\u7C7B\u578B\uFF0C\u800C\u662F\u4E00\u4E2A\u5BF9\u8C61\u65F6\uFF0C\u5B83\u4F1A\u6309\u539F\u6837\u4F20\u9012\u5B83\uFF0C\u4E14\u4E0D\u4F1A\u5C06\u5176\u5C5E \u6027\u8BBE\u4E3A\u53EA\u8BFB\u3002</p><p>\u56E0\u6B64\uFF0C\u6211\u4EEC\u9700\u8981\u5C06 <code>T[P]</code> \u66FF\u6362\u4E3A <code>DeepReadonly&lt;T&gt;</code> \u7684\u9012\u5F52\u7528\u6CD5\u3002\u4E0D\u8FC7\uFF0C\u5728\u4F7F\u7528\u9012\u5F52\u65F6 \u4E0D\u8981\u5FD8\u8BB0\u57FA\u672C\u60C5\u51B5\u3002</p><p>\u7B97\u6CD5\u5F88\u7B80\u5355\u3002\u5982\u679C <code>T[P]</code> \u662F\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u6211\u4EEC\u7EE7\u7EED\u8C03\u7528 <code>DeepReadonly</code>\uFF0C\u5426\u5219\u8FD4\u56DE <code>T[P]</code></p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">DeepReadonly<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">readonly</span> <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span> <span class="token keyword">extends</span> <span class="token class-name">Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">&gt;</span></span>
    <span class="token operator">?</span> DeepReadonly<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>
    <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>`,9),y={href:"https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types",target:"_blank",rel:"noopener noreferrer"};function _(f,w){const c=t("CodeBox"),e=t("ExternalLinkIcon");return r(),i("div",null,[u,s(c,{surl:"https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=2.4.Deep-Readonly.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor"}),o("info-footer-start"),k,a(),h,o("info-footer-end"),m,n("ul",null,[n("li",null,[n("a",y,[a("Conditional Types"),s(e)])]),n("li",null,[n("a",b,[a("Mapped Types"),s(e)])]),n("li",null,[n("a",v,[a("Index Types"),s(e)])]),n("li",null,[n("a",g,[a("Recursive Conditional Types"),s(e)])])])])}const T=l(d,[["render",_],["__file","2.4.Deep-Readonly.html.vue"]]);export{T as default};
