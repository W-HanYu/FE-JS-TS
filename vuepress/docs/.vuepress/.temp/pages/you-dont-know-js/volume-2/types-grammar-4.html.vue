<template><div><h1 id="第4章-强制类型转换" tabindex="-1"><a class="header-anchor" href="#第4章-强制类型转换" aria-hidden="true">#</a> 第4章：强制类型转换</h1>
<p>现在我们更全面地了解了 JavaScript 的类型和值，我们将注意力转向一个极具争议的话题：强制转换。</p>
<p>正如我们在第一章中提到的，关于强制转换到底是一个有用的特性，还是一个语言设计上的缺陷（或介于两者之间！），早就开始就争论不休了。如果你读过关于 JS 的其他书籍，你就会知道流行在世面上那种淹没一切的 <em>声音</em>：强制转换是魔法，是邪恶的，令人困惑的，而且就是彻头彻尾的坏主意。</p>
<p>本着这个系列丛书的总体精神，我认为你应当直面你不理解的东西并设法更全面地 <em>搞懂它</em>。而不是因为大家都这样做，或是你曾经被一些怪东西咬到就逃避强制转换。</p>
<p>我们的目标是全面地探索强制转换的优点和缺点（是的，它们 <em>有</em> 优点！），这样你就能在程序中对它是否合适做出明智的决定。</p>
<h2 id="转换值" tabindex="-1"><a class="header-anchor" href="#转换值" aria-hidden="true">#</a> 转换值</h2>
<p>将一个值从一个类型明确地转换到另一个类型通常称为“类型转换（type casting）”，当这个操作隐含地完成时称为“强制转换（coercion）”（根据一个值如何被使用的规则来强制它变换类型）。</p>
<p><strong>注意：</strong> 这可能不明显，但是 JavaScript 强制转换总是得到基本标量值的一种，比如 <code v-pre>string</code>、<code v-pre>number</code>、或 <code v-pre>boolean</code>。没有强制转换可以得到像 <code v-pre>object</code> 和 <code v-pre>function</code> 这样的复杂值。第三章讲解了“封箱”，它将一个基本类型标量值包装在它们相应的 <code v-pre>object</code> 中，但在准确的意义上这不是真正的强制转换。</p>
<p>另一种区别这些术语的常见方法是：“类型转换（type casting/conversion）”发生在静态类型语言的编译时，而“类型强制转换（type coercion）”是动态类型语言的运行时转换。</p>
<p>然而，在 JavaScript 中，大多数人将所有这些类型的转换都称为 <em>强制转换（coercion）</em>，所以我偏好的区别方式是使用“隐含强制转换（implicit coercion）”与“明确强制转换（explicit coercion）”。</p>
<p>其中的区别应当是很明显的：在观察代码时如果一个类型转换明显是有意为之的，那么它就是“明确强制转换”，而如果这个类型转换是做为其他操作的不那么明显的副作用发生的，那么它就是“隐含强制转换”。</p>
<p>例如，考虑这两种强制转换的方式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> b <span class="token operator">=</span> a <span class="token operator">+</span> <span class="token string">""</span><span class="token punctuation">;</span> <span class="token comment">// 隐含强制转换</span>

<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 明确强制转换</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 <code v-pre>b</code> 来说，强制转换是隐含地发生的，因为如果与 <code v-pre>+</code> 操作符组合的操作数之一是一个 <code v-pre>string</code> 值（<code v-pre>&quot;&quot;</code>），这将使 <code v-pre>+</code> 操作成为一个 <code v-pre>string</code> 连接（将两个字符串加在一起），而 <code v-pre>string</code> 连接的 <em>一个（隐藏的）副作用</em> 将 <code v-pre>a</code> 中的值 <code v-pre>42</code> 强制转换为它的 <code v-pre>string</code> 等价物：<code v-pre>&quot;42&quot;</code>。</p>
<p>相比之下，<code v-pre>String(..)</code> 函数使一切相当明显，它明确地取得 <code v-pre>a</code> 中的值，并把它强制转换为一个 <code v-pre>string</code> 表现形式。</p>
<p>两种方式都能达到相同的效果：从 <code v-pre>42</code> 变成 <code v-pre>&quot;42&quot;</code>。但它们 <em>如何</em> 达到这种效果，才是关于 JavaScript 强制转换的热烈争论的核心。</p>
<p><strong>注意：</strong> 技术上讲，这里有一些在语法形式区别之上的，行为上的微妙区别。我们将在本章稍后，“隐含：Strings &lt;--&gt; Numbers”一节中仔细讲解。</p>
<p>“明确地”、“隐含地”、或“明显地”和“隐藏的副作用”这些术语，是 <em>相对的</em>。</p>
<p>如果你确切地知道 <code v-pre>a + &quot;&quot;</code> 是在做什么，并且你有意地这么做来强制转换一个 <code v-pre>string</code>，你可能感觉这个操作已经足够“明确”了。相反，如果你从没见过 <code v-pre>String(..)</code> 函数被用于 <code v-pre>string</code> 强制转换，那么对你来说它的行为可能看起来太过隐蔽而让你感到“隐含”。</p>
<p>但我们是基于一个 <em>大众的，充分了解，但不是专家或 JS 规范爱好者的</em> 开发者的观点来讨论“明确”与“隐含”的。无论你的程度如何，或是没有在这个范畴内准确地找到自己，你都需要根据我们在这里的观察方式，相应地调整你的角度。</p>
<p>记住：我们自己写代码而也只有我们自己会读它，通常是很少见的。即便你是一个精通 JS 里里外外的专家，也要考虑一个经验没那么丰富的队友在读你的代码时感受如何。对于他们和对于你来说，“明确”或“隐含”的意义相同吗？</p>
<h2 id="抽象值操作" tabindex="-1"><a class="header-anchor" href="#抽象值操作" aria-hidden="true">#</a> 抽象值操作</h2>
<p>在我们可以探究 <em>明确</em> 与 <em>隐含</em> 强制转换之前，我们需要学习一些基本规则，是它们控制着值如何 <em>变成</em> 一个 <code v-pre>string</code>、<code v-pre>number</code>、或 <code v-pre>boolean</code> 的。ES5 语言规范的第九部分用值的变形规则定义了几种“抽象操作”（“仅供内部使用的操作”的高大上说法）。我们将特别关注于：<code v-pre>ToString</code>、<code v-pre>ToNumber</code>、和 <code v-pre>ToBoolean</code>，并稍稍关注一下 <code v-pre>ToPrimitive</code>。</p>
<h3 id="tostring" tabindex="-1"><a class="header-anchor" href="#tostring" aria-hidden="true">#</a> <code v-pre>ToString</code></h3>
<p>当任何一个非 <code v-pre>string</code> 值被强制转换为一个 <code v-pre>string</code> 表现形式时，这个转换的过程是由语言规范的 9.8 部分的 <code v-pre>ToString</code> 抽象操作处理的。</p>
<p>内建的基本类型值拥有自然的字符串化形式：<code v-pre>null</code> 变为 <code v-pre>&quot;null&quot;</code>，<code v-pre>undefined</code> 变为 <code v-pre>&quot;undefined&quot;</code>，<code v-pre>true</code> 变为 <code v-pre>&quot;true&quot;</code>。<code v-pre>number</code> 一般会以你期望的自然方式表达，但正如我们在第二章中讨论的，非常小或非常大的 <code v-pre>number</code> 将会以指数形式表达：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// `1.07`乘以`1000`，7次</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1.07</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">;</span>

<span class="token comment">// 7次乘以3位 => 21位</span>
a<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "1.07e21"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于普通的对象，除非你指定你自己的，默认的 <code v-pre>toString()</code>（可以在 <code v-pre>Object.prototype.toString()</code> 找到）将返回 <em>内部 <code v-pre>[[Class]]</code></em>（见第三章），例如 <code v-pre>&quot;[object Object]&quot;</code>。</p>
<p>但正如早先所展示的，如果一个对象上拥有它自己的 <code v-pre>toString()</code> 方法，而你又以一种类似 <code v-pre>string</code> 的方式使用这个对象，那么它的 <code v-pre>toString()</code> 将会被自动调用，而且这个调用的 <code v-pre>string</code> 结果将被使用。</p>
<p><strong>注意：</strong> 技术上讲，一个对象被强制转换为一个 <code v-pre>string</code> 要通过 <code v-pre>ToPrimitive</code> 抽象操作（ES5 语言规范，9.1 部分），但是那其中的微妙细节将会在本章稍后的 <code v-pre>ToNumber</code> 部分中讲解，所以我们在这里先跳过它。</p>
<p>数组拥有一个覆盖版本的默认 <code v-pre>toString()</code>，将数组字符串化为它所有的值（每个都字符串化）的（字符串）连接，并用 <code v-pre>&quot;,&quot;</code> 分割每个值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

a<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "1,2,3"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重申一次，<code v-pre>toString()</code> 可以明确地被调用，也可以通过在一个需要 <code v-pre>string</code> 的上下文环境中使用一个非 <code v-pre>string</code> 来自动地被调用。</p>
<h4 id="json-字符串化" tabindex="-1"><a class="header-anchor" href="#json-字符串化" aria-hidden="true">#</a> JSON 字符串化</h4>
<p>另一种看起来与 <code v-pre>ToString</code> 密切相关的操作是，使用 <code v-pre>JSON.stringify(..)</code> 工具将一个值序列化为一个 JSON 兼容的 <code v-pre>string</code> 值。</p>
<p>重要的是要注意，这种字符串化与强制转换并不完全是同一种东西。但是因为它与上面讲的 <code v-pre>ToString</code> 规则有关联，我们将在这里稍微转移一下话题，来讲解 JSON 字符串化行为。</p>
<p>对于最简单的值，JSON 字符串化行为基本上和 <code v-pre>toString()</code> 转换是相同的，除了序列化的结果 <em>总是一个 <code v-pre>string</code></em>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "42"</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token string">"42"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ""42"" （一个包含双引号的字符串）</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "null"</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "true"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>任何 <em>JSON 安全</em> 的值都可以被 <code v-pre>JSON.stringify(..)</code> 字符串化。但是什么是 <em>JSON 安全的</em>？任何可以用 JSON 表现形式合法表达的值。</p>
<p>考虑 JSON <strong>不</strong> 安全的值可能更容易一些。一些例子是：<code v-pre>undefined</code>、<code v-pre>function</code>、（ES6+）<code v-pre>symbol</code>、和带有循环引用的 <code v-pre>object</code>（一个对象结构中的属性互相引用而造成了一个永不终结的循环）。对于标准的 JSON 结构来说这些都是非法的值，主要是因为它们不能移植到消费 JSON 值的其他语言中。</p>
<p><code v-pre>JSON.stringify(..)</code> 工具在遇到 <code v-pre>undefined</code>、<code v-pre>function</code>、和 <code v-pre>symbol</code> 时将会自动地忽略它们。如果在一个 <code v-pre>array</code> 中遇到这样的值，它会被替换为 <code v-pre>null</code>（这样数组的位置信息就不会改变）。如果在一个 <code v-pre>object</code> 的属性中遇到这样的值，这个属性会被简单地剔除掉。</p>
<p>考虑下面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>

<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[1,null,null,4]"</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token function-variable function">b</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "{"a":2}"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但如果你试着 <code v-pre>JSON.stringify(..)</code> 一个带有循环引用的 <code v-pre>object</code>，就会抛出一个错误。</p>
<p>JSON 字符串化有一个特殊行为，如果一个 <code v-pre>object</code> 值定义了一个 <code v-pre>toJSON()</code> 方法，这个方法将会被首先调用，以取得用于序列化的值。</p>
<p>如果你打算 JSON 字符串化一个可能含有非法 JSON 值的对象，或者如果这个对象中正好有不适于序列化的值，那么你就应当为它定义一个 <code v-pre>toJSON()</code> 方法，返回这个 <code v-pre>object</code> 的一个 <em>JSON 安全</em> 版本。</p>
<p>例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> o <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">42</span><span class="token punctuation">,</span>
  <span class="token literal-property property">c</span><span class="token operator">:</span> o<span class="token punctuation">,</span>
  <span class="token function-variable function">d</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 在 `a` 内部制造一个循环引用</span>
o<span class="token punctuation">.</span>e <span class="token operator">=</span> a<span class="token punctuation">;</span>

<span class="token comment">// 这会因循环引用而抛出一个错误</span>
<span class="token comment">// JSON.stringify( a );</span>

<span class="token comment">// 自定义一个 JSON 值序列化</span>
a<span class="token punctuation">.</span><span class="token function-variable function">toJSON</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 序列化仅包含属性 `b`</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>b <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "{"b":42}"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个很常见的误解是，<code v-pre>toJSON()</code> 应当返回一个 JSON 字符串化的表现形式。这可能是不正确的，除非你事实上想要字符串化 <code v-pre>string</code> 本身（通常不会！）。<code v-pre>toJSON()</code> 应当返回合适的实际普通值（无论什么类型），而 <code v-pre>JSON.stringify(..)</code> 自己会处理字符串化。</p>
<p>换句话说，<code v-pre>toJSON()</code> 应当被翻译为：“变为一个适用于字符串化的 JSON 安全的值”，而不是像许多开发者错误认为的那样，“变为一个 JSON 字符串”。</p>
<p>考虑下面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">val</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token comment">// 可能正确！</span>
  <span class="token function-variable function">toJSON</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>val<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">val</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token comment">// 可能不正确！</span>
  <span class="token function-variable function">toJSON</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"["</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>val<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"]"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[2,3]"</span>

<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ""[2,3]""</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在第二个调用中，我们字符串化了返回的 <code v-pre>string</code> 而不是 <code v-pre>array</code> 本身，这可能不是我们想要做的。</p>
<p>既然我们说到了 <code v-pre>JSON.stringify(..)</code>，那么就让我们来讨论一些不那么广为人知，但是仍然很有用的功能吧。</p>
<p><code v-pre>JSON.stringify(..)</code> 的第二个参数值是可选的，它称为 <em>替换器（replacer）</em>。这个参数值既可以是一个 <code v-pre>array</code> 也可以是一个 <code v-pre>function</code>。与 <code v-pre>toJSON()</code> 为序列化准备一个值的方式类似，它提供一种过滤机制，指出一个 <code v-pre>object</code> 的哪一个属性应该或不应该被包含在序列化形式中，来自定义这个 <code v-pre>object</code> 的递归序列化行为。</p>
<p>如果 <em>替换器</em> 是一个 <code v-pre>array</code>，那么它应当是一个 <code v-pre>string</code> 的 <code v-pre>array</code>，它的每一个元素指定了允许被包含在这个 <code v-pre>object</code> 的序列化形式中的属性名称。如果一个属性不存在于这个列表中，那么它就会被跳过。</p>
<p>如果 <em>替换器</em> 是一个 <code v-pre>function</code>，那么它会为 <code v-pre>object</code> 本身而被调用一次，并且为这个 <code v-pre>object</code> 中的每个属性都被调用一次，而且每次都被传入两个参数值，<em>key</em> 和 <em>value</em>。要在序列化中跳过一个 <em>key</em>，可以返回 <code v-pre>undefined</code>。否则，就返回被提供的 <em>value</em>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">42</span><span class="token punctuation">,</span>
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token string">"42"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">d</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"b"</span><span class="token punctuation">,</span> <span class="token string">"c"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "{"b":42,"c":"42"}"</span>

<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">k<span class="token punctuation">,</span> v</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">!==</span> <span class="token string">"c"</span><span class="token punctuation">)</span> <span class="token keyword">return</span> v<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// "{"b":42,"d":[1,2,3]}"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 在 <code v-pre>function</code> <em>替换器</em> 的情况下，第一次调用时 key 参数 <code v-pre>k</code> 是 <code v-pre>undefined</code>（而对象 <code v-pre>a</code> 本身会被传入）。<code v-pre>if</code> 语句会 <strong>过滤掉</strong> 名称为 <code v-pre>c</code> 的属性。字符串化是递归的，所以数组 <code v-pre>[1,2,3]</code> 会将它的每一个值（<code v-pre>1</code>、<code v-pre>2</code>、和 <code v-pre>3</code>）都作为 <code v-pre>v</code> 传递给 <em>替换器</em>，并将索引值（<code v-pre>0</code>、<code v-pre>1</code>、和 <code v-pre>2</code>）作为 <code v-pre>k</code>。</p>
<p><code v-pre>JSON.stringify(..)</code> 还可以接收第三个可选参数值，称为 <em>填充符（space）</em>，在对人类友好的输出中它被用做缩进。<em>填充符</em> 可以是一个正整数，用来指示每一级缩进中应当使用多少个空格字符。或者，<em>填充符</em> 可以是一个 <code v-pre>string</code>，这时每一级缩进将会使用它的前十个字符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">42</span><span class="token punctuation">,</span>
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token string">"42"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">d</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// "{</span>
<span class="token comment">//    "b": 42,</span>
<span class="token comment">//    "c": "42",</span>
<span class="token comment">//    "d": [</span>
<span class="token comment">//       1,</span>
<span class="token comment">//       2,</span>
<span class="token comment">//       3</span>
<span class="token comment">//    ]</span>
<span class="token comment">// }"</span>

