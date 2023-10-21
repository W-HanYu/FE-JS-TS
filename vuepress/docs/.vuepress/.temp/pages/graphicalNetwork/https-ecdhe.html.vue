<template><div><h1 id="https-ecdhe-握手解析" tabindex="-1"><a class="header-anchor" href="#https-ecdhe-握手解析" aria-hidden="true">#</a> HTTPS ECDHE 握手解析</h1>
<p>HTTPS 常用的密钥交换算法有两种，分别是 RSA 和 ECDHE 算法。</p>
<p>其中，RSA 是比较传统的密钥交换算法，它不具备前向安全的性质，因此现在很少服务器使用的。而 ECDHE 算法具有前向安全，所以被广泛使用。</p>
<p>我在上一篇已经介绍了 <a href="https://mp.weixin.qq.com/s/U9SRLE7jZTB6lUZ6c8gTKg" target="_blank" rel="noopener noreferrer">RSA 握手的过程<ExternalLinkIcon/></a>，今天这一篇就「从理论再到实战抓包」介绍 <strong>ECDHE 算法</strong>。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/ecdhe提纲.png" alt=""></p>
<hr>
<h2 id="离散对数" tabindex="-1"><a class="header-anchor" href="#离散对数" aria-hidden="true">#</a> 离散对数</h2>
<p>ECDHE 密钥协商算法是 DH 算法演进过来的，所以我们先从 DH 算法说起。</p>
<p>DH 算法是非对称加密算法， 因此它可以用于密钥交换，该算法的核心数学思想是<strong>离散对数</strong>。</p>
<p>是不是听到这个数学概念就怂了？不怕，这次不会说离散对数推导的过程，只简单提一下它的数学公式。</p>
<p>离散对数是「离散 + 对数」的两个数学概念的组合，所以我们先来复习一遍对数。</p>
<p>要说起对数，必然要说指数，因为它们是互为反函数，指数就是幂运算，对数是指数的逆运算。</p>
<p>举个栗子，如果以 2 作为底数，那么指数和对数运算公式，如下图所示：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/指数与对数.png" alt=""></p>
<p>那么对于底数为 2 的时候， 32 的对数是 5，64 的对数是 6，计算过程如下：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/求对数.png" alt=""></p>
<p>对数运算的取值是可以连续的，而离散对数的取值是不能连续的，因此也以「离散」得名，</p>
<p>离散对数是在对数运算的基础上加了「模运算」，也就说取余数，对应编程语言的操作符是「%」，也可以用 mod 表示。离散对数的概念如下图：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/离散对数.png" alt=""></p>
<p>上图的，底数 a 和模数 p 是离散对数的公共参数，也就说是公开的，b 是真数，i 是对数。知道了对数，就可以用上面的公式计算出真数。但反过来，知道真数却很难推算出对数。</p>
<p><strong>特别是当模数 p 是一个很大的质数，即使知道底数 a 和真数 b ，在现有的计算机的计算水平是几乎无法算出离散对数的，这就是 DH 算法的数学基础。</strong></p>
<hr>
<h2 id="dh-算法" tabindex="-1"><a class="header-anchor" href="#dh-算法" aria-hidden="true">#</a> DH 算法</h2>
<p>认识了离散对数，我们来看看 DH 算法是如何密钥交换的。</p>
<p>现假设小红和小明约定使用 DH 算法来交换密钥，那么基于离散对数，小红和小明需要先确定模数和底数作为算法的参数，这两个参数是公开的，用 P 和 G 来代称。</p>
<p>然后小红和小明各自生成一个随机整数作为<strong>私钥</strong>，双方的私钥要各自严格保管，不能泄漏，小红的私钥用 a 代称，小明的私钥用 b 代称。</p>
<p>现在小红和小明双方都有了 P 和 G 以及各自的私钥，于是就可以计算出<strong>公钥</strong>：</p>
<ul>
<li>小红的公钥记作 A，A = G ^ a ( mod P )；</li>
<li>小明的公钥记作 B，B = G ^ b ( mod P )；</li>
</ul>
<p>A 和 B 也是公开的，因为根据离散对数的原理，从真数（A 和 B）反向计算对数 a 和 b 是非常困难的，至少在现有计算机的计算能力是无法破解的，如果量子计算机出来了，那就有可能被破解，当然如果量子计算机真的出来了，那么密钥协商算法就要做大的升级了。</p>
<p>双方交换各自 DH 公钥后，小红手上共有 5 个数：P、G、a、A、B，小明手上也同样共有 5 个数：P、G、b、B、A。</p>
<p>然后小红执行运算： B ^ a ( mod P )，其结果为 K，因为离散对数的幂运算有交换律，所以小明执行运算： A ^ b ( mod P )，得到的结果也是 K。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/dh算法.png" alt=""></p>
<p>这个 K 就是小红和小明之间用的<strong>对称加密密钥</strong>，可以作为会话密钥使用。</p>
<p>可以看到，整个密钥协商过程中，小红和小明公开了 4 个信息：P、G、A、B，其中 P、G 是算法的参数，A 和 B 是公钥，而 a、b 是双方各自保管的私钥，黑客无法获取这 2 个私钥，因此黑客只能从公开的 P、G、A、B 入手，计算出离散对数（私钥）。</p>
<p>前面也多次强调， 根据离散对数的原理，如果 P 是一个大数，在现有的计算机的计算能力是很难破解出 私钥 a、b 的，破解不出私钥，也就无法计算出会话密钥，因此 DH 密钥交换是安全的。</p>
<hr>
<h2 id="dhe-算法" tabindex="-1"><a class="header-anchor" href="#dhe-算法" aria-hidden="true">#</a> DHE 算法</h2>
<p>根据私钥生成的方式，DH 算法分为两种实现：</p>
<ul>
<li>static DH 算法，这个是已经被废弃了；</li>
<li>DHE 算法，现在常用的；</li>
</ul>
<p>static DH 算法里有一方的私钥是静态的，也就说每次密钥协商的时候有一方的私钥都是一样的，一般是服务器方固定，即 a 不变，客户端的私钥则是随机生成的。</p>
<p>于是，DH 交换密钥时就只有客户端的公钥是变化，而服务端公钥是不变的，那么随着时间延长，黑客就会截获海量的密钥协商过程的数据，因为密钥协商的过程有些数据是公开的，黑客就可以依据这些数据暴力破解出服务器的私钥，然后就可以计算出会话密钥了，于是之前截获的加密数据会被破解，所以 <strong>static DH 算法不具备前向安全性</strong>。</p>
<p>既然固定一方的私钥有被破解的风险，那么干脆就让双方的私钥在每次密钥交换通信时，都是随机生成的、临时的，这个方式也就是 DHE 算法，E 全称是 ephemeral（临时性的）。</p>
<p>所以，即使有个牛逼的黑客破解了某一次通信过程的私钥，其他通信过程的私钥仍然是安全的，因为<strong>每个通信过程的私钥都是没有任何关系的，都是独立的，这样就保证了「前向安全」</strong>。</p>
<hr>
<h2 id="ecdhe-算法" tabindex="-1"><a class="header-anchor" href="#ecdhe-算法" aria-hidden="true">#</a> ECDHE 算法</h2>
<p>DHE 算法由于计算性能不佳，因为需要做大量的乘法，为了提升 DHE 算法的性能，所以就出现了现在广泛用于密钥交换算法 ——  <strong>ECDHE 算法</strong>。</p>
<p>ECDHE 算法是在 DHE 算法的基础上利用了 ECC 椭圆曲线特性，可以用更少的计算量计算出公钥，以及最终的会话密钥。</p>
<p>小红和小明使用 ECDHE 密钥交换算法的过程：</p>
<ul>
<li>双方事先确定好使用哪种椭圆曲线，和曲线上的基点 G，这两个参数都是公开的；</li>
<li>双方各自随机生成一个随机数作为<strong>私钥d</strong>，并与基点 G相乘得到<strong>公钥Q</strong>（Q = dG），此时小红的公私钥为 Q1 和 d1，小明的公私钥为 Q2 和 d2；</li>
<li>双方交换各自的公钥，最后小红计算点（x1，y1） = d1Q2，小明计算点（x2，y2） = d2Q1，由于椭圆曲线上是可以满足乘法交换和结合律，所以 d1Q2 = d1d2G = d2d1G = d2Q1 ，因此<strong>双方的 x 坐标是一样的，所以它是共享密钥，也就是会话密钥</strong>。</li>
</ul>
<p>这个过程中，双方的私钥都是随机、临时生成的，都是不公开的，即使根据公开的信息（椭圆曲线、公钥、基点 G）也是很难计算出椭圆曲线上的离散对数（私钥）。</p>
<hr>
<h2 id="ecdhe-握手过程" tabindex="-1"><a class="header-anchor" href="#ecdhe-握手过程" aria-hidden="true">#</a> ECDHE 握手过程</h2>
<p>知道了 ECDHE 算法基本原理后，我们就结合实际的情况来看看。</p>
<p>我用 Wireshark 工具抓了用 ECDHE 密钥协商算法的 TSL 握手过程，可以看到是四次握手：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/ech_tls握手.png" alt=""></p>
<p>细心的小伙伴应该发现了，<strong>使用了 ECDHE，在 TLS 第四次握手前，客户端就已经发送了加密的 HTTP 数据</strong>，而对于 RSA 握手过程，必须要完成 TLS 四次握手，才能传输应用数据。</p>
<p>所以，<strong>ECDHE 相比 RSA 握手过程省去了一个消息往返的时间</strong>，这个有点「抢跑」的意思，它被称为是「<em>TLS False Start</em>」，跟「<em>TCP Fast Open</em>」有点像，都是在还没连接完全建立前，就发送了应用数据，这样便提高了传输的效率。</p>
<p>接下来，分析每一个 ECDHE 握手过程。</p>
<h3 id="tls-第一次握手" tabindex="-1"><a class="header-anchor" href="#tls-第一次握手" aria-hidden="true">#</a> TLS 第一次握手</h3>
<p>客户端首先会发一个「<strong>Client Hello</strong>」消息，消息里面有客户端使用的 TLS 版本号、支持的密码套件列表，以及生成的<strong>随机数（<em>Client Random</em>）</strong>。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/ech_clinethello.png" alt=""></p>
<h3 id="tls-第二次握手" tabindex="-1"><a class="header-anchor" href="#tls-第二次握手" aria-hidden="true">#</a> TLS 第二次握手</h3>
<p>服务端收到客户端的「打招呼」，同样也要回礼，会返回「<strong>Server Hello</strong>」消息，消息面有服务器确认的 TLS 版本号，也给出了一个<strong>随机数（<em>Server Random</em>）</strong>，然后从客户端的密码套件列表选择了一个合适的密码套件。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/ech_serverhello.png" alt=""></p>
<p>不过，这次选择的密码套件就和 RSA 不一样了，我们来分析一下这次的密码套件的意思。</p>
<p>「 TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384」</p>
<ul>
<li>密钥协商算法使用 ECDHE；</li>
<li>签名算法使用 RSA；</li>
<li>握手后的通信使用 AES 对称算法，密钥长度 256 位，分组模式是 GCM；</li>
<li>摘要算法使用 SHA384；</li>
</ul>
<p>接着，服务端为了证明自己的身份，发送「<strong>Certificate</strong>」消息，会把证书也发给客户端。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/ech_certificate.png" alt=""></p>
<p>这一步就和 RSA 握手过程有很大到区别了，因为服务端选择了 ECDHE 密钥协商算法，所以会在发送完证书后，发送「<strong>Server Key Exchange</strong>」消息。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/ech_serverkey.png" alt=""></p>
<p>这个过程服务器做了三件事：</p>
<ul>
<li>选择了<strong>名为 x25519 的椭圆曲线</strong>，选好了椭圆曲线相当于椭圆曲线基点 G 也定好了，这些都会公开给客户端；</li>
<li>生成随机数作为服务端椭圆曲线的私钥，保留到本地；</li>
<li>根据基点 G 和私钥计算出<strong>服务端的椭圆曲线公钥</strong>，这个会公开给客户端。</li>
</ul>
<p>为了保证这个椭圆曲线的公钥不被第三方篡改，服务端会用 RSA 签名算法给服务端的椭圆曲线公钥做个签名。</p>
<p>随后，就是「<strong>Server Hello Done</strong>」消息，服务端跟客户端表明：“这些就是我提供的信息，打招呼完毕”。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/ech_serverhellodone.png" alt=""></p>
<p>至此，TLS 两次握手就已经完成了，目前客户端和服务端通过明文共享了这几个信息：<strong>Client Random、Server Random 、使用的椭圆曲线、椭圆曲线基点 G、服务端椭圆曲线的公钥</strong>，这几个信息很重要，是后续生成会话密钥的材料。</p>
<h3 id="tls-第三次握手" tabindex="-1"><a class="header-anchor" href="#tls-第三次握手" aria-hidden="true">#</a> TLS 第三次握手</h3>
<p>客户端收到了服务端的证书后，自然要校验证书是否合法，如果证书合法，那么服务端到身份就是没问题的。校验证书的过程会走证书链逐级验证，确认证书的真实性，再用证书的公钥验证签名，这样就能确认服务端的身份了，确认无误后，就可以继续往下走。</p>
<p>客户端会生成一个随机数作为客户端椭圆曲线的私钥，然后再根据服务端前面给的信息，生成<strong>客户端的椭圆曲线公钥</strong>，然后用「<strong>Client Key Exchange</strong>」消息发给服务端。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/ech_clientkeyexchange.png" alt=""></p>
<p>至此，双方都有对方的椭圆曲线公钥、自己的椭圆曲线私钥、椭圆曲线基点 G。于是，双方都就计算出点（x，y），其中 x 坐标值双方都是一样的，前面说 ECDHE 算法时候，说  x 是会话密钥，<strong>但实际应用中，x 还不是最终的会话密钥</strong>。</p>
<p>还记得 TLS 握手阶段，客户端和服务端都会生成了一个随机数传递给对方吗？</p>
<p><strong>最终的会话密钥，就是用「客户端随机数 + 服务端随机数 + x（ECDHE 算法算出的共享密钥） 」三个材料生成的</strong>。</p>
<p>之所以这么麻烦，是因为 TLS 设计者不信任客户端或服务器「伪随机数」的可靠性，为了保证真正的完全随机，把三个不可靠的随机数混合起来，那么「随机」的程度就非常高了，足够让黑客计算不出最终的会话密钥，安全性更高。</p>
<p>算好会话密钥后，客户端会发一个「<strong>Change Cipher Spec</strong>」消息，告诉服务端后续改用对称算法加密通信。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/ech_schangecipherspec.png" alt=""></p>
<p>接着，客户端会发「<strong>Encrypted Handshake Message</strong>」消息，把之前发送的数据做一个摘要，再用对称密钥加密一下，让服务端做个验证，验证下本次生成的对称密钥是否可以正常使用。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/ech_encryptedhandshakemessage.png" alt=""></p>
<h3 id="tls-第四次握手" tabindex="-1"><a class="header-anchor" href="#tls-第四次握手" aria-hidden="true">#</a> TLS 第四次握手</h3>
<p>最后，服务端也会有一个同样的操作，发「<strong>Change Cipher Spec</strong>」和「<strong>Encrypted Handshake Message</strong>」消息，如果双方都验证加密和解密没问题，那么握手正式完成。于是，就可以正常收发加密的 HTTP 请求和响应了。</p>
<hr>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>RSA  和 ECDHE 握手过程的区别：</p>
<ul>
<li>RSA 密钥协商算法「不支持」前向保密，ECDHE 密钥协商算法「支持」前向保密；</li>
<li>使用了 RSA 密钥协商算法，TLS 完成四次握手后，才能进行应用数据传输，而对于 ECDHE 算法，客户端可以不用等服务端的最后一次 TLS 握手，就可以提前发出加密的 HTTP 数据，节省了一个消息的往返时间（这个是 RFC 文档规定的，具体原因文档没有说明，所以这点我也不太明白）；</li>
<li>使用 ECDHE， 在 TLS 第 2 次握手中，会出现服务器端发出的「Server Key Exchange」消息，而 RSA 握手过程没有该消息；</li>
</ul>
<hr>
<p>参考资料：</p>
<ol>
<li>https://zh.wikipedia.org/wiki/橢圓曲線迪菲-赫爾曼金鑰交換</li>
<li>https://zh.wikipedia.org/wiki/椭圆曲线</li>
<li>https://zh.wikipedia.org/wiki/迪菲-赫爾曼密鑰交換</li>
<li>https://time.geekbang.org/column/article/148188</li>
<li>https://zhuanlan.zhihu.com/p/106967180</li>
</ol>
<hr>
</div></template>


