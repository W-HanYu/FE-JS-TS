<template><div><h1 id="http-2-牛逼在哪" tabindex="-1"><a class="header-anchor" href="#http-2-牛逼在哪" aria-hidden="true">#</a> HTTP/2 牛逼在哪？</h1>
<p>不多 BB 了，直接发车！</p>
<p><strong>一起来看看 HTTP/2 牛逼在哪？</strong></p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/http2提纲.png" alt=""></p>
<hr>
<h2 id="http-1-1-协议的性能问题" tabindex="-1"><a class="header-anchor" href="#http-1-1-协议的性能问题" aria-hidden="true">#</a> HTTP/1.1 协议的性能问题</h2>
<p>我们得先要了解下 HTTP/1.1 协议存在的性能问题，因为 HTTP/2 协议就是把这些性能问题逐个攻破了。</p>
<p>现在的站点相比以前变化太多了，比如：</p>
<ul>
<li><em>消息的大小变大了</em>，从几 KB 大小的消息，到几 MB 大小的消息；</li>
<li><em>页面资源变多了</em>，从每个页面不到 10 个的资源，到每页超 100 多个资源；</li>
<li><em>内容形式变多样了</em>，从单纯到文本内容，到图片、视频、音频等内容；</li>
<li><em>实时性要求变高了</em>，对页面的实时性要求的应用越来越多；</li>
</ul>
<p>这些变化带来的最大性能问题就是 <strong>HTTP/1.1 的高延迟</strong>，延迟高必然影响的就是用户体验。主要原因如下几个：</p>
<ul>
<li><em>延迟难以下降</em>，虽然现在网络的「带宽」相比以前变多了，但是延迟降到一定幅度后，就很难再下降了，说白了就是到达了延迟的下限；</li>
<li><em>并发连接有限</em>，谷歌浏览器最大并发连接数是 6 个，而且每一个连接都要经过 TCP 和 TLS 握手耗时，以及 TCP 慢启动过程给流量带来的影响；</li>
<li><em>队头阻塞问题</em>，同一连接只能在完成一个 HTTP 事务（请求和响应）后，才能处理下一个事务；</li>
<li><em>HTTP 头部巨大且重复</em>，由于 HTTP 协议是无状态的，每一个请求都得携带 HTTP 头部，特别是对于有携带 Cookie 的头部，而 Cookie 的大小通常很大；</li>
<li><em>不支持服务器推送消息</em>，因此当客户端需要获取通知时，只能通过定时器不断地拉取消息，这无疑浪费大量了带宽和服务器资源。</li>
</ul>
<p>为了解决 HTTP/1.1 性能问题，具体的优化手段你可以看这篇文章「<a href="https://xiaolincoding.com/network/2_http/http_optimize.html" target="_blank" rel="noopener noreferrer">HTTP/1.1 如何优化？<ExternalLinkIcon/></a>」，这里我举例几个常见的优化手段：</p>
<ul>
<li>将多张小图合并成一张大图供浏览器 JavaScript 来切割使用，这样可以将多个请求合并成一个请求，但是带来了新的问题，当某张小图片更新了，那么需要重新请求大图片，浪费了大量的网络带宽；</li>
<li>将图片的二进制数据通过 Base64 编码后，把编码数据嵌入到 HTML 或 CSS 文件中，以此来减少网络请求次数；</li>
<li>将多个体积较小的 JavaScript 文件使用 Webpack 等工具打包成一个体积更大的 JavaScript 文件，以一个请求替代了很多个请求，但是带来的问题，当某个 js 文件变化了，需要重新请求同一个包里的所有 js 文件；</li>
<li>将同一个页面的资源分散到不同域名，提升并发连接上限，因为浏览器通常对同一域名的 HTTP 连接最大只能是 6 个；</li>
</ul>
<p>尽管对 HTTP/1.1 协议的优化手段如此之多，但是效果还是不尽人意，因为这些手段都是对 HTTP/1.1 协议的“外部”做优化，<strong>而一些关键的地方是没办法优化的，比如请求-响应模型、头部巨大且重复、并发连接耗时、服务器不能主动推送等，要改变这些必须重新设计 HTTP 协议，于是 HTTP/2 就出来了！</strong></p>
<hr>
<h2 id="兼容-http-1-1" tabindex="-1"><a class="header-anchor" href="#兼容-http-1-1" aria-hidden="true">#</a> 兼容 HTTP/1.1</h2>
<p>HTTP/2 出来的目的是为了改善 HTTP 的性能。协议升级有一个很重要的地方，就是要<strong>兼容</strong>老版本的协议，否则新协议推广起来就相当困难，所幸 HTTP/2 做到了兼容 HTTP/1.1。</p>
<p>那么，HTTP/2 是怎么做的呢？</p>
<p>第一点，HTTP/2 没有在 URI 里引入新的协议名，仍然用「http://」表示明文协议，用「https://」表示加密协议，于是只需要浏览器和服务器在背后自动升级协议，这样可以让用户意识不到协议的升级，很好的实现了协议的平滑升级。</p>
<p>第二点，只在应用层做了改变，还是基于 TCP 协议传输，应用层方面为了保持功能上的兼容，HTTP/2 把 HTTP 分解成了「语义」和「语法」两个部分，「语义」层不做改动，与 HTTP/1.1 完全一致，比如请求方法、状态码、头字段等规则保留不变。</p>
<p>但是，HTTP/2 在「语法」层面做了很多改造，基本改变了 HTTP 报文的传输格式。</p>
<h2 id="头部压缩" tabindex="-1"><a class="header-anchor" href="#头部压缩" aria-hidden="true">#</a> 头部压缩</h2>
<p>HTTP 协议的报文是由「Header + Body」构成的，对于 Body 部分，HTTP/1.1 协议可以使用头字段 「Content-Encoding」指定 Body 的压缩方式，比如用 gzip 压缩，这样可以节约带宽，但报文中的另外一部分 Header，是没有针对它的优化手段。</p>
<p>HTTP/1.1 报文中 Header 部分存在的问题：</p>
<ul>
<li>含很多固定的字段，比如 Cookie、User Agent、Accept 等，这些字段加起来也高达几百字节甚至上千字节，所以有必要<strong>压缩</strong>；</li>
<li>大量的请求和响应的报文里有很多字段值都是重复的，这样会使得大量带宽被这些冗余的数据占用了，所以有必须要<strong>避免重复性</strong>；</li>
<li>字段是 ASCII 编码的，虽然易于人类观察，但效率低，所以有必要改成<strong>二进制编码</strong>；</li>
</ul>
<p>HTTP/2 对 Header 部分做了大改造，把以上的问题都解决了。</p>
<p>HTTP/2 没使用常见的 gzip 压缩方式来压缩头部，而是开发了 <strong>HPACK</strong> 算法，HPACK 算法主要包含三个组成部分：</p>
<ul>
<li>静态字典；</li>
<li>动态字典；</li>
<li>Huffman 编码（压缩算法）；</li>
</ul>
<p>客户端和服务器两端都会建立和维护「<strong>字典</strong>」，用长度较小的索引号表示重复的字符串，再用 Huffman 编码压缩数据，<strong>可达到 50%~90% 的高压缩率</strong>。</p>
<h3 id="静态表编码" tabindex="-1"><a class="header-anchor" href="#静态表编码" aria-hidden="true">#</a> 静态表编码</h3>
<p>HTTP/2 为高频出现在头部的字符串和字段建立了一张<strong>静态表</strong>，它是写入到 HTTP/2 框架里的，不会变化的，静态表里共有 <code v-pre>61</code> 组，如下图：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/静态表.png" alt=""></p>
<p>表中的 <code v-pre>Index</code> 表示索引（Key），<code v-pre>Header Value</code> 表示索引对应的  Value，<code v-pre>Header Name</code> 表示字段的名字，比如 Index 为 2 代表 GET，Index 为 8 代表状态码 200。</p>
<p>你可能注意到，表中有的 Index 没有对应的 Header Value，这是因为这些 Value 并不是固定的而是变化的，这些 Value 都会经过 Huffman 编码后，才会发送出去。</p>
<p>这么说有点抽象，我们来看个具体的例子，下面这个 <code v-pre>server</code> 头部字段，在 HTTP/1.1 的形式如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>server: nghttpx\r\n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>算上冒号空格和末尾的<code v-pre>\r\n</code>，共占用了 17 字节，<strong>而使用了静态表和 Huffman 编码，可以将它压缩成 8 字节，压缩率大概 47%</strong>。</p>
<p>我抓了个 HTTP/2 协议的网络包，你可以从下图看到，高亮部分就是 <code v-pre>server</code> 头部字段，只用了 8 个字节来表示 <code v-pre>server</code> 头部数据。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/静态编码.png" alt=""></p>
<p>根据 RFC7541 规范，如果头部字段属于静态表范围，并且 Value 是变化，那么它的 HTTP/2 头部前 2 位固定为 <code v-pre>01</code>，所以整个头部格式如下图：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/静态头部.png" alt=""></p>
<p>HTTP/2 头部由于基于<strong>二进制编码</strong>，就不需要冒号空格和末尾的\r\n作为分隔符，于是改用表示字符串长度（Value Length）来分割 Index 和 Value。</p>
<p>接下来，根据这个头部格式来分析上面抓包的 <code v-pre>server</code> 头部的二进制数据。</p>
<p>首先，从静态表中能查到 <code v-pre>server</code> 头部字段的 Index 为 54，二进制为 110110，再加上固定 01，头部格式第 1 个字节就是 <code v-pre>01110110</code>，这正是上面抓包标注的红色部分的二进制数据。</p>
<p>然后，第二个字节的首个比特位表示 Value 是否经过 Huffman 编码，剩余的 7 位表示 Value 的长度，比如这次例子的第二个字节为 <code v-pre>10000110</code>，首位比特位为 1 就代表 Value 字符串是经过 Huffman 编码的，经过 Huffman 编码的 Value 长度为 6。</p>
<p>最后，字符串 <code v-pre>nghttpx</code> 经过 Huffman 编码后压缩成了 6 个字节，Huffman 编码的原理是将高频出现的信息用「较短」的编码表示，从而缩减字符串长度。</p>
<p>于是，在统计大量的 HTTP 头部后，HTTP/2 根据出现频率将 ASCII 码编码为了 Huffman 编码表，可以在 RFC7541 文档找到这张<strong>静态 Huffman 表</strong>，我就不把表的全部内容列出来了，我只列出字符串 <code v-pre>nghttpx</code> 中每个字符对应的 Huffman 编码，如下图：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/nghttpx.png" alt=""></p>
<p>通过查表后，字符串 <code v-pre>nghttpx</code> 的 Huffman 编码在下图看到，共 6 个字节，每一个字符的 Huffman 编码，我用相同的颜色将他们对应起来了，最后的 7 位是补位的。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/nghttpx2.png" alt=""></p>
<p>最终，<code v-pre>server</code> 头部的二进制数据对应的静态头部格式如下：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/静态头部2.png" alt=""></p>
<h3 id="动态表编码" tabindex="-1"><a class="header-anchor" href="#动态表编码" aria-hidden="true">#</a> 动态表编码</h3>
<p>静态表只包含了 61 种高频出现在头部的字符串，不在静态表范围内的头部字符串就要自行构建<strong>动态表</strong>，它的 Index 从 <code v-pre>62</code> 起步，会在编码解码的时候随时更新。</p>
<p>比如，第一次发送时头部中的「<code v-pre>User-Agent</code> 」字段数据有上百个字节，经过 Huffman 编码发送出去后，客户端和服务器双方都会更新自己的动态表，添加一个新的 Index 号 62。<strong>那么在下一次发送的时候，就不用重复发这个字段的数据了，只用发 1 个字节的 Index 号就好了，因为双方都可以根据自己的动态表获取到字段的数据</strong>。</p>
<p>所以，使得动态表生效有一个前提：<strong>必须同一个连接上，重复传输完全相同的 HTTP 头部</strong>。如果消息字段在 1 个连接上只发送了 1 次，或者重复传输时，字段总是略有变化，动态表就无法被充分利用了。</p>
<p>因此，随着在同一 HTTP/2 连接上发送的报文越来越多，客户端和服务器双方的「字典」积累的越来越多，理论上最终每个头部字段都会变成 1 个字节的 Index，这样便避免了大量的冗余数据的传输，大大节约了带宽。</p>
<p>理想很美好，现实很骨感。动态表越大，占用的内存也就越大，如果占用了太多内存，是会影响服务器性能的，因此 Web 服务器都会提供类似 <code v-pre>http2_max_requests</code> 的配置，用于限制一个连接上能够传输的请求数量，避免动态表无限增大，请求数量到达上限后，就会关闭 HTTP/2 连接来释放内存。</p>
<p>综上，HTTP/2 头部的编码通过「静态表、动态表、Huffman 编码」共同完成的。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/头部编码.png" alt=""></p>
<hr>
<h2 id="二进制帧" tabindex="-1"><a class="header-anchor" href="#二进制帧" aria-hidden="true">#</a> 二进制帧</h2>
<p>HTTP/2 厉害的地方在于将 HTTP/1 的文本格式改成二进制格式传输数据，极大提高了 HTTP 传输效率，而且二进制数据使用位运算能高效解析。</p>
<p>你可以从下图看到，HTTP/1.1 的响应和 HTTP/2 的区别：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/二进制帧.png" alt=""></p>
<p>HTTP/2 把响应报文划分成了两类<strong>帧（<em>Frame</em>）</strong>，图中的 HEADERS（首部）和 DATA（消息负载） 是帧的类型，也就是说一条 HTTP 响应，划分成了两类帧来传输，并且采用二进制来编码。</p>
<p>比如状态码 200 ，在 HTTP/1.1 是用 '2''0''0' 三个字符来表示（二进制：00110010 00110000 00110000），共用了 3 个字节，如下图</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/http1.png" alt="img"></p>
<p>在 HTTP/2 对于状态码 200 的二进制编码是 10001000，只用了 1 字节就能表示，相比于 HTTP/1.1 节省了 2 个字节，如下图：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/h2c.png" alt="img"></p>
<p>Header: :status: 200 OK 的编码内容为：1000 1000，那么表达的含义是什么呢？</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/network/http/index.png" alt=""></p>
<ol>
<li>最前面的 1 标识该 Header 是静态表中已经存在的 KV。</li>
<li>我们再回顾一下之前的静态表内容，“:status: 200 OK”其静态表编码是 8，即 1000。</li>
</ol>
<p>因此，整体加起来就是 1000 1000。</p>
<p>HTTP/2 <strong>二进制帧</strong>的结构如下图：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/帧格式.png" alt=""></p>
<p>帧头（Frame Header）很小，只有 9 个字节，帧开头的前 3 个字节表示帧数据（Frame Playload）的<strong>长度</strong>。</p>
<p>帧长度后面的一个字节是表示<strong>帧的类型</strong>，HTTP/2 总共定义了 10 种类型的帧，一般分为<strong>数据帧</strong>和<strong>控制帧</strong>两类，如下表格：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/帧类型.png" alt=""></p>
<p>帧类型后面的一个字节是<strong>标志位</strong>，可以保存 8 个标志位，用于携带简单的控制信息，比如：</p>
<ul>
<li><strong>END_HEADERS</strong> 表示头数据结束标志，相当于 HTTP/1 里头后的空行（“\r\n”）；</li>
<li><strong>END_Stream</strong> 表示单方向数据发送结束，后续不会再有数据帧。</li>
<li><strong>PRIORITY</strong> 表示流的优先级；</li>
</ul>
<p>帧头的最后 4 个字节是<strong>流标识符</strong>（Stream ID），但最高位被保留不用，只有 31 位可以使用，因此流标识符的最大值是 2^31，大约是 21 亿，它的作用是用来标识该 Frame 属于哪个 Stream，接收方可以根据这个信息从乱序的帧里找到相同 Stream ID 的帧，从而有序组装信息。</p>
<p>最后面就是<strong>帧数据</strong>了，它存放的是通过 <strong>HPACK  算法</strong>压缩过的 HTTP 头部和包体。</p>
<hr>
<h2 id="并发传输" tabindex="-1"><a class="header-anchor" href="#并发传输" aria-hidden="true">#</a> 并发传输</h2>
<p>知道了 HTTP/2 的帧结构后，我们再来看看它是如何实现<strong>并发传输</strong>的。</p>
<p>我们都知道 HTTP/1.1 的实现是基于请求-响应模型的。同一个连接中，HTTP 完成一个事务（请求与响应），才能处理下一个事务，也就是说在发出请求等待响应的过程中，是没办法做其他事情的，如果响应迟迟不来，那么后续的请求是无法发送的，也造成了<strong>队头阻塞</strong>的问题。</p>
<p>而 HTTP/2 就很牛逼了，通过 Stream 这个设计，<strong>多个 Stream 复用一条 TCP 连接，达到并发的效果</strong>，解决了 HTTP/1.1 队头阻塞的问题，提高了 HTTP 传输的吞吐量。</p>
<p>为了理解 HTTP/2 的并发是怎样实现的，我们先来理解 HTTP/2 中的 Stream、Message、Frame 这 3 个概念。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/stream.png" alt=""></p>
<p>你可以从上图中看到：</p>
<ul>
<li>1 个 TCP 连接包含一个或者多个 Stream，Stream 是 HTTP/2 并发的关键技术；</li>
<li>Stream 里可以包含 1 个或多个 Message，Message 对应 HTTP/1 中的请求或响应，由 HTTP 头部和包体构成；</li>
<li>Message 里包含一条或者多个 Frame，Frame 是 HTTP/2 最小单位，以二进制压缩格式存放 HTTP/1 中的内容（头部和包体）；</li>
</ul>
<p>因此，我们可以得出个结论：多个 Stream 跑在一条 TCP 连接，同一个 HTTP 请求与响应是跑在同一个 Stream 中，HTTP 消息可以由多个 Frame 构成， 一个 Frame 可以由多个 TCP 报文构成。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/stream2.png" alt=""></p>
<p>在 HTTP/2 连接上，<strong>不同 Stream 的帧是可以乱序发送的（因此可以并发不同的 Stream ）</strong>，因为每个帧的头部会携带 Stream ID 信息，所以接收端可以通过 Stream ID 有序组装成 HTTP 消息，而<strong>同一 Stream 内部的帧必须是严格有序的</strong>。</p>
<p>比如下图，服务端<strong>并行交错地</strong>发送了两个响应： Stream 1 和 Stream 3，这两个 Stream 都是跑在一个 TCP 连接上，客户端收到后，会根据相同的 Stream ID 有序组装成 HTTP 消息。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/network/http/http2多路复用.jpeg" alt=""></p>
<p>客户端和服务器<strong>双方都可以建立 Stream</strong>，因为服务端可以主动推送资源给客户端， 客户端建立的 Stream 必须是奇数号，而服务器建立的 Stream 必须是偶数号。</p>
<p>比如下图，Stream 1 是客户端向服务端请求的资源，属于客户端建立的 Stream，所以该 Stream 的 ID 是奇数（数字 1）；Stream 2 和 4 都是服务端主动向客户端推送的资源，属于服务端建立的 Stream，所以这两个 Stream 的 ID 是偶数（数字 2 和 4）。</p>
<p><img src="https://img-blog.csdnimg.cn/83445581dafe409d8cfd2c573b2781ac.png" alt=""></p>
<p>同一个连接中的 Stream ID 是不能复用的，只能顺序递增，所以当 Stream ID 耗尽时，需要发一个控制帧 <code v-pre>GOAWAY</code>，用来关闭 TCP 连接。</p>
<p>在 Nginx 中，可以通过 <code v-pre>http2_max_concurrent_Streams</code> 配置来设置 Stream 的上限，默认是 128 个。</p>
<p>HTTP/2 通过 Stream 实现的并发，比 HTTP/1.1 通过 TCP 连接实现并发要牛逼的多，<strong>因为当 HTTP/2 实现 100 个并发 Stream 时，只需要建立一次 TCP 连接，而 HTTP/1.1 需要建立 100 个 TCP 连接，每个 TCP 连接都要经过 TCP 握手、慢启动以及 TLS 握手过程，这些都是很耗时的。</strong></p>
<p>HTTP/2 还可以对每个 Stream 设置不同<strong>优先级</strong>，帧头中的「标志位」可以设置优先级，比如客户端访问 HTML/CSS 和图片资源时，希望服务器先传递 HTML/CSS，再传图片，那么就可以通过设置 Stream 的优先级来实现，以此提高用户体验。</p>
<h2 id="服务器主动推送资源" tabindex="-1"><a class="header-anchor" href="#服务器主动推送资源" aria-hidden="true">#</a> 服务器主动推送资源</h2>
<p>HTTP/1.1 不支持服务器主动推送资源给客户端，都是由客户端向服务器发起请求后，才能获取到服务器响应的资源。</p>
<p>比如，客户端通过 HTTP/1.1 请求从服务器那获取到了 HTML 文件，而 HTML 可能还需要依赖 CSS 来渲染页面，这时客户端还要再发起获取 CSS 文件的请求，需要两次消息往返，如下图左边部分：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/push.png" alt=""></p>
<p>如上图右边部分，在 HTTP/2 中，客户端在访问 HTML 时，服务器可以直接主动推送 CSS 文件，减少了消息传递的次数。</p>
<p>在 Nginx 中，如果你希望客户端访问 /test.html 时，服务器直接推送 /test.css，那么可以这么配置：</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> /test.html</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">http2_push</span> /test.css</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那 HTTP/2 的推送是怎么实现的？</p>
<p>客户端发起的请求，必须使用的是奇数号 Stream，服务器主动的推送，使用的是偶数号 Stream。服务器在推送资源时，会通过 <code v-pre>PUSH_PROMISE</code> 帧传输 HTTP 头部，并通过帧中的 <code v-pre>Promised Stream ID</code> 字段告知客户端，接下来会在哪个偶数号 Stream 中发送包体。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http2/push2.png" alt=""></p>
<p>如上图，在 Stream 1 中通知客户端 CSS 资源即将到来，然后在 Stream 2 中发送 CSS 资源，注意 Stream 1 和 2 是可以<strong>并发</strong>的。</p>
<hr>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>HTTP/2 协议其实还有很多内容，比如流控制、流状态、依赖关系等等。</p>
<p>这次主要介绍了关于 HTTP/2 是如何提升性能的几个方向，它相比 HTTP/1 大大提高了传输效率、吞吐能力。</p>
<p>第一点，对于常见的 HTTP 头部通过<strong>静态表和 Huffman 编码</strong>的方式，将体积压缩了近一半，而且针对后续的请求头部，还可以建立<strong>动态表</strong>，将体积压缩近 90%，大大提高了编码效率，同时节约了带宽资源。</p>
<p>不过，动态表并非可以无限增大， 因为动态表是会占用内存的，动态表越大，内存也越大，容易影响服务器总体的并发能力，因此服务器需要限制 HTTP/2 连接时长或者请求次数。</p>
<p>第二点，<strong>HTTP/2 实现了 Stream 并发</strong>，多个 Stream 只需复用 1 个 TCP 连接，节约了 TCP 和 TLS 握手时间，以及减少了 TCP 慢启动阶段对流量的影响。不同的 Stream ID 可以并发，即使乱序发送帧也没问题，比如发送 A 请求帧 1 -&gt; B 请求帧 1 -&gt; A 请求帧 2 -&gt; B 请求帧2，但是同一个 Stream 里的帧必须严格有序。</p>
<p>另外，可以根据资源的渲染顺序来设置 Stream 的<strong>优先级</strong>，从而提高用户体验。</p>
<p>第三点，<strong>服务器支持主动推送资源</strong>，大大提升了消息的传输性能，服务器推送资源时，会先发送 PUSH_PROMISE 帧，告诉客户端接下来在哪个 Stream 发送资源，然后用偶数号 Stream 发送资源给客户端。</p>
<p>HTTP/2 通过 Stream 的并发能力，解决了 HTTP/1 队头阻塞的问题，看似很完美了，但是 HTTP/2 还是存在“队头阻塞”的问题，只不过问题不是在 HTTP 这一层面，而是在 TCP 这一层。</p>
<p><strong>HTTP/2 是基于 TCP 协议来传输数据的，TCP 是字节流协议，TCP 层必须保证收到的字节数据是完整且连续的，这样内核才会将缓冲区里的数据返回给 HTTP 应用，那么当「前 1 个字节数据」没有到达时，后收到的字节数据只能存放在内核缓冲区里，只有等到这 1 个字节数据到达时，HTTP/2 应用层才能从内核中拿到数据，这就是 HTTP/2 队头阻塞问题。</strong></p>
<p>有没有什么解决方案呢？既然是 TCP 协议自身的问题，那干脆放弃 TCP 协议，转而使用 UDP 协议作为传输层协议，这个大胆的决定，HTTP/3 协议做了！</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/HTTP/27-HTTP3.png" alt=""></p>
<hr>
<p>参考资料：</p>
<ol>
<li>https://developers.google.com/web/fundamentals/performance/http2</li>
<li>https://http2.akamai.com/demo</li>
<li>https://tools.ietf.org/html/rfc7541</li>
</ol>
<hr>
</div></template>