<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">"-----"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// "{</span>
<span class="token comment">// -----"b": 42,</span>
<span class="token comment">// -----"c": "42",</span>
<span class="token comment">// -----"d": [</span>
<span class="token comment">// ----------1,</span>
<span class="token comment">// ----------2,</span>
<span class="token comment">// ----------3</span>
<span class="token comment">// -----]</span>
<span class="token comment">// }"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>记住，<code v-pre>JSON.stringify(..)</code> 并不直接是一种强制转换的形式。但是，我们在这里讨论它，是由于两个与 <code v-pre>ToString</code> 强制转换有关联的行为：</p>
<ol>
<li><code v-pre>string</code>、<code v-pre>number</code>、<code v-pre>boolean</code>、和 <code v-pre>null</code> 值在 JSON 字符串化时，与它们通过 <code v-pre>ToString</code> 抽象操作的规则强制转换为 <code v-pre>string</code> 值的方式基本上是相同的。</li>
<li>如果传递一个 <code v-pre>object</code> 值给 <code v-pre>JSON.stringify(..)</code>，而这个 <code v-pre>object</code> 上拥有一个 <code v-pre>toJSON()</code> 方法，那么在字符串化之前，<code v-pre>toJSON()</code> 就会被自动调用来将这个值（某种意义上）“强制转换”为 <em>JSON 安全</em> 的。</li>
</ol>
<h3 id="tonumber" tabindex="-1"><a class="header-anchor" href="#tonumber" aria-hidden="true">#</a> <code v-pre>ToNumber</code></h3>
<p>如果任何非 <code v-pre>number</code> 值，以一种要求它是 <code v-pre>number</code> 的方式被使用，比如数学操作，就会发生 ES5 语言规范在 9.3 部分定义的 <code v-pre>ToNumber</code> 抽象操作。</p>
<p>例如，<code v-pre>true</code> 变为 <code v-pre>1</code> 而 <code v-pre>false</code> 变为 <code v-pre>0</code>。<code v-pre>undefined</code> 变为 <code v-pre>NaN</code>，而（奇怪的是）<code v-pre>null</code> 变为 <code v-pre>0</code>。</p>
<p>对于一个 <code v-pre>string</code> 值来说，<code v-pre>ToNumber</code> 工作起来很大程度上与数字字面量的规则/语法很相似（见第三章）。如果它失败了，结果将是 <code v-pre>NaN</code>（而不是 <code v-pre>number</code> 字面量中会出现的语法错误）。一个不同之处的例子是，在这个操作中 <code v-pre>0</code> 前缀的八进制数不会被作为八进制数来处理（而仅作为普通的十进制小数），虽然这样的八进制数作为 <code v-pre>number</code> 字面量是合法的。</p>
<p><strong>注意：</strong> <code v-pre>number</code> 字面量文法与用于 <code v-pre>string</code> 值的 <code v-pre>ToNumber</code> 间的区别极其微妙，在这里就不进一步讲解了。更多的信息可以参考 ES 语言规范的 9.3.1 部分。</p>
<p>对象（以及数组）将会首先被转换为它们的基本类型值的等价物，而后这个结果值（如果它还不是一个 <code v-pre>number</code> 基本类型）会根据刚才提到的 <code v-pre>ToNumber</code> 规则被强制转换为一个 <code v-pre>number</code>。</p>
<p>为了转换为基本类型值的等价物，<code v-pre>ToPrimitive</code> 抽象操作（ES5 语言规范，9.1 部分）将会查询这个值（使用内部的 <code v-pre>DefaultValue</code> 操作 —— ES5 语言规范，8.12.8 部分），看它有没有 <code v-pre>valueOf()</code> 方法。如果 <code v-pre>valueOf()</code> 可用并且它返回一个基本类型值，那么 <em>这个</em> 值就将用于强制转换。如果不是这样，但 <code v-pre>toString()</code> 可用，那么就由它来提供用于强制转换的值。</p>
<p>如果这两种操作都没提供一个基本类型值，就会抛出一个 <code v-pre>TypeError</code>。</p>
<p>在 ES5 中，你可以创建这样一个不可强制转换的对象 —— 没有 <code v-pre>valueOf()</code> 和 <code v-pre>toString()</code> —— 如果它的 <code v-pre>[[Prototype]]</code> 的值为 <code v-pre>null</code>，这通常是通过 <code v-pre>Object.create(null)</code> 来创建的。关于 <code v-pre>[[Prototype]]</code> 的详细信息参见本系列的 <em>this 与对象原型</em>。</p>
<p><strong>注意：</strong> 我们会在本章稍后讲解如何强制转换至 <code v-pre>number</code>，但对于下面的代码段，想象 <code v-pre>Number(..)</code> 函数就是那样做的。</p>
<p>考虑如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">valueOf</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"42"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">toString</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"42"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
c<span class="token punctuation">.</span><span class="token function-variable function">toString</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "42"</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">Number</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>
<span class="token function">Number</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>
<span class="token function">Number</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"abc"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="toboolean" tabindex="-1"><a class="header-anchor" href="#toboolean" aria-hidden="true">#</a> <code v-pre>ToBoolean</code></h3>
<p>下面，让我们聊一聊在 JS 中 <code v-pre>boolean</code> 如何动作。世面上关于这个话题有 <strong>许多的困惑和误解</strong>，所以集中注意力！</p>
<p>首先而且最重要的是，JS 实际上拥有 <code v-pre>true</code> 和 <code v-pre>false</code> 关键字，而且它们的行为正如你所期望的 <code v-pre>boolean</code> 值一样。一个常见的误解是，值 <code v-pre>1</code> 和 <code v-pre>0</code> 与 <code v-pre>true</code>/<code v-pre>false</code> 是相同的。虽然这可能在其他语言中是成立的，但在 JS 中 <code v-pre>number</code> 就是 <code v-pre>number</code>，而 <code v-pre>boolean</code> 就是 <code v-pre>boolean</code>。你可以将 <code v-pre>1</code> 强制转换为 <code v-pre>true</code>（或反之），或将 <code v-pre>0</code> 强制转换为 <code v-pre>false</code>（或反之）。但它们不是相同的。</p>
<h4 id="falsy-值" tabindex="-1"><a class="header-anchor" href="#falsy-值" aria-hidden="true">#</a> Falsy 值</h4>
<p>但这还不是故事的结尾。我们需要讨论一下，除了这两个 <code v-pre>boolean</code> 值以外，当你把其他值强制转换为它们的 <code v-pre>boolean</code> 等价物时如何动作。</p>
<p>所有的 JavaScript 值都可以被划分进两个类别：</p>
<ol>
<li>如果被强制转换为 <code v-pre>boolean</code>，将成为 <code v-pre>false</code> 的值</li>
<li>其它的一切值（很明显将变为 <code v-pre>true</code>）</li>
</ol>
<p>我不是在出洋相。JS 语言规范给那些在强制转换为 <code v-pre>boolean</code> 值时将会变为 <code v-pre>false</code> 的值定义了一个明确的，小范围的列表。</p>
<p>我们如何才能知道这个列表中的值是什么？在 ES5 语言规范中，9.2 部分定义了一个 <code v-pre>ToBoolean</code> 抽象操作，它讲述了对所有可能的值而言，当你试着强制转换它们为 boolean 时究竟会发生什么。</p>
<p>从这个表格中，我们得到了下面所谓的“falsy”值列表：</p>
<ul>
<li><code v-pre>undefined</code></li>
<li><code v-pre>null</code></li>
<li><code v-pre>false</code></li>
<li><code v-pre>+0</code>, <code v-pre>-0</code>, and <code v-pre>NaN</code></li>
<li><code v-pre>&quot;&quot;</code></li>
</ul>
<p>就是这些。如果一个值在这个列表中，它就是一个“falsy”值，而且当你在它上面进行 <code v-pre>boolean</code> 强制转换时它会转换为 <code v-pre>false</code>。</p>
<p>通过逻辑上的推论，如果一个值 <em>不</em> 在这个列表中，那么它一定在 <em>另一个列表</em> 中，也就是我们称为“truthy”值的列表。但是 JS 没有真正定义一个“truthy”列表。它给出了一些例子，比如它说所有的对象都是 truthy，但是语言规范大致上暗示着：<strong>任何没有明确地存在于 falsy 列表中的东西，都是 truthy</strong>。</p>
<h4 id="falsy-对象" tabindex="-1"><a class="header-anchor" href="#falsy-对象" aria-hidden="true">#</a> Falsy 对象</h4>
<p>等一下，这一节的标题听起来简直是矛盾的。我 <em>刚刚才说过</em> 语言规范将所有对象称为 truthy，对吧？应该没有“falsy 对象”这样的东西。</p>
<p>这会是什么意思呢？</p>
<p>它可能诱使你认为它意味着一个包装了 falsy 值（比如 <code v-pre>&quot;&quot;</code>、<code v-pre>0</code> 或 <code v-pre>false</code>）的对象包装器（见第三章）。但别掉到这个 <em>陷阱</em> 中。</p>
<p><strong>注意：</strong> 这个可能是一个语言规范的微妙笑话。</p>
<p>考虑下面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Boolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Number</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们知道这三个值都是包装了明显是 falsy 值的对象（见第三章）。但这些对象是作为 <code v-pre>true</code> 还是作为 <code v-pre>false</code> 动作呢？这很容易回答：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token function">Boolean</span><span class="token punctuation">(</span>a <span class="token operator">&amp;&amp;</span> b <span class="token operator">&amp;&amp;</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>

d<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，三个都作为 <code v-pre>true</code> 动作，这是唯一能使 <code v-pre>d</code> 得到 <code v-pre>true</code> 的方法。</p>
<p><strong>提示：</strong> 注意包在 <code v-pre>a &amp;&amp; b &amp;&amp; c</code> 表达式外面的 <code v-pre>Boolean( .. )</code> —— 你可能想知道为什么它在这儿。我们会在本章稍后回到这个话题，所以先做个心理准备。为了先睹为快，你可以自己试试如果没有 <code v-pre>Boolean( .. )</code> 调用而只有 <code v-pre>d = a &amp;&amp; b &amp;&amp; c</code> 时 <code v-pre>d</code> 是什么。</p>
<p>那么，如果“falsy 对象” <strong>不是包装着 falsy 值的对象</strong>，它们是什么鬼东西？</p>
<p>刁钻的地方在于，它们可以出现在你的 JS 程序中，但它们实际上不是 JavaScript 本身的一部分。</p>
<p><strong>什么！？</strong></p>
<p>有些特定的情况，在普通的 JS 语义之上，浏览器已经创建了它们自己的某种 <em>外来</em> 值的行为，也就是这种“falsy 对象”的想法。</p>
<p>一个“falsy 对象”看起来和动起来都像一个普通对象（属性，等等）的值，但是当你强制转换它为一个 <code v-pre>boolean</code> 时，它会变为一个 <code v-pre>false</code> 值。</p>
<p><strong>为什么！？</strong></p>
<p>最著名的例子是 <code v-pre>document.all</code>：一个 <em>由 DOM</em>（不是 JS 引擎本身） 给你的 JS 程序提供的类数组（对象），它向你的 JS 程序暴露你页面上的元素。它 <em>曾经</em> 像一个普通对象那样动作 —— 是一个 truthy。但不再是了。</p>
<p><code v-pre>document.all</code> 本身从来就不是“标准的”，而且从很早以前就被废弃/抛弃了。</p>
<p>“那他们就不能删掉它吗？” 对不起，想得不错。但愿它们能。但是世面上有太多的遗产 JS 代码库依赖于它。</p>
<p>那么，为什么使它像 falsy 一样动作？因为从 <code v-pre>document.all</code> 到 <code v-pre>boolean</code> 的强制转换（比如在 <code v-pre>if</code> 语句中）几乎总是用来检测老的，非标准的 IE。</p>
<p>IE 从很早以前就开始顺应规范了，而且在许多情况下它在推动 web 向前发展的作用和其他浏览器一样多，甚至更多。但是所有那些老旧的 <code v-pre>if (document.all) { /* it's IE */ }</code> 代码依然留在世面上，而且大多数可能永远都不会消失。所有这些遗产代码依然假设它们运行在那些给 IE 用户带来差劲儿的浏览体验的，几十年前的老 IE 上，</p>
<p>所以，我们不能完全移除 <code v-pre>document.all</code>，但是 IE 不再想让 <code v-pre>if (document.all) { .. }</code> 代码继续工作了，这样现代 IE 的用户就能得到新的，符合标准的代码逻辑。</p>
<p>“我们应当怎么做？” “我知道了！让我们黑进 JS 的类型系统并假装 <code v-pre>document.all</code> 是 falsy！”</p>
<p>呃。这很烂。这是一个大多数 JS 开发者们都不理解的疯狂的坑。但是其它的替代方案（对上面两败俱伤的问题什么都不做）还要烂得 <em>多那么一点点</em>。</p>
<p>所以……这就是我们得到的：由浏览器给 JavaScript 添加的疯狂、非标准的“falsy 对象”。耶！</p>
<h4 id="truthy-值" tabindex="-1"><a class="header-anchor" href="#truthy-值" aria-hidden="true">#</a> Truthy 值</h4>
<p>回到 truthy 列表。到底什么是 truthy 值？记住：<strong>如果一个值不在 falsy 列表中，它就是 truthy</strong>。</p>
<p>考虑下面代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"false"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token string">"0"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token string">"''"</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token function">Boolean</span><span class="token punctuation">(</span>a <span class="token operator">&amp;&amp;</span> b <span class="token operator">&amp;&amp;</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>

d<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你期望这里的 <code v-pre>d</code> 是什么值？它要么是 <code v-pre>true</code> 要么是 <code v-pre>false</code>。</p>
<p>它是 <code v-pre>true</code>。为什么？因为尽管这些<code v-pre>string</code>值的内容看起来是 falsy 值，但是<code v-pre>string</code>值本身都是 truthy，而这是因为在 falsy 列表中<code v-pre>&quot;&quot;</code>是唯一的<code v-pre>string</code>值。</p>
<p>那么这些呢？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 空数组 -- truthy 还是 falsy?</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 空对象 -- truthy 还是 falsy?</span>
<span class="token keyword">var</span> <span class="token function-variable function">c</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 空函数 -- truthy 还是 falsy?</span>

<span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token function">Boolean</span><span class="token punctuation">(</span>a <span class="token operator">&amp;&amp;</span> b <span class="token operator">&amp;&amp;</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>

d<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是的，你猜到了，这里的<code v-pre>d</code>依然是<code v-pre>true</code>。为什么？和前面的原因一样。尽管它们看起来像，但是<code v-pre>[]</code>，<code v-pre>{}</code>，和<code v-pre>function(){}</code> <em>不在</em> falsy 列表中，因此它们是 truthy 值。</p>
<p>换句话说，truthy 列表是无限长的。不可能制成一个这样的列表。你只能制造一个 falsy 列表并查询它。</p>
<p>花五分钟，把 falsy 列表写在便利贴上，然后粘在你的电脑显示器上，或者如果你愿意就记住它。不管哪种方法，你都可以在自己需要的时候通过简单地查询一个值是否在 falsy 列表中，来构建一个虚拟的 truthy 列表。</p>
<p>truthy 和 falsy 的重要性在于，理解如果一个值在被（明确地或隐含地）强制转换为<code v-pre>boolean</code>值的话，它将如何动作。现在你的大脑中有了这两个列表，我们可以深入强制转换的例子本身了。</p>
<h2 id="明确的强制转换" tabindex="-1"><a class="header-anchor" href="#明确的强制转换" aria-hidden="true">#</a> 明确的强制转换</h2>
<p><em>明确的</em> 强制转换指的是明显且明确的类型转换。对于大多数开发者来说，有很多类型转换的用法可以清楚地归类于这种 <em>明确的</em> 强制转换。</p>
<p>我们在这里的目标是，在我们的代码中指明一些模式，在这些模式中我们可以清楚明白地将一个值从一种类型转换至另一种类型，以确保不给未来将读到这段代码的开发者留下任何坑。我们越明确，后来的人就越容易读懂我们的代码，也不必费太多的力气去理解我们的意图。</p>
<p>关于 <em>明确的</em> 强制转换可能很难找到什么主要的不同意见，因为它与被广泛接受的静态类型语言中的类型转换的工作方式非常接近。因此，我们理所当然地认为（暂且） <em>明确的</em> 强制转换可以被认同为不是邪恶的，或没有争议的。虽然我们稍后会回到这个话题。</p>
<h3 id="明确地-strings-numbers" tabindex="-1"><a class="header-anchor" href="#明确地-strings-numbers" aria-hidden="true">#</a> 明确地：Strings &lt;--&gt; Numbers</h3>
<p>我们将从最简单，也许是最常见强制转换操作开始：将值在<code v-pre>string</code>和<code v-pre>number</code>表现形式之间进行强制转换。</p>
<p>为了在<code v-pre>string</code>和<code v-pre>number</code>之间进行强制转换，我们使用内建的<code v-pre>String(..)</code>和<code v-pre>Number(..)</code>函数（我们在第三章中所指的“原生构造器”），但 <strong>非常重要的是</strong>，我们不在它们前面使用<code v-pre>new</code>关键字。这样，我们就不是在创建对象包装器。</p>
<p>取而代之的是，我们实际上在两种类型之间进行 <em>明确地强制转换</em>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token string">"3.14"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>

b<span class="token punctuation">;</span> <span class="token comment">// "42"</span>
d<span class="token punctuation">;</span> <span class="token comment">// 3.14</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>String(..)</code>使用早先讨论的<code v-pre>ToString</code>操作的规则，将任意其它的值强制转换为一个基本类型的<code v-pre>string</code>值。<code v-pre>Number(..)</code>使用早先讨论过的<code v-pre>ToNumber</code>操作的规则，将任意其他的值强制转换为一个基本类型的<code v-pre>number</code>值。</p>
<p>我称此为 <em>明确的</em> 强制转换是因为，一般对于大多数开发者来说这是十分明显的：这些操作的最终结果是适当的类型转换。</p>
<p>实际上，这种用法看起来与其他的静态类型语言中的用法非常相像。</p>
<p>举个例子，在 C/C++中，你既可以说<code v-pre>(int)x</code>也可以说<code v-pre>int(x)</code>，而且它们都将<code v-pre>x</code>中的值转换为一个整数。两种形式都是合法的，但是许多人偏向于后者，它看起来有点儿像一个函数调用。在 JavaScript 中，当你说<code v-pre>Number(x)</code>时，它看起来极其相似。在 JS 中它实际上是一个函数调用这个事实重要吗？并非如此。</p>
<p>除了<code v-pre>String(..)</code>和<code v-pre>Number(..)</code>，还有其他的方法可以把这些值在<code v-pre>string</code>和<code v-pre>number</code>之间进行“明确地”转换：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token string">"3.14"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token operator">+</span>c<span class="token punctuation">;</span>

b<span class="token punctuation">;</span> <span class="token comment">// "42"</span>
d<span class="token punctuation">;</span> <span class="token comment">// 3.14</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用<code v-pre>a.toString()</code>在表面上是明确的（“toString”意味着“变成一个字符串”是很明白的），但是这里有一些藏起来的隐含性。<code v-pre>toString()</code>不能在像<code v-pre>42</code>这样的 <em>基本类型</em> 值上调用。所以 JS 会自动地将<code v-pre>42</code>“封箱”在一个对象包装器中（见第三章），这样<code v-pre>toString()</code>就可以针对这个对象调用。换句话讲，你可能会叫它“明确的隐含”。</p>
<p>这里的<code v-pre>+c</code>是<code v-pre>+</code>操作符的 <em>一元操作符</em>（操作符只有一个操作数）形式。取代进行数学加法（或字符串连接 —— 见下面的讨论）的是，一元的<code v-pre>+</code>明确地将它的操作数（<code v-pre>c</code>）强制转换为一个<code v-pre>number</code>值。</p>
<p><code v-pre>+c</code>是 <em>明确的</em> 强制转换吗？这要看你的经验和角度。如果你知道（现在你知道了！）一元<code v-pre>+</code>明确地意味着<code v-pre>number</code>强制转换，那么它就是相当明确和明显的。但是，如果你以前从没见过它，那么它看起来就极其困惑，晦涩，带有隐含的副作用，等等。</p>
<p><strong>注意：</strong> 在开源的 JS 社区中一般被接受的观点是，一元<code v-pre>+</code>是一个 <em>明确的</em> 强制转换形式。</p>
<p>即使你真的喜欢<code v-pre>+c</code>这种形式，它绝对会在有的地方看起来非常令人困惑。考虑下面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token string">"3.14"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token number">5</span> <span class="token operator">+</span> <span class="token operator">+</span>c<span class="token punctuation">;</span>

d<span class="token punctuation">;</span> <span class="token comment">// 8.14</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一元<code v-pre>-</code>操作符也像<code v-pre>+</code>一样进行强制转换，但它还会翻转数字的符号。但是你不能放两个减号<code v-pre>--</code>来使符号翻转回来，因为那将被解释为递减操作符。取代它的是，你需要这么做：<code v-pre>- -&quot;3.14&quot;</code>，在两个减号之间加入空格，这将会使强制转换的结果为<code v-pre>3.14</code>。</p>
<p>你可能会想到所有种类的可怕组合 —— 一个二元操作符挨着另一个操作符的一元形式。这里有另一个疯狂的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token number">1</span> <span class="token operator">+</span> <span class="token operator">-</span><span class="token operator">+</span><span class="token punctuation">(</span><span class="token operator">+</span><span class="token punctuation">(</span><span class="token operator">+</span><span class="token operator">-</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当一个一元<code v-pre>+</code>（或<code v-pre>-</code>）紧邻其他操作符时，你应当强烈地考虑避免使用它。虽然上面的代码可以工作，但几乎全世界都认为它是一个坏主意。即使是<code v-pre>d = +c</code>（或者<code v-pre>d =+ c</code>！）都太容易与<code v-pre>d += c</code>像混淆了，而后者完全是不同的东西！</p>
<p><strong>注意：</strong> 一元<code v-pre>+</code>的另一个极端使人困惑的地方是，被用于紧挨着另一个将要作为<code v-pre>++</code>递增操作符和<code v-pre>--</code>递减操作符的操作数。例如：<code v-pre>a +++b</code>，<code v-pre>a + ++b</code>，和<code v-pre>a + + +b</code>。更多关于<code v-pre>++</code>的信息，参见第五章的“表达式副作用”。</p>
<p>记住，我们正努力变得明确并 <strong>减少</strong> 困惑，不是把事情弄得更糟！</p>
<h4 id="从date到number" tabindex="-1"><a class="header-anchor" href="#从date到number" aria-hidden="true">#</a> 从<code v-pre>Date</code>到<code v-pre>number</code></h4>
<p>另一个一元<code v-pre>+</code>操作符的常见用法是将一个<code v-pre>Date</code>对象强制转换为一个<code v-pre>number</code>，其结果是这个日期/时间值的 unix 时间戳（从世界协调时间的 1970 年 1 月 1 日 0 点开始计算，经过的毫秒数）表现形式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">"Mon, 18 Aug 2014 08:53:06 CDT"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">+</span>d<span class="token punctuation">;</span> <span class="token comment">// 1408369986000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种习惯性用法经常用于取得当前的 <em>现在</em> 时刻的时间戳，比如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> timestamp <span class="token operator">=</span> <span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>注意：</strong> 一些开发者知道一个 JavaScript 中的特别的语法“技巧”，就是在构造器调用（一个带有<code v-pre>new</code>的函数调用）中如果没有参数值要传递的话，<code v-pre>()</code>是 <em>可选的</em>。所以你可能遇到<code v-pre>var timestamp = +new Date;</code>形式。然而，不是所有的开发者都同意忽略<code v-pre>()</code>可以增强可读性，因为它是一种不寻常的语法特例，只能适用于<code v-pre>new fn()</code>调用形式，而不能用于普通的<code v-pre>fn()</code>调用形式。</p>
<p>但强制转换不是从<code v-pre>Date</code>对象中取得时间戳的唯一方法。一个不使用强制转换的方式可能更好，因为它更加明确：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> timestamp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// var timestamp = (new Date()).getTime();</span>
<span class="token comment">// var timestamp = (new Date).getTime();</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是一个 <em>更更好的</em> 不使用强制转换的选择是使用 ES5 加入的<code v-pre>Date.now()</code>静态函数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> timestamp <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而且如果你想要为老版本的浏览器填补<code v-pre>Date.now()</code>的话，也十分简单：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Date<span class="token punctuation">.</span>now<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Date<span class="token punctuation">.</span><span class="token function-variable function">now</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我推荐跳过与日期有关的强制转换形式。使用<code v-pre>Date.now()</code>来取得当前 <em>现在</em> 的时间戳，而使用<code v-pre>new Date( .. ).getTime()</code>来取得一个需要你指定的 <em>非现在</em> 日期/时间的时间戳。</p>
<h4 id="奇异的" tabindex="-1"><a class="header-anchor" href="#奇异的" aria-hidden="true">#</a> 奇异的<code v-pre>~</code></h4>
<p>一个经常被忽视并通常让人糊涂的 JS 强制操作符是波浪线<code v-pre>~</code>操作符（也叫“按位取反”，“比特非”）。许多理解它在做什么的人也总是想要避开它。但是为了坚持我们在本书和本系列中的精神，让我们深入并找出<code v-pre>~</code>是否有一些对我们有用的东西。</p>
<p>在第二章的“32 位（有符号）整数”一节，我们讲解了在 JS 中位操作符是如何仅为 32 位操作定义的，这意味着我们强制它们的操作数遵循 32 位值的表现形式。这个规则如何发生是由<code v-pre>ToInt32</code>抽象操作（ES5 语言规范，9.5 部分）控制的。</p>
<p><code v-pre>ToInt32</code>首先进行<code v-pre>ToNumber</code>强制转换，这就是说如果值是<code v-pre>&quot;123&quot;</code>，它在<code v-pre>ToInt32</code>规则实施之前会首先变成<code v-pre>123</code>。</p>
<p>虽然它本身没有 <em>技术上进行</em> 强制转换（因为类型没有改变），但对一些特定的特殊<code v-pre>number</code>值使用位操作符（比如<code v-pre>|</code>或<code v-pre>~</code>）会产生一种强制转换效果，这种效果的结果是一个不同的<code v-pre>number</code>值。</p>
<p>举例来说，让我们首先考虑惯用的空操作<code v-pre>0 | x</code>（在第二种章有展示）中使用的<code v-pre>|</code>“比特或”操作符，它实质上仅仅进行<code v-pre>ToInt32</code>转换：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token number">0</span> <span class="token operator">|</span> <span class="token operator">-</span><span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
<span class="token number">0</span> <span class="token operator">|</span> <span class="token number">NaN</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
<span class="token number">0</span> <span class="token operator">|</span> <span class="token number">Infinity</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
<span class="token number">0</span> <span class="token operator">|</span> <span class="token operator">-</span><span class="token number">Infinity</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些特殊的数字是不可用 32 位表现的（因为它们源自 64 位的 IEEE 754 标准 —— 见第二章），所以<code v-pre>ToInt32</code>将这些值的结果指定为<code v-pre>0</code>。</p>
<p>有争议的是，<code v-pre>0 | __</code>是否是一种<code v-pre>ToInt32</code>强制转换操作的 <em>明确的</em> 形式，还是更倾向于 <em>隐含</em>。从语言规范的角度来说，毫无疑问是 <em>明确的</em>，但是如果你没有在这样的层次上理解位操作，它就可能看起来有点像 <em>隐含的</em> 魔法。不管怎样，为了与本章中其他的断言保持一致，我们称它为 <em>明确的</em>。</p>
<p>那么，让我们把注意力转回<code v-pre>~</code>。<code v-pre>~</code>操作符首先将值“强制转换”为一个 32 位<code v-pre>number</code>值，然后实施按位取反（翻转每一个比特位）。</p>
<p><strong>注意：</strong> 这与<code v-pre>!</code>不仅强制转换它的值为<code v-pre>boolean</code>而且还翻转它的每一位很相似（见后面关于“一元<code v-pre>!</code>”的讨论）。</p>
<p>但是……什么！？为什么我们要关心被翻转的比特位？这是一些相当特殊的，微妙的东西。JS 开发者需要推理个别比特位是十分少见的。</p>
<p>另一种考虑<code v-pre>~</code>定义的方法是，<code v-pre>~</code>源自学校中的计算机科学/离散数学：<code v-pre>~</code>进行二进制取补操作。太好了，谢谢，我完全明白了！</p>
<p>我们再试一次：<code v-pre>~x</code>大致与<code v-pre>-(x+1)</code>相同。这很奇怪，但是稍微容易推理一些。所以：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">~</span><span class="token number">42</span><span class="token punctuation">;</span> <span class="token comment">// -(42+1) ==> -43</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>你可能还在想<code v-pre>~</code>这个鬼东西到底和什么有关，或者对于强制转换的讨论它究竟有什么要紧。让我们快速进入要点。</p>
<p>考虑一下<code v-pre>-(x+1)</code>。通过进行这个操作，能够产生结果<code v-pre>0</code>（或者从技术上说<code v-pre>-0</code>！）的唯一的值是什么？<code v-pre>-1</code>。换句话说，<code v-pre>~</code>用于一个范围的<code v-pre>number</code>值时，将会为输入值<code v-pre>-1</code>产生一个 falsy（很容易强制转换为<code v-pre>false</code>）的<code v-pre>0</code>，而为任意其他的输入产生 truthy 的<code v-pre>number</code>。</p>
<p>为什么这要紧？</p>
<p><code v-pre>-1</code>通常称为一个“哨兵值”，它基本上意味着一个在同类型值（<code v-pre>number</code>）的更大的集合中被赋予了任意的语义。在 C 语言中许多函数使用哨兵值<code v-pre>-1</code>，它们返回<code v-pre>&gt;= 0</code>的值表示“成功”，返回<code v-pre>-1</code>表示“失败”。</p>
<p>JavaScript 在定义<code v-pre>string</code>操作<code v-pre>indexOf(..)</code>时采纳了这种先例，它搜索一个子字符串，如果找到就返回它从 0 开始计算的索引位置，没有找到的话就返回<code v-pre>-1</code>。</p>
<p>这样的情况很常见：不仅仅将<code v-pre>indexOf(..)</code>作为取得位置的操作，而且作为检查一个子字符串存在/不存在于另一个<code v-pre>string</code>中的<code v-pre>boolean</code>值。这就是开发者们通常如何进行这样的检查：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"Hello World"</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"lo"</span><span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// true</span>
  <span class="token comment">// 找到了！</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"lo"</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// true</span>
  <span class="token comment">// 找到了</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"ol"</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// true</span>
  <span class="token comment">// 没找到！</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"ol"</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// true</span>
  <span class="token comment">// 没找到！</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我感觉看着<code v-pre>&gt;= 0</code>或<code v-pre>== -1</code>有些恶心。它基本上是一种“抽象泄漏”，这里它将底层的实现行为 —— 使用哨兵值<code v-pre>-1</code>表示“失败” —— 泄漏到我的代码中。我倒是乐意隐藏这样的细节。</p>
<p>现在，我们终于看到为什<code v-pre>~</code>可以帮到我们了！将<code v-pre>~</code>和<code v-pre>indexOf()</code>一起使用可以将值“强制转换”（实际上只是变形）为 <strong>可以适当地强制转换为<code v-pre>boolean</code>的值</strong>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"Hello World"</span><span class="token punctuation">;</span>

<span class="token operator">~</span>a<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"lo"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// -4   &lt;-- truthy!</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">~</span>a<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"lo"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// true</span>
  <span class="token comment">// 找到了！</span>
<span class="token punctuation">}</span>

