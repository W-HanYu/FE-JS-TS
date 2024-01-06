import{_ as l,r as a,o as r,c as i,a as n,b as e,d as t,e as s,f as o}from"./app.d6a6c857.js";const d={},k=o(`<h2 id="\u9898\u76EE" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE" aria-hidden="true">#</a> \u9898\u76EE</h2><p>\u5B9E\u73B0\u4E00\u4E2A <code>IF</code> \u7C7B\u578B\uFF0C\u5B83\u63A5\u6536\u4E00\u4E2A\u6761\u4EF6\u7C7B\u578B <code>C</code> \uFF0C\u4E00\u4E2A\u5224\u65AD\u4E3A\u771F\u65F6\u7684\u8FD4\u56DE\u7C7B\u578B <code>T</code> \uFF0C\u4EE5\u53CA\u4E00\u4E2A\u5224\u65AD\u4E3A\u5047\u65F6\u7684\u8FD4\u56DE\u7C7B\u578B <code>F</code>\u3002 <code>C</code> \u53EA\u80FD\u662F <code>true</code> \u6216\u8005 <code>false</code>\uFF0C <code>T</code> \u548C <code>F</code> \u53EF\u4EE5\u662F\u4EFB\u610F\u7C7B\u578B\u3002</p><p>\u4F8B\u5982\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token operator">=</span> If<span class="token operator">&lt;</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// expected to be &#39;a&#39;</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token operator">=</span> If<span class="token operator">&lt;</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// expected to be &#39;b&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p align="left"> \u70B9\u51FBgithub\u67E5\u770B\uFF1A <a href="https://github.com/W-HanYu/FE-Typescript/blob/master/vuepress/docs/challenge/1.10.if.md"><img src="https://img.shields.io/badge/Github-1.8k+-143?logo=typescript&amp;color=3178C6&amp;logoColor=fff"></a></p><h2 id="\u6311\u6218" tabindex="-1"><a class="header-anchor" href="#\u6311\u6218" aria-hidden="true">#</a> \u6311\u6218</h2><p>::: info \u63D0\u793A \u5728\u8FD9\u4E2A\u6311\u6218\u4E2D\uFF0C\u4F60\u9700\u8981\u4FEE\u6539\u4E0B\u65B9\u7684\u4EE3\u7801\u4F7F\u5F97\u6D4B\u8BD5\u901A\u8FC7\uFF08\u4F7F\u5176\u6CA1\u6709\u7C7B\u578B\u9519\u8BEF\uFF09\u3002\u5E76\u4E14\u8BB0\u5F97\u5C06\u7B54\u6848\u5206\u4EAB\u5965\u3002 :::</p>`,7),u=s("br",null,null,-1),h=s("a",{href:"https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-10%E5%AE%9E%E7%8E%B0-if.md&title=1-10%E5%AE%9E%E7%8E%B0-if.md",target:"_blank"},[s("img",{src:"https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-\u5206\u4EAB\u4F60\u7684\u89E3\u7B54-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704",alt:"\u5206\u4EAB\u4F60\u7684\u89E3\u7B54"})],-1),m=o(`<h2 id="\u89E3\u6790" tabindex="-1"><a class="header-anchor" href="#\u89E3\u6790" aria-hidden="true">#</a> \u89E3\u6790</h2><p>\u5982\u679C\u4F60\u4E0D\u786E\u5B9A\u4EC0\u4E48\u65F6\u5019\u5728 TypeScript \u4E2D\u4F7F \u7528\u6761\u4EF6\u7C7B\u578B\uFF0C \u90A3\u5C31\u662F\u4F60\u9700\u8981\u5BF9\u7C7B\u578B\u4F7F\u7528\u201Cif\u201D\u8BED\u53E5\u7684\u65F6\u5019\u3002\u8FD9\u6B63\u662F\u6211\u4EEC\u8FD9\u91CC\u8981\u505A\u7684\u3002</p><p>\u5982\u679C\u6761\u4EF6\u7C7B\u578B\u7684\u8BA1\u7B97\u7ED3\u679C\u4E3A true\uFF0C\u6211\u4EEC\u9700\u8981\u53D6\u201Ctrue\u201D\u5206\u652F\uFF0C\u5426\u5219\u201Cfalse\u201D\u5206\u652F:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">If<span class="token operator">&lt;</span><span class="token constant">C</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">F</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">C</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token boolean">true</span></span> <span class="token operator">?</span> <span class="token constant">T</span> <span class="token operator">:</span> <span class="token constant">F</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD9\u6837\u6211\u4EEC\u4F1A\u5F97\u5230\u4E00\u4E2A\u7F16\u8BD1\u9519\u8BEF\uFF0C\u56E0\u4E3A\u6211\u4EEC\u8BD5\u56FE\u5C06 C \u8D4B\u503C\u7ED9\u5E03\u5C14\u7C7B\u578B\uFF0C\u800C\u6CA1\u6709\u4E00\u4E2A\u663E\u5F0F\u7684\u7EA6 \u675F\u3002\u56E0\u6B64\uFF0C\u8BA9\u6211\u4EEC\u901A\u8FC7\u5728\u7C7B\u578B\u53C2\u6570 C \u4E2D\u6DFB\u52A0 extends boolean \u6765\u4FEE\u590D\u5B83:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">If<span class="token operator">&lt;</span><span class="token constant">C</span> <span class="token keyword">extends</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">F</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">C</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token boolean">true</span></span> <span class="token operator">?</span> <span class="token constant">T</span> <span class="token operator">:</span> <span class="token constant">F</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>`,7),b={href:"https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",target:"_blank",rel:"noopener noreferrer"};function f(g,_){const p=a("CodeBox"),c=a("ExternalLinkIcon");return r(),i("div",null,[k,n(p,{surl:"https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.10.if.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor"}),e("info-footer-start"),u,t(),h,e("info-footer-end"),m,s("ul",null,[s("li",null,[s("a",b,[t("Conditional Types"),n(c)])])])])}const y=l(d,[["render",f],["__file","1.10.if.html.vue"]]);export{y as default};
