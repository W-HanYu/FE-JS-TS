<template><div><h2 id="第1章-作用域是什么" tabindex="-1"><a class="header-anchor" href="#第1章-作用域是什么" aria-hidden="true">#</a> 第1章：作用域是什么？</h2>
<h3 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h3>
<p>几乎所有的编程语言最基本的功能之一，就是能够存储变量当中的值，并且能在之后对这个值进行访问与修改。事实上，正是这种存储和访问变量的值的能力将<code v-pre>状态</code>带给了程序。
<code v-pre>状态</code>这个概念很重要，程序虽然没有状态可以执行一些简单的任务，但它会受到高度的限制🚫，会显得很无趣。
有个问题就是：将这个<code v-pre>变量</code>引入程序会有几个问题；</p>
<ul>
<li>这些变量将会住在哪里？</li>
<li>程序如何找到它们？</li>
</ul>
<p>这些问题说明需要一套设计良好的规则来存储变量，并且之后可以方便的找到这些变量，我们将这些规则称为<code v-pre>作用域</code>。</p>
<h3 id="_1-1-编译原理" tabindex="-1"><a class="header-anchor" href="#_1-1-编译原理" aria-hidden="true">#</a> 1.1 编译原理</h3>
<p>尽管通常将javascript 归类为 <code v-pre>动态</code> 或者 <code v-pre>解释执行</code> 语言，但事实上它是一门 <code v-pre>编译语言</code>。
但是呢，<strong>与传统的编译语言不同，它不是提前编译的，编译结果也不能在分布式系统中进行移植</strong></p>
<p>尽管如此，javascript引擎进行编译的步骤会让传统的编译语言极其相似，在某些环节上可能比预想的要复杂。
在传统的编译型语言处理中，一块儿源代码，你的程序，在它被执行 之前 通常将会经历三个步骤，大致被称为“编译”：</p>
<ul>
<li><strong>分词/词法分析</strong>： 将一连串字符打断成（对于语言来说）有意义的片段，称为 <code v-pre>token</code>（记号）。举例来说，考虑这段程序：<code v-pre>var a = 2</code>;。这段程序很可能会被打断成如下 token：<code v-pre>var</code>，<code v-pre>a</code>，<code v-pre>=</code>，<code v-pre>2</code>，和<code v-pre> </code>;。空格也许会被保留为一个 token，这要看它是否是有意义的。</li>
</ul>
<p><strong>注意</strong>： 分词和词法分析之间的区别是微妙和学术上的，其中心在于这些 token 是否以 <code v-pre>无状态</code> 或 <code v-pre>有状态</code> 的方式被识别。简而言之，如果分词器去调用有状态的解析规则来弄清<code v-pre>a</code>是否应当被考虑为一个不同的 token，还是只是其他 token 的一部分，那么这就是 <code v-pre>词法分析</code>。</p>
<ul>
<li><strong>解析</strong>： 将一个 token 的流（数组）转换为一个嵌套元素的树，它综合地表示了程序的语法结构。这棵树称为“<code v-pre>抽象语法树</code>”（AST —— Abstract Syntax Tree）。</li>
</ul>
<p><code v-pre>var a = 2</code>; 的树也许开始于称为 <code v-pre>VariableDeclaration（变量声明）</code>顶层节点，带有一个称为 <code v-pre>Identifier</code>（标识符）的子节点（它的值为 a），和另一个称为 <code v-pre>AssignmentExpression</code>（赋值表达式）的子节点，而这个子节点本身带有一个称为 <code v-pre>NumericLiteral</code>（数字字面量）的子节点（它的值为2）。</p>
<ul>
<li><strong>代码生成</strong>： 这个处理将抽象语法树转换为可执行的代码。这一部分将根据语言，它的目标平台等因素有很大的不同。</li>
</ul>
<p>所以，与其深陷细节，我们不如笼统地说，有一种方法将我们上面描述的 <code v-pre>var a = 2</code>; 的抽象语法树转换为机器指令，来实际上 创建 一个称为 <code v-pre>a </code>的变量（包括分配内存等等），然后在<code v-pre>a</code>中存入一个值。</p>
<p><strong>注意</strong>： 引擎如何管理系统资源的细节远比我们要挖掘的东西深刻，所以我们将理所当然地认为引擎有能力按其需要创建和存储变量。</p>
<p>和大多数其他语言的编译器一样，JavaScript 引擎要比这区区三步复杂太多了。例如，在解析和代码生成的处理中，一定会存在优化执行效率的步骤，包括压缩冗余元素，等等。</p>
<p>所以，我在此描绘的只是大框架。但是我想你很快就会明白为什么我们涵盖的这些细节是重要的，虽然是在很高的层次上。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>其一，JavaScript 引擎没有（像其他语言的编译器那样）大把的时间去优化，因为 JavaScript 的编译和其他语言不同，不是提前发生在一个构建的步骤中。