<span class="token operator">~</span>a<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"ol"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0    &lt;-- falsy!</span>
<span class="token operator">!</span><span class="token operator">~</span>a<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"ol"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token operator">~</span>a<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"ol"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// true</span>
  <span class="token comment">// 没找到！</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>~ </code>拿到<code v-pre>indexOf(..)</code>的返回值并将它变形：对于“失败”的<code v-pre>-1</code>我们得到 falsy 的<code v-pre>0</code>，而其他的值都是 truthy。</p>
<p><strong>注意：</strong> <code v-pre>~</code>的假想算法<code v-pre>-(x+1)</code>暗示着<code v-pre>~-1</code>是<code v-pre>-0</code>，但是实际上它产生<code v-pre>0</code>，因为底层的操作其实是按位的，不是数学操作。</p>
<p>技术上讲，<code v-pre>if (~a.indexOf(..))</code>仍然依靠 <em>隐含的</em> 强制转换将它的结果<code v-pre>0</code>变为<code v-pre>false</code>或非零变为<code v-pre>true</code>。但总的来说，对我而言<code v-pre>~</code>更像一种 <em>明确的</em> 强制转换机制，只要你知道在这种惯用法中它的意图是什么。</p>
<p>我感觉这样的代码要比前面凌乱的<code v-pre>&gt;= 0</code> / <code v-pre>== -1</code>更干净。</p>
<h5 id="截断比特位" tabindex="-1"><a class="header-anchor" href="#截断比特位" aria-hidden="true">#</a> 截断比特位</h5>
<p>在你遇到的代码中，还有一个地方可能出现<code v-pre>~</code>：一些开发者使用双波浪线<code v-pre>~~</code>来截断一个<code v-pre>number</code>的小数部分（也就是，将它“强制转换”为一个“整数”）。这通常（虽然是错误的）被说成与调用<code v-pre>Math.floor(..)</code>的结果相同。</p>
<p><code v-pre>~ ~</code>的工作方式是，第一个<code v-pre>~</code>实施<code v-pre>ToInt32</code>“强制转换”并进行按位取反，然后第二个<code v-pre>~</code>进行另一次按位取反，将每一个比特位都翻转回原来的状态。于是最终的结果就是<code v-pre>ToInt32</code>“强制转换”（也叫截断）。</p>
<p><strong>注意：</strong> <code v-pre>~~</code>的按位双翻转，与双否定<code v-pre>!!</code>的行为非常相似，它将在稍后的“明确地：* --&gt; Boolean”一节中讲解。</p>
<p>然而，<code v-pre>~~</code>需要一些注意/澄清。首先，它仅在 32 位值上可以可靠地工作。但更重要的是，它在负数上工作的方式与<code v-pre>Math.floor(..)</code>不同！</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">49.6</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// -50</span>
<span class="token operator">~</span><span class="token operator">~</span><span class="token operator">-</span><span class="token number">49.6</span><span class="token punctuation">;</span> <span class="token comment">// -49</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>把<code v-pre>Math.floor(..)</code>的不同放在一边，<code v-pre>~~x</code>可以将值截断为一个（32 位）整数。但是<code v-pre>x | 0</code>也可以，而且看起来还（稍微）<em>省事儿</em> 一些。</p>
<p>那么，为什么你可能会选择<code v-pre>~~x</code>而不是<code v-pre>x | 0</code>？操作符优先权（见第五章）：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">~</span><span class="token operator">~</span><span class="token number">1e20</span> <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">// 166199296</span>

