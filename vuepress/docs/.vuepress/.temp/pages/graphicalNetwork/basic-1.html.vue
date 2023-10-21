<template><div><h1 id="tcp-ip-网络模型有哪几层" tabindex="-1"><a class="header-anchor" href="#tcp-ip-网络模型有哪几层" aria-hidden="true">#</a> TCP/IP 网络模型有哪几层？</h1>
<p>问大家，为什么要有 TCP/IP 网络模型？</p>
<p>对于同一台设备上的进程间通信，有很多种方式，比如有管道、消息队列、共享内存、信号等方式，而对于不同设备上的进程间通信，就需要网络通信，而设备是多样性的，所以要兼容多种多样的设备，就协商出了一套<strong>通用的网络协议</strong>。</p>
<p>这个网络协议是分层的，每一层都有各自的作用和职责，接下来就根据「 TCP/IP 网络模型」分别对每一层进行介绍。</p>
<h2 id="应用层" tabindex="-1"><a class="header-anchor" href="#应用层" aria-hidden="true">#</a> 应用层</h2>
<p>最上层的，也是我们能直接接触到的就是<strong>应用层</strong>（<em>Application Layer</em>），我们电脑或手机使用的应用软件都是在应用层实现。那么，当两个不同设备的应用需要通信的时候，应用就把应用数据传给下一层，也就是传输层。</p>
<p>所以，应用层只需要专注于为用户提供应用功能，比如 HTTP、FTP、Telnet、DNS、SMTP等。</p>
<p>应用层是不用去关心数据是如何传输的，就类似于，我们寄快递的时候，只需要把包裹交给快递员，由他负责运输快递，我们不需要关心快递是如何被运输的。</p>
<p>而且应用层是工作在操作系统中的用户态，传输层及以下则工作在内核态。</p>
<h2 id="传输层" tabindex="-1"><a class="header-anchor" href="#传输层" aria-hidden="true">#</a> 传输层</h2>
<p>应用层的数据包会传给传输层，<strong>传输层</strong>（<em>Transport Layer</em>）是为应用层提供网络支持的。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/应用层.png" alt=""></p>
<p>在传输层会有两个传输协议，分别是 TCP 和 UDP。</p>
<p>TCP 的全称叫传输控制协议（<em>Transmission Control Protocol</em>），大部分应用使用的正是 TCP 传输层协议，比如 HTTP 应用层协议。TCP 相比  UDP 多了很多特性，比如流量控制、超时重传、拥塞控制等，这些都是为了保证数据包能可靠地传输给对方。</p>
<p>UDP 相对来说就很简单，简单到只负责发送数据包，不保证数据包是否能抵达对方，但它实时性相对更好，传输效率也高。当然，UDP 也可以实现可靠传输，把 TCP 的特性在应用层上实现就可以，不过要实现一个商用的可靠 UDP 传输协议，也不是一件简单的事情。</p>
<p>应用需要传输的数据可能会非常大，如果直接传输就不好控制，因此当传输层的数据包大小超过 MSS（TCP 最大报文段长度） ，就要将数据包分块，这样即使中途有一个分块丢失或损坏了，只需要重新发送这一个分块，而不用重新发送整个数据包。在 TCP 协议中，我们把每个分块称为一个 <strong>TCP 段</strong>（<em>TCP Segment</em>）。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/TCP段.png" alt=""></p>
<p>当设备作为接收方时，传输层则要负责把数据包传给应用，但是一台设备上可能会有很多应用在接收或者传输数据，因此需要用一个编号将应用区分开来，这个编号就是<strong>端口</strong>。</p>
<p>比如 80 端口通常是 Web 服务器用的，22 端口通常是远程登录服务器用的。而对于浏览器（客户端）中的每个标签栏都是一个独立的进程，操作系统会为这些进程分配临时的端口号。</p>
<p>由于传输层的报文中会携带端口号，因此接收方可以识别出该报文是发送给哪个应用。</p>
<h2 id="网络层" tabindex="-1"><a class="header-anchor" href="#网络层" aria-hidden="true">#</a> 网络层</h2>
<p>传输层可能大家刚接触的时候，会认为它负责将数据从一个设备传输到另一个设备，事实上它并不负责。</p>
<p>实际场景中的网络环节是错综复杂的，中间有各种各样的线路和分叉路口，如果一个设备的数据要传输给另一个设备，就需要在各种各样的路径和节点进行选择，而传输层的设计理念是简单、高效、专注，如果传输层还负责这一块功能就有点违背设计原则了。</p>
<p>也就是说，我们不希望传输层协议处理太多的事情，只需要服务好应用即可，让其作为应用间数据传输的媒介，帮助实现应用到应用的通信，而实际的传输功能就交给下一层，也就是<strong>网络层</strong>（<em>Internet Layer</em>）。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/网络层.png" alt=""></p>
<p>网络层最常使用的是 IP 协议（<em>Internet Protocol</em>），IP 协议会将传输层的报文作为数据部分，再加上 IP 报头组装成 IP 报文，如果 IP 报文大小超过 MTU（以太网中一般为 1500 字节）就会<strong>再次进行分片</strong>，得到一个即将发送到网络的 IP 报文。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/键入网址过程/12.jpg" alt=""></p>
<p>网络层负责将数据从一个设备传输到另一个设备，世界上那么多设备，又该如何找到对方呢？因此，网络层需要有区分设备的编号。</p>
<p>我们一般用 IP 地址给设备进行编号，对于 IPv4 协议， IP 地址共 32 位，分成了四段（比如，192.168.100.1），每段是 8 位。只有一个单纯的 IP 地址虽然做到了区分设备，但是寻址起来就特别麻烦，全世界那么多台设备，难道一个一个去匹配？这显然不科学。</p>
<p>因此，需要将 IP 地址分成两种意义：</p>
<ul>
<li>一个是<strong>网络号</strong>，负责标识该 IP 地址是属于哪个「子网」的；</li>
<li>一个是<strong>主机号</strong>，负责标识同一「子网」下的不同主机；</li>
</ul>
<p>怎么分的呢？这需要配合<strong>子网掩码</strong>才能算出 IP 地址 的网络号和主机号。</p>
<p>举个例子，比如 10.100.122.0/24，后面的<code v-pre>/24</code>表示就是 <code v-pre>255.255.255.0</code> 子网掩码，255.255.255.0 二进制是「11111111-11111111-11111111-00000000」，大家数数一共多少个1？不用数了，是 24 个1，为了简化子网掩码的表示，用/24代替255.255.255.0。</p>
<p>知道了子网掩码，该怎么计算出网络地址和主机地址呢？</p>
<p>将 10.100.122.2 和 255.255.255.0 进行<strong>按位与运算</strong>，就可以得到网络号，如下图：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/IP/16.jpg" alt="img"></p>
<p>将 255.255.255.0 取反后与IP地址进行进行<strong>按位与运算</strong>，就可以得到主机号。</p>
<p>大家可以去搜索下子网掩码计算器，自己改变下「掩码位」的数值，就能体会到子网掩码的作用了。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4/网络/子网掩码计算器.png" alt="子网掩码计算器"></p>
<p>那么在寻址的过程中，先匹配到相同的网络号（表示要找到同一个子网），才会去找对应的主机。</p>
<p>除了寻址能力， IP 协议还有另一个重要的能力就是<strong>路由</strong>。实际场景中，两台设备并不是用一条网线连接起来的，而是通过很多网关、路由器、交换机等众多网络设备连接起来的，那么就会形成很多条网络的路径，因此当数据包到达一个网络节点，就需要通过路由算法决定下一步走哪条路径。</p>
<p>路由器寻址工作中，就是要找到目标地址的子网，找到后进而把数据包转发给对应的网络内。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/计算机网络/IP/17.jpg" alt="IP地址的网络号"></p>
<p>所以，<strong>IP 协议的寻址作用是告诉我们去往下一个目的地该朝哪个方向走，路由则是根据「下一个目的地」选择路径。寻址更像在导航，路由更像在操作方向盘</strong>。</p>
<h2 id="网络接口层" tabindex="-1"><a class="header-anchor" href="#网络接口层" aria-hidden="true">#</a> 网络接口层</h2>
<p>生成了 IP 头部之后，接下来要交给<strong>网络接口层</strong>（<em>Link Layer</em>）在 IP 头部的前面加上 MAC 头部，并封装成数据帧（Data frame）发送到网络上。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/https/网络接口层.png" alt=""></p>
<p>IP 头部中的接收方 IP 地址表示网络包的目的地，通过这个地址我们就可以判断要将包发到哪里，但在以太网的世界中，这个思路是行不通的。</p>
<p>什么是以太网呢？电脑上的以太网接口，Wi-Fi 接口，以太网交换机、路由器上的千兆，万兆以太网口，还有网线，它们都是以太网的组成部分。以太网就是一种在「局域网」内，把附近的设备连接起来，使它们之间可以进行通讯的技术。</p>
<p>以太网在判断网络包目的地时和 IP 的方式不同，因此必须采用相匹配的方式才能在以太网中将包发往目的地，而 MAC 头部就是干这个用的，所以，在以太网进行通讯要用到 MAC 地址。</p>
<p>MAC 头部是以太网使用的头部，它包含了接收方和发送方的 MAC 地址等信息，我们可以通过 ARP 协议获取对方的 MAC 地址。</p>
<p>所以说，网络接口层主要为网络层提供「链路级别」传输的服务，负责在以太网、WiFi 这样的底层网络上发送原始数据包，工作在网卡这个层次，使用 MAC 地址来标识网络上的设备。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>综上所述，TCP/IP 网络通常是由上到下分成 4 层，分别是<strong>应用层，传输层，网络层和网络接口层</strong>。</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/网络/tcpip参考模型.drawio.png" alt=""></p>
<p>再给大家贴一下每一层的封装格式：</p>
<p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost3@main/操作系统/浮点/封装.png" alt="img"></p>
<p>网络接口层的传输单位是帧（frame），IP 层的传输单位是包（packet），TCP 层的传输单位是段（segment），HTTP 的传输单位则是消息或报文（message）。但这些名词并没有什么本质的区分，可以统称为数据包。</p>
</div></template>


