<template><div><h1 id="第2章-词法作用域" tabindex="-1"><a class="header-anchor" href="#第2章-词法作用域" aria-hidden="true">#</a> 第2章：词法作用域</h1>
<p>在第一章中，我们将“作用域”定义为一组规则，它主宰着 <em>引擎</em> 如何通过标识符名称在当前的 <em>作用域</em>，或者在包含它的任意 <em>嵌套作用域</em> 中来查询一个变量，</p>
<p>作用域的工作方式有两种占统治地位的模型。其中的第一种是最最常见，在绝大多数的编程语言中被使用的。它称为 <strong>词法作用域</strong>，我们将深入检视它。另一种仍然被一些语言（比如 Bash 脚本，Perl 中的一些模式，等等）使用的模型，称为 <strong>动态作用域</strong>。</p>
<p>动态作用域在附录 <code v-pre>A</code> 中讲解。我在这里提到它仅仅是为词法作用域提供一个对比，而词法作用域是 <code v-pre>JavaScript</code> 所采用的作用域模型。</p>
<h2 id="词法分析时" tabindex="-1"><a class="header-anchor" href="#词法分析时" aria-hidden="true">#</a> 词法分析时</h2>
<p>正如我们在第一章中讨论的，标准语言编译器的第一个工作流程称为词法分析（也就是分词）。如果你回忆一下，词法分析处理是检查一串源代码字符，并给 <code v-pre>token</code> 赋予语法含义作为某种有状态解析的输出。</p>
<p>正是这个概念给理解词法作用域是什么提供了基础，它也是这个名字的渊源。</p>
<p>要定义它有点儿兜圈子，<code v-pre>词法作用域</code>是在词法分析时被定义的作用域。换句话说，词法作用域是基于，你，在写程序时，变量和作用域的块儿在何处被编写决定的，因此它在词法分析器处理你的代码时（基本上）是固定不变的。</p>
<p><strong>注意：</strong> 我们将会稍稍看到有一些方法可以骗过词法作用域，从而在词法分析器处理过后改变它，但是这些方法都是使人皱眉头的。事实上公认的最佳实践是，将词法作用域看作是仅仅依靠词法的，因此自然而然地完全是编写时决定的。</p>
<p>让我们考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> b <span class="token operator">=</span> a <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">c</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">bar</span><span class="token punctuation">(</span>b <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2 4 12</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个代码实例中有三个固有的嵌套作用域。将这些作用域考虑为套在一起的气泡可能有助于思考。</p>
<img src="@source/you-dont-know-js/assets/scope-closures-fig2.png" width="500">
<p><strong>气泡 1</strong> 包围着全局作用域，它里面只有一个标识符：<code v-pre>foo</code>。</p>
<p><strong>气泡 2</strong> 包围着作用域 <code v-pre>foo</code>，它含有三个标识符：<code v-pre>a</code>，<code v-pre>bar</code> 和 <code v-pre>b</code>。</p>
<p><strong>气泡 3</strong> 包围着作用域 <code v-pre>bar</code>，它里面只包含一个标识符：<code v-pre>c</code>。</p>
<p>作用域气泡是根据作用域的块儿被写在何处定义的，一个嵌套在另一个内部，等等。在下一章中，我们将讨论作用域的不同单位，但是就现在来说，让我们认为每一个函数创建了一个新的作用域气泡。</p>
<p><code v-pre>bar</code> 的气泡完全被包含在 <code v-pre>foo</code> 的气泡中，因为（而且只因为）这就是我们选择定义函数 <code v-pre>bar</code> 的位置。</p>
<p>注意这些嵌套的气泡是严格嵌套的。我们没有讨论气泡可以跨越边界的维恩图（Venn diagrams）。换句话说，没有那个函数的气泡可以同时（部分地）存在于另外两个外部的作用域气泡中，就像没有函数可以部分地存在于它的两个父函数中一样。</p>
<h3 id="查询" tabindex="-1"><a class="header-anchor" href="#查询" aria-hidden="true">#</a> 查询</h3>
<p>这些作用域气泡的结构和相对位置完全解释了 <em>引擎</em> 在查找一个标识符时，它需要查看的所有地方。</p>
<p>在上面的代码段中，<em>引擎</em> 执行语句 <code v-pre>console.log(..)</code> 并开始查找三个被引用的变量 <code v-pre>a</code>，<code v-pre>b</code> 和 <code v-pre>c</code>。它首先从最内部的作用域气泡开始，也就是 <code v-pre>bar(..)</code> 函数的作用域。在这里它找不到 <code v-pre>a</code>，所以它向上走一层，到外面下一个最近的作用域气泡，<code v-pre>foo(..)</code> 的作用域。它在这里找到了 <code v-pre>a</code>，于是它就使用这个 <code v-pre>a</code>。同样的事情也发生在 <code v-pre>b</code> 身上。但是对于 <code v-pre>c</code>，它在 <code v-pre>bar(..)</code> 内部就找到了。</p>
<p>如果在 <code v-pre>bar(..)</code> 内部和 <code v-pre>foo(..)</code> 内部都有一个 <code v-pre>c</code>，那么 <code v-pre>console.log(..)</code> 语句将会找到并使用 <code v-pre>bar(..)</code> 中的那一个，绝不会到达 <code v-pre>foo(..)</code> 中的那一个。</p>
<p><strong>一旦找到第一个匹配，作用域查询就停止了</strong>。相同的标识符名称可以在嵌套作用域的多个层中被指定，这称为“遮蔽（shadowing）”（内部的标识符“遮蔽”了外部的标识符）。无论如何遮蔽，作用域查询总是从当前被执行的最内侧的作用域开始，向外/向上不断查找，直到第一个匹配才停止。</p>
<p><strong>注意：</strong> 全局变量也自动地是全局对象（在浏览器中是 <code v-pre>window</code>，等等）的属性，所以不直接通过全局变量的词法名称，而通过将它作为全局对象的一个属性引用来间接地引用，是可能的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>a<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种技术给出了访问全局变量的方法，没有它全局变量将因为被遮蔽而不可访问。然而，被遮蔽的非全局变量是无法访问的。</p>
<p>不管函数是从 <em>哪里</em> 被调用的，也不论它是 <em>如何</em> 被调用的，它的词法作用域是由这个函数被声明的位置 <strong>唯一</strong> 定义的。</p>
<p>词法作用域查询 <em>仅仅</em> 在处理头等标识符时实施，比如 <code v-pre>a</code>，<code v-pre>b</code>，和 <code v-pre>c</code>。如果你在一段代码中拥有一个 <code v-pre>foo.bar.baz</code> 的引用，词法作用域查询将在查找 <code v-pre>foo</code> 标识符时实施，但一旦定位这个变量，对象属性访问规则将会分别接管 <code v-pre>bar</code> 和 <code v-pre>baz</code> 属性的解析。</p>
<h2 id="欺骗词法作用域" tabindex="-1"><a class="header-anchor" href="#欺骗词法作用域" aria-hidden="true">#</a> 欺骗词法作用域</h2>
<p>如果词法作用域是由函数被声明的位置唯一定义的，而且这个位置完全是一个编写时的决定，那么怎么可能有办法在运行时“修改”（也就是，作弊欺骗）词法作用域呢？</p>
<p>JavaScript 有两种这样的机制。在广大的社区中它们都等同地被认为是让人皱眉头的，在你代码中使用它们是一种差劲儿的做法。但是关于它们的常见的争论经常错过了最重要的一点：<strong>欺骗词法作用域会导致更低下的性能。</strong></p>
<p>在我讲解性能的问题以前，先让我们看看这两种机制是如何工作的。</p>
<h3 id="eval" tabindex="-1"><a class="header-anchor" href="#eval" aria-hidden="true">#</a> <code v-pre>eval</code></h3>
<p>JavaScript 中的 <code v-pre>eval(..)</code> 函数接收一个字符串作为参数值，并将这个字符串的内容看作是好像它已经被实际编写在程序的那个位置上。换句话说，你可以用编程的方式在你编写好的代码内部生成代码，而且你可以运行这个生成的代码，就好像它在编写时就已经在那里了一样。</p>
<p>如果以这种观点来评价 <code v-pre>eval(..)</code>，那么 <code v-pre>eval(..)</code> 是如何允许你修改词法作用域环境应当是很清楚的：欺骗并假装这个编写时（也就是，词法）代码一直就在那里。</p>
<p>在 <code v-pre>eval(..)</code> 被执行的后续代码行中，<em>引擎</em> 将不会“知道”或“关心”前面的代码是被动态翻译的，而且因此修改了词法作用域环境。<em>引擎</em> 将会像它一直做的那样，简单地进行词法作用域查询。</p>
<p>考虑如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">eval</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 作弊！</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token string">"var b = 3;"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>eval(..)</code> 调用的位置上，字符串 <code v-pre>&quot;var b = 3&quot;</code> 被看作是一直就存在在那里的代码。因为这个代码恰巧声明了一个新的变量 <code v-pre>b</code>，它就修改了现存的 <code v-pre>foo(..)</code> 的词法作用域。事实上，就像上面提到的那样，这个代码实际上在 <code v-pre>foo(..)</code> 内部创建了变量 <code v-pre>b</code>，它遮蔽了声明在外部（全局）作用域中的 <code v-pre>b</code>。</p>
<p>当 <code v-pre>console.log(..)</code> 调用发生时，它会在 <code v-pre>foo(..)</code> 的作用域中找到 <code v-pre>a</code> 和 <code v-pre>b</code>，而且绝不会找到外部的 <code v-pre>b</code>。这样，我们就打印出 &quot;1 3&quot; 而不是一般情况下的 &quot;1 2&quot;。</p>
<p><strong>注意：</strong> 在这个例子中，为了简单起见，我们传入的“代码”字符串是固定的文字。但是它可以通过根据你的程序逻辑将字符拼接在一起，很容易地以编程方式创建。<code v-pre>eval(..)</code> 通常被用于执行动态创建的代码，因为动态地对一段实质上源自字符串字面值的静态代码进行求值，并不会比直接编写这样的代码带来更多真正的好处。</p>
<p>默认情况下，如果 <code v-pre>eval(..)</code> 执行的代码字符串包含一个或多个声明（变量或函数）的话，这个动作就会修改这个 <code v-pre>eval(..)</code> 所在的词法作用域。技术上讲，<code v-pre>eval(..)</code> 可以通过种种技巧（超出了我们这里的讨论范围）被“间接”调用，而使它在全局作用域的上下文中执行，以此修改全局作用域。但不论那种情况，<code v-pre>eval(..)</code> 都可以在运行时修改一个编写时的词法作用域。</p>
<p><strong>注意：</strong> 当 <code v-pre>eval(..)</code> 被用于一个操作它自己的词法作用域的 strict 模式程序时，在 <code v-pre>eval(..)</code> 内部做出的声明不会实际上修改包围它的作用域。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token string">"use strict"</span><span class="token punctuation">;</span>
  <span class="token function">eval</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError: a is not defined</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token string">"var a = 2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 JavaScript 中还有其他的工具拥有与 <code v-pre>eval(..)</code> 非常类似的效果。<code v-pre>setTimeout(..)</code> 和 <code v-pre>setInterval(..)</code> <em>可以</em> 为它们各自的第一个参数值接收一个字符串，其内容将会被 <code v-pre>eval</code> 为一个动态生成的函数的代码。这种老旧的，遗产行为早就被废弃了。别这么做！</p>
<p><code v-pre>new Function(..)</code> 函数构造器类似地为它的 <strong>最后</strong> 一个参数值接收一个代码字符串，来把它转换为一个动态生成的函数（前面的参数值，如果有的话，将作为新函数的形式参数）。这种函数构造器语法要比 <code v-pre>eval(..)</code> 稍稍安全一些，但在你的代码中它仍然应当被避免。</p>
<p>在你的代码中动态生成代码的用例少的不可思议，因为在性能上的倒退使得这种能力几乎总是得不偿失。</p>
<h3 id="with" tabindex="-1"><a class="header-anchor" href="#with" aria-hidden="true">#</a> <code v-pre>with</code></h3>
<p>JavaScript 的另一个使人皱眉头（而且现在被废弃了！），而且可以欺骗词法作用域的特性是 <code v-pre>with</code> 关键字。有许多种合法的方式可以讲解 <code v-pre>with</code>，但是我在此选择从它如何与词法作用域互动并影响词法作用域的角度来讲解它。</p>
<p>讲解 <code v-pre>with</code> 的常见方式是作为一种缩写，来引用一个对象的多个属性，而 <em>不必</em> 每次都重复对象引用本身。</p>
<p>例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">//  重复“obj”显得更“繁冗”</span>
obj<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>c <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>

<span class="token comment">// “更简单”的缩写</span>
<span class="token keyword">with</span> <span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  b <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
  c <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，这里发生的事情要比只是一个对象属性访问的便捷缩写要多得多。考虑如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">with</span> <span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> o1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> o2 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">foo</span><span class="token punctuation">(</span>o1<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>o1<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>

<span class="token function">foo</span><span class="token punctuation">(</span>o2<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>o2<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2 -- 哦，全局作用域被泄漏了！</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个代码示例中，创建了两个对象 <code v-pre>o1</code> 和 <code v-pre>o2</code>。一个有 <code v-pre>a</code> 属性，而另一个没有。<code v-pre>foo(..)</code> 函数接收一个对象引用 <code v-pre>obj</code> 作为参数值，并在这个引用上调用 <code v-pre>with (obj) {..}</code>。在 <code v-pre>with</code> 块儿内部，我们制造了一个变量 <code v-pre>a</code> 的看似是普通词法引用的东西，实际上是一个 LHS 引用（见第一章），并将值 <code v-pre>2</code> 赋予它。</p>
<p>当我们传入 <code v-pre>o1</code> 时，赋值 <code v-pre>a = 2</code> 找到属性 <code v-pre>o1.a</code> 并赋予它值 <code v-pre>2</code>，正如在后续的 <code v-pre>console.log(o1.a)</code> 语句中反映出的那样。然而，当我们传入 <code v-pre>o2</code>，因为它没有 <code v-pre>a</code> 属性，没有这样的属性被创建，所以 <code v-pre>o2.a</code> 还是 <code v-pre>undefined</code>。</p>
<p>但是之后我们注意到一个特别的副作用，赋值 <code v-pre>a = 2</code> 创建了一个全局变量 <code v-pre>a</code>。这怎么可能？</p>
<p><code v-pre>with</code> 语句接收一个对象，这个对象有 0 个或多个属性，并 <strong>将这个对象视为好像它是一个完全隔离的词法作用域</strong>，因此这个对象的属性被视为在这个“作用域”中词法定义的标识符。</p>
<p><strong>注意：</strong> 尽管一个 <code v-pre>with</code> 块儿将一个对象视为一个词法作用域，但是在 <code v-pre>with</code> 块儿内部的一个普通 <code v-pre>var</code> 声明将不会归于这个 <code v-pre>with</code> 块儿的作用域，而是归于包含它的函数作用域。</p>
<p>如果 <code v-pre>eval(..)</code> 函数接收一个含有一个或多个声明的代码字符串，它就会修改现存的词法作用域，而 <code v-pre>with</code> 语句实际上是从你传递给它的对象中凭空制造了一个 <strong>全新的词法作用域</strong>。</p>
<p>以这种方式理解的话，当我们传入 <code v-pre>o1</code> 时 <code v-pre>with</code> 语句声明的“作用域”就是 <code v-pre>o1</code>，而且这个“作用域”拥有一个对应于 <code v-pre>o1.a</code> 属性的“标识符”。但当我们使用 <code v-pre>o2</code> 作为“作用域”时，它里面没有这样的 <code v-pre>a</code> “标识符”，于是 LHS 标识符查询（见第一章）的普通规则发生了。</p>
<p>“作用域” <code v-pre>o2</code> 中没有，<code v-pre>foo(..)</code> 的作用域中也没有，甚至连全局作用域中都没有找到标识符 <code v-pre>a</code>，所以当 <code v-pre>a = 2</code> 被执行时，其结果就是自动全局变量被创建（因为我们没有在 strict 模式下）。</p>
<p><code v-pre>with</code> 在运行时将一个对象和它的属性转换为一个带有“标识符”的“作用域”，这个奇怪想法有些烧脑。但是对于我们看到的结果来说，这是我能给出的最清晰的解释。</p>
<p><strong>注意：</strong> 除了使用它们是个坏主意以外，<code v-pre>eval(..)</code> 和 <code v-pre>with</code> 都受 Strict 模式的影响（制约）。<code v-pre>with</code> 干脆就不允许使用，而虽然 <code v-pre>eval(..)</code> 还保有其核心功能，但各种间接形式的或不安全的 <code v-pre>eval(..)</code> 是不允许的。</p>
<h3 id="性能" tabindex="-1"><a class="header-anchor" href="#性能" aria-hidden="true">#</a> 性能</h3>
<p>通过在运行时修改，或创建新的词法作用域，<code v-pre>eval(..)</code> 和 <code v-pre>with</code> 都可以欺骗编写时定义的词法作用域。</p>
<p>你可能会问，那又有什么大不了的？如果它们提供了更精巧的功能和编码灵活性，那它们不是 <em>好的</em> 特性吗？<strong>不。</strong></p>
<p>JavaScript <em>引擎</em> 在编译阶段期行许多性能优化工作。其中的一些优化原理都归结为实质上在进行词法分析时可以静态地分析代码，并提前决定所有的变量和函数声明都在什么位置，这样在执行期间就可以少花些力气来解析标识符。</p>
<p>但如果 <em>引擎</em> 在代码中发现一个 <code v-pre>eval(..)</code> 或 <code v-pre>with</code>，它实质上就不得不 <em>假定</em> 自己知道的所有的标识符的位置可能是无效的，因为它不可能在词法分析时就知道你将会向<code v-pre>eval(..)</code>传递什么样的代码来修改词法作用域，或者你可能会向<code v-pre>with</code>传递的对象有什么样的内容来创建一个新的将被查询的词法作用域。</p>
<p>换句话说，悲观地看，如果 <code v-pre>eval(..)</code> 或 <code v-pre>with</code> 出现，那么它 <em>将</em> 做的几乎所有的优化都会变得没有意义，所以它就会简单地根本不做任何优化。</p>
<p>你的代码几乎肯定会趋于运行的更慢，只因为你在代码的任何地方引入了一个了 <code v-pre>eval(..)</code> 或 <code v-pre>with</code>。无论 <em>引擎</em> 将在努力限制这些悲观臆测的副作用上表现得多么聪明，<strong>都没有任何办法可以绕过这个事实：没有优化，代码就运行的更慢。</strong></p>
<h2 id="复习" tabindex="-1"><a class="header-anchor" href="#复习" aria-hidden="true">#</a> 复习</h2>
<p>词法作用域意味着作用域是由编写时函数被声明的位置的决策定义的。编译器的词法分析阶段实质上可以知道所有的标识符是在哪里和如何声明的，并如此在执行期间预测它们将如何被查询。</p>
<p>在 JavaScript 中有两种机制可以“欺骗”词法作用域：<code v-pre>eval(..)</code> 和 <code v-pre>with</code>。前者可以通过对一个拥有一个或多个声明的“代码”字符串进行求值，来（在运行时）修改现存的词法作用域。后者实质上是通过将一个对象引用看作一个“作用域”，并将这个对象的属性看作作用域中的标识符，（同样，也是在运行时）创建一个全新的词法作用域。</p>
<p>这些机制的缺点是，它压制了 <em>引擎</em> 在作用域查询上进行编译期优化的能力，因为 <em>引擎</em> 不得不悲观地假定这样的优化是无效的。这两种特性的结果就是代码 <em>将</em> 会运行的更慢。<strong>不要使用它们。</strong></p>
</div></template>


