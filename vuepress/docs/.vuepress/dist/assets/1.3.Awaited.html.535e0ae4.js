import{_ as i,r as t,o as l,c,a as n,b as o,d as a,e as s,f as p}from"./app.06e72142.js";const d={},k=p(`<h2 id="\u6311\u6218" tabindex="-1"><a class="header-anchor" href="#\u6311\u6218" aria-hidden="true">#</a> \u6311\u6218</h2><p>\u5047\u5982\u6211\u4EEC\u6709\u4E00\u4E2A Promise \u5BF9\u8C61\uFF0C\u8FD9\u4E2A Promise \u5BF9\u8C61\u4F1A\u8FD4\u56DE\u4E00\u4E2A\u7C7B\u578B\u3002\u5728 TS \u4E2D\uFF0C\u6211\u4EEC\u7528 Promise \u4E2D\u7684 T \u6765\u63CF\u8FF0\u8FD9\u4E2A Promise \u8FD4\u56DE\u7684\u7C7B\u578B\u3002\u8BF7\u4F60\u5B9E\u73B0\u4E00\u4E2A\u7C7B\u578B\uFF0C\u53EF\u4EE5\u83B7\u53D6\u8FD9\u4E2A\u7C7B\u578B\u3002</p><p>\u4F8B\u5982\uFF1APromise\uFF0C\u8BF7\u4F60\u8FD4\u56DE ExampleType \u7C7B\u578B\u3002</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Todo</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  description<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  completed<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">TodoPreview</span> <span class="token operator">=</span> MyPick<span class="token operator">&lt;</span>Todo<span class="token punctuation">,</span> <span class="token string">&quot;title&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;completed&quot;</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> todo<span class="token operator">:</span> TodoPreview <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">&quot;Clean room&quot;</span><span class="token punctuation">,</span>
  completed<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u89E3\u7B54" tabindex="-1"><a class="header-anchor" href="#\u89E3\u7B54" aria-hidden="true">#</a> \u89E3\u7B54</h2><p>::: info \u63D0\u793A \u8BF7\u60A8\u5728\u901A\u8FC7\u4FEE\u6539\u7B2C 3 \u884C\uFF0C\u8BA9 15-19 \u884C\u4EE3\u7801\u4E0D\u4F1A\u629B\u51FA\u5F02\u5E38\uFF0C\u5E76\u4E14\u8BB0\u5F97\u5C06\u7B54\u6848\u63D0\u4EA4\u5965\u3002 :::</p>`,6),u=s("br",null,null,-1),m=s("a",{href:"https://github.com/W-HanYu/FE-Typescript/issues/new?assignees=Ustinian&labels=answer&template=1-3-%E5%AE%9E%E7%8E%B0Awaited.md&title=1.3.%E5%AE%9E%E7%8E%B0Awaited",target:"_blank"},[s("img",{src:"https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/-\u5206\u4EAB\u4F60\u7684\u89E3\u7B54-teal.svg?sign=8bb2a2a3bd2b1cc8f86bfd919d53197e&t=1668143704",alt:"\u5206\u4EAB\u4F60\u7684\u89E3\u7B54"})],-1),g=p(`<h2 id="\u89E3\u6790" tabindex="-1"><a class="header-anchor" href="#\u89E3\u6790" aria-hidden="true">#</a> \u89E3\u6790</h2><p>\u8FD9\u662F\u4E00\u4E2A\u975E\u5E38\u6709\u8DA3\u7684\u6311\u6218\uFF0C\u5B83\u8981\u6C42\u6211\u4EEC\u4E86\u89E3 TypeScript \u7684\u4E00\u4E2A\u88AB\u4F4E\u4F30\u7684\u7279\u6027\uFF0C\u6055\u6211\u76F4\u8A00\u3002</p><p>\u4F46\u662F\uFF0C\u5728\u8BF4\u660E\u6211\u7684\u610F\u601D\u4E4B\u524D\uFF0C\u8BA9\u6211\u4EEC\u6765\u5206\u6790\u4E00\u4E0B\u8FD9\u4E2A\u6311\u6218\u3002\u4F5C\u8005\u8981\u6C42\u6211\u4EEC\u5C55\u5F00\u7C7B\u578B\u3002\u4EC0\u4E48\u662F \u5C55\u5F00? \u5C55\u5F00\u662F\u4ECE\u53E6\u4E00\u4E2A\u7C7B\u578B\u4E2D\u63D0\u53D6\u5185\u90E8\u7C7B\u578B\u3002</p><p>\u8BA9\u6211\u7528\u4E00\u4E2A\u4F8B\u5B50\u6765\u8BF4\u660E\u3002\u5982\u679C\u4F60\u6709\u4E00\u4E2A\u7C7B\u578B Promise&lt;string&gt;\uFF0C\u5C55\u5F00 Promise \u7C7B\u578B\u5C06\u5F97\u5230 \u7C7B\u578B string\u3002\u6211\u4EEC\u4ECE\u5916\u90E8\u7C7B\u578B\u5F97\u5230\u5176\u5185\u90E8\u7C7B\u578B\u3002</p><p>\u6CE8\u610F\uFF0C\u4F60\u8FD8\u9700\u8981\u9012\u5F52\u5730\u5C55\u5F00\u7C7B\u578B\u3002\u4F8B\u5982\uFF0C\u5982\u679C\u4F60\u6709\u7C7B\u578B Promise&lt;Promise&lt;string&gt;&gt;\uFF0C\u4F60\u9700 \u8981\u8FD4\u56DE\u7C7B\u578B string\u3002</p><p>\u73B0\u5728\uFF0C\u8A00\u5F52\u6B63\u4F20\u3002\u6211\u5C06\u4ECE\u6700\u7B80\u5355\u7684\u4F8B\u5B50\u5F00\u59CB\u3002\u5982\u679C\u6211\u4EEC\u7684 Awaited \u7C7B\u578B\u5F97 \u5230 Promise&lt;string&gt;\uFF0C\u6211\u4EEC\u9700\u8981\u8FD4\u56DE string\uFF0C\u5426\u5219\u6211\u4EEC\u8FD4\u56DE T \u672C\u8EAB\uFF0C\u56E0\u4E3A\u5B83\u4E0D\u662F\u4E00\u4E2A Promise:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Awaited<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span></span> <span class="token operator">?</span> <span class="token builtin">string</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4F46\u662F\u6709\u4E00\u4E2A\u95EE\u9898\u3002\u8FD9\u6837\uFF0C\u6211\u4EEC\u53EA\u80FD\u5904\u7406 string \u7C7B\u578B\u5728 Promise \u4E2D\u7684\u60C5\u51B5\uFF0C\u800C\u6211\u4EEC\u9700\u8981\u7684 \u662F\u53EF\u4EE5\u5904\u7406\u4EFB\u4F55\u60C5\u51B5\u3002\u600E\u4E48\u505A\u5462? \u5728\u6211\u4EEC\u4E0D\u77E5\u9053\u7C7B\u578B\u7684\u60C5\u51B5\u4E0B\uFF0C\u5982\u4F55\u4ECE Promise \u83B7\u53D6\u7C7B\u578B?</p><p>\u51FA\u4E8E\u8FD9\u4E9B\u76EE\u7684\uFF0CTypeScript \u5728\u6761\u4EF6\u7C7B\u578B\u4E2D\u6709\u7C7B\u578B\u63A8\u65AD\u529F\u80FD! \u4F60\u53EF\u4EE5\u5BF9\u7F16\u8BD1\u5668\u8BF4\u201D\u563F\uFF0C\u4E00\u65E6\u4F60 \u77E5\u9053\u4E86\u7C7B\u578B\u662F\u4EC0\u4E48\uFF0C\u8BF7\u628A\u5B83\u8D4B\u7ED9\u6211\u7684\u7C7B\u578B\u53C2\u6570\u201D\u3002\u4F60\u53EF\u4EE5\u5728\u8FD9\u91CC\u9605\u8BFB\u66F4\u591A\u5173 \u4E8E\u6761\u4EF6\u7C7B\u578B\u4E2D\u7684\u7C7B\u578B\u63A8\u65AD\u3002</p><p>\u4E86\u89E3\u4E86\u7C7B\u578B\u63A8\u65AD\u4E4B\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u66F4\u65B0\u6211\u4EEC\u7684\u89E3\u7B54\u3002\u6211\u4EEC\u6CA1\u6709\u5728\u6761\u4EF6\u7C7B\u578B\u4E2D\u68C0 \u67E5 Promise&lt;string&gt; \uFF0C\u800C\u662F\u5C06 string \u66FF\u6362\u4E3A infer R\uFF0C\u56E0\u4E3A\u6211\u4EEC\u4E0D\u77E5\u9053\u90A3\u91CC\u5FC5\u987B\u6709\u4EC0\u4E48 \u3002\u6211\u4EEC\u53EA\u77E5\u9053\u5B83\u662F Promise&lt;T&gt; \uFF0C\u5176\u5185\u90E8\u5305\u542B\u67D0\u79CD\u7C7B\u578B\u3002</p><p>\u4E00\u65E6 TypeScript \u786E\u5B9A\u4E86 Promise \u4E2D\u7684\u7C7B\u578B\uFF0C\u5B83\u5C31\u4F1A\u628A\u5B83\u8D4B\u7ED9\u6211\u4EEC\u7684\u7C7B\u578B\u53C2\u6570 R\uFF0C\u5E76\u5728 \u201Ctrue\u201D\u5206\u652F\u4E2D\u53EF\u7528\u3002\u6211\u4EEC\u6B63\u662F\u4ECE\u8FD9\u91CC\u8FD4\u56DE\u5B83\u7684\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Awaited<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">infer</span> <span class="token constant">R</span><span class="token operator">&gt;</span></span> <span class="token operator">?</span> <span class="token constant">R</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6211\u4EEC\u51E0\u4E4E\u5B8C\u6210\u4E86\uFF0C\u4F46\u4ECE\u7C7B\u578B Promise&lt;Promise&lt;string&gt;&gt;\u6211\u4EEC\u5F97\u5230\u7C7B \u578B Promise&lt;string&gt;\u3002\u56E0\u6B64\uFF0C\u6211\u4EEC\u9700\u8981\u9012\u5F52\u5730\u91CD\u590D\u76F8\u540C\u7684\u8FC7\u7A0B\uFF0C\u8FD9\u662F\u901A\u8FC7\u8C03\u7528 Awaited \u672C \u8EAB\u6765\u5B9E\u73B0\u7684:</p><details class="custom-container details"><summary>\u7B54\u6848</summary><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Awaited<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">infer</span> <span class="token constant">R</span><span class="token operator">&gt;</span></span> <span class="token operator">?</span> Awaited<span class="token operator">&lt;</span><span class="token constant">R</span><span class="token operator">&gt;</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6211\u4EEC\u8BF4\u201C\u4ECE K \u4E2D\u83B7\u53D6\u6240\u6709\u5185\u5BB9\uFF0C\u547D\u540D\u4E3A P \u5E76\u5C06\u5176\u4F5C\u4E3A\u6211\u4EEC\u65B0\u5BF9\u8C61\u7684\u4E00\u4E2A\u65B0\u952E\uFF0C\u5176\u503C\u7C7B\u578B\u53D6 \u81EA\u8F93\u5165\u7C7B\u578B\u201D\u3002\u4E00\u5F00\u59CB\u7406\u89E3\u5F88\u96BE\uFF0C\u6240\u4EE5\u4F60\u4E00\u65E6\u4E0D\u7406\u89E3\u4EC0\u4E48\uFF0C\u5C31\u5C1D\u8BD5\u91CD\u8BFB\u4E00\u904D\uFF0C\u518D\u4E00\u6B65\u6B65\u7684\u5728 \u8111\u6D77\u91CC\u601D\u8003\u3002</p></details><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>`,15),h={href:"https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types",target:"_blank",rel:"noopener noreferrer"};function v(y,w){const r=t("CodeBox"),e=t("ExternalLinkIcon");return l(),c("div",null,[k,n(r,{surl:"https://stackblitz.com/edit/typescript-wgcecz?embed=1&file=1.3.Awaited.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=editor"}),o("info-footer-start"),u,a(),m,o("info-footer-end"),g,s("ul",null,[s("li",null,[s("a",h,[a("Conditional Types"),n(e)])]),s("li",null,[s("a",b,[a("Type Inference in Conditional Types"),n(e)])])])])}const f=i(d,[["render",v],["__file","1.3.Awaited.html.vue"]]);export{f as default};