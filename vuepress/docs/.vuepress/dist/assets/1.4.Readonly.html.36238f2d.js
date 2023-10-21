import{_ as r,r as s,o as i,c as d,a,b as t,d as e,e as n,w as u,f as o}from"./app.c62ce33e.js";const k={},m=o(`<h2 id="\u9898\u76EE" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE" aria-hidden="true">#</a> \u9898\u76EE</h2><blockquote><p>\u6B22\u8FCE PR \u6539\u8FDB\u7FFB\u8BD1\u8D28\u91CF\u3002</p></blockquote><p>\u4E0D\u8981\u4F7F\u7528\u5185\u7F6E\u7684<code>Readonly&lt;T&gt;</code>\uFF0C\u81EA\u5DF1\u5B9E\u73B0\u4E00\u4E2A\u3002</p><p>\u8BE5 <code>Readonly</code> \u4F1A\u63A5\u6536\u4E00\u4E2A <em>\u6CDB\u578B\u53C2\u6570</em>\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u5B8C\u5168\u4E00\u6837\u7684\u7C7B\u578B\uFF0C\u53EA\u662F\u6240\u6709\u5C5E\u6027\u90FD\u4F1A\u88AB <code>readonly</code> \u6240\u4FEE\u9970\u3002</p><p>\u4E5F\u5C31\u662F\u4E0D\u53EF\u4EE5\u518D\u5BF9\u8BE5\u5BF9\u8C61\u7684\u5C5E\u6027\u8D4B\u503C\u3002</p><p>\u4F8B\u5982\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Todo</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  description<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> todo<span class="token operator">:</span> MyReadonly<span class="token operator">&lt;</span>Todo<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">&quot;Hey&quot;</span><span class="token punctuation">,</span>
  description<span class="token operator">:</span> <span class="token string">&quot;foobar&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

todo<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">&quot;Hello&quot;</span><span class="token punctuation">;</span> <span class="token comment">// Error: cannot reassign a readonly property</span>
todo<span class="token punctuation">.</span>description <span class="token operator">=</span> <span class="token string">&quot;barFoo&quot;</span><span class="token punctuation">;</span> <span class="token comment">// Error: cannot reassign a readonly property</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u89E3\u7B54" tabindex="-1"><a class="header-anchor" href="#\u89E3\u7B54" aria-hidden="true">#</a> \u89E3\u7B54</h2><p>::: info \u63D0\u793A \u5728\u8FD9\u4E2A\u6311\u6218\u4E2D\uFF0C\u4F60\u9700\u8981\u4FEE\u6539\u4E0B\u65B9\u7684\u4EE3\u7801\u4F7F\u5F97\u6D4B\u8BD5\u901A\u8FC7\uFF08\u4F7F\u5176\u6CA1\u6709\u7C7B\u578B\u9519\u8BEF\uFF09\u3002\uFF0C\u5E76\u4E14\u8BB0\u5F97\u5C06\u7B54\u6848\u5206\u4EAB\u5965\u3002 :::</p>`,9),h=n("br",null,null,-1),b=n("a",{href:"https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-4%E5%AE%9E%E7%8E%B0Readonly.md&title=1.4.%E5%AE%9E%E7%8E%B0Readonly",target:"_blank"},[n("img",{src:"https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-\u5206\u4EAB\u4F60\u7684\u89E3\u7B54-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704",alt:"\u5206\u4EAB\u4F60\u7684\u89E3\u7B54"})],-1),y=o(`<h2 id="\u89E3\u6790" tabindex="-1"><a class="header-anchor" href="#\u89E3\u6790" aria-hidden="true">#</a> \u89E3\u6790</h2><p>\u6211\u4EEC\u9700\u8981\u4F7F\u5BF9\u8C61\u4E2D\u7684\u6240\u6709\u5C5E\u6027\u90FD\u662F\u53EA\u8BFB\u7684\u3002\u56E0\u6B64\uFF0C\u6211\u4EEC\u9700\u8981\u8FED\u4EE3\u6240\u6709\u7684\u5C5E\u6027\uFF0C\u5E76\u4E3A\u5B83\u4EEC\u6DFB\u52A0 \u4E00\u4E2A\u4FEE\u9970\u7B26\u3002</p><p>\u6211\u4EEC\u5C06\u5728\u8FD9\u91CC\u4F7F \u7528\u6620\u5C04\u7C7B\u578B\uFF0C \u5F88\u7B80\u5355\u3002\u5BF9\u4E8E\u8BE5\u7C7B\u578B\u7684\u6BCF\u4E2A\u5C5E\u6027\uFF0C\u6211\u4EEC\u83B7\u53D6\u5B83\u7684\u952E\u5E76\u4E3A\u5176\u6DFB\u52A0\u4E00\u4E2A readonly \u4FEE\u9970\u7B26\uFF1A</p><details class="custom-container details"><summary>\u7B54\u6848</summary><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyReadonly<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">readonly</span> <span class="token punctuation">[</span><span class="token constant">K</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">K</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>`,5),v={href:"https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",target:"_blank",rel:"noopener noreferrer"};function _(g,f){const p=s("CodeBox"),c=s("ExternalLinkIcon"),l=s("RouterLink");return i(),d("div",null,[m,a(p,{surl:"https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.4.Readonly.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor"}),t("info-footer-start"),h,e(),b,t("info-footer-end"),y,n("ul",null,[n("li",null,[n("a",v,[e("Mapped Types"),a(c)])]),n("li",null,[a(l,{to:"/theme-reco/Advanced-2.html#23-readonlytype"},{default:u(()=>[e("2.3 Readonly<Type>")]),_:1})])])])}const E=r(k,[["render",_],["__file","1.4.Readonly.html.vue"]]);export{E as default};
