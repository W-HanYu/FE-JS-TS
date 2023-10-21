<template><div><h1 id="第-4-章-generator" tabindex="-1"><a class="header-anchor" href="#第-4-章-generator" aria-hidden="true">#</a> 第 4 章: Generator</h1>
<p>在第二章中，我们发现了在使用回调表达异步流程控制时的两个关键缺陷：</p>
<ul>
<li>基于回调的异步与我们的大脑规划任务的各个步骤的过程不相符。</li>
<li>由于 <em>控制倒转</em> 回调是不可靠的，也是不可组合的。</li>
</ul>
<p>在第三章中，我们详细地讨论了 Promise 如何反转回调的 <em>控制倒转</em>，重建了可靠性/可组合性。</p>
<p>现在让我们把注意力集中到用一种顺序的，看起来同步的风格来表达异步流程控制。使这一切成为可能的“魔法”是 ES6 的 <strong>generator</strong>。</p>
<h2 id="打破运行至完成" tabindex="-1"><a class="header-anchor" href="#打破运行至完成" aria-hidden="true">#</a> 打破运行至完成</h2>
<p>在第一章中，我们讲解了一个 JS 开发者们在他们的代码中几乎永恒依仗的一个认识：一旦函数开始执行，它将运行直至完成，没有其他的代码可以在运行期间干扰它。</p>
<p>这看起来可能很滑稽，ES6 引入了一种新型的函数，它不按照“运行至完成”的行为进行动作。这种新型的函数称为“generator（生成器）”。</p>
<p>为了理解它的含义，让我们看看这个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  x<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;-- 这一行会发生什么？</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"x:"</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  x<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// x: 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们确信<code v-pre>bar()</code>会在<code v-pre>x++</code>和<code v-pre>console.log(x)</code>之间运行。但如果<code v-pre>bar()</code>不在这里呢？很明显结果将是<code v-pre>2</code>而不是<code v-pre>3</code>。</p>
<p>现在让我们来燃烧你的大脑。要是<code v-pre>bar()</code>不存在，但以某种方式依然可以在<code v-pre>x++</code>和<code v-pre>console.log(x)</code>语句之间运行呢？这可能吗？</p>
<p>在 <strong>抢占式（preemptive）</strong> 多线程语言中，<code v-pre>bar()</code>去“干扰”并正好在两个语句之间那一时刻运行，实质上时可能的。但 JS 不是抢占式的，也（还）不是多线程的。但是，如果<code v-pre>foo()</code>本身可以用某种办法在代码的这一部分指示一个“暂停”，那么这种“干扰”（并发）的 <strong>协作</strong> 形式就是可能的。</p>
<p><strong>注意：</strong> 我使用“协作”这个词，不仅是因为它与经典的并发术语有关联（见第一章），也因为正如你将在下一个代码段中看到的，ES6 在代码中指示暂停点的语法是<code v-pre>yield</code>——暗示一个让出控制权的礼貌的 <em>协作</em>。</p>
<p>这就是实现这种协作并发的 ES6 代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  x<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span><span class="token punctuation">;</span> <span class="token comment">// 暂停！</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"x:"</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  x<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 你将很可能在大多数其他的 JS 文档/代码中看到，一个 generator 的声明被格式化为<code v-pre>function* foo() { .. }</code>而不是我在这里使用的<code v-pre>function *foo() { .. }</code>——唯一的区别是摆放<code v-pre>*</code>位置的风格。这两种形式在功能性/语法上是完全一样的，还有第三种<code v-pre>function*foo() { .. }</code>（没空格）形式。这两种风格存在争议，但我基本上偏好<code v-pre>function *foo..</code>，因为当我在写作中用<code v-pre>*foo()</code>引用一个 generator 时，这种形式可以匹配我写的东西。如果我只说<code v-pre>foo()</code>，你就不会清楚地知道我是在说一个 generator 还是一个一般的函数。这纯粹是一个风格偏好的问题。</p>
<p>现在，我们该如何运行上面的代码，使<code v-pre>bar()</code>在<code v-pre>yield</code>那一点取代<code v-pre>*foo()</code>的执行？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 构建一个迭代器`it`来控制generator</span>
<span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 在这里开始`foo()`！</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
x<span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
x<span class="token punctuation">;</span> <span class="token comment">// 3</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// x: 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了，这两段代码中有不少新的，可能使人困惑的东西，所以我们得跋涉好一段了。在我们用 ES6 的 generator 来讲解不同的机制/语法之前，让我们过一遍这个行为的流程：</p>
<ol>
<li><code v-pre>it = foo()</code>操作 <em>不会</em> 执行<code v-pre>*foo()</code>generator，它只不过构建了一个用来控制它执行的 <em>迭代器（iterator）</em>。我们一会更多地讨论 <em>迭代器</em>。</li>
<li>第一个<code v-pre>it.next()</code>启动了<code v-pre>*foo()</code>generator，并且运行<code v-pre>*foo()</code>第一行上的<code v-pre>x++</code>。</li>
<li><code v-pre>*foo()</code>在<code v-pre>yield</code>语句处暂停，就在这时第一个<code v-pre>it.next()</code>调用结束。在这个时刻，<code v-pre>*foo()</code>依然运行而且是活动的，但是处于暂停状态。</li>
<li>我们观察<code v-pre>x</code>的值，现在它是<code v-pre>2</code>.</li>
<li>我们调用<code v-pre>bar()</code>，它再一次用<code v-pre>x++</code>递增<code v-pre>x</code>。</li>
<li>我们再一次观察<code v-pre>x</code>的值，现在它是<code v-pre>3</code>。</li>
<li>最后的<code v-pre>it.next()</code>调用使<code v-pre>*foo()</code>generator 从它暂停的地方继续运行，而后运行使用<code v-pre>x</code>的当前值<code v-pre>3</code>的<code v-pre>console.log(..)</code>语句。</li>
</ol>
<p>清楚的是，<code v-pre>*foo()</code>启动了，但 <em>没有</em> 运行到底——它停在<code v-pre>yield</code>。我们稍后继续<code v-pre>*foo()</code>，让它完成，但这甚至不是必须的。</p>
<p>所以，一个 generator 是一种函数，它可以开始和停止一次或多次，甚至没必要一定要完成。虽然为什么它很强大看起来不那么明显，但正如我们将要在本章剩下的部分将要讲到的，它是我们用于在我们的代码中构建“generator 异步流程控制”模式的基础构建块儿之一。</p>
<h3 id="输入和输出" tabindex="-1"><a class="header-anchor" href="#输入和输出" aria-hidden="true">#</a> 输入和输出</h3>
<p>一个 generator 函数是一种带有我们刚才提到的新型处理模型的函数。但它仍然是一个函数，这意味着依旧有一些不变的基本原则——即，它依然接收参数（也就是“输入”），而且它依然返回一个值（也就是“输出”）：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">*</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> res <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

res<span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将<code v-pre>6</code>和<code v-pre>7</code>分别作为参数<code v-pre>x</code>和<code v-pre>y</code>传递给<code v-pre>*foo(..)</code>。而<code v-pre>*foo(..)</code>将值<code v-pre>42</code>返回给调用端代码。</p>
<p>现在我们可以看到发生器的调用和一般函数的调用的一个不同之处了。<code v-pre>foo(6,7)</code>显然看起来很熟悉。但微妙的是，<code v-pre>*foo(..)</code>generator 不会像一个函数那样实际运行起来。</p>
<p>相反，我们只是创建了 <em>迭代器</em> 对象，将它赋值给变量<code v-pre>it</code>，来控制<code v-pre>*foo(..)</code>generator。当我们调用<code v-pre>it.next()</code>时，它指示<code v-pre>*foo(..)</code>generator 从现在的位置向前推进，直到下一个<code v-pre>yield</code>或者 generator 的最后。</p>
<p><code v-pre>next(..)</code>调用的结果是一个带有<code v-pre>value</code>属性的对象，它持有从<code v-pre>*foo(..)</code>返回的任何值（如果有的话）。换句话说，<code v-pre>yield</code>导致在 generator 运行期间，一个值被从中发送出来，有点儿像一个中间的<code v-pre>return</code>。</p>
<p>但是，为什么我们需要这个完全间接的 <em>迭代器</em> 对象来控制 generator 还不清楚。我们回头会讨论它的，我保证。</p>
<h4 id="迭代通信" tabindex="-1"><a class="header-anchor" href="#迭代通信" aria-hidden="true">#</a> 迭代通信</h4>
<p>generator 除了接收参数和拥有返回值，它们还内建有更强大，更吸引人的输入/输出消息能力，这是通过使用<code v-pre>yield</code>和<code v-pre>next(..)</code>实现的。</p>
<p>考虑下面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> y <span class="token operator">=</span> x <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token keyword">yield</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 开始`foo(..)`</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> res <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

res<span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们将<code v-pre>6</code>作为参数<code v-pre>x</code>传入。之后我们调用<code v-pre>it.next()</code>，它启动了<code v-pre>*foo(..)</code>.</p>
<p>在<code v-pre>*foo(..)</code>内部，<code v-pre>var y = x ..</code>语句开始被处理，但它运行到了一个<code v-pre>yield</code>表达式。就在这时，它暂停了<code v-pre>*foo(..)</code>（就在赋值语句的中间！），而且请求调用端代码为<code v-pre>yield</code>表达式提供一个结果值。接下来，我们调用<code v-pre>it.next(7)</code>，将<code v-pre>7</code>这个值传回去作为暂停的<code v-pre>yield</code>表达式的结果。</p>
<p>所以，在这个时候，赋值语句实质上是<code v-pre>var y = 6 * 7</code>。现在，<code v-pre>return y</code>将值<code v-pre>42</code>作为结果返回给<code v-pre>it.next( 7 )</code>调用。</p>
<p>注意一个非常重要，而且即便是对于老练的 JS 开发者也非常容易犯糊涂的事情：根据你的角度，在<code v-pre>yield</code>和<code v-pre>next(..)</code>调用之间存在着错位。一般来说，你所拥有的<code v-pre>next(..)</code>调用的数量，会比你所拥有的<code v-pre>yield</code>语句的数量多一个——前面的代码段中有一个<code v-pre>yield</code>和两个<code v-pre>next(..)</code>调用。</p>
<p>为什么会有这样的错位？</p>
<p>因为第一个<code v-pre>next(..)</code>总是启动一个 generator，然后运行至第一个<code v-pre>yield</code>。但是第二个<code v-pre>next(..)</code>调用满足了第一个暂停的<code v-pre>yield</code>表达式，而第三个<code v-pre>next(..)</code>将满足第二个<code v-pre>yield</code>，如此反复。</p>
<h5 id="两个疑问的故事" tabindex="-1"><a class="header-anchor" href="#两个疑问的故事" aria-hidden="true">#</a> 两个疑问的故事</h5>
<p>实际上，你主要考虑的是哪部分代码会影响你是否感知到错位。</p>
<p>仅考虑 generator 代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> y <span class="token operator">=</span> x <span class="token operator">*</span> <span class="token keyword">yield</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> y<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这 <strong>第一个</strong> <code v-pre>yield</code>基本上是在 <em>问一个问题</em>：“我应该在这里插入什么值？”</p>
<p>谁来回答这个问题？好吧，<strong>第一个</strong> <code v-pre>next()</code>在这个时候已经为了启动 generator 而运行过了，所以很明显 <em>它</em> 不能回答这个问题。所以，<strong>第二个</strong> <code v-pre>next(..)</code>调用必须回答由 <strong>第一个</strong> <code v-pre>yield</code>提出的问题。</p>
<p>看到错位了吧——第二个对第一个？</p>
<p>但是让我们反转一下我们的角度。让我们不从 generator 的角度看问题，而从迭代器的角度看。</p>
<p>为了恰当地描述这种角度，我们还需要解释一下，消息可以双向发送——<code v-pre>yield ..</code>作为表达式可以发送消息来应答<code v-pre>next(..)</code>调用，而<code v-pre>next(..)</code>可以发送值给暂停的<code v-pre>yield</code>表达式。考虑一下这段稍稍调整过的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> y <span class="token operator">=</span> x <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token keyword">yield</span> <span class="token string">"Hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;-- 让出一个值！</span>
  <span class="token keyword">return</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> res <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 第一个`next()`，不传递任何东西</span>
res<span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// "Hello"</span>

res <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 传递`7`给等待中的`yield`</span>
res<span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>yield ..</code>和<code v-pre>next(..)</code>一起成对地 <strong>在 generator 运行期间</strong> 构成了一个双向消息传递系统。</p>
<p>那么，如果只看 <em>迭代器</em> 代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> res <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 第一个`next()`，不传递任何东西</span>
res<span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// "Hello"</span>

res <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 传递`7`给等待中的`yield`</span>
res<span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 我们没有传递任何值给第一个<code v-pre>next()</code>调用，而且是故意的。只有一个暂停的<code v-pre>yield</code>才能接收这样一个被<code v-pre>next(..)</code>传递的值，但是当我们调用第一个<code v-pre>next()</code>时，在 generator 的最开始并 <strong>没有任何暂停的<code v-pre>yield</code></strong> 可以接收这样的值。语言规范和所有兼容此语言规范的浏览器只会无声地 <strong>丢弃</strong> 任何传入第一个<code v-pre>next()</code>的东西。传递这样的值是一个坏主意，因为你只不过创建了一些令人困惑的无声“失败”的代码。所以，记得总是用一个无参数的<code v-pre>next()</code>来启动 generator。</p>
<p>第一个<code v-pre>next()</code>调用（没有任何参数的）基本上是在 <em>问一个问题</em>：“<code v-pre>*foo(..)</code>generator 将要给我的 <em>下一个</em> 值是什么？”，谁来回答这个问题？第一个<code v-pre>yield</code>表达式。</p>
<p>看到了？这里没有错位。</p>
<p>根据你认为是 <em>谁</em> 在问问题，在<code v-pre>yield</code>和<code v-pre>next(..)</code>之间的错位既存在又不存在。</p>
<p>但等一下！跟<code v-pre>yield</code>语句的数量比起来，还有一个额外的<code v-pre>next()</code>。那么，这个最后的<code v-pre>it.next(7)</code>调用又一次在询问 generator <em>下一个</em> 产生的值是什么。但是没有<code v-pre>yield</code>语句剩下可以回答了，不是吗？那么谁来回答？</p>
<p><code v-pre>return</code>语句回答这个问题！</p>
<p>而且如果在你的 generator 中 <strong>没有<code v-pre>return</code></strong>——比起一般的函数，generator 中的<code v-pre>return</code>当然不再是必须的——总会有一个假定/隐式的<code v-pre>return;</code>（也就是<code v-pre>return undefined;</code>），它默认的目的就是回答由最后的<code v-pre>it.next(7)</code>调用 <em>提出</em> 的问题。</p>
<p>这些问题与回答——用<code v-pre>yield</code>和<code v-pre>next(..)</code>进行双向消息传递——十分强大，但还是看不出来这些机制与异步流程控制有什么联系。我们正在接近真相！</p>
<h3 id="多迭代器" tabindex="-1"><a class="header-anchor" href="#多迭代器" aria-hidden="true">#</a> 多迭代器</h3>
<p>从语法使用上来看，当你用一个 <em>迭代器</em> 来控制 generator 时，你正在控制声明的 generator 函数本身。但这里有一个容易忽视的微妙细节：每当你构建一个 <em>迭代器</em>，你都隐含地构建了一个将由这个 <em>迭代器</em> 控制的 generator 的实例。</p>
<p>你可以让同一个 generator 的多个实例同时运行，它们甚至可以互动：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token number">2</span><span class="token punctuation">;</span>
  z<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> y <span class="token operator">=</span> <span class="token keyword">yield</span> x <span class="token operator">*</span> z<span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> z <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> it1 <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> it2 <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> val1 <span class="token operator">=</span> it1<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 2 &lt;-- 让出2</span>
