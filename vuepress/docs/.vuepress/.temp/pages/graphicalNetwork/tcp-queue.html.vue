<template><div><h1 id="tcp-半连接队列和全连接队列" tabindex="-1"><a class="header-anchor" href="#tcp-半连接队列和全连接队列" aria-hidden="true">#</a> TCP 半连接队列和全连接队列</h1>
<p>网上许多博客针对增大 TCP 半连接队列和全连接队列的方式如下：</p>
<ul>
<li>增大 TCP 半连接队列的方式是增大 /proc/sys/net/ipv4/tcp_max_syn_backlog；</li>
<li>增大 TCP 全连接队列的方式是增大 listen() 函数中的 backlog；</li>
</ul>
<p>这里先跟大家说下，<strong>上面的方式都是不准确的。</strong></p>
<blockquote>
<p>“你怎么知道不准确？”</p>
</blockquote>
<p>很简单呀，因为我做了实验和看了 TCP 协议栈的内核源码，发现要增大这两个队列长度，不是简简单单增大某一个参数就可以的。</p>
<p>接下来，就会以<strong>实战 + 源码分析，带大家解密 TCP 半连接队列和全连接队列。</strong></p>
<blockquote>
<p>“源码分析，那不是劝退吗？我们搞 Java 的看不懂呀”</p>
</blockquote>
<p>放心，本文的源码分析不会涉及很深的知识，因为都被我删减了，你只需要会条件判断语句 if、左移右移操作符、加减法等基本语法，就可以看懂。</p>
<p>另外，不仅有源码分析，还会介绍 Linux 排查半连接队列和全连接队列的命令。</p>
<blockquote>
<p>“哦？似乎很有看头，那我姑且看一下吧！”</p>
</blockquote>
<p>行，没有被劝退的小伙伴，值得鼓励，下面这图是本文的提纲：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/2.jpg" alt="本文提纲"></p>
<hr>
<h2 id="什么是-tcp-半连接队列和全连接队列" tabindex="-1"><a class="header-anchor" href="#什么是-tcp-半连接队列和全连接队列" aria-hidden="true">#</a> 什么是 TCP 半连接队列和全连接队列？</h2>
<p>在 TCP 三次握手的时候，Linux 内核会维护两个队列，分别是：</p>
<ul>
<li>半连接队列，也称 SYN 队列；</li>
<li>全连接队列，也称 accept 队列；</li>
</ul>
<p>服务端收到客户端发起的 SYN 请求后，<strong>内核会把该连接存储到半连接队列</strong>，并向客户端响应 SYN+ACK，接着客户端会返回 ACK，服务端收到第三次握手的 ACK 后，<strong>内核会把连接从半连接队列移除，然后创建新的完全的连接，并将其添加到 accept 队列，等待进程调用 accept 函数时把连接取出来。</strong></p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/3.jpg" alt="半连接队列与全连接队列"></p>
<p>不管是半连接队列还是全连接队列，都有最大长度限制，超过限制时，内核会直接丢弃，或返回 RST 包。</p>
<hr>
<h2 id="实战-tcp-全连接队列溢出" tabindex="-1"><a class="header-anchor" href="#实战-tcp-全连接队列溢出" aria-hidden="true">#</a> 实战 - TCP 全连接队列溢出</h2>
<blockquote>
<p>如何知道应用程序的 TCP 全连接队列大小？</p>
</blockquote>
<p>在服务端可以使用 <code v-pre>ss</code> 命令，来查看 TCP 全连接队列的情况：</p>
<p>但需要注意的是 <code v-pre>ss</code> 命令获取的 <code v-pre>Recv-Q/Send-Q</code> 在「LISTEN 状态」和「非 LISTEN 状态」所表达的含义是不同的。从下面的内核代码可以看出区别：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/4.jpg" alt=""></p>
<p>在「LISTEN 状态」时，<code v-pre>Recv-Q/Send-Q</code> 表示的含义如下：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/5.jpg" alt=""></p>
<ul>
<li>Recv-Q：当前全连接队列的大小，也就是当前已完成三次握手并等待服务端 <code v-pre>accept()</code> 的 TCP 连接；</li>
<li>Send-Q：当前全连接最大队列长度，上面的输出结果说明监听 8088 端口的 TCP 服务，最大全连接长度为 128；</li>
</ul>
<p>在「非 LISTEN 状态」时，<code v-pre>Recv-Q/Send-Q</code> 表示的含义如下：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/6.jpg" alt=""></p>
<ul>
<li>Recv-Q：已收到但未被应用进程读取的字节数；</li>
<li>Send-Q：已发送但未收到确认的字节数；</li>
</ul>
<blockquote>
<p>如何模拟 TCP 全连接队列溢出的场景？</p>
</blockquote>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/7.jpg" alt="测试环境"></p>
<p>实验环境：</p>
<ul>
<li>客户端和服务端都是 CentOs 6.5 ，Linux 内核版本 2.6.32</li>
<li>服务端 IP 192.168.3.200，客户端 IP 192.168.3.100</li>
<li>服务端是 Nginx 服务，端口为 8088</li>
</ul>
<p>这里先介绍下 <code v-pre>wrk</code> 工具，它是一款简单的 HTTP 压测工具，它能够在单机多核 CPU 的条件下，使用系统自带的高性能 I/O 机制，通过多线程和事件模式，对目标机器产生大量的负载。</p>
<p>本次模拟实验就使用 <code v-pre>wrk</code> 工具来压力测试服务端，发起大量的请求，一起看看服务端 TCP 全连接队列满了会发生什么？有什么观察指标？</p>
<p>客户端执行 <code v-pre>wrk</code> 命令对服务端发起压力测试，并发 3 万个连接：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/8.jpg" alt=""></p>
<p>在服务端可以使用 <code v-pre>ss</code> 命令，来查看当前 TCP 全连接队列的情况：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/9.jpg" alt=""></p>
<p>其间共执行了两次 ss 命令，从上面的输出结果，可以发现当前 TCP 全连接队列上升到了 129 大小，超过了最大 TCP 全连接队列。</p>
<p><strong>当超过了 TCP 最大全连接队列，服务端则会丢掉后续进来的 TCP 连接</strong>，丢掉的 TCP 连接的个数会被统计起来，我们可以使用 netstat -s 命令来查看：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/10.jpg" alt=""></p>
<p>上面看到的 41150 times ，表示全连接队列溢出的次数，注意这个是累计值。可以隔几秒钟执行下，如果这个数字一直在增加的话肯定全连接队列偶尔满了。</p>
<p>从上面的模拟结果，可以得知，<strong>当服务端并发处理大量请求时，如果 TCP 全连接队列过小，就容易溢出。发生 TCP 全连接队溢出的时候，后续的请求就会被丢弃，这样就会出现服务端请求数量上不去的现象。</strong></p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/11.jpg" alt="全连接队列溢出"></p>
<blockquote>
<p>Linux 有个参数可以指定当 TCP 全连接队列满了会使用什么策略来回应客户端。</p>
</blockquote>
<p>实际上，丢弃连接只是 Linux 的默认行为，我们还可以选择向客户端发送 RST 复位报文，告诉客户端连接已经建立失败。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/12.jpg" alt=""></p>
<p>tcp_abort_on_overflow 共有两个值分别是 0 和 1，其分别表示：</p>
<ul>
<li>0 ：如果全连接队列满了，那么 server 扔掉 client  发过来的 ack ；</li>
<li>1 ：如果全连接队列满了，server 发送一个 <code v-pre>reset</code> 包给 client，表示废掉这个握手过程和这个连接；</li>
</ul>
<p>如果要想知道客户端连接不上服务端，是不是服务端 TCP 全连接队列满的原因，那么可以把 tcp_abort_on_overflow 设置为 1，这时如果在客户端异常中可以看到很多 <code v-pre>connection reset by peer</code> 的错误，那么就可以证明是由于服务端 TCP 全连接队列溢出的问题。</p>
<p>通常情况下，应当把 tcp_abort_on_overflow 设置为 0，因为这样更有利于应对突发流量。</p>
<p>举个例子，当 TCP 全连接队列满导致服务器丢掉了 ACK，与此同时，客户端的连接状态却是 ESTABLISHED，进程就在建立好的连接上发送请求。只要服务器没有为请求回复 ACK，请求就会被多次<strong>重发</strong>。如果服务器上的进程只是<strong>短暂的繁忙造成 accept 队列满，那么当 TCP 全连接队列有空位时，再次接收到的请求报文由于含有 ACK，仍然会触发服务器端成功建立连接。</strong></p>
<p>所以，tcp_abort_on_overflow 设为 0 可以提高连接建立的成功率，只有你非常肯定 TCP 全连接队列会长期溢出时，才能设置为 1 以尽快通知客户端。</p>
<blockquote>
<p>如何增大 TCP 全连接队列呢？</p>
</blockquote>
<p>是的，当发现 TCP 全连接队列发生溢出的时候，我们就需要增大该队列的大小，以便可以应对客户端大量的请求。</p>
<p><strong>TCP 全连接队列的最大值取决于 somaxconn 和 backlog 之间的最小值，也就是 min(somaxconn, backlog)</strong>。从下面的 Linux 内核代码可以得知：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/13.jpg" alt=""></p>
<ul>
<li><code v-pre>somaxconn</code> 是 Linux 内核的参数，默认值是 128，可以通过 <code v-pre> /proc/sys/net/core/somaxconn</code> 来设置其值；</li>
<li><code v-pre>backlog</code> 是 <code v-pre>listen(int sockfd, int backlog)</code> 函数中的 backlog 大小，Nginx 默认值是 511，可以通过修改配置文件设置其长度；</li>
</ul>
<p>前面模拟测试中，我的测试环境：</p>
<ul>
<li>somaxconn 是默认值 128；</li>
<li>Nginx 的 backlog 是默认值 511</li>
</ul>
<p>所以测试环境的 TCP 全连接队列最大值为 min(128, 511)，也就是 <code v-pre>128</code>，可以执行 <code v-pre>ss</code> 命令查看：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/14.jpg" alt=""></p>
<p>现在我们重新压测，把 TCP 全连接队列<strong>搞大</strong>，把 <code v-pre>somaxconn</code> 设置成 5000：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/15.jpg" alt=""></p>
<p>接着把 Nginx 的 backlog 也同样设置成 5000：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/16.jpg" alt=""></p>
<p>最后要重启 Nginx 服务，因为只有重新调用 <code v-pre>listen()</code> 函数 TCP 全连接队列才会重新初始化。</p>
<p>重启完后 Nginx 服务后，服务端执行 ss 命令，查看 TCP 全连接队列大小：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/17.jpg" alt=""></p>
<p>从执行结果，可以发现 TCP 全连接最大值为 5000。</p>
<blockquote>
<p>增大 TCP 全连接队列后，继续压测</p>
</blockquote>
<p>客户端同样以 3 万个连接并发发送请求给服务端：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/18.jpg" alt=""></p>
<p>服务端执行 <code v-pre>ss</code> 命令，查看 TCP 全连接队列使用情况：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/19.jpg" alt=""></p>
<p>从上面的执行结果，可以发现全连接队列使用增长的很快，但是一直都没有超过最大值，所以就不会溢出，那么 <code v-pre>netstat -s</code> 就不会有 TCP 全连接队列溢出个数的显示：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/20.jpg" alt=""></p>
<p>说明 TCP 全连接队列最大值从 128 增大到 5000 后，服务端抗住了 3 万连接并发请求，也没有发生全连接队列溢出的现象了。</p>
<p><strong>如果持续不断地有连接因为 TCP 全连接队列溢出被丢弃，就应该调大 backlog 以及 somaxconn 参数。</strong></p>
<hr>
<h2 id="实战-tcp-半连接队列溢出" tabindex="-1"><a class="header-anchor" href="#实战-tcp-半连接队列溢出" aria-hidden="true">#</a> 实战 - TCP 半连接队列溢出</h2>
<blockquote>
<p>如何查看 TCP 半连接队列长度？</p>
</blockquote>
<p>很遗憾，TCP 半连接队列长度的长度，没有像全连接队列那样可以用 ss 命令查看。</p>
<p>但是我们可以抓住 TCP 半连接的特点，就是服务端处于 <code v-pre>SYN_RECV</code> 状态的 TCP 连接，就是 TCP 半连接队列。</p>
<p>于是，我们可以使用如下命令计算当前 TCP 半连接队列长度：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/21.jpg" alt=""></p>
<blockquote>
<p>如何模拟 TCP 半连接队列溢出场景？</p>
</blockquote>
<p>模拟 TCP 半连接溢出场景不难，实际上就是对服务端一直发送 TCP SYN 包，但是不回第三次握手 ACK，这样就会使得服务端有大量的处于 <code v-pre>SYN_RECV</code> 状态的 TCP 连接。</p>
<p>这其实也就是所谓的 SYN 洪泛、SYN 攻击、DDos 攻击。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/22.jpg" alt="测试环境"></p>
<p>实验环境：</p>
<ul>
<li>客户端和服务端都是 CentOs 6.5 ，Linux 内核版本 2.6.32</li>
<li>服务端 IP 192.168.3.200，客户端 IP 192.168.3.100</li>
<li>服务端是 Nginx 服务，端口为 8088</li>
</ul>
<p>注意：本次模拟实验是没有开启 tcp_syncookies，关于 tcp_syncookies 的作用，后续会说明。</p>
<p>本次实验使用 <code v-pre>hping3</code> 工具模拟 SYN 攻击：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/23.jpg" alt=""></p>
<p>当服务端受到 SYN 攻击后，连接服务端 ssh 就会断开了，无法再连上。只能在服务端主机上执行查看当前 TCP 半连接队列大小：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/24.jpg" alt=""></p>
<p>同时，还可以通过 netstat -s 观察半连接队列溢出的情况：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/25.jpg" alt=""></p>
<p>上面输出的数值是<strong>累计值</strong>，表示共有多少个 TCP 连接因为半连接队列溢出而被丢弃。<strong>隔几秒执行几次，如果有上升的趋势，说明当前存在半连接队列溢出的现象</strong>。</p>
<blockquote>
<p>大部分人都说 tcp_max_syn_backlog 是指定半连接队列的大小，是真的吗？</p>
</blockquote>
<p>很遗憾，半连接队列的大小并不单单只跟 <code v-pre>tcp_max_syn_backlog</code> 有关系。</p>
<p>上面模拟 SYN 攻击场景时，服务端的 tcp_max_syn_backlog 的默认值如下：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/26.jpg" alt=""></p>
<p>但是在测试的时候发现，服务端最多只有 256 个半连接队列，而不是 512，所以<strong>半连接队列的最大长度不一定由 tcp_max_syn_backlog 值决定的</strong>。</p>
<blockquote>
<p>接下来，走进 Linux 内核的源码，来分析 TCP 半连接队列的最大值是如何决定的。</p>
</blockquote>
<p>TCP 第一次握手（收到 SYN 包）的 Linux 内核代码如下，其中缩减了大量的代码，只需要重点关注 TCP 半连接队列溢出的处理逻辑：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/27.jpg" alt=""></p>
<p>从源码中，我可以得出共有三个条件因队列长度的关系而被丢弃的：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/28.jpg" alt=""></p>
<ol>
<li><strong>如果半连接队列满了，并且没有开启 tcp_syncookies，则会丢弃；</strong></li>
<li><strong>若全连接队列满了，且没有重传 SYN+ACK 包的连接请求多于 1 个，则会丢弃；</strong></li>
<li><strong>如果没有开启 tcp_syncookies，并且 max_syn_backlog 减去 当前半连接队列长度小于 (max_syn_backlog &gt;&gt; 2)，则会丢弃；</strong></li>
</ol>
<p>关于 tcp_syncookies 的设置，后面在详细说明，可以先给大家说一下，开启 tcp_syncookies 是缓解 SYN 攻击其中一个手段。</p>
<p>接下来，我们继续跟一下检测半连接队列是否满的函数 inet_csk_reqsk_queue_is_full 和 检测全连接队列是否满的函数 sk_acceptq_is_full ：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/29.jpg" alt=""></p>
<p>从上面源码，可以得知：</p>
<ul>
<li><strong>全</strong>连接队列的最大值是 <code v-pre>sk_max_ack_backlog</code> 变量，sk_max_ack_backlog 实际上是在 listen() 源码里指定的，也就是 <strong>min(somaxconn, backlog)</strong>；</li>
<li><strong>半</strong>连接队列的最大值是 <code v-pre>max_qlen_log</code> 变量，max_qlen_log 是在哪指定的呢？现在暂时还不知道，我们继续跟进；</li>
</ul>
<p>我们继续跟进代码，看一下是哪里初始化了半连接队列的最大值 max_qlen_log：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/30.jpg" alt=""></p>
<p>从上面的代码中，我们可以算出 max_qlen_log 是 8，于是代入到 检测半连接队列是否满的函数 reqsk_queue_is_full ：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/31.jpg" alt=""></p>
<p>也就是 <code v-pre>qlen &gt;&gt; 8</code> 什么时候为 1 就代表半连接队列满了。这计算这不难，很明显是当 qlen 为 256 时，<code v-pre>256 &gt;&gt; 8 = 1</code>。</p>
<p>至此，总算知道为什么上面模拟测试 SYN 攻击的时候，服务端处于 <code v-pre>SYN_RECV</code> 连接最大只有 256 个。</p>
<p>可见，<strong>半连接队列最大值不是单单由 max_syn_backlog 决定，还跟 somaxconn 和 backlog 有关系。</strong></p>
<p>在 Linux 2.6.32 内核版本，它们之间的关系，总体可以概况为：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/32.jpg" alt=""></p>
<ul>
<li>当 max_syn_backlog &gt; min(somaxconn, backlog) 时， 半连接队列最大值 max_qlen_log = min(somaxconn, backlog) * 2;</li>
<li>当 max_syn_backlog &lt; min(somaxconn, backlog) 时， 半连接队列最大值 max_qlen_log = max_syn_backlog * 2;</li>
</ul>
<blockquote>
<p>半连接队列最大值 max_qlen_log 就表示服务端处于 SYN_RECV 状态的最大个数吗？</p>
</blockquote>
<p>依然很遗憾，并不是。</p>
<p>max_qlen_log 是<strong>理论</strong>半连接队列最大值，并不一定代表服务端处于 SYN_RECV 状态的最大个数。</p>
<p>在前面我们在分析 TCP 第一次握手（收到 SYN 包）时会被丢弃的三种条件：</p>
<ol>
<li>如果半连接队列满了，并且没有开启 tcp_syncookies，则会丢弃；</li>
<li>若全连接队列满了，且没有重传 SYN+ACK 包的连接请求多于 1 个，则会丢弃；</li>
<li><strong>如果没有开启 tcp_syncookies，并且 max_syn_backlog 减去 当前半连接队列长度小于 (max_syn_backlog &gt;&gt; 2)，则会丢弃；</strong></li>
</ol>
<p>假设条件 1 当前半连接队列的长度 「没有超过」理论的半连接队列最大值  max_qlen_log，那么如果条件 3 成立，则依然会丢弃 SYN 包，也就会使得服务端处于 SYN_RECV 状态的最大个数不会是理论值 max_qlen_log。</p>
<p>似乎很难理解，我们继续接着做实验，实验见真知。</p>
<p>服务端环境如下：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/33.jpg" alt=""></p>
<p>配置完后，服务端要重启 Nginx，因为全连接队列最大值和半连接队列最大值是在 listen() 函数初始化。</p>
<p>根据前面的源码分析，我们可以计算出半连接队列 max_qlen_log 的最大值为 256：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/34.jpg" alt=""></p>
<p>客户端执行 hping3 发起 SYN 攻击：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/35.jpg" alt=""></p>
<p>服务端执行如下命令，查看处于 SYN_RECV 状态的最大个数：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/36.jpg" alt=""></p>
<p>可以发现，服务端处于 SYN_RECV 状态的最大个数并不是 max_qlen_log 变量的值。</p>
<p>这就是前面所说的原因：<strong>如果当前半连接队列的长度 「没有超过」理论半连接队列最大值  max_qlen_log，那么如果条件 3 成立，则依然会丢弃 SYN 包，也就会使得服务端处于 SYN_RECV 状态的最大个数不会是理论值 max_qlen_log。</strong></p>
<p>我们来分析一波条件 3 :</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/37.jpg" alt=""></p>
<p>从上面的分析，可以得知如果触发「当前半连接队列长度 &gt; 192」条件，TCP 第一次握手的 SYN 包是会被丢弃的。</p>
<p>在前面我们测试的结果，服务端处于 SYN_RECV 状态的最大个数是 193，正好是触发了条件 3，所以处于 SYN_RECV 状态的个数还没到「理论半连接队列最大值 256」，就已经把 SYN 包丢弃了。</p>
<p>所以，服务端处于 SYN_RECV 状态的最大个数分为如下两种情况：</p>
<ul>
<li>如果「当前半连接队列」<strong>没超过</strong>「理论半连接队列最大值」，但是<strong>超过</strong> max_syn_backlog  - (max_syn_backlog &gt;&gt; 2)，那么处于 SYN_RECV 状态的最大个数就是 max_syn_backlog  - (max_syn_backlog &gt;&gt; 2)；</li>
<li>如果「当前半连接队列」<strong>超过</strong>「理论半连接队列最大值」，那么处于 SYN_RECV 状态的最大个数就是「理论半连接队列最大值」；</li>
</ul>
<blockquote>
<p>每个 Linux 内核版本「理论」半连接最大值计算方式会不同。</p>
</blockquote>
<p>在上面我们是针对 Linux 2.6.32 版本分析的「理论」半连接最大值的算法，可能每个版本有些不同。</p>
<p>比如在 Linux 5.0.0 的时候，「理论」半连接最大值就是全连接队列最大值，但依然还是有队列溢出的三个条件：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/38.jpg" alt=""></p>
<blockquote>
<p>如果 SYN 半连接队列已满，只能丢弃连接吗？</p>
</blockquote>
<p>并不是这样，<strong>开启 syncookies 功能就可以在不使用 SYN 半连接队列的情况下成功建立连接</strong>，在前面我们源码分析也可以看到这点，当开启了  syncookies 功能就不会丢弃连接。</p>
<p>syncookies 是这么做的：服务器根据当前状态计算出一个值，放在己方发出的 SYN+ACK 报文中发出，当客户端返回 ACK 报文时，取出该值验证，如果合法，就认为连接建立成功，如下图所示。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/39.jpg" alt="开启 syncookies 功能"></p>
<p>syncookies 参数主要有以下三个值：</p>
<ul>
<li>0 值，表示关闭该功能；</li>
<li>1 值，表示仅当 SYN 半连接队列放不下时，再启用它；</li>
<li>2 值，表示无条件开启功能；</li>
</ul>
<p>那么在应对 SYN 攻击时，只需要设置为 1 即可：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/40.jpg" alt=""></p>
<blockquote>
<p>如何防御 SYN 攻击？</p>
</blockquote>
<p>这里给出几种防御 SYN 攻击的方法：</p>
<ul>
<li>增大半连接队列；</li>
<li>开启 tcp_syncookies 功能</li>
<li>减少 SYN+ACK 重传次数</li>
</ul>
<p><em>方式一：增大半连接队列</em></p>
<p>在前面源码和实验中，得知<strong>要想增大半连接队列，我们得知不能只单纯增大 tcp_max_syn_backlog 的值，还需一同增大 somaxconn 和 backlog，也就是增大全连接队列</strong>。否则，只单纯增大 tcp_max_syn_backlog 是无效的。</p>
<p>增大 tcp_max_syn_backlog 和 somaxconn 的方法是修改 Linux 内核参数：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/41.jpg" alt=""></p>
<p>增大 backlog 的方式，每个 Web 服务都不同，比如 Nginx 增大 backlog 的方法如下：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/42.jpg" alt=""></p>
<p>最后，改变了如上这些参数后，要重启 Nginx 服务，因为半连接队列和全连接队列都是在 listen() 初始化的。</p>
<p><em>方式二：开启 tcp_syncookies 功能</em></p>
<p>开启 tcp_syncookies 功能的方式也很简单，修改 Linux 内核参数：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/43.jpg" alt=""></p>
<p><em>方式三：减少 SYN+ACK 重传次数</em></p>
<p>当服务端受到 SYN 攻击时，就会有大量处于 SYN_RECV 状态的 TCP 连接，处于这个状态的 TCP 会重传 SYN+ACK ，当重传超过次数达到上限后，就会断开连接。</p>
<p>那么针对 SYN 攻击的场景，我们可以减少 SYN+ACK 的重传次数，以加快处于 SYN_RECV 状态的 TCP 连接断开。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/TCP-半连接和全连接/44.jpg" alt=""></p>
<hr>
<p>参考资料：</p>
<p>[1] 系统性能调优必知必会.陶辉.极客时间.</p>
<p>[2] https://www.cnblogs.com/zengkefu/p/5606696.html</p>
<p>[3] https://blog.cloudflare.com/syn-packet-handling-in-the-wild/</p>
<hr>
<h2 id="读者问答" tabindex="-1"><a class="header-anchor" href="#读者问答" aria-hidden="true">#</a> 读者问答</h2>
<blockquote>
<p>读者问：“咦 我比较好奇博主都是从哪里学到这些知识的呀？书籍？视频？还是多种参考资料”</p>
</blockquote>
<p>你可以看我的参考文献呀，知识点我主要是在极客专栏学的，实战模拟实验和源码解析是自己瞎折腾出来的。</p>
<blockquote>
<p>读者问：“syncookies 启用后就不需要半链接了？那请求的数据会存在哪里？”</p>
</blockquote>
<p>syncookies = 1 时，半连接队列满后，后续的请求就不会存放到半连接队列了，而是在第二次握手的时候，服务端会计算一个 cookie 值，放入到 SYN +ACK 包中的序列号发给客户端，客户端收到后并回 ack ，服务端就会校验连接是否合法，合法就直接把连接放入到全连接队列。</p>
<hr>
<h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h2>
<p>本文是以 Linux 2.6.32 版本的内核用实验 + 源码的方式，给大家说明了 TCP 半连接队列和全连接队列，我们可以看到 TCP 半连接队列「并不是」如网上说的那样 tcp_max_syn_backlog 表示半连接队列。</p>
<p>TCP 半连接队列的大小对于不同的 Linux 内核版本会有不同的计算方式，所以并不要求大家要死记住本文计算 TCP 半连接队列的大小。</p>
<p>重要的是要学会自我源码分析，这样不管碰到什么版本的 Linux 内核，都不再怕了。</p>
<p>网上搜索出来的信息，并不一定针对你的系统，通过自我分析一波，你会更了解你当前使用的 Linux 内核版本！</p>
</div></template>


