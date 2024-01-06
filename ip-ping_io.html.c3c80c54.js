import{_ as s,o as n,c as e,f as a}from"./app.773abf9d.js";const o={},p=a(`<h1 id="\u65AD\u7F51\u4E86-\u8FD8\u80FD-ping-\u901A-127-0-0-1-\u5417" tabindex="-1"><a class="header-anchor" href="#\u65AD\u7F51\u4E86-\u8FD8\u80FD-ping-\u901A-127-0-0-1-\u5417" aria-hidden="true">#</a> \u65AD\u7F51\u4E86\uFF0C\u8FD8\u80FD ping \u901A 127.0.0.1 \u5417\uFF1F</h1><p>\u4F60<strong>\u5973\u795E\u7231\u4E0D\u7231\u4F60</strong>\uFF0C\u4F60\u95EE\u5979\uFF0C\u5979\u53EF\u80FD\u4E0D\u4F1A\u544A\u8BC9\u4F60\u3002</p><p>\u4F46<strong>\u7F51\u901A\u4E0D\u901A</strong>\uFF0C\u4F60 <code>ping</code> \u4E00\u4E0B\u5C31\u77E5\u9053\u4E86\u3002</p><p>\u53EF\u80FD\u770B\u5230\u6807\u9898\uFF0C\u4F60\u5C31\u77E5\u9053\u7B54\u6848\u4E86\uFF0C\u4F46\u662F\u4F60\u4E86\u89E3\u80CC\u540E\u7684\u539F\u56E0\u5417\uFF1F</p><p>\u90A3\u5982\u679C\u628A <code>127.0.0.1</code> \u6362\u6210 <code>0.0.0.0</code> \u6216 <code>localhost</code> \u4F1A\u600E\u4E48\u6837\u5462\uFF1F\u4F60\u77E5\u9053\u8FD9\u51E0\u4E2A<code>IP</code>\u6709\u4EC0\u4E48\u533A\u522B\u5417\uFF1F</p><p>\u4EE5\u524D\u9762\u8BD5\u7684\u65F6\u5019\u5C31\u9047\u5230\u8FC7\u8FD9\u4E2A\u95EE\u9898\uFF0C\u5927\u5BB6\u770B\u4E2A\u52A8\u56FE\u4E86\u89E3\u4E0B\u9762\u8BD5\u5B98\u548C\u6211\u5F53\u65F6\u7684\u573A\u666F\uFF0C\u6C42\u5F53\u65F6\u6211\u7684\u5FC3\u91CC\u9634\u5F71\u9762\u79EF\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/c3a97f36607c0e7ef6805bfba482a060.gif" alt="\u56FE\u7247"></p><p>\u8BDD\u4E0D\u591A\u8BF4\uFF0C\u6211\u4EEC\u76F4\u63A5\u5F00\u8F66\u3002</p><p>\u62D4\u6389\u7F51\u7EBF\uFF0C\u65AD\u7F51\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/5137bc7bce08dc60cfa2f8152b738dfd.jpeg" alt="\u56FE\u7247"></p><p>\u7136\u540E\u5728\u63A7\u5236\u53F0\u8F93\u5165<code>ping 127.0.0.1</code>\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">ping</span> <span class="token number">127.0</span>.0.1
PING <span class="token number">127.0</span>.0.1 <span class="token punctuation">(</span><span class="token number">127.0</span>.0.1<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">127.0</span>.0.1: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.080</span> ms
<span class="token number">64</span> bytes from <span class="token number">127.0</span>.0.1: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.093</span> ms
<span class="token number">64</span> bytes from <span class="token number">127.0</span>.0.1: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.074</span> ms
<span class="token number">64</span> bytes from <span class="token number">127.0</span>.0.1: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">3</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.079</span> ms
<span class="token number">64</span> bytes from <span class="token number">127.0</span>.0.1: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">4</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.079</span> ms
^C
--- <span class="token number">127.0</span>.0.1 <span class="token function">ping</span> statistics ---
<span class="token number">5</span> packets transmitted, <span class="token number">5</span> packets received, <span class="token number">0.0</span>% packet loss
round-trip min/avg/max/stddev <span class="token operator">=</span> <span class="token number">0.074</span>/0.081/0.093/0.006 ms
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BF4\u660E\uFF0C\u62D4\u4E86\u7F51\u7EBF\uFF0C<code>ping 127.0.0.1</code> \u662F<strong>\u80FDping\u901A\u7684</strong>\u3002</p><p>\u5176\u5B9E\u8FD9\u7BC7\u6587\u7AE0\u770B\u5230\u8FD9\u91CC\uFF0C\u6807\u9898\u524D\u534A\u4E2A\u95EE\u9898\u5DF2\u7ECF\u88AB\u56DE\u7B54\u4E86\u3002\u4F46\u662F\u6211\u4EEC\u53EF\u4EE5\u518D\u60F3\u6DF1\u4E00\u70B9\u3002</p><p>\u4E3A\u4EC0\u4E48\u65AD\u7F51\u4E86\u8FD8\u80FD <code>ping</code> \u901A <code>127.0.0.1</code> \u5462\uFF1F</p><p><strong>\u8FD9\u80FD\u8BF4\u660E\u4F60\u4E0D\u7528\u4EA4\u7F51\u8D39\u5C31\u80FD\u4E0A\u7F51\u5417\uFF1F</strong></p><p><strong>\u4E0D\u80FD\u3002</strong></p><p>\u9996\u5148\u6211\u4EEC\u9700\u8981\u8FDB\u5165\u57FA\u7840\u79D1\u666E\u73AF\u8282\u3002</p><p>\u4E0D\u61C2\u7684\u540C\u5B66\u770B\u4E86\u5C31\u61C2\u4E86\uFF0C\u61C2\u7684\u770B\u4E86\u5C31\u5F53\u67E5\u6F0F\u8865\u7F3A\u5427\u3002</p><h2 id="\u4EC0\u4E48\u662F127-0-0-1" tabindex="-1"><a class="header-anchor" href="#\u4EC0\u4E48\u662F127-0-0-1" aria-hidden="true">#</a> \u4EC0\u4E48\u662F127.0.0.1</h2><p>\u9996\u5148\uFF0C\u8FD9\u662F\u4E2A <code>IPV4</code> \u5730\u5740\u3002</p><p><code>IPV4</code> \u5730\u5740\u6709 <code>32</code> \u4F4D\uFF0C\u4E00\u4E2A\u5B57\u8282\u6709 <code>8</code> \u4F4D\uFF0C\u5171 <code>4</code> \u4E2A\u5B57\u8282\u3002</p><p>\u5176\u4E2D<strong>127 \u5F00\u5934\u7684\u90FD\u5C5E\u4E8E\u56DE\u73AF\u5730\u5740</strong>\uFF0C\u4E5F\u662F <code>IPV4</code> \u7684\u7279\u6B8A\u5730\u5740\uFF0C\u6CA1\u4EC0\u4E48\u9053\u7406\uFF0C\u5C31\u662F\u4EBA\u4E3A\u89C4\u5B9A\u7684\u3002</p><p>\u800C<code>127.0.0.1</code>\u662F<strong>\u4F17\u591A</strong>\u56DE\u73AF\u5730\u5740\u4E2D\u7684\u4E00\u4E2A\u3002\u4E4B\u6240\u4EE5\u4E0D\u662F <code>127.0.0.2</code> \uFF0C\u800C\u662F <code>127.0.0.1</code>\uFF0C\u662F\u56E0\u4E3A\u6E90\u7801\u91CC\u5C31\u662F\u8FD9\u4E48\u5B9A\u4E49\u7684\uFF0C\u4E5F\u6CA1\u4EC0\u4E48\u9053\u7406\u3002</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/* Address to loopback in software to local host.  */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span>    <span class="token macro-name">INADDR_LOOPBACK</span>     <span class="token expression"><span class="token number">0x7f000001</span>  </span><span class="token comment">/* 127.0.0.1   */</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/fa904fbcf66cc7abf510a8dc16f867fa.png" alt="\u56FE\u7247"></p><p><code>IPv4</code> \u7684\u5730\u5740\u662F <code>32</code> \u4F4D\u7684\uFF0C2\u768432\u6B21\u65B9\uFF0C\u5927\u6982\u662F<code>40+\u4EBF</code>\u3002\u5730\u7403\u5149\u4EBA\u53E3\u5C3176\u4EBF\u4E86\uFF0C40\u4EBFIP\u8FD9\u70B9\u91CF\uFF0C<strong>\u585E\u7259\u7F1D\u90FD\u4E0D\u591F</strong>\uFF0C\u5B9E\u9645\u4E0A<strong>IP\u4E5F\u786E\u5B9E\u7528\u5B8C</strong>\u4E86\u3002</p><p>\u6240\u4EE5\u5C31\u6709\u4E86<code>IPV6</code>\uFF0C <code>IPv6</code> \u7684\u5730\u5740\u662F <code>128</code> \u4F4D\u7684\uFF0C\u5927\u6982\u662F2\u7684128\u6B21\u65B9\u2248<strong>10\u768438\u6B21\u65B9</strong>\u3002\u636E\u8BF4\u5730\u7403\u7684\u6C99\u5B50\u6570\u91CF\u5927\u6982\u662F <strong>10\u768423\u6B21\u65B9</strong>\uFF0C\u6240\u4EE5IPV6\u7684IP\u53EF\u4EE5\u8BA4\u4E3A\u7528\u4E0D\u5B8C\u3002</p><p>IPV4\u4EE58\u4F4D\u4E00\u7EC4\uFF0C\u6BCF\u7EC4\u4E4B\u95F4\u7528 <strong>.</strong> \u53F7\u9694\u5F00\u3002</p><p>IPV6\u5C31\u4EE516\u4F4D\u4E3A\u4E00\u7EC4\uFF0C\u6BCF\u7EC4\u4E4B\u95F4\u7528 <strong>:</strong> \u53F7\u9694\u5F00\u3002\u5982\u679C\u5168\u662F0\uFF0C\u90A3\u4E48\u53EF\u4EE5\u7701\u7565\u4E0D\u5199\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/e841adeeecf9451e1aca296d5c7a7f30.png" alt="\u56FE\u7247"></p><p>\u5728IPV4\u4E0B\u7684\u56DE\u73AF\u5730\u5740\u662F <code>127.0.0.1</code>\uFF0C\u5728<code>IPV6</code>\u4E0B\uFF0C\u8868\u8FBE\u4E3A <code>::1</code> \u3002\u4E2D\u95F4\u628A<strong>\u8FDE\u7EED\u76840</strong>\u7ED9\u7701\u7565\u4E86\uFF0C\u4E4B\u6240\u4EE5\u4E0D\u662F<strong>7\u4E2A \u5192\u53F7</strong>\uFF0C\u800C\u662F<strong>2\u4E2A\u5192\u53F7:</strong> \uFF0C \u662F\u56E0\u4E3A\u4E00\u4E2A IPV6 \u5730\u5740\u4E2D<strong>\u53EA\u5141\u8BB8\u51FA\u73B0\u2F00\u6B21\u4E24\u4E2A\u8FDE\u7EED\u7684\u5192\u53F7</strong>\u3002</p><blockquote><p>\u591A\u8BF4\u4E00\u53E5\uFF1A\u5728IPV4\u4E0B\u7528\u7684\u662F <strong>ping 127.0.0.1</strong> \u547D\u4EE4\u3002\u5728IPV6\u4E0B\u7528\u7684\u662F <strong>ping6 ::1</strong> \u547D\u4EE4\u3002</p></blockquote><h2 id="\u4EC0\u4E48\u662F-ping" tabindex="-1"><a class="header-anchor" href="#\u4EC0\u4E48\u662F-ping" aria-hidden="true">#</a> \u4EC0\u4E48\u662F ping</h2><p>ping \u662F\u5E94\u7528\u5C42\u547D\u4EE4\uFF0C\u53EF\u4EE5\u7406\u89E3\u4E3A\u5B83\u8DDF\u6E38\u620F\u6216\u8005\u804A\u5929\u8F6F\u4EF6\u5C5E\u4E8E\u540C\u4E00\u5C42\u3002\u53EA\u4E0D\u8FC7\u804A\u5929\u8F6F\u4EF6\u53EF\u4EE5\u6536\u53D1\u6D88\u606F\uFF0C\u8FD8\u80FD\u70B9\u4E2A\u8D5E\u4EC0\u4E48\u7684\uFF0C\u6709\u5F88\u591A\u590D\u6742\u7684\u529F\u80FD\u3002\u800C ping \u4F5C\u4E3A\u4E00\u4E2A\u5C0F\u8F6F\u4EF6\uFF0C\u5B83\u7684\u529F\u80FD\u6BD4\u8F83\u7B80\u5355\uFF0C\u5C31\u662F<strong>\u5C1D\u8BD5</strong>\u53D1\u9001\u4E00\u4E2A\u5C0F\u5C0F\u7684\u6D88\u606F\u5230\u76EE\u6807\u673A\u5668\u4E0A\uFF0C\u5224\u65AD\u76EE\u7684\u673A\u5668\u662F\u5426<strong>\u53EF\u8FBE</strong>\uFF0C\u5176\u5B9E\u4E5F\u5C31\u662F\u5224\u65AD\u76EE\u6807\u673A\u5668\u7F51\u7EDC\u662F\u5426\u80FD\u8FDE\u901A\u3002</p><p>ping\u5E94\u7528\u7684\u5E95\u5C42\uFF0C\u7528\u7684\u662F\u7F51\u7EDC\u5C42\u7684<strong>ICMP\u534F\u8BAE</strong>\u3002</p><p>IP\u548CICMP\u548CPing\u6240\u5728\u5206\u5C42</p><p>\u867D\u7136ICMP\u534F\u8BAE\u548CIP\u534F\u8BAE<strong>\u90FD\u5C5E\u4E8E\u7F51\u7EDC\u5C42\u534F\u8BAE</strong>\uFF0C\u4F46\u5176\u5B9E<strong>ICMP\u4E5F\u662F\u5229\u7528\u4E86IP\u534F\u8BAE\u8FDB\u884C\u6D88\u606F\u7684\u4F20\u8F93</strong>\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/8e0aba146432baeb407ab445292c8019.png" alt="\u56FE\u7247"></p><p>\u6240\u4EE5\uFF0C\u5927\u5BB6\u5728\u8FD9\u91CC\u5B8C\u5168\u53EF\u4EE5\u7B80\u5355\u7684\u7406\u89E3\u4E3A ping \u67D0\u4E2AIP \u5C31\u662F\u5F80\u67D0\u4E2AIP\u5730\u5740\u53D1\u4E2A\u6D88\u606F\u3002</p><h2 id="tcp\u53D1\u6570\u636E\u548Cping\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#tcp\u53D1\u6570\u636E\u548Cping\u7684\u533A\u522B" aria-hidden="true">#</a> TCP\u53D1\u6570\u636E\u548Cping\u7684\u533A\u522B</h2><p>\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u4F1A\u4F7F\u7528 TCP \u8FDB\u884C\u7F51\u7EDC\u6570\u636E\u4F20\u8F93\uFF0C\u90A3\u4E48\u6211\u4EEC\u53EF\u4EE5\u770B\u4E0B\u5B83\u548C ping \u7684\u533A\u522B\u3002</p><p><em>PS\uFF1A\u4E0B\u56FE\u4E2D\u6709\u4E00\u5904\u753B\u9519\u4E86\uFF0C\u53F3\u8FB9\u662F tcp \u6570\u636E\uFF0C\u800C\u4E0D\u662F ping \u6570\u636E\uFF0C\u6211\u5077\u61D2\u5C31\u4E0D\u91CD\u753B\u4E86</em>\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/eb0963a11439dff361dbe0e7a8876abd.png" alt="\u56FE\u7247"></p><p>ping\u548C\u5176\u4ED6\u5E94\u7528\u5C42\u8F6F\u4EF6\u90FD\u5C5E\u4E8E<strong>\u5E94\u7528\u5C42</strong>\u3002</p><p>\u90A3\u4E48\u6211\u4EEC\u6A2A\u5411\u5BF9\u6BD4\u4E00\u4E0B\uFF0C\u6BD4\u65B9\u8BF4\u804A\u5929\u8F6F\u4EF6\uFF0C\u5982\u679C\u7528\u7684\u662FTCP\u7684\u65B9\u5F0F\u53BB\u53D1\u9001\u6D88\u606F\u3002</p><p>\u4E3A\u4E86\u53D1\u9001\u6D88\u606F\uFF0C\u90A3\u5C31\u5F97\u5148\u77E5\u9053\u5F80\u54EA\u53D1\u3002linux\u91CC\u4E07\u7269\u7686\u6587\u4EF6\uFF0C\u90A3\u4F60\u8981\u53D1\u6D88\u606F\u7684\u76EE\u7684\u5730\uFF0C\u4E5F\u662F\u4E2A\u6587\u4EF6\uFF0C\u8FD9\u91CC\u5C31\u5F15\u51FA\u4E86socket \u7684\u6982\u5FF5\u3002</p><p>\u8981\u4F7F\u7528 <code>socket</code> , \u90A3\u4E48\u9996\u5148\u9700\u8981\u521B\u5EFA\u5B83\u3002</p><p>\u5728 TCP \u4F20\u8F93\u4E2D\u521B\u5EFA\u7684\u65B9\u5F0F\u662F <code>socket(AF_INET, SOCK_STREAM, 0);</code>\uFF0C\u5176\u4E2D <code>AF_INET</code> \u8868\u793A\u5C06\u4F7F\u7528 IPV4 \u91CC <strong>host:port</strong> \u7684\u65B9\u5F0F\u53BB\u89E3\u6790\u5F85\u4F1A\u4F60\u8F93\u5165\u7684\u7F51\u7EDC\u5730\u5740\u3002<code>SOCK_STREAM</code> \u662F\u6307\u4F7F\u7528\u9762\u5411\u5B57\u8282\u6D41\u7684 TCP \u534F\u8BAE\uFF0C<strong>\u5DE5\u4F5C\u5728\u4F20\u8F93\u5C42</strong>\u3002</p><p>\u521B\u5EFA\u597D\u4E86 <code>socket</code> \u4E4B\u540E\uFF0C\u5C31\u53EF\u4EE5\u6109\u5FEB\u7684\u628A\u8981\u4F20\u8F93\u7684\u6570\u636E\u5199\u5230\u8FD9\u4E2A\u6587\u4EF6\u91CC\u3002\u8C03\u7528 socket \u7684<code>sendto</code>\u63A5\u53E3\u7684\u8FC7\u7A0B\u4E2D\u8FDB\u7A0B\u4F1A\u4ECE<strong>\u7528\u6237\u6001\u8FDB\u5165\u5230\u5185\u6838\u6001</strong>\uFF0C\u6700\u540E\u4F1A\u8C03\u7528\u5230 <code>sock_sendmsg</code> \u65B9\u6CD5\u3002</p><p>\u7136\u540E\u8FDB\u5165\u4F20\u8F93\u5C42\uFF0C\u5E26\u4E0A<code>TCP</code>\u5934\u3002\u7F51\u7EDC\u5C42\u5E26\u4E0A<code>IP</code>\u5934\uFF0C\u6570\u636E\u94FE\u8DEF\u5C42\u5E26\u4E0A <code>MAC</code>\u5934\u7B49\u4E00\u7CFB\u5217\u64CD\u4F5C\u540E\u3002\u8FDB\u5165\u7F51\u5361\u7684<strong>\u53D1\u9001\u961F\u5217 ring buffer</strong> \uFF0C\u987A\u7740\u7F51\u5361\u5C31\u53D1\u51FA\u53BB\u4E86\u3002</p><p>\u56DE\u5230 <code>ping</code> \uFF0C \u6574\u4E2A\u8FC7\u7A0B\u4E5F\u57FA\u672C\u8DDF <code>TCP</code> \u53D1\u6570\u636E\u7C7B\u4F3C\uFF0C\u5DEE\u5F02\u7684\u5730\u65B9\u4E3B\u8981\u5728\u4E8E\uFF0C\u521B\u5EFA <code>socket</code> \u7684\u65F6\u5019\u7528\u7684\u662F <code>socket(AF_INET,SOCK_RAW,IPPROTO_ICMP)</code>\uFF0C<code>SOCK_RAW</code> \u662F\u539F\u59CB\u5957\u63A5\u5B57 \uFF0C<strong>\u5DE5\u4F5C\u5728\u7F51\u7EDC\u5C42</strong>\uFF0C \u6240\u4EE5\u6784\u5EFA<code>ICMP</code>\uFF08\u7F51\u7EDC\u5C42\u534F\u8BAE\uFF09\u7684\u6570\u636E\uFF0C\u662F\u518D\u5408\u9002\u4E0D\u8FC7\u4E86\u3002ping \u5728\u8FDB\u5165\u5185\u6838\u6001\u540E\u6700\u540E\u4E5F\u662F\u8C03\u7528\u7684 <code>sock_sendmsg</code> \u65B9\u6CD5\uFF0C\u8FDB\u5165\u5230\u7F51\u7EDC\u5C42\u540E\u52A0\u4E0A<strong>ICMP\u548CIP\u5934</strong>\u540E\uFF0C\u6570\u636E\u94FE\u8DEF\u5C42\u52A0\u4E0A<strong>MAC\u5934</strong>\uFF0C\u4E5F\u662F\u987A\u7740\u7F51\u5361\u53D1\u51FA\u3002\u56E0\u6B64 \u672C\u8D28\u4E0Aping \u8DDF \u666E\u901A\u5E94\u7528\u53D1\u6D88\u606F \u5728\u7A0B\u5E8F\u6D41\u7A0B\u4E0A\u6CA1\u592A\u5927\u5DEE\u522B\u3002</p><p>\u8FD9\u4E5F\u89E3\u91CA\u4E86<strong>\u4E3A\u4EC0\u4E48\u5F53\u4F60\u53D1\u73B0\u6000\u7591\u7F51\u7EDC\u6709\u95EE\u9898\u7684\u65F6\u5019\uFF0C\u522B\u4EBA\u7B2C\u4E00\u65F6\u95F4\u662F\u95EE\u4F60\u80FDping\u901A\u5417\uFF1F</strong> \u56E0\u4E3A\u53EF\u4EE5\u7B80\u5355\u7406\u89E3\u4E3Aping\u5C31\u662F\u81EA\u5DF1\u7EC4\u4E86\u4E2A\u6570\u636E\u5305\uFF0C\u8BA9\u7CFB\u7EDF\u6309\u7740\u5176\u4ED6\u8F6F\u4EF6\u53D1\u9001\u6570\u636E\u7684\u8DEF\u5F84\u5F80\u5916\u53D1\u4E00\u904D\uFF0C\u80FD\u901A\u7684\u8BDD\u8BF4\u660E\u5176\u4ED6\u8F6F\u4EF6\u53D1\u7684\u6570\u636E\u4E5F\u80FD\u901A\u3002</p><h2 id="\u4E3A\u4EC0\u4E48\u65AD\u7F51\u4E86\u8FD8\u80FD-ping-\u901A-127-0-0-1" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u65AD\u7F51\u4E86\u8FD8\u80FD-ping-\u901A-127-0-0-1" aria-hidden="true">#</a> \u4E3A\u4EC0\u4E48\u65AD\u7F51\u4E86\u8FD8\u80FD ping \u901A 127.0.0.1</h2><p>\u524D\u9762\u63D0\u5230\uFF0C\u6709\u7F51\u7684\u60C5\u51B5\u4E0B\uFF0Cping \u6700\u540E\u662F<strong>\u901A\u8FC7\u7F51\u5361</strong>\u5C06\u6570\u636E\u53D1\u9001\u51FA\u53BB\u7684\u3002</p><p>\u90A3\u4E48\u65AD\u7F51\u7684\u60C5\u51B5\u4E0B\uFF0C\u7F51\u5361\u5DF2\u7ECF\u4E0D\u5DE5\u4F5C\u4E86\uFF0Cping \u56DE\u73AF\u5730\u5740\u5374\u4E00\u5207\u6B63\u5E38\uFF0C\u6211\u4EEC\u53EF\u4EE5\u770B\u4E0B\u8FD9\u79CD\u60C5\u51B5\u4E0B\u7684\u5DE5\u4F5C\u539F\u7406\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/c1019a8be584b27c4fc8b8abda9d3cf1.png" alt="\u56FE\u7247"></p><p>\u4ECE\u5E94\u7528\u5C42\u5230\u4F20\u8F93\u5C42\u518D\u5230\u7F51\u7EDC\u5C42\u3002\u8FD9\u6BB5\u8DEF\u5F84\u8DDFping\u5916\u7F51\u7684\u65F6\u5019\u662F\u51E0\u4E4E\u662F\u4E00\u6837\u7684\u3002\u5230\u4E86\u7F51\u7EDC\u5C42\uFF0C\u7CFB\u7EDF\u4F1A\u6839\u636E\u76EE\u7684IP\uFF0C\u5728\u8DEF\u7531\u8868\u4E2D\u83B7\u53D6\u5BF9\u5E94\u7684<strong>\u8DEF\u7531\u4FE1\u606F</strong>\uFF0C\u800C\u8FD9\u5176\u4E2D\u5C31\u5305\u542B\u9009\u62E9<strong>\u54EA\u4E2A\u7F51\u5361</strong>\u628A\u6D88\u606F\u53D1\u51FA\u3002</p><p>\u5F53\u53D1\u73B0<strong>\u76EE\u6807IP\u662F\u5916\u7F51IP</strong>\u65F6\uFF0C\u4F1A\u4ECE&quot;\u771F\u7F51\u5361&quot;\u53D1\u51FA\u3002</p><p>\u5F53\u53D1\u73B0<strong>\u76EE\u6807IP\u662F\u56DE\u73AF\u5730\u5740</strong>\u65F6\uFF0C\u5C31\u4F1A\u9009\u62E9<strong>\u672C\u5730\u7F51\u5361</strong>\u3002</p><p>\u672C\u5730\u7F51\u5361\uFF0C\u5176\u5B9E\u5C31\u662F\u4E2A <strong>&quot;</strong> <strong>\u5047\u7F51\u5361</strong> <strong>&quot;</strong>\uFF0C\u5B83\u4E0D\u50CF&quot;\u771F\u7F51\u5361&quot;\u90A3\u6837\u6709\u4E2A<code>ring buffer</code>\u4EC0\u4E48\u7684\uFF0C&quot;\u5047\u7F51\u5361&quot;\u4F1A\u628A\u6570\u636E\u63A8\u5230\u4E00\u4E2A\u53EB <code>input_pkt_queue</code> \u7684 <strong>\u94FE\u8868</strong> \u4E2D\u3002\u8FD9\u4E2A\u94FE\u8868\uFF0C\u5176\u5B9E\u662F\u6240\u6709\u7F51\u5361\u5171\u4EAB\u7684\uFF0C\u4E0A\u9762\u6302\u7740\u53D1\u7ED9\u672C\u673A\u7684\u5404\u79CD\u6D88\u606F\u3002\u6D88\u606F\u88AB\u53D1\u9001\u5230\u8FD9\u4E2A\u94FE\u8868\u540E\uFF0C\u4F1A\u518D\u89E6\u53D1\u4E00\u4E2A<strong>\u8F6F\u4E2D\u65AD</strong>\u3002</p><p>\u4E13\u95E8\u5904\u7406\u8F6F\u4E2D\u65AD\u7684\u5DE5\u5177\u4EBA <strong>&quot;</strong> <strong>ksoftirqd</strong> <strong>&quot;</strong>\uFF08\u8FD9\u662F\u4E2A<strong>\u5185\u6838\u7EBF\u7A0B</strong>\uFF09\uFF0C\u5B83\u5728\u6536\u5230\u8F6F\u4E2D\u65AD\u540E\u5C31\u4F1A\u7ACB\u9A6C\u53BB\u94FE\u8868\u91CC\u628A\u6D88\u606F\u53D6\u51FA\uFF0C\u7136\u540E\u987A\u7740\u6570\u636E\u94FE\u8DEF\u5C42\u3001\u7F51\u7EDC\u5C42\u7B49\u5C42\u5C42\u5F80\u4E0A\u4F20\u9012\u6700\u540E\u7ED9\u5230\u5E94\u7528\u7A0B\u5E8F\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/a207c14a5416f44e9dbf0fe0a41179e4.png" alt="\u56FE\u7247"></p><p>ping \u56DE\u73AF\u5730\u5740\u548C<strong>\u901A\u8FC7TCP\u7B49\u5404\u79CD\u534F\u8BAE\u53D1\u9001\u6570\u636E\u5230\u56DE\u73AF\u5730\u5740</strong>\u90FD\u662F\u8D70\u8FD9\u6761\u8DEF\u5F84\u3002\u6574\u6761\u8DEF\u5F84\u4ECE\u53D1\u5230\u6536\uFF0C\u90FD\u6CA1\u6709\u7ECF\u8FC7&quot;\u771F\u7F51\u5361&quot;\u3002<strong>\u4E4B\u6240\u4EE5127.0.0.1\u53EB\u672C\u5730\u56DE\u73AF\u5730\u5740\uFF0C\u53EF\u4EE5\u7406\u89E3\u4E3A\uFF0C\u6D88\u606F\u53D1\u51FA\u5230\u8FD9\u4E2A\u5730\u5740\u4E0A\u7684\u8BDD\uFF0C\u5C31\u4E0D\u4F1A\u51FA\u7F51\u7EDC\uFF0C\u5728\u672C\u673A\u6253\u4E2A\u8F6C\u5C31\u53C8\u56DE\u6765\u4E86\u3002</strong> \u6240\u4EE5\u65AD\u7F51\uFF0C\u4F9D\u7136\u80FD <code>ping</code> \u901A <code>127.0.0.1</code>\u3002</p><h2 id="ping\u56DE\u73AF\u5730\u5740\u548Cping\u672C\u673A\u5730\u5740\u6709\u4EC0\u4E48\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#ping\u56DE\u73AF\u5730\u5740\u548Cping\u672C\u673A\u5730\u5740\u6709\u4EC0\u4E48\u533A\u522B" aria-hidden="true">#</a> ping\u56DE\u73AF\u5730\u5740\u548Cping\u672C\u673A\u5730\u5740\u6709\u4EC0\u4E48\u533A\u522B</h2><p>\u6211\u4EEC\u5728mac\u91CC\u6267\u884C <code>ifconfig</code> \u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">ifconfig</span>
lo0: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">804</span><span class="token operator"><span class="token file-descriptor important">9</span>&lt;</span>UP,LOOPBACK,RUNNING,MULTICAST<span class="token operator">&gt;</span> mtu <span class="token number">16384</span>
    inet <span class="token number">127.0</span>.0.1 netmask 0xff000000
    <span class="token punctuation">..</span>.
en0: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">886</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST<span class="token operator">&gt;</span> mtu <span class="token number">1500</span>
    inet <span class="token number">192.168</span>.31.6 netmask 0xffffff00 broadcast <span class="token number">192.168</span>.31.255
    <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u80FD\u770B\u5230 <strong>lo0</strong>\uFF0C\u8868\u793A\u672C\u5730\u56DE\u73AF\u63A5\u53E3\uFF0C\u5BF9\u5E94\u7684\u5730\u5740\uFF0C\u5C31\u662F\u6211\u4EEC\u524D\u9762\u63D0\u5230\u7684 <strong>127.0.0.1</strong> \uFF0C\u4E5F\u5C31\u662F<strong>\u56DE\u73AF\u5730\u5740</strong>\u3002</p><p>\u548C <strong>eth0</strong>\uFF0C\u8868\u793A\u672C\u673A\u7B2C\u4E00\u5757\u7F51\u5361\uFF0C\u5BF9\u5E94\u7684IP\u5730\u5740\u662F<strong>192.168.31.6</strong>\uFF0C\u7BA1\u5B83\u53EB<strong>\u672C\u673AIP</strong>\u3002</p><p>\u4E4B\u524D\u4E00\u76F4\u8BA4\u4E3Aping\u672C\u673AIP\u7684\u8BDD\u4F1A\u901A\u8FC7&quot;\u771F\u7F51\u5361&quot;\u51FA\u53BB\uFF0C\u7136\u540E\u9047\u5230\u7B2C\u4E00\u4E2A\u8DEF\u7531\u5668\uFF0C\u518D\u53D1\u56DE\u6765\u5230\u672C\u673A\u3002</p><p>\u4E3A\u4E86\u9A8C\u8BC1\u8FD9\u4E2A\u8BF4\u6CD5\uFF0C\u53EF\u4EE5\u8FDB\u884C\u6293\u5305\uFF0C\u4F46\u7ED3\u679C\u8DDF\u4E0A\u9762\u7684\u8BF4\u6CD5\u5E76\u4E0D\u76F8\u540C\u3002</p><p>ping 127.0.0.1:</p><p><img src="https://img-blog.csdnimg.cn/img_convert/bc2765b1d6d3e37a5663f98085198926.png" alt="\u56FE\u7247"></p><p>ping \u672C\u673A\u5730\u5740:</p><p><img src="https://img-blog.csdnimg.cn/img_convert/50cd584f9f82aee8d3d9bfaf7d910cb8.png" alt="\u56FE\u7247"></p><p>\u53EF\u4EE5\u770B\u5230 ping \u672C\u673AIP \u8DDF ping \u56DE\u73AF\u5730\u5740\u4E00\u6837\uFF0C\u76F8\u5173\u7684\u7F51\u7EDC\u6570\u636E\uFF0C\u90FD\u662F\u8D70\u7684 <strong>lo0</strong>\uFF0C\u672C\u5730\u56DE\u73AF\u63A5\u53E3\uFF0C\u4E5F\u5C31\u662F\u524D\u9762\u63D0\u5230\u7684**&quot;\u5047\u7F51\u5361&quot;**\u3002</p><p>\u53EA\u8981\u8D70\u4E86\u672C\u5730\u56DE\u73AF\u63A5\u53E3\uFF0C\u90A3\u6570\u636E\u90FD\u4E0D\u4F1A\u53D1\u9001\u5230\u7F51\u7EDC\u4E2D\uFF0C\u5728\u672C\u673A\u7F51\u7EDC\u534F\u8BAE\u6808\u4E2D\u515C\u4E00\u5708\uFF0C\u5C31\u53D1\u56DE\u6765\u4E86\u3002\u56E0\u6B64 <strong>ping\u56DE\u73AF\u5730\u5740\u548Cping\u672C\u673A\u5730\u5740\u6CA1\u6709\u533A\u522B</strong>\u3002</p><h2 id="_127-0-0-1-\u548C-localhost-\u4EE5\u53CA-0-0-0-0-\u6709\u533A\u522B\u5417" tabindex="-1"><a class="header-anchor" href="#_127-0-0-1-\u548C-localhost-\u4EE5\u53CA-0-0-0-0-\u6709\u533A\u522B\u5417" aria-hidden="true">#</a> 127.0.0.1 \u548C localhost \u4EE5\u53CA 0.0.0.0 \u6709\u533A\u522B\u5417</h2><p>\u56DE\u5230\u6587\u7AE0\u5F00\u5934\u52A8\u56FE\u91CC\u7684\u63D0\u95EE\uFF0C\u7B97\u662F\u9762\u8BD5\u516B\u80A1\u6587\u91CC\u7684\u8001\u5E38\u5BA2\u4E86\u3002</p><p>\u4EE5\u524D\u7B2C\u4E00\u6B21\u7528 <code>nginx</code> \u7684\u65F6\u5019\uFF0C\u53D1\u73B0\u7528\u8FD9\u51E0\u4E2A <code>IP</code>\uFF0C\u90FD\u80FD\u6B63\u5E38\u8BBF\u95EE\u5230 <code>nginx</code> \u7684\u6B22\u8FCE\u7F51\u9875\u3002\u4E00\u5EA6\u8BA4\u4E3A\u8FD9\u51E0\u4E2A <code>IP</code> \u90FD\u662F\u4E00\u6837\u7684\u3002</p><p>\u8BBF\u95EE127.0.0.1:80</p><p><img src="https://img-blog.csdnimg.cn/img_convert/12e13316a18009ce8b2983846819e270.png" alt="\u56FE\u7247"></p><p>\u8BBF\u95EElocalhost:80</p><p><img src="https://img-blog.csdnimg.cn/img_convert/2c35f573e91e94733d009384a4657859.png" alt="\u56FE\u7247"></p><p>\u8BBF\u95EE0.0.0.0:80</p><p><img src="https://img-blog.csdnimg.cn/img_convert/ba534fdc5f21b3ab26d0b8c890bb02c3.png" alt="\u56FE\u7247"></p><p>\u8BBF\u95EE\u672C\u673A\u7684IP\u5730\u5740</p><p><img src="https://img-blog.csdnimg.cn/img_convert/9b31572ced19805fab02a23b22819b92.png" alt="\u56FE\u7247"></p><p>\u4F46\u672C\u8D28\u4E0A\u8FD8\u662F\u6709\u4E9B\u533A\u522B\u7684\u3002</p><p>\u9996\u5148 <code>localhost</code> \u5C31\u4E0D\u53EB <code>IP</code>\uFF0C\u5B83\u662F\u4E00\u4E2A\u57DF\u540D\uFF0C\u5C31\u8DDF <code>&quot;baidu.com&quot;</code>,\u662F\u4E00\u4E2A\u5F62\u5F0F\u7684\u4E1C\u897F\uFF0C\u53EA\u4E0D\u8FC7\u9ED8\u8BA4\u4F1A\u628A\u5B83\u89E3\u6790\u4E3A <code>127.0.0.1</code> \uFF0C\u5F53\u7136\u8FD9\u53EF\u4EE5\u5728 <code>/etc/hosts</code> \u6587\u4EF6\u4E0B\u8FDB\u884C\u4FEE\u6539\u3002</p><p>\u6240\u4EE5\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u4F7F\u7528 <code>localhost</code> \u8DDF\u4F7F\u7528 <code>127.0.0.1</code> \u786E\u5B9E\u662F\u6CA1\u533A\u522B\u7684\u3002</p><p>\u5176\u6B21\u5C31\u662F <code>0.0.0.0</code>\uFF0C\u6267\u884C ping 0.0.0.0 \uFF0C\u662F\u4F1A\u5931\u8D25\u7684\uFF0C\u56E0\u4E3A\u5B83\u5728<code>IPV4</code>\u4E2D\u8868\u793A\u7684\u662F\u65E0\u6548\u7684<strong>\u76EE\u6807\u5730\u5740</strong>\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">ping</span> <span class="token number">0.0</span>.0.0
PING <span class="token number">0.0</span>.0.0 <span class="token punctuation">(</span><span class="token number">0.0</span>.0.0<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
ping: sendto: No route to <span class="token function">host</span>
ping: sendto: No route to <span class="token function">host</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F46\u5B83\u8FD8\u662F\u5F88\u6709\u7528\u5904\u7684\uFF0C\u56DE\u60F3\u4E0B\uFF0C\u6211\u4EEC\u542F\u52A8\u670D\u52A1\u5668\u7684\u65F6\u5019\uFF0C\u4E00\u822C\u4F1A <code>listen</code> \u4E00\u4E2A IP \u548C\u7AEF\u53E3\uFF0C\u7B49\u5F85\u5BA2\u6237\u7AEF\u7684\u8FDE\u63A5\u3002</p><p>\u5982\u679C\u6B64\u65F6 <code>listen</code> \u7684\u662F\u672C\u673A\u7684 <code>0.0.0.0</code> , \u90A3\u4E48\u5B83\u8868\u793A\u672C\u673A\u4E0A\u7684<strong>\u6240\u6709IPV4\u5730\u5740</strong>\u3002</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/* Address to accept any incoming messages. */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span>    <span class="token macro-name">INADDR_ANY</span>      <span class="token expression"><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token number">0x00000000</span><span class="token punctuation">)</span> </span><span class="token comment">/* 0.0.0.0   */</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E3E\u4E2A\u4F8B\u5B50\u3002\u521A\u521A\u63D0\u5230\u7684 <code>127.0.0.1</code> \u548C <code>192.168.31.6</code> \uFF0C\u90FD\u662F\u672C\u673A\u7684IPV4\u5730\u5740\uFF0C\u5982\u679C\u76D1\u542C <code>0.0.0.0</code> \uFF0C\u90A3\u4E48\u7528\u4E0A\u9762\u4E24\u4E2A\u5730\u5740\uFF0C\u90FD\u80FD\u8BBF\u95EE\u5230\u8FD9\u4E2A\u670D\u52A1\u5668\u3002</p><p>\u5F53\u7136\uFF0C \u5BA2\u6237\u7AEF <code>connect</code> \u65F6\uFF0C\u4E0D\u80FD\u4F7F\u7528 <code>0.0.0.0</code> \u3002\u5FC5\u987B\u6307\u660E\u8981\u8FDE\u63A5\u54EA\u4E2A\u670D\u52A1\u5668IP\u3002</p><h2 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h2><ul><li><code>127.0.0.1</code> \u662F<strong>\u56DE\u73AF\u5730\u5740</strong>\u3002<code>localhost</code>\u662F<strong>\u57DF\u540D</strong>\uFF0C\u4F46\u9ED8\u8BA4\u7B49\u4E8E <code>127.0.0.1</code>\u3002</li><li><code>ping</code> \u56DE\u73AF\u5730\u5740\u548C <code>ping</code> \u672C\u673A\u5730\u5740\uFF0C\u662F\u4E00\u6837\u7684\uFF0C\u8D70\u7684\u662F<strong>lo0 &quot;\u5047\u7F51\u5361&quot;</strong>\uFF0C\u90FD\u4F1A\u7ECF\u8FC7\u7F51\u7EDC\u5C42\u548C\u6570\u636E\u94FE\u8DEF\u5C42\u7B49\u903B\u8F91\uFF0C\u6700\u540E\u5728\u5FEB\u8981\u51FA\u7F51\u5361\u524D<strong>\u72E0\u72E0\u62D0\u4E86\u4E2A\u5F2F</strong>\uFF0C \u5C06\u6570\u636E\u63D2\u5165\u5230\u4E00\u4E2A<strong>\u94FE\u8868</strong>\u540E\u5C31<strong>\u8F6F\u4E2D\u65AD</strong>\u901A\u77E5 <strong>ksoftirqd</strong> \u6765\u8FDB\u884C<strong>\u6536\u6570\u636E</strong>\u7684\u903B\u8F91\uFF0C<strong>\u538B\u6839\u5C31\u4E0D\u51FA\u7F51\u7EDC</strong>\u3002\u6240\u4EE5\u65AD\u7F51\u4E86\u4E5F\u80FD <code>ping</code> \u901A\u56DE\u73AF\u5730\u5740\u3002</li><li>\u5982\u679C\u670D\u52A1\u5668 <code>listen</code> \u7684\u662F <code>0.0.0.0</code>\uFF0C\u90A3\u4E48\u6B64\u65F6\u7528<code>127.0.0.1</code>\u548C\u672C\u673A\u5730\u5740<strong>\u90FD\u53EF\u4EE5</strong>\u8BBF\u95EE\u5230\u670D\u52A1\u3002</li></ul><hr>`,101),t=[p];function c(r,i){return n(),e("div",null,t)}const g=s(o,[["render",c],["__file","ip-ping_io.html.vue"]]);export{g as default};