<span class="token keyword">var</span> val2 <span class="token operator">=</span> it2<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 2 &lt;-- 让出2</span>

val1 <span class="token operator">=</span> it1<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>val2 <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 40  &lt;-- x:20,  z:2</span>
val2 <span class="token operator">=</span> it2<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>val1 <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 600 &lt;-- x:200, z:3</span>

it1<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>val2 <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// y:300</span>
<span class="token comment">// 20 300 3</span>
it2<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>val1 <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// y:10</span>
<span class="token comment">// 200 10 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>警告：</strong> 同一个 generator 的多个并发运行实例的最常见的用法，不是这样的互动，而是 generator 在没有输入的情况下，从一些连接着的独立资源中产生它自己的值。我们将在下一节中更多地讨论产生值。</p>
<p>让我们简单地走一遍这个处理过程：</p>
<ol>
<li>两个<code v-pre>*foo()</code>在同时启动，而且两个<code v-pre>next()</code>都分别从<code v-pre>yield 2</code>语句中得到了<code v-pre>2</code>的<code v-pre>value</code>。</li>
<li><code v-pre>val2 * 10</code>就是<code v-pre>2 * 10</code>，它被发送到第一个 generator 实例<code v-pre>it1</code>，所以<code v-pre>x</code>得到值<code v-pre>20</code>。<code v-pre>z</code>将<code v-pre>1</code>递增至<code v-pre>2</code>，然后<code v-pre>20 * 2</code>被<code v-pre>yield</code>出来，将<code v-pre>val1</code>设置为<code v-pre>40</code>。</li>
<li><code v-pre>val1 * 5</code>就是<code v-pre>40 * 5</code>，它被发送到第二个 generator 实例<code v-pre>it2</code>中，所以<code v-pre>x</code>得到值<code v-pre>200</code>。<code v-pre>z</code>又一次递增，从<code v-pre>2</code>到<code v-pre>3</code>，然后<code v-pre>200 * 3</code>被<code v-pre>yield</code>出来，将<code v-pre>val2</code>设置为<code v-pre>600</code>。</li>
<li><code v-pre>val2 / 2</code>就是<code v-pre>600 / 2</code>，它被发送到第一个 generator 实例<code v-pre>it1</code>，所以<code v-pre>y</code>得到值<code v-pre>300</code>，然后分别为它的<code v-pre>x y z</code>值打印出<code v-pre>20 300 3</code>。</li>
<li><code v-pre>val1 / 4</code>就是<code v-pre>40 / 4</code>，它被发送到第一个 generator 实例<code v-pre>it2</code>，所以<code v-pre>y</code>得到值<code v-pre>10</code>，然后分别为它的<code v-pre>x y z</code>值打印出<code v-pre>200 10 3</code>。</li>
</ol>
<p>这是在你脑海中跑过的一个“有趣”的例子。你还能保持清醒？</p>
<h4 id="穿插" tabindex="-1"><a class="header-anchor" href="#穿插" aria-hidden="true">#</a> 穿插</h4>
<p>回想第一章中“运行至完成”一节的这个场景：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  a<span class="token operator">++</span><span class="token punctuation">;</span>
  b <span class="token operator">=</span> b <span class="token operator">*</span> a<span class="token punctuation">;</span>
  a <span class="token operator">=</span> b <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  b<span class="token operator">--</span><span class="token punctuation">;</span>
  a <span class="token operator">=</span> <span class="token number">8</span> <span class="token operator">+</span> b<span class="token punctuation">;</span>
  b <span class="token operator">=</span> a <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用普通的 JS 函数，当然要么是<code v-pre>foo()</code>可以首先运行完成，要么是<code v-pre>bar()</code>可以首先运行至完成，但是<code v-pre>foo()</code>不可能与<code v-pre>bar()</code>穿插它的独立语句。所以，前面这段代码只有两个可能的结果。</p>
<p>然而，使用 generator，明确地穿插（甚至是在语句中间！）是可能的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  a<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span><span class="token punctuation">;</span>
  b <span class="token operator">=</span> b <span class="token operator">*</span> a<span class="token punctuation">;</span>
  a <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">yield</span> b<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  b<span class="token operator">--</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span><span class="token punctuation">;</span>
  a <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">yield</span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token operator">+</span> b<span class="token punctuation">;</span>
  b <span class="token operator">=</span> a <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token keyword">yield</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据 <em>迭代器</em> 控制<code v-pre>*foo()</code>与<code v-pre>*bar()</code>分别以什么样的顺序被调用，前面这段代码可以产生几种不同的结果。换句话说，通过两个 generator 在同一个共享的变量上穿插，我们实际上可以展示（以一种模拟的方式）在第一章中讨论的，理论上的“线程的竞合状态”环境。</p>
<p>首先，让我们制造一个称为<code v-pre>step(..)</code>的帮助函数，让它控制 <em>迭代器</em>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">step</span><span class="token punctuation">(</span><span class="token parameter">gen</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">gen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> last<span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 不论`yield`出什么，只管在下一次时直接把它塞回去！</span>
    last <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>last<span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>step(..)</code>初始化一个 generator 来创建它的<code v-pre>it</code> <em>迭代器</em>，然后它返回一个函数，每次这个函数被调用时，都将 <em>迭代器</em> 向前推一步。另外，前一个被<code v-pre>yield</code>出来的值将被直接发给下一步。所以，<code v-pre>yield 8</code>将变成<code v-pre>8</code>而<code v-pre>yield b</code>将成为<code v-pre>b</code>（不管它在<code v-pre>yield</code>时是什么值）。</p>
<p>现在，为了好玩儿，让我们做一些实验，来看看将这些<code v-pre>*foo()</code>与<code v-pre>*bar()</code>的不同块儿穿插时的效果。我们从一个无聊的基本情况开始，保证<code v-pre>*foo()</code>在<code v-pre>*bar()</code>之前全部完成（就像我们在第一章中做的那样）：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 确保重置了`a`和`b`</span>
a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> s1 <span class="token operator">=</span> <span class="token function">step</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> s2 <span class="token operator">=</span> <span class="token function">step</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 首先完全运行`*foo()`</span>
<span class="token function">s1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">s1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">s1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 现在运行`*bar()`</span>
<span class="token function">s2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">s2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">s2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">s2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 11 22</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终结果是<code v-pre>11</code>和<code v-pre>22</code>，就像第一章的版本那样。现在让我们把顺序混合穿插，来看看它如何改变<code v-pre>a</code>与<code v-pre>b</code>的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 确保重置了`a`和`b`</span>
a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> s1 <span class="token operator">=</span> <span class="token function">step</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> s2 <span class="token operator">=</span> <span class="token function">step</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">s2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// b--;</span>
<span class="token function">s2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 让出 8</span>
<span class="token function">s1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// a++;</span>
<span class="token function">s2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// a = 8 + b;</span>
<span class="token comment">// 让出 2</span>
<span class="token function">s1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// b = b * a;</span>
<span class="token comment">// 让出 b</span>
<span class="token function">s1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// a = b + 3;</span>
<span class="token function">s2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// b = a * 2;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我告诉你结果之前，你能指出在前面的程序运行之后<code v-pre>a</code>和<code v-pre>b</code>的值是什么吗？不要作弊！</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 12 18</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>注意：</strong> 作为留给读者的练习，试试通过重新安排<code v-pre>s1()</code>和<code v-pre>s2()</code>调用的顺序，看看你能得到多少种结果组合。别忘了你总是需要三个<code v-pre>s1()</code>调用和四个<code v-pre>s2()</code>调用。至于为什么，回想一下刚才关于使用<code v-pre>yield</code>匹配<code v-pre>next()</code>的讨论。</p>
<p>当然，你几乎不会想有意制造 <em>这种</em> 水平的，令人糊涂的穿插，因为他创建了非常难理解的代码。但是这个练习很有趣，而且对于理解多个 generator 如何并发地运行在相同的共享作用域来说很有教育意义，因为会有一些地方这种能力十分有用。</p>
<p>我们会在本章末尾更详细地讨论 generator 并发。</p>
<h2 id="生成值" tabindex="-1"><a class="header-anchor" href="#生成值" aria-hidden="true">#</a> 生成值</h2>
<p>在前一节中，我们提到了一个 generator 的有趣用法，作为一种生产值的方式。这 <strong>不是</strong> 我们本章主要关注的，但如果我们不在这里讲一下基本我们会想念它的，特别是因为这种用法实质上是它的名称的由来：生成器。</p>
<p>我们将要稍稍深入一下 <em>迭代器</em> 的话题，但我们会绕回到它们如何与 generator 关联，并使用 generator 来 <em>生成</em> 值。</p>
<h3 id="发生器与迭代器" tabindex="-1"><a class="header-anchor" href="#发生器与迭代器" aria-hidden="true">#</a> 发生器与迭代器</h3>
<p>想象你正在生产一系列的值，它们中的每一个都与前一个值有可定义的关系。为此，你将需要一个有状态的发生器来记住上一个给出的值。</p>
<p>你可以用函数闭包（参加本系列的 <em>作用域与闭包</em>）来直接地实现这样的东西：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> gimmeSomething <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> nextVal<span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nextVal <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      nextVal <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      nextVal <span class="token operator">=</span> <span class="token number">3</span> <span class="token operator">*</span> nextVal <span class="token operator">+</span> <span class="token number">6</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> nextVal<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">gimmeSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
<span class="token function">gimmeSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 9</span>
<span class="token function">gimmeSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 33</span>
<span class="token function">gimmeSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 105</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 这里<code v-pre>nextVal</code>的计算逻辑已经被简化了，但从概念上讲，直到 <em>下一次</em> <code v-pre>gimmeSomething()</code>调用发生之前，我们不想计算 <em>下一个值</em>（也就是<code v-pre>nextVal</code>），因为一般对于持久性更强的，或者比简单的<code v-pre>number</code>更有限的资源的发生器来说，那可能是一种资源泄漏的设计。</p>
<p>生成随意的数字序列不是是一个很真实的例子。但是如果你从一个数据源中生成记录呢？你可以想象很多相同的代码。</p>
<p>事实上，这种任务是一种非常常见的设计模式，通常用迭代器解决。一个 <em>迭代器</em> 是一个明确定义的接口，用来逐个通过一系列从发生器得到的值。迭代器的 JS 接口，和大多数语言一样，是在你每次想从发生器中得到下一个值时调用的<code v-pre>next()</code>。</p>
<p>我们可以为我们的数字序列发生器实现标准的 <em>迭代器</em>；</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> something <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> nextVal<span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token comment">// `for..of`循环需要这个</span>
    <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 标准的迭代器接口方法</span>
    <span class="token function-variable function">next</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>nextVal <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        nextVal <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        nextVal <span class="token operator">=</span> <span class="token number">3</span> <span class="token operator">*</span> nextVal <span class="token operator">+</span> <span class="token number">6</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> nextVal <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

