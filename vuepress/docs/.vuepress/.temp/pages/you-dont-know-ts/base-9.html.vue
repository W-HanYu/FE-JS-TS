<template><div><h2 id="九、typescript-对象" tabindex="-1"><a class="header-anchor" href="#九、typescript-对象" aria-hidden="true">#</a> 九、typescript 对象</h2>
<h3 id="_9-1-对象解构" tabindex="-1"><a class="header-anchor" href="#_9-1-对象解构" aria-hidden="true">#</a> 9.1 对象解构</h3>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"Semlinker"</span><span class="token punctuation">,</span>
  gender<span class="token operator">:</span> <span class="token string">"Male"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token punctuation">{</span> name<span class="token punctuation">,</span> gender <span class="token punctuation">}</span> <span class="token operator">=</span> person<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-2-对象展开运算符" tabindex="-1"><a class="header-anchor" href="#_9-2-对象展开运算符" aria-hidden="true">#</a> 9.2 对象展开运算符</h3>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"Semlinker"</span><span class="token punctuation">,</span>
  gender<span class="token operator">:</span> <span class="token string">"Male"</span><span class="token punctuation">,</span>
  address<span class="token operator">:</span> <span class="token string">"Xiamen"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 组装对象</span>
<span class="token keyword">let</span> personWithAge <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span>person<span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">33</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 获取除了某些项外的其它项</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span> name<span class="token punctuation">,</span> <span class="token operator">...</span>rest <span class="token punctuation">}</span> <span class="token operator">=</span> person<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