对 JavaScript 来说，在许多情况下，编译发生在代码被执行前的仅仅几微秒之内（或更少！）。为了确保最快的性能，JS 引擎将使用所有的招数（比如 JIT，它可以懒编译甚至是热编译，等等），而这远超出了我们关于“作用域”的讨论。

为了简单起见，我们可以说，任何 JavaScript 代码段在它执行之前（通常是 刚好 在它执行之前！）都必须被编译。所以，JS 编译器将把程序 <span class="token variable"><span class="token variable">`</span>var a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span><span class="token variable">`</span></span> 拿过来，并首先编译它，然后准备运行它，通常是立即的
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-理解作用域" tabindex="-1"><a class="header-anchor" href="#_1-2-理解作用域" aria-hidden="true">#</a> 1.2 理解作用域</h3>
<p>我们将会以人物对话的方式来学习作用域，谁？如何？对话呢？</p>
<h4 id="_1-2-1-演员" tabindex="-1"><a class="header-anchor" href="#_1-2-1-演员" aria-hidden="true">#</a> 1.2.1 演员</h4>
<p>首先我们看看程序处理 <code v-pre>var a = 2</code>; 时进行互动的演员吧，这样我们就能理解稍后它们的对话：</p>
<ul>
<li>
<p><strong>引擎</strong>：负责从头到尾的编译和执行我们的 JavaScript 程序。</p>
</li>
<li>
<p><strong>编译器</strong>：引擎 的朋友之一；处理所有的解析和代码生成的脏活累活（见前一节）。</p>
</li>
<li>
<p><strong>作用域</strong>：引擎 的另一个朋友；负责收集并维护一张所有被声明的标识符（变量）的列表，并对当前执行中的代码如何访问这些变量强制实施一组严格的规则。</p>
</li>
</ul>
<p>为了 全面理解 JavaScript 是如何工作的，你需要开始像 引擎（和它的朋友们）那样 思考，问它们问的问题，并像它们一样回答。</p>
<h4 id="_1-2-2-对话" tabindex="-1"><a class="header-anchor" href="#_1-2-2-对话" aria-hidden="true">#</a> 1.2.2 对话</h4>
<p>当你看到程序 <code v-pre>var a = 2</code>; 时，你很可能认为它是一个语句。但这不是我们的新朋友 <code v-pre>引擎</code> 所看到的。事实上，引擎 看到<code v-pre>两个不同的语句</code>，一个是 编译器 将在编译期间处理的，一个是 引擎 将在执行期间处理的。</p>
<p>那么，让我们来分析 引擎 和它的朋友们将如何处理程序 <code v-pre>var a = 2</code>;。</p>
<p>编译器 将对这个程序做的第一件事情，是进行词法分析来将它分解为一系列 token，然后这些 token 被解析为一棵树。但是当 编译器 到了代码生成阶段时，它会以一种与我们可能想象的不同的方式来对待这段程序。</p>
<p>一个合理的假设是，编译器 将产生的代码可以用这种假想代码概括：“为一个变量分配内存，将它标记为 <code v-pre>a</code>，然后将值 <code v-pre>2</code> 贴在这个变量里”。不幸的是，这不是十分准确。</p>
<p>编译器 将会这样处理：</p>
<ol>
<li>
<p>遇到 <code v-pre>var a</code>，编译器 让 作用域 去查看对于这个特定的作用域集合，变量 <code v-pre>a</code> 是否已经存在了。如果是，编译器 就忽略这个声明并继续前进。否则，编译器 就让 作用域 去为这个作用域集合声明一个称为 <code v-pre>a</code> 的新变量。</p>
</li>
<li>
<p>然后 编译器 为 引擎 生成稍后要执行的代码，来处理赋值 <code v-pre>a = 2</code>。引擎 运行的代码首先让 作用域 去查看在当前的作用域集合中是否有一个称为 <code v-pre>a</code> 的变量可以访问。如果有，引擎 就使用这个变量。如果没有，引擎 就查看 其他地方（参见下面的嵌套 作用域 一节）。</p>
</li>
</ol>
<p>如果 <em>引擎</em> 最终找到一个变量，它就将值 <code v-pre>2 </code>赋予它。如果没有，引擎 将会举起它的手并大喊一声：<code v-pre>出错啦~~</code>！</p>
<p><strong>总结来说</strong>：对于一个变量赋值，发生了两个不同的动作：第一，<em>编译器</em> 声明一个变量（如果先前没有在当前作用域中声明过），第二，当执行时，引擎 在 <em>作用域</em> 中查询这个变量，如果找到的话给它赋值。</p>
<h4 id="_1-2-3-编译器想对你说" tabindex="-1"><a class="header-anchor" href="#_1-2-3-编译器想对你说" aria-hidden="true">#</a> 1.2.3 编译器想对你说</h4>
<p>为了继续更深入地理解，我们需要一点儿更多的编译器术语。</p>
<p>当 <em>引擎</em> 执行 <em>编译器</em> 在第二步为它产生的代码时，它必须查询变量 <code v-pre>a</code> 来看它是否已经被声明过了，而且这个查询是咨询 <em>作用域</em> 的。但是 <em>引擎</em> 所实施的查询的类型会影响查询的结果。</p>
<p>在我们这个例子中，<em>引擎</em> 将会对变量 <code v-pre>a</code> 实施一个“LHS”查询。另一种类型的查询称为“RHS”。</p>
<p>我打赌你能猜出“L”和“R”是什么意思。这两个术语表示“Left-hand Side（左手边）”和“Right-hand Side（右手边）”</p>
<p>什么的……边？<strong>赋值操作的。</strong></p>
<p>换言之，当一个变量出现在赋值操作的左手边时，会进行 LHS 查询，当一个变量出现在赋值操作的右手边时，会进行 RHS 查询。</p>
<p>实际上，我们可以表述得更准确一点儿。对于我们的目的来说，一个 RHS 是难以察觉的，因为它简单地查询某个变量的值，而 LHS 查询是试着找到变量容器本身，以便它可以赋值。从这种意义上说，RHS 的含义实质上不是 <em>真正的</em> “一个赋值的右手边”，更准确地说，它只是意味着“不是左手边”。</p>
<p>在这一番油腔滑调之后，你也可以认为“RHS”意味着“取得他/她的源（值）”，暗示着 RHS 的意思是“去取……的值”。</p>
<p>让我们挖掘得更深一些。</p>
<p>当我说：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个指向 <code v-pre>a</code> 的引用是一个 RHS 引用，因为这里没有东西被赋值给 <code v-pre>a</code>。而是我们在查询 <code v-pre>a</code> 并取得它的值，这样这个值可以被传递进 <code v-pre>console.log(..)</code>。</p>
<p>作为对比：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里指向 <code v-pre>a</code> 的引用是一个 LHS 引用，因为我们实际上不关心当前的值是什么，我们只是想找到这个变量，将它作为 <code v-pre>= 2</code> 赋值操作的目标。</p>
<p><strong>注意：</strong> LHS 和 RHS 意味着“赋值的左/右手边”未必像字面上那样意味着“ <code v-pre>=</code> 赋值操作符的左/右边”。赋值有几种其他的发生形式，所以最好在概念上将它考虑为：“赋值的目标（LHS）”和“赋值的源（RHS）”。</p>
<p>考虑这段程序，它既有 LHS 引用又有 RHS 引用：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用 <code v-pre>foo(..)</code> 的最后一行作为一个函数调用要求一个指向 <code v-pre>foo</code> 的 RHS 引用，意味着，“去查询 <code v-pre>foo</code> 的值，并把它交给我”。另外，<code v-pre>(..)</code> 意味着 <code v-pre>foo</code> 的值应当被执行，所以它最好实际上是一个函数！</p>
<p>这里有一个微妙但重要的赋值。<strong>你发现了吗？</strong></p>
<p>你可能错过了这个代码段隐含的 <code v-pre>a = 2</code>。它发生在当值 <code v-pre>2</code> 作为参数值传递给 <code v-pre>foo(..)</code> 函数时，值 <code v-pre>2</code> <strong>被赋值</strong> 给了参数 <code v-pre>a</code>。为了（隐含地）给参数 <code v-pre>a</code> 赋值，进行了一个 LHS 查询。</p>
<p>这里还有一个 <code v-pre>a</code> 的值的 RHS 引用，它的结果值被传入 <code v-pre>console.log(..)</code>。<code v-pre>console.log(..)</code> 需要一个引用来执行。它为 <code v-pre>console</code> 对象进行一个 RHS 查询，然后发生一个属性解析来看它是否拥有一个称为 <code v-pre>log</code> 的方法。</p>
<p>最后，我们可以将这一过程概念化为，在将值 <code v-pre>2</code>（通过变量 <code v-pre>a</code> 的 RHS 查询得到的）传入 <code v-pre>log(..)</code> 时发生了一次 LHS/RHS 的交换。在 <code v-pre>log(..)</code> 的原生实现内部，我们可以假定它拥有参数，其中的第一个（也许被称为 <code v-pre>arg1</code>）在 <code v-pre>2</code> 被赋值给它之前，进行了一次 LHS 引用查询。</p>
<p><strong>注意：</strong> 你可能会试图将函数声明 <code v-pre>function foo(a) {...</code> 概念化为一个普通的变量声明和赋值，比如 <code v-pre>var foo</code> 和 <code v-pre>foo = function(a){...</code>。这样做会诱使你认为函数声明涉及了一次 LHS 查询。</p>
<p>然而，一个微妙但重要的不同是，在这种情况下 <em>编译器</em> 在代码生成期间同时处理声明和值的定义，如此当 <em>引擎</em> 执行代码时，没有必要将一个函数值“赋予” <code v-pre>foo</code>。因此，将函数声明考虑为一个我们在这里讨论的 LHS 查询赋值是不太合适的。</p>
<h4 id="_1-2-4-引擎与作用域聊天" tabindex="-1"><a class="header-anchor" href="#_1-2-4-引擎与作用域聊天" aria-hidden="true">#</a> 1.2.4 引擎与作用域聊天</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们将上面的（处理这个代码段的）交互想象为一场对话。这场对话将会有点儿像这样进行：</p>
<blockquote>
<p><strong><em>引擎</em></strong>：嘿， <em>作用域</em>，我有一个 <code v-pre>foo</code> 的 RHS 引用。听说过它吗？</p>
<p><strong><em>作用域</em></strong>；别说，我还真见过它。<em>编译器</em> 那小子刚才声明了它。它是一个函数，给你。</p>
<p><strong><em>引擎</em></strong>：哥们挺够意思呀！好的，我要执行 <code v-pre>foo</code> 了。</p>
<p><strong><em>引擎</em></strong>：<em>作用域</em>，我得到了一个 <code v-pre>a</code> 的 LHS 引用，听说过它吗？</p>
<p><strong><em>作用域</em></strong>：哈哈哈，是的，听说过。<em>编译器</em> 刚才将它声明为 <code v-pre>foo</code> 的一个正式参数了。给你。</p>
<p><strong><em>引擎</em></strong>：一如既往的给力，<em>作用域</em>。再次感谢你。现在，该把 <code v-pre>2</code> 赋值给 <code v-pre>a</code> 了。</p>
<p><strong><em>引擎</em></strong>：<em>作用域</em>，很抱歉又一次打扰你。我需要 RHS 查询 <code v-pre>console</code>。听说过它吗？</p>
<p><strong><em>作用域</em></strong>：没关系，咋俩谁更谁呀，<em>引擎</em>，我一天就是干这个的呢。是的，我得到 <code v-pre>console</code> 了。它是一个内建对象。给你。</p>
<p><strong><em>引擎</em></strong>：完美。查找 <code v-pre>log(..)</code>。好的，很好，它是一个函数。</p>
<p><strong><em>引擎</em></strong>：<em>作用域</em>。你能帮我查一下 <code v-pre>a</code> 的 RHS 引用吗？我想我记得它，但只是想再次确认一下。</p>
<p><strong><em>作用域</em></strong>：你是对的，<em>引擎</em>。同一个家伙，没变。给你。</p>
<p><strong><em>引擎</em></strong>：酷。传递 <code v-pre>a</code> 的值，也就是 <code v-pre>2</code>，给 <code v-pre>log(..)</code>。</p>
<p>...</p>
</blockquote>
<h4 id="_1-2-5-小测验" tabindex="-1"><a class="header-anchor" href="#_1-2-5-小测验" aria-hidden="true">#</a> 1.2.5 小测验</h4>
<p>检查你到目前为止的理解，让你来扮演角色： <em>引擎</em>，并与 <em>作用域</em> “对话”：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> b <span class="token operator">=</span> a<span class="token punctuation">;</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p>找到所有的 LHS 查询（有 3 处！）。</p>
</li>
<li>
<p>找到所有的 RHS 查询（有 4 处！）。</p>
</li>
</ol>
<details class="custom-container details"><summary>答案</summary>
<ol>
<li>
<p>找出所有的 LHS 查询（有 3 处！）。</p>
<p><strong><code v-pre>c = ..</code>, <code v-pre>a = 2</code>（隐含的参数赋值）和 <code v-pre>b = ..</code></strong></p>
</li>
<li>
<p>找出所有的 RHS 查询（有 4 处！）。</p>
<p><strong><code v-pre>foo(2..</code>, <code v-pre>= a;</code>, <code v-pre>a + ..</code> 和 <code v-pre>.. + b</code></strong></p>
</li>
</ol>
</details>
<h3 id="_1-3-作用域嵌套" tabindex="-1"><a class="header-anchor" href="#_1-3-作用域嵌套" aria-hidden="true">#</a> 1.3 作用域嵌套</h3>
<p>我们说过 <em>作用域</em> 是通过标识符名称查询变量的一组规则。但是，通常会有多于一个的 <em>作用域</em> 需要考虑。</p>
<p>就像一个代码块儿或函数被嵌套在另一个代码块儿或函数中一样，作用域被嵌套在其他的作用域中。所以，如果在直接作用域中找不到一个变量的话，<em>引擎</em> 就会咨询下一个外层作用域，如此继续直到找到这个变量或者到达最外层作用域（也就是全局作用域）。</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>b</code> 的 RHS 引用不能在函数 <code v-pre>foo</code> 的内部被解析，但是可以在它的外围 <em>作用域</em>（这个例子中是全局作用域）中解析。</p>
<p>所以，回顾 <em>引擎</em> 和 <em>作用域</em> 的对话，我们会听到：</p>
<blockquote>
<p><strong><em>引擎</em></strong>：“嘿，<code v-pre>foo</code> 的 <em>作用域</em>，听说过 <code v-pre>b</code> 吗？我得到一个它的 RHS 引用。”</p>
<p><strong><em>作用域</em></strong>：“没有，从没听说过。问问别人吧。”</p>
<p><strong><em>引擎</em></strong>：“嘿，<code v-pre>foo</code> 的上级（外面） <em>作用域</em>，哦～，你是全局 _作用域_呀。听说过 <code v-pre>b</code> 吗？我得到一个它的 RHS 引用。”</p>
<p><strong><em>作用域</em></strong>：“哈哈哈，是的，当然有。给你。”</p>
</blockquote>
<p>遍历嵌套 <em>作用域</em> 的简单规则：<em>引擎</em> 从当前执行的 <em>作用域</em> 开始，在那里查找变量，如果没有找到，就向上走一级继续查找，如此类推。如果到了最外层的全局作用域，那么查找就会停止，无论它是否找到了变量。</p>
<h4 id="把作用域比喻成一个建筑物" tabindex="-1"><a class="header-anchor" href="#把作用域比喻成一个建筑物" aria-hidden="true">#</a> 把作用域比喻成一个建筑物</h4>
<p>为了将作用域处理的过程可视化，我们想象这样一个高大的建筑物：
<img src="@source/you-dont-know-js/assets/scope-closures-fig1.png" width = "300px"></p>
<p>这个建筑物表示我们程序的嵌套 <em>作用域</em> 规则集合。无论你在哪里，建筑的第一层表示你当前执行的 <em>作用域</em>。建筑的顶层表示全局 <em>作用域</em>。</p>
<p>你通过在你当前的楼层中查找来解析 LHS 和 RHS 引用，如果你没有找到它，就坐电梯到上一层楼，在那里寻找，然后再上一层，如此类推。一旦你到了顶层（全局 <em>作用域</em>），你要么找到了你想要的东西，要么没有。但是不管怎样你都不得不停止了。</p>
<h3 id="_1-4-异常" tabindex="-1"><a class="header-anchor" href="#_1-4-异常" aria-hidden="true">#</a> 1.4 异常</h3>
<p>为什么我们区别 LHS 和 RHS 那么重要？</p>
<p>因为在变量还没有被声明（在所有被查询的 <em>作用域</em> 中都没找到）的情况下，这两种类型的查询的行为不同。</p>
<p>考虑如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
  b <span class="token operator">=</span> a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 <code v-pre>b</code> 的 RHS 查询第一次发生时，它是找不到的。它被说成是一个“未声明”的变量，因为它在作用域中找不到。</p>
<p>如果 RHS 查询在嵌套的 <em>作用域</em> 的任何地方都找不到一个值，这会导致 <em>引擎</em> 抛出一个 <code v-pre>ReferenceError</code>。必须要注意的是这个错误的类型是 <code v-pre>ReferenceError</code>。</p>
<p>相比之下，如果 <em>引擎</em> 在进行一个 LHS 查询，但到达了顶层（全局 <em>作用域</em>）都没有找到它，而且如果程序没有运行在“Strict 模式”[^note-strictmode]下，那么这个全局 <em>作用域</em> 将会在 <strong>全局作用域中</strong> 创建一个同名的新变量，并把它交还给 <em>引擎</em>。</p>
<p><em>“不，之前没有这样的东西，但是我可以帮忙给你创建一个。”</em></p>
<p>在 ES5 中被加入的“Strict 模式”[^note-strictmode]，有许多与一般/宽松/懒惰模式不同的行为。其中之一就是不允许自动/隐含的全局变量创建。在这种情况下，将不会有全局 <em>作用域</em> 的变量交回给 LHS 查询，并且类似于 RHS 的情况, <em>引擎</em> 将抛出一个 <code v-pre>ReferenceError</code>。</p>
<p>现在，如果一个 RHS 查询的变量被找到了，但是你试着去做一些这个值不可能做到的事，比如将一个非函数的值作为函数运行，或者引用 <code v-pre>null</code> 或者 <code v-pre>undefined</code> 值的属性，那么 <em>引擎</em> 就会抛出一个不同种类的错误，称为 <code v-pre>TypeError</code>。</p>
<p><code v-pre>ReferenceError</code> 是关于 <em>作用域</em> 解析失败的，而 <code v-pre>TypeError</code> 暗示着 <em>作用域</em> 解析成功了，但是试图对这个结果进行了一个非法/不可能的动作。</p>
<h3 id="_1-5-小结" tabindex="-1"><a class="header-anchor" href="#_1-5-小结" aria-hidden="true">#</a> 1.5 小结</h3>
<p>作用域是一组规则，它决定了一个变量（标识符）在哪里和如何被查找。这种查询也许是为了向这个变量赋值，这时变量是一个 LHS（左手边）引用，或者是为取得它的值，这时变量是一个 RHS（右手边）引用。</p>
<p>LHS 引用得自赋值操作。<em>作用域</em> 相关的赋值可以通过 <code v-pre>=</code> 操作符发生，也可以通过向函数参数传递（赋予）参数值发生。</p>
<p>JavaScript <em>引擎</em> 在执行代码之前首先会编译它，因此，它将 <code v-pre>var a = 2;</code> 这样的语句分割为两个分离的步骤：</p>
<ol>
<li>
<p>首先，<code v-pre>var a</code> 在当前 <em>作用域</em> 中声明。这是在最开始，代码执行之前实施的。</p>
</li>
<li>
<p>稍后，<code v-pre>a = 2</code> 查找这个变量（LHS 引用），并且如果找到就向它赋值。</p>
</li>
</ol>
<p>LHS 和 RHS 引用查询都从当前执行中的 <em>作用域</em> 开始，如果有需要（也就是，它们在这里没能找到它们要找的东西），它们会在嵌套的 <em>作用域</em> 中一路向上，一次一个作用域（层）地查找这个标识符，直到它们到达全局作用域（顶层）并停止，既可能找到也可能没找到。</p>
<p>未被满足的 RHS 引用会导致 <code v-pre>ReferenceError</code> 被抛出。未被满足的 LHS 引用会导致一个自动的，隐含地创建的同名全局变量（如果不是“Strict 模式），或者一个 <code v-pre>ReferenceError</code>（如果是“Strict 模式”）。</p>
</div></template>