<span class="token number">1e20</span> <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token number">0</span> <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1661992960</span>
<span class="token punctuation">(</span><span class="token number">1e20</span> <span class="token operator">|</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">// 166199296</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如这里给出的其他建议一样，仅在读/写这样的代码的每一个人都知道这些操作符如何工作的情况下，才将<code v-pre>~</code>和<code v-pre>~~</code>作为“强制转换”和将值变形的明确机制。</p>
<h3 id="明确地-解析数字字符串" tabindex="-1"><a class="header-anchor" href="#明确地-解析数字字符串" aria-hidden="true">#</a> 明确地：解析数字字符串</h3>
<p>将一个<code v-pre>string</code>强制转换为一个<code v-pre>number</code>的类似结果，可以通过从<code v-pre>string</code>的字符内容中解析（parsing）出一个<code v-pre>number</code>得到。然而在这种解析和我们上面讲解的类型转换之间存在着区别。</p>
<p>考虑下面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"42"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token string">"42px"</span><span class="token punctuation">;</span>

<span class="token function">Number</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>
<span class="token function">parseInt</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>

<span class="token function">Number</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
<span class="token function">parseInt</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从一个字符串中解析出一个数字是 <em>容忍</em> 非数字字符的 —— 从左到右，如果遇到非数字字符就停止解析 —— 而强制转换是 <em>不容忍</em> 并且会失败而得出值<code v-pre>NaN</code>。</p>
<p>解析不应当被视为强制转换的替代品。这两种任务虽然相似，但是有着不同的目的。当你不知道/不关心右手边可能有什么其他的非数字字符时，你可以将一个<code v-pre>string</code>作为<code v-pre>number</code>解析。当只有数字才是可接受的值，而且像<code v-pre>&quot;42px&quot;</code>这样的东西作为数字应当被排除时，就强制转换一个<code v-pre>string</code>（变为一个<code v-pre>number</code>）。</p>
<p><strong>提示：</strong> <code v-pre>parseInt(..)</code>有一个孪生兄弟，<code v-pre>parseFloat(..)</code>，它（听起来）从一个字符串中拉出一个浮点数。</p>
<p>不要忘了<code v-pre>parseInt(..)</code>工作在<code v-pre>string</code>值上。向<code v-pre>parseInt(..)</code>传递一个<code v-pre>number</code>绝对没有任何意义。传递其他任何类型也都没有意义，比如<code v-pre>true</code>， <code v-pre>function(){..}</code>或<code v-pre>[1,2,3]</code>。</p>
<p>如果你传入一个非<code v-pre>string</code>，你所传入的值首先将自动地被强制转换为一个<code v-pre>string</code>（见早先的“<code v-pre>ToString</code>”），这很明显是一种隐藏的 <em>隐含</em> 强制转换。在你的程序中依赖这样的行为真的是一个坏主意，所以永远也不要将<code v-pre>parseInt(..)</code>与非<code v-pre>string</code>值一起使用。</p>
<p>在 ES5 之前，<code v-pre>parseInt(..)</code>还存在另外一个坑，这曾是许多 JS 程序的 bug 的根源。如果你不传递第二个参数来指定使用哪种进制（也叫基数）来翻译数字的<code v-pre>string</code>内容，<code v-pre>parseInt(..)</code>将会根据开头的字符进行猜测。</p>
<p>如果开头的两个字符是<code v-pre>&quot;0x&quot;</code>或<code v-pre>&quot;0X&quot;</code>，那么猜测（根据惯例）将是你想要将这个<code v-pre>string</code>翻译为一个 16 进制<code v-pre>number</code>。否则，如果第一个字符是<code v-pre>&quot;0&quot;</code>，那么猜测（也是根据惯例）将是你想要将这个<code v-pre>string</code>翻译成 8 进制<code v-pre>number</code>。</p>
<p>16 进制的<code v-pre>string</code>（以<code v-pre>0x</code>或<code v-pre>0X</code>开头）没那么容易搞混。但是事实证明 8 进制数字的猜测过于常见了。比如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> hour <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>selectedHour<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> minute <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>selectedMinute<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"The time you selected was: "</span> <span class="token operator">+</span> hour <span class="token operator">+</span> <span class="token string">":"</span> <span class="token operator">+</span> minute<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看起来无害，对吧？试着在小时上选择<code v-pre>08</code>在分钟上选择<code v-pre>09</code>。你会得到<code v-pre>0:0</code>。为什么？因为<code v-pre>8</code>和<code v-pre>9</code>都不是合法的 8 进制数。</p>
<p>ES5 之前的修改很简单，但是很容易忘：<strong>总是在第二个参数值上传递<code v-pre>10</code></strong>。这完全是安全的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> hour <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>selectedHour<span class="token punctuation">.</span>value<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> minute <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>selectedMiniute<span class="token punctuation">.</span>value<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在 ES5 中，<code v-pre>parseInt(..)</code>不再猜测八进制数了。除非你指定，否则它会假定为 10 进制（或者为<code v-pre>&quot;0x&quot;</code>前缀猜测 16 进制数）。这好多了。只是要小心，如果你的代码不得不运行在前 ES5 环境中，你仍然需要为基数传递<code v-pre>10</code>。</p>
<h4 id="解析非字符串" tabindex="-1"><a class="header-anchor" href="#解析非字符串" aria-hidden="true">#</a> 解析非字符串</h4>
<p>几年以前有一个挖苦 JS 的玩笑，使一个关于<code v-pre>parseInt(..)</code>行为的一个臭名昭著的例子备受关注，它取笑 JS 的这个行为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 18</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里面设想（但完全不合法）的断言是，“如果我传入一个无限大，并从中解析出一个整数的话，我应该得到一个无限大，不是 18”。没错，JS 一定是疯了才得出这个结果，对吧？</p>
<p>虽然这是个明显故意造成的，不真实的例子，但是让我们放纵这种疯狂一小会儿，来检视一下 JS 是否真的那么疯狂。</p>
<p>首先，这其中最明显的原罪是将一个非<code v-pre>string</code>传入了<code v-pre>parseInt(..)</code>。这是不对的。这么做是自找麻烦。但就算你这么做了，JS 也会礼貌地将你传入的东西强制转换为它可以解析的<code v-pre>string</code>。</p>
<p>有些人可能会争论说这是一种不合理的行为，<code v-pre>parseInt(..)</code>应当拒绝在一个非<code v-pre>string</code>值上操作。它应该抛出一个错误吗？坦白地说，像 Java 那样。但是一想到 JS 应当开始在满世界抛出错误，以至于几乎每一行代码都需要用<code v-pre>try..catch</code>围起来，我就不寒而栗。</p>
<p>它应当返回<code v-pre>NaN</code>吗？也许。但是……要是这样呢：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">"42"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这也应当失败吗？它是一个非<code v-pre>string</code>值啊。如果你想让<code v-pre>String</code>对象包装器被开箱成<code v-pre>&quot;42&quot;</code>，那么<code v-pre>42</code>先变成<code v-pre>&quot;42&quot;</code>，以使<code v-pre>42</code>可以被解析回来就那么不寻常吗？</p>
<p>我会争论说，这种可能发生的半 <em>明确</em> 半 <em>隐含</em> 的强制转换经常可以成为非常有用的东西。比如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">num</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
  <span class="token function-variable function">toString</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>num <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">parseInt</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>事实上<code v-pre>parseInt(..)</code>将它的值强制转换为<code v-pre>string</code>来实施解析是十分合理的。如果你传垃圾进去，那么你就会得到垃圾，不要责备垃圾桶 —— 它只是忠实地尽自己的责任。</p>
<p>那么，如果你传入像<code v-pre>Infinity</code>（很明显是<code v-pre>1 / 0</code>的结果）这样的值，对于它的强制转换来说哪种<code v-pre>string</code>表现形式最有道理呢？我脑中只有两种合理的选择：<code v-pre>&quot;Infinity&quot;</code>和<code v-pre>&quot;∞&quot;</code>。JS 选择了<code v-pre>&quot;Infinity&quot;</code>。我很高兴它这么选。</p>
<p>我认为在 JS 中 <strong>所有的值</strong> 都有某种默认的<code v-pre>string</code>表现形式是一件好事，这样它们就不是我们不能调试和推理的神秘黑箱了。</p>
<p>现在，关于 19 进制呢？很明显，这完全是伪命题和造作。没有真实的 JS 程序使用 19 进制。那太荒谬了。但是，让我们再一次放任这种荒谬。在 19 进制中，合法的数字字符是<code v-pre>0</code> - <code v-pre>9</code>和<code v-pre>a</code> - <code v-pre>i</code>（大小写无关）。</p>
<p>那么，回到我们的<code v-pre>parseInt( 1/0, 19 )</code>例子。它实质上是<code v-pre>parseInt( &quot;Infinity&quot;, 19 )</code>。它如何解析？第一个字符是<code v-pre>&quot;I&quot;</code>，在愚蠢的 19 进制中是值<code v-pre>18</code>。第二个字符<code v-pre>&quot;n&quot;</code>不再合法的数字字符集内，所以这样的解析就礼貌地停止了，就像它在<code v-pre>&quot;42px&quot;</code>中遇到<code v-pre>&quot;p&quot;</code>那样。</p>
<p>结果呢？<code v-pre>18</code>。正如它应该的那样。对 JS 来说，并非一个错误或者<code v-pre>Infinity</code>本身，而是将我们带到这里的一系列的行为才是 <strong>非常重要</strong> 的，不应当那么简单地被丢弃。</p>
<p>其他关于<code v-pre>parseInt(..)</code>行为的，令人吃惊但又十分合理的例子还包括：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token number">0.000008</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0   ("0" from "0.000008")</span>
<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token number">0.0000008</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 8   ("8" from "8e-7")</span>
<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 250 ("fa" from "false")</span>
<span class="token function">parseInt</span><span class="token punctuation">(</span>parseInt<span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 15  ("f" from "function..")</span>

<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">"0x10"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 16</span>
<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">"103"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实<code v-pre>parseInt(..)</code>在它的行为上是相当可预见和一致的。如果你正确地使用它，你就能得到合理的结果。如果你不正确地使用它，那么你得到的疯狂结果并不是 JavaScript 的错。</p>
<h3 id="明确地-boolean" tabindex="-1"><a class="header-anchor" href="#明确地-boolean" aria-hidden="true">#</a> 明确地：* --&gt; Boolean</h3>
<p>现在，我们来检视从任意的非<code v-pre>boolean</code>值到一个<code v-pre>boolean</code>值的强制转换。</p>
<p>正如上面的<code v-pre>String(..)</code>和<code v-pre>Number(..)</code>，<code v-pre>Boolean(..)</code>（当然，不带<code v-pre>new</code>！）是强制进行<code v-pre>ToBoolean</code>转换的明确方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"0"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> e <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> f <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> g<span class="token punctuation">;</span>

<span class="token function">Boolean</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token function">Boolean</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>

<span class="token function">Boolean</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然<code v-pre>Boolean(..)</code>是非常明确的，但是它并不常见也不为人所惯用。</p>
<p>正如一元<code v-pre>+</code>操作符将一个值强制转换为一个<code v-pre>number</code>（参见上面的讨论），一元的<code v-pre>!</code>否定操作符可以将一个值明确地强制转换为一个<code v-pre>boolean</code>。<em>问题</em> 是它还将值从 truthy 翻转为 falsy，或反之。所以，大多数 JS 开发者使用<code v-pre>!!</code>双否定操作符进行<code v-pre>boolean</code>强制转换，因为第二个<code v-pre>!</code>将会把它翻转回原本的 true 或 false：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"0"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> e <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> f <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> g<span class="token punctuation">;</span>

<span class="token operator">!</span><span class="token operator">!</span>a<span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token operator">!</span><span class="token operator">!</span>b<span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token operator">!</span><span class="token operator">!</span>c<span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token operator">!</span><span class="token operator">!</span>d<span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token operator">!</span><span class="token operator">!</span>e<span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token operator">!</span><span class="token operator">!</span>f<span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token operator">!</span><span class="token operator">!</span>g<span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没有<code v-pre>Boolean(..)</code>或<code v-pre>!!</code>的话，任何这些<code v-pre>ToBoolean</code>强制转换都将 <em>隐含地</em> 发生，比如在一个<code v-pre>if (..) ..</code>语句这样使用<code v-pre>boolean</code>的上下文中。但这里的目标是，明确地强制一个值成为<code v-pre>boolean</code>来使<code v-pre>ToBoolean</code>强制转换的意图显得明明白白。</p>
<p>另一个<code v-pre>ToBoolean</code>强制转换的用例是，如果你想在数据结构的 JSON 序列化中强制转换一个<code v-pre>true</code>/<code v-pre>false</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/*..*/</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/*..*/</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[1,null,2,null]"</span>

<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> val <span class="token operator">==</span> <span class="token string">"function"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 强制函数进行 `ToBoolean` 转换</span>
    <span class="token keyword">return</span> <span class="token operator">!</span><span class="token operator">!</span>val<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> val<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// "[1,true,2,true]"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你是从 Java 来到 JavaScript 的话，你可能会认得这个惯用法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> b <span class="token operator">=</span> a <span class="token operator">?</span> <span class="token boolean">true</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>? :</code>三元操作符将会测试<code v-pre>a</code>的真假，然后根据这个测试的结果相应地将<code v-pre>true</code>或<code v-pre>false</code>赋值给<code v-pre>b</code>。</p>
<p>表面上，这个惯用法看起来是一种 <em>明确的</em> <code v-pre>ToBoolean</code>类型强制转换形式，因为很明显它操作的结果要么是<code v-pre>true</code>要么是<code v-pre>false</code>。</p>
<p>然而，这里有一个隐藏的 <em>隐含</em> 强制转换，就是表达式<code v-pre>a</code>不得不首先被强制转换为<code v-pre>boolean</code>来进行真假测试。我称这种惯用法为“明确地隐含”。另外，我建议你在 JavaScript 中 <strong>完全避免这种惯用法</strong>。它不会提供真正的好处，而且会让事情变得更糟。</p>
<p>对于 <em>明确的</em> 强制转换<code v-pre>Boolean(a)</code>和<code v-pre>!!a</code>是好得多的选项。</p>
<h2 id="隐含的强制转换" tabindex="-1"><a class="header-anchor" href="#隐含的强制转换" aria-hidden="true">#</a> 隐含的强制转换</h2>
<p><em>隐含的</em> 强制转换是指这样的类型转换：它们是隐藏的，由于其他的动作隐含地发生的不明显的副作用。换句话说，任何（对你）不明显的类型转换都是 <em>隐含的强制转换</em>。</p>
<p>虽然 <em>明确的</em> 强制转换的目的很明白，但是这可能 <em>太过</em> 明显 —— <em>隐含的</em> 强制转换拥有相反的目的：使代码更难理解。</p>
<p>从表面上来看，我相信这就是许多关于强制转换的愤怒的源头。绝大多数关于“JavaScript 强制转换”的抱怨实际上都指向了（不管他们是否理解它） <em>隐含的</em> 强制转换。</p>
<p><strong>注意：</strong> Douglas Crockford，<em>&quot;JavaScript: The Good Parts&quot;</em> 的作者，在许多会议和他的作品中声称应当避免 JavaScript 强制转换。但看起来他的意思是 <em>隐含的</em> 强制转换是不好的（以他的意见）。然而，如果你读他自己的代码的话，你会发现相当多的强制转换的例子，<em>明确</em> 和 <em>隐含</em> 都有！事实上，他的担忧主要在于<code v-pre>==</code>操作，但正如你将在本章中看到的，那只是强制转换机制的一部分。</p>
<p>那么，<strong>隐含强制转换</strong> 是邪恶的吗？它很危险吗？它是 JavaScript 设计上的缺陷吗？我们应该尽一切力量避免它吗？</p>
<p>我打赌大多数读者都倾向于踊跃地欢呼，“是的！”</p>
<p><strong>别那么着急</strong>。听我把话说完。</p>
<p>让我们在 <em>隐含的</em> 强制转换是什么，和可以是什么这个问题上采取一个不同的角度，而不是仅仅说它是“好的明确强制转换的反面”。这太过狭隘，而且忽视了一个重要的微妙细节。</p>
<p>让我们将 <em>隐含的</em> 强制转换的目的定义为：减少搞乱我们代码的繁冗，模板代码，和/或不必要的实现细节，不使它们的噪音掩盖更重要的意图。</p>
<h3 id="用于简化的隐含" tabindex="-1"><a class="header-anchor" href="#用于简化的隐含" aria-hidden="true">#</a> 用于简化的隐含</h3>
<p>在我们进入 JavaScript 以前，我建议使用某个理论上是强类型的语言的假想代码来说明一下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>SomeType x <span class="token operator">=</span> <span class="token function">SomeType</span><span class="token punctuation">(</span> <span class="token function">AnotherType</span><span class="token punctuation">(</span> y <span class="token punctuation">)</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个例子中，我在<code v-pre>y</code>中有一些任意类型的值，想把它转换为<code v-pre>SomeType</code>类型。问题是，这种语言不能从当前<code v-pre>y</code>的类型直接走到<code v-pre>SomeType</code>。它需要一个中间步骤，它首先转换为<code v-pre>AnotherType</code>，然后从<code v-pre>AnotherType</code>转换到<code v-pre>SomeType</code>。</p>
<p>现在，要是这种语言（或者你可用这种语言创建自己的定义）允许你这么说呢：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>SomeType x <span class="token operator">=</span> <span class="token function">SomeType</span><span class="token punctuation">(</span> y <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>难道一般来说你不会同意我们简化了这里的类型转换，降低了中间转换步骤的无谓的“噪音”吗？我的意思是，在这段代码的这一点上，能看到并处理<code v-pre>y</code>先变为<code v-pre>AnotherType</code>然后再变为<code v-pre>SomeType</code>的事实，<em>真的</em> 是很重要的一件事吗？</p>
<p>有些人可能会争辩，至少在某些环境下，是的。但我想我可以做出相同的争辩说，在许多其他的环境下，不管是通过语言本身的还是我们自己的抽象，这样的简化通过抽象或隐藏这些细节 <strong>确实增强了代码的可读性</strong>。</p>
<p>毫无疑问，在幕后的某些地方，那个中间的步骤依然是发生的。但如果这样的细节在视野中隐藏起来，我们就可以将使<code v-pre>y</code>变为类型<code v-pre>SomeType</code>作为一个泛化操作来推理，并隐藏混乱的细节。</p>
<p>虽然不是一个完美的类比，我要在本章剩余部分争论的是，JS 的 <em>隐含的</em> 强制转换可以被认为是给你的代码提供了一个类似的辅助。</p>
<p>但是，<strong>很重要的是</strong>，这不是一个无边界的，绝对的论断。绝对有许多 <em>邪恶的东西</em> 潜伏在 <em>隐含</em> 强制转换周围，它们对你的代码造成的损害要比任何潜在的可读性改善厉害的多。很清楚，我们不得不学习如何避免这样的结构，使我们不会用各种 bug 来毒害我们的代码。</p>
<p>许多开发者相信，如果一个机制可以做某些有用的事儿 <strong>A</strong>，但也可以被滥用或误用来做某些可怕的事儿 <strong>Z</strong>，那么我们就应当将这种机制整个儿扔掉，仅仅是为了安全。</p>
<p>我对你的鼓励是：不要安心于此。不要“把孩子跟洗澡水一起泼出去”。不要因为你只见到过它的“坏的一面”就假设 <em>隐含</em> 强制转换都是坏的。我认为这里有“好的一面”，而我想要帮助和启发你们更多的人找到并接纳它们！</p>
<h3 id="隐含地-strings-numbers" tabindex="-1"><a class="header-anchor" href="#隐含地-strings-numbers" aria-hidden="true">#</a> 隐含地：Strings &lt;--&gt; Numbers</h3>
<p>在本章的早先，我们探索了<code v-pre>string</code>和<code v-pre>number</code>值之间的 <em>明确</em> 强制转换。现在，让我们使用 <em>隐含</em> 强制转换的方式探索相同的任务。但在我们开始之前，我们不得不检视一些将会 <em>隐含地</em> 发生强制转换的操作的微妙之处。</p>
<p>为了服务于<code v-pre>number</code>的相加和<code v-pre>string</code>的连接两个目的，<code v-pre>+</code>操作符被重载了。那么 JS 如何知道你想用的是哪一种操作呢？考虑下面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"42"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token string">"0"</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

a <span class="token operator">+</span> b<span class="token punctuation">;</span> <span class="token comment">// "420"</span>
c <span class="token operator">+</span> d<span class="token punctuation">;</span> <span class="token comment">// 42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是什么不同导致了<code v-pre>&quot;420&quot;</code>和<code v-pre>42</code>？一个常见的误解是，这个不同之处在于操作数之一或两者是否是一个<code v-pre>string</code>，这意味着<code v-pre>+</code>将假设<code v-pre>string</code>连接。虽然这有一部分是对的，但实际情况要更复杂。</p>
<p>考虑如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

a <span class="token operator">+</span> b<span class="token punctuation">;</span> <span class="token comment">// "1,23,4"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两个操作数都不是<code v-pre>string</code>，但很明显它们都被强制转换为<code v-pre>string</code>然后启动了<code v-pre>string</code>连接。那么到底发生了什么？</p>
<p>（<strong>警告：</strong> 语言规范式的深度细节就要来了，如果这会吓到你就跳过下面两段！）</p>
<hr>
<p>根据 ES5 语言规范的 11.6.1 部分，<code v-pre>+</code>的算法是（当一个操作数是<code v-pre>object</code>值时），如果两个操作数之一已经是一个<code v-pre>string</code>，或者下列步骤产生一个<code v-pre>string</code>表达形式，<code v-pre>+</code>将会进行连接。所以，当<code v-pre>+</code>的两个操作数之一收到一个<code v-pre>object</code>（包括<code v-pre>array</code>）时，它首先在这个值上调用<code v-pre>ToPrimitive</code>抽象操作（9.1 部分），而它会带着<code v-pre>number</code>的上下文环境提示来调用<code v-pre>[[DefaultValue]]</code>算法（8.12.8 部分）。</p>
<p>如果你仔细观察，你会发现这个操作现在和<code v-pre>ToNumber</code>抽象操作处理<code v-pre>object</code>的过程是一样的（参见早先的“<code v-pre>ToNumber</code>”一节）。在<code v-pre>array</code>上的<code v-pre>valueOf()</code>操作将会在产生一个简单基本类型时失败，于是它退回到一个<code v-pre>toString()</code>表现形式。两个<code v-pre>array</code>因此分别变成了<code v-pre>&quot;1,2&quot;</code>和<code v-pre>&quot;3,4&quot;</code>。现在，<code v-pre>+</code>就如你通常期望的那样连接这两个<code v-pre>string</code>：<code v-pre>&quot;1,23,4&quot;</code>。</p>
<hr>
<p>让我们把这些乱七八糟的细节放在一边，回到一个早前的，简化的解释：如果<code v-pre>+</code>的两个操作数之一是一个<code v-pre>string</code>（或在上面的步骤中成为一个<code v-pre>string</code>），那么操作就会是<code v-pre>string</code>连接。否则，它总是数字加法。</p>
<p><strong>注意：</strong> 关于强制转换，一个经常被引用的坑是<code v-pre>[] + {}</code>和<code v-pre>{} + []</code>，这两个表达式的结果分别是<code v-pre>&quot;[object Object]&quot;</code>和<code v-pre>0</code>。虽然对此有更多的东西，但是我们将在第五章的“Block”中讲解这其中的细节。</p>
<p>这对 <em>隐含</em> 强制转换意味着什么？</p>
<p>你可以简单地通过将<code v-pre>number</code>和空<code v-pre>string``&quot;&quot;</code>“相加”来把一个<code v-pre>number</code>强制转换为一个<code v-pre>string</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> a <span class="token operator">+</span> <span class="token string">""</span><span class="token punctuation">;</span>

b<span class="token punctuation">;</span> <span class="token comment">// "42"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong> 使用<code v-pre>+</code>操作符的数字加法是可交换的，这意味着<code v-pre>2 + 3</code>与<code v-pre>3 + 2</code>是相同的。使用<code v-pre>+</code>的字符串连接很明显通常不是可交换的，<strong>但是</strong> 对于<code v-pre>&quot;&quot;</code>的特定情况，它实质上是可交换的，因为<code v-pre>a + &quot;&quot;</code>和<code v-pre>&quot;&quot; + a</code>会产生相同的结果。</p>
<p>使用一个<code v-pre>+ &quot;&quot;</code>操作将<code v-pre>number</code>（<em>隐含地</em>）强制转换为<code v-pre>string</code>是极其常见/惯用的。事实上，有趣的是，一些在口头上批评 <em>隐含</em> 强制转换得最严厉的人仍然在他们自己的代码中使用这种方式，而不是使用它的 <em>明确的</em> 替代形式。</p>
<p>在 <em>隐含</em> 强制转换的有用形式中，<strong>我认为这是一个很棒的例子</strong>，尽管这种机制那么频繁地被人诟病！</p>
<p>将<code v-pre>a + &quot;&quot;</code>这种 <em>隐含的</em> 强制转换与我们早先的<code v-pre>String(a)</code><em>明确的</em> 强制转换的例子相比较，有一个另外的需要小心的奇怪之处。由于<code v-pre>ToPrimitive</code>抽象操作的工作方式，<code v-pre>a + &quot;&quot;</code>在值<code v-pre>a</code>上调用<code v-pre>valueOf()</code>，它的返回值再最终通过内部的<code v-pre>ToString</code>抽象操作转换为一个<code v-pre>string</code>。但是<code v-pre>String(a)</code>只直接调用<code v-pre>toString()</code>。</p>
<p>两种方式的最终结果都是一个<code v-pre>string</code>，但如果你使用一个<code v-pre>object</code>而不是一个普通的基本类型<code v-pre>number</code>的值，你可能不一定得到 <em>相同的</em> <code v-pre>string</code>值！</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">valueOf</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">42</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">toString</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">4</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

a <span class="token operator">+</span> <span class="token string">""</span><span class="token punctuation">;</span> <span class="token comment">// "42"</span>

<span class="token function">String</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "4"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般来说这样的坑不会咬到你，除非你真的试着创建令人困惑的数据结构和操作，但如果你为某些<code v-pre>object</code>同时定义了你自己的<code v-pre>valueOf()</code>和<code v-pre>toString()</code>方法，你就应当小心，因为你强制转换这些值的方式将影响到结果。</p>
<p>那么另外一个方向呢？我们如何将一个<code v-pre>string</code> <em>隐含强制转换</em> 为一个<code v-pre>number</code>？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"3.14"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> a <span class="token operator">-</span> <span class="token number">0</span><span class="token punctuation">;</span>

b<span class="token punctuation">;</span> <span class="token comment">// 3.14</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>-</code>操作符是仅为数字减法定义的，所以<code v-pre>a - 0</code>强制<code v-pre>a</code>的值被转换为一个<code v-pre>number</code>。虽然少见得多，<code v-pre>a * 1</code>或<code v-pre>a / 1</code>也会得到相同的结果，因为这些操作符也是仅为数字操作定义的。</p>
<p>那么对<code v-pre>-</code>操作符使用<code v-pre>object</code>值会怎样呢？和上面的<code v-pre>+</code>的故事相似：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

a <span class="token operator">-</span> b<span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两个<code v-pre>array</code>值都不得不变为<code v-pre>number</code>，但它们首先会被强制转换为<code v-pre>string</code>（使用意料之中的<code v-pre>toString()</code>序列化），然后再强制转换为<code v-pre>number</code>，以便<code v-pre>-</code>减法操作可以实施。</p>
<p>那么，<code v-pre>string</code>和<code v-pre>number</code>值之间的 <em>隐含</em> 强制转换还是你总是在恐怖故事当中听到的丑陋怪物吗？我个人不这么认为。</p>
<p>比较<code v-pre>b = String(a)</code>（<em>明确的</em>）和<code v-pre>b = a + &quot;&quot;</code>（<em>隐含的</em>）。我认为在你的代码中会出现两种方式都有用的情况。当然<code v-pre>b = a + &quot;&quot;</code>在 JS 程序中更常见一些，不管一般意义上 <em>隐含</em> 强制转换的好处或害处的 <em>感觉</em> 如何，它都提供了自己的用途。</p>
<h3 id="隐含地-booleans-numbers" tabindex="-1"><a class="header-anchor" href="#隐含地-booleans-numbers" aria-hidden="true">#</a> 隐含地：Booleans --&gt; Numbers</h3>
<p>我认为 <em>隐含</em> 强制转换可以真正闪光的一个情况是，将特定类型的复杂<code v-pre>boolean</code>逻辑简化为简单的数字加法。当然，这不是一个通用的技术，而是一个特定情况的特定解决方法。</p>
<p>考虑如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">onlyOne</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>b <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>c<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span><span class="token operator">!</span>a <span class="token operator">&amp;&amp;</span> b <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>c<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span><span class="token operator">!</span>a <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>b <span class="token operator">&amp;&amp;</span> c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

<span class="token function">onlyOne</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token function">onlyOne</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token function">onlyOne</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个<code v-pre>onlyOne(..)</code>工具应当仅在正好有一个参数是<code v-pre>true</code>/truthy 时返回<code v-pre>true</code>。它在 truthy 的检查上使用 <em>隐含的</em> 强制转换，而在其他的地方使用 <em>明确的</em> 强制转换，包括最后的返回值。</p>
<p>但如果我们需要这个工具能够以相同的方式处理四个，五个，或者二十个标志值呢？很难想象处理所有那些比较的排列组合的代码实现。</p>
<p>但这里是<code v-pre>boolean</code>值到<code v-pre>number</code>（很明显，<code v-pre>0</code>或<code v-pre>1</code>）的强制转换可以提供巨大帮助的地方：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">onlyOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 跳过falsy值。与将它们视为0相同，但是避开NaN</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>arguments<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      sum <span class="token operator">+=</span> arguments<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> sum <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

<span class="token function">onlyOne</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token function">onlyOne</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> b<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token function">onlyOne</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token function">onlyOne</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> b<span class="token punctuation">,</span> b<span class="token punctuation">,</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 当然，除了在<code v-pre>onlyOne(..)</code>中的<code v-pre>for</code>循环，你可以更简洁地使用 ES5 的<code v-pre>reduce(..)</code>工具，但我不想因此而模糊概念。</p>
<p>我们在这里做的事情有赖于<code v-pre>true</code>/truthy 的强制转换结果为<code v-pre>1</code>，并将它们作为数字加起来。<code v-pre>sum += arguments[i]</code>通过 <em>隐含的</em> 强制转换使这发生。如果在<code v-pre>arguments</code>列表中有且仅有一个值为<code v-pre>true</code>，那么这个数字的和将是<code v-pre>1</code>，否则和就不是<code v-pre>1</code>而不能使期望的条件成立。</p>
<p>我们当然本可以使用 <em>明确的</em> 强制转换：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">onlyOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    sum <span class="token operator">+=</span> <span class="token function">Number</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token operator">!</span>arguments<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> sum <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先使用<code v-pre>!!arguments[i]</code>来将这个值强制转换为<code v-pre>true</code>或<code v-pre>false</code>。这样你就可以像<code v-pre>onlyOne( &quot;42&quot;, 0 )</code>这样传入非<code v-pre>boolean</code>值了，而且它依然可以如意料的那样工作（要不然，你将会得到<code v-pre>string</code>连接，而且逻辑也不正确）。</p>
<p>一旦我们确认它是一个<code v-pre>boolean</code>，我们就使用<code v-pre>Number(..)</code>进行另一个 <em>明确的</em> 强制转换来确保值是<code v-pre>0</code>或<code v-pre>1</code>。</p>
<p>这个工具的 <em>明确</em> 强制转换形式“更好”吗？它确实像代码注释中解释的那样避开了<code v-pre>NaN</code>的陷阱。但是，这最终要看你的需要。我个人认为前一个版本，依赖于 <em>隐含的</em> 强制转换更优雅（如果你不传入<code v-pre>undefined</code>或<code v-pre>NaN</code>），而 <em>明确的</em> 版本是一种不必要的繁冗。</p>
<p>但与我们在这里讨论的几乎所有东西一样，这是一个主观判断。</p>
<p><strong>注意：</strong> 不管是 <em>隐含的</em> 还是 <em>明确的</em> 方式，你可以通过将最后的比较从<code v-pre>1</code>改为<code v-pre>2</code>或<code v-pre>5</code>，来分别很容易地制造<code v-pre>onlyTwo(..)</code>或<code v-pre>onlyFive(..)</code>。这要比添加一大堆<code v-pre>&amp;&amp;</code>和<code v-pre>||</code>表达式要简单太多了。所以，一般来说，在这种情况下强制转换非常有用。</p>
<h3 id="隐含地-boolean" tabindex="-1"><a class="header-anchor" href="#隐含地-boolean" aria-hidden="true">#</a> 隐含地：* --&gt; Boolean</h3>
<p>现在，让我们将注意力转向目标为<code v-pre>boolean</code>值的 <em>隐含</em> 强制转换上，这是目前最常见，并且还是目前潜在的最麻烦的一种。</p>
<p>记住，<em>隐含的</em> 强制转换是当你以强制一个值被转换的方式使用这个值时才启动的。对于数字和<code v-pre>string</code>操作，很容易就能看出这种强制转换是如何发生的。</p>
<p>但是，哪个种类的表达式操作（<em>隐含地</em>）要求/强制一个<code v-pre>boolean</code>转换呢？</p>
<ol>
<li>在一个<code v-pre>if (..)</code>语句中的测试表达式。</li>
<li>在一个<code v-pre>for ( .. ; .. ; .. )</code>头部的测试表达式（第二个子句）。</li>
<li>在<code v-pre>while (..)</code>和<code v-pre>do..while(..)</code>循环中的测试表达式。</li>
<li>在<code v-pre>? :</code>三元表达式中的测试表达式（第一个子句）。</li>
<li><code v-pre>||</code>（“逻辑或”）和<code v-pre>&amp;&amp;</code>（“逻辑与”）操作符左手边的操作数（它用作测试表达式 —— 见下面的讨论！）。</li>
</ol>
<p>在这些上下文环境中使用的，任何还不是<code v-pre>boolean</code>的值，将通过本章早先讲解的<code v-pre>ToBoolean</code>抽象操作的规则，被 <em>隐含地</em> 强制转换为一个<code v-pre>boolean</code>。</p>
<p>我们来看一些例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token string">"abc"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c<span class="token punctuation">;</span>
<span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"yep"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// yep</span>
<span class="token punctuation">}</span>

<span class="token keyword">while</span> <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"nope, never runs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

c <span class="token operator">=</span> d <span class="token operator">?</span> a <span class="token operator">:</span> b<span class="token punctuation">;</span>
c<span class="token punctuation">;</span> <span class="token comment">// "abc"</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>a <span class="token operator">&amp;&amp;</span> d<span class="token punctuation">)</span> <span class="token operator">||</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"yep"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// yep</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在所有这些上下文环境中，非<code v-pre>boolean</code>值被 <em>隐含地强制转换</em> 为它们的<code v-pre>boolean</code>等价物，来决定测试的结果。</p>
<h3 id="和-操作符" tabindex="-1"><a class="header-anchor" href="#和-操作符" aria-hidden="true">#</a> <code v-pre>||</code>和<code v-pre>&amp;&amp;</code>操作符</h3>
<p>很可能你已经在你用过的大多数或所有其他语言中见到过<code v-pre>||</code>（“逻辑或”）和<code v-pre>&amp;&amp;</code>（“逻辑与”）操作符了。所以假设它们在 JavaScript 中的工作方式和其他类似的语言基本上相同是很自然的。</p>
<p>这里有一个鲜为人知的，但很重要的，微妙细节。</p>
<p>其实，我会争辩这些操作符甚至不应当被称为“逻辑__操作符”，因为这样的名称没有完整地描述它们在做什么。如果让我给它们一个更准确的（也更蹩脚的）名称，我会叫它们“选择器操作符”或更完整的，“操作数选择器操作符”。</p>
<p>为什么？因为在 JavaScript 中它们实际上不会得出一个 <em>逻辑</em> 值（也就是<code v-pre>boolean</code>），这与它们在其他的语言中的表现不同。</p>
<p>那么它们到底得出什么？它们得出两个操作数中的一个（而且仅有一个）。换句话说，<strong>它们在两个操作数的值中选择一个</strong>。</p>
<p>引用 ES5 语言规范的 11.11 部分：</p>
<blockquote>
<p>一个&amp;&amp;或||操作符产生的值不见得是 Boolean 类型。这个产生的值将总是两个操作数表达式其中之一的值。</p>
</blockquote>
<p>让我们展示一下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token string">"abc"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

a <span class="token operator">||</span> b<span class="token punctuation">;</span> <span class="token comment">// 42</span>
a <span class="token operator">&amp;&amp;</span> b<span class="token punctuation">;</span> <span class="token comment">// "abc"</span>

c <span class="token operator">||</span> b<span class="token punctuation">;</span> <span class="token comment">// "abc"</span>
c <span class="token operator">&amp;&amp;</span> b<span class="token punctuation">;</span> <span class="token comment">// null</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>等一下，什么！？</strong> 想一想。在像 C 和 PHP 这样的语言中，这些表达式结果为<code v-pre>true</code>或<code v-pre>false</code>，而在 JS 中（就此而言还有 Python 和 Ruby！），结果来自于值本身。</p>
<p><code v-pre>||</code>和<code v-pre>&amp;&amp;</code>操作符都在 <strong>第一个操作数</strong>（<code v-pre>a</code>或<code v-pre>c</code>） 上进行<code v-pre>boolean</code>测试。如果这个操作数还不是<code v-pre>boolean</code>（就像在这里一样），就会发生一次普通的<code v-pre>ToBoolean</code>强制转换，这样测试就可以进行了。</p>
<p>对于<code v-pre>||</code>操作符，如果测试结果为<code v-pre>true</code>，<code v-pre>||</code>表达式就将 <em>第一个操作数</em> 的值（<code v-pre>a</code>或<code v-pre>c</code>）作为结果。如果测试结果为<code v-pre>false</code>，<code v-pre>||</code>表达式就将 <em>第二个操作数</em> 的值（<code v-pre>b</code>）作为结果。</p>
<p>相反地，对于<code v-pre>&amp;&amp;</code>操作符，如果测试结果为<code v-pre>true</code>，<code v-pre>&amp;&amp;</code>表达式将 <em>第二个操作数</em> 的值（<code v-pre>b</code>）作为结果。如果测试结果为<code v-pre>false</code>，那么<code v-pre>&amp;&amp;</code>表达式就将 <em>第一个操作数</em> 的值（<code v-pre>a</code>或<code v-pre>c</code>）作为结果。</p>
<p><code v-pre>||</code>或<code v-pre>&amp;&amp;</code>表达式的结果总是两个操作数之一的底层值，<strong>不是</strong>（可能是被强制转换来的）测试的结果。在<code v-pre>c &amp;&amp; b</code>中，<code v-pre>c</code>是<code v-pre>null</code>，因此是 falsy。但是<code v-pre>&amp;&amp;</code>表达式本身的结果为<code v-pre>null</code>（<code v-pre>c</code>中的值），不是用于测试的强制转换来的<code v-pre>false</code>。</p>
<p>现在你明白这些操作符如何像“操作数选择器”一样工作了吗？</p>
<p>另一种考虑这些操作数的方式是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>a <span class="token operator">||</span> b<span class="token punctuation">;</span>
<span class="token comment">// 大体上等价于：</span>
a <span class="token operator">?</span> a <span class="token operator">:</span> b<span class="token punctuation">;</span>

a <span class="token operator">&amp;&amp;</span> b<span class="token punctuation">;</span>
<span class="token comment">// 大体上等价于：</span>
a <span class="token operator">?</span> b <span class="token operator">:</span> a<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 我说<code v-pre>a || b</code>“大体上等价”于<code v-pre>a ? a : b</code>，是因为虽然结果相同，但是这里有一个微妙的不同。在<code v-pre>a ? a : b</code>中，如果<code v-pre>a</code>是一个更复杂的表达式（例如像调用<code v-pre>function</code>那样可能带有副作用），那么这个表达式<code v-pre>a</code>将有可能被求值两次（如果第一次求值的结果为 truthy）。相比之下，对于<code v-pre>a || b</code>，表达式<code v-pre>a</code>仅被求值一次，而且这个值将被同时用于强制转换测试和结果值（如果合适的话）。同样的区别也适用于<code v-pre>a &amp;&amp; b</code>和<code v-pre>a ? b : a</code>表达式。</p>
<p>很有可能你在没有完全理解之前你就已经使用了这个行为的一个极其常见，而且很有帮助的用法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  a <span class="token operator">=</span> a <span class="token operator">||</span> <span class="token string">"hello"</span><span class="token punctuation">;</span>
  b <span class="token operator">=</span> b <span class="token operator">||</span> <span class="token string">"world"</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "hello world"</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token string">"yeah"</span><span class="token punctuation">,</span> <span class="token string">"yeah!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "yeah yeah!"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种<code v-pre>a = a || &quot;hello&quot;</code>惯用法（有时被说成 C#“null 合并操作符”的 JavaScript 版本）对<code v-pre>a</code>进行测试，如果它没有值（或仅仅是一个不期望的 falsy 值），就提供一个后备的默认值（<code v-pre>&quot;hello&quot;</code>）。</p>
<p>但是 <strong>要小心！</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token string">"That's it!"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "That's it! world" &lt;-- Oops!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>看到问题了吗？作为第二个参数的<code v-pre>&quot;&quot;</code>是一个 falsy 值（参见本章早先的<code v-pre>ToBoolean</code>），所以<code v-pre>b = b || &quot;world&quot;</code>测试失败，而默认值<code v-pre>&quot;world&quot;</code>被替换上来，即便本来的意图可能是想让明确传入的<code v-pre>&quot;&quot;</code>作为赋给<code v-pre>b</code>的值。</p>
<p>这种<code v-pre>||</code>惯用法极其常见，而且十分有用，但是你不得不只在 <em>所有的 falsy 值</em> 应当被跳过时使用它。不然，你就需要在你的测试中更加具体，而且可能应该使用一个<code v-pre>? :</code>三元操作符。</p>
<p>这种默认值赋值惯用法是如此常见（和有用！），以至于那些公开激烈诽谤 JavaScript 强制转换的人都经常在它们的代码中使用！</p>
<p>那么<code v-pre>&amp;&amp;</code>呢？</p>
<p>有另一种在手动编写中不那么常见，而在 JS 压缩器中频繁使用的惯用法。<code v-pre>&amp;&amp;</code>操作符会“选择”第二个操作数，当且仅当第一个操作数测试为 truthy，这种用法有时被称为“守护操作符”（参见第五章的“短接”） —— 第一个表达式的测试“守护”着第二个表达式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>

a <span class="token operator">&amp;&amp;</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>foo()</code>仅在<code v-pre>a</code>测试为 truthy 时会被调用。如果这个测试失败，这个<code v-pre>a &amp;&amp; foo()</code>表达式语句将会无声地停止 —— 这被称为“短接” —— 而且永远不会调用<code v-pre>foo()</code>。</p>
<p>重申一次，几乎很少有人手动编写这样的东西。通常，他们会写<code v-pre>if (a) { foo(); }</code>。但是 JS 压缩器选择<code v-pre>a &amp;&amp; foo()</code>是因为它短的多。所以，现在，如果你不得不解读这样的代码，你就知道它是在做什么以及为什么了。</p>
<p>好了，那么<code v-pre>||</code>和<code v-pre>&amp;&amp;</code>在它们的功能上有些不错的技巧，只要你乐意让 <em>隐含的</em> 强制转换掺和进来。</p>
<p><strong>注意：</strong> <code v-pre>a = b || &quot;something&quot;</code>和<code v-pre>a &amp;&amp; b()</code>两种惯用法都依赖于短接行为，我们将在第五章中讲述它的细节。</p>
<p>现在，这些操作符实际上不会得出<code v-pre>true</code>和<code v-pre>false</code>的事实可能使你的头脑有点儿混乱。你可能想知道，如果你的<code v-pre>if</code>语句和<code v-pre>for</code>循环包含<code v-pre>a &amp;&amp; (b || c)</code>这样的复合的逻辑表达式，它们到底都是怎么工作的。</p>
<p>别担心！天没塌下来。你的代码（可能）没有问题。你只是可能从来没有理解在这个符合表达式被求值 <strong>之后</strong>，有一个向<code v-pre>boolean</code> <em>隐含的</em> 强制转换发生了。</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token string">"foo"</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>b <span class="token operator">||</span> c<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"yep"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码将会像你总是认为的那样工作，除了一个额外的微妙细节。<code v-pre>a &amp;&amp; (b || c)</code>的结果 <em>实际上</em> 是<code v-pre>&quot;foo&quot;</code>，不是<code v-pre>true</code>。所以，这之后<code v-pre>if</code>语句强制值<code v-pre>&quot;foo&quot;</code>转换为一个<code v-pre>boolean</code>，这理所当然地将是<code v-pre>true</code>。</p>
<p>看到了？没有理由惊慌。你的代码可能依然是安全的。但是现在关于它在做什么和如何做，你知道了更多。</p>
<p>而且现在你理解了这样的代码使用 <em>隐含的</em> 强制转换。如果你依然属于“避开（隐含）强制转换阵营”，那么你就需要退回去并使所有这些测试 <em>明确</em>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token operator">!</span>a <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token operator">!</span>b <span class="token operator">||</span> <span class="token operator">!</span><span class="token operator">!</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"yep"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>祝你好运！...对不起，只是逗个乐儿。</p>
<h3 id="symbol-强制转换" tabindex="-1"><a class="header-anchor" href="#symbol-强制转换" aria-hidden="true">#</a> Symbol 强制转换</h3>
<p>在此为止，在 <em>明确的</em> 和 <em>隐含的</em> 强制转换之间几乎没有可以观察到的结果上的不同 —— 只有代码的可读性至关重要。</p>
<p>但是 ES6 的 Symbol 在强制转换系统中引入了一个我们需要简单讨论的坑。由于一个明显超出了我们将在本书中讨论的范围的原因，从一个<code v-pre>symbol</code>到一个<code v-pre>string</code>的 <em>明确</em> 强制转换是允许的，但是相同的 <em>隐含</em> 强制转换是不被允许的，而且会抛出一个错误。</p>
<p>考虑如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> s1 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">"cool"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">String</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "Symbol(cool)"</span>

<span class="token keyword">var</span> s2 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">"not cool"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
s2 <span class="token operator">+</span> <span class="token string">""</span><span class="token punctuation">;</span> <span class="token comment">// TypeError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>symbol</code>值根本不能强制转换为<code v-pre>number</code>（不论哪种方式都抛出错误），但奇怪的是它们既可以 <em>明确地</em> 也可以 <em>隐含地</em> 强制转换为<code v-pre>boolean</code>（总是<code v-pre>true</code>）。</p>
<p>一致性总是容易学习的，而对付例外从来就不有趣，但是我们只需要在 ES6<code v-pre>symbol</code>值和我们如何强制转换它们的问题上多加小心。</p>
<p>好消息：你需要强制转换一个<code v-pre>symbol</code>值的情况可能极其少见。它们典型的被使用的方式（见第三章）可能不会用到强制转换。</p>
<h2 id="宽松等价与严格等价" tabindex="-1"><a class="header-anchor" href="#宽松等价与严格等价" aria-hidden="true">#</a> 宽松等价与严格等价</h2>
<p>宽松等价是<code v-pre>==</code>操作符，而严格等价是<code v-pre>===</code>操作符。两个操作符都被用于比较两个值的“等价性”，但是“宽松”和“严格”暗示着它们行为之间的一个 <strong>非常重要</strong> 的不同，特别是在它们如何决定“等价性”上。</p>
<p>关于这两个操作符的一个非常常见的误解是：“<code v-pre>==</code>检查值的等价性，而<code v-pre>===</code>检查值和类型的等价性。”虽然这听起来很好很合理，但是不准确。无数知名的 JavaScript 书籍和文章都是这么说的，但不幸的是它们都 <em>错了</em>。</p>
<p>正确的描述是：“<code v-pre>==</code>允许在等价性比较中进行强制转换，而<code v-pre>===</code>不允许强制转换”。</p>
<h3 id="等价性的性能" tabindex="-1"><a class="header-anchor" href="#等价性的性能" aria-hidden="true">#</a> 等价性的性能</h3>
<p>停下来思考一下第一种（不正确的）解释和这第二种（正确的）解释的不同。</p>
<p>在第一种解释中，看起来<code v-pre>===</code>明显的要比<code v-pre>==</code><em>做更多工作</em>，因为它还必须检查类型。在第二种解释中，<code v-pre>==</code>是要 <em>做更多工作</em> 的，因为它不得不在类型不同时走过强制转换的步骤。</p>
<p>不要像许多人那样落入陷阱中，认为这会与性能有任何关系，虽然在这个问题上<code v-pre>==</code>好像要比<code v-pre>===</code>慢一些。强制转换确实要花费 <em>一点点</em> 处理时间，但也就是仅仅几微秒（是的，1 微秒就是一秒的百万分之一！）。</p>
<p>如果你比较同类型的两个值，<code v-pre>==</code>和<code v-pre>===</code>使用的是相同的算法，所以除了在引擎实现上的一些微小的区别，它们做的应当是相同的工作。</p>
<p>如果你比较两个不同类型的值，性能也不是重要因素。你应当问自己的是：当比较这两个值时，我想要进行强制转换吗？</p>
<p>如果你想要进行强制转换，使用<code v-pre>==</code>宽松等价，但如果你不想进行强制转换，就使用<code v-pre>===</code>严格等价。</p>
<p><strong>注意：</strong> 这里暗示<code v-pre>==</code>和<code v-pre>===</code>都会检查它们的操作数的类型。不同之处在于它们在类型不同时如何反应。</p>
<h3 id="抽象等价性" tabindex="-1"><a class="header-anchor" href="#抽象等价性" aria-hidden="true">#</a> 抽象等价性</h3>
<p>在 ES5 语言规范的 11.9.3 部分中，<code v-pre>==</code>操作符的行为被定义为“抽象等价性比较算法”。那里列出了一个详尽但简单的算法，它明确地指出了类型的每一种可能的组合，与对于每一种组合强制转化应当如何发生（如果有必要的话）。</p>
<p><strong>警告：</strong> 当（<em>隐含的</em>）强制转换被中伤为太过复杂和缺陷过多而不能成为 <em>有用的，好的部分</em> 时，遭到谴责的正是这些“抽象等价”规则。一般上，它们被认为对于开发者来说过于复杂和不直观而不能实际学习和应用，而且在 JS 程序中，和改善代码的可读性比起来，它倾向于导致更多的 bug。我相信这是一种有缺陷的预断 —— 读者都是整天都在写（而且读，理解）算法（也就是代码）的能干的开发者。所以，接下来的是用简单的词语来直白地解读“抽象等价性”。但我恳请你也去读一下 ES5 规范的 11.9.3 部分。我想你将会对它是多么合理而感到震惊。</p>
<p>基本上，它的第一个条款（11.9.3.1）是在说，如果两个被比较的值是同一类型，它们就像你期望的那样通过等价性简单自然地比较。比如，<code v-pre>42</code>只和<code v-pre>42</code>相等，而<code v-pre>&quot;abc&quot;</code>只和<code v-pre>&quot;abc&quot;</code>相等。</p>
<p>在一般期望的结果中，有一些例外需要小心：</p>
<ul>
<li><code v-pre>NaN</code>永远不等于它自己（见第二章）</li>
<li><code v-pre>+0</code>和<code v-pre>-0</code>是相等的（见第二章）</li>
</ul>
<p>条款 11.9.3.1 的最后一个规定是关于<code v-pre>object</code>（包括<code v-pre>function</code>和<code v-pre>array</code>）的<code v-pre>==</code>宽松相等性比较。这样的两个值仅在它们引用 <em>完全相同的值</em> 时 <em>相等</em>。这里没有强制转换发生。</p>
<p><strong>注意：</strong> <code v-pre>===</code>严格等价比较与 11.9.3.1 的定义一模一样，包括关于两个<code v-pre>object</code>的值的规定。很少有人知道，在两个<code v-pre>object</code>被比较的情况下，<strong><code v-pre>==</code>和<code v-pre>===</code>的行为相同</strong>！</p>
<p>11.9.3 算法中的剩余部分指出，如果你使用<code v-pre>==</code>宽松等价来比较两个不同类型的值，它们两者或其中之一将需要被 <em>隐含地</em> 强制转换。由于这个强制转换，两个值最终归于同一类型，可以使用简单的值的等价性来直接比较它们相等与否。</p>
<p><strong>注意：</strong> <code v-pre>!=</code>宽松不等价操作是如你预料的那样定义的，它差不多就是<code v-pre>==</code>比较操作完整实施，之后对结果取反。这对于<code v-pre>!==</code>严格不等价操作也是一样的。</p>
<h4 id="比较-string与number" tabindex="-1"><a class="header-anchor" href="#比较-string与number" aria-hidden="true">#</a> 比较：<code v-pre>string</code>与<code v-pre>number</code></h4>
<p>为了展示<code v-pre>==</code>强制转换，首先让我们建立本章中早先的<code v-pre>string</code>和<code v-pre>number</code>的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token string">"42"</span><span class="token punctuation">;</span>

a <span class="token operator">===</span> b<span class="token punctuation">;</span> <span class="token comment">// false</span>
a <span class="token operator">==</span> b<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们所预料的，<code v-pre>a === b</code>失败了，因为不允许强制转换，而且值<code v-pre>42</code>和<code v-pre>&quot;42&quot;</code>确实是不同的。</p>
<p>然而，第二个比较<code v-pre>a == b</code>使用了宽松等价，这意味着如果类型偶然不同，这个比较算法将会对两个或其中一个值实施 <em>隐含的</em> 强制转换。</p>
<p>那么这里发生的究竟是那种强制转换呢？是<code v-pre>a</code>的值变成了一个<code v-pre>string</code>，还是<code v-pre>b</code>的值<code v-pre>&quot;42&quot;</code>变成了一个<code v-pre>number</code>？</p>
<p>在 ES5 语言规范中，条款 11.9.3.4-5 说：</p>
<blockquote>
<ol start="4">
<li>如果 Type(x)是 Number 而 Type(y)是 String，
返回比较 x == ToNumber(y)的结果。</li>
<li>如果 Type(x)是 String 而 Type(y)是 Number，
返回比较 ToNumber(x) == y 的结果。</li>
</ol>
</blockquote>
<p><strong>警告：</strong> 语言规范中使用<code v-pre>Number</code>和<code v-pre>String</code>作为类型的正式名称，虽然这本书中偏好使用<code v-pre>number</code>和<code v-pre>string</code>指代基本类型。别让语言规范中首字母大写的<code v-pre>Number</code>与<code v-pre>Number()</code>原生函数把你给搞糊涂了。对于我们的目的来说，类型名称的首字母大写是无关紧要的 —— 它们基本上是同一个意思。</p>
<p>显然，语言规范说为了比较，将值<code v-pre>&quot;42&quot;</code>强制转换为一个<code v-pre>number</code>。这个强制转换如何进行已经在前面将结过了，明确地说就是通过<code v-pre>ToNumber</code>抽象操作。在这种情况下十分明显，两个值<code v-pre>42</code>是相等的。</p>
<h4 id="比较-任何东西与boolean" tabindex="-1"><a class="header-anchor" href="#比较-任何东西与boolean" aria-hidden="true">#</a> 比较：任何东西与<code v-pre>boolean</code></h4>
<p>当你试着将一个值直接与<code v-pre>true</code>或<code v-pre>false</code>相比较时，你会遇到<code v-pre>==</code>宽松等价的 <em>隐含</em> 强制转换中最大的一个坑。</p>
<p>考虑如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"42"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

a <span class="token operator">==</span> b<span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等一下，这里发生了什么！？我们知道<code v-pre>&quot;42&quot;</code>是一个 truthy 值（见本章早先的部分）。那么它和<code v-pre>true</code>怎么不是<code v-pre>==</code>宽松等价的？</p>
<p>其中的原因既简单又刁钻得使人迷惑。它是如此的容易让人误解，许多 JS 开发者从来不会花费足够多的精力来完全掌握它。</p>
<p>让我们再次引用语言规范，条款 11.9.3.6-7</p>
<blockquote>
<ol start="6">
<li>如果 Type(x)是 Boolean，
返回比较 ToNumber(x) == y 的结果。</li>
<li>如果 Type(y)是 Boolean，
返回比较 x == ToNumber(y) 的结果。</li>
</ol>
</blockquote>
<p>我们来把它分解。首先：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> y <span class="token operator">=</span> <span class="token string">"42"</span><span class="token punctuation">;</span>

x <span class="token operator">==</span> y<span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Type(x)</code>确实是<code v-pre>Boolean</code>，所以它会实施<code v-pre>ToNumber(x)</code>，将<code v-pre>true</code>强制转换为<code v-pre>1</code>。现在，<code v-pre>1 == &quot;42&quot;</code>会被求值。这里面的类型依然不同，所以（实质上是递归地）我们再次向早先讲解过的算法求解，它将<code v-pre>&quot;42&quot;</code>强制转换为<code v-pre>42</code>，而<code v-pre>1 == 42</code>明显是<code v-pre>false</code>。</p>
<p>反过来，我们任然得到相同的结果：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token string">"42"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> y <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

x <span class="token operator">==</span> y<span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次<code v-pre>Type(y)</code>是<code v-pre>Boolean</code>，所以<code v-pre>ToNumber(y)</code>给出<code v-pre>0</code>。<code v-pre>&quot;42&quot; == 0</code>递归地变为<code v-pre>42 == 0</code>，这当然是<code v-pre>false</code>。</p>
<p>换句话说，<strong>值<code v-pre>&quot;42&quot;</code>既不<code v-pre>== true</code>也不<code v-pre>== false</code></strong>。猛地一看，这看起来像句疯话。一个值怎么可能既不是 truthy 也不是 falsy 呢？</p>
<p>但这就是问题所在！你在问一个完全错误的问题。但这确实不是你的错，你的大脑在耍你。</p>
<p><code v-pre>&quot;42&quot;</code>的确是 truthy，但是<code v-pre>&quot;42&quot; == true</code>根本就 <strong>不是在进行一个 boolean 测试/强制转换</strong>，不管你的大脑怎么说，<code v-pre>&quot;42&quot;</code> <em>没有</em> 被强制转换为一个<code v-pre>boolean</code>（<code v-pre>true</code>），而是<code v-pre>true</code>被强制转换为一个<code v-pre>1</code>，而后<code v-pre>&quot;42&quot;</code>被强制转换为<code v-pre>42</code>。</p>
<p>不管我们喜不喜欢，<code v-pre>ToBoolean</code>甚至都没参与到这里，所以<code v-pre>&quot;42&quot;</code>的真假是与<code v-pre>==</code>操作无关的！</p>
<p>而有关的是要理解<code v-pre>==</code>比较算法对所有不同类型组合如何动作。当<code v-pre>==</code>的任意一边是一个<code v-pre>boolean</code>值时，<code v-pre>boolean</code>总是首先被强制转换为一个<code v-pre>number</code>。</p>
<p>如果这对你来讲很奇怪，那么你不是一个人。我个人建议永远，永远，不要在任何情况下，使用<code v-pre>== true</code>或<code v-pre>== false</code>。永远。</p>
<p>但时要记住，我在此说的仅与<code v-pre>==</code>有关。<code v-pre>=== true</code>和<code v-pre>=== false</code>不允许强制转换，所以它们没有<code v-pre>ToNumber</code>强制转换，因而是安全的。</p>
<p>考虑如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"42"</span><span class="token punctuation">;</span>

<span class="token comment">// 不好（会失败的！）：</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>

<span class="token comment">// 也不该（会失败的！）：</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">===</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>

<span class="token comment">// 足够好（隐含地工作）：</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>

<span class="token comment">// 更好（明确地工作）：</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token operator">!</span>a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>

<span class="token comment">// 也很好（明确地工作）：</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你在你的代码中一直避免使用<code v-pre>== true</code>或<code v-pre>== false</code>（也就是与<code v-pre>boolean</code>的宽松等价），你将永远不必担心这种真/假的思维陷阱。</p>
<h4 id="比较-null与undefined" tabindex="-1"><a class="header-anchor" href="#比较-null与undefined" aria-hidden="true">#</a> 比较：<code v-pre>null</code>与<code v-pre>undefined</code></h4>
<p>另一个 <em>隐含</em> 强制转换的例子可以在<code v-pre>null</code>和<code v-pre>undefined</code>值之间的<code v-pre>==</code>宽松等价中看到。又再一次引述 ES5 语言规范，条款 11.9.3.2-3：</p>
<blockquote>
<ol start="2">
<li>如果 x 是 null 而 y 是 undefined，返回 true。</li>
<li>如果 x 是 undefined 而 y 是 null，返回 true。</li>
</ol>
</blockquote>
<p>当使用<code v-pre>==</code>宽松等价比较<code v-pre>null</code>和<code v-pre>undefined</code>，它们是互相等价（也就是互相强制转换）的，而且在整个语言中不会等价于其他值了。</p>
<p>这意味着<code v-pre>null</code>和<code v-pre>undefined</code>对于比较的目的来说，如果你使用<code v-pre>==</code>宽松等价操作符来允许它们互相 <em>隐含地</em> 强制转换的话，它们可以被认为是不可区分的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b<span class="token punctuation">;</span>

a <span class="token operator">==</span> b<span class="token punctuation">;</span> <span class="token comment">// true</span>
a <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
b <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

a <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
b <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
a <span class="token operator">==</span> <span class="token string">""</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
b <span class="token operator">==</span> <span class="token string">""</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
a <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
b <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>null</code>和<code v-pre>undefined</code>之间的强制转换是安全且可预见的，而且在这样的检查中没有其他的值会给出测试成立的误判。我推荐使用这种强制转换来允许<code v-pre>null</code>和<code v-pre>undefined</code>是不可区分的，如此将它们作为相同的值对待。</p>
<p>比如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>a == null</code>检查仅在<code v-pre>doSomething()</code>返回<code v-pre>null</code>或者<code v-pre>undefined</code>时才会通过，而在任何其他值的情况下将会失败，即便是<code v-pre>0</code>，<code v-pre>false</code>，和<code v-pre>&quot;&quot;</code>这样的 falsy 值。</p>
<p>这个检查的 <em>明确</em> 形式 —— 不允许任何强制转换 —— （我认为）没有必要地难看太多了（而且性能可能有点儿不好！）：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">||</span> a <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我看来，<code v-pre>a == null</code>的形式是另一个用 <em>隐含</em> 强制转换增进了代码可读性的例子，而且是以一种可靠安全的方式。</p>
<h4 id="比较-object与非object" tabindex="-1"><a class="header-anchor" href="#比较-object与非object" aria-hidden="true">#</a> 比较：<code v-pre>object</code>与非<code v-pre>object</code></h4>
<p>如果一个<code v-pre>object</code>/<code v-pre>function</code>/<code v-pre>array</code>被与一个简单基本标量（<code v-pre>string</code>，<code v-pre>number</code>，或<code v-pre>boolean</code>）进行比较，ES5 语言规范在条款 11.9.3.8-9 中这样说道：</p>
<blockquote>
<ol start="8">
<li>如果 Type(x)是一个 String 或者 Number 而 Type(y)是一个 Object，
返回比较 x == ToPrimitive(y) 的结果。</li>
<li>如果 Type(x)是一个 Object 而 Type(y)是 String 或者 Number，
返回比较 ToPrimitive(x) == y 的结果。</li>
</ol>
</blockquote>
<p><strong>注意：</strong> 你可能注意到了，这些条款仅提到了<code v-pre>String</code>和<code v-pre>Number</code>，而没有<code v-pre>Boolean</code>。这是因为，正如我们早先引述的，条款 11.9.3.6-7 首先将任何出现的<code v-pre>Boolean</code>操作数强制转换为一个<code v-pre>Number</code>。</p>
<p>考虑如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">42</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

a <span class="token operator">==</span> b<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值<code v-pre>[ 42 ]</code>的<code v-pre>ToPrimitive</code>抽象操作（见先前的“抽象值操作”部分）被调用，结果为值<code v-pre>&quot;42&quot;</code>。这里它就变为<code v-pre>42 == &quot;42&quot;</code>，我们已经讲解过这将变为<code v-pre>42 == 42</code>，所以<code v-pre>a</code>和<code v-pre>b</code>被认为是强制转换地等价。</p>
<p><strong>提示：</strong> 我们在本章早先讨论过的<code v-pre>ToPrimitive</code>抽象操作的所以奇怪之处（<code v-pre>toString()</code>，<code v-pre>valueOf()</code>），都在这里如你期望的那样适用。如果你有一个复杂的数据结构，而且你想在它上面定义一个<code v-pre>valueOf()</code>方法来为等价比较提供一个简单值的话，这将十分有用。</p>
<p>在第三章中，我们讲解了“拆箱”，就是一个基本类型值的<code v-pre>object</code>包装器（例如<code v-pre>new String(&quot;abc&quot;)</code>这样的形式）被展开，其底层的基本类型值（<code v-pre>&quot;abc&quot;</code>）被返回。这种行为与<code v-pre>==</code>算法中的<code v-pre>ToPrimitive</code>强制转换有关：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"abc"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token function">Object</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 与`new String( a )`相同</span>

a <span class="token operator">===</span> b<span class="token punctuation">;</span> <span class="token comment">// false</span>
a <span class="token operator">==</span> b<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>a == b</code>为<code v-pre>true</code>是因为<code v-pre>b</code>通过<code v-pre>ToPrimitive</code>强制转换为它的底层简单基本标量值<code v-pre>&quot;abc&quot;</code>，它与<code v-pre>a</code>中的值是相同的。</p>
<p>然而由于<code v-pre>==</code>算法中的其他覆盖规则，有些值是例外。考虑如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token function">Object</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 与`Object()`相同</span>
a <span class="token operator">==</span> b<span class="token punctuation">;</span> <span class="token comment">// false</span>

<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token function">Object</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 与`Object()`相同</span>
c <span class="token operator">==</span> d<span class="token punctuation">;</span> <span class="token comment">// false</span>

<span class="token keyword">var</span> e <span class="token operator">=</span> <span class="token number">NaN</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> f <span class="token operator">=</span> <span class="token function">Object</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 与`new Number( e )`相同</span>
e <span class="token operator">==</span> f<span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值<code v-pre>null</code>和<code v-pre>undefined</code>不能被装箱 —— 它们没有等价的对象包装器 —— 所以<code v-pre>Object(null)</code>就像<code v-pre>Object()</code>一样，它们都仅仅产生一个普通对象。</p>
<p><code v-pre>NaN</code>可以被封箱到它等价的<code v-pre>Number</code>对象包装器中，当<code v-pre>==</code>导致拆箱时，比较<code v-pre>NaN == NaN</code>会失败，因为<code v-pre>NaN</code>永远不会它自己相等（见第二章）。</p>
<h3 id="边界情况" tabindex="-1"><a class="header-anchor" href="#边界情况" aria-hidden="true">#</a> 边界情况</h3>
<p>现在我们已经彻底检视了<code v-pre>==</code>宽松等价的 <em>隐含</em> 强制转换是如何工作的（从合理与惊讶两个方式），让我们召唤角落中最差劲儿的，最疯狂的情况，这样我们就能看到我们需要避免什么来防止被强制转换的 bug 咬到。</p>
<p>首先，让我们检视修改内建的原生 prototype 是如何产生疯狂的结果的：</p>
<h4 id="一个拥有其他值的数字将会" tabindex="-1"><a class="header-anchor" href="#一个拥有其他值的数字将会" aria-hidden="true">#</a> 一个拥有其他值的数字将会……</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Number</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">valueOf</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">new</span> <span class="token class-name">Number</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>警告：</strong> <code v-pre>2 == 3</code>不会掉到这个陷阱中，这是由于<code v-pre>2</code>和<code v-pre>3</code>都不会调用内建的<code v-pre>Number.prototype.valueOf()</code>方法，因为它们已经是基本<code v-pre>number</code>值，可以直接比较。然而，<code v-pre>new Number(2)</code>必须通过<code v-pre>ToPrimitive</code>强制转换，因此调用<code v-pre>valueOf()</code>。</p>
<p>邪恶吧？当然。任何人都不应当做这样的事情。你 <em>可以</em> 这么做，这个事实有时被当成批评强制转换和<code v-pre>==</code>的根据。但这种沮丧是被误导的。JavaScript 不会因为你能做这样的事情而 <em>不好</em>，是 <strong>做这样的事的开发者</strong> <em>不好</em>。不要陷入“我的编程语言应当保护我不受我自己伤害”的谬论。</p>
<p>接下来，让我们考虑另一个刁钻的例子，它将前一个例子的邪恶带到另一个水平：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">==</span> <span class="token number">2</span> <span class="token operator">&amp;&amp;</span> a <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可能认为这是不可能的，因为<code v-pre>a</code>绝不会 <em>同时</em> 等于<code v-pre>2</code>和<code v-pre>3</code>。但是“同时”是不准确的，因为第一个表达式<code v-pre>a == 2</code>严格地发生在<code v-pre>a == 3</code> <em>之前</em>。</p>
<p>那么，要是我们让<code v-pre>a.valueOf()</code>在每次被调用时拥有一种副作用，使它第一次被调用时返回<code v-pre>2</code>而第二次被调用时返回<code v-pre>3</code>呢？很简单：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token class-name">Number</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">valueOf</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> i<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Number</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">==</span> <span class="token number">2</span> <span class="token operator">&amp;&amp;</span> a <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Yep, this happened."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重申一次，这些都是邪恶的技巧。不要这么做。也不要用它们来抱怨强制转换。潜在地滥用一种机制并不是谴责这种机制的充分证据。避开这些疯狂的技巧，并坚持强制转换的合法与合理的用法就好了。</p>
<h4 id="false-y-比较" tabindex="-1"><a class="header-anchor" href="#false-y-比较" aria-hidden="true">#</a> False-y 比较</h4>
<p>关于<code v-pre>==</code>比较中 <em>隐含</em> 强制转换的最常见的抱怨，来自于 falsy 值互相比较时它们如何令人吃惊地动作。</p>
<p>为了展示，让我们看一个关于 falsy 值比较的极端例子的列表，来瞧瞧哪一个是合理的，哪一个是麻烦的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">"0"</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token string">"0"</span> <span class="token operator">==</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token string">"0"</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token string">"0"</span> <span class="token operator">==</span> <span class="token number">NaN</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token string">"0"</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token string">"0"</span> <span class="token operator">==</span> <span class="token string">""</span><span class="token punctuation">;</span> <span class="token comment">// false</span>

<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token number">NaN</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token string">""</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// false</span>

<span class="token string">""</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token string">""</span> <span class="token operator">==</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token string">""</span> <span class="token operator">==</span> <span class="token number">NaN</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token string">""</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token string">""</span> <span class="token operator">==</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token string">""</span> <span class="token operator">==</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// false</span>

<span class="token number">0</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token number">0</span> <span class="token operator">==</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token number">0</span> <span class="token operator">==</span> <span class="token number">NaN</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token number">0</span> <span class="token operator">==</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token number">0</span> <span class="token operator">==</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这 24 个比较的类表中，17 个是十分合理和可预见的。比如，我们知道<code v-pre>&quot;&quot;</code>和<code v-pre>&quot;NaN&quot;</code>是根本不可能相等的值，并且它们确实不会强制转换以成为宽松等价的，而<code v-pre>&quot;0&quot;</code>和<code v-pre>0</code>是合理等价的，而且确实强制转换为宽松等价。</p>
<p>然而，这些比较中的 7 个被标上了“噢！”。作为误判的成立，它们更像是会将你陷进去的坑。<code v-pre>&quot;&quot;</code>和<code v-pre>0</code>绝对是有区别的不同的值，而且你很少会将它们作为等价的，所以它们的互相强制转换是一种麻烦。注意这里没有任何误判的不成立。</p>
<h4 id="疯狂的情况" tabindex="-1"><a class="header-anchor" href="#疯狂的情况" aria-hidden="true">#</a> 疯狂的情况</h4>
<p>但是我们不必停留在此。我们可以继续寻找更能引起麻烦的强制转换：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>噢，这看起来像是更高层次的疯狂，对吧！？你的大脑可能会欺骗你说，你在将一个 truthy 和 falsy 值比较，所以结果<code v-pre>true</code>是令人吃惊的，因为我们知道一个值不可能同时为 truthy 和 falsy！</p>
<p>但这不是实际发生的事情。让我们把它分解一下。我们了解<code v-pre>!</code>一元操作符吧？它明确地使用<code v-pre>ToBoolean</code>规则将操作数强制转换为一个<code v-pre>boolean</code>（而且它还会翻转真假性）。所以在<code v-pre>[] == ![]</code>执行之前，它实际上已经被翻译为了<code v-pre>[] == false</code>。我们已将在上面的列表中见过了这种形式（<code v-pre>false == []</code>），所以它的令人吃惊的结果对我们来说并不 <em>新鲜</em>。</p>
<p>其它的极端情况呢？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token number">2</span> <span class="token operator">==</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token string">""</span> <span class="token operator">==</span> <span class="token punctuation">[</span><span class="token keyword">null</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在关于<code v-pre>ToNumber</code>的讨论中我们说过，右手边的<code v-pre>[2]</code>和<code v-pre>[null]</code>值将会通过一个<code v-pre>ToPrimitive</code>强制转换，以使我们可以方便地与左手边的简单基本类型值进行比较。因为<code v-pre>array</code>值的<code v-pre>valueOf()</code>只是返回<code v-pre>array</code>本身，强制转换会退到<code v-pre>array</code>的字符串化上。</p>
<p>对于第一个比较的右手边的值来说，<code v-pre>[2]</code>将变为<code v-pre>&quot;2&quot;</code>，然后它会<code v-pre>ToNumber</code>强制转换为<code v-pre>2</code>。<code v-pre>[null]</code>就直接变成<code v-pre>&quot;&quot;</code>。</p>
<p>那么，<code v-pre>2 == 2</code>和<code v-pre>&quot;&quot; == &quot;&quot;</code>是完全可以理解的。</p>
<p>如果你的直觉依然不喜欢这个结果，那么你的沮丧实际上与你可能认为的强制转换无关。这其实是在抱怨<code v-pre>array</code>值在强制转换为<code v-pre>string</code>值时的默认<code v-pre>ToPrimitive</code>行为。很可能，你只是希望<code v-pre>[2].toString()</code>不返回<code v-pre>&quot;2&quot;</code>，或者<code v-pre>[null].toString()</code>不返回<code v-pre>&quot;&quot;</code>。</p>
<p>但是这些<code v-pre>string</code>强制转换到底 <em>应该</em> 得出什么结果？对于<code v-pre>[2]</code>的<code v-pre>string</code>强制转换，除了<code v-pre>&quot;2&quot;</code>我确实想不出来其他合适的结果，也许是<code v-pre>&quot;[2]&quot;</code> —— 但这可能会在其他的上下文中很奇怪！</p>
<p>你可以正确地制造另一个例子：因为<code v-pre>String(null)</code>变成了<code v-pre>&quot;null&quot;</code>，那么<code v-pre>String([null])</code>也应当变成<code v-pre>&quot;null&quot;</code>。这是个合理的断言。所以，它才是真正的犯人。</p>
<p><em>隐含</em> 强制转换在这里并不邪恶。即使一个从<code v-pre>[null]</code>到<code v-pre>string</code>结果为<code v-pre>&quot;&quot;</code>的 <em>明确</em> 强制转换也不。真正奇怪的是，<code v-pre>array</code>值字符串化为它们内容的等价物是否有道理，和它是如何发生的。所以，应当将你沮丧的原因指向<code v-pre>String( [..] )</code>的规则，因为这里才是疯狂起源的地方。也许根本就不应该有<code v-pre>array</code>的字符串化强制转换？但这会在语言的其他部分造成许多的缺点。</p>
<p>另一个常被引用的著名的坑是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token number">0</span> <span class="token operator">==</span> <span class="token string">"\n"</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们早先讨论的空<code v-pre>&quot;&quot;</code>，<code v-pre>&quot;\n&quot;</code>（或<code v-pre>&quot; &quot;</code>，或其他任何空格的组合）是通过<code v-pre>ToNumber</code>强制转换的，而且结果为<code v-pre>0</code>。你还希望空格被转换为其他的什么<code v-pre>number</code>值呢？<em>明确的</em> <code v-pre>Number()</code>给出<code v-pre>0</code>会困扰你吗？</p>
<p>空字符串和空格字符串可以转换为的，另一个真正唯一合理的<code v-pre>number</code>值是<code v-pre>NaN</code>。但这 <em>真的</em> 会更好吗？<code v-pre>&quot; &quot; == NaN</code>的比较当然会失败，但是不清楚我们是否真的 <em>修正</em> 了任何底层的问题。</p>
<p>真实世界中的 JS 程序由于<code v-pre>0 == &quot;\n&quot;</code>而失败的几率非常之低，而且这样的极端用例很容比避免。</p>
<p>在任何语言中，类型转换 <strong>总是</strong> 有极端用例 —— 强制转换也不例外。这里讨论的是特定的一组极端用例的马后炮，但不是针对强制转换整体而言的争论。</p>
<p>底线：你可能遇到的几乎所有 <em>普通值</em> 间的疯狂强制转换（除了像早先那样有意而为的<code v-pre>valueOf()</code>或<code v-pre>toString()</code>黑科技），都能归结为我们在上面指出的 7 中情况的短列表。</p>
<p>对比这 24 个疑似强制转换的坑，考虑另一个像这样的列表：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token number">42</span> <span class="token operator">==</span> <span class="token string">"43"</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token string">"foo"</span> <span class="token operator">==</span> <span class="token number">42</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token string">"true"</span> <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// false</span>

<span class="token number">42</span> <span class="token operator">==</span> <span class="token string">"42"</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token string">"foo"</span> <span class="token operator">==</span> <span class="token punctuation">[</span><span class="token string">"foo"</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这些非 falsy，非极端的用例中（而且我们简直可以向这个列表中添加无限多个比较），强制转换完全是安全，合理，和可解释的。</p>
<h4 id="可行性检查" tabindex="-1"><a class="header-anchor" href="#可行性检查" aria-hidden="true">#</a> 可行性检查</h4>
<p>好的，当我们深入观察 <em>隐含的</em> 强制转换时，我确实找到了一些疯狂的东西。难怪大多数开发者声称强制转换是邪恶而且应该避开的，对吧？</p>
<p>但是让我们退一步并做一下可行性检查。</p>
<p>通过大量比较，我们得到了一张 7 个麻烦的，坑人的强制转换的列表，但我们还得到了另一张（至少 17 个，但实际上有无限多个）完全正常和可以解释的强制转换的列表。</p>
<p>如果你在寻找一本“把孩子和洗澡水一起泼出去”的教科书，这就是了：由于一个仅有 7 个坑的列表，而抛弃整个强制转换（安全且有效的行为的无限大列表）。</p>
<p>一个更谨慎的反应是问，“我如何使用强制转换的 <em>好的部分</em>，而避开这几个 <em>坏的部分</em> 呢？”</p>
<p>让我们再看一次这个 <em>坏</em> 列表：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">"0"</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token string">""</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token string">""</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token string">""</span> <span class="token operator">==</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token number">0</span> <span class="token operator">==</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个列表中 7 个项目的 4 个与<code v-pre>== false</code>比较有关，我们早先说过你应当 <strong>总是，总是</strong> 避免的。</p>
<p>现在这个列表缩小到了 3 个项目。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">""</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token string">""</span> <span class="token operator">==</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
<span class="token number">0</span> <span class="token operator">==</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// true -- 噢！</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些是你在一般的 JavaScript 程序中使用的合理的强制转换吗？在什么条件下它们会发生？</p>
<p>我不认为你在程序里有很大的可能要在一个<code v-pre>boolean</code>测试中使用<code v-pre>== []</code>，至少在你知道自己在做什么的情况下。你可能会使用<code v-pre>== &quot;&quot;</code>或<code v-pre>== 0</code>，比如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">==</span> <span class="token string">""</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ..</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你偶然调用了<code v-pre>doSomething(0)</code>或<code v-pre>doSomething([])</code>，你就会吓一跳。另一个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">==</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ..</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再一次，如果你调用<code v-pre>doSomething(&quot;&quot;,0)</code>或<code v-pre>doSomething([],&quot;&quot;)</code>时，它们会失败。</p>
<p>所以，虽然这些强制转换会咬到你的情况 <em>可能</em> 存在，而且你会小心地处理它们，但是它们可能不会在你的代码库中超级常见。</p>
<h4 id="安全地使用隐含强制转换" tabindex="-1"><a class="header-anchor" href="#安全地使用隐含强制转换" aria-hidden="true">#</a> 安全地使用隐含强制转换</h4>
<p>我能给你的最重要的建议是：检查你的程序，并推理什么样的值会出现在<code v-pre>==</code>比较两边。为了避免这样的比较中的问题，这里有一些可以遵循的启发性规则：</p>
<ol>
<li>如果比较的任意一边可能出现<code v-pre>true</code>或者<code v-pre>false</code>值，那么就永远，永远不要使用<code v-pre>==</code>。</li>
<li>如果比较的任意一边可能出现<code v-pre>[]</code>，<code v-pre>&quot;&quot;</code>，或<code v-pre>0</code>这些值，那么认真地考虑不使用<code v-pre>==</code>。</li>
</ol>
<p>在这些场景中，为了避免不希望的强制转换，几乎可以确定使用<code v-pre>===</code>要比使用<code v-pre>==</code>好。遵循这两个简单的规则，可以有效地避免几乎所有可能会伤害你的强制转换的坑。</p>
<p><strong>在这些情况下，使用更加明确/繁冗的方式会减少很多使你头疼的东西。</strong></p>
<p><code v-pre>==</code>与<code v-pre>===</code>的问题其实可以更加恰当地表述为：你是否应当在比较中允许强制转换？</p>
<p>在许多情况下这样的强制转换会很有用，允许你更简练地表述一些比较逻辑（例如，<code v-pre>null</code>和<code v-pre>undefined</code>）。</p>
<p>对于整体来说，相对有几个 <em>隐含</em> 强制转换会真的很危险的情况。但是在这些地方，为了安全起见，绝对要使用<code v-pre>===</code>。</p>
<p><strong>提示：</strong> 另一个强制转换保证 <em>不会</em> 咬到你的地方是<code v-pre>typeof</code>操作符。<code v-pre>typeof</code>总是将返回给你 7 中字符串之一（见第一章），它们中没有一个是空<code v-pre>&quot;&quot;</code>字符串。这样，检查某个值的类型时不会有任何情况与 <em>隐含</em> 强制转换相冲突。<code v-pre>typeof x == &quot;function&quot;</code>就像<code v-pre>typeof x === &quot;function&quot;</code>一样 100%安全可靠。从字面意义上将，语言规范说这种情况下它们的算法是相同的。所以，不要只是因为你的代码工具告诉你这么做，或者（最差劲儿的）在某本书中有人告诉你 <strong>不要考虑它</strong>，而盲目地到处使用<code v-pre>===</code>。你掌管着你的代码的质量。</p>
<p><em>隐含</em> 强制转换是邪恶和危险的吗？在几个情况下，是的，但总体说来，不是。</p>
<p>做一个负责任和成熟的开发者。学习如何有效并安全地使用强制转换（<em>明确的</em> 和 <em>隐含的</em> 两者）的力量。并教你周围的人也这么做。</p>
<p>这里是由 Alex Dorey (@dorey on GitHub)制作的一个方便的表格，将各种比较进行了可视化：</p>
<img src="@source/you-dont-know-js/assets/types-grammar-1.png" width="600">
<p>【source】：<a href="https://github.com/dorey/JavaScript-Equality-Table" target="_blank" rel="noopener noreferrer">https://github.com/dorey/JavaScript-Equality-Table<ExternalLinkIcon/></a></p>
<h2 id="抽象关系比较" tabindex="-1"><a class="header-anchor" href="#抽象关系比较" aria-hidden="true">#</a> 抽象关系比较</h2>
<p>虽然这部分的 <em>隐含</em> 强制转换经常不为人所注意，但无论如何考虑比较<code v-pre>a &lt; b</code>时发生了什么是很重要的（和我们如何深入检视<code v-pre>a == b</code>类似）。</p>
<p>在 ES5 语言规范的 11.8.5 部分的“抽象关系型比较”算法，实质上把自己分成了两个部分：如果比较涉及两个<code v-pre>string</code>值要做什么（后半部分），和除此之外的其他值要做什么（前半部分）。</p>
<p><strong>注意：</strong> 这个算法仅仅定义了<code v-pre>a &lt; b</code>。所以，<code v-pre>a &gt; b</code>作为<code v-pre>b &lt; a</code>处理。</p>
<p>这个算法首先在两个值上调用<code v-pre>ToPrimitive</code>强制转换，如果两个调用的返回值之一不是<code v-pre>string</code>，那么就使用<code v-pre>ToNumber</code>操作规则将这两个值强制转换为<code v-pre>number</code>值，并进行数字的比较。</p>
<p>举例来说：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">42</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"43"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

a <span class="token operator">&lt;</span> b<span class="token punctuation">;</span> <span class="token comment">// true</span>
b <span class="token operator">&lt;</span> a<span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 早先讨论的关于<code v-pre>-0</code>和<code v-pre>NaN</code>在<code v-pre>==</code>算法中的类似注意事项也适用于这里。</p>
<p>然而，如果<code v-pre>&lt;</code>比较的两个值都是<code v-pre>string</code>的话，就会在字符上进行简单的字典顺序（自然的字母顺序）比较：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"42"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"043"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

a <span class="token operator">&lt;</span> b<span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>a</code>和<code v-pre>b</code> <em>不会</em> 被强制转换为<code v-pre>number</code>，因为它们会在两个<code v-pre>array</code>的<code v-pre>ToPrimitive</code>强制转换后成为<code v-pre>string</code>。所以，<code v-pre>&quot;42&quot;</code>将会与<code v-pre>&quot;043&quot;</code>一个字符一个字符地进行比较，从第一个字符开始，分别是<code v-pre>&quot;4&quot;</code>和<code v-pre>&quot;0&quot;</code>。因为<code v-pre>&quot;0&quot;</code>在字典顺序上 <em>小于</em> <code v-pre>&quot;4&quot;</code>，所以这个比较返回<code v-pre>false</code>。</p>
<p>完全相同的行为和推理也适用于：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

a <span class="token operator">&lt;</span> b<span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，<code v-pre>a</code>变成了<code v-pre>&quot;4,2&quot;</code>而<code v-pre>b</code>变成了<code v-pre>&quot;0,4,3&quot;</code>，而字典顺序比较和前一个代码段一模一样。</p>
<p>那么这个怎么样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">42</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">43</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

a <span class="token operator">&lt;</span> b<span class="token punctuation">;</span> <span class="token comment">// ??</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>a &lt; b</code>也是<code v-pre>false</code>，因为<code v-pre>a</code>变成了<code v-pre>[object Object]</code>而<code v-pre>b</code>变成了<code v-pre>[object Object]</code>，所以明显地<code v-pre>a</code>在字典顺序上不小于<code v-pre>b</code>。</p>
<p>但奇怪的是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">42</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">43</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

a <span class="token operator">&lt;</span> b<span class="token punctuation">;</span> <span class="token comment">// false</span>
a <span class="token operator">==</span> b<span class="token punctuation">;</span> <span class="token comment">// false</span>
a <span class="token operator">></span> b<span class="token punctuation">;</span> <span class="token comment">// false</span>

a <span class="token operator">&lt;=</span> b<span class="token punctuation">;</span> <span class="token comment">// true</span>
a <span class="token operator">>=</span> b<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为什么<code v-pre>a == b</code>不是<code v-pre>true</code>？它们是相同的<code v-pre>string</code>值（<code v-pre>&quot;[object Object]&quot;</code>），所以看起来它们应当相等，对吧？不。回忆一下前面关于<code v-pre>==</code>如何与<code v-pre>object</code>引用进行工作的讨论。</p>
<p>那么为什么<code v-pre>a &lt;= b</code>和<code v-pre>a &gt;= b</code>的结果为<code v-pre>true</code>，如果<code v-pre>a &lt; b</code><strong>和</strong><code v-pre>a == b</code><strong>和</strong><code v-pre>a &gt; b</code>都是<code v-pre>false</code>？</p>
<p>因为语言规范说，对于<code v-pre>a &lt;= b</code>，它实际上首先对<code v-pre>b &lt; a</code>求值，然后反转那个结果。因为<code v-pre>b &lt; a</code><em>也是</em><code v-pre>false</code>，所以<code v-pre>a &lt;= b</code>的结果为<code v-pre>true</code>。</p>
<p>到目前为止你解释<code v-pre>&lt;=</code>在做什么的方式可能是：“小于 <em>或</em> 等于”。而这可能完全相反，JS 更准确地将<code v-pre>&lt;=</code>考虑为“不大于”（<code v-pre>!(a &gt; b)</code>，JS 将它作为<code v-pre>(!b &lt; a)</code>）。另外，<code v-pre>a &gt;= b</code>被解释为它首先被考虑为<code v-pre>b &lt;= a</code>，然后实施相同的推理。</p>
<p>不幸的是，没有像等价那样的“严格的关系型比较”。换句话说，没有办法防止<code v-pre>a &lt; b</code>这样的关系型比较发生 <em>隐含的</em> 强制转换，除非在进行比较之前就明确地确保<code v-pre>a</code>和<code v-pre>b</code>是同种类型。</p>
<p>使用与我们早先<code v-pre>==</code>与<code v-pre>===</code>合理性检查的讨论相同的推理方法。如果强制转换有帮助并且合理安全，比如比较<code v-pre>42 &lt; &quot;43&quot;</code>，<strong>就使用它</strong>。另一方面，如果你需要在关系型比较上获得安全性，那么在使用<code v-pre>&lt;</code>（或<code v-pre>&gt;</code>）之前，就首先 <em>明确地强制转换</em> 这些值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">42</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token string">"043"</span><span class="token punctuation">;</span>

a <span class="token operator">&lt;</span> b<span class="token punctuation">;</span> <span class="token comment">// false -- 字符串比较！</span>
<span class="token function">Number</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">Number</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true -- 数字比较！</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复习" tabindex="-1"><a class="header-anchor" href="#复习" aria-hidden="true">#</a> 复习</h2>
<p>在这一章中，我们将注意力转向了 JavaScript 类型转换如何发生，也叫 <strong>强制转换</strong>，按性质来说它要么是 <em>明确的</em> 要么是 <em>隐含的</em>。</p>
<p>强制转换的名声很坏，但它实际上在许多情况下很有帮助。对于负责任的 JS 开发者来说，一个重要的任务就是花时间去学习强制转换的里里外外，来决定哪一部分将帮助他们改进代码，哪一部分他们真的应该回避。</p>
<p><em>明确的</em> 强制转换时这样一种代码，它很明显地有意将一个值从一种类型转换到另一种类型。它的益处是通过减少困惑来增强了代码的可读性和可维护性。</p>
<p><em>隐含的</em> 强制转换是作为一些其他操作的“隐藏的”副作用而存在的，将要发生的类型转换并不明显。虽然看起来 <em>隐含的</em> 强制转换是 <em>明确的</em> 反面，而且因此是不好的（确实，很多人这么认为！），但是实际上 <em>隐含的</em> 强制转换也是为了增强代码的可读性。</p>
<p>特别是对于 <em>隐含的</em>，强制转换必须被负责地，有意识地使用。懂得为什么你在写你正在写的代码，和它是如何工作的。同时也要努力编写其他人容易学习和理解的代码。</p>
</div></template>


