<template><div><h2 id="_2-utility-types" tabindex="-1"><a class="header-anchor" href="#_2-utility-types" aria-hidden="true">#</a> 2.Utility Types</h2>
<p>TypeScript 提供了几种实用程序类型来促进常见的类型转换。这些实用程序在全球范围内可用。</p>
<p><img src="@source/assets/utility.jpeg" alt="4"></p>
<h3 id="_2-1-partial-type" tabindex="-1"><a class="header-anchor" href="#_2-1-partial-type" aria-hidden="true">#</a> 2.1 Partial &lt;Type&gt;</h3>
<ul>
<li>作用
构造一个类型，让所有的类型设置为可选</li>
</ul>
<p><img src="@source/assets/utility-1.jpeg" alt="4"></p>
<ul>
<li>用法</li>
</ul>
<p><img src="@source/assets/utility-2.gif" alt="4"></p>
<p><img src="@source/assets/Mapped-3.jpeg" alt="4"></p>
<ul>
<li>源码实现</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Make all properties in T optional.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Partial<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-required-type" tabindex="-1"><a class="header-anchor" href="#_2-2-required-type" aria-hidden="true">#</a> 2.2 Required&lt;Type&gt;</h3>
<ul>
<li>作用
构造一个类，将所有属性设为必需，与 paritial 相反</li>
</ul>
<p><img src="@source/assets/utility-4.jpeg" alt="4"></p>
<ul>
<li>用法</li>
</ul>
<p><img src="@source/assets/utility-5.gif" alt="4"></p>
<p><img src="@source/assets/utility-6.jpeg" alt="4"></p>
<ul>
<li>源码</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Make all properties in T required.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Required<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-readonly-type" tabindex="-1"><a class="header-anchor" href="#_2-3-readonly-type" aria-hidden="true">#</a> 2.3 Readonly&lt;Type&gt;</h3>
<ul>
<li>作用
构造一个类型，将属性设置为可读，这就意味着构造类型的属性不能重新分配。</li>
</ul>
<p><img src="@source/assets/utility-7.jpeg" alt="4"></p>
<ul>
<li>
<p>用法</p>
<p><img src="@source/assets/utility-8.gif" alt="4"></p>
<p><img src="@source/assets/utility-9.jpeg" alt="4"></p>
</li>
<li>
<p>源码</p>
</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Make all properties in T readonly.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Readonly<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">readonly</span> <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-record-type" tabindex="-1"><a class="header-anchor" href="#_2-4-record-type" aria-hidden="true">#</a> 2.4 Record&lt;Type&gt;</h3>
<ul>
<li>
<p>作用
构造一个对象类型，其属性键为 Keys，其属性值为 Type。此实用程序可用于将一种类型的属性映射到另一种类型。</p>
<p><img src="@source/assets/utility-0.png" alt="4"></p>
</li>
<li>
<p>源码</p>
</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Construct a type with a set of properties K of type T.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Record<span class="token operator">&lt;</span><span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token constant">K</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-exclude-uniontype-excludedmembers" tabindex="-1"><a class="header-anchor" href="#_2-5-exclude-uniontype-excludedmembers" aria-hidden="true">#</a> 2.5 Exclude&lt;UnionType, ExcludedMembers&gt;</h3>
<ul>
<li>
<p>作用
通过从 UnionType 中排除可分配给 ExcludedMembers 的所有联合成员来构造类型。</p>
<p><img src="@source/assets/utility-10.jpeg" alt="4"></p>
</li>
<li>
<p>用法</p>
<p><img src="@source/assets/utility-11.gif" alt="4"></p>
<p><img src="@source/assets/utility-12.jpeg" alt="4"></p>
</li>
<li>
<p>源码</p>
</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Exclude from T those types that are assignable to U.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Exclude<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">U</span></span> <span class="token operator">?</span> <span class="token builtin">never</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-extrac-type-union" tabindex="-1"><a class="header-anchor" href="#_2-6-extrac-type-union" aria-hidden="true">#</a> 2.6 Extrac&lt;Type,Union&gt;</h3>
<ul>
<li>
<p>作用
通过从 Type 中提取所有可分配给 Union 的联合成员来构造一个类型。与 exclude 相反。取交集</p>
<p><img src="@source/assets/utility-13.jpeg" alt="4"></p>
</li>
<li>
<p>用法</p>
<p><img src="@source/assets/utility-14.gif" alt="4"></p>
<p><img src="@source/assets/utility-15.jpeg" alt="4"></p>
</li>
<li>
<p>源码</p>
</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Extract from T those types that are assignable to U.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Extract<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">U</span></span> <span class="token operator">?</span> <span class="token constant">T</span> <span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-7-pick-type-keys" tabindex="-1"><a class="header-anchor" href="#_2-7-pick-type-keys" aria-hidden="true">#</a> 2.7 Pick&lt;Type,Keys&gt;</h3>
<ul>
<li>
<p>作用
通过从 Type 中选择一组属性 Keys（字符串文字或字符串文字的联合）来构造一个类型。</p>
<p><img src="@source/assets/utility-18.jpeg" alt="4"></p>
</li>
<li>
<p>用法</p>
<p><img src="@source/assets/utility-19.gif" alt="4"></p>
<p><img src="@source/assets/utility-20.jpeg" alt="4"></p>
</li>
<li>
<p>源码</p>
</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * From T, pick a set of properties whose keys are in the union K.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Pick<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token constant">K</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-8-omit-type-keys" tabindex="-1"><a class="header-anchor" href="#_2-8-omit-type-keys" aria-hidden="true">#</a> 2.8 Omit&lt;Type,Keys&gt;</h3>
<ul>
<li>
<p>作用
通过从 Type 中选择所有属性然后删除 Keys（字符串文字或字符串文字的联合）来构造一个类型。与 Pick 相反</p>
<p><img src="@source/assets/utility-21.jpeg" alt="4"></p>
</li>
<li>
<p>用法
<img src="@source/assets/utility-22.gif" alt="4"></p>
<p><img src="@source/assets/utility-23.jpeg" alt="4"></p>
</li>
<li>
<p>源码</p>
</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Construct a type with the properties of T except for those
 * in type K.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Omit<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token builtin">any</span><span class="token operator">></span></span> <span class="token operator">=</span> Pick<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> Exclude<span class="token operator">&lt;</span><span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span><span class="token operator">>></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-9-nonnullable-type" tabindex="-1"><a class="header-anchor" href="#_2-9-nonnullable-type" aria-hidden="true">#</a> 2.9 NonNullable&lt;Type&gt;</h3>