something<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 1</span>
something<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 9</span>
something<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 33</span>
something<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 105</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 我们将在“Iterables”一节中讲解为什么我们在这个代码段中需要<code v-pre>[Symbol.iterator]: ..</code>这一部分。在语法上讲，两个 ES6 特性在发挥作用。首先，<code v-pre>[ .. ]</code>语法称为一个 <em>计算型属性名</em>（参见本系列的 <em>this 与对象原型</em>）。它是一种字面对象定义方法，用来指定一个表达式并使用这个表达式的结果作为属性名。另一个，<code v-pre>Symbol.iterator</code>是 ES6 预定义的特殊<code v-pre>Symbol</code>值。</p>
<p><code v-pre>next()</code>调用返回一个对象，它带有两个属性：<code v-pre>done</code>是一个<code v-pre>boolean</code>值表示 <em>迭代器</em> 的完成状态；<code v-pre>value</code>持有迭代的值。</p>
<p>ES6 还增加了<code v-pre>for..of</code>循环，它意味着一个标准的 <em>迭代器</em> 可以使用原生的循环语法来自动地被消费：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> v <span class="token keyword">of</span> something<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 不要让循环永无休止！</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>v <span class="token operator">></span> <span class="token number">500</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 1 9 33 105 321 969</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 因为我们的<code v-pre>something</code>迭代器总是返回<code v-pre>done:false</code>，这个<code v-pre>for..of</code>循环将会永远运行，这就是为什么我们条件性地放进一个<code v-pre>break</code>。对于迭代器来说永不终结是完全没有问题的，但是也有一些情况 <em>迭代器</em> 将运行在有限的值的集合上，而最终返回<code v-pre>done:true</code>。</p>
<p><code v-pre>for..of</code>循环为每一次迭代自动调用<code v-pre>next()</code>——他不会给<code v-pre>next()</code>传入任何值——而且他将会在收到一个<code v-pre>done:true</code>时自动终结。这对于在一个集合的数据中进行循环十分方便。</p>
<p>当然，你可以手动循环一个迭代器，调用<code v-pre>next()</code>并检查<code v-pre>done:true</code>条件来知道什么时候停止：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> ret<span class="token punctuation">;</span> <span class="token punctuation">(</span>ret <span class="token operator">=</span> something<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>ret<span class="token punctuation">.</span>done<span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ret<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 不要让循环永无休止！</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>ret<span class="token punctuation">.</span>value <span class="token operator">></span> <span class="token number">500</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 1 9 33 105 321 969</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 这种手动的<code v-pre>for</code>方式当然要比 ES6 的<code v-pre>for..of</code>循环语法难看，但它的好处是它提供给你一个机会，在有必要时传值给<code v-pre>next(..)</code>调用。</p>
<p>除了制造你自己的 <em>迭代器</em> 之外，许多 JS 中（就 ES6 来说）内建的数据结构，比如<code v-pre>array</code>，也有默认的 <em>迭代器</em>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> v <span class="token keyword">of</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 1 3 5 7 9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>for..of</code>循环向<code v-pre>a</code>要来它的迭代器，并自动使用它迭代<code v-pre>a</code>的值。</p>
<p><strong>注意：</strong> 看起来像是一个 ES6 的奇怪省略，普通的<code v-pre>object</code>有意地不带有像<code v-pre>array</code>那样的默认 <em>迭代器</em>。原因比我们要在这里讲的深刻得多。如果你想要的只是迭代一个对象的属性（不特别保证顺序），<code v-pre>Object.keys(..)</code>返回一个<code v-pre>array</code>，它可以像<code v-pre>for (var k of Object.keys(obj)) { ..</code>这样使用。像这样用<code v-pre>for..of</code>循环一个对象上的键，与用<code v-pre>for..in</code>循环内很相似，除了在<code v-pre>for..in</code>中会包含<code v-pre>[[Prototype]]</code>链的属性，而<code v-pre>Object.keys(..)</code>不会（参见本系列的 <em>this 与对象原型</em>）。</p>
<h3 id="iterables" tabindex="-1"><a class="header-anchor" href="#iterables" aria-hidden="true">#</a> Iterables</h3>
<p>在我们运行的例子中的<code v-pre>something</code>对象被称为一个 <em>迭代器</em>，因为它的接口中有<code v-pre>next()</code>方法。但一个紧密关联的术语是 <em>iterable</em>，它指 <strong>包含有</strong> 一个可以迭代它所有值的迭代器的对象。</p>
<p>在 ES6 中，从一个 <em>iterable</em> 中取得一个 <em>迭代器</em> 的方法是，<em>iterable</em> 上必须有一个函数，它的名称是特殊的 ES6 符号值<code v-pre>Symbol.iterator</code>。当这个函数被调用时，它就会返回一个 <em>迭代器</em>。虽然不是必须的，但一般来说每次调用应当返回一个全新的 <em>迭代器</em>。</p>
<p>前一个代码段的<code v-pre>a</code>就是一个 <em>iterable</em>。<code v-pre>for..of</code>循环自动地调用它的<code v-pre>Symbol.iterator</code>函数来构建一个 <em>迭代器</em>。我们当然可以手动地调用这个函数，然后使用它返回的 <em>iterator</em>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> it <span class="token operator">=</span> a<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>	<span class="token comment">// 1</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>	<span class="token comment">// 3</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>	<span class="token comment">// 5</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在前面定义<code v-pre>something</code>的代码段中，你可能已经注意到了这一行：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这段有点让人困惑的代码制造了<code v-pre>something</code>值——<code v-pre>something</code><em>迭代器</em> 的接口——也是一个 <em>iterable</em>；现在它既是一个 <em>iterable</em> 也是一个 <em>迭代器</em>。然后，我们把<code v-pre>something</code>传递给<code v-pre>for..of</code>循环：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> v <span class="token keyword">of</span> something<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>for..of</code>循环期待<code v-pre>something</code>是一个 <em>iterable</em>，所以它会寻找并调用它的<code v-pre>Symbol.iterator</code>函数。我们将这个函数定义为简单地<code v-pre>return this</code>，所以它将自己给出，而<code v-pre>for..of</code>不会知道这些。</p>
<h3 id="generator-迭代器" tabindex="-1"><a class="header-anchor" href="#generator-迭代器" aria-hidden="true">#</a> Generator 迭代器</h3>
<p>带着 <em>迭代器</em> 的背景知识，让我们把注意力移回 generator。一个 generator 可以被看做一个值的发生器，我们通过一个 <em>迭代器</em> 接口的<code v-pre>next()</code>调用每次从中抽取一个值。</p>
<p>所以，一个 generator 本身在技术上讲并不是一个 <em>iterable</em>，虽然很相似——当你执行 generator 时，你就得到一个 <em>迭代器</em>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token operator">*</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>

<span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以用 generator 实现早前的<code v-pre>something</code>无限数字序列发生器，就像这样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">something</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> nextVal<span class="token punctuation">;</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nextVal <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      nextVal <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      nextVal <span class="token operator">=</span> <span class="token number">3</span> <span class="token operator">*</span> nextVal <span class="token operator">+</span> <span class="token number">6</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">yield</span> nextVal<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 在一个真实的 JS 程序中含有一个<code v-pre>while..true</code>循环通常是一件非常不好的事情，至少如果它没有一个<code v-pre>break</code>或<code v-pre>return</code>语句，那么它就很可能永远运行，并同步地，阻塞/锁定浏览器 UI。然而，在 generator 中，如果这样的循环含有一个<code v-pre>yield</code>，那它就是完全没有问题的，因为 generator 将在每次迭代后暂停，<code v-pre>yield</code>回主程序和/或事件轮询队列。说的明白点儿，“generator 把<code v-pre>while..true</code>带回到 JS 编程中了！”</p>
<p>这变得相当干净和简单点儿了，对吧？因为 generator 会暂停在每个<code v-pre>yield</code>，<code v-pre>*something()</code>函数的状态（作用域）被保持着，这意味着没有必要用闭包的模板代码来跨调用保留变量的状态了。</p>
<p>不仅是更简单的代码——我们不必自己制造 <em>迭代器</em> 接口了——它实际上是更合理的代码，因为它更清晰地表达了意图。比如，<code v-pre>while..true</code>循环告诉我们这个 generator 将要永远运行——只要我们一直向它请求，它就一直 <em>产生</em> 值。</p>
<p>现在我们可以在<code v-pre>for..of</code>循环中使用新得发亮的<code v-pre>*something()</code>generator 了，而且你会看到它工作起来基本一模一样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> v <span class="token keyword">of</span> <span class="token function">something</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 不要让循环永无休止！</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>v <span class="token operator">></span> <span class="token number">500</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 1 9 33 105 321 969</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不要跳过<code v-pre>for (var v of something()) ..</code>！我们不仅仅像之前的例子那样将<code v-pre>something</code>作为一个值引用了，而是调用<code v-pre>*something()</code>generator 来得到它的 <em>迭代器</em>，并交给<code v-pre>for..of</code>使用。</p>
<p>如果你仔细观察，在这个 generator 和循环的互动中，你可能会有两个疑问：</p>
<ul>
<li>为什么我们不能说<code v-pre>for (var v of something) ..</code>？因为这个<code v-pre>something</code>是一个 generator，而不是一个 <em>iterable</em>。我们不得不调用<code v-pre>something()</code>来构建一个发生器给<code v-pre>for..of</code>，以便它可以迭代。</li>
<li><code v-pre>something()</code>调用创建一个 <em>迭代器</em>，但是<code v-pre>for..of</code>想要一个 <em>iterable</em>，对吧？对，generator 的 <em>迭代器</em> 上也有一个<code v-pre>Symbol.iterator</code>函数，这个函数基本上就是<code v-pre>return this</code>，就像我们刚才定义的<code v-pre>something</code><em>iterable</em>。换句话说 generator 的 <em>迭代器</em> 也是一个 <em>iterable</em>！</li>
</ul>
<h4 id="停止-generator" tabindex="-1"><a class="header-anchor" href="#停止-generator" aria-hidden="true">#</a> 停止 Generator</h4>
<p>在前一个例子中，看起来在循环的<code v-pre>break</code>被调用后，<code v-pre>*something()</code>generator 的 <em>迭代器</em> 实例基本上被留在了一个永远挂起的状态。</p>
<p>但是这里有一个隐藏的行为为你处理这件事。<code v-pre>for..of</code>循环的“异常完成”（“提前终结”等等）——一般是由<code v-pre>break</code>，<code v-pre>return</code>，或未捕捉的异常导致的——会向 generator 的 <em>迭代器</em> 发送一个信号，以使它终结。</p>
<p><strong>注意：</strong> 技术上讲，<code v-pre>for..of</code>循环也会在循环正常完成时向 <em>迭代器</em> 发送这个信号。对于 generator 来说，这实质上是一个无实际意义的操作，因为 generator 的 <em>迭代器</em> 要首先完成，<code v-pre>for..of</code>循环才能完成。然而，自定义的 <em>迭代器</em> 可能会希望从<code v-pre>for..of</code>循环的消费者那里得到另外的信号。</p>
<p>虽然一个<code v-pre>for..of</code>循环将会自动发送这种信号，你可能会希望手动发送信号给一个 <em>迭代器</em>；你可以通过调用<code v-pre>return(..)</code>来这么做。</p>
<p>如果你在 generator 内部指定一个<code v-pre>try..finally</code>从句，它将总是被执行，即便是 generator 从外部被完成。这在你需要进行资源清理时很有用（数据库连接等）：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">something</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> nextVal<span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>nextVal <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        nextVal <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        nextVal <span class="token operator">=</span> <span class="token number">3</span> <span class="token operator">*</span> nextVal <span class="token operator">+</span> <span class="token number">6</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">yield</span> nextVal<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token comment">// 清理用的从句</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"cleaning up!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前面那个在<code v-pre>for..of</code>中带有<code v-pre>break</code>的例子将会触发<code v-pre>finally</code>从句。但是你可以用<code v-pre>return(..)</code>从外部来手动终结 generator 的 <em>迭代器</em> 实例：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">something</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> v <span class="token keyword">of</span> it<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 不要让循环永无休止！</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>v <span class="token operator">></span> <span class="token number">500</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      <span class="token comment">// 使generator得迭代器完成</span>
      it<span class="token punctuation">.</span><span class="token function">return</span><span class="token punctuation">(</span><span class="token string">"Hello World"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 这里不需要`break`</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 1 9 33 105 321 969</span>
<span class="token comment">// cleaning up!</span>
<span class="token comment">// Hello World</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们调用<code v-pre>it.return(..)</code>时，它会立即终结 generator，从而运行<code v-pre>finally</code>从句。而且，它会将返回的<code v-pre>value</code>设置为你传入<code v-pre>return(..)</code>的任何东西，这就是<code v-pre>Hellow World</code>如何立即返回来的。我们现在也不必再包含一个<code v-pre>break</code>，因为 generator 的 <em>迭代器</em> 会被设置为<code v-pre>done:true</code>，所以<code v-pre>for..of</code>循环会在下一次迭代时终结。</p>
<p>generator 的命名大部分源自于这种 <em>消费生产的值</em> 的用法。但要重申的是，这只是 generator 的用法之一，而且坦白的说，在这本书的背景下这甚至不是我们主要关注的。</p>
<p>但是现在我们更加全面地了解它们的机制是如何工作的，我们接下来可以将注意力转向 generator 如何实施于异步并发。</p>
<h2 id="异步地迭代-generator" tabindex="-1"><a class="header-anchor" href="#异步地迭代-generator" aria-hidden="true">#</a> 异步地迭代 Generator</h2>
<p>generator 要怎样处理异步编码模式，解决回调和类似的问题？让我们开始回答这个重要的问题。</p>
<p>我们应当重温一下第三章的一个场景。回想一下这个回调方式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">ajax</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1/?x="</span> <span class="token operator">+</span> x <span class="token operator">+</span> <span class="token string">"&amp;y="</span> <span class="token operator">+</span> y<span class="token punctuation">,</span> cb<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> text</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们想用 generator 表示相同的任务流控制，我们可以：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">ajax</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1/?x="</span> <span class="token operator">+</span> x <span class="token operator">+</span> <span class="token string">"&amp;y="</span> <span class="token operator">+</span> y<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 向`*main()`中扔进一个错误</span>
      it<span class="token punctuation">.</span><span class="token function">throw</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 使用收到的`data`来继续`*main()`</span>
      it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> text <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 使一切开始运行！</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一眼看上去，这个代码段要比以前的回调代码更长，而且也许看起来更复杂。但不要让这种印象误导你。generator 的代码段实际上要好 <strong>太多</strong> 了！但是这里有很多我们需要讲解的。</p>
<p>首先，让我们看看代码的这一部分，也是最重要的部分：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> text <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">foo</span><span class="token punctuation">(</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">31</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> text <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>花一点时间考虑一下这段代码如何工作。我们调用了一个普通的函数<code v-pre>foo(..)</code>，而且我们显然可以从 Ajax 调用那里得到<code v-pre>text</code>，即便它是异步的。</p>
<p>这怎么可能？如果你回忆一下第一章的最开始，我们有一个几乎完全一样的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token function">ajax</span><span class="token punctuation">(</span><span class="token string">"..url 1.."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是这段代码不好用！你能发现不同吗？它就是在 generator 中使用的<code v-pre>yield</code>。</p>
<p>这就是魔法发生的地方！是它允许我们拥有一个看起来是阻塞的，同步的，但实际上不会阻塞整个程序的代码；它仅仅暂停/阻塞在 generator 本身的代码。</p>
<p>在<code v-pre>yield foo(11,31)</code>中，首先<code v-pre>foo(11,31)</code>调用被发起，它什么也不返回（也就是<code v-pre>undefined</code>），所以我们发起了数据请求，然后我们实际上做的是<code v-pre>yield undefined</code>。这没问题，因为这段代码现在没有依赖<code v-pre>yield</code>的值来做任何有趣的事。我们在本章稍后再重新讨论这个问题。</p>
<p>在这里，我们没有将<code v-pre>yield</code>作为消息传递的工具，只是作为进行暂停/阻塞的流程控制的工具。实际上，它会传递消息，但是只是单向的，在 generator 被继续运行之后。</p>
<p>那么，generator 暂停在了<code v-pre>yield</code>，它实质上再问一个问题，“我该将什么值返回并赋给变量<code v-pre>text</code>？”谁来回答这个问题？</p>
<p>看一下<code v-pre>foo(..)</code>。如果 Ajax 请求成功，我们调用：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将使 generator 使用应答数据继续运行，这意味着我们暂停的<code v-pre>yield</code>表达式直接收到这个值，然后因为它重新开始以运行 generator 代码，所以这个值被赋给本地变量<code v-pre>text</code>。</p>
<p>很酷吧？</p>
<p>退一步考虑一下它的意义。我们在 generator 内部的代码看起来完全是同步的（除了<code v-pre>yield</code>关键字本身），但隐藏在幕后的是，在<code v-pre>foo(..)</code>内部，操作可以完全是异步的。</p>
<p><strong>这很伟大！</strong> 这几乎完美地解决了我们前面遇到的问题：回调不能像我们的大脑可以关联的那样，以一种顺序，同步的风格表达异步处理。</p>
<p>实质上，我们将异步处理作为实现细节抽象出去，以至于我们可以同步地/顺序地推理我们的流程控制：“发起 Ajax 请求，然后在它完成之后打印应答。” 当然，我们仅仅在这个流程控制中表达了两个步骤，但同样的能力可以无边界地延伸，让我们需要表达多少步骤，就表达多少。</p>
<p><strong>提示：</strong> 这是一个如此重要的认识，为了充分理解，现在回过头去再把最后三段读一遍！</p>
<h3 id="同步错误处理" tabindex="-1"><a class="header-anchor" href="#同步错误处理" aria-hidden="true">#</a> 同步错误处理</h3>
<p>但是前面的 generator 代码会 <em>让</em> 出更多的好处给我们。让我们把注意力移到 generator 内部的<code v-pre>try..catch</code>上：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> text <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">foo</span><span class="token punctuation">(</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">31</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> text <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span> err <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是怎么工作的？<code v-pre>foo(..)</code>调用是异步完成的，<code v-pre>try..catch</code>不是无法捕捉异步错误吗？就像我们在第三章中看到的？</p>
<p>我们已经看到了<code v-pre>yield</code>如何让赋值语句暂停，来等待<code v-pre>foo(..)</code>去完成，以至于完成的响应可以被赋予<code v-pre>text</code>。牛 X 的是，<code v-pre>yield</code>暂停 <em>还</em> 允许 generator 来<code v-pre>catch</code>一个错误。我们在前面的例子，我们用这一部分代码将这个错误抛出到 generator 中：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 向`*main()`中扔进一个错误</span>
  it<span class="token punctuation">.</span><span class="token function">throw</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>generator 的<code v-pre>yield</code>暂停特性不仅意味着我们可以从异步的函数调用那里得到看起来同步的<code v-pre>return</code>值，还意味着我们可以同步地捕获这些异步函数调用的错误！</p>
<p>那么我们看到了，我们可以将错误 <em>抛入</em> generator，但是将错误 <em>抛出</em> 一个 generator 呢？和你期望的一样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token string">"Hello World"</span><span class="token punctuation">;</span>

  <span class="token keyword">yield</span> x<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 引发一个异常！</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// Hello World</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// TypeError</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，我们本可以用<code v-pre>throw ..</code>手动地抛出一个错误，而不是制造一个异常。</p>
<p>我们甚至可以<code v-pre>catch</code>我们<code v-pre>throw(..)</code>进 generator 的同一个错误，实质上给了 generator 一个机会来处理它，但如果 generator 没处理，那么 <em>迭代器</em> 代码必须处理它：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token string">"Hello World"</span><span class="token punctuation">;</span>

  <span class="token comment">// 永远不会跑到这里</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token comment">// `*main()`会处理这个错误吗？我们走着瞧！</span>
  it<span class="token punctuation">.</span><span class="token function">throw</span><span class="token punctuation">(</span><span class="token string">"Oops"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 不，它没处理！</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Oops</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用异步代码的，看似同步的错误处理（通过<code v-pre>try..catch</code>）在可读性和可推理性上大获全胜。</p>
<h2 id="generators-promises" tabindex="-1"><a class="header-anchor" href="#generators-promises" aria-hidden="true">#</a> Generators + Promises</h2>
<p>在我们前面的讨论中，我们展示了 generator 如何可以异步地迭代，这是一个用顺序的可推理性来取代混乱如面条的回调的一个巨大进步。但我们丢掉了两个非常重要的东西：Promise 的可靠性和可组合性（见第三章）！</p>
<p>别担心——我们会把它们拿回来。在 ES6 的世界中最棒的就是将 generator（看似同步的异步代码）与 Promise（可靠性和可组合性）组合起来。</p>
<p>但怎么做呢？</p>
<p>回想一下第三章中我们基于 Promise 的方式运行 Ajax 的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1/?x="</span> <span class="token operator">+</span> x <span class="token operator">+</span> <span class="token string">"&amp;y="</span> <span class="token operator">+</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">text</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们早先的运行 Ajax 的例子的 generator 代码中，<code v-pre>foo(..)</code>什么也不返回（<code v-pre>undefined</code>），而且我们的 <em>迭代器</em> 控制代码也不关心<code v-pre>yield</code>的值。</p>
<p>但这里的 Promise 相关的<code v-pre>foo(..)</code>在发起 Ajax 调用后返回一个 promise。这暗示着我们可以用<code v-pre>foo(..)</code>构建一个 promise，然后从 generator 中<code v-pre>yield</code>出来，而后 <em>迭代器</em> 控制代码将可以收到这个 promise。</p>
<p>那么 <em>迭代器</em> 应当对 promise 做什么？</p>
<p>它应当监听 promise 的解析（完成或拒绝），然后要么使用完成消息继续运行 generator，要么使用拒绝理由向 generator 抛出错误。</p>
<p>让我重复一遍，因为它如此重要。发挥 Promise 和 generator 的最大功效的自然方法是 <strong><code v-pre>yield</code>一个 Promise</strong>，并将这个 Promise 连接到 generator 的 <em>迭代器</em> 的控制端。</p>
<p>让我们试一下！首先，我们将 Promise 相关的<code v-pre>foo(..)</code>与 generator<code v-pre>*main()</code>放在一起：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1/?x="</span> <span class="token operator">+</span> x <span class="token operator">+</span> <span class="token string">"&amp;y="</span> <span class="token operator">+</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> text <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个重构中最强大的启示是，<code v-pre>*main()</code>内部的代码 <strong>更本就没变！</strong> 在 generator 内部，无论什么样的值被<code v-pre>yield</code>出去都是一个不可见的实现细节，所以我们甚至不会察觉它发生了，也不用担心它。</p>
<p>那么我们现在如何运行<code v-pre>*main()</code>？我们还有一些管道的实现工作要做，接收并连接<code v-pre>yield</code>的 promise，使它能够根据解析来继续运行 generator。我们从手动这么做开始：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> p <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>

<span class="token comment">// 等待`p` promise解析</span>
p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">text</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    it<span class="token punctuation">.</span><span class="token function">throw</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实，根本不费事，对吧？</p>
<p>这段代码应当看起来与我们早前做的很相似：手动地连接被错误优先的回调控制的 generator。与<code v-pre>if (err) { it.throw..</code>不同的是，promise 已经为我们分割为完成（成功）与拒绝（失败），否则 <em>迭代器</em> 控制是完全相同的。</p>
<p>现在，我们已经掩盖了一些重要的细节。</p>
<p>最重要的是，我们利用了这样一个事实：我们知道<code v-pre>*main()</code>里面只有一个 Promise 相关的步骤。如果我们想要能用 Promise 驱动一个 generator 而不管它有多少步骤呢？我们当然不想为每一个 generator 手动编写一个不同的 Promise 链！要是有这样一种方法该多好：可以重复（也就是“循环”）迭代的控制，而且每次一有 Promise 出来，就在继续之前等待它的解析。</p>
<p>另外，如果 generator 在<code v-pre>it.next()</code>调用期间抛出一个错误怎么办？我们是该退出，还是应该<code v-pre>catch</code>它并把它送回去？相似地，要是我们<code v-pre>it.throw(..)</code>一个 Promise 拒绝给 generator，但是没有被处理，又直接回来了呢？</p>
<h3 id="带有-promise-的-generator-运行器" tabindex="-1"><a class="header-anchor" href="#带有-promise-的-generator-运行器" aria-hidden="true">#</a> 带有 Promise 的 Generator 运行器</h3>
<p>你在这条路上探索得越远，你就越能感到，“哇，要是有一些工具能帮我做这些就好了。”而且你绝对是对的。这是一种如此重要的模式，而且你不想把它弄错（或者因为一遍又一遍地重复它而把自己累死），所以你最好的选择是把赌注压在一个工具上，而它以我们将要描述的方式使用这种特定设计的工具来 <em>运行</em> <code v-pre>yield</code>Promise 的 generator。</p>
<p>有几种 Promise 抽象库提供了这样的工具，包括我的 <em>asynquence</em> 库和它的<code v-pre>runner(..)</code>，我们将在本书的在附录 A 中讨论它。</p>
<p>但看在学习和讲解的份儿上，让我们定义我们自己的名为<code v-pre>run(..)</code>的独立工具：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 感谢Benjamin Gruenbaum (@benjamingr在GitHub)在此做出的巨大改进！</span>
<span class="token keyword">function</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token parameter">gen</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    it<span class="token punctuation">;</span>

  <span class="token comment">// 在当前的上下文环境中初始化generator</span>
  it <span class="token operator">=</span> <span class="token function">gen</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 为generator的完成返回一个promise</span>
  <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">handleNext</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 运行至下一个让出的值</span>
    <span class="token keyword">var</span> next <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">handleResult</span><span class="token punctuation">(</span><span class="token parameter">next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// generator已经完成运行了？</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>next<span class="token punctuation">.</span>done<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> next<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 否则继续执行</span>
      <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>next<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
          <span class="token comment">// 在成功的情况下继续异步循环，将解析的值送回generator</span>
          handleNext<span class="token punctuation">,</span>

          <span class="token comment">// 如果`value`是一个拒绝的promise，就将错误传播回generator自己的错误处理g</span>
          <span class="token keyword">function</span> <span class="token function">handleErr</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">throw</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>handleResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如你所见，它可能比你想要自己编写的东西复杂得多，特别是你将不会想为每个你使用的 generator 重复这段代码。所以，一个帮助工具/库绝对是可行的。虽然，我鼓励你花几分钟时间研究一下这点代码，以便对如何管理 generator+Promise 交涉得到更好的感觉。</p>
<p>你如何在我们 <em>正在讨论</em> 的 Ajax 例子中将<code v-pre>run(..)</code>和<code v-pre>*main()</code>一起使用呢？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>

<span class="token function">run</span><span class="token punctuation">(</span>main<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就是这样！按照我们连接<code v-pre>run(..)</code>的方式，它将自动地，异步地推进你传入的 generator，直到完成。</p>
<p><strong>注意：</strong> 我们定义的<code v-pre>run(..)</code>返回一个 promise，它被连接成一旦 generator 完成就立即解析，或者收到一个未捕获的异常，而 generator 没有处理它。我们没有在这里展示这种能力，但我们会在本章稍后回到这个话题。</p>
<h4 id="es7-async-和-await" tabindex="-1"><a class="header-anchor" href="#es7-async-和-await" aria-hidden="true">#</a> ES7: <code v-pre>async</code> 和 <code v-pre>await</code>？</h4>
<p>前面的模式——generator 让出一个 Promise，然后这个 Promise 控制 generator 的 <em>迭代器</em> 向前推进至它完成——是一个如此强大和有用的方法，如果我们能不通过乱七八糟的帮助工具库（也就是<code v-pre>run(..)</code>）来使用它就更好了。</p>
<p>在这方面可能有一些好消息。在写作这本书的时候，后 ES6，ES7 化的时间表上已经出现了草案，对这个问题提供早期但强大的附加语法支持。显然，现在还太早而不能保证其细节，但是有相当大的可能性它将蜕变为类似于下面的东西：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1/?x="</span> <span class="token operator">+</span> x <span class="token operator">+</span> <span class="token string">"&amp;y="</span> <span class="token operator">+</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> text <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如你所见，这里没有<code v-pre>run(..)</code>调用（意味着不需要工具库！）来驱动和调用<code v-pre>main()</code>——它仅仅像一个普通函数那样被调用。另外，<code v-pre>main()</code>不再作为一个 generator 函数声明；它是一种新型的函数：<code v-pre>async function</code>。而最后，与<code v-pre>yield</code>一个 Promise 相反，我们<code v-pre>await</code>它解析。</p>
<p>如果你<code v-pre>await</code>一个 Promise，<code v-pre>async function</code>会自动地知道做什么——它会暂停这个函数（就像使用 generator 那样）直到 Promise 解析。我们没有在这个代码段中展示，但是调用一个像<code v-pre>main()</code>这样的异步函数将自动地返回一个 promise，它会在函数完全完成时被解析。</p>
<p><strong>提示：</strong> <code v-pre>async</code> / <code v-pre>await</code>的语法应该对拥有 C#经验的读者看起来非常熟悉，因为它们基本上是一样的。</p>
<p>这个草案实质上是为我们已经衍生出的模式进行代码化的支持，成为一种语法机制：用看似同步的流程控制代码与 Promise 组合。将两个世界的最好部分组合，来有效解决我们用回调遇到的几乎所有主要问题。</p>
<p>这样的 ES7 化草案已经存在，并且有了早期的支持和热忱的拥护。这一事实为这种异步模式在未来的重要性上信心满满地投了有力的一票。</p>
<h3 id="generator-中的-promise-并发" tabindex="-1"><a class="header-anchor" href="#generator-中的-promise-并发" aria-hidden="true">#</a> Generator 中的 Promise 并发</h3>
<p>至此，所有我们展示过的是一种使用 Promise+generator 的单步异步流程。但是现实世界的代码将总是有许多异步步骤。</p>
<p>如果你不小心，generator 看似同步的风格也许会蒙蔽你，使你在如何构造你的异步并发上感到自满，导致性能次优的模式。那么我们想花一点时间来探索一下其他选项。</p>
<p>想象一个场景，你需要从两个不同的数据源取得数据，然后将这些应答组合来发起第三个请求，最后打印出最终的应答。我们在第三章中用 Promise 探索过类似的场景，但这次让我们在 generator 的环境下考虑它。</p>
<p>你的第一直觉可能是像这样的东西：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> r1 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> r2 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> r3 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.3/?v="</span> <span class="token operator">+</span> r1 <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> r2<span class="token punctuation">)</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r3<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用刚才定义的`run(..)`工具</span>
<span class="token function">run</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码可以工作，但在我们特定的这个场景中，它不是最优的。你能发现为什么吗？</p>
<p>因为<code v-pre>r1</code>和<code v-pre>r2</code>请求可以——而且为了性能的原因，<em>应该</em>——并发运行，但在这段代码中它们将顺序地运行；直到<code v-pre>&quot;http://some.url.1&quot;</code>请求完成之前，<code v-pre>&quot;http://some.url.2&quot;</code>URL 不会被 Ajax 取得。这两个请求是独立的，所以性能更好的方式可能是让它们同时运行。</p>
<p>但是使用 generator 和<code v-pre>yield</code>，到底应该怎么做？我们知道<code v-pre>yield</code>在代码中只是一个单独的暂停点，所以你根本不能再同一时刻做两次暂停。</p>
<p>最自然和有效的答案是基于 Promise 的异步流程，特别是因为它们的时间无关的状态管理能力（参见第三章的“未来的值”）。</p>
<p>最简单的方式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 使两个请求“并行”</span>
  <span class="token keyword">var</span> p1 <span class="token operator">=</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> p2 <span class="token operator">=</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 等待两个promise都被解析</span>
  <span class="token keyword">var</span> r1 <span class="token operator">=</span> <span class="token keyword">yield</span> p1<span class="token punctuation">;</span>
  <span class="token keyword">var</span> r2 <span class="token operator">=</span> <span class="token keyword">yield</span> p2<span class="token punctuation">;</span>

  <span class="token keyword">var</span> r3 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.3/?v="</span> <span class="token operator">+</span> r1 <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> r2<span class="token punctuation">)</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r3<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用刚才定义的`run(..)`工具</span>
<span class="token function">run</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为什么这与前一个代码段不同？看看<code v-pre>yield</code>在哪里和不在哪里。<code v-pre>p1</code>和<code v-pre>p2</code>是并发地（也就是“并行”）发起的 Ajax 请求 promise。它们哪一个先完成都不要紧，因为 promise 会一直保持它们的解析状态。</p>
<p>然后我们使用两个连续的<code v-pre>yield</code>语句等待并从 promise 中取得解析值（分别取到<code v-pre>r1</code>和<code v-pre>r2</code>中）。如果<code v-pre>p1</code>首先解析，<code v-pre>yield p1</code>会首先继续执行然后等待<code v-pre>yield p2</code>继续执行。如果<code v-pre>p2</code>首先解析，它将会耐心地保持解析值知道被请求，但是<code v-pre>yield p1</code>将会首先停住，直到<code v-pre>p1</code>解析。</p>
<p>不管是哪一种情况，<code v-pre>p1</code>和<code v-pre>p2</code>都将并发地运行，并且在<code v-pre>r3 = yield request..</code>Ajax 请求发起之前，都必须完成，无论以哪种顺序。</p>
<p>如果这种流程控制处理模型听起来很熟悉，那是因为它基本上和我们在第三章中介绍的，因<code v-pre>Promise.all([ .. ])</code>工具成为可能的“门”模式是相同的。所以，我们也可以像这样表达这种流程控制：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 使两个请求“并行”并等待两个promise都被解析</span>
  <span class="token keyword">var</span> results <span class="token operator">=</span> <span class="token keyword">yield</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.2"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> r1 <span class="token operator">=</span> results<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> r2 <span class="token operator">=</span> results<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> r3 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.3/?v="</span> <span class="token operator">+</span> r1 <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> r2<span class="token punctuation">)</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r3<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用前面定义的`run(..)`工具</span>
<span class="token function">run</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 就像我们在第三章中讨论的，我们甚至可以用 ES6 解构赋值来把<code v-pre>var r1 = .. var r2 = ..</code>赋值简写为<code v-pre>var [r1,r2] = results</code>。</p>
<p>换句话说，在 generator+Promise 的方式中，Promise 所有的并发能力都是可用的。所以在任何地方，如果你需要比“这个然后那个”要复杂的顺序异步流程步骤时，Promise 都可能是最佳选择。</p>
<h4 id="promises-隐藏起来" tabindex="-1"><a class="header-anchor" href="#promises-隐藏起来" aria-hidden="true">#</a> Promises，隐藏起来</h4>
<p>作为代码风格的警告要说一句，要小心你在 <strong>你的 generator 内部</strong> 包含了多少 Promise 逻辑。以我们描述过的方式在异步性上使用 generator 的全部意义，是要创建简单，顺序，看似同步的代码，并尽可能多地将异步性细节隐藏在这些代码之外。</p>
<p>比如，这可能是一种更干净的方式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 注意：这是一个普通函数，不是generator</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">url1<span class="token punctuation">,</span> url2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">request</span><span class="token punctuation">(</span>url1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">request</span><span class="token punctuation">(</span>url2<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 将基于Promise的并发细节隐藏在`bar(..)`内部</span>
  <span class="token keyword">var</span> results <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1"</span><span class="token punctuation">,</span> <span class="token string">"http://some.url.2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> r1 <span class="token operator">=</span> results<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> r2 <span class="token operator">=</span> results<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> r3 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.3/?v="</span> <span class="token operator">+</span> r1 <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> r2<span class="token punctuation">)</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r3<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用刚才定义的`run(..)`工具</span>
<span class="token function">run</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>*foo()</code>内部，它更干净更清晰地表达了我们要做的事情：我们要求<code v-pre>bar(..)</code>给我们一些<code v-pre>results</code>，而我们将用<code v-pre>yield</code>等待它的发生。我们不必关心在底层一个<code v-pre>Promise.all([ .. ])</code>的 Promise 组合将被用来完成任务。</p>
<p><strong>我们将异步性，特别是 Promise，作为一种实现细节。</strong></p>
<p>如果你要做一种精巧的序列流控制，那么将你的 Promise 逻辑隐藏在一个仅仅从你的 generator 中调用的函数里特别有用。举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span> <span class="token punctuation">[</span>
				<span class="token function">baz</span><span class="token punctuation">(</span> <span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">)</span>
				<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span> <span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
				Promise<span class="token punctuation">.</span><span class="token function">race</span><span class="token punctuation">(</span> <span class="token punctuation">[</span> <span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">]</span> <span class="token punctuation">)</span>
			<span class="token punctuation">]</span> <span class="token punctuation">)</span>
			<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span> <span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有时候这种逻辑是必须的，而如果你直接把它扔在你的 generator 内部，你就违背了大多数你使用 generator 的初衷。我们 <em>应当</em> 有意地将这样的细节从 generator 代码中抽象出去，以使它们不会搞乱更高层的任务表达。</p>
<p>在创建功能强与性能好的代码之上，你还应当努力使代码尽可能地容易推理和维护。</p>
<p><strong>注意：</strong> 对于编程来说，抽象不总是一种健康的东西——许多时候它可能在得到简洁的同时增加复杂性。但是在这种情况下，我相信你的 generator+Promise 异步代码要比其他的选择健康得多。虽然有所有这些建议，你仍然要注意你的特殊情况，并为你和你的团队做出合适的决策。</p>
<h2 id="generator-委托" tabindex="-1"><a class="header-anchor" href="#generator-委托" aria-hidden="true">#</a> Generator 委托</h2>
<p>在上一节中，我们展示了从 generator 内部调用普通函数，和它如何作为一种有用的技术来将实现细节（比如异步 Promise 流程）抽象出去。但是为这样的任务使用普通函数的缺陷是，它必须按照普通函数的规则行动，也就是说它不能像 generator 那样用<code v-pre>yield</code>来暂停自己。</p>
<p>在你身上可能发生这样的事情：你可能会试着使用我们的<code v-pre>run(..)</code>帮助函数，从一个 generator 中调用另个一 generator。比如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> r2 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> r3 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.3/?v="</span> <span class="token operator">+</span> r2<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> r3<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> r1 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 通过`run(..)`“委托”到`*foo()`</span>
  <span class="token keyword">var</span> r3 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">run</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r3<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">run</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过再一次使用我们的<code v-pre>run(..)</code>工具，我们在<code v-pre>*bar()</code>内部运行<code v-pre>*foo()</code>。我们利用了这样一个事实：我们早先定义的<code v-pre>run(..)</code>返回一个 promise，这个 promise 在 generator 运行至完成时才解析（或发生错误），所以如果我们从一个<code v-pre>run(..)</code>调用中<code v-pre>yield</code>出一个 promise 给另一个<code v-pre>run(..)</code>，它就会自动暂停<code v-pre>*bar()</code>直到<code v-pre>*foo()</code>完成。</p>
<p>但这里有一个更好的办法将<code v-pre>*foo()</code>调用整合进<code v-pre>*bar()</code>，它称为<code v-pre>yield</code>委托。<code v-pre>yield</code>委托的特殊语法是：<code v-pre>yield * __</code>（注意额外的<code v-pre>*</code>）。让它在我们前面的例子中工作之前，让我们看一个更简单的场景：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"`*foo()` starting"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span> <span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span> <span class="token number">4</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"`*foo()` finished"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// `yield`-delegation!</span>
  <span class="token keyword">yield</span> <span class="token number">5</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 1</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 2</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// `*foo()` starting</span>
<span class="token comment">// 3</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// 4</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// `*foo()` finished</span>
<span class="token comment">// 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 在本章早前的一个注意点中，我解释了为什么我偏好<code v-pre>function *foo() ..</code>而不是<code v-pre>function* foo() ..</code>，相似地，我也偏好——与关于这个话题的其他大多数文档不同——说<code v-pre>yield *foo()</code>而不是<code v-pre>yield* foo()</code>。<code v-pre>*</code>的摆放是纯粹的风格问题，而且要看你的最佳判断。但我发现保持统一风格很吸引人。</p>
<p><code v-pre>yield *foo()</code>委托是如何工作的？</p>
<p>首先，正如我们看到过的那样，调用<code v-pre>foo()</code>创建了一个 <em>迭代器</em>。然后，<code v-pre>yield *</code>将（当前<code v-pre>*bar()</code>generator 的） <em>迭代器</em> 的控制委托/传递给这另一个<code v-pre>*foo()</code><em>迭代器</em>。</p>
<p>那么，前两个<code v-pre>it.next()</code>调用控制着<code v-pre>*bar()</code>，但当我们发起第三个<code v-pre>it.next()</code>调用时，<code v-pre>*foo()</code>就启动了，而且这时我们控制的是<code v-pre>*foo()</code>而非<code v-pre>*bar()</code>。这就是为什么它称为委托——<code v-pre>*bar()</code>将它的迭代控制委托给<code v-pre>*foo()</code>。</p>
<p>只要<code v-pre>it</code><em>迭代器</em> 的控制耗尽了整个<code v-pre>*foo()</code><em>迭代器</em>，它就会自动地将控制返回到<code v-pre>*bar()</code>。</p>
<p>那么现在回到前面的三个顺序 Ajax 请求的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> r2 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> r3 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.3/?v="</span> <span class="token operator">+</span> r2<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> r3<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> r1 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 通过`run(..)`“委托”到`*foo()`</span>
  <span class="token keyword">var</span> r3 <span class="token operator">=</span> <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r3<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">run</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个代码段和前面使用的版本的唯一区别是，使用了<code v-pre>yield *foo()</code>而不是前面的<code v-pre>yield run(foo)</code>。</p>
<p><strong>注意：</strong> <code v-pre>yield *</code>让出了迭代控制，不是 generator 控制；当你调用<code v-pre>*foo()</code>generator 时，你就<code v-pre>yield</code>委托给它的 <em>迭代器</em>。但你实际上可以<code v-pre>yield</code>委托给任何 <em>迭代器</em>；<code v-pre>yield *[1,2,3]</code>将会消费默认的<code v-pre>[1,2,3]</code>数组值 <em>迭代器</em>。</p>
<h3 id="为什么委托" tabindex="-1"><a class="header-anchor" href="#为什么委托" aria-hidden="true">#</a> 为什么委托？</h3>
<p><code v-pre>yield</code>委托的目的很大程度上是为了代码组织，而且这种方式是与普通函数调用对称的。</p>
<p>想象两个分别提供了<code v-pre>foo()</code>和<code v-pre>bar()</code>方法的模块，其中<code v-pre>bar()</code>调用<code v-pre>foo()</code>。它们俩分开的原因一般是由于为了程序将它们作为分离的程序来调用而进行的恰当组织。例如，可能会有一些情况<code v-pre>foo()</code>需要被独立调用，而其他地方<code v-pre>bar()</code>来调用<code v-pre>foo()</code>。</p>
<p>由于这些完全相同的原因，将 generator 分开可以增强程序的可读性，可维护性，与可调试性。从这个角度讲，<code v-pre>yield *</code>是一种快捷的语法，用来在<code v-pre>*bar()</code>内部手动地迭代<code v-pre>*foo()</code>的步骤。</p>
<p>如果<code v-pre>*foo()</code>中的步骤是异步的，这样的手动方式可能会特别复杂，这就是为什么你可能会需要那个<code v-pre>run(..)</code>工具来做它。正如我们已经展示的，<code v-pre>yield *foo()</code>消灭了使用<code v-pre>run(..)</code>工具的子实例（比如<code v-pre>run(foo)</code>）的需要。</p>
<h3 id="委托消息" tabindex="-1"><a class="header-anchor" href="#委托消息" aria-hidden="true">#</a> 委托消息</h3>
<p>你可能想知道，这种<code v-pre>yield</code>委托在除了与 <em>迭代器</em> 控制一起工作以外，是如何与双向消息传递一起工作的。仔细查看下面这些通过<code v-pre>yield</code>委托进进出出的消息流：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"inside `*foo()`:"</span><span class="token punctuation">,</span> <span class="token keyword">yield</span> <span class="token string">"B"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"inside `*foo()`:"</span><span class="token punctuation">,</span> <span class="token keyword">yield</span> <span class="token string">"C"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token string">"D"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"inside `*bar()`:"</span><span class="token punctuation">,</span> <span class="token keyword">yield</span> <span class="token string">"A"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// `yield`-委托！</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"inside `*bar()`:"</span><span class="token punctuation">,</span> <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"inside `*bar()`:"</span><span class="token punctuation">,</span> <span class="token keyword">yield</span> <span class="token string">"E"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token string">"F"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// outside: A</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// inside `*bar()`: 1</span>
<span class="token comment">// outside: B</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// inside `*foo()`: 2</span>
<span class="token comment">// outside: C</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// inside `*foo()`: 3</span>
<span class="token comment">// inside `*bar()`: D</span>
<span class="token comment">// outside: E</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// inside `*bar()`: 4</span>
<span class="token comment">// outside: F</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>特别注意一下<code v-pre>it.next(3)</code>调用之后的处理步骤：</p>
<ol>
<li>值<code v-pre>3</code>被传入（通过<code v-pre>*bar</code>里的<code v-pre>yield</code>委托）在<code v-pre>*foo()</code>内部等待中的<code v-pre>yield &quot;C&quot;</code>表达式。</li>
<li>然后<code v-pre>*foo()</code>调用<code v-pre>return &quot;D&quot;</code>，但是这个值不会一路返回到外面的<code v-pre>it.next(3)</code>调用。</li>
<li>相反地，值<code v-pre>&quot;D&quot;</code>作为结果被发送到在<code v-pre>*bar()</code>内部等待中的<code v-pre>yield *foo()</code>表示式——这个<code v-pre>yield</code>委托表达式实质上在<code v-pre>*foo()</code>被耗尽之前一直被暂停着。所以<code v-pre>&quot;D&quot;</code>被送到<code v-pre>*bar()</code>内部来让它打印。</li>
<li><code v-pre>yield &quot;E&quot;</code>在<code v-pre>*bar()</code>内部被调用，而且值<code v-pre>&quot;E&quot;</code>被让出到外部作为<code v-pre>it.next(3)</code>调用的结果。</li>
</ol>
<p>从外部 <em>迭代器</em>（<code v-pre>it</code>）的角度来看，在初始的 generator 和被委托的 generator 之间的控制没有任何区别。</p>
<p>事实上，<code v-pre>yield</code>委托甚至不必指向另一个 generator；它可以仅被指向一个非 generator 的，一般的 <em>iterable</em>。比如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"inside `*bar()`:"</span><span class="token punctuation">,</span> <span class="token keyword">yield</span> <span class="token string">"A"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// `yield`-委托至一个非generator</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"inside `*bar()`:"</span><span class="token punctuation">,</span> <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token punctuation">[</span><span class="token string">"B"</span><span class="token punctuation">,</span> <span class="token string">"C"</span><span class="token punctuation">,</span> <span class="token string">"D"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"inside `*bar()`:"</span><span class="token punctuation">,</span> <span class="token keyword">yield</span> <span class="token string">"E"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token string">"F"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// outside: A</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// inside `*bar()`: 1</span>
<span class="token comment">// outside: B</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// outside: C</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// outside: D</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// inside `*bar()`: undefined</span>
<span class="token comment">// outside: E</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// inside `*bar()`: 5</span>
<span class="token comment">// outside: F</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意这个例子与前一个之间，被接收/报告的消息的不同之处。</p>
<p>最惊人的是，默认的<code v-pre>array</code><em>迭代器</em> 不关心任何通过<code v-pre>next(..)</code>调用被发送的消息，所以值<code v-pre>2</code>，<code v-pre>3</code>，与<code v-pre>4</code>实质上被忽略了。另外，因为这个 <em>迭代器</em> 没有明确的<code v-pre>return</code>值（不像前面使用的<code v-pre>*foo()</code>），所以<code v-pre>yield *</code>表达式在它完成时得到一个<code v-pre>undefined</code>。</p>
<h4 id="异常也委托" tabindex="-1"><a class="header-anchor" href="#异常也委托" aria-hidden="true">#</a> 异常也委托！</h4>
<p>与<code v-pre>yield</code>委托在两个方向上透明地传递消息的方式相同，错误/异常也在双向传递：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">yield</span> <span class="token string">"B"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"error caught inside `*foo()`:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">yield</span> <span class="token string">"C"</span><span class="token punctuation">;</span>

  <span class="token keyword">throw</span> <span class="token string">"D"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">yield</span> <span class="token string">"A"</span><span class="token punctuation">;</span>

  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"error caught inside `*bar()`:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">yield</span> <span class="token string">"E"</span><span class="token punctuation">;</span>

  <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// note: can't get here!</span>
  <span class="token keyword">yield</span> <span class="token string">"G"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token string">"F"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// outside: A</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// outside: B</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">throw</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// error caught inside `*foo()`: 2</span>
<span class="token comment">// outside: C</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// error caught inside `*bar()`: D</span>
<span class="token comment">// outside: E</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"outside:"</span><span class="token punctuation">,</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"error caught outside:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// error caught outside: F</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中有一些事情要注意：</p>
<ol>
<li>但我们调用<code v-pre>it.throw(2)</code>时，它发送一个错误消息<code v-pre>2</code>到<code v-pre>*bar()</code>，而<code v-pre>*bar()</code>将它委托至<code v-pre>*foo()</code>，然后<code v-pre>*foo()</code>来<code v-pre>catch</code>它并平静地处理。之后，<code v-pre>yield &quot;C&quot;</code>把<code v-pre>&quot;C&quot;</code>作为返回的<code v-pre>value</code>发送回<code v-pre>it.throw(2)</code>调用。</li>
<li>接下来值<code v-pre>&quot;D&quot;</code>被从<code v-pre>*foo()</code>内部<code v-pre>throw</code>出来并传播到<code v-pre>*bar()</code>，<code v-pre>*bar()</code>会<code v-pre>catch</code>它并平静地处理。然后<code v-pre>yield &quot;E&quot;</code>把<code v-pre>&quot;E&quot;</code>作为返回的<code v-pre>value</code>发送回<code v-pre>it.next(3)</code>调用。</li>
<li>接下来，一个异常从<code v-pre>*baz()</code>中<code v-pre>throw</code>出来，而没有被<code v-pre>*bar()</code>捕获——我们没在外面<code v-pre>catch</code>它——所以<code v-pre>*baz()</code>和<code v-pre>*bar()</code>都被设置为完成状态。这段代码结束后，即便有后续的<code v-pre>next(..)</code>调用，你也不会得到值<code v-pre>&quot;G&quot;</code>——它们的<code v-pre>value</code>将返回<code v-pre>undefined</code>。</li>
</ol>
<h3 id="异步委托" tabindex="-1"><a class="header-anchor" href="#异步委托" aria-hidden="true">#</a> 异步委托</h3>
<p>最后让我们回到早先的多个顺序 Ajax 请求的例子，使用<code v-pre>yield</code>委托：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> r2 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> r3 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.3/?v="</span> <span class="token operator">+</span> r2<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> r3<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> r1 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> r3 <span class="token operator">=</span> <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r3<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">run</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>*bar()</code>内部，与调用<code v-pre>yield run(foo)</code>不同的是，我们调用<code v-pre>yield *foo()</code>就可以了。</p>
<p>在前一个版本的这个例子中，Promise 机制（通过<code v-pre>run(..)</code>控制的）被用于将值从<code v-pre>*foo()</code>中的<code v-pre>return r3</code>传送到<code v-pre>*bar()</code>内部的本地变量<code v-pre>r3</code>。现在，这个值通过<code v-pre>yield *</code>机制直接返回。</p>
<p>除此以外，它们的行为是一样的。</p>
<h3 id="递归-委托" tabindex="-1"><a class="header-anchor" href="#递归-委托" aria-hidden="true">#</a> “递归”委托</h3>
<p>当然，<code v-pre>yield</code>委托可以一直持续委托下去，你想连接多少步骤就连接多少。你甚至可以在具有异步能力的 generator 上“递归”使用<code v-pre>yield</code>委托——一个<code v-pre>yield</code>委托至自己的 generator：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>val <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 递归委托</span>
    val <span class="token operator">=</span> <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span>val <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url/?v="</span> <span class="token operator">+</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> r1 <span class="token operator">=</span> <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">run</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 我们的<code v-pre>run(..)</code>工具本可以用<code v-pre>run( foo, 3 )</code>来调用，因为它支持用额外传递的参数来进行 generator 的初始化。然而，为了在这里高调展示<code v-pre>yield *</code>的灵活性，我们使用了无参数的<code v-pre>*bar()</code>。</p>
<p>这段代码之后的处理步骤是什么？坚持住，它的细节要描述起来可是十分错综复杂：</p>
<ol>
<li><code v-pre>run(bar)</code>启动了<code v-pre>*bar()</code>generator。</li>
<li><code v-pre>foo(3)</code>为<code v-pre>*foo(..)</code>创建了 <em>迭代器</em> 并传递<code v-pre>3</code>作为它的<code v-pre>val</code>参数。</li>
<li>因为<code v-pre>3 &gt; 1</code>，<code v-pre>foo(2)</code>创建了另一个 <em>迭代器</em> 并传递<code v-pre>2</code>作为它的<code v-pre>val</code>参数。</li>
<li>因为<code v-pre>2 &gt; 1</code>，<code v-pre>foo(1)</code>又创建了另一个 <em>迭代器</em> 并传递<code v-pre>1</code>作为它的<code v-pre>val</code>参数。</li>
<li><code v-pre>1 &gt; 1</code>是<code v-pre>false</code>，所以我们接下来用值<code v-pre>1</code>调用<code v-pre>request(..)</code>，并得到一个代表第一个 Ajax 调用的 promise。</li>
<li>这个 promise 被<code v-pre>yield</code>出来，回到<code v-pre>*foo(2)</code>generator 实例。</li>
<li><code v-pre>yield *</code>将这个 promise 传出并回到<code v-pre>*foo(3)</code>生成 generator。另一个<code v-pre>yield *</code>把这个 promise 传出到<code v-pre>*bar()</code>generator 实例。而又有另一个<code v-pre>yield *</code>把这个 promise 传出到<code v-pre>run(..)</code>工具，而它将会等待这个 promise（第一个 Ajax 请求）再处理。</li>
<li>当这个 promise 解析时，它的完成消息会被发送以继续<code v-pre>*bar()</code>，<code v-pre>*bar()</code>通过<code v-pre>yield *</code>把消息传递进<code v-pre>*foo(3)</code>实例，<code v-pre>*foo(3)</code>实例通过<code v-pre>yield *</code>把消息传递进<code v-pre>*foo(2)</code>generator 实例，<code v-pre>*foo(2)</code>实例通过<code v-pre>yield *</code>把消息传给那个在<code v-pre>*foo(3)</code>generator 实例中等待的一般的<code v-pre>yield</code>。</li>
<li>这第一个 Ajax 调用的应答现在立即从<code v-pre>*foo(3)</code>generator 实例中被<code v-pre>return</code>，作为<code v-pre>*foo(2)</code>实例中<code v-pre>yield *</code>表达式的结果发送回来，并赋值给本地<code v-pre>val</code>变量。</li>
<li><code v-pre>*foo(2)</code>内部，第二个 Ajax 请求用<code v-pre>request(..)</code>发起，它的 promise 被<code v-pre>yield</code>回到<code v-pre>*foo(1)</code>实例，然后一路<code v-pre>yield *</code>传播到<code v-pre>run(..)</code>（回到第 7 步）。当 promise 解析时，第二个 Ajax 应答一路传播回到<code v-pre>*foo(2)</code>generator 实例，并赋值到他本地的<code v-pre>val</code>变量。</li>
<li>最终，第三个 Ajax 请求用<code v-pre>request(..)</code>发起，它的 promise 走出到<code v-pre>run(..)</code>，然后它的解析值一路返回，最后被<code v-pre>return</code>到在<code v-pre>*bar()</code>中等待的<code v-pre>yield *</code>表达式。</li>
</ol>
<p>天！许多疯狂的头脑杂技，对吧？你可能想要把它通读几遍，然后抓点儿零食放松一下大脑！</p>
<h2 id="generator-并发" tabindex="-1"><a class="header-anchor" href="#generator-并发" aria-hidden="true">#</a> Generator 并发</h2>
<p>正如我们在第一章和本章早先讨论过的，另个同时运行的“进程”可以协作地穿插它们的操作，而且许多时候这可以产生非常强大的异步表达式。</p>
<p>坦白地说，我们前面关于多个 generator 并发穿插的例子，展示了这真的容易让人糊涂。但我们也受到了启发，有些地方这种能力十分有用。</p>
<p>回想我们在第一章中看过的场景，两个不同但同时的 Ajax 应答处理需要互相协调，来确保数据通信不是竟合状态。我们这样把应答分别放在<code v-pre>res</code>数组的不同位置中：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>url <span class="token operator">==</span> <span class="token string">"http://some.url.1"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> data<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>url <span class="token operator">==</span> <span class="token string">"http://some.url.2"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> data<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是我们如何在这种场景下使用多 generator 呢？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// `request(..)` 是一个基于Promise的Ajax工具</span>

<span class="token keyword">var</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">reqData</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 我们将在这里使用两个<code v-pre>*reqData(..)</code>generator 的实例，但是这和分别使用两个不同 generator 的一个实例没有区别；这两种方式在道理上完全一样的。我们过一会儿就会看到两个 generator 的协调操作。</p>
<p>与不得不将<code v-pre>res[0]</code>和<code v-pre>res[1]</code>赋值手动排序不同，我们将使用协调过的顺序，让<code v-pre>res.push(..)</code>以可预见的顺序恰当地将值放在预期的位置。如此被表达的逻辑会让人感觉更干净。</p>
<p>但是我们将如何实际安排这种互动呢？首先，让我们手动实现它：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> it1 <span class="token operator">=</span> <span class="token function">reqData</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> it2 <span class="token operator">=</span> <span class="token function">reqData</span><span class="token punctuation">(</span><span class="token string">"http://some.url.2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> p1 <span class="token operator">=</span> it1<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
<span class="token keyword">var</span> p2 <span class="token operator">=</span> it2<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>

p1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  it1<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> p2<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  it2<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>*reqData(..)</code>的两个实例都开始发起它们的 Ajax 请求，然后用<code v-pre>yield</code>暂停。之后我们再<code v-pre>p1</code>解析时继续运行第一个实例，而后来的<code v-pre>p2</code>的解析将会重启第二个实例。以这种方式，我们使用 Promise 的安排来确保<code v-pre>res[0]</code>将持有第一个应答，而<code v-pre>res[1]</code>持有第二个应答。</p>
<p>但坦白地说，这是可怕的手动，而且它没有真正让 generator 组织它们自己，而那才是真正的力量。让我们用不同的方法试一下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// `request(..)` 是一个基于Promise的Ajax工具</span>

<span class="token keyword">var</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">reqData</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 传递控制权</span>
  <span class="token keyword">yield</span><span class="token punctuation">;</span>

  res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> it1 <span class="token operator">=</span> <span class="token function">reqData</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> it2 <span class="token operator">=</span> <span class="token function">reqData</span><span class="token punctuation">(</span><span class="token string">"http://some.url.2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> p1 <span class="token operator">=</span> it1<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
<span class="token keyword">var</span> p2 <span class="token operator">=</span> it2<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>

p1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  it1<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

p2<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  it2<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>p1<span class="token punctuation">,</span> p2<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  it1<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  it2<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好的，这看起来好些了（虽然仍然是手动），因为现在两个<code v-pre>*reqData(..)</code>的实例真正地并发运行了，而且（至少是在第一部分）是独立的。</p>
<p>在前一个代码段中，第二个实例在第一个实例完全完成之前没有给出它的数据。但是这里，只要它们的应答一返回这两个实例就立即分别收到他们的数据，然后每个实例调用另一个<code v-pre>yield</code>来传送控制。最后我们在<code v-pre>Promise.all([ .. ])</code>的处理器中选择用什么样的顺序继续它们。</p>
<p>可能不太明显的是，这种方式因其对称性启发了一种可复用工具的简单形式。让我们想象使用一个称为<code v-pre>runAll(..)</code>的工具：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// `request(..)` 是一个基于Promise的Ajax工具</span>

<span class="token keyword">var</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token function">runAll</span><span class="token punctuation">(</span>
  <span class="token keyword">function</span><span class="token operator">*</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> p1 <span class="token operator">=</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 传递控制权</span>
    <span class="token keyword">yield</span><span class="token punctuation">;</span>

    res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">yield</span> p1<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span><span class="token operator">*</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> p2 <span class="token operator">=</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 传递控制权</span>
    <span class="token keyword">yield</span><span class="token punctuation">;</span>

    res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">yield</span> p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 我们没有包含<code v-pre>runAll(..)</code>的实现代码，不仅因为它长得无法行文，也因为它是一个我们已经在先前的 <code v-pre>run(..)</code>中实现的逻辑的扩展。所以，作为留给读者的一个很好的补充性练习，请你自己动手改进<code v-pre>run(..)</code>的代码，来使它像想象中的<code v-pre>runAll(..)</code>那样工作。另外，我的 <em>asynquence</em> 库提供了一个前面提到过的<code v-pre>runner(..)</code>工具，它内建了这种能力，我们将在本书的附录 A 中讨论它。</p>
<p>这是<code v-pre>runAll(..)</code>内部的处理将如何操作：</p>
<ol>
<li>第一个 generator 得到一个代表从<code v-pre>&quot;http://some.url.1&quot;</code>来的 Ajax 应答，然后将控制权<code v-pre>yield</code>回到<code v-pre>runAll(..)</code>工具。</li>
<li>第二个 generator 运行，并对<code v-pre>&quot;http://some.url.2&quot;</code>做相同的事，将控制权<code v-pre>yield</code>回到<code v-pre>runAll(..)</code>工具。</li>
<li>第一个 generator 继续，然后<code v-pre>yield</code>出他的 promise<code v-pre>p1</code>。在这种情况下<code v-pre>runAll(..)</code>工具和我们前面的<code v-pre>run(..)</code>做同样的事，它等待 promise 解析，然后继续这同一个 generator（没有控制传递！）。当<code v-pre>p1</code>解析时，<code v-pre>runAll(..)</code>使用解析值再一次继续第一个 generator，而后<code v-pre>res[0]</code>得到它的值。在第一个 generator 完成之后，有一个隐式的控制权传递。</li>
<li>第二个 generator 继续，<code v-pre>yield</code>出它的 promise<code v-pre>p2</code>，并等待它的解析。一旦<code v-pre>p2</code>解析，<code v-pre>runAll(..)</code>使用这个解析值继续第二个 generator，于是<code v-pre>res[1]</code>被设置。</li>
</ol>
<p>在这个例子中，我们使用了一个称为<code v-pre>res</code>的外部变量来保存两个不同的 Ajax 应答的结果——这是我们的并发协调。</p>
<p>但是这样做可能十分有帮助：进一步扩展<code v-pre>runAll(..)</code>使它为多个 generator 实例提供 <em>分享的</em> 内部的变量作用域，比如一个我们将在下面称为<code v-pre>data</code>的空对象。另外，它可以接收被<code v-pre>yield</code>的非 Promise 值，并把它们交给下一个 generator。</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// `request(..)` 是一个基于Promise的Ajax工具</span>

<span class="token function">runAll</span><span class="token punctuation">(</span>
  <span class="token keyword">function</span><span class="token operator">*</span> <span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    data<span class="token punctuation">.</span>res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// 传递控制权（并传递消息）</span>
    <span class="token keyword">var</span> url1 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token string">"http://some.url.2"</span><span class="token punctuation">;</span>

    <span class="token keyword">var</span> p1 <span class="token operator">=</span> <span class="token function">request</span><span class="token punctuation">(</span>url1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "http://some.url.1"</span>

    <span class="token comment">// 传递控制权</span>
    <span class="token keyword">yield</span><span class="token punctuation">;</span>

    data<span class="token punctuation">.</span>res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">yield</span> p1<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span><span class="token operator">*</span> <span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 传递控制权（并传递消息）</span>
    <span class="token keyword">var</span> url2 <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token string">"http://some.url.1"</span><span class="token punctuation">;</span>

    <span class="token keyword">var</span> p2 <span class="token operator">=</span> <span class="token function">request</span><span class="token punctuation">(</span>url2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "http://some.url.2"</span>

    <span class="token comment">// 传递控制权</span>
    <span class="token keyword">yield</span><span class="token punctuation">;</span>

    data<span class="token punctuation">.</span>res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">yield</span> p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个公式中，两个 generator 不仅协调控制传递，实际上还互相通信：通过<code v-pre>data.res</code>，和交换<code v-pre>url1</code>与<code v-pre>url2</code>的值的<code v-pre>yield</code>消息。这强大到不可思议！</p>
<p>这样的认识也是一种更为精巧的称为 CSP（Communicating Sequential Processes——通信顺序处理）的异步技术的概念基础，我们将在本书的附录 B 中讨论它。</p>
<h2 id="thunks" tabindex="-1"><a class="header-anchor" href="#thunks" aria-hidden="true">#</a> Thunks</h2>
<p>至此，我们都假定从一个 generator 中<code v-pre>yield</code>一个 Promise——让这个 Promise 使用像<code v-pre>run(..)</code>这样的帮助工具来推进 generator——是管理使用 generator 的异步处理的最佳方法。明白地说，它是的。</p>
<p>但是我们跳过了一个被轻度广泛使用的模式，为了完整性我们将简单地看一看它。</p>
<p>在一般的计算机科学中，有一种老旧的前 JS 时代的概念，称为“thunk”。我们不在这里赘述它的历史，一个狭隘的表达是，thunk 是一个 JS 函数——没有任何参数——它连接并调用另一个函数。</p>
<p>换句话讲，你用一个函数定义包装函数调用——带着它需要的所有参数——来 <em>推迟</em> 这个调用的执行，而这个包装用的函数就是 thunk。当你稍后执行 thunk 时，你最终会调用那个原始的函数。</p>
<p>举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">fooThunk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 稍后</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">fooThunk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，一个同步的 thunk 是十分直白的。但是一个异步的 thunk 呢？我们实质上可以扩展这个狭隘的 thunk 定义，让它接收一个回调。</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">cb</span><span class="token punctuation">(</span>x <span class="token operator">+</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">fooThunk</span><span class="token punctuation">(</span><span class="token parameter">cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> cb<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 稍后</span>

<span class="token function">fooThunk</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">sum</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 7</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如你所见，<code v-pre>fooThunk(..)</code>仅需要一个<code v-pre>cb(..)</code>参数，因为它已经预先制定了值<code v-pre>3</code>和<code v-pre>4</code>（分别为<code v-pre>x</code>和<code v-pre>y</code>）并准备传递给<code v-pre>foo(..)</code>。一个 thunk 只是在外面耐心地等待着它开始工作所需的最后一部分信息：回调。</p>
<p>但是你不会想要手动制造 thunk。那么，让我们发明一个工具来为我们进行这种包装。</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">thunkify</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    args<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>cb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> fooThunk <span class="token operator">=</span> <span class="token function">thunkify</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 稍后</span>

<span class="token function">fooThunk</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">sum</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 7</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong> 这里我们假定原始的（<code v-pre>foo(..)</code>）函数签名希望它的回调的位置在最后，而其它的参数在这之前。这是一个异步 JS 函数的相当普遍的“标准”。你可以称它为“回调后置风格”。如果因为某些原因你需要处理“回调优先风格”的签名，你只需要制造一个使用<code v-pre>args.unshift(..)</code>而非<code v-pre>args.push(..)</code>的工具。</p>
<p>前面的<code v-pre>thunkify(..)</code>公式接收<code v-pre>foo(..)</code>函数的引用，和任何它所需的参数，并返回 thunk 本身（<code v-pre>fooThunk(..)</code>）。然而，这并不是你将在 JS 中发现的 thunk 的典型表达方式。</p>
<p>与<code v-pre>thunkify(..)</code>制造 thunk 本身相反，典型的——可能有点儿让人困惑的——<code v-pre>thunkify(..)</code>工具将产生一个制造 thunk 的函数。</p>
<p>额...是的。</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">thunkify</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      args<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>cb<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里主要的不同之处是有一个额外的<code v-pre>return function() { .. }</code>。这是它在用法上的不同：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> whatIsThis <span class="token operator">=</span> <span class="token function">thunkify</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> fooThunk <span class="token operator">=</span> <span class="token function">whatIsThis</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 稍后</span>

<span class="token function">fooThunk</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">sum</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 7</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>明显地，这段代码隐含的最大的问题是，<code v-pre>whatIsThis</code>叫什么合适？它不是 thunk，它是一个从<code v-pre>foo(..)</code>调用生产 thunk 的东西。它是一种“thunk”的“工厂”。而且看起来没有任何标准的意见来命名这种东西。</p>
<p>所以，我的提议是“thunkory”（&quot;thunk&quot; + &quot;factory&quot;）。于是，<code v-pre>thunkify(..)</code>制造了一个 thunkory，而一个 thunkory 制造 thunks。这个道理与第三章中我的“promisory”提议是对称的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> fooThunkory <span class="token operator">=</span> <span class="token function">thunkify</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> fooThunk1 <span class="token operator">=</span> <span class="token function">fooThunkory</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> fooThunk2 <span class="token operator">=</span> <span class="token function">fooThunkory</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 稍后</span>

<span class="token function">fooThunk1</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">sum</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 7</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">fooThunk2</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">sum</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 11</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 这个例子中的<code v-pre>foo(..)</code>期望的回调不是“错误优先风格”。当然，“错误优先风格”更常见。如果<code v-pre>foo(..)</code>有某种合理的错误发生机制，我们可以改变而使它期望并使用一个错误优先的回调。后续的<code v-pre>thunkify(..)</code>不会关心回调被预想成什么样。用法的唯一区别是<code v-pre>fooThunk1(function(err,sum){..</code>。</p>
<p>暴露出 thunkory 方法——而不是像早先的<code v-pre>thunkify(..)</code>那样将中间步骤隐藏起来——可能看起来像是没必要的混乱。但是一般来讲，在你的程序一开始就制造一些 thunkory 来包装既存 API 的方法是十分有用的，然后你就可以在你需要 thunk 的时候传递并调用这些 thunkory。这两个区别开的步骤保证了功能上更干净的分离。</p>
<p>来展示一下的话：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 更干净：</span>
<span class="token keyword">var</span> fooThunkory <span class="token operator">=</span> <span class="token function">thunkify</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> fooThunk1 <span class="token operator">=</span> <span class="token function">fooThunkory</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> fooThunk2 <span class="token operator">=</span> <span class="token function">fooThunkory</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 而这个不干净：</span>
<span class="token keyword">var</span> fooThunk1 <span class="token operator">=</span> <span class="token function">thunkify</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> fooThunk2 <span class="token operator">=</span> <span class="token function">thunkify</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不管你是否愿意明确对付 thunkory，thunk（<code v-pre>fooThunk1(..)</code>和<code v-pre>fooThunk2(..)</code>）的用法还是一样的。</p>
<h3 id="s-promise-thunk" tabindex="-1"><a class="header-anchor" href="#s-promise-thunk" aria-hidden="true">#</a> s/promise/thunk/</h3>
<p>那么所有这些 thunk 的东西与 generator 有什么关系？</p>
<p>一般性地比较一下 thunk 和 promise：它们是不能直接互换的，因为它们在行为上不是等价的。比起单纯的 thunk，Promise 可用性更广泛，而且更可靠。</p>
<p>但从另一种意义上讲，它们都可以被看作是对一个值的请求，这个请求可能被异步地应答。</p>
<p>回忆第三章，我们定义了一个工具来 promise 化一个函数，我们称之为<code v-pre>Promise.wrap(..)</code>——我们本来也可以叫它<code v-pre>promisify(..)</code>的！这个 Promise 化包装工具不会生产 Promise；它生产那些继而生产 Promise 的 promisories。这和我们当前讨论的 thunkory 和 thunk 是完全对称的。</p>
<p>为了描绘这种对称性，让我们首先将<code v-pre>foo(..)</code>的例子改为假定一个“错误优先风格”回调的形式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 假定 `cb(..)` 是“错误优先风格”</span>
    <span class="token function">cb</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> x <span class="token operator">+</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们将比较<code v-pre>thunkify(..)</code>和<code v-pre>promisify(..)</code>（也就是第三章的<code v-pre>Promise.wrap(..)</code>）：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 对称的：构建问题的回答者</span>
<span class="token keyword">var</span> fooThunkory <span class="token operator">=</span> <span class="token function">thunkify</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> fooPromisory <span class="token operator">=</span> <span class="token function">promisify</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 对称的：提出问题</span>
<span class="token keyword">var</span> fooThunk <span class="token operator">=</span> <span class="token function">fooThunkory</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> fooPromise <span class="token operator">=</span> <span class="token function">fooPromisory</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 取得 thunk 的回答</span>
<span class="token function">fooThunk</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> sum</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 7</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 取得 promise 的回答</span>
fooPromise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">sum</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 7</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>thunkory 和 promisory 实质上都是在问一个问题（一个值），thunk 的<code v-pre>fooThunk</code>和 promise 的<code v-pre>fooPromise</code>分别代表这个问题的未来的答案。这样看来，对称性就清楚了。</p>
<p>带着这个视角，我们可以看到为了异步而<code v-pre>yield</code>Promise 的 generator，也可以为异步而<code v-pre>yield</code>thunk。我们需要的只是一个更聪明的<code v-pre>run(..)</code>工具（就像以前一样），它不仅可以寻找并连接一个被<code v-pre>yield</code>的 Promise，而且可以给一个被<code v-pre>yield</code>的 thunk 提供回调。</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> val <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">run</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<code v-pre>request(..)</code>既可以是一个返回一个 promise 的 promisory，也可以是一个返回一个 thunk 的 thunkory。从 generator 的内部代码逻辑的角度看，我们不关心这个实现细节，这就它强大的地方！</p>
<p>所以，<code v-pre>request(..)</code>可以使以下任何一种形式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// promisory `request(..)` （见第三章）</span>
<span class="token keyword">var</span> request <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span>ajax<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// vs.</span>

<span class="token comment">// thunkory `request(..)`</span>
<span class="token keyword">var</span> request <span class="token operator">=</span> <span class="token function">thunkify</span><span class="token punctuation">(</span>ajax<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，作为一个让我们早先的<code v-pre>run(..)</code>工具支持 thunk 的补丁，我们可能会需要这样的逻辑：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// ..</span>
<span class="token comment">// 我们收到了一个回调吗？</span>
<span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> next<span class="token punctuation">.</span>value <span class="token operator">==</span> <span class="token string">"function"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 使用一个错误优先回调调用thunk</span>
		next<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token function">reject</span><span class="token punctuation">(</span> err <span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">else</span> <span class="token punctuation">{</span>
				<span class="token function">resolve</span><span class="token punctuation">(</span> msg <span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span> <span class="token punctuation">)</span>
	<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
		handleNext<span class="token punctuation">,</span>
		<span class="token keyword">function</span> <span class="token function">handleErr</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>
				it<span class="token punctuation">.</span><span class="token function">throw</span><span class="token punctuation">(</span> err <span class="token punctuation">)</span>
			<span class="token punctuation">)</span>
			<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span> handleResult <span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们 generator 既可以调用 promisory 来<code v-pre>yield</code>Promise，也可以调用 thunkory 来<code v-pre>yield</code>thunk，而不论那种情况，<code v-pre>run(..)</code>都将处理这个值并等待它的完成，以继续 generator。</p>
<p>在对称性上，这两个方式是看起来相同的。然而，我们应当指出这仅仅从 Promise 或 thunk 表示延续 generator 的未来值的角度讲是成立的。</p>
<p>从更高的角度讲，与 Promise 被设计成的那样不同，thunk 没有提供，它们本身也几乎没有任何可靠性和可组合性的保证。在这种特定的 generator 异步模式下使用一个 thunk 作为 Promise 的替代品是可以工作的，但与 Promise 提供的所有好处相比，这应当被看做是一种次理想的方法。</p>
<p>如果你有选择，那就偏向<code v-pre>yield pr</code>而非<code v-pre>yield th</code>。但是使<code v-pre>run(..)</code>工具可以处理两种类型的值本身没有什么问题。</p>
<p><strong>注意：</strong> 在我们将要在附录 A 中讨论的，我的 <em>asynquence</em> 库中的<code v-pre>runner(..)</code>工具，可以处理<code v-pre>yield</code>的 Promise，thunk 和 <em>asynquence</em> 序列。</p>
<h2 id="前-es6-时代的-generator" tabindex="-1"><a class="header-anchor" href="#前-es6-时代的-generator" aria-hidden="true">#</a> 前 ES6 时代的 Generator</h2>
<p>我希望你已经被说服了，generator 是一个异步编程工具箱里的非常重要的增强工具。但它是 ES6 中的新语法，这意味着你不能像填补 Promise（它只是新的 API）那样填补 generator。那么如果我们不能奢望忽略前 ES6 时代的浏览器，我们该如何将 generator 带到浏览器中呢？</p>
<p>对所有 ES6 中的新语法的扩展，有一些工具——称呼他们最常见的名词是转译器（transpilers），也就是转换编译器（trans-compilers）——它们会拿起你的 ES6 语法，并转换为前 ES6 时代的等价代码（但是明显地变难看了！）。所以，generator 可以被转译为具有相同行为但可以在 ES5 或以下版本进行工作的代码。</p>
<p>但是怎么做到的？<code v-pre>yield</code>的“魔法”听起来不像是那么容易转译的。在我们早先的基于闭包的 <em>迭代器</em> 例子中，实际上提示了一种解决方法。</p>
<h3 id="手动变形" tabindex="-1"><a class="header-anchor" href="#手动变形" aria-hidden="true">#</a> 手动变形</h3>
<p>在我们讨论转译器之前，让我们延伸一下，在 generator 的情况下如何手动转译。这不仅是一个学院派的练习，因为这样做实际上可以帮助我们进一步理解它们如何工作。</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// `request(..)` 是一个支持Promise的Ajax工具</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"requesting:"</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> val <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">request</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Oops:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个要注意的事情是，我们仍然需要一个可以被调用的普通的<code v-pre>foo()</code>函数，而且它仍然需要返回一个 <em>迭代器</em>。那么让我们来画出非 generator 的变形草图：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>

  <span class="token comment">// 制造并返回 iterator</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">next</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ..</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">throw</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ..</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token string">"http://some.url.1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下一个需要注意的地方是，generator 通过挂起它的作用域/状态来施展它的“魔法”，但我们可以用函数闭包来模拟。为了理解如何写出这样的代码，我们将先用状态值注释 generator 不同的部分：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// `request(..)` 是一个支持Promise的Ajax工具</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 状态 *1*</span>

  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"requesting:"</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> <span class="token constant">TMP1</span> <span class="token operator">=</span> <span class="token function">request</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 状态 *2*</span>
    <span class="token keyword">var</span> val <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token constant">TMP1</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 状态 *3*</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Oops:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 为了更准去地讲解，我们使用<code v-pre>TMP1</code>变量将<code v-pre>val = yield request..</code>语句分割为两部分。<code v-pre>request(..)</code>发生在状态<code v-pre>*1*</code>，而将完成值赋给<code v-pre>val</code>发生在状态<code v-pre>*2*</code>。在我们将代码转换为非 generator 的等价物后，我们就可以摆脱中间的<code v-pre>TMP1</code>。</p>
<p>换句话所，<code v-pre>*1*</code>是初始状态，<code v-pre>*2*</code>是<code v-pre>request(..)</code>成功的状态，<code v-pre>*3*</code>是<code v-pre>request(..)</code>失败的状态。你可能会想象额外的<code v-pre>yield</code>步骤将如何编码为额外的状态。</p>
<p>回到我们被转译的 generator，让我们在这个闭包中定义一个变量<code v-pre>state</code>，用它来追踪状态：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 管理 generator 状态</span>
  <span class="token keyword">var</span> state<span class="token punctuation">;</span>

  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们在闭包内部定义一个称为<code v-pre>process(..)</code>的内部函数，它用<code v-pre>switch</code>语句来处理各种状态。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// `request(..)` 是一个支持Promise的Ajax工具</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 管理 generator 状态</span>
  <span class="token keyword">var</span> state<span class="token punctuation">;</span>

  <span class="token comment">// generator-范围的变量声明</span>
  <span class="token keyword">var</span> val<span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>state<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"requesting:"</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">request</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
        val <span class="token operator">=</span> v<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span>
        <span class="token keyword">var</span> err <span class="token operator">=</span> v<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Oops:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的 generator 中每种状态都在<code v-pre>switch</code>语句中有它自己的<code v-pre>case</code>。每当我们需要处理一个新状态时，<code v-pre>process(..)</code>就会被调用。我们一会就回来讨论它如何工作。</p>
<p>对任何 generator 范围的变量声明（<code v-pre>val</code>），我们将它们移动到<code v-pre>process(..)</code>外面的<code v-pre>var</code>声明中，这样它们就可以在<code v-pre>process(..)</code>的多次调用中存活下来。但是“块儿作用域”的<code v-pre>err</code>变量仅在<code v-pre>*3*</code>状态下需要，所以我们将它留在原处。</p>
<p>在状态<code v-pre>*1*</code>，与<code v-pre>yield request(..)</code>相反，我们<code v-pre>return request(..)</code>。在终结状态<code v-pre>*2*</code>，没有明确的<code v-pre>return</code>，所以我们仅仅<code v-pre>return;</code>也就是<code v-pre>return undefined</code>。在终结状态<code v-pre>*3*</code>，有一个<code v-pre>return false</code>，我们保留它。</p>
<p>现在我们需要定义 <em>迭代器</em> 函数的代码，以便人们恰当地调用<code v-pre>process(..)</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 管理 generator 状态</span>
  <span class="token keyword">var</span> state<span class="token punctuation">;</span>

  <span class="token comment">// generator-范围的变量声明</span>
  <span class="token keyword">var</span> val<span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>state<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"requesting:"</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">request</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
        val <span class="token operator">=</span> v<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span>
        <span class="token keyword">var</span> err <span class="token operator">=</span> v<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Oops:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 制造并返回 iterator</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">next</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 初始状态</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>state<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
          <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 成功地让出继续值</span>
      <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token function">process</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// generator 已经完成了</span>
      <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">throw</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 在状态 *1* 中，有唯一明确的错误处理</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token function">process</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 否则，是一个不会被处理的错误，所以我们仅仅把它扔回去</span>
      <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> e<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码如何工作？</p>
<ol>
<li>第一个对 <em>迭代器</em> 的<code v-pre>next()</code>调用将把 gtenerator 从未初始化的状态移动到状态<code v-pre>1</code>，然后调用<code v-pre>process()</code>来处理这个状态。<code v-pre>request(..)</code>的返回值是一个代表 Ajax 应答的 promise，它作为<code v-pre>value</code>属性从<code v-pre>next()</code>调用被返回。</li>
<li>如果 Ajax 请求成功，第二个<code v-pre>next(..)</code>调用应当送进 Ajax 的应答值，它将我们的状态移动到<code v-pre>2</code>。<code v-pre>process(..)</code>再次被调用（这次它被传入 Ajax 应答的值），而从<code v-pre>next(..)</code>返回的<code v-pre>value</code>属性将是<code v-pre>undefined</code>。</li>
<li>然而，如果 Ajax 请求失败，应当用错误调用<code v-pre>throw(..)</code>，它将状态从<code v-pre>1</code>移动到<code v-pre>3</code>（而不是<code v-pre>2</code>）。<code v-pre>process(..)</code>再一次被调用，这词被传入了错误的值。这个<code v-pre>case</code>返回<code v-pre>false</code>，所以<code v-pre>false</code>作为<code v-pre>throw(..)</code>调用返回的<code v-pre>value</code>属性。</li>
</ol>
<p>从外面看——也就是仅仅与 <em>迭代器</em> 互动——这个普通的<code v-pre>foo(..)</code>函数与<code v-pre>*foo(..)</code>generator 的工作方式是一样的。所以我们有效地将 ES6 generator“转译”为前 ES6 可兼容的！</p>
<p>然后我们就可以手动初始化我们的 generator 并控制它的迭代器——调用<code v-pre>var it = foo(&quot;..&quot;)</code>和<code v-pre>it.next(..)</code>等等——或更好地，我们可以将它传递给我们先前定义的<code v-pre>run(..)</code>工具，比如<code v-pre>run(foo,&quot;..&quot;)</code>。</p>
<h3 id="自动转译" tabindex="-1"><a class="header-anchor" href="#自动转译" aria-hidden="true">#</a> 自动转译</h3>
<p>前面的练习——手动编写从 ES6 generator 到前 ES6 的等价物的变形过程——教会了我们 generator 在概念上是如何工作的。但是这种变形真的是错综复杂，而且不能很好地移植到我们代码中的其他 generator 上。手动做这些工作是不切实际的，而且将会把 generator 的好处完全抵消掉。</p>
<p>但走运的是，已经存在几种工具可以自动地将 ES6 generator 转换为我们在前一节延伸出的东西。它们不仅帮我们做力气活儿，还可以处理几种我们敷衍而过的情况。</p>
<p>一个这样的工具是 regenerator（https://facebook.github.io/regenerator/），由Facebook的聪明伙计们开发的。</p>
<p>如果我们用 regenerator 来转译我们前面的 generator，这就是产生的代码（在编写本文时）：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// `request(..)` 是一个支持Promise的Ajax工具</span>

<span class="token keyword">var</span> foo <span class="token operator">=</span> regeneratorRuntime<span class="token punctuation">.</span><span class="token function">mark</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> val<span class="token punctuation">;</span>

  <span class="token keyword">return</span> regeneratorRuntime<span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span>
    <span class="token keyword">function</span> <span class="token function">foo$</span><span class="token punctuation">(</span><span class="token parameter">context$1$0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>context$1$0<span class="token punctuation">.</span>prev <span class="token operator">=</span> context$1$0<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span>
            context$1$0<span class="token punctuation">.</span>prev <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"requesting:"</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span><span class="token punctuation">;</span>
            context$1$0<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token function">request</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span>
            val <span class="token operator">=</span> context$1$0<span class="token punctuation">.</span>sent<span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
            context$1$0<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
          <span class="token keyword">case</span> <span class="token number">8</span><span class="token operator">:</span>
            context$1$0<span class="token punctuation">.</span>prev <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
            context$1$0<span class="token punctuation">.</span>t0 <span class="token operator">=</span> context$1$0<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Oops:"</span><span class="token punctuation">,</span> context$1$0<span class="token punctuation">.</span>t0<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> context$1$0<span class="token punctuation">.</span><span class="token function">abrupt</span><span class="token punctuation">(</span><span class="token string">"return"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">case</span> <span class="token number">12</span><span class="token operator">:</span>
          <span class="token keyword">case</span> <span class="token string">"end"</span><span class="token operator">:</span>
            <span class="token keyword">return</span> context$1$0<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    foo<span class="token punctuation">,</span>
    <span class="token keyword">this</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这和我们的手动推导有明显的相似性，比如<code v-pre>switch</code>/<code v-pre>case</code>语句，而且我们甚至可以看到，<code v-pre>val</code>被拉到了闭包外面，正如我们做的那样。</p>
<p>当然，一个代价是这个 generator 的转译需要一个帮助工具库<code v-pre>regeneratorRuntime</code>，它持有全部管理一个普通 generator/<em>迭代器</em> 所需的可复用逻辑。它的许多模板代码看起来和我们的版本不同，但即便如此，概念还是可以看到的，比如使用<code v-pre>context$1$0.next = 4</code>追踪 generator 的下一个状态。</p>
<p>主要的结论是，generator 不仅限于 ES6+的环境中才有用。一旦你理解了它的概念，你可以在你的所有代码中利用他们，并使用工具将代码变形为旧环境兼容的。</p>
<p>这比使用<code v-pre>Promise</code>API 的填补来实现前 ES6 的 Promise 要做更多的工作，但是努力完全是值得的，因为对于以一种可推理的，合理的，看似同步的顺序风格来表达异步流程控制来说，generator 实在是好太多了。</p>
<p>一旦你适应了 generator，你将永远不会回到面条般的回调地狱了！</p>
<h2 id="复习" tabindex="-1"><a class="header-anchor" href="#复习" aria-hidden="true">#</a> 复习</h2>
<p>generator 是一种 ES6 的新函数类型，它不像普通函数那样运行至完成。相反，generator 可以暂停在一种中间完成状态（完整地保留它的状态），而且它可以从暂停的地方重新开始。</p>
<p>这种暂停/继续的互换是一种协作而非抢占，这意味着 generator 拥有的唯一能力是使用<code v-pre>yield</code>关键字暂停它自己，而且控制这个 generator 的 <em>迭代器</em> 拥有的唯一能力是继续这个 generator（通过<code v-pre>next(..)</code>）。</p>
<p><code v-pre>yield</code>/<code v-pre>next(..)</code>的对偶不仅是一种控制机制，它实际上是一种双向消息传递机制。一个<code v-pre>yield ..</code>表达式实质上为了等待一个值而暂停，而下一个<code v-pre>next(..)</code>调用将把值（或隐含的<code v-pre>undefined</code>）传递回这个暂停的<code v-pre>yield</code>表达式。</p>
<p>与异步流程控制关联的 generator 的主要好处是，在一个 generator 内部的代码以一种自然的同步/顺序风格表达一个任务的各个步骤的序列。这其中的技巧是我们实质上将潜在的异步处理隐藏在<code v-pre>yield</code>关键字的后面——将异步处理移动到控制 generator 的 <em>迭代器</em> 代码中。</p>
<p>换句话说，generator 为异步代码保留了顺序的，同步的，阻塞的代码模式，这允许我们的大脑更自然地推理代码，解决了基于回调的异步产生的两个关键问题中的一个。</p>
</div></template>


