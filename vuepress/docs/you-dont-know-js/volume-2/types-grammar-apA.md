---
title: 附录A：与环境混合的JavaScript
date: 2023/06/20
---

# 附录A：与环境混合的JavaScript

当你的JS代码在真实世界中运行时，除了我们在本书中完整探索过的核心语言机制以外，它还有好几种不同的行为方式。如果JS纯粹地运行在一个引擎中，那么它就会按照语言规范非黑即白地动作，是完全可以预测的。但是JS很可能总是运行在一个宿主环境的上下文中，这将会给你的代码带来某种程度的不可预测性。

例如，当你的代码与源自于其他地方的代码并肩运行时，或者当你的代码在不同种类的JS引擎（不只是浏览器）中运行时，有些事情的行为就可能不同。

我们将简要地探索这些问题中的一些。

## Annex B （ECMAScript）

一个鲜为人知的事实是，这门语言的官方名称是ECMAScript（意指管理它的ECMA标准本体）。那么“JavaScript”是什么？JavaScript是这门语言常见的商业名称，当然，更恰当地说，JavaScript基本上是语言规范的浏览器实现。

官方的ECMAScript语言规范包含“Annex B”，它是为了浏览器中JS的兼容性，讨论那些与官方语言规范有偏差的特别部分。

考虑这些偏差部分的恰当方法是，它们仅在你的代码运行在浏览器中时才是确实会出现/合法的。如果你的代码总是运行在浏览器中，那你就不会看到明显的不同。如果不是（比如它可以运行在node.js、Rhino中，等等），或者你不确定，那么就要小心对待。

兼容性上的主要不同是：

* 八进制数字字面量是允许的，比如在非`strict mode`下的`0123`（小数`83`）。
* `window.escape(..)`和`window.unescape(..)`允许你使用`%`分割的十六进制转义序列来转义或非转义字符串。例如：`window.escape( "?foo=97%&bar=3%" )`产生`"%3Ffoo%3D97%25%26bar%3D3%25"`
* `String.prototype.substr`与`String.prototype.substring`十分相似，除了第二个参数是`length`（要包含的字符数），而非结束（不含）的索引。

### Web ECMAScript

