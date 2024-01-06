import{_ as s,r as e,o as g,c,e as n,d as t,a as p,f as o}from"./app.d6a6c857.js";const a={},d=o(`<h1 id="\u65E2\u7136\u6709-http-\u534F\u8BAE-\u4E3A\u4EC0\u4E48\u8FD8\u8981\u6709-rpc" tabindex="-1"><a class="header-anchor" href="#\u65E2\u7136\u6709-http-\u534F\u8BAE-\u4E3A\u4EC0\u4E48\u8FD8\u8981\u6709-rpc" aria-hidden="true">#</a> \u65E2\u7136\u6709 HTTP \u534F\u8BAE\uFF0C\u4E3A\u4EC0\u4E48\u8FD8\u8981\u6709 RPC\uFF1F</h1><h2 id="\u4ECE-tcp-\u804A\u8D77" tabindex="-1"><a class="header-anchor" href="#\u4ECE-tcp-\u804A\u8D77" aria-hidden="true">#</a> \u4ECE TCP \u804A\u8D77</h2><p>\u4F5C\u4E3A\u4E00\u4E2A\u7A0B\u5E8F\u5458\uFF0C\u5047\u8BBE\u6211\u4EEC\u9700\u8981\u5728 A \u7535\u8111\u7684\u8FDB\u7A0B\u53D1\u4E00\u6BB5\u6570\u636E\u5230 B \u7535\u8111\u7684\u8FDB\u7A0B\uFF0C\u6211\u4EEC\u4E00\u822C\u4F1A\u5728\u4EE3\u7801\u91CC\u4F7F\u7528 Socket \u8FDB\u884C\u7F16\u7A0B\u3002</p><p>\u8FD9\u65F6\u5019\uFF0C\u6211\u4EEC\u53EF\u9009\u9879\u4E00\u822C\u4E5F\u5C31 TCP \u548C UDP \u4E8C\u9009\u4E00\u3002TCP \u53EF\u9760\uFF0CUDP \u4E0D\u53EF\u9760\u3002\u9664\u975E\u662F\u9A6C\u603B\u8FD9\u79CD\u795E\u7EA7\u7A0B\u5E8F\u5458\uFF08\u65E9\u671F QQ \u5927\u91CF\u4F7F\u7528 UDP\uFF09\uFF0C\u5426\u5219\uFF0C\u53EA\u8981\u7A0D\u5FAE\u5BF9\u53EF\u9760\u6027\u6709\u4E9B\u8981\u6C42\uFF0C\u666E\u901A\u4EBA\u4E00\u822C\u65E0\u8111\u9009 TCP \u5C31\u5BF9\u4E86\u3002</p><p>\u7C7B\u4F3C\u4E0B\u9762\u8FD9\u6837\u3002</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code>fd <span class="token operator">=</span> <span class="token function">socket</span><span class="token punctuation">(</span>AF_INET<span class="token punctuation">,</span>SOCK_STREAM<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5176\u4E2D <code>SOCK_STREAM</code>\uFF0C\u662F\u6307\u4F7F\u7528<strong>\u5B57\u8282\u6D41</strong>\u4F20\u8F93\u6570\u636E\uFF0C\u8BF4\u767D\u4E86\u5C31\u662F <strong>TCP \u534F\u8BAE</strong>\u3002</p><p>\u5728\u5B9A\u4E49\u4E86 Socket \u4E4B\u540E\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u6109\u5FEB\u7684\u5BF9\u8FD9\u4E2A Socket \u8FDB\u884C\u64CD\u4F5C\uFF0C\u6BD4\u5982\u7528 <code>bind()</code> \u7ED1\u5B9A IP \u7AEF\u53E3\uFF0C\u7528 <code>connect()</code> \u53D1\u8D77\u5EFA\u8FDE\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/23cc66a7f4cb06afe13842b4b339e28b.gif" alt="\u63E1\u624B\u5EFA\u7ACB\u8FDE\u63A5\u6D41\u7A0B"></p><p>\u5728\u8FDE\u63A5\u5EFA\u7ACB\u4E4B\u540E\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u4F7F\u7528 <code>send()</code> \u53D1\u9001\u6570\u636E\uFF0C<code>recv()</code> \u63A5\u6536\u6570\u636E\u3002</p><p>\u5149\u8FD9\u6837\u4E00\u4E2A\u7EAF\u88F8\u7684 TCP \u8FDE\u63A5\uFF0C\u5C31\u53EF\u4EE5\u505A\u5230\u6536\u53D1\u6570\u636E\u4E86\uFF0C\u90A3\u662F\u4E0D\u662F\u5C31\u591F\u4E86\uFF1F</p><p>\u4E0D\u884C\uFF0C\u8FD9\u4E48\u7528\u4F1A\u6709\u95EE\u9898\u3002</p><h2 id="\u4F7F\u7528\u7EAF\u88F8-tcp-\u4F1A\u6709\u4EC0\u4E48\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u7EAF\u88F8-tcp-\u4F1A\u6709\u4EC0\u4E48\u95EE\u9898" aria-hidden="true">#</a> \u4F7F\u7528\u7EAF\u88F8 TCP \u4F1A\u6709\u4EC0\u4E48\u95EE\u9898</h2><p>\u516B\u80A1\u6587\u5E38\u80CC\uFF0CTCP \u662F\u6709\u4E09\u4E2A\u7279\u70B9\uFF0C<strong>\u9762\u5411\u8FDE\u63A5</strong>\u3001<strong>\u53EF\u9760</strong>\u3001\u57FA\u4E8E<strong>\u5B57\u8282\u6D41</strong>\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/3fcad07ba7ae92299b32224da8583363.png" alt="TCP \u662F\u4EC0\u4E48"></p><p>\u8FD9\u4E09\u4E2A\u7279\u70B9\u771F\u7684\u6982\u62EC\u7684<strong>\u975E\u5E38\u7CBE\u8F9F</strong>\uFF0C\u8FD9\u4E2A\u516B\u80A1\u6587\u6211\u4EEC\u6CA1\u767D\u80CC\u3002</p><p>\u6BCF\u4E2A\u7279\u70B9\u5C55\u5F00\u90FD\u80FD\u804A\u4E00\u7BC7\u6587\u7AE0\uFF0C\u800C\u4ECA\u5929\u6211\u4EEC\u9700\u8981\u5173\u6CE8\u7684\u662F<strong>\u57FA\u4E8E\u5B57\u8282\u6D41</strong>\u8FD9\u4E00\u70B9\u3002</p><p>\u5B57\u8282\u6D41\u53EF\u4EE5\u7406\u89E3\u4E3A\u4E00\u4E2A\u53CC\u5411\u7684\u901A\u9053\u91CC\u6D41\u6DCC\u7684\u6570\u636E\uFF0C\u8FD9\u4E2A<strong>\u6570\u636E</strong>\u5176\u5B9E\u5C31\u662F\u6211\u4EEC\u5E38\u8BF4\u7684\u4E8C\u8FDB\u5236\u6570\u636E\uFF0C\u7B80\u5355\u6765\u8BF4\u5C31\u662F\u4E00\u5927\u5806 <strong>01 \u4E32</strong>\u3002\u7EAF\u88F8 TCP \u6536\u53D1\u7684\u8FD9\u4E9B 01 \u4E32\u4E4B\u95F4\u662F<strong>\u6CA1\u6709\u4EFB\u4F55\u8FB9\u754C</strong>\u7684\uFF0C\u4F60\u6839\u672C\u4E0D\u77E5\u9053\u5230\u54EA\u4E2A\u5730\u65B9\u624D\u7B97\u4E00\u6761\u5B8C\u6574\u6D88\u606F\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/254d845f9de05c19536d8343d268595a.png" alt="01 \u4E8C\u8FDB\u5236\u5B57\u8282\u6D41"></p><p>\u6B63\u56E0\u4E3A\u8FD9\u4E2A\u6CA1\u6709<strong>\u4EFB\u4F55\u8FB9\u754C</strong>\u7684\u7279\u70B9\uFF0C\u6240\u4EE5\u5F53\u6211\u4EEC\u9009\u62E9\u4F7F\u7528 TCP \u53D1\u9001&quot;\u590F\u6D1B&quot;\u548C&quot;\u7279\u70E6\u607C&quot;\u7684\u65F6\u5019\uFF0C\u63A5\u6536\u7AEF\u6536\u5230\u7684\u5C31\u662F&quot;\u590F\u6D1B\u7279\u70E6\u607C&quot;\uFF0C\u8FD9\u65F6\u5019\u63A5\u6536\u7AEF\u6CA1\u53D1\u533A\u5206\u4F60\u662F\u60F3\u8981\u8868\u8FBE&quot;\u590F\u6D1B&quot;+&quot;\u7279\u70E6\u607C&quot;\u8FD8\u662F&quot;\u590F\u6D1B\u7279&quot;+&quot;\u70E6\u607C&quot;\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/cd7c006cb4180bf751c4afd268ed44f0.png" alt="\u6D88\u606F\u5BF9\u6BD4"></p>`,21),i=n("strong",null,"\u7C98\u5305\u95EE\u9898",-1),P={href:"https://xiaolincoding.com/network/3_tcp/tcp_stream.html",target:"_blank",rel:"noopener noreferrer"},T=o(`<p>\u8BF4\u8FD9\u4E2A\u7684\u76EE\u7684\u662F\u4E3A\u4E86\u544A\u8BC9\u5927\u5BB6\uFF0C\u7EAF\u88F8 TCP \u662F\u4E0D\u80FD\u76F4\u63A5\u62FF\u6765\u7528\u7684\uFF0C\u4F60\u9700\u8981\u5728\u8FD9\u4E2A\u57FA\u7840\u4E0A\u52A0\u5165\u4E00\u4E9B<strong>\u81EA\u5B9A\u4E49\u7684\u89C4\u5219</strong>\uFF0C\u7528\u4E8E\u533A\u5206<strong>\u6D88\u606F\u8FB9\u754C</strong>\u3002</p><p>\u4E8E\u662F\u6211\u4EEC\u4F1A\u628A\u6BCF\u6761\u8981\u53D1\u9001\u7684\u6570\u636E\u90FD\u5305\u88C5\u4E00\u4E0B\uFF0C\u6BD4\u5982\u52A0\u5165<strong>\u6D88\u606F\u5934</strong>\uFF0C<strong>\u6D88\u606F\u5934\u91CC\u5199\u6E05\u695A\u4E00\u4E2A\u5B8C\u6574\u7684\u5305\u957F\u5EA6\u662F\u591A\u5C11</strong>\uFF0C\u6839\u636E\u8FD9\u4E2A\u957F\u5EA6\u53EF\u4EE5\u7EE7\u7EED\u63A5\u6536\u6570\u636E\uFF0C\u622A\u53D6\u51FA\u6765\u540E\u5B83\u4EEC\u5C31\u662F\u6211\u4EEC\u771F\u6B63\u8981\u4F20\u8F93\u7684<strong>\u6D88\u606F\u4F53</strong>\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/9428feed1ff22156fc136d17a129527b.png" alt="\u6D88\u606F\u8FB9\u754C\u957F\u5EA6\u6807\u5FD7"></p><p>\u800C\u8FD9\u91CC\u5934\u63D0\u5230\u7684<strong>\u6D88\u606F\u5934</strong>\uFF0C\u8FD8\u53EF\u4EE5\u653E\u5404\u79CD\u4E1C\u897F\uFF0C\u6BD4\u5982\u6D88\u606F\u4F53\u662F\u5426\u88AB\u538B\u7F29\u8FC7\u548C\u6D88\u606F\u4F53\u683C\u5F0F\u4E4B\u7C7B\u7684\uFF0C\u53EA\u8981\u4E0A\u4E0B\u6E38\u90FD\u7EA6\u5B9A\u597D\u4E86\uFF0C\u4E92\u76F8\u90FD\u8BA4\u5C31\u53EF\u4EE5\u4E86\uFF0C\u8FD9\u5C31\u662F\u6240\u8C13\u7684<strong>\u534F\u8BAE\u3002</strong></p><p>\u6BCF\u4E2A\u4F7F\u7528 TCP \u7684\u9879\u76EE\u90FD\u53EF\u80FD\u4F1A\u5B9A\u4E49\u4E00\u5957\u7C7B\u4F3C\u8FD9\u6837\u7684\u534F\u8BAE\u89E3\u6790\u6807\u51C6\uFF0C\u4ED6\u4EEC\u53EF\u80FD<strong>\u6709\u533A\u522B\uFF0C\u4F46\u539F\u7406\u90FD\u7C7B\u4F3C</strong>\u3002</p><p><strong>\u4E8E\u662F\u57FA\u4E8E TCP\uFF0C\u5C31\u884D\u751F\u4E86\u975E\u5E38\u591A\u7684\u534F\u8BAE\uFF0C\u6BD4\u5982 HTTP \u548C RPC\u3002</strong></p><h2 id="http-\u548C-rpc" tabindex="-1"><a class="header-anchor" href="#http-\u548C-rpc" aria-hidden="true">#</a> HTTP \u548C RPC</h2><p>\u6211\u4EEC\u56DE\u8FC7\u5934\u6765\u770B\u7F51\u7EDC\u7684\u5206\u5C42\u56FE\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/da970d16a205fb48d6a8bea14498814d.png" alt="\u56DB\u5C42\u7F51\u7EDC\u534F\u8BAE"></p><p><strong>TCP \u662F\u4F20\u8F93\u5C42\u7684\u534F\u8BAE</strong>\uFF0C\u800C\u57FA\u4E8E TCP \u9020\u51FA\u6765\u7684 HTTP \u548C<strong>\u5404\u7C7B</strong> RPC \u534F\u8BAE\uFF0C\u5B83\u4EEC\u90FD\u53EA\u662F\u5B9A\u4E49\u4E86\u4E0D\u540C\u6D88\u606F\u683C\u5F0F\u7684<strong>\u5E94\u7528\u5C42\u534F\u8BAE</strong>\u800C\u5DF2\u3002</p><p><strong>HTTP</strong> \u534F\u8BAE\uFF08<strong>H</strong>yper <strong>T</strong>ext <strong>T</strong>ransfer <strong>P</strong>rotocol\uFF09\uFF0C\u53C8\u53EB\u505A<strong>\u8D85\u6587\u672C\u4F20\u8F93\u534F\u8BAE</strong>\u3002\u6211\u4EEC\u7528\u7684\u6BD4\u8F83\u591A\uFF0C\u5E73\u65F6\u4E0A\u7F51\u5728\u6D4F\u89C8\u5668\u4E0A\u6572\u4E2A\u7F51\u5740\u5C31\u80FD\u8BBF\u95EE\u7F51\u9875\uFF0C\u8FD9\u91CC\u7528\u5230\u7684\u5C31\u662F HTTP \u534F\u8BAE\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/809c33f7090c08b78d494445e39ae1b4.png" alt="HTTP\u8C03\u7528"></p><p>\u800C <strong>RPC</strong>\uFF08<strong>R</strong>emote <strong>P</strong>rocedure <strong>C</strong>all\uFF09\uFF0C\u53C8\u53EB\u505A<strong>\u8FDC\u7A0B\u8FC7\u7A0B\u8C03\u7528</strong>\u3002\u5B83\u672C\u8EAB\u5E76\u4E0D\u662F\u4E00\u4E2A\u5177\u4F53\u7684\u534F\u8BAE\uFF0C\u800C\u662F\u4E00\u79CD<strong>\u8C03\u7528\u65B9\u5F0F</strong>\u3002</p><p>\u4E3E\u4E2A\u4F8B\u5B50\uFF0C\u6211\u4EEC\u5E73\u65F6\u8C03\u7528\u4E00\u4E2A<strong>\u672C\u5730\u65B9\u6CD5</strong>\u5C31\u50CF\u4E0B\u9762\u8FD9\u6837\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> res = localFunc(req)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5982\u679C\u73B0\u5728\u8FD9\u4E0D\u662F\u4E2A\u672C\u5730\u65B9\u6CD5\uFF0C\u800C\u662F\u4E2A<strong>\u8FDC\u7AEF\u670D\u52A1\u5668</strong>\u66B4\u9732\u51FA\u6765\u7684\u4E00\u4E2A\u65B9\u6CD5 <code>remoteFunc</code>\uFF0C\u5982\u679C\u6211\u4EEC\u8FD8\u80FD\u50CF\u8C03\u7528\u672C\u5730\u65B9\u6CD5\u90A3\u6837\u53BB\u8C03\u7528\u5B83\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5<strong>\u5C4F\u853D\u6389\u4E00\u4E9B\u7F51\u7EDC\u7EC6\u8282</strong>\uFF0C\u7528\u8D77\u6765\u66F4\u65B9\u4FBF\uFF0C\u5C82\u4E0D\u7F8E\u54C9\uFF1F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> res = remoteFunc(req)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/2b2ea6d26af9ded517043e528b032307.png" alt="RPC\u53EF\u4EE5\u50CF\u8C03\u7528\u672C\u5730\u65B9\u6CD5\u90A3\u6837\u8C03\u7528\u8FDC\u7AEF\u65B9\u6CD5"></p><p>\u57FA\u4E8E\u8FD9\u4E2A\u601D\u8DEF\uFF0C\u5927\u4F6C\u4EEC\u9020\u51FA\u4E86\u975E\u5E38\u591A\u6B3E\u5F0F\u7684 RPC \u534F\u8BAE\uFF0C\u6BD4\u5982\u6BD4\u8F83\u6709\u540D\u7684<code>gRPC</code>\uFF0C<code>thrift</code>\u3002</p><p>\u503C\u5F97\u6CE8\u610F\u7684\u662F\uFF0C\u867D\u7136\u5927\u90E8\u5206 RPC \u534F\u8BAE\u5E95\u5C42\u4F7F\u7528 TCP\uFF0C\u4F46\u5B9E\u9645\u4E0A<strong>\u5B83\u4EEC\u4E0D\u4E00\u5B9A\u975E\u5F97\u4F7F\u7528 TCP\uFF0C\u6539\u7528 UDP \u6216\u8005 HTTP\uFF0C\u5176\u5B9E\u4E5F\u53EF\u4EE5\u505A\u5230\u7C7B\u4F3C\u7684\u529F\u80FD\u3002</strong></p><p><img src="https://img-blog.csdnimg.cn/img_convert/054e9738bc492a6fb6e9a71737d95fc0.png" alt="\u57FA\u4E8ETCP\u534F\u8BAE\u7684HTTP\u548CRPC\u534F\u8BAE"></p><p>\u5230\u8FD9\u91CC\uFF0C\u6211\u4EEC\u56DE\u5230\u6587\u7AE0\u6807\u9898\u7684\u95EE\u9898\u3002</p><blockquote><p>\u65E2\u7136\u6709 HTTP \u534F\u8BAE\uFF0C\u4E3A\u4EC0\u4E48\u8FD8\u8981\u6709 RPC\uFF1F</p></blockquote><p>\u5176\u5B9E\uFF0C<code>TCP</code> \u662F<strong>70\u5E74</strong>\u4EE3\u51FA\u6765\u7684\u534F\u8BAE\uFF0C\u800C <code>HTTP</code> \u662F <strong>90 \u5E74\u4EE3</strong>\u624D\u5F00\u59CB\u6D41\u884C\u7684\u3002\u800C\u76F4\u63A5\u4F7F\u7528\u88F8 TCP \u4F1A\u6709\u95EE\u9898\uFF0C\u53EF\u60F3\u800C\u77E5\uFF0C\u8FD9\u4E2D\u95F4\u8FD9\u4E48\u591A\u5E74\u6709\u591A\u5C11\u81EA\u5B9A\u4E49\u7684\u534F\u8BAE\uFF0C\u800C\u8FD9\u91CC\u9762\u5C31\u6709<strong>80\u5E74\u4EE3</strong>\u51FA\u6765\u7684 <code>RPC</code>\u3002</p><p>\u6240\u4EE5\u6211\u4EEC\u8BE5\u95EE\u7684\u4E0D\u662F<strong>\u65E2\u7136\u6709 HTTP \u534F\u8BAE\u4E3A\u4EC0\u4E48\u8981\u6709 RPC</strong>\uFF0C\u800C\u662F<strong>\u4E3A\u4EC0\u4E48\u6709 RPC \u8FD8\u8981\u6709 HTTP \u534F\u8BAE</strong>\u3002</p><blockquote><p>\u90A3\u65E2\u7136\u6709 RPC \u4E86\uFF0C\u4E3A\u4EC0\u4E48\u8FD8\u8981\u6709 HTTP \u5462\uFF1F</p></blockquote><p>\u73B0\u5728\u7535\u8111\u4E0A\u88C5\u7684\u5404\u79CD<strong>\u8054\u7F51</strong>\u8F6F\u4EF6\uFF0C\u6BD4\u5982 xx\u7BA1\u5BB6\uFF0Cxx\u536B\u58EB\uFF0C\u5B83\u4EEC\u90FD\u4F5C\u4E3A<strong>\u5BA2\u6237\u7AEF\uFF08Client\uFF09\u9700\u8981\u8DDF\u670D\u52A1\u7AEF\uFF08Server\uFF09\u5EFA\u7ACB\u8FDE\u63A5\u6536\u53D1\u6D88\u606F</strong>\uFF0C\u6B64\u65F6\u90FD\u4F1A\u7528\u5230\u5E94\u7528\u5C42\u534F\u8BAE\uFF0C\u5728\u8FD9\u79CD Client/Server (C/S) \u67B6\u6784\u4E0B\uFF0C\u5B83\u4EEC\u53EF\u4EE5\u4F7F\u7528\u81EA\u5BB6\u9020\u7684 RPC \u534F\u8BAE\uFF0C\u56E0\u4E3A\u5B83\u53EA\u7BA1\u8FDE\u81EA\u5DF1\u516C\u53F8\u7684\u670D\u52A1\u5668\u5C31 ok \u4E86\u3002</p><p>\u4F46\u6709\u4E2A\u8F6F\u4EF6\u4E0D\u540C\uFF0C<strong>\u6D4F\u89C8\u5668\uFF08Browser\uFF09</strong>\uFF0C\u4E0D\u7BA1\u662F Chrome \u8FD8\u662F IE\uFF0C\u5B83\u4EEC\u4E0D\u4EC5\u8981\u80FD\u8BBF\u95EE\u81EA\u5BB6\u516C\u53F8\u7684<strong>\u670D\u52A1\u5668\uFF08Server\uFF09</strong>\uFF0C\u8FD8\u9700\u8981\u8BBF\u95EE\u5176\u4ED6\u516C\u53F8\u7684\u7F51\u7AD9\u670D\u52A1\u5668\uFF0C\u56E0\u6B64\u5B83\u4EEC\u9700\u8981\u6709\u4E2A\u7EDF\u4E00\u7684\u6807\u51C6\uFF0C\u4E0D\u7136\u5927\u5BB6\u6CA1\u6CD5\u4EA4\u6D41\u3002\u4E8E\u662F\uFF0CHTTP \u5C31\u662F\u90A3\u4E2A\u65F6\u4EE3\u7528\u4E8E\u7EDF\u4E00 <strong>Browser/Server (B/S)</strong> \u7684\u534F\u8BAE\u3002</p><p>\u4E5F\u5C31\u662F\u8BF4\u5728\u591A\u5E74\u4EE5\u524D\uFF0C<strong>HTTP \u4E3B\u8981\u7528\u4E8E B/S \u67B6\u6784\uFF0C\u800C RPC \u66F4\u591A\u7528\u4E8E C/S \u67B6\u6784\u3002\u4F46\u73B0\u5728\u5176\u5B9E\u5DF2\u7ECF\u6CA1\u5206\u90A3\u4E48\u6E05\u4E86\uFF0CB/S \u548C C/S \u5728\u6162\u6162\u878D\u5408\u3002<strong>\u5F88\u591A\u8F6F\u4EF6\u540C\u65F6\u652F\u6301\u591A\u7AEF\uFF0C\u6BD4\u5982\u67D0\u5EA6\u4E91\u76D8\uFF0C\u65E2\u8981\u652F\u6301</strong>\u7F51\u9875\u7248</strong>\uFF0C\u8FD8\u8981\u652F\u6301<strong>\u624B\u673A\u7AEF\u548C PC \u7AEF</strong>\uFF0C\u5982\u679C\u901A\u4FE1\u534F\u8BAE\u90FD\u7528 HTTP \u7684\u8BDD\uFF0C\u90A3\u670D\u52A1\u5668\u53EA\u7528\u540C\u4E00\u5957\u5C31\u591F\u4E86\u3002\u800C RPC \u5C31\u5F00\u59CB\u9000\u5C45\u5E55\u540E\uFF0C\u4E00\u822C\u7528\u4E8E\u516C\u53F8\u5185\u90E8\u96C6\u7FA4\u91CC\uFF0C\u5404\u4E2A\u5FAE\u670D\u52A1\u4E4B\u95F4\u7684\u901A\u8BAF\u3002</p><p>\u90A3\u8FD9\u4E48\u8BF4\u7684\u8BDD\uFF0C<strong>\u90FD\u7528 HTTP \u5F97\u4E86\uFF0C\u8FD8\u7528\u4EC0\u4E48 RPC\uFF1F</strong></p><p>\u4EFF\u4F5B\u53C8\u56DE\u5230\u4E86\u6587\u7AE0\u5F00\u5934\u7684\u6837\u5B50\uFF0C\u90A3\u8FD9\u5C31\u8981\u4ECE\u5B83\u4EEC\u4E4B\u95F4\u7684\u533A\u522B\u5F00\u59CB\u8BF4\u8D77\u3002</p><h2 id="http-\u548C-rpc-\u6709\u4EC0\u4E48\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#http-\u548C-rpc-\u6709\u4EC0\u4E48\u533A\u522B" aria-hidden="true">#</a> HTTP \u548C RPC \u6709\u4EC0\u4E48\u533A\u522B</h2><p>\u6211\u4EEC\u6765\u770B\u770B RPC \u548C HTTP \u533A\u522B\u6BD4\u8F83\u660E\u663E\u7684\u51E0\u4E2A\u70B9\u3002</p><h3 id="\u670D\u52A1\u53D1\u73B0" tabindex="-1"><a class="header-anchor" href="#\u670D\u52A1\u53D1\u73B0" aria-hidden="true">#</a> \u670D\u52A1\u53D1\u73B0</h3><p>\u9996\u5148\u8981\u5411\u67D0\u4E2A\u670D\u52A1\u5668\u53D1\u8D77\u8BF7\u6C42\uFF0C\u4F60\u5F97\u5148\u5EFA\u7ACB\u8FDE\u63A5\uFF0C\u800C\u5EFA\u7ACB\u8FDE\u63A5\u7684\u524D\u63D0\u662F\uFF0C\u4F60\u5F97\u77E5\u9053 <strong>IP \u5730\u5740\u548C\u7AEF\u53E3</strong>\u3002\u8FD9\u4E2A\u627E\u5230\u670D\u52A1\u5BF9\u5E94\u7684 IP \u7AEF\u53E3\u7684\u8FC7\u7A0B\uFF0C\u5176\u5B9E\u5C31\u662F<strong>\u670D\u52A1\u53D1\u73B0</strong>\u3002</p><p>\u5728 <strong>HTTP</strong> \u4E2D\uFF0C\u4F60\u77E5\u9053\u670D\u52A1\u7684\u57DF\u540D\uFF0C\u5C31\u53EF\u4EE5\u901A\u8FC7 <strong>DNS \u670D\u52A1</strong>\u53BB\u89E3\u6790\u5F97\u5230\u5B83\u80CC\u540E\u7684 IP \u5730\u5740\uFF0C\u9ED8\u8BA4 80 \u7AEF\u53E3\u3002</p><p>\u800C <strong>RPC</strong> \u7684\u8BDD\uFF0C\u5C31\u6709\u4E9B\u533A\u522B\uFF0C\u4E00\u822C\u4F1A\u6709\u4E13\u95E8\u7684<strong>\u4E2D\u95F4\u670D\u52A1</strong>\u53BB\u4FDD\u5B58\u670D\u52A1\u540D\u548CIP\u4FE1\u606F\uFF0C\u6BD4\u5982 <strong>Consul \u6216\u8005 Etcd\uFF0C\u751A\u81F3\u662F Redis</strong>\u3002\u60F3\u8981\u8BBF\u95EE\u67D0\u4E2A\u670D\u52A1\uFF0C\u5C31\u53BB\u8FD9\u4E9B\u4E2D\u95F4\u670D\u52A1\u53BB\u83B7\u5F97 IP \u548C\u7AEF\u53E3\u4FE1\u606F\u3002\u7531\u4E8E DNS \u4E5F\u662F\u670D\u52A1\u53D1\u73B0\u7684\u4E00\u79CD\uFF0C\u6240\u4EE5\u4E5F\u6709\u57FA\u4E8E DNS \u53BB\u505A\u670D\u52A1\u53D1\u73B0\u7684\u7EC4\u4EF6\uFF0C\u6BD4\u5982<strong>CoreDNS</strong>\u3002</p><p>\u53EF\u4EE5\u770B\u51FA\u670D\u52A1\u53D1\u73B0\u8FD9\u4E00\u5757\uFF0C\u4E24\u8005\u662F\u6709\u4E9B\u533A\u522B\uFF0C\u4F46\u4E0D\u592A\u80FD\u5206\u9AD8\u4F4E\u3002</p><h3 id="\u5E95\u5C42\u8FDE\u63A5\u5F62\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u5E95\u5C42\u8FDE\u63A5\u5F62\u5F0F" aria-hidden="true">#</a> \u5E95\u5C42\u8FDE\u63A5\u5F62\u5F0F</h3><p>\u4EE5\u4E3B\u6D41\u7684 <strong>HTTP/1.1</strong> \u534F\u8BAE\u4E3A\u4F8B\uFF0C\u5176\u9ED8\u8BA4\u5728\u5EFA\u7ACB\u5E95\u5C42 TCP \u8FDE\u63A5\u4E4B\u540E\u4F1A\u4E00\u76F4\u4FDD\u6301\u8FD9\u4E2A\u8FDE\u63A5\uFF08<strong>Keep Alive</strong>\uFF09\uFF0C\u4E4B\u540E\u7684\u8BF7\u6C42\u548C\u54CD\u5E94\u90FD\u4F1A\u590D\u7528\u8FD9\u6761\u8FDE\u63A5\u3002</p><p>\u800C <strong>RPC</strong> \u534F\u8BAE\uFF0C\u4E5F\u8DDF HTTP \u7C7B\u4F3C\uFF0C\u4E5F\u662F\u901A\u8FC7\u5EFA\u7ACB TCP \u957F\u94FE\u63A5\u8FDB\u884C\u6570\u636E\u4EA4\u4E92\uFF0C\u4F46\u4E0D\u540C\u7684\u5730\u65B9\u5728\u4E8E\uFF0CRPC \u534F\u8BAE\u4E00\u822C\u8FD8\u4F1A\u518D\u5EFA\u4E2A<strong>\u8FDE\u63A5\u6C60</strong>\uFF0C\u5728\u8BF7\u6C42\u91CF\u5927\u7684\u65F6\u5019\uFF0C\u5EFA\u7ACB\u591A\u6761\u8FDE\u63A5\u653E\u5728\u6C60\u5185\uFF0C\u8981\u53D1\u6570\u636E\u7684\u65F6\u5019\u5C31\u4ECE\u6C60\u91CC\u53D6\u4E00\u6761\u8FDE\u63A5\u51FA\u6765\uFF0C<strong>\u7528\u5B8C\u653E\u56DE\u53BB\uFF0C\u4E0B\u6B21\u518D\u590D\u7528</strong>\uFF0C\u53EF\u4EE5\u8BF4\u975E\u5E38\u73AF\u4FDD\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/ec5c8e28d3ea308c6db2ac991a12ea80.png" alt="connection_pool"></p><p><strong>\u7531\u4E8E\u8FDE\u63A5\u6C60\u6709\u5229\u4E8E\u63D0\u5347\u7F51\u7EDC\u8BF7\u6C42\u6027\u80FD\uFF0C\u6240\u4EE5\u4E0D\u5C11\u7F16\u7A0B\u8BED\u8A00\u7684\u7F51\u7EDC\u5E93\u91CC\u90FD\u4F1A\u7ED9 HTTP \u52A0\u4E2A\u8FDE\u63A5\u6C60</strong>\uFF0C\u6BD4\u5982 <strong>Go</strong> \u5C31\u662F\u8FD9\u4E48\u5E72\u7684\u3002</p><p>\u53EF\u4EE5\u770B\u51FA\u8FD9\u4E00\u5757\u4E24\u8005\u4E5F\u6CA1\u592A\u5927\u533A\u522B\uFF0C\u6240\u4EE5\u4E5F\u4E0D\u662F\u5173\u952E\u3002</p><h3 id="\u4F20\u8F93\u7684\u5185\u5BB9" tabindex="-1"><a class="header-anchor" href="#\u4F20\u8F93\u7684\u5185\u5BB9" aria-hidden="true">#</a> \u4F20\u8F93\u7684\u5185\u5BB9</h3><p>\u57FA\u4E8E TCP \u4F20\u8F93\u7684\u6D88\u606F\uFF0C\u8BF4\u5230\u5E95\uFF0C\u65E0\u975E\u90FD\u662F<strong>\u6D88\u606F\u5934 Header \u548C\u6D88\u606F\u4F53 Body\u3002</strong></p><p><strong>Header</strong> \u662F\u7528\u4E8E\u6807\u8BB0\u4E00\u4E9B\u7279\u6B8A\u4FE1\u606F\uFF0C\u5176\u4E2D\u6700\u91CD\u8981\u7684\u662F<strong>\u6D88\u606F\u4F53\u957F\u5EA6</strong>\u3002</p><p><strong>Body</strong> \u5219\u662F\u653E\u6211\u4EEC\u771F\u6B63\u9700\u8981\u4F20\u8F93\u7684\u5185\u5BB9\uFF0C\u800C\u8FD9\u4E9B\u5185\u5BB9\u53EA\u80FD\u662F\u4E8C\u8FDB\u5236 01 \u4E32\uFF0C\u6BD5\u7ADF\u8BA1\u7B97\u673A\u53EA\u8BA4\u8BC6\u8FD9\u73A9\u610F\u3002\u6240\u4EE5 TCP \u4F20\u5B57\u7B26\u4E32\u548C\u6570\u5B57\u90FD\u95EE\u9898\u4E0D\u5927\uFF0C\u56E0\u4E3A\u5B57\u7B26\u4E32\u53EF\u4EE5\u8F6C\u6210\u7F16\u7801\u518D\u53D8\u6210 01 \u4E32\uFF0C\u800C\u6570\u5B57\u672C\u8EAB\u4E5F\u80FD\u76F4\u63A5\u8F6C\u4E3A\u4E8C\u8FDB\u5236\u3002\u4F46\u7ED3\u6784\u4F53\u5462\uFF0C\u6211\u4EEC\u5F97\u60F3\u4E2A\u529E\u6CD5\u5C06\u5B83\u4E5F\u8F6C\u4E3A\u4E8C\u8FDB\u5236 01 \u4E32\uFF0C\u8FD9\u6837\u7684\u65B9\u6848\u73B0\u5728\u4E5F\u6709\u5F88\u591A\u73B0\u6210\u7684\uFF0C\u6BD4\u5982 <strong>Json\uFF0CProtobuf\u3002</strong></p><p>\u8FD9\u4E2A\u5C06\u7ED3\u6784\u4F53\u8F6C\u4E3A\u4E8C\u8FDB\u5236\u6570\u7EC4\u7684\u8FC7\u7A0B\u5C31\u53EB<strong>\u5E8F\u5217\u5316</strong>\uFF0C\u53CD\u8FC7\u6765\u5C06\u4E8C\u8FDB\u5236\u6570\u7EC4\u590D\u539F\u6210\u7ED3\u6784\u4F53\u7684\u8FC7\u7A0B\u53EB<strong>\u53CD\u5E8F\u5217\u5316</strong>\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/dba2bc3af0938d2c087f85acc191fd3f.png" alt="\u5E8F\u5217\u5316\u548C\u53CD\u5E8F\u5217\u5316"></p><p>\u5BF9\u4E8E\u4E3B\u6D41\u7684 HTTP/1.1\uFF0C\u867D\u7136\u5B83\u73B0\u5728\u53EB<strong>\u8D85\u6587\u672C</strong>\u534F\u8BAE\uFF0C\u652F\u6301\u97F3\u9891\u89C6\u9891\uFF0C\u4F46 HTTP \u8BBE\u8BA1\u521D\u662F\u7528\u4E8E\u505A\u7F51\u9875<strong>\u6587\u672C</strong>\u5C55\u793A\u7684\uFF0C\u6240\u4EE5\u5B83\u4F20\u7684\u5185\u5BB9\u4EE5\u5B57\u7B26\u4E32\u4E3A\u4E3B\u3002Header \u548C Body \u90FD\u662F\u5982\u6B64\u3002\u5728 Body \u8FD9\u5757\uFF0C\u5B83\u4F7F\u7528 <strong>Json</strong> \u6765<strong>\u5E8F\u5217\u5316</strong>\u7ED3\u6784\u4F53\u6570\u636E\u3002</p><p>\u6211\u4EEC\u53EF\u4EE5\u968F\u4FBF\u622A\u4E2A\u56FE\u76F4\u89C2\u770B\u4E0B\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/324cbe84c303a3b975e50329f5cdbf8b.png" alt="HTTP \u62A5\u6587"></p><p>\u53EF\u4EE5\u770B\u5230\u8FD9\u91CC\u9762\u7684\u5185\u5BB9\u975E\u5E38\u591A\u7684<strong>\u5197\u4F59</strong>\uFF0C\u663E\u5F97<strong>\u975E\u5E38\u5570\u55E6</strong>\u3002\u6700\u660E\u663E\u7684\uFF0C\u50CF <code>Header</code> \u91CC\u7684\u90A3\u4E9B\u4FE1\u606F\uFF0C\u5176\u5B9E\u5982\u679C\u6211\u4EEC\u7EA6\u5B9A\u597D\u5934\u90E8\u7684\u7B2C\u51E0\u4F4D\u662F Content-Type\uFF0C\u5C31<strong>\u4E0D\u9700\u8981\u6BCF\u6B21\u90FD\u771F\u7684\u628A&quot;Content-Type&quot;\u8FD9\u4E2A\u5B57\u6BB5\u90FD\u4F20\u8FC7\u6765</strong>\uFF0C\u7C7B\u4F3C\u7684\u60C5\u51B5\u5176\u5B9E\u5728 <code>body</code> \u7684 Json \u7ED3\u6784\u91CC\u4E5F\u7279\u522B\u660E\u663E\u3002</p><p>\u800C RPC\uFF0C\u56E0\u4E3A\u5B83\u5B9A\u5236\u5316\u7A0B\u5EA6\u66F4\u9AD8\uFF0C\u53EF\u4EE5\u91C7\u7528\u4F53\u79EF\u66F4\u5C0F\u7684 Protobuf \u6216\u5176\u4ED6\u5E8F\u5217\u5316\u534F\u8BAE\u53BB\u4FDD\u5B58\u7ED3\u6784\u4F53\u6570\u636E\uFF0C\u540C\u65F6\u4E5F\u4E0D\u9700\u8981\u50CF HTTP \u90A3\u6837\u8003\u8651\u5404\u79CD\u6D4F\u89C8\u5668\u884C\u4E3A\uFF0C\u6BD4\u5982 302 \u91CD\u5B9A\u5411\u8DF3\u8F6C\u5565\u7684\u3002<strong>\u56E0\u6B64\u6027\u80FD\u4E5F\u4F1A\u66F4\u597D\u4E00\u4E9B\uFF0C\u8FD9\u4E5F\u662F\u5728\u516C\u53F8\u5185\u90E8\u5FAE\u670D\u52A1\u4E2D\u629B\u5F03 HTTP\uFF0C\u9009\u62E9\u4F7F\u7528 RPC \u7684\u6700\u4E3B\u8981\u539F\u56E0\u3002</strong></p><p><img src="https://img-blog.csdnimg.cn/img_convert/f4cef7331cabcfe56d9d6434f7ef907f.png" alt="HTTP \u539F\u7406"></p><p><img src="https://img-blog.csdnimg.cn/img_convert/12244fb0b19b2e61755fcab799198f68.png" alt="RPC \u539F\u7406"></p><p>\u5F53\u7136\u4E0A\u9762\u8BF4\u7684 HTTP\uFF0C\u5176\u5B9E<strong>\u7279\u6307\u7684\u662F\u73B0\u5728\u4E3B\u6D41\u4F7F\u7528\u7684 HTTP/1.1</strong>\uFF0C<code>HTTP/2</code> \u5728\u524D\u8005\u7684\u57FA\u7840\u4E0A\u505A\u4E86\u5F88\u591A\u6539\u8FDB\uFF0C\u6240\u4EE5<strong>\u6027\u80FD\u53EF\u80FD\u6BD4\u5F88\u591A RPC \u534F\u8BAE\u8FD8\u8981\u597D</strong>\uFF0C\u751A\u81F3\u8FDE <code>gRPC</code> \u5E95\u5C42\u90FD\u76F4\u63A5\u7528\u7684 <code>HTTP/2</code>\u3002</p><blockquote><p>\u90A3\u4E48\u95EE\u9898\u53C8\u6765\u4E86\uFF0C\u4E3A\u4EC0\u4E48\u65E2\u7136\u6709\u4E86 HTTP/2\uFF0C\u8FD8\u8981\u6709 RPC \u534F\u8BAE\uFF1F</p></blockquote><p>\u8FD9\u4E2A\u662F\u7531\u4E8E HTTP/2 \u662F 2015 \u5E74\u51FA\u6765\u7684\u3002\u90A3\u65F6\u5019\u5F88\u591A\u516C\u53F8\u5185\u90E8\u7684 RPC \u534F\u8BAE\u90FD\u5DF2\u7ECF\u8DD1\u4E86\u597D\u4E9B\u5E74\u4E86\uFF0C\u57FA\u4E8E\u5386\u53F2\u539F\u56E0\uFF0C\u4E00\u822C\u4E5F\u6CA1\u5FC5\u8981\u53BB\u6362\u4E86\u3002</p><h2 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h2><ul><li>\u7EAF\u88F8 TCP \u662F\u80FD\u6536\u53D1\u6570\u636E\uFF0C\u4F46\u5B83\u662F\u4E2A<strong>\u65E0\u8FB9\u754C</strong>\u7684\u6570\u636E\u6D41\uFF0C\u4E0A\u5C42\u9700\u8981\u5B9A\u4E49<strong>\u6D88\u606F\u683C\u5F0F</strong>\u7528\u4E8E\u5B9A\u4E49<strong>\u6D88\u606F\u8FB9\u754C</strong>\u3002\u4E8E\u662F\u5C31\u6709\u4E86\u5404\u79CD\u534F\u8BAE\uFF0CHTTP \u548C\u5404\u7C7B RPC \u534F\u8BAE\u5C31\u662F\u5728 TCP \u4E4B\u4E0A\u5B9A\u4E49\u7684\u5E94\u7528\u5C42\u534F\u8BAE\u3002</li><li><strong>RPC \u672C\u8D28\u4E0A\u4E0D\u7B97\u662F\u534F\u8BAE\uFF0C\u800C\u662F\u4E00\u79CD\u8C03\u7528\u65B9\u5F0F</strong>\uFF0C\u800C\u50CF gRPC \u548C Thrift \u8FD9\u6837\u7684\u5177\u4F53\u5B9E\u73B0\uFF0C\u624D\u662F\u534F\u8BAE\uFF0C\u5B83\u4EEC\u662F\u5B9E\u73B0\u4E86 RPC \u8C03\u7528\u7684\u534F\u8BAE\u3002\u76EE\u7684\u662F\u5E0C\u671B\u7A0B\u5E8F\u5458\u80FD\u50CF\u8C03\u7528\u672C\u5730\u65B9\u6CD5\u90A3\u6837\u53BB\u8C03\u7528\u8FDC\u7AEF\u7684\u670D\u52A1\u65B9\u6CD5\u3002\u540C\u65F6 RPC \u6709\u5F88\u591A\u79CD\u5B9E\u73B0\u65B9\u5F0F\uFF0C<strong>\u4E0D\u4E00\u5B9A\u975E\u5F97\u57FA\u4E8E TCP \u534F\u8BAE</strong>\u3002</li><li>\u4ECE\u53D1\u5C55\u5386\u53F2\u6765\u8BF4\uFF0C<strong>HTTP \u4E3B\u8981\u7528\u4E8E B/S \u67B6\u6784\uFF0C\u800C RPC \u66F4\u591A\u7528\u4E8E C/S \u67B6\u6784\u3002\u4F46\u73B0\u5728\u5176\u5B9E\u5DF2\u7ECF\u6CA1\u5206\u90A3\u4E48\u6E05\u4E86\uFF0CB/S \u548C C/S \u5728\u6162\u6162\u878D\u5408</strong>\u3002\u5F88\u591A\u8F6F\u4EF6\u540C\u65F6\u652F\u6301\u591A\u7AEF\uFF0C\u6240\u4EE5\u5BF9\u5916\u4E00\u822C\u7528 HTTP \u534F\u8BAE\uFF0C\u800C\u5185\u90E8\u96C6\u7FA4\u7684\u5FAE\u670D\u52A1\u4E4B\u95F4\u5219\u91C7\u7528 RPC \u534F\u8BAE\u8FDB\u884C\u901A\u8BAF\u3002</li><li>RPC \u5176\u5B9E\u6BD4 HTTP \u51FA\u73B0\u7684\u8981\u65E9\uFF0C\u4E14\u6BD4\u76EE\u524D\u4E3B\u6D41\u7684 HTTP/1.1 <strong>\u6027\u80FD</strong>\u8981\u66F4\u597D\uFF0C\u6240\u4EE5\u5927\u90E8\u5206\u516C\u53F8\u5185\u90E8\u90FD\u8FD8\u5728\u4F7F\u7528 RPC\u3002</li><li><strong>HTTP/2.0</strong> \u5728 <strong>HTTP/1.1</strong> \u7684\u57FA\u7840\u4E0A\u505A\u4E86\u4F18\u5316\uFF0C\u6027\u80FD\u53EF\u80FD\u6BD4\u5F88\u591A RPC \u534F\u8BAE\u90FD\u8981\u597D\uFF0C\u4F46\u7531\u4E8E\u662F\u8FD9\u51E0\u5E74\u624D\u51FA\u6765\u7684\uFF0C\u6240\u4EE5\u4E5F\u4E0D\u592A\u53EF\u80FD\u53D6\u4EE3\u6389 RPC\u3002</li></ul><hr>`,63);function l(h,C){const r=e("ExternalLinkIcon");return g(),c("div",null,[d,n("p",null,[t("\u8FD9\u5C31\u662F\u6240\u8C13\u7684"),i,t("\uFF0C\u4E4B\u524D\u4E5F\u5199\u8FC7\u4E00\u7BC7\u4E13\u95E8\u7684"),n("a",P,[t("\u6587\u7AE0"),p(r)]),t("\u804A\u8FC7\u8FD9\u4E2A\u95EE\u9898\u3002")]),T])}const u=s(a,[["render",l],["__file","http-rpc.html.vue"]]);export{u as default};
