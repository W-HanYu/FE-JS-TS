import{_ as n,o as s,c as a,f as e}from"./app.c62ce33e.js";const c={},p=e(`<h1 id="\u9644\u5F55-b-\u586B\u8865\u5757\u4F5C\u7528\u57DF" tabindex="-1"><a class="header-anchor" href="#\u9644\u5F55-b-\u586B\u8865\u5757\u4F5C\u7528\u57DF" aria-hidden="true">#</a> \u9644\u5F55 B\uFF1A\u586B\u8865\u5757\u4F5C\u7528\u57DF</h1><p>\u5728\u7B2C\u4E09\u7AE0\u4E2D\uFF0C\u6211\u4EEC\u63A2\u7D22\u4E86\u5757\u4F5C\u7528\u57DF\u3002\u6211\u4EEC\u770B\u5230\u6700\u65E9\u5728 ES3 \u4E2D\u5F15\u5165\u7684 <code>with</code> \u548C <code>catch</code> \u5B50\u53E5\u90FD\u662F\u5B58\u5728\u4E8E JavaScript \u4E2D\u7684\u5757\u513F\u4F5C\u7528\u57DF\u7684\u5C0F\u4F8B\u5B50\u3002</p><p>\u4F46\u662F ES6 \u5F15\u5165\u7684 <code>let</code> \u6700\u7EC8\u4F7F\u6211\u4EEC\u7684\u4EE3\u7801\u6709\u4E86\u5B8C\u6574\u7684\uFF0C\u4E0D\u53D7\u7EA6\u675F\u7684\u5757\u4F5C\u7528\u57DF\u80FD\u529B\u3002\u4E0D\u8BBA\u662F\u5728\u529F\u80FD\u4E0A\u8FD8\u662F\u5728\u4EE3\u7801\u98CE\u683C\u4E0A\uFF0C\u5757\u4F5C\u7528\u57DF\u90FD\u4F7F\u8BB8\u591A\u6FC0\u52A8\u4EBA\u5FC3\u7684\u4E8B\u60C5\u6210\u4E3A\u53EF\u80FD\u3002</p><p>\u4F46\u8981\u662F\u6211\u4EEC\u60F3\u5728\u524D ES6 \u73AF\u5883\u4E2D\u4F7F\u7528\u5757\u4F5C\u7528\u57DF\u5462\uFF1F</p><p>\u8003\u8651\u8FD9\u6BB5\u4EE3\u7801\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5B83\u5728 ES6 \u73AF\u5883\u4E0B\u5DE5\u4F5C\u7684\u975E\u5E38\u597D\u3002\u4F46\u662F\u6211\u4EEC\u80FD\u5728\u524D ES6 \u4E2D\u8FD9\u4E48\u505A\u5417\uFF1F<code>catch</code> \u5C31\u662F\u7B54\u6848\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u54C7\uFF01\u8FD9\u771F\u662F\u96BE\u770B\u548C\u5947\u602A\u7684\u4EE3\u7801\u3002\u6211\u4EEC\u770B\u5230\u4E00\u4E2A <code>try/catch</code> \u4F3C\u4E4E\u5F3A\u5236\u629B\u51FA\u4E00\u4E2A\u9519\u8BEF\uFF0C\u4F46\u662F\u8FD9\u4E2A\u5B83\u629B\u51FA\u7684\u201C\u9519\u8BEF\u201D\u53EA\u662F\u4E00\u4E2A\u503C <code>2</code>\u3002\u7136\u540E\u63A5\u6536\u5B83\u7684\u53D8\u91CF\u58F0\u660E\u662F\u5728 <code>catch(a)</code> \u5B50\u53E5\u4E2D\u3002\u4E09\u89C2\uFF1A\u6BC1\u5C3D\u3002</p><p>\u6CA1\u9519\uFF0C<code>catch</code> \u5B50\u53E5\u62E5\u6709\u5757\u4F5C\u7528\u57DF\uFF0C\u8FD9\u610F\u5473\u7740\u5B83\u53EF\u4EE5\u88AB\u7528\u4E8E\u5728\u524D ES6 \u73AF\u5883\u4E2D\u586B\u8865\u5757\u4F5C\u7528\u57DF\u3002</p><p>\u201C\u4F46\u662F\u2026\u2026\u201D\uFF0C\u4F60\u8BF4\u3002\u201C\u2026\u2026\u6CA1\u4EBA\u613F\u610F\u5199\u8FD9\u4E48\u4E11\u7684\u4EE3\u7801\uFF01\u201D\u4F60\u662F\u5BF9\u7684\u3002\u4E5F\u6CA1\u4EBA\u7F16\u5199\u7531 CoffeeScript \u7F16\u8BD1\u5668\u8F93\u51FA\u7684\uFF08\u67D0\u4E9B\uFF09\u4EE3\u7801\u3002\u8FD9\u4E0D\u662F\u91CD\u70B9\u3002</p><p>\u91CD\u70B9\u662F\u5DE5\u5177\u53EF\u4EE5\u5C06 ES6 \u4EE3\u7801\u8F6C\u8BD1\u4E3A\u80FD\u591F\u5728\u524D ES6 \u73AF\u5883\u4E2D\u5DE5\u4F5C\u7684\u4EE3\u7801\u3002\u4F60\u53EF\u4EE5\u4F7F\u7528\u5757\u4F5C\u7528\u57DF\u7F16\u5199\u4EE3\u7801\uFF0C\u5E76\u4ECE\u8FD9\u6837\u7684\u529F\u80FD\u4E2D\u83B7\u76CA\uFF0C\u7136\u540E\u8BA9\u4E00\u4E2A\u7F16\u8BD1\u5DE5\u5177\u6765\u638C\u7BA1\u751F\u6210\u5C06\u5728\u90E8\u7F72\u4E4B\u540E\u5B9E\u9645 <em>\u5DE5\u4F5C</em> \u7684\u4EE3\u7801\u3002</p><p>\u8FD9\u5B9E\u9645\u4E0A\u662F\u6240\u6709\uFF08\u55EF\u54FC\uFF0C\u5927\u591A\u6570\uFF09ES6 \u7279\u6027\u9996\u9009\u7684\u8FC1\u79FB\u8DEF\u5F84\uFF1A\u5728\u4ECE\u524D ES6 \u5230 ES6 \u7684\u8F6C\u53D8\u8FC7\u7A0B\u4E2D\uFF0C\u4F7F\u7528\u4E00\u4E2A\u4EE3\u7801\u8F6C\u8BD1\u5668\u5C06 ES6 \u4EE3\u7801\u8F6C\u6362\u4E3A ES5 \u517C\u5BB9\u7684\u4EE3\u7801\u3002</p><h2 id="traceur" tabindex="-1"><a class="header-anchor" href="#traceur" aria-hidden="true">#</a> Traceur</h2><p>Google \u7EF4\u62A4\u7740\u4E00\u4E2A\u79F0\u4E3A\u201CTraceur\u201D\u7684\u9879\u76EE\uFF0C\u5B83\u7684\u4EFB\u52A1\u6B63\u662F\u4E3A\u4E86\u5E7F\u6CDB\u4F7F\u7528 ES6 \u7279\u6027\u800C\u5C06\u5B83\u8F6C\u8BD1\u4E3A\u524D ES6\uFF08\u5927\u591A\u6570\u662F ES5\uFF0C\u4F46\u4E0D\u662F\u5168\u90E8\uFF01\uFF09\u4EE3\u7801\u3002TC39 \u534F\u4F1A\u4F9D\u8D56\u8FD9\u4E2A\u5DE5\u5177\uFF08\u548C\u5176\u4ED6\u7684\u5DE5\u5177\uFF09\u6765\u6D4B\u8BD5\u4ED6\u4EEC\u6240\u89C4\u5B9A\u7684\u7279\u6027\u7684\u8BED\u4E49\u3002</p><p>Traceur \u5C06\u4ECE\u6211\u4EEC\u7684\u4EE3\u7801\u6BB5\u4E2D\u4EA7\u751F\u51FA\u4EC0\u4E48\uFF1F\u4F60\u731C\u5BF9\u4E86\uFF01</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6240\u4EE5\uFF0C\u4F7F\u7528\u8FD9\u79CD\u5DE5\u5177\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5F00\u59CB\u5229\u7528\u5757\u513F\u4F5C\u7528\u57DF\uFF0C\u65E0\u8BBA\u6211\u4EEC\u662F\u5426\u9762\u5411 ES6\uFF0C\u56E0\u4E3A <code>try/catch</code> \u4ECE ES3 \u90A3\u65F6\u5C31\u5F00\u59CB\u5B58\u5728\u4E86\uFF08\u5E76\u4E14\u8FD9\u6837\u5DE5\u4F5C\uFF09\u3002</p><h2 id="\u9690\u542B\u7684\u4E0E\u660E\u786E\u7684\u5757\u513F" tabindex="-1"><a class="header-anchor" href="#\u9690\u542B\u7684\u4E0E\u660E\u786E\u7684\u5757\u513F" aria-hidden="true">#</a> \u9690\u542B\u7684\u4E0E\u660E\u786E\u7684\u5757\u513F</h2><p>\u5728\u7B2C\u4E09\u7AE0\u4E2D\uFF0C\u5728\u6211\u4EEC\u4ECB\u7ECD\u5757\u4F5C\u7528\u57DF\u65F6\uFF0C\u6211\u4EEC\u8BA4\u8BC6\u4E86\u4E00\u4E9B\u5173\u4E8E\u4EE3\u7801\u53EF\u7EF4\u62A4\u6027/\u53EF\u91CD\u6784\u6027\u7684\u6F5C\u5728\u9677\u9631\u3002\u6709\u4EC0\u4E48\u5176\u4ED6\u7684\u65B9\u6CD5\u53EF\u4EE5\u5229\u7528\u5757\u4F5C\u7528\u57DF\u540C\u65F6\u51CF\u5C11\u8FD9\u4E9B\u8D1F\u9762\u5F71\u54CD\u5417\uFF1F</p><p>\u8003\u8651\u4E00\u4E0B <code>let</code> \u7684\u8FD9\u79CD\u5F62\u5F0F\uFF0C\u5B83\u88AB\u79F0\u4E3A\u201Clet \u5757\u513F\u201D\u6216\u201Clet \u8BED\u53E5\u201D\uFF08\u548C\u4EE5\u524D\u7684\u201Clet \u58F0\u660E\u201D\u5BF9\u6BD4\u6765\u8BF4\uFF09\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token punctuation">(</span>a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0E\u9690\u542B\u5730\u52AB\u6301\u4E00\u4E2A\u65E2\u5B58\u7684\u5757\u513F\u4E0D\u540C\uFF0Clet \u8BED\u53E5\u4E3A\u5B83\u7684\u4F5C\u7528\u57DF\u7ED1\u5B9A\u660E\u786E\u5730\u521B\u5EFA\u4E86\u4E00\u4E2A\u5757\u513F\u3002\u8FD9\u4E2A\u660E\u786E\u7684\u5757\u513F\u4E0D\u4EC5\u66F4\u663E\u773C\uFF0C\u800C\u4E14\u5728\u4EE3\u7801\u91CD\u6784\u65B9\u9762\u5065\u58EE\u5F97\u591A\uFF0C\u4ECE\u6587\u6CD5\u4E0A\u8BB2\uFF0C\u5B83\u901A\u8FC7\u5F3A\u5236\u6240\u6709\u7684\u58F0\u660E\u90FD\u4F4D\u4E8E\u5757\u7684\u9876\u90E8\u800C\u4EA7\u751F\u4E86\u67D0\u79CD\u7A0B\u5EA6\u4E0A\u66F4\u5E72\u51C0\u7684\u4EE3\u7801\u3002\u8FD9\u4F7F\u4EFB\u4F55\u5757\u90FD\u66F4\u6613\u4E8E\u89C2\u5BDF\uFF0C\u66F4\u6613\u4E8E\u77E5\u9053\u4EC0\u4E48\u5C5E\u4E8E\u8FD9\u4E2A\u4F5C\u7528\u57DF\u548C\u4EC0\u4E48\u4E0D\u5C5E\u4E8E\u8FD9\u4E2A\u4F5C\u7528\u57DF\u3002</p><p>\u4F5C\u4E3A\u4E00\u79CD\u6A21\u5F0F\uFF0C\u5B83\u662F\u4E0E\u8BB8\u591A\u4EBA\u5728\u51FD\u6570\u4F5C\u7528\u57DF\u4E2D\u91C7\u7EB3\u7684\u65B9\u5F0F\u76F8\u5BF9\u79F0\u7684 \u2014\u2014 \u5B83\u4EEC\u624B\u52A8\u5730\u5C06\u6240\u6709<code>var</code>\u58F0\u660E\u79FB\u52A8/\u63D0\u5347\u5230\u51FD\u6570\u7684\u9876\u90E8\u3002let \u8BED\u53E5\u6709\u610F\u5730\u5C06\u5B83\u4EEC\u653E\u5728\u5757\u513F\u7684\u9876\u90E8\uFF0C\u800C\u4E14\u5982\u679C\u4F60\u6CA1\u6709\u901A\u7BC7\u5230\u5904\u4F7F\u7528 <code>let</code> \u58F0\u660E\uFF0C\u90A3\u4E48\u4F60\u7684\u5757\u513F\u4F5C\u7528\u57DF\u58F0\u660E\u5C31\u4F1A\u5728\u67D0\u79CD\u7A0B\u5EA6\u4E0A\u66F4\u6613\u4E8E\u8BC6\u522B\u548C\u7EF4\u62A4\u3002</p><p>\u4F46\u662F\uFF0C\u8FD9\u91CC\u6709\u4E00\u4E2A\u95EE\u9898\u3002let \u8BED\u53E5\u7684\u5F62\u5F0F\u6CA1\u6709\u5305\u542B\u5728 ES6 \u4E2D\u3002\u5C31\u8FDE\u5B98\u65B9\u7684 Traceur \u7F16\u8BD1\u5668\u4E5F\u4E0D\u63A5\u53D7\u8FD9\u79CD\u5F62\u5F0F\u7684\u4EE3\u7801\u3002</p><p>\u6211\u4EEC\u6709\u4E24\u4E2A\u9009\u62E9\u3002\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 ES6 \u5408\u6CD5\u7684\u8BED\u6CD5\u683C\u5F0F\u5316\uFF0C\u518D\u52A0\u4E0A\u4E00\u70B9\u513F\u4EE3\u7801\u89C4\u5219\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">/*let*/</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F46\u662F\uFF0C\u5DE5\u5177\u5C31\u610F\u5473\u7740\u8981\u89E3\u51B3\u6211\u4EEC\u7684\u95EE\u9898\u3002\u6240\u4EE5\u53E6\u4E00\u4E2A\u9009\u9879\u662F\u7F16\u5199\u660E\u786E\u7684 let \u8BED\u53E5\u5757\u513F\uFF0C\u5E76\u8BA9\u5DE5\u5177\u5C06\u4ED6\u8F6C\u6362\u4E3A\u5408\u7406\u7684\uFF0C\u53EF\u4EE5\u5DE5\u4F5C\u7684\u4EE3\u7801\u3002</p><p>\u6240\u4EE5\uFF0C\u6211\u5EFA\u9020\u4E86\u4E00\u4E2A\u79F0\u4E3A\u201Clet-er\u201D\u7684\u5DE5\u5177\u6765\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u3002<em>let-er</em> \u662F\u4E00\u4E2A\u7F16\u8BD1\u671F\u4EE3\u7801\u8F6C\u8BD1\u5668\uFF0C\u5B83\u552F\u4E00\u7684\u4EFB\u52A1\u5C31\u662F\u627E\u5230 let \u8BED\u53E5\u5F62\u5F0F\u5E76\u8F6C\u8BD1\u5B83\u4EEC\u3002\u5B83\u5C06\u4F60\u7684\u4EE3\u7801\u5176\u4ED6\u90E8\u5206\u539F\u5C01\u4E0D\u52A8\u5730\u7559\u4E0B\uFF0C\u5305\u62EC\u4EFB\u4F55 let \u58F0\u660E\u3002\u4F60\u53EF\u4EE5\u5B89\u5168\u5730\u5C06 <em>let-er</em> \u7528\u4E8E ES6 \u8F6C\u8BD1\u5668\u7684\u7B2C\u4E00\u6B65\uFF0C\u7136\u540E\u5982\u679C\u6709\u9700\u8981\uFF0C\u4F60\u53EF\u4EE5\u5C06\u4F60\u7684\u4EE3\u7801\u901A\u8FC7 <code>Traceur</code> \u8FD9\u6837\u7684\u4E1C\u897F\u3002</p><p>\u53E6\u5916\uFF0C<em>let-er</em> \u6709\u4E00\u4E2A\u914D\u7F6E\u6807\u5FD7 <code>--es6</code>\uFF0C\u5F53\u5B83\u6253\u5F00\u65F6\uFF08\u9ED8\u8BA4\u662F\u5173\u95ED\uFF09\uFF0C\u4F1A\u6539\u53D8\u751F\u6210\u7684\u4EE3\u7801\u7684\u79CD\u7C7B\u3002\u4E0E\u4F7F\u7528 <code>try/catch</code> \u7684 ES3 \u586B\u8865\u9ED1\u79D1\u6280\u4E0D\u540C\u7684\u662F\uFF0C<em>let-er</em> \u5C06\u62FF\u7740\u6211\u4EEC\u7684\u4EE3\u7801\u5E76\u4EA7\u751F\u5B8C\u5168\u517C\u5BB9 ES6 \u7684\u4EE3\u7801\uFF0C\u6CA1\u6709\u9ED1\u79D1\u6280\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6240\u4EE5\uFF0C\u4F60\u53EF\u4EE5\u7ACB\u5373\u5F00\u59CB\u4F7F\u7528 <em>let-er</em>\uFF0C\u800C\u4E14\u53EF\u4EE5\u9762\u5411\u6240\u6709\u524D ES6 \u73AF\u5883\uFF0C\u5F53\u4F60\u4EC5\u5173\u5FC3 ES6 \u65F6\uFF0C\u4F60\u53EF\u4EE5\u52A0\u5165\u914D\u7F6E\u6807\u5FD7\u5E76\u7ACB\u5373\u4EC5\u9762\u5411 ES6\u3002</p><p>\u800C\u4E14\u6700\u91CD\u8981\u7684\u662F\uFF0C<strong>\u4F60\u53EF\u4EE5\u4F7F\u7528\u66F4\u597D\u7684\u548C\u66F4\u660E\u786E\u7684 let \u8BED\u53E5\u5F62\u5F0F</strong>\uFF0C\u5373\u4FBF\u5B83\uFF08\u8FD8\uFF09\u4E0D\u662F\u4EFB\u4F55 ES \u5B98\u65B9\u7248\u672C\u7684\u4E00\u90E8\u5206\u3002</p><h2 id="\u6027\u80FD" tabindex="-1"><a class="header-anchor" href="#\u6027\u80FD" aria-hidden="true">#</a> \u6027\u80FD</h2><p>\u8BA9\u6211\u5728 <code>try/catch</code> \u7684\u6027\u80FD\u95EE\u9898\u4E0A\u52A0\u5165\u6700\u540E\u4E00\u4E2A\u5FEB\u901F\u7684\u8BF4\u660E\uFF0C\u5E76/\u6216\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF1A\u201C\u4E3A\u4EC0\u4E48\u4E0D\u4F7F\u7528\u4E00\u4E2A IIFE \u6765\u521B\u5EFA\u4F5C\u7528\u57DF\uFF1F\u201D</p><p>\u9996\u5148\uFF0C<code>try/catch</code> \u7684\u6027\u80FD <em>\u662F</em> \u6162\u4E00\u4E9B\uFF0C\u4F46\u662F\u6CA1\u6709\u4EFB\u4F55\u5408\u7406\u7684\u5047\u8BBE\u8868\u660E\u5B83 <em>\u5FC5\u987B</em> \u662F\u8FD9\u6837\uFF0C\u6216\u8005\u5B83 <em>\u603B\u662F</em> \u8FD9\u6837\u3002\u56E0\u4E3A TC39 \u8BA4\u53EF\u7684\u5B98\u65B9 ES6 \u8F6C\u8BD1\u5668\u4F7F\u7528 <code>try/catch</code>\uFF0CTraceur \u56E2\u961F\u5DF2\u7ECF\u8BA9 Chrome \u53BB\u6539\u8FDB <code>try/catch</code> \u7684\u6027\u80FD\u4E86\uFF0C\u800C\u4E14\u5B83\u4EEC\u6709\u5F88\u660E\u663E\u7684\u52A8\u529B\u8FD9\u6837\u505A\u3002</p><p>\u7B2C\u4E8C\uFF0CIIFE \u548C <code>try/catch</code> \u4E0D\u662F\u4E00\u4E2A\u5408\u7406\u7684\u201C\u82F9\u679C\u5BF9\u82F9\u679C\u201D\u7684\u6BD4\u8F83\uFF0C\u56E0\u4E3A\u4E00\u4E2A\u5305\u88C5\u7740\u4EFB\u610F\u4EE3\u7801\u7684\u51FD\u6570\u6539\u53D8\u4E86\u8FD9\u6BB5\u4EE3\u7801\u7684\u542B\u4E49\uFF0C\u4EE5\u53CA\u5B83\u7684 <code>this</code>\u3001<code>return</code>\u3001<code>break</code>\u3001\u548C <code>continue</code> \u7684\u542B\u4E49\u3002IIFE \u4E0D\u662F\u4E00\u4E2A\u5408\u9002\u4E00\u822C\u66FF\u4EE3\u54C1\u3002\u5B83\u53EA\u80FD\u5728\u7279\u5B9A\u7684\u60C5\u51B5\u4E0B\u624B\u52A8\u4F7F\u7528\u3002</p><p>\u771F\u6B63\u7684\u95EE\u9898\u53D8\u6210\u4E86\uFF1A\u4F60\u662F\u5426\u60F3\u8981\u4F7F\u7528\u5757\u513F\u4F5C\u7528\u57DF\u3002\u5982\u679C\u662F\uFF0C\u8FD9\u4E9B\u5DE5\u5177\u7ED9\u4F60\u63D0\u4F9B\u4E86\u8FD9\u4E9B\u9009\u62E9\u3002\u5982\u679C\u4E0D\uFF0C\u90A3\u5C31\u5728\u4F60\u7684\u4EE3\u7801\u4E2D\u7EE7\u7EED\u4F7F\u7528 <code>var</code>\uFF01</p>`,38),t=[p];function o(l,i){return s(),a("div",null,t)}const d=n(c,[["render",o],["__file","scope-closures-appB.html.vue"]]);export{d as default};