Web ECMAScript语言规范(http://javascript.spec.whatwg.org/)涵盖了官方ECMAScript语言规范与当前浏览器中JavaScript实现之间的不同。

换言之，这些项目是浏览器的“必须品”（为了相互兼容），但是（在本书编写时）没有列在官方语言规范的“Annex B”部分是：

* `<!--`和`-->`是合法的单行注释分割符。
* `String.prototype` 拥有返回HTML格式化字符串的附加方法：`anchor(..)`、`big(..)`、`blink(..)`、`bold(..)`、`fixed(..)`、`fontcolor(..)`、`fontsize(..)`、`italics(..)`、`link(..)`、`small(..)`、`strike(..)`、和`sub(..)`。**注意：** 它们在实际应用中非常罕见，而且一般来说不鼓励使用，而是用其他内建DOM API或用户定义的工具取代。
* `RegExp`扩展：`RegExp.$1` .. `RegExp.$9`（匹配组）和`RegExp.lastMatch`/`RegExp["$&"]`（最近的匹配）。
* `Function.prototype`附加功能：`Function.prototype.arguments`（内部`arguments`对象的别名）和`Function.caller`（内部`arguments.caller`的别名）。**注意：** `arguments`和 `arguments.caller`都被废弃了，所以你应当尽可能避免使用它们。这些别名更是这样 —— 不要使用它们！

**注意：** 其他的一些微小和罕见的偏差点没有包含在我们这里的列表中。有必要的话，更多详细信息可以参见外部的“Annex B”和“Web ECMAScript”文档。

一般来说，所有这些不同点都很少被使用，所以这些与语言规范有出入的地方不是什么重大问题。只是如果你依赖于其中任何一个的话，**要小心**。

## 宿主对象

JS中变量的行为有一些广为人知的例外 —— 当它们是被自动定义，或由持有你代码的环境（浏览器等）创建并提供给JS时 —— 也就是所谓的“宿主对象”（包括`object`和`function`两者）。

例如：

```js
var a = document.createElement( "div" );

typeof a;								// "object" -- 意料之中的
Object.prototype.toString.call( a );	// "[object HTMLDivElement]"

a.tagName;								// "DIV"
```

`a`不仅是一个`object`，而且是一个特殊的宿主对象，因为它是一个DOM元素。它拥有一个不同的内部`[[Class]]`值（`"HTMLDivElement"`），而且带有预定义的（而且通常是不可更改的）属性。

另一个已经在第四章的“Falsy对象”一节中探讨过的同样的怪异之处是：存在这样一些对象，当被强制转换为`boolean`时，它们将（令人糊涂地）被转换为`false`而不是预期的`true`。

另一些需要小心的宿主对象行为包括：

* 不能访问像`toString()`这样的`object`内建方法
* 不可覆盖
* 拥有特定的预定义只读属性
* 拥有一些`this`不可被重载为其他对象的方法
* 其他……

为了使我们的JS代码与它外围的环境一起工作，宿主对象至关重要。但在你与宿主对象交互时是要特别注意，并且在推测它的行为时要小心，因为它们经常与普通的JS`object`不符。

一个尽人皆知的你可能经常与之交互的宿主对象的例子，就是`console`对象和他的各种函数（`log(..)`、`error(..)`等等）。`console`对象是由 *宿主环境* 特别提供的，所以你的代码可以与之互动来进行各种开发相关的输出任务。

在浏览器中，`console`与开发者工具控制台的显示相勾连，因此在node.js和其他服务器端JS环境中，`console`一般连接着JavaScript环境系统进程的标准输出流（`stdout`）和标准错误流（`stderr`）。

## 全局DOM变量

你可能知道，在全局作用域中声明变量（用或者不用`var`）不仅会创建一个全局变量，还会创建它的镜像：在`global`对象（浏览器中的`window`）上的同名属性。

但少为人知的是，（由于浏览器的遗留行为）使用`id`属性创建DOM元素会创建同名的全局变量。例如：

```html
<div id="foo"></div>
```

和：

```js
if (typeof foo == "undefined") {
	foo = 42;		// 永远不会运行
}

console.log( foo );	// HTML元素
```

你可能臆测只有JS代码会创建这样的变量，并习惯于在这样假定的前提下进行全局变量检测（使用`typeof`或者`.. in window`检查），但是如你所见，你的宿主HTML页面的内容也会创建它们，如果你不小心它们就可以轻而易举地摆脱你的存在性检查。

这就是另一个你为什么应该尽全力避免使用全局变量的原因，如果你不得不这样做，那就使用不太可能冲突的变量名。但是你还是需要确认它不会与HTML的内容以及其他的代码相冲突。

## 原生原型

最广为人知的，经典的JavaScript *最佳实践* 智慧之一是：**永远不要扩展原生原型**。

当你将方法或属性添加到`Array.prototype`时，无论你想出什么样的（还）不存在于`Array.prototype`上名称，如果它是有用的、设计良好的、并且被恰当命名的新增功能，那么它就有很大的可能性被最终加入语言规范 —— 这种情况下你的扩展就处于冲突之中。

这里有一个真实地发生在我身上的例子，很好地展示了这一点。

那时我正在为其他网站建造一个可嵌入的控件，而且我的控件依赖于JQuery（虽然任何框架都很可能遭受这样的坑）。它几乎可以在每一个网站上工作，但是我们碰到了一个它会完全崩溃的网站。

经过差不多一周的分析/调试之后，我发现这个出问题的网站有这样一段代码，埋藏在它的一个遗留文件的深处：

```js
// Netscape 4 没有 Array.push
Array.prototype.push = function(item) {
	this[this.length] = item;
};
```

除了那疯狂的注释（谁还会关心Netscape 4！？），它看起来很合理，对吧？

问题是，在这段 Netscape 4 时代的代码被编写之后的某个时点，`Array.prototype.push`被加入了语言规范，但是被加入的东西与这段代码是不兼容的。标准的`push(..)`允许一次加入多个项目，而这个黑进来的东西会忽略后续项目。

基本上所有的JS框架都有这样的代码 —— 依赖于带有多个元素的`push(..)`。在我的例子中，我在围绕着一个完全被毁坏的CSS选择器引擎进行编码。但是可以料想到还有其他十几处可疑的地方。

一开始编写这个`push(..)`黑科技的开发者称它为`push`，这种直觉很正确，但是没有预见到添加多个元素。当然他们的初衷是好的，但是也埋下了一个地雷，当我差不多在10年之后路过时才不知不觉地踩上。

这里要吸取几个教训。

第一，不要扩展原生类型，除非你绝对确信你的代码将是运行在那个环境中的唯一代码。如果你不能100%确信，那么扩展原生类型就是危险的。你必须掂量掂量风险。

其次，不要无条件地定义扩展（因为你可能意外地覆盖原生类型）。就这个特定的例子，用代码说话就是：

```js
if (!Array.prototype.push) {
	// Netscape 4 没有 Array.push
	Array.prototype.push = function(item) {
		this[this.length] = item;
	};
}
```

`if`守护语句将会仅在JS环境中不存在`push()`时才定义那个`push()`黑科技。在我的情况中，这可能就够了。但即便是这种方式也不是没有风险：

1. 如果网站的代码（为了某些疯狂的理由！）有赖于忽略多个项目的`push(..)`，那么几年以后当标准的`push(..)`推出时，那些代码将会坏掉。
2. 如果有其他库被引入，并在这个`if`守护之前就黑进了`push(..)`，而且还是以一种不兼容的方式，那么它就在那一刻毁坏了这个网站。

这里的重点，坦白地讲，是一个没有得到JS开发者们足够重视的有趣问题：如果在你代码运行的环境中，你的代码不是唯一的存在，那么 **你应该依赖于任何原生的内建行为吗?**

严格的答案是 **不**，但这非常不切实际。你的代码通常不会为所有它依赖的内建行为重新定义它自己的、不可接触的私有版本。即便你 *能*，那也是相当的浪费。

那么，你应当为内建行为进行特性测试，以及为了验证它能如你预期的那样工作而进行兼容性测试吗？但如果测试失败了 —— 你的代码应当拒绝运行吗？

```js
// 不信任 Array.prototype.push
(function(){
	if (Array.prototype.push) {
		var a = [];
		a.push(1,2);
		if (a[0] === 1 && a[1] === 2) {
			// 测试通过，可以安全使用！
			return;
		}
	}

	throw Error(
		"Array#push() is missing/broken!"
	);
})();
```

理论上，这貌似有些道理，但是为每一个内建方法设计测试还是非常不切实际。

那么，我们应当怎么做？我们应当 *信赖但验证*（特性测试和兼容性测试）**每一件事吗**？我们应当假设既存的东西是符合规范的并让（由他人）造成的破坏任意传播吗？

没有太好的答案。可以观察到的唯一事实是，扩展原生原型是这些东西咬到你的唯一方式。

如果你不这么做，而且在你的应用程序中也没有其他人这么做，那么你就是安全的。否则，你就应当多多少少建立一些怀疑的、悲观的机制、并对可能的破坏做好准备。

在所有已知环境中，为你的代码准备一整套单元/回归测试是发现一些前述问题的方法，但是它不会对这些冲突为你做出任何实际的保护。

### Shims/Polyfills

人们常说，扩展一个原生类型唯一安全的地方是在一个（不兼容语言规范的）老版本环境中，因为它不太可能再改变了 —— 带有新语言规范特性的新浏览器会取代老版本浏览器，而非改良它们。

如果你能预见未来，而且确信未来的标准将是怎样，比如`Array.prototype.foobar`，那么现在就制造你自己的兼容版本来使用就是完全安全的，对吧？

```js
if (!Array.prototype.foobar) {
	// 愚蠢，愚蠢
	Array.prototype.foobar = function() {
		this.push( "foo", "bar" );
	};
}
```

如果已经有了`Array.prototype.foobar`的规范，而且规定的行为与这个逻辑等价，那么你定义这样的代码段就十分安全，在这种情况下它通常称为一个“polyfill（填补）”（或者“shim（垫片）”）。

在你的代码库中引入这样的代码，对给那些没有更新到最新规范的老版本浏览器环境打“补丁”**非常** 有用。为所有你支持的环境创建可预见的代码，使用填补是非常好的方法。

**提示：** ES5-Shim (https://github.com/es-shims/es5-shim) 是一个将项目代码桥接至ES5基准线的完整的shims/polyfills集合，相似地，ES6-Shim (https://github.com/es-shims/es6-shim) 提供了ES6新增的新API的shim。虽然API可以被填补，但新的语法通常是不能的。要桥接语法的部分，你将还需要使用一个ES6到ES5的转译器，比如Traceur (https://github.com/google/traceur-compiler/wiki/GettingStarted)。

如果有一个即将到来的标准，而且关于它叫什么名字和它将如何工作的讨论达成了一致，那么为了兼容面向未来的标准提前创建填补，被称为“prollyfill（probably-fill —— 预填补）”。

真正的坑是某些标准行为不能被（完全）填补/预填补。

在开发者社区中有这样一种争论：对于常见的情况一个部分地填补是否是可接受的，或者如果一个填补不能100%地与语言规范兼容是否应当避免它。

许多开发者至少会接受一些常见的部分填补（例如`Object.create(..)`），因为没有被填补的部分是他们不管怎样都不会用到的。

一些开发者相信，包围着 polyfill/shim 的`if`守护语句应当引入某种形式的一致性测试，在既存的方法缺失或者测试失败时取代它。这额外的一层兼容性测试有时被用于将“shim”（兼容性测试）与“polyfill”（存在性测试）区别开。

这里的要点是，没有绝对 *正确* 的答案。即使是在老版本环境中“安全地”扩展原生类型，也不是100%安全的。在其他人代码存在的情况下依赖于（可能被扩展过的）原生类型也是一样。

在这两种情况下都应当小心地使用防御性的代码，并在文档中大量记录它的风险。

## `<script>`

大多数通过浏览器使用的网站/应用程序都将它们的代码包含在一个以上的文件中，在一个页面中含有几个或好几个分别加载这些文件的`<script src=..></script>`元素，甚至几个内联的`<script> .. </script>`元素也很常见。

但这些分离的文件/代码段是组成分离的程序，还是综合为一个JS程序？

（也许令人吃惊）现实是它们在极大程度上，但不是全部，像独立的JS程序那样动作。

它们所 *共享* 的一个东西是一个单独的`global`对象（在浏览器中是`window`），这意味着多个文件可以将它们的代码追加到这个共享的名称空间中，而且它们都是可以交互的。

所以，如果一个`script`元素定义了一个全局函数`foo()`，当第二个`script`运行时，它就可以访问并调用`foo()`，就好像它自己已经定义过了这个函数一样。

但是全局变量作用域 *提升*（参见本系列的 *作用域与闭包*）不会跨越这些界线发生，所以下面的代码将不能工作（因为`foo()`的声明还没有被声明过），无论它们是否是内联的`<script> .. </script>`元素还是外部加载的`<script src=..></script>`文件：

```html
<script>foo();</script>

<script>
  function foo() { .. }
</script>
```

但是这两个都将 *可以* 工作：

```html
<script>
  foo();
  function foo() { .. }
</script>
```

或者：

```html
<script>
  function foo() { .. }
</script>

<script>foo();</script>
```

另外，如果在一个`script`元素（内联或者外部的）中发生了一个错误，一个分离的独立的JS程序将会失败并停止，但是任何后续的`script`都将会（依然在共享的`global`中）畅通无阻地运行。

你可以在你的代码中动态地创建`script`元素，并将它们插入到页面的DOM中，它们之中的代码基本上将会像从一个分离的文件中普通地加载那样运行：

```js
var greeting = "Hello World";

var el = document.createElement( "script" );

el.text = "function foo(){ alert( greeting );\
 } setTimeout( foo, 1000 );";

document.body.appendChild( el );
```

**注意：** 当然，如果你试一下上面的代码段并将`el.src`设置为某些文件的URL，而非将`el.text`设置为代码内容，你就会动态地创建一个外部加载的`<script src=..></script>`元素。

内联代码块中的代码，与在外部文件中的相同的代码之间的一个不同之处是，在内联的代码块中，字符`</script>`的序列不能一起出现，因为（无论它在哪里出现）它将会被翻译为代码块的末尾。所以，小心这样的代码：

```html
<script>
  var code = "<script>alert( 'Hello World' )</script>";
</script>
```

它看起来无害，但是在`string`字面量中出现的`</script>`将会不正常地终结script块，造成一个错误。绕过它最常见的一个方法是：

```js
"</sc" + "ript>";
```

另外要小心的是，一个外部文件中的代码将会根据和文件一起被提供（或默认的）的字符集编码（UTF-8、ISO-8859-8等等）来翻译，但在内联在你HTML页面中的一个`script`元素中的相同代码将会根据这个页面的（或它默认的）字符集编码来翻译。

**警告：** `charset`属性在内联script元素中不能工作。

关于内联`script`元素，另一个被废弃的做法是在内联代码的周围引入HTML风格或X(HT)ML风格的注释，就像：

```html
<script>
<!--
alert( "Hello" );
//-->
</script>

<script>
<!--//--><![CDATA[//><!--
alert( "World" );
//--><!]]>
</script>
```

这两种东西现在完全是不必要的了，所以如果你还在这么做，停下！

**注意：** 实际上纯粹是因为这种老技术，JavaScript才把`<!--`和`-->`（HTML风格的注释）两者都被规定为合法的单行注释分隔符（`var x = 2; <!-- valid comment`和`--> another valid line comment`）。永远不要使用它们。

## 保留字

ES5语言规范在第7.6.1部分中定义了一套“保留字”，它们不能被用作独立的变量名。技术上讲，有四个类别：“关键字”，“未来保留字”，`null`字面量，以及`true`/`false`布尔字面量。

像`function`和`switch`这样的关键字是显而易见的。像`enum`之类的未来保留字，虽然它们中的许多（`class`、`extends`等等）现在都已经实际被ES6使用了；但还有另外一些像`interface`之类的仅在strict模式下的保留字。

StackOverflow用户“art4theSould”创造性地将这些保留字编成了一首有趣的小诗(http://stackoverflow.com/questions/26255/reserved-keywords-in-javascript/12114140#12114140)：

> Let this long package float,
> Goto private class if short.
> While protected with debugger case,
> Continue volatile interface.
> Instanceof super synchronized throw,
> Extends final export throws.
>
> Try import double enum?
> - False, boolean, abstract function,
> Implements typeof transient break!
> Void static, default do,
> Switch int native new.
> Else, delete null public var
> In return for const, true, char
> …Finally catch byte.

**注意：** 这首诗包含ES3中的保留字（`byte`、`long`等等），它们在ES5中不再被保留了。

在ES5以前，这些保留字也不能被用于对象字面量中的属性名或键，但这种限制已经不复存在了。

所以，这是不允许的：

```js
var import = "42";
```

但这是允许的：

```js
var obj = { import: "42" };
console.log( obj.import );
```

你应当小心，有些老版本的浏览器（主要是老IE）没有完全地遵循这些规则，所以有些将保留字用作对象属性名的地方任然会造成问题。小心地测试所有你支持的浏览器环境。

## 实现的限制

JavaScript语言规范没有在诸如函数参数值的个数，或者字符串字面量的长度上做出随意的限制，但是由于不同引擎的实现细节，无论如何这些限制是存在的。

例如：

```js
function addAll() {
	var sum = 0;
	for (var i=0; i < arguments.length; i++) {
		sum += arguments[i];
	}
	return sum;
}

var nums = [];
for (var i=1; i < 100000; i++) {
	nums.push(i);
}

addAll( 2, 4, 6 );				// 12
addAll.apply( null, nums );		// 应该是：499950000
```

在某些JS引擎中，你将会得到正确答案`499950000`，但在另一些引擎中（比如Safari 6.x），你会得到一个错误：“RangeError: Maximum call stack size exceeded.”

已知存在的其他限制的例子：

* 在字符串字面量（不是一个字符串变量）中允许出现的最大字符个数
* 在一个函数调用的参数值中可以发送的数据的大小（字节数，也称为栈的大小）
* 在一个函数声明中的参数数量
* 没有经过优化的调用栈最大深度（比如，使用递归时）：从一个函数到另一个函数的调用链能有多长
* JS程序可以持续运行并阻塞浏览器的秒数
* 变量名的最大长度
* ...

遭遇这些限制不是非常常见，但你应当知道这些限制存在并确实会发生，而且重要的是它们因引擎不同而不同。

## 复习

我们知道并且可以依赖于这样的事实：JS语言本身拥有一个标准，而且这个标准可预见地被所有现代浏览器/引擎实现了。这是非常好的一件事！

但是JavaScript几乎不会与世隔绝地运行。它会运行在混合了第三方库的环境中运行，而且有时甚至会在不同浏览器中不同的引擎/环境中运行。

对这些问题多加注意，会改进你代码的可靠性和健壮性。