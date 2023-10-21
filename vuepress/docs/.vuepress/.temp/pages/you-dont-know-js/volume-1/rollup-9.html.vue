<template><div><h1 id="第4章-混合-淆-类-的对象" tabindex="-1"><a class="header-anchor" href="#第4章-混合-淆-类-的对象" aria-hidden="true">#</a> 第4章: 混合（淆）“类”的对象</h1>
<p>接着我们上一章对对象的探索，我们很自然的将注意力转移到“面向对象（OO）编程”，与“类（class）”。在研究类的具体机制之前，我们先介绍面向类的设计模式：</p>
<ul>
<li>实例化（instantiation）</li>
<li>继承（inheritance）</li>
<li>（相对）多态（polymorphism）</li>
</ul>
<p>我们将会看到，这些概念并不是非常自然地映射到 JS 的对象机制上，以及许多 JavaScript 开发者为了克服这些挑战所做的努力（mixins 等）。</p>
<p><strong>注意：</strong> 这一章花了相当一部分时间（前一半！）在着重解释“面向对象编程”理论上。在后半部分讨论“Mixins（混合）”时，我们最终会将这些理论与真实且实际的 JavaScript 代码联系起来。但是这里首先要蹚过许多概念和假想代码，所以可别跟丢了 —— 坚持下去！</p>
<h2 id="类理论" tabindex="-1"><a class="header-anchor" href="#类理论" aria-hidden="true">#</a> 类理论</h2>
<p>“类/继承”描述了一种特定的代码组织和结构形式 —— 一种在我们的软件中对真实世界的建模方法。</p>
<p>OO 或者面向类的编程强调数据和操作它的行为之间有固有的联系（当然，依数据的类型和性质不同而不同！），所以合理的设计是将数据和行为打包在一起（也称为封装）。这有时在正式的计算机科学中称为“数据结构”。</p>
<p>比如，表示一个单词或短语的一系列字符通常称为“string（字符串）”。这些字符就是数据。但你几乎从来不关心数据，你总是想对数据 <em>做事情</em>， 所以可以 <em>向</em> 数据实施的行为（计算它的长度，在末尾添加数据，检索，等等）都被设计成为 <code v-pre>String</code> 类的方法。</p>
<p>任何给定的字符串都是这个类的一个实例，这个类是一个整齐的集合包装：字符数据和我们可以对它进行操作的功能。</p>
<p>类还隐含着对一个特定数据结构的一种 <em>分类</em> 方法。其做法是将一个给定的结构考虑为一个更加泛化的基础定义的具体种类。</p>
<p>让我们通过一个最常被引用的例子来探索这种分类处理。一辆 <em>车</em> 可以被描述为一“类”更泛化的东西 —— <em>载具</em> —— 的具体实现。</p>
<p>我们在软件中通过定义 <code v-pre>Vehicle</code> 类和 <code v-pre>Car</code> 类来模型化这种关系。</p>
<p><code v-pre>Vehicle</code> 的定义可能会包含像动力（引擎等），载人能力等等，这些都是行为。我们在 <code v-pre>Vehicle</code> 中定义的都是所有（或大多数）不同类型的载具（飞机、火车、机动车）都共同拥有的东西。</p>
<p>在我们的软件中为每一种不同类型的载具一次又一次地重定义“载人能力”这个基本性质可能没有道理。反而，我们在 <code v-pre>Vehicle</code> 中把这个能力定义一次，之后当我们定义 <code v-pre>Car</code> 时，我们简单地指出它从基本的 <code v-pre>Vehicle</code> 定义中“继承”（或“扩展”）。于是 <code v-pre>Car</code> 的定义就被称为特化了更一般的 <code v-pre>Vehicle</code> 定义。</p>
<p><code v-pre>Vehicle</code> 和 <code v-pre>Car</code> 用方法的形式集约地定义了行为，另一方面一个实例中的数据就像一个唯一的车牌号一样属于一辆具体的车。</p>
<p><strong>这样，类，继承，和实例化就诞生了。</strong></p>
<p>另一个关于类的关键概念是“多态（polymorphism）”，它描述这样的想法：一个来自于父类的泛化行为可以被子类覆盖，从而使它更加具体。实际上，相对多态允许我们在覆盖行为中引用基础行为。</p>
<p>类理论强烈建议父类和子类对相同的行为共享同样的方法名，以便于子类（差异化地）覆盖父类。我们即将看到，在你的 JavaScript 代码中这么做会导致种种困难和脆弱的代码。</p>
<h3 id="类-设计模式" tabindex="-1"><a class="header-anchor" href="#类-设计模式" aria-hidden="true">#</a> &quot;类&quot;设计模式</h3>
<p>你可能从没把类当做一种“设计模式”考虑过，因为最常见的是关于流行的“面向对象设计模式”的讨论，比如“迭代器（Iterator）”、“观察者（Observer）”、“工厂（Factory）”、“单例（Singleton）”等等。当以这种方式表现时，几乎可以假定 OO 的类是我们实现所有（高级）设计模式的底层机制，好像对所有代码来说 OO 是一个给定的基础。</p>
<p>取决于你在编程方面接受过的正规教育的水平，你可能听说过“过程式编程（procedural programming）”：一种不用任何高级抽象，仅仅由过程（也就是函数）调用其他函数构成的描述代码的方式。你可能被告知过，类是一个将过程式风格的“面条代码”转换为结构良好，组织良好代码的 <em>恰当</em> 的方法。</p>
<p>当然，如果你有“函数式编程（functional programming）”的经验，你可能知道类只是几种常见设计模式中的一种。但是对于其他人来说，这可能是第一次你问自己，类是否真的是代码的根本基础，或者它们是在代码顶层上的选择性抽象。</p>
<p>有些语言（比如 Java）不给你选择，所以这根本没什么 <em>选择性</em> —— 一切都是类。其他语言如 C/C++ 或 PHP 同时给你过程式和面向类的语法，在使用哪种风格合适或混合风格上，留给开发者更多选择。</p>
<h3 id="javascript-的-类" tabindex="-1"><a class="header-anchor" href="#javascript-的-类" aria-hidden="true">#</a> JavaScript 的“类”</h3>
<p>在这个问题上 JavaScript 属于哪一边？JS 拥有 <em>一些</em> 像类的语法元素（比如 <code v-pre>new</code> 和 <code v-pre>instanceof</code>）有一阵子了，而且在最近的 ES6 中，还有一些追加的东西，比如 <code v-pre>class</code> 关键字（见附录 A）。</p>
<p>但这意味着 JavaScript 实际上 <em>拥有</em> 类吗？简单明了：<strong>没有。</strong></p>
<p>由于类是一种设计模式，你 <em>可以</em>，用相当的努力（正如我们将在本章剩下的部分看到的），近似实现很多经典类的功能。JS 在通过提供看起来像类的语法，来努力满足用类进行设计的极其广泛的 <em>渴望</em>。</p>
<p>虽然我们好像有了看起来像类的语法，但是 JavaScript 机制好像在抵抗你使用 <em>类设计模式</em>，因为在底层，这些你正在上面工作的机制运行的十分不同。语法糖和（极其广泛被使用的）JS “Class”库费了很大力气来把这些真实情况对你隐藏起来，但你迟早会面对现实：你在其他语言中遇到的 <em>类</em> 和你在 JS 中模拟的“类”不同。</p>
<p>总而言之，类是软件设计中的一种可选模式，你可以选择在 JavaScript 中使用或不使用它。因为许多开发者都对面向类的软件设计情有独钟，我们将在本章剩下的部分中探索一下，为了使用 JS 提供的东西维护类的幻觉要付出什么代价，和我们经历的痛苦。</p>
<h2 id="类机制" tabindex="-1"><a class="header-anchor" href="#类机制" aria-hidden="true">#</a> 类机制</h2>
<p>在许多面向类语言中，“标准库”都提供一个叫“栈”（压栈，弹出等）的数据结构，用一个 <code v-pre>Stack</code> 类表示。这个类拥有一组变量来存储数据，还拥有一组可公开访问的行为（“方法”），这些行为使你的代码有能力与（隐藏的）数据互动（添加或移除数据等等）。</p>
<p>但是在这样的语言中，你不是直接在 <code v-pre>Stack</code> 上操作（除非制造一个 <strong>静态的</strong> 类成员引用，但这超出了我们要讨论的范围）。<code v-pre>Stack</code> 类仅仅是 <em>任何</em> 的“栈”都会做的事情的一个抽象解释，但它本身不是一个“栈”。为了得到一个可以对之进行操作的实在的数据结构，你必须 <strong>实例化</strong> 这个 <code v-pre>Stack</code> 类。</p>
<h3 id="建筑物" tabindex="-1"><a class="header-anchor" href="#建筑物" aria-hidden="true">#</a> 建筑物</h3>
<p>传统的&quot;类（class）&quot;和&quot;实例（instance）&quot;的比拟源自于建筑物的建造。</p>
<p>一个建筑师会规划出一栋建筑的所有性质：多宽，多高，在哪里有多少窗户，甚至墙壁和天花板用什么材料。在这个时候，她并不关心建筑物将会被建造在 <em>哪里</em>，她也不关心有 <em>多少</em> 这栋建筑的拷贝将被建造。</p>
<p>同时她也不关心这栋建筑的内容 —— 家具、墙纸、吊扇等等 —— 她仅关心建筑物含有何种结构。</p>
<p>她生产的建筑学上的蓝图仅仅是建筑物的“方案”。它们不实际构成我们可以实在进入其中并坐下的建筑物。为了这个任务我们需要一个建筑工人。建筑工人会拿走方案并精确地依照它们 <em>建造</em> 这栋建筑物。在真正的意义上，他是在将方案中意图的性质 <em>拷贝</em> 到物理建筑物中。</p>
<p>一旦完成，这栋建筑就是蓝图方案的一个物理实例，一个很可能实质完美的 <em>拷贝</em>。然后建筑工人就可以移动到隔壁将它再重做一遍，建造另一个 <em>拷贝</em>。</p>
<p>建筑物与蓝图间的关系是间接的。你可以检视蓝图来了解建筑物是如何构造的，但对于直接考察建筑物的每一部分，仅有蓝图是不够的。如果你想打开一扇门，你不得不走进建筑物自身 —— 蓝图仅仅是为了用来 <em>表示</em> 门的位置而在纸上画的线条。</p>
<p>一个类就是一个蓝图。为了实际得到一个对象并与之互动，我们必须从类中建造（也就是实例化）某些东西。这种“构建”的最终结果是一个对象，通常称为一个“实例”，我们可以按需要直接调用它的方法，访问它的公共数据属性。</p>
<p><strong>这个对象是所有在类中被描述的特性的 <em>拷贝</em>。</strong></p>
<p>你不太可能会指望走进一栋建筑之后发现，一份用于规划这栋建筑物的蓝图被裱起来挂在墙上，虽然蓝图可能在办公室的公共记录的文件中。相似地，你一般不会使用对象实例来直接访问和操作类，但是对于判定对象实例来自于 <em>哪个类</em> 至少是可能的。</p>
<p>与考虑对象实例与它源自的类的任何间接关系相比，考虑类和对象实例的直接关系更有用。<strong>一个类通过拷贝操作被实例化为对象的形式。</strong></p>
<img src="@source/you-dont-know-js/assets/this-object-prototypes-fig1.png">
<p>如你所见，箭头由左向右，从上至下，这表示着概念上和物理上发生的拷贝操作。</p>
<h3 id="构造器-constructor" tabindex="-1"><a class="header-anchor" href="#构造器-constructor" aria-hidden="true">#</a> 构造器（Constructor）</h3>
<p>类的实例由类的一种特殊方法构建，这个方法的名称通常与类名相同，称为 <em>“构造器（constructor）”</em>。这个方法的具体工作，就是初始化实例所需的所有信息（状态）。</p>
<p>比如，考虑下面这个类的假想代码（语法是自创的）：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">CoolGuy</span> <span class="token punctuation">{</span>
  specialTrick <span class="token operator">=</span> nothing<span class="token punctuation">;</span>

  <span class="token function">CoolGuy</span><span class="token punctuation">(</span><span class="token parameter">trick</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    specialTrick <span class="token operator">=</span> trick<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">showOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">output</span><span class="token punctuation">(</span><span class="token string">"Here's my trick: "</span><span class="token punctuation">,</span> specialTrick<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了 <em>制造</em> 一个 <code v-pre>CoolGuy</code> 实例，我们需要调用类的构造器:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Joe <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CoolGuy</span><span class="token punctuation">(</span><span class="token string">"jumping rope"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Joe<span class="token punctuation">.</span><span class="token function">showOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Here's my trick: jumping rope</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>CoolGuy</code> 类有一个构造器 <code v-pre>CoolGuy()</code>，它实际上就是在我们说 <code v-pre>new CoolGuy(..)</code> 时调用的。我们从这个构造器拿回一个对象（类的一个实例），我们可以调用 <code v-pre>showOff()</code> 方法，来打印这个特定的 <code v-pre>CoolGuy</code> 的特殊才艺。</p>
<p><em>显然，跳绳使 Joe 看起来很酷。</em></p>
<p>类的构造器 <em>属于</em> 那个类，几乎总是和类同名。同时，构造器大多数情况下总是需要用 <code v-pre>new</code> 来调用，以便使语言的引擎知道你想要构建一个 <em>新的</em> 类的实例。</p>
<h2 id="类继承" tabindex="-1"><a class="header-anchor" href="#类继承" aria-hidden="true">#</a> 类继承</h2>
<p>在面向类的语言中，你不仅可以定义一个能够初始化它自己的类，你还可以定义另外一个类 <strong>继承</strong> 自第一个类。</p>
<p>这第二个类通常被称为“子类”，而第一个类被称为“父类”。这些名词显然来自于亲子关系的比拟，虽然这种比拟有些扭曲，就像你马上要看到的。</p>
<p>当一个家长拥有一个和他有血缘关系的孩子时，家长的遗传性质会被拷贝到孩子身上。明显地，在大多数生物繁殖系统中，双亲都平等地贡献基因进行混合。但是为了这个比拟的目的，我们假设只有一个亲人。</p>
<p>一旦孩子出现，他或她就从亲人那里分离出来。这个孩子受其亲人的继承因素的严重影响，但是独一无二。如果这个孩子拥有红色的头发，这并不意味这他的亲人的头发 <em>曾经</em> 是红色，或者会自动 <em>变成</em> 红色。</p>
<p>以相似的方式，一旦一个子类被定义，它就分离且区别于父类。子类含有一份从父类那里得来的行为的初始拷贝，但它可以覆盖这些继承的行为，甚至是定义新行为。</p>
<p>重要的是，要记住我们是在讨论父 <strong>类</strong> 和子 <strong>类</strong>，而不是物理上的东西。这就是这个亲子比拟让人糊涂的地方，因为我们实际上应当说父类就是亲人的 DNA，而子类就是孩子的 DNA。我们不得不从两套 DNA 制造出（也就是“初始化”）人，用得到的物理上存在的人来与之进行谈话。</p>
<p>让我们把生物学上的亲子放在一边，通过一个稍稍不同的角度来看看继承：不同种类型的载具。这是用来理解继承的最经典（也是争议不断的）的比拟。</p>
<p>让我们重新审视本章前面的 <code v-pre>Vehicle</code> 和 <code v-pre>Car</code> 的讨论。考虑下面表达继承的类的假想代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
	engines <span class="token operator">=</span> <span class="token number">1</span>

	<span class="token function">ignition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">output</span><span class="token punctuation">(</span> <span class="token string">"Turning on my engine."</span> <span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token function">drive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">ignition</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token function">output</span><span class="token punctuation">(</span> <span class="token string">"Steering and moving forward!"</span> <span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Car</span> inherits Vehicle <span class="token punctuation">{</span>
	wheels <span class="token operator">=</span> <span class="token number">4</span>

	<span class="token function">drive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">inherited</span><span class="token operator">:</span><span class="token function">drive</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token function">output</span><span class="token punctuation">(</span> <span class="token string">"Rolling on all "</span><span class="token punctuation">,</span> wheels<span class="token punctuation">,</span> <span class="token string">" wheels!"</span> <span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">SpeedBoat</span> inherits Vehicle <span class="token punctuation">{</span>
	engines <span class="token operator">=</span> <span class="token number">2</span>

	<span class="token function">ignition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">output</span><span class="token punctuation">(</span> <span class="token string">"Turning on my "</span><span class="token punctuation">,</span> engines<span class="token punctuation">,</span> <span class="token string">" engines."</span> <span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token function">pilot</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">inherited</span><span class="token operator">:</span><span class="token function">drive</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token function">output</span><span class="token punctuation">(</span> <span class="token string">"Speeding through the water with ease!"</span> <span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 为了简洁明了，这些类的构造器被省略了。</p>
<p>我们定义 <code v-pre>Vehicle</code> 类，假定它有一个引擎，有一个打开打火器的方法，和一个行驶的方法。但你永远也不会制造一个泛化的“载具”，所以在这里它只是一个概念的抽象。</p>
<p>然后我们定义了两种具体的载具：<code v-pre>Car</code> 和 <code v-pre>SpeedBoat</code>。它们都继承 <code v-pre>Vehicle</code> 的泛化性质，但之后它们都对这些性质进行了恰当的特化。一辆车有 4 个轮子，一艘快艇有两个引擎，意味着它需要在打火时需要特别注意要启动两个引擎。</p>
<h3 id="多态-polymorphism" tabindex="-1"><a class="header-anchor" href="#多态-polymorphism" aria-hidden="true">#</a> 多态（Polymorphism）</h3>
<p><code v-pre>Car</code> 定义了自己的 <code v-pre>drive()</code> 方法，它覆盖了从 <code v-pre>Vehicle</code> 继承来的同名方法。但是，<code v-pre>Car</code> 的 <code v-pre>drive()</code> 方法调用了 <code v-pre>inherited:drive()</code>，这表示 <code v-pre>Car</code> 可以引用它继承的，覆盖之前的原版 <code v-pre>drive()</code>。<code v-pre>SpeedBoat</code> 的 <code v-pre>pilot()</code> 方法也引用了它继承的 <code v-pre>drive()</code> 拷贝。</p>
<p>这种技术称为“多态（polymorphism）”，或“虚拟多态（virtual polymorphism）”。对我们当前的情况更具体一些，我们称之为“相对多态（relative polymorphism）”。</p>
<p>多态这个话题比我们可以在这里谈到的内容要宽泛的多，但我们当前的“相对”意味着一个特殊层面：任何方法都可以引用位于继承层级上更高一层的其他（同名或不同名的）方法。我们说“相对”，因为我们不绝对定义我们想访问继承的哪一层（也就是类），而实质上用“向上一层”来相对地引用。</p>
<p>在许多语言中，在这个例子中出现 <code v-pre>inherited:</code> 的地方使用了 <code v-pre>super</code> 关键字，它基于这样的想法：一个“超类（super class）”是当前类的父亲/祖先。</p>
<p>多态的另一个方面是，一个方法名可以在继承链的不同层级上有多种定义，而且在解析哪个方法在被调用时，这些定义可以适当地被自动选择。</p>
<p>在我们上面的例子中，我们看到这种行为发生了两次：<code v-pre>drive()</code> 在 <code v-pre>Vehicle</code> 和 <code v-pre>Car</code> 中定义, 而 <code v-pre>ignition()</code> 在 <code v-pre>Vehicle</code> 和 <code v-pre>SpeedBoat</code> 中定义。</p>
<p><strong>注意：</strong> 另一个传统面向类语言通过 <code v-pre>super</code> 给你的能力，是从子类的构造器中直接访问父类构造器。这很大程度上是对的，因为对真正的类来说，构造器属于这个类。然而在 JS 中，这是相反的 —— 实际上认为“类”属于构造器（<code v-pre>Foo.prototype...</code> 类型引用）更恰当。因为在 JS 中，父子关系仅存在于它们各自的构造器的两个<code v-pre>.prototype</code> 对象间，构造器本身不直接关联，而且没有简单的方法从一个中相对引用另一个（参见附录 A，看看 ES6 中用 <code v-pre>super</code> “解决”此问题的 <code v-pre>class</code>）。</p>
<p>可以从 <code v-pre>ignition()</code> 中具体看出多态的一个有趣的含义。在 <code v-pre>pilot()</code> 内部，一个相对多态引用指向了（被继承的）<code v-pre>Vehicle</code> 版本的 <code v-pre>drive()</code>。而这个 <code v-pre>drive()</code> 仅仅通过名称（不是相对引用）来引用 <code v-pre>ignition()</code> 方法。</p>
<p>语言的引擎会使用哪一个版本的 <code v-pre>ignition()</code>？是 <code v-pre>Vehicle</code> 的还是 <code v-pre>SpeedBoat</code> 的？<strong>它会使用 <code v-pre>SpeedBoat</code> 版本的 <code v-pre>ignition()</code>。</strong> 如果你 <em>能</em> 初始化 <code v-pre>Vehicle</code> 类自身，并且调用它的 <code v-pre>drive()</code>，那么语言引擎将会使用 <code v-pre>Vehicle</code> 的 <code v-pre>ignition()</code> 定义。</p>
<p>换句话说，<code v-pre>ignition()</code> 方法的定义，根据你引用的实例是哪个类（继承层级）而 <em>多态</em>（改变）。</p>
<p>这看起来过于深入学术细节了。不过为了好好地与 JavaScript 的 <code v-pre>[[Prototype]]</code> 机制的类似行为进行对比，理解这些细节还是很重要的。</p>
<p>如果类是继承而来的，<strong>对这些类本身</strong>（不是由它们创建的对象！）有一个方法可以 <em>相对地</em> 引用它们继承的对象，这个相对引用通常称为 <code v-pre>super</code>。</p>
<p>记得刚才这幅图：</p>
<img src="@source/you-dont-know-js/assets/this-object-prototypes-fig2.png">
<p>注意对于实例化(<code v-pre>a1</code>、<code v-pre>a2</code>、<code v-pre>b1</code>、和 <code v-pre>b2</code>) <em>和</em> 继承(<code v-pre>Bar</code>)，箭头如何表示拷贝操作。</p>
<p>从概念上讲，看起来子类 <code v-pre>Bar</code> 可以使用相对多态引用（也就是 <code v-pre>super</code>）来访问它的父类 <code v-pre>Foo</code> 的行为。然而在现实中，子类不过是被给与了一份它从父类继承来的行为的拷贝而已。如果子类“覆盖”一个它继承的方法，原版的方法和覆盖版的方法实际上都是存在的，所以它们都是可以访问的。</p>
<p>不要让多态把你搞糊涂，使你认为子类是链接到父类上的。子类得到一份它需要从父类继承的东西的拷贝。<strong>类继承意味着拷贝。</strong></p>
<h3 id="多重继承-multiple-inheritance" tabindex="-1"><a class="header-anchor" href="#多重继承-multiple-inheritance" aria-hidden="true">#</a> 多重继承（Multiple Inheritance）</h3>
<p>能回想起我们早先提到的亲子和 DNA 吗？我们说过这个比拟有些奇怪，因为生物学上大多数后代来自于双亲。如果类可以继承自其他两个类，那么这个亲子比拟会更合适一些。</p>
<p>有些面向类的语言允许你指定一个以上的“父类”来进行“继承”。多重继承意味着每个父类的定义都被拷贝到子类中。</p>
<p>表面上看来，这是对面向类的一个强大的加成，给我们能力去将更多功能组合在一起。然而，这无疑会产生一些复杂的问题。如果两个父类都提供了名为 <code v-pre>drive()</code> 的方法，在子类中的 <code v-pre>drive()</code> 引用将会解析为哪个版本？你会总是不得不手动指明哪个父类的 <code v-pre>drive()</code> 是你想要的，从而失去一些多态继承的优雅之处吗？</p>
<p>还有另外一个所谓的“钻石问题”：子类“D”继承自两个父类（“B”和“C”），它们两个又继承自共通的父类“A”。如果“A”提供了方法 <code v-pre>drive()</code>，而“B”和“C”都覆盖（多态地）了这个方法，那么当“D”引用 <code v-pre>drive()</code> 时，它应当使用那个版本呢（<code v-pre>B:drive()</code> 还是 <code v-pre>C:drive()</code>）？</p>
<img src="@source/you-dont-know-js/assets/this-object-prototypes-fig3.png">
<p>事情会比我们这样窥豹一斑能看到的复杂得多。我们在这里将它们提出来，只是便于我们可以将它和 JavaScript 机制的工作方式比较。</p>
<p>JavaScript 更简单：它不为“多重继承”提供原生机制。许多人认为这是好事，因为省去的复杂性要比“减少”的功能多得多。但是这并不能阻挡开发者们用各种方法来模拟它，我们接下来就看看。</p>
<h2 id="混合-mixin" tabindex="-1"><a class="header-anchor" href="#混合-mixin" aria-hidden="true">#</a> 混合（Mixin）</h2>
<p>当你“继承”或是“实例化”时，JavaScript 的对象机制不会 <em>自动地</em> 执行拷贝行为。很简单，在 JavaScript 中没有“类”可以拿来实例化，只有对象。而且对象也不会被拷贝到另一个对象中，而是被 <em>链接在一起</em>（详见第五章）。</p>
<p>因为在其他语言中观察到的类的行为意味着拷贝，让我们来看看 JS 开发者如何在 JavaScript 中 <strong>模拟</strong> 这种 <em>缺失</em> 的类的拷贝行为：mixins（混合）。我们会看到两种“mixin”：<strong>明确的（explicit）</strong> 和 <strong>隐含的（implicit）</strong>。</p>
<h3 id="明确的-mixin-explicit-mixins" tabindex="-1"><a class="header-anchor" href="#明确的-mixin-explicit-mixins" aria-hidden="true">#</a> 明确的 Mixin（Explicit Mixins）</h3>
<p>让我们再次回顾前面的 <code v-pre>Vehicle</code> 和 <code v-pre>Car</code> 的例子。因为 JavaScript 不会自动地将行为从 <code v-pre>Vehicle</code> 拷贝到 <code v-pre>Car</code>，我们可以建造一个工具来手动拷贝。这样的工具经常被许多库/框架称为 <code v-pre>extend(..)</code>，但为了便于说明，我们在这里叫它 <code v-pre>mixin(..)</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 大幅简化的 `mixin(..)` 示例：</span>
<span class="token keyword">function</span> <span class="token function">mixin</span><span class="token punctuation">(</span><span class="token parameter">sourceObj<span class="token punctuation">,</span> targetObj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> sourceObj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 仅拷贝非既存内容</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> targetObj<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      targetObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> sourceObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> targetObj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> Vehicle <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">engines</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>

  <span class="token function-variable function">ignition</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Turning on my engine."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function-variable function">drive</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ignition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Steering and moving forward!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> Car <span class="token operator">=</span> <span class="token function">mixin</span><span class="token punctuation">(</span>Vehicle<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">wheels</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>

  <span class="token function-variable function">drive</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Vehicle<span class="token punctuation">.</span><span class="token function">drive</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Rolling on all "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>wheels <span class="token operator">+</span> <span class="token string">" wheels!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 重要的细节：我们谈论的不再是类，因为在 JavaScript 中没有类。<code v-pre>Vehicle</code> 和 <code v-pre>Car</code> 分别只是我们实施拷贝的源和目标对象。</p>
<p><code v-pre>Car</code> 现在拥有了一份从 <code v-pre>Vehicle</code> 得到的属性和函数的拷贝。技术上讲，函数实际上没有被复制，而是指向函数的 <em>引用</em> 被复制了。所以，<code v-pre>Car</code> 现在有一个称为 <code v-pre>ignition</code> 的属性，它是一个 <code v-pre>ignition()</code> 函数引用的拷贝；而且它还有一个称为 <code v-pre>engines</code> 的属性，持有从 <code v-pre>Vehicle</code> 拷贝来的值 <code v-pre>1</code>。</p>
<p><code v-pre>Car</code><em>已经</em> 有了 <code v-pre>drive</code> 属性（函数），所以这个属性引用没有被覆盖（参见上面 <code v-pre>mixin(..)</code> 的 <code v-pre>if</code> 语句）。</p>
<h4 id="重温-多态-polymorphism" tabindex="-1"><a class="header-anchor" href="#重温-多态-polymorphism" aria-hidden="true">#</a> 重温&quot;多态（Polymorphism）&quot;</h4>
<p>我们来考察一下这个语句：<code v-pre>Vehicle.drive.call( this )</code>。我将之称为“显式假想多态（explicit pseudo-polymorphism）”。回想一下，我们前一段假想代码的这一行是我们称之为“相对多态（relative polymorphism）”的 <code v-pre>inherited:drive()</code>。</p>
<p>JavaScript 没有能力实现相对多态（ES6 之前，见附录 A）。所以，<strong>因为 <code v-pre>Car</code> 和 <code v-pre>Vehicle</code> 都有一个名为 <code v-pre>drive()</code> 的函数</strong>，为了在它们之间区别调用，我们必须使用绝对（不是相对）引用。我们明确地用名称指出 <code v-pre>Vehicle</code> 对象，然后在它上面调用 <code v-pre>drive()</code> 函数。</p>
<p>但如果我们说 <code v-pre>Vehicle.drive()</code>，那么这个函数调用的 <code v-pre>this</code> 绑定将会是 <code v-pre>Vehicle</code> 对象，而不是 <code v-pre>Car</code> 对象（见第二章），那不是我们想要的。所以，我们使用 <code v-pre>.call( this )</code>（见第二章）来保证 <code v-pre>drive()</code> 在 <code v-pre>Car</code> 对象的环境中被执行。</p>
<p><strong>注意：</strong> 如果 <code v-pre>Car.drive()</code> 的函数名称标识符没有与 <code v-pre>Vehicle.drive()</code> 的重叠（也就是“遮蔽（shadowed）”；见第五章），我们就不会有机会演示“方法多态（method polymorphism）”。因为那样的话，一个指向 <code v-pre>Vehicle.drive()</code> 的引用会被 <code v-pre>mixin(..)</code> 调用拷贝，而我们可以使用 <code v-pre>this.drive()</code> 直接访问它。被选用的标识符重叠 <strong>遮蔽</strong> 就是为什么我们不得不使用更复杂的 <em>显式假想多态（explicit pseudo-polymorphism）</em> 的原因。</p>
<p>在拥有相对多态的面向类的语言中，<code v-pre>Car</code> 和 <code v-pre>Vehicle</code> 间的连接在类定义的顶端被建立一次，那里是维护这种关系的唯一场所。</p>
<p>但是由于 JavaScript 的特殊性，显式假想多态（因为遮蔽！） <strong>在每一个你需要这种（假想）多态引用的函数中</strong> 建立了一种脆弱的手动/显式链接。这可能会显著地增加维护成本。而且，虽然显式假想多态可以模拟“多重继承”的行为，但这只会增加复杂性和代码脆弱性。</p>
<p>这种方法的结果通常是更加复杂，更难读懂，<em>而且</em> 更难维护的代码。<strong>应当尽可能地避免使用显式假想多态</strong>，因为在大部分层面上它的代价要高于利益。</p>
<h4 id="混合拷贝-mixing-copies" tabindex="-1"><a class="header-anchor" href="#混合拷贝-mixing-copies" aria-hidden="true">#</a> 混合拷贝（Mixing Copies）</h4>
<p>回忆一下上面的 <code v-pre>mixin(..)</code> 工具：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 大幅简化的 `mixin()` 示例:</span>
<span class="token keyword">function</span> <span class="token function">mixin</span><span class="token punctuation">(</span><span class="token parameter">sourceObj<span class="token punctuation">,</span> targetObj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> sourceObj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 仅拷贝不存在的属性</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> targetObj<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      targetObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> sourceObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> targetObj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们考察一下 <code v-pre>mixin(..)</code> 如何工作。它迭代 <code v-pre>sourceObj</code>（在我们的例子中是 <code v-pre>Vehicle</code>）的所有属性，如果在 <code v-pre>targetObj</code>（在我们的例子中是 <code v-pre>Car</code>）中没有名称与之匹配的属性，它就进行拷贝。因为我们是在初始对象存在的情况下进行拷贝，所以我们要小心不要将目标属性覆盖掉。</p>
<p>如果在指明 <code v-pre>Car</code> 的具体内容之前，我们先进行拷贝，那么我们就可以省略对 <code v-pre>targetObj</code> 检查，但是这样做有些笨拙且低效，所以通常不优先选用：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 另一种 mixin，对覆盖不太“安全”</span>
<span class="token keyword">function</span> <span class="token function">mixin</span><span class="token punctuation">(</span><span class="token parameter">sourceObj<span class="token punctuation">,</span> targetObj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> sourceObj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    targetObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> sourceObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> targetObj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> Vehicle <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 首先，创建一个空对象</span>
<span class="token comment">// 将 Vehicle 的内容拷贝进去</span>
<span class="token keyword">var</span> Car <span class="token operator">=</span> <span class="token function">mixin</span><span class="token punctuation">(</span>Vehicle<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 现在拷贝 Car 的具体内容</span>
<span class="token function">mixin</span><span class="token punctuation">(</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">wheels</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>

    <span class="token function-variable function">drive</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  Car
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不论哪种方法，我们都明确地将 <code v-pre>Vehicle</code> 中的非重叠内容拷贝到 <code v-pre>Car</code> 中。“mixin”这个名称来自于解释这个任务的另一种方法：<code v-pre>Car</code> <strong>混入</strong> <code v-pre>Vehicle</code> 的内容，就像你吧巧克力碎片混入你最喜欢的曲奇饼面团。</p>
<p>这个拷贝操作的结果，是 <code v-pre>Car</code> 将会独立于 <code v-pre>Vehicle</code> 运行。如果你在 <code v-pre>Car</code> 上添加属性，它不会影响到 <code v-pre>Vehicle</code>，反之亦然。</p>
<p><strong>注意：</strong> 这里有几个小细节被忽略了。仍然有一些微妙的方法使两个对象在拷贝完成后还能互相“影响”对方，比如它们共享一个共通对象（比如数组）的引用。</p>
<p>由于两个对象还共享它们的共通函数的引用，这意味着 <strong>即便手动将函数从一个对象拷贝（也就是混入）到另一个对象中，也不能 <em>实际上模拟</em> 发生在面向类的语言中的从类到实例的真正的复制</strong>。</p>
<p>JavaScript 函数不能真正意义上地（以标准，可靠的方式）被复制，所以你最终得到的是同一个共享的函数对象（函数是对象；见第三章）的 <strong>被复制的引用</strong>。举例来说，如果你在一个共享的函数对象（比如 <code v-pre>ignition()</code>）上添加属性来修改它，<code v-pre>Vehicle</code> 和 <code v-pre>Car</code> 都会通过这个共享的引用而受“影响”。</p>
<p>在 JavaScript 中明确的 mixin 是一种不错的机制。但是它们显得言过其实。<strong>和将一个属性定义两次相比</strong>，将属性从一个对象拷贝到另一个对象并不会产生多少 <em>实际的</em> 好处。而且由于我们刚才提到的函数对象引用的微妙之处，这显得尤为正确。</p>
<p>如果你明确地将两个或更多对象混入你的目标对象，你可以 <strong>某种程度上模拟</strong> “多重继承”的行为，但是在将方法或属性从多于一个源对象那里拷贝过来时，没有直接的办法可以解决名称的冲突。有些开发者/库使用“延迟绑定（late binding）”和其他诡异的替代方法来解决问题，但从根本上讲，这些“技巧” <em>通常</em> 得不偿失（而且低效！）。</p>
<p>要小心的是，仅在明确的 mixin 能够实际提高代码可读性时使用它，而如果你发现它使代码变得更很难追溯，或在对象间建立了不必要或笨重的依赖性时，要避免使用这种模式。</p>
<p><strong>如果正确使用 mixin 使你的问题变得比以前 <em>困难</em></strong>，那么你可能应当停止使用 mixin。事实上，如果你不得不使用复杂的库/工具来处理这些细节，那么这可能标志着你正走在更困难，也许没必要的道路上。在第六章中，我们将试着提取一种更简单的方法来实现我们期望的结果，同时免去这些周折。</p>
<h4 id="寄生继承-parasitic-inheritance" tabindex="-1"><a class="header-anchor" href="#寄生继承-parasitic-inheritance" aria-hidden="true">#</a> 寄生继承（Parasitic Inheritance）</h4>
<p>明确的 mixin 模式的一个变种，在某种意义上是明确的而在某种意义上是隐含的，称为“寄生继承（Parasitic Inheritance）”，它主要是由 Douglas Crockford 推广的。</p>
<p>这是它如何工作：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// “传统的 JS 类” `Vehicle`</span>
<span class="token keyword">function</span> <span class="token function">Vehicle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>engines <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Vehicle</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">ignition</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Turning on my engine."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">Vehicle</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">drive</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ignition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Steering and moving forward!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// “寄生类” `Car`</span>
<span class="token keyword">function</span> <span class="token function">Car</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 首先, `car` 是一个 `Vehicle`</span>
  <span class="token keyword">var</span> car <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vehicle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 现在, 我们修改 `car` 使它特化</span>
  car<span class="token punctuation">.</span>wheels <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>

  <span class="token comment">// 保存一个 `Vehicle::drive()` 的引用</span>
  <span class="token keyword">var</span> vehDrive <span class="token operator">=</span> car<span class="token punctuation">.</span>drive<span class="token punctuation">;</span>

  <span class="token comment">// 覆盖 `Vehicle::drive()`</span>
  car<span class="token punctuation">.</span><span class="token function-variable function">drive</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">vehDrive</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Rolling on all "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>wheels <span class="token operator">+</span> <span class="token string">" wheels!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> car<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> myCar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Car</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

myCar<span class="token punctuation">.</span><span class="token function">drive</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Turning on my engine.</span>
<span class="token comment">// Steering and moving forward!</span>
<span class="token comment">// Rolling on all 4 wheels!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如你所见，我们一开始从“父类”（对象）<code v-pre>Vehicle</code> 制造了一个定义的拷贝，之后将我们的“子类”（对象）定义混入其中（按照需要保留父类的引用），最后将组合好的对象 <code v-pre>car</code> 作为子类实例传递出去。</p>
<p><strong>注意：</strong> 当我们调用 <code v-pre>new Car()</code> 时，一个新对象被创建并被 <code v-pre>Car</code> 的 <code v-pre>this</code> 所引用（见第二章）。但是由于我们没有使用这个对象，而是返回我们自己的 <code v-pre>car</code> 对象，所以这个初始化创建的对象就被丢弃了。因此，<code v-pre>Car()</code> 可以不用 <code v-pre>new</code> 关键字调用，就可以实现和上面代码相同的功能，而且还可以省去对象的创建和回收。</p>
<h3 id="隐含的-mixin-implicit-mixins" tabindex="-1"><a class="header-anchor" href="#隐含的-mixin-implicit-mixins" aria-hidden="true">#</a> 隐含的 Mixin（Implicit Mixins）</h3>
<p>隐含的 mixin 和前面解释的 <em>显式假想多态</em> 是紧密相关的。所以它们需要注意相同的事项。</p>
<p>考虑这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> Something <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">cool</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>greeting <span class="token operator">=</span> <span class="token string">"Hello World"</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">?</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

Something<span class="token punctuation">.</span><span class="token function">cool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Something<span class="token punctuation">.</span>greeting<span class="token punctuation">;</span> <span class="token comment">// "Hello World"</span>
Something<span class="token punctuation">.</span>count<span class="token punctuation">;</span> <span class="token comment">// 1</span>

<span class="token keyword">var</span> Another <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">cool</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 隐式地将 `Something` 混入 `Another`</span>
    Something<span class="token punctuation">.</span><span class="token function">cool</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

Another<span class="token punctuation">.</span><span class="token function">cool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Another<span class="token punctuation">.</span>greeting<span class="token punctuation">;</span> <span class="token comment">// "Hello World"</span>
Another<span class="token punctuation">.</span>count<span class="token punctuation">;</span> <span class="token comment">// 1 (不会和 `Something` 共享状态)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Something.cool.call( this )</code> 既可以在“构造器”调用中使用（最常见的情况），也可以在方法调用中使用（如这里所示），我们实质上“借用”了 <code v-pre>Something.cool()</code> 函数并在 <code v-pre>Another</code> 环境下，而非 <code v-pre>Something</code> 环境下调用它（通过 <code v-pre>this</code> 绑定，见第二章）。结果是，<code v-pre>Something.cool()</code> 中进行的赋值被实施到了 <code v-pre>Another</code> 对象而非 <code v-pre>Something</code> 对象。</p>
<p>那么，这就是说我们将 <code v-pre>Something</code> 的行为“混入”了 <code v-pre>Another</code>。</p>
<p>虽然这种技术看起来有效利用了 <code v-pre>this</code> 再绑定的功能，也就是生硬地调用 <code v-pre>Something.cool.call( this )</code>，但是这种调用不能被作为相对（也更灵活的）引用，所以你应当 <strong>提高警惕</strong>。一般来说，<strong>应当尽量避免使用这种结构</strong> 以保持代码干净而且易于维护。</p>
<h2 id="复习" tabindex="-1"><a class="header-anchor" href="#复习" aria-hidden="true">#</a> 复习</h2>
<p>类是一种设计模式。许多语言提供语法来启用自然而然的面向类的软件设计。JS 也有相似的语法，但是它的行为和你在其他语言中熟悉的工作原理 <strong>有很大的不同</strong>。</p>
<p><strong>类意味着拷贝。</strong></p>
<p>当一个传统的类被实例化时，就发生了类的行为向实例中拷贝。当类被继承时，也发生父类的行为向子类的拷贝。</p>
<p>多态（在继承链的不同层级上拥有同名的不同函数）也许看起来意味着一个从子类回到父类的相对引用链接，但是它仍然只是拷贝行为的结果。</p>
<p>JavaScript <strong>不会自动地</strong> （像类那样）在对象间创建拷贝。</p>
<p>mixin 模式常用于在 <em>某种程度上</em> 模拟类的拷贝行为，但是这通常导致像显式假想多态那样（<code v-pre>OtherObj.methodName.call(this, ...)</code>）难看而且脆弱的语法，这样的语法又常导致更难懂和更难维护的代码。</p>
<p>明确的 mixin 和类 <em>拷贝</em> 又不完全相同，因为对象（和函数！）仅仅是共享的引用被复制，不是对象/函数自身被复制。不注意这样的微小之处通常是各种陷阱的根源。</p>
<p>一般来讲，在 JS 中模拟类通常会比解决当前 <em>真正</em> 的问题埋下更多的坑。</p>
</div></template>