<ul>
<li>
<p>作用
通过从 Type 中排除 null 和 undefined 来构造一个类型。</p>
<p><img src="@source/assets/utility-24.jpeg" alt="4"></p>
</li>
<li>
<p>源码</p>
</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Exclude null and undefined from T.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">NonNullable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token keyword">null</span></span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token builtin">never</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-10-parameters-type" tabindex="-1"><a class="header-anchor" href="#_2-10-parameters-type" aria-hidden="true">#</a> 2.10 Parameters&lt;Type&gt;</h3>
<ul>
<li>
<p>作用
从函数类型的参数中使用的类型构造元组类型</p>
<p><img src="@source/assets/utility-25.jpeg" alt="4"></p>
</li>
<li>
<p>源码</p>
</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Obtain the parameters of a function type in a tuple.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Parameters<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span></span> <span class="token builtin">any</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span>
  <span class="token operator">...</span>args<span class="token operator">:</span> <span class="token keyword">infer</span> <span class="token constant">P</span>
<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">any</span>
  <span class="token operator">?</span> <span class="token constant">P</span>
  <span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-11-returntype-type" tabindex="-1"><a class="header-anchor" href="#_2-11-returntype-type" aria-hidden="true">#</a> 2.11 ReturnType&lt;Type&gt;</h3>
<ul>
<li>
<p>作用
构造一个由函数 Type 的返回类型组成的类型。</p>
<p><img src="@source/assets/utility-26.jpeg" alt="4"></p>
</li>
<li>
<p>源码</p>
</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Obtain the return type of a function type.
 * typescript/lib/lib.es5.d.ts
 */</span>
<span class="token keyword">type</span> <span class="token class-name">ReturnType<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span></span> <span class="token builtin">any</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span>
  <span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span>
<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">infer</span> <span class="token constant">R</span>
  <span class="token operator">?</span> <span class="token constant">R</span>
  <span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-12-uppercase-stringtype" tabindex="-1"><a class="header-anchor" href="#_2-12-uppercase-stringtype" aria-hidden="true">#</a> 2.12 Uppercase&lt;StringType&gt;</h3>
<ul>
<li>
<p>作用
将字符串文字类型转换为大写</p>
<p><img src="@source/assets/u-1.jpeg" alt="4"></p>
</li>
</ul>
<h3 id="_2-13-lowercase-stringtype" tabindex="-1"><a class="header-anchor" href="#_2-13-lowercase-stringtype" aria-hidden="true">#</a> 2.13 Lowercase&lt;StringType&gt;</h3>
<ul>
<li>
<p>作用
将字符串文字类型转换为小写。</p>
<p><img src="@source/assets/u-2.jpeg" alt="4"></p>
</li>
</ul>
<h3 id="_2-14-capitalize-stringtype" tabindex="-1"><a class="header-anchor" href="#_2-14-capitalize-stringtype" aria-hidden="true">#</a> 2.14 Capitalize&lt;StringType&gt;</h3>
<ul>
<li>
<p>作用
将字符串文字类型的第一个字符转换为大写。</p>
<p><img src="@source/assets/u-3.jpeg" alt="4"></p>
</li>
</ul>
<h3 id="_2-15-uncapitalize-stringtype" tabindex="-1"><a class="header-anchor" href="#_2-15-uncapitalize-stringtype" aria-hidden="true">#</a> 2.15 Uncapitalize&lt;StringType&gt;</h3>
<ul>
<li>
<p>作用
将字符串文字类型的第一个字符转换为小写</p>
<p><img src="@source/assets/u-4.jpeg" alt="4"></p>
</li>
</ul>
<h3 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h3>
<ul>
<li>
<p><a href="https://javascript.plainenglish.io/15-utility-types-that-every-typescript-developer-should-know-6cf121d4047c" target="_blank" rel="noopener noreferrer"> TypeScript Visualized: 15 Most Used Utility Types<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://www.typescriptlang.org/docs/handbook/utility-types.html" target="_blank" rel="noopener noreferrer"> https://www.typescriptlang.org/docs/handbook/utility-types.html<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


