<template><div><h1 id="http-1-1-如何优化" tabindex="-1"><a class="header-anchor" href="#http-1-1-如何优化" aria-hidden="true">#</a> HTTP/1.1 如何优化？</h1>
<p>问你一句：「<strong>你知道 HTTP/1.1 该如何优化吗？</strong>」</p>
<p>我们可以从下面这三种优化思路来优化 HTTP/1.1 协议：</p>
<ul>
<li><em>尽量避免发送 HTTP 请求</em>；</li>
<li><em>在需要发送 HTTP 请求时，考虑如何减少请求次数</em>；</li>
<li><em>减少服务器的 HTTP 响应的数据大小</em>；</li>
</ul>
<p>下面，就针对这三种思路具体看看有哪些优化方法。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http1.1优化/优化http1.1提纲.png" alt=""></p>
<hr>
<h2 id="如何避免发送-http-请求" tabindex="-1"><a class="header-anchor" href="#如何避免发送-http-请求" aria-hidden="true">#</a> 如何避免发送 HTTP 请求？</h2>
<p>这个思路你看到是不是觉得很奇怪，不发送 HTTP 请求，那客户端还怎么和服务器交互数据？小林你这不是耍流氓嘛？</p>
<p>冷静冷静，你说的没错，客户端当然要向服务器发送请求的。</p>
<p>但是，对于一些具有重复性的 HTTP 请求，比如每次请求得到的数据都一样的，我们可以把这对「请求-响应」的数据都<strong>缓存在本地</strong>，那么下次就直接读取本地的数据，不必在通过网络获取服务器的响应了，这样的话 HTTP/1.1 的性能肯定肉眼可见的提升。</p>
<p>所以，避免发送 HTTP 请求的方法就是通过<strong>缓存技术</strong>，HTTP 设计者早在之前就考虑到了这点，因此 HTTP 协议的头部有不少是针对缓存的字段。</p>
<p>那缓存是如何做到的呢？</p>
<p>客户端会把第一次请求以及响应的数据保存在本地磁盘上，其中将请求的 URL 作为 key，而响应作为 value，两者形成映射关系。</p>
<p>这样当后续发起相同的请求时，就可以先在本地磁盘上通过 key 查到对应的 value，也就是响应，如果找到了，就直接从本地读取该响应。毋庸置疑，读取本地磁盘的速度肯定比网络请求快得多，如下图：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http1.1优化/缓存访问.png" alt=""></p>
<p>聪明的你可能想到了，万一缓存的响应不是最新的，而客户端并不知情，那么该怎么办呢？</p>
<p>放心，这个问题 HTTP 设计者早已考虑到。</p>
<p>所以，服务器在发送 HTTP 响应时，会估算一个过期的时间，并把这个信息放到响应头部中，这样客户端在查看响应头部的信息时，一旦发现缓存的响应是过期的，则就会重新发送网络请求。</p>
<p>如果客户端从第一次请求得到的响应头部中发现该响应过期了，客户端重新发送请求，假设服务器上的资源并没有变更，还是老样子，那么你觉得还要在服务器的响应带上这个资源吗？</p>
<p>很显然不带的话，可以提高 HTTP 协议的性能，那具体如何做到呢？</p>
<p>只需要客户端在重新发送请求时，在请求的 <code v-pre>Etag</code> 头部带上第一次请求的响应头部中的摘要，这个摘要是唯一标识响应的资源，当服务器收到请求后，会将本地资源的摘要与请求中的摘要做个比较。</p>
<p>如果不同，那么说明客户端的缓存已经没有价值，服务器在响应中带上最新的资源。</p>
<p>如果相同，说明客户端的缓存还是可以继续使用的，那么服务器<strong>仅返回不含有包体的 <code v-pre>304 Not Modified</code> 响应</strong>，告诉客户端仍然有效，这样就可以减少响应资源在网络中传输的延时，如下图：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http1.1优化/缓存etag.png" alt=""></p>
<p>缓存真的是性能优化的一把万能钥匙，小到 CPU Cache、Page Cache、Redis Cache，大到 HTTP 协议的缓存。</p>
<hr>
<h2 id="如何减少-http-请求次数" tabindex="-1"><a class="header-anchor" href="#如何减少-http-请求次数" aria-hidden="true">#</a> 如何减少 HTTP 请求次数？</h2>
<p>减少 HTTP 请求次数自然也就提升了 HTTP 性能，可以从这 3 个方面入手：</p>
<ul>
<li><em>减少重定向请求次数</em>；</li>
<li><em>合并请求</em>；</li>
<li><em>延迟发送请求</em>；</li>
</ul>
<h3 id="减少重定向请求次数" tabindex="-1"><a class="header-anchor" href="#减少重定向请求次数" aria-hidden="true">#</a> 减少重定向请求次数</h3>
<p>我们先来看看什么是<strong>重定向请求</strong>？</p>
<p>服务器上的一个资源可能由于迁移、维护等原因从 url1 移至 url2 后，而客户端不知情，它还是继续请求 url1，这时服务器不能粗暴地返回错误，而是通过 <code v-pre>302</code> 响应码和 <code v-pre>Location</code> 头部，告诉客户端该资源已经迁移至 url2 了，于是客户端需要再发送 url2 请求以获得服务器的资源。</p>
<p>那么，如果重定向请求越多，那么客户端就要多次发起 HTTP 请求，每一次的 HTTP 请求都得经过网络，这无疑会越降低网络性能。</p>
<p>另外，服务端这一方往往不只有一台服务器，比如源服务器上一级是代理服务器，然后代理服务器才与客户端通信，这时客户端重定向就会导致客户端与代理服务器之间需要 2 次消息传递，如下图：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http1.1优化/客户端重定向.png" alt=""></p>
<p>如果<strong>重定向的工作交由代理服务器完成，就能减少 HTTP 请求次数了</strong>，如下图：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http1.1优化/代理服务器重定向.png" alt=""></p>
<p>而且当代理服务器知晓了重定向规则后，可以进一步减少消息传递次数，如下图：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http1.1优化/代理服务器重定向2.png" alt=""></p>
<p>除了 <code v-pre>302</code> 重定向响应码，还有其他一些重定向的响应码，你可以从下图看到：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http1.1优化/重定向响应码.png" alt=""></p>
<p>其中，<code v-pre>301</code> 和 <code v-pre>308</code> 响应码是告诉客户端可以将重定向响应缓存到本地磁盘，之后客户端就自动用 url2 替代 url1 访问服务器的资源。</p>
<h3 id="合并请求" tabindex="-1"><a class="header-anchor" href="#合并请求" aria-hidden="true">#</a> 合并请求</h3>
<p>如果把多个访问小文件的请求合并成一个大的请求，虽然传输的总资源还是一样，但是减少请求，也就意味着<strong>减少了重复发送的 HTTP 头部</strong>。</p>
<p>另外由于 HTTP/1.1 是请求响应模型，如果第一个发送的请求，未收到对应的响应，那么后续的请求就不会发送（PS：HTTP/1.1 管道模式是默认不使用的，所以讨论 HTTP/1.1  的队头阻塞问题，是不考虑管道模式的），于是为了防止单个请求的阻塞，所以<strong>一般浏览器会同时发起 5-6 个请求，每一个请求都是不同的 TCP 连接</strong>，那么如果合并了请求，也就会<strong>减少 TCP 连接的数量，因而省去了  TCP 握手和慢启动过程耗费的时间</strong>。</p>
<p>接下来，具体看看合并请求的几种方式。</p>
<p>有的网页会含有很多小图片、小图标，有多少个小图片，客户端就要发起多少次请求。那么对于这些小图片，我们可以考虑使用 <code v-pre>CSS Image Sprites</code> 技术把它们合成一个大图片，这样浏览器就可以用一次请求获得一个大图片，然后再根据 CSS 数据把大图片切割成多张小图片。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http1.1优化/css精灵.png" alt="图来源于：墨染枫林的CSDN"></p>
<p>这种方式就是<strong>通过将多个小图片合并成一个大图片来减少 HTTP 请求的次数，以减少 HTTP 请求的次数，从而减少网络的开销</strong>。</p>
<p>除了将小图片合并成大图片的方式，还有服务端使用 <code v-pre>webpack</code> 等打包工具将 js、css 等资源合并打包成大文件，也是能达到类似的效果。</p>
<p>另外，还可以将图片的二进制数据用 <code v-pre>base64</code> 编码后，以 URL 的形式嵌入到 HTML 文件，跟随 HTML 文件一并发送.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAFKCAIAAAC7M9WrAAAACXBIWXMAA ... />
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样客户端收到 HTML 后，就可以直接解码出数据，然后直接显示图片，就不用再发起图片相关的请求，这样便减少了请求的次数。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http1.1优化/base64图片.png" alt="图来源于：陈健平的CSDN "></p>
<p>可以看到，<strong>合并请求的方式就是合并资源，以一个大资源的请求替换多个小资源的请求</strong>。</p>
<p>但是这样的合并请求会带来新的问题，<strong>当大资源中的某一个小资源发生变化后，客户端必须重新下载整个完整的大资源文件</strong>，这显然带来了额外的网络消耗。</p>
<h3 id="延迟发送请求" tabindex="-1"><a class="header-anchor" href="#延迟发送请求" aria-hidden="true">#</a> 延迟发送请求</h3>
<p>不要一口气吃成大胖子，一般 HTML 里会含有很多 HTTP 的 URL，当前不需要的资源，我们没必要也获取过来，于是可以通过「<strong>按需获取</strong>」的方式，来减少第一时间的 HTTP 请求次数。</p>
<p>请求网页的时候，没必要把全部资源都获取到，而是只获取当前用户所看到的页面资源，当用户向下滑动页面的时候，再向服务器获取接下来的资源，这样就达到了延迟发送请求的效果。</p>
<hr>
<h2 id="如何减少-http-响应的数据大小" tabindex="-1"><a class="header-anchor" href="#如何减少-http-响应的数据大小" aria-hidden="true">#</a> 如何减少 HTTP 响应的数据大小？</h2>
<p>对于 HTTP 的请求和响应，通常 HTTP 的响应的数据大小会比较大，也就是服务器返回的资源会比较大。</p>
<p>于是，我们可以考虑对响应的资源进行<strong>压缩</strong>，这样就可以减少响应的数据大小，从而提高网络传输的效率。</p>
<p>压缩的方式一般分为 2 种，分别是：</p>
<ul>
<li><em>无损压缩</em>；</li>
<li><em>有损压缩</em>；</li>
</ul>
<h3 id="无损压缩" tabindex="-1"><a class="header-anchor" href="#无损压缩" aria-hidden="true">#</a> 无损压缩</h3>
<p>无损压缩是指资源经过压缩后，信息不被破坏，还能完全恢复到压缩前的原样，适合用在文本文件、程序可执行文件、程序源代码。</p>
<p>首先，我们针对代码的语法规则进行压缩，因为通常代码文件都有很多换行符或者空格，这些是为了帮助程序员更好的阅读，但是机器执行时并不要这些符，把这些多余的符号给去除掉。</p>
<p>接下来，就是无损压缩了，需要对原始资源建立统计模型，利用这个统计模型，将常出现的数据用较短的二进制比特序列表示，将不常出现的数据用较长的二进制比特序列表示，生成二进制比特序列一般是「霍夫曼编码」算法。</p>
<p>gzip 就是比较常见的无损压缩。客户端支持的压缩算法，会在 HTTP 请求中通过头部中的 <code v-pre>Accept-Encoding</code> 字段告诉服务器：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Accept-Encoding: gzip, deflate, br
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>服务器收到后，会从中选择一个服务器支持的或者合适的压缩算法，然后使用此压缩算法对响应资源进行压缩，最后通过响应头部中的 <code v-pre>Content-Encoding</code> 字段告诉客户端该资源使用的压缩算法。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Content-Encoding: gzip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>gzip 的压缩效率相比 Google 推出的 Brotli 算法还是差点意思，也就是上文中的 br，所以如果可以，服务器应该选择压缩效率更高的 br 压缩算法。</p>
<h3 id="有损压缩" tabindex="-1"><a class="header-anchor" href="#有损压缩" aria-hidden="true">#</a> 有损压缩</h3>
<p>与无损压缩相对的就是有损压缩，经过此方法压缩，解压的数据会与原始数据不同但是非常接近。</p>
<p>有损压缩主要将次要的数据舍弃，牺牲一些质量来减少数据量、提高压缩比，这种方法经常用于压缩多媒体数据，比如音频、视频、图片。</p>
<p>可以通过 HTTP 请求头部中的 <code v-pre>Accept</code> 字段里的「 q 质量因子」，告诉服务器期望的资源质量。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Accept: audio/*; q=0.2, audio/basic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>关于图片的压缩，目前压缩比较高的是 Google 推出的 <strong>WebP 格式</strong>，它与常见的 Png 格式图片的压缩比例对比如下图：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/http1.1优化/webp与png.png" alt="来源于：https://isparta.github.io/compare-webp/index.html"></p>
<p>可以发现，相同图片质量下，WebP 格式的图片大小都比 Png 格式的图片小，所以对于大量图片的网站，可以考虑使用 WebP 格式的图片，这将大幅度提升网络传输的性能。</p>
<p>关于音视频的压缩，音视频主要是动态的，每个帧都有时序的关系，通常时间连续的帧之间的变化是很小的。</p>
<p>比如，一个在看书的视频，画面通常只有人物的手和书桌上的书是会有变化的，而其他地方通常都是静态的，于是只需要在一个静态的关键帧，使用<strong>增量数据</strong>来表达后续的帧，这样便减少了很多数据，提高了网络传输的性能。对于视频常见的编码格式有 H264、H265 等，音频常见的编码格式有 AAC、AC3。</p>
<hr>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>这次主要从 3 个方面介绍了优化 HTTP/1.1 协议的思路。</p>
<p>第一个思路是，通过缓存技术来避免发送 HTTP 请求。客户端收到第一个请求的响应后，可以将其缓存在本地磁盘，下次请求的时候，如果缓存没过期，就直接读取本地缓存的响应数据。如果缓存过期，客户端发送请求的时候带上响应数据的摘要，服务器比对后发现资源没有变化，就发出不带包体的 304 响应，告诉客户端缓存的响应仍然有效。</p>
<p>第二个思路是，减少 HTTP 请求的次数，有以下的方法：</p>
<ol>
<li>将原本由客户端处理的重定向请求，交给代理服务器处理，这样可以减少重定向请求的次数；</li>
<li>将多个小资源合并成一个大资源再传输，能够减少 HTTP 请求次数以及 头部的重复传输，再来减少 TCP 连接数量，进而省去 TCP 握手和慢启动的网络消耗；</li>
<li>按需访问资源，只访问当前用户看得到/用得到的资源，当客户往下滑动，再访问接下来的资源，以此达到延迟请求，也就减少了同一时间的 HTTP 请求次数。</li>
</ol>
<p>第三思路是，通过压缩响应资源，降低传输资源的大小，从而提高传输效率，所以应当选择更优秀的压缩算法。</p>
<p>不管怎么优化 HTTP/1.1 协议都是有限的，不然也不会出现 HTTP/2 和 HTTP/3 协议，后续我们再来介绍 HTTP/2 和 HTTP/3 协议。</p>
<p>好了，此次分享到这就结束了，如果这篇文章对你有帮助，欢迎来个三连，你们的支持就是小林的最大动力，我们下次见！</p>
<hr>
<p>参考资料：</p>
<ol>
<li>https://isparta.github.io/compare-webp/index.html</li>
<li>https://zh.wikipedia.org/wiki/https://en.wikipedia.org/wiki/Lossy_compression</li>
<li>https://en.wikipedia.org/wiki/Lossless_compression</li>
<li>https://time.geekbang.org/column/article/242667</li>
<li>https://www.tutorialrepublic.com/css-tutorial/css-sprites.php</li>
<li>https://blog.csdn.net/weixin_38055381/article/details/81504716</li>
<li>https://blog.csdn.net/weixin_44151887/article/details/106278559</li>
</ol>
<hr>
</div></template>


