import{_ as t}from"./Mapped-3.ee325329.js";import{_ as p,r as l,o as i,c as o,e as s,d as a,a as e,f as c}from"./app.d6a6c857.js";const r="/assets/utility.0a79005d.jpeg",d="/assets/utility-1.124eb757.jpeg",u="/assets/utility-2.db4ff135.gif",k="/assets/utility-4.180fbd0a.jpeg",m="/assets/utility-5.e43858a7.gif",y="/assets/utility-6.67d32582.jpeg",v="/assets/utility-7.92e012f5.jpeg",b="/assets/utility-8.62910657.gif",g="/assets/utility-9.120b3d2c.jpeg",h="/assets/utility-0.848341a0.png",_="/assets/utility-10.9d8da795.jpeg",f="/assets/utility-11.3f0f37fa.gif",T="/assets/utility-12.bc24c1d6.jpeg",x="/assets/utility-13.0b859629.jpeg",w="/assets/utility-14.c0f87e86.gif",j="/assets/utility-15.11863c55.jpeg",P="/assets/utility-18.cb3a297e.jpeg",U="/assets/utility-19.d6277a9c.gif",K="/assets/utility-20.1ba8c718.jpeg",E="/assets/utility-21.a825a7be.jpeg",R="/assets/utility-22.bb06dde8.gif",N="/assets/utility-23.dabc97c3.jpeg",z="/assets/utility-24.f8783055.jpeg",S="/assets/utility-25.88ea1e91.jpeg",M="/assets/utility-26.f6604995.jpeg",q="/assets/u-1.a727715b.jpeg",V="/assets/u-2.f3b8668f.jpeg",C="/assets/u-3.31c0f2b0.jpeg",O="/assets/u-4.7964b9c5.jpeg",B={},L=c('<h2 id="_2-utility-types" tabindex="-1"><a class="header-anchor" href="#_2-utility-types" aria-hidden="true">#</a> 2.Utility Types</h2><p>TypeScript \u63D0\u4F9B\u4E86\u51E0\u79CD\u5B9E\u7528\u7A0B\u5E8F\u7C7B\u578B\u6765\u4FC3\u8FDB\u5E38\u89C1\u7684\u7C7B\u578B\u8F6C\u6362\u3002\u8FD9\u4E9B\u5B9E\u7528\u7A0B\u5E8F\u5728\u5168\u7403\u8303\u56F4\u5185\u53EF\u7528\u3002</p><p><img src="'+r+'" alt="4"></p><h3 id="_2-1-partial-type" tabindex="-1"><a class="header-anchor" href="#_2-1-partial-type" aria-hidden="true">#</a> 2.1 Partial &lt;Type&gt;</h3><ul><li>\u4F5C\u7528 \u6784\u9020\u4E00\u4E2A\u7C7B\u578B\uFF0C\u8BA9\u6240\u6709\u7684\u7C7B\u578B\u8BBE\u7F6E\u4E3A\u53EF\u9009</li></ul><p><img src="'+d+'" alt="4"></p><ul><li>\u7528\u6CD5</li></ul><p><img src="'+u+'" alt="4"></p><p><img src="'+t+`" alt="4"></p><ul><li>\u6E90\u7801\u5B9E\u73B0</li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Make all properties in T optional.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Partial<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-required-type" tabindex="-1"><a class="header-anchor" href="#_2-2-required-type" aria-hidden="true">#</a> 2.2 Required&lt;Type&gt;</h3><ul><li>\u4F5C\u7528 \u6784\u9020\u4E00\u4E2A\u7C7B\uFF0C\u5C06\u6240\u6709\u5C5E\u6027\u8BBE\u4E3A\u5FC5\u9700\uFF0C\u4E0E paritial \u76F8\u53CD</li></ul><p><img src="`+k+'" alt="4"></p><ul><li>\u7528\u6CD5</li></ul><p><img src="'+m+'" alt="4"></p><p><img src="'+y+`" alt="4"></p><ul><li>\u6E90\u7801</li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Make all properties in T required.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Required<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-readonly-type" tabindex="-1"><a class="header-anchor" href="#_2-3-readonly-type" aria-hidden="true">#</a> 2.3 Readonly&lt;Type&gt;</h3><ul><li>\u4F5C\u7528 \u6784\u9020\u4E00\u4E2A\u7C7B\u578B\uFF0C\u5C06\u5C5E\u6027\u8BBE\u7F6E\u4E3A\u53EF\u8BFB\uFF0C\u8FD9\u5C31\u610F\u5473\u7740\u6784\u9020\u7C7B\u578B\u7684\u5C5E\u6027\u4E0D\u80FD\u91CD\u65B0\u5206\u914D\u3002</li></ul><p><img src="`+v+'" alt="4"></p><ul><li><p>\u7528\u6CD5</p><p><img src="'+b+'" alt="4"></p><p><img src="'+g+`" alt="4"></p></li><li><p>\u6E90\u7801</p></li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Make all properties in T readonly.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Readonly<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">readonly</span> <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-record-type" tabindex="-1"><a class="header-anchor" href="#_2-4-record-type" aria-hidden="true">#</a> 2.4 Record&lt;Type&gt;</h3><ul><li><p>\u4F5C\u7528 \u6784\u9020\u4E00\u4E2A\u5BF9\u8C61\u7C7B\u578B\uFF0C\u5176\u5C5E\u6027\u952E\u4E3A Keys\uFF0C\u5176\u5C5E\u6027\u503C\u4E3A Type\u3002\u6B64\u5B9E\u7528\u7A0B\u5E8F\u53EF\u7528\u4E8E\u5C06\u4E00\u79CD\u7C7B\u578B\u7684\u5C5E\u6027\u6620\u5C04\u5230\u53E6\u4E00\u79CD\u7C7B\u578B\u3002</p><p><img src="`+h+`" alt="4"></p></li><li><p>\u6E90\u7801</p></li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Construct a type with a set of properties K of type T.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Record<span class="token operator">&lt;</span><span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token constant">K</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-exclude-uniontype-excludedmembers" tabindex="-1"><a class="header-anchor" href="#_2-5-exclude-uniontype-excludedmembers" aria-hidden="true">#</a> 2.5 Exclude&lt;UnionType, ExcludedMembers&gt;</h3><ul><li><p>\u4F5C\u7528 \u901A\u8FC7\u4ECE UnionType \u4E2D\u6392\u9664\u53EF\u5206\u914D\u7ED9 ExcludedMembers \u7684\u6240\u6709\u8054\u5408\u6210\u5458\u6765\u6784\u9020\u7C7B\u578B\u3002</p><p><img src="`+_+'" alt="4"></p></li><li><p>\u7528\u6CD5</p><p><img src="'+f+'" alt="4"></p><p><img src="'+T+`" alt="4"></p></li><li><p>\u6E90\u7801</p></li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Exclude from T those types that are assignable to U.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Exclude<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">U</span></span> <span class="token operator">?</span> <span class="token builtin">never</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-extrac-type-union" tabindex="-1"><a class="header-anchor" href="#_2-6-extrac-type-union" aria-hidden="true">#</a> 2.6 Extrac&lt;Type,Union&gt;</h3><ul><li><p>\u4F5C\u7528 \u901A\u8FC7\u4ECE Type \u4E2D\u63D0\u53D6\u6240\u6709\u53EF\u5206\u914D\u7ED9 Union \u7684\u8054\u5408\u6210\u5458\u6765\u6784\u9020\u4E00\u4E2A\u7C7B\u578B\u3002\u4E0E exclude \u76F8\u53CD\u3002\u53D6\u4EA4\u96C6</p><p><img src="`+x+'" alt="4"></p></li><li><p>\u7528\u6CD5</p><p><img src="'+w+'" alt="4"></p><p><img src="'+j+`" alt="4"></p></li><li><p>\u6E90\u7801</p></li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Extract from T those types that are assignable to U.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Extract<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">U</span></span> <span class="token operator">?</span> <span class="token constant">T</span> <span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-7-pick-type-keys" tabindex="-1"><a class="header-anchor" href="#_2-7-pick-type-keys" aria-hidden="true">#</a> 2.7 Pick&lt;Type,Keys&gt;</h3><ul><li><p>\u4F5C\u7528 \u901A\u8FC7\u4ECE Type \u4E2D\u9009\u62E9\u4E00\u7EC4\u5C5E\u6027 Keys\uFF08\u5B57\u7B26\u4E32\u6587\u5B57\u6216\u5B57\u7B26\u4E32\u6587\u5B57\u7684\u8054\u5408\uFF09\u6765\u6784\u9020\u4E00\u4E2A\u7C7B\u578B\u3002</p><p><img src="`+P+'" alt="4"></p></li><li><p>\u7528\u6CD5</p><p><img src="'+U+'" alt="4"></p><p><img src="'+K+`" alt="4"></p></li><li><p>\u6E90\u7801</p></li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * From T, pick a set of properties whose keys are in the union K.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Pick<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token constant">K</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-8-omit-type-keys" tabindex="-1"><a class="header-anchor" href="#_2-8-omit-type-keys" aria-hidden="true">#</a> 2.8 Omit&lt;Type,Keys&gt;</h3><ul><li><p>\u4F5C\u7528 \u901A\u8FC7\u4ECE Type \u4E2D\u9009\u62E9\u6240\u6709\u5C5E\u6027\u7136\u540E\u5220\u9664 Keys\uFF08\u5B57\u7B26\u4E32\u6587\u5B57\u6216\u5B57\u7B26\u4E32\u6587\u5B57\u7684\u8054\u5408\uFF09\u6765\u6784\u9020\u4E00\u4E2A\u7C7B\u578B\u3002\u4E0E Pick \u76F8\u53CD</p><p><img src="`+E+'" alt="4"></p></li><li><p>\u7528\u6CD5 <img src="'+R+'" alt="4"></p><p><img src="'+N+`" alt="4"></p></li><li><p>\u6E90\u7801</p></li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Construct a type with the properties of T except for those
 * in type K.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Omit<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token builtin">any</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> Pick<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> Exclude<span class="token operator">&lt;</span><span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-9-nonnullable-type" tabindex="-1"><a class="header-anchor" href="#_2-9-nonnullable-type" aria-hidden="true">#</a> 2.9 NonNullable&lt;Type&gt;</h3><ul><li><p>\u4F5C\u7528 \u901A\u8FC7\u4ECE Type \u4E2D\u6392\u9664 null \u548C undefined \u6765\u6784\u9020\u4E00\u4E2A\u7C7B\u578B\u3002</p><p><img src="`+z+`" alt="4"></p></li><li><p>\u6E90\u7801</p></li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Exclude null and undefined from T.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">NonNullable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token keyword">null</span></span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token builtin">never</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-10-parameters-type" tabindex="-1"><a class="header-anchor" href="#_2-10-parameters-type" aria-hidden="true">#</a> 2.10 Parameters&lt;Type&gt;</h3><ul><li><p>\u4F5C\u7528 \u4ECE\u51FD\u6570\u7C7B\u578B\u7684\u53C2\u6570\u4E2D\u4F7F\u7528\u7684\u7C7B\u578B\u6784\u9020\u5143\u7EC4\u7C7B\u578B</p><p><img src="`+S+`" alt="4"></p></li><li><p>\u6E90\u7801</p></li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Obtain the parameters of a function type in a tuple.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Parameters<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span></span> <span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span>
  <span class="token operator">...</span>args<span class="token operator">:</span> <span class="token keyword">infer</span> <span class="token constant">P</span>
<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span>
  <span class="token operator">?</span> <span class="token constant">P</span>
  <span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-11-returntype-type" tabindex="-1"><a class="header-anchor" href="#_2-11-returntype-type" aria-hidden="true">#</a> 2.11 ReturnType&lt;Type&gt;</h3><ul><li><p>\u4F5C\u7528 \u6784\u9020\u4E00\u4E2A\u7531\u51FD\u6570 Type \u7684\u8FD4\u56DE\u7C7B\u578B\u7EC4\u6210\u7684\u7C7B\u578B\u3002</p><p><img src="`+M+`" alt="4"></p></li><li><p>\u6E90\u7801</p></li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Obtain the return type of a function type.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">ReturnType<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span></span> <span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span>
  <span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span>
<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">infer</span> <span class="token constant">R</span>
  <span class="token operator">?</span> <span class="token constant">R</span>
  <span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-12-uppercase-stringtype" tabindex="-1"><a class="header-anchor" href="#_2-12-uppercase-stringtype" aria-hidden="true">#</a> 2.12 Uppercase&lt;StringType&gt;</h3><ul><li><p>\u4F5C\u7528 \u5C06\u5B57\u7B26\u4E32\u6587\u5B57\u7C7B\u578B\u8F6C\u6362\u4E3A\u5927\u5199</p><p><img src="`+q+'" alt="4"></p></li></ul><h3 id="_2-13-lowercase-stringtype" tabindex="-1"><a class="header-anchor" href="#_2-13-lowercase-stringtype" aria-hidden="true">#</a> 2.13 Lowercase&lt;StringType&gt;</h3><ul><li><p>\u4F5C\u7528 \u5C06\u5B57\u7B26\u4E32\u6587\u5B57\u7C7B\u578B\u8F6C\u6362\u4E3A\u5C0F\u5199\u3002</p><p><img src="'+V+'" alt="4"></p></li></ul><h3 id="_2-14-capitalize-stringtype" tabindex="-1"><a class="header-anchor" href="#_2-14-capitalize-stringtype" aria-hidden="true">#</a> 2.14 Capitalize&lt;StringType&gt;</h3><ul><li><p>\u4F5C\u7528 \u5C06\u5B57\u7B26\u4E32\u6587\u5B57\u7C7B\u578B\u7684\u7B2C\u4E00\u4E2A\u5B57\u7B26\u8F6C\u6362\u4E3A\u5927\u5199\u3002</p><p><img src="'+C+'" alt="4"></p></li></ul><h3 id="_2-15-uncapitalize-stringtype" tabindex="-1"><a class="header-anchor" href="#_2-15-uncapitalize-stringtype" aria-hidden="true">#</a> 2.15 Uncapitalize&lt;StringType&gt;</h3><ul><li><p>\u4F5C\u7528 \u5C06\u5B57\u7B26\u4E32\u6587\u5B57\u7C7B\u578B\u7684\u7B2C\u4E00\u4E2A\u5B57\u7B26\u8F6C\u6362\u4E3A\u5C0F\u5199</p><p><img src="'+O+'" alt="4"></p></li></ul><h3 id="\u53C2\u8003\u6587\u732E" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u732E" aria-hidden="true">#</a> \u53C2\u8003\u6587\u732E</h3>',57),A={href:"https://javascript.plainenglish.io/15-utility-types-that-every-typescript-developer-should-know-6cf121d4047c",target:"_blank",rel:"noopener noreferrer"},I={href:"https://www.typescriptlang.org/docs/handbook/utility-types.html",target:"_blank",rel:"noopener noreferrer"};function F(D,G){const n=l("ExternalLinkIcon");return i(),o("div",null,[L,s("ul",null,[s("li",null,[s("p",null,[s("a",A,[a(" TypeScript Visualized: 15 Most Used Utility Types"),e(n)])])]),s("li",null,[s("p",null,[s("a",I,[a(" https://www.typescriptlang.org/docs/handbook/utility-types.html"),e(n)])])])])])}const Q=p(B,[["render",F],["__file","Advanced-2.html.vue"]]);export{Q as default};
