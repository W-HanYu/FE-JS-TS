import{_ as i,r as s,o,c as a,e,d as c,a as p,f as n}from"./app.d6a6c857.js";const l={},r=n(`<h1 id="syn-\u62A5\u6587\u4EC0\u4E48\u65F6\u5019\u60C5\u51B5\u4E0B\u4F1A\u88AB\u4E22\u5F03" tabindex="-1"><a class="header-anchor" href="#syn-\u62A5\u6587\u4EC0\u4E48\u65F6\u5019\u60C5\u51B5\u4E0B\u4F1A\u88AB\u4E22\u5F03" aria-hidden="true">#</a> SYN \u62A5\u6587\u4EC0\u4E48\u65F6\u5019\u60C5\u51B5\u4E0B\u4F1A\u88AB\u4E22\u5F03\uFF1F</h1><p>\u9996\u5148\u629B\u51FA\u6765\u4E00\u4E2A\u95EE\u9898\uFF1A</p><blockquote><p>syn \u5305\u4EC0\u4E48\u65F6\u5019\u4F1A\u88AB\u4E22\u5F03\uFF1F</p></blockquote><p>\u8FD9\u4E2A\u95EE\u9898\u8DDF\u5DE5\u4F5C\u4E0A\u4E5F\u662F\u6709\u5173\u7CFB\u7684\uFF0C\u56E0\u4E3A\u6211\u5C31\u5728\u5DE5\u4F5C\u4E2D\u78B0\u5230\u8FD9\u4E48\u5947\u602A\u7684\u65F6\u5019\uFF0C\u5BA2\u6237\u7AEF\u5411\u670D\u52A1\u7AEF\u53D1\u8D77\u4E86\u8FDE\u63A5\uFF0C\u4F46\u662F\u8FDE\u63A5\u5E76\u6CA1\u6709\u5EFA\u7ACB\u8D77\u6765\uFF0C\u901A\u8FC7\u6293\u5305\u5206\u6790\u53D1\u73B0\uFF0C\u670D\u52A1\u7AEF\u662F\u6536\u5230 SYN \u62A5\u6587\u4E86\uFF0C\u4F46\u662F\u5E76\u6CA1\u6709\u56DE\u590D SYN+ACK\uFF08TCP \u7B2C\u4E8C\u6B21\u63E1\u624B\uFF09\uFF0C\u8BF4\u660E SYN \u62A5\u6587\u88AB\u670D\u52A1\u7AEF\u5FFD\u7565\u4E86\uFF0C\u7136\u540E\u5BA2\u6237\u7AEF\u5C31\u4E00\u76F4\u5728\u8D85\u65F6\u91CD\u4F20 SYN \u62A5\u6587\uFF0C\u76F4\u5230\u8FBE\u5230\u6700\u5927\u7684\u91CD\u4F20\u6B21\u6570\u3002</p><p>\u63A5\u4E0B\u6765\uFF0C\u6211\u5C31\u7ED9\u51FA\u6211\u9047\u5230\u8FC7 SYN \u62A5\u6587\u88AB\u4E22\u5F03\u7684\u4E24\u79CD\u573A\u666F\uFF1A</p><ul><li><p>\u5F00\u542F tcp_tw_recycle \u53C2\u6570\uFF0C\u5E76\u4E14\u5728 NAT \u73AF\u5883\u4E0B\uFF0C\u9020\u6210 SYN \u62A5\u6587\u88AB\u4E22\u5F03</p></li><li><p>TCP \u4E24\u4E2A\u961F\u5217\u6EE1\u4E86\uFF08\u534A\u8FDE\u63A5\u961F\u5217\u548C\u5168\u8FDE\u63A5\u961F\u5217\uFF09\uFF0C\u9020\u6210 SYN \u62A5\u6587\u88AB\u4E22\u5F03</p></li></ul><h2 id="\u5751\u7239\u7684-tcp-tw-recycle" tabindex="-1"><a class="header-anchor" href="#\u5751\u7239\u7684-tcp-tw-recycle" aria-hidden="true">#</a> \u5751\u7239\u7684 tcp_tw_recycle</h2><p>TCP \u56DB\u6B21\u6325\u624B\u8FC7\u7A0B\u4E2D\uFF0C\u4E3B\u52A8\u65AD\u5F00\u8FDE\u63A5\u65B9\u4F1A\u6709\u4E00\u4E2A TIME_WAIT \u7684\u72B6\u6001\uFF0C\u8FD9\u4E2A\u72B6\u6001\u4F1A\u6301\u7EED 2 MSL \u540E\u624D\u4F1A\u8F6C\u53D8\u4E3A CLOSED \u72B6\u6001\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/bee0c8e8d84047e7434803fb340f9e5d.png" alt=""></p><p>\u5728 Linux \u64CD\u4F5C\u7CFB\u7EDF\u4E0B\uFF0CTIME_WAIT \u72B6\u6001\u7684\u6301\u7EED\u65F6\u95F4\u662F 60 \u79D2\uFF0C\u8FD9\u610F\u5473\u7740\u8FD9 60 \u79D2\u5185\uFF0C\u5BA2\u6237\u7AEF\u4E00\u76F4\u4F1A\u5360\u7528\u7740\u8FD9\u4E2A\u7AEF\u53E3\u3002\u8981\u77E5\u9053\uFF0C\u7AEF\u53E3\u8D44\u6E90\u4E5F\u662F\u6709\u9650\u7684\uFF0C\u4E00\u822C\u53EF\u4EE5\u5F00\u542F\u7684\u7AEF\u53E3\u4E3A 32768~61000 \uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7\u5982\u4E0B\u53C2\u6570\u8BBE\u7F6E\u6307\u5B9A\u8303\u56F4\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> net.ipv4.ip_local_port_range
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,11),g=e("strong",null,"\u5982\u679C\u5BA2\u6237\u7AEF\uFF08\u53D1\u8D77\u8FDE\u63A5\u65B9\uFF09\u7684 TIME_WAIT \u72B6\u6001\u8FC7\u591A",-1),m={href:"https://xiaolincoding.com/network/3_tcp/port.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%9A%84%E7%AB%AF%E5%8F%A3%E5%8F%AF%E4%BB%A5%E9%87%8D%E5%A4%8D%E4%BD%BF%E7%94%A8%E5%90%97",target:"_blank",rel:"noopener noreferrer"},_=n('<p>\u56E0\u6B64\uFF0C\u5BA2\u6237\u7AEF\uFF08\u53D1\u8D77\u8FDE\u63A5\u65B9\uFF09\u90FD\u662F\u548C\u300C\u76EE\u7684 IP+ \u76EE\u7684 PORT \u300D\u90FD\u4E00\u6837\u7684\u670D\u52A1\u5668\u5EFA\u7ACB\u8FDE\u63A5\u7684\u8BDD\uFF0C\u5F53\u5BA2\u6237\u7AEF\u7684 TIME_WAIT \u72B6\u6001\u8FDE\u63A5\u8FC7\u591A\u7684\u8BDD\uFF0C\u5C31\u4F1A\u53D7\u7AEF\u53E3\u8D44\u6E90\u9650\u5236\uFF0C\u5982\u679C\u5360\u6EE1\u4E86\u6240\u6709\u7AEF\u53E3\u8D44\u6E90\uFF0C\u90A3\u4E48\u5C31\u65E0\u6CD5\u518D\u8DDF\u300C\u76EE\u7684 IP+ \u76EE\u7684 PORT\u300D\u90FD\u4E00\u6837\u7684\u670D\u52A1\u5668\u5EFA\u7ACB\u8FDE\u63A5\u4E86\u3002</p><p>\u4E0D\u8FC7\uFF0C\u5373\u4F7F\u662F\u5728\u8FD9\u79CD\u573A\u666F\u4E0B\uFF0C\u53EA\u8981\u8FDE\u63A5\u7684\u662F\u4E0D\u540C\u7684\u670D\u52A1\u5668\uFF0C\u7AEF\u53E3\u662F\u53EF\u4EE5\u91CD\u590D\u4F7F\u7528\u7684\uFF0C\u6240\u4EE5\u5BA2\u6237\u7AEF\u8FD8\u662F\u53EF\u4EE5\u5411\u5176\u4ED6\u670D\u52A1\u5668\u53D1\u8D77\u8FDE\u63A5\u7684\uFF0C\u8FD9\u662F\u56E0\u4E3A\u5185\u6838\u5728\u5B9A\u4F4D\u4E00\u4E2A\u8FDE\u63A5\u7684\u65F6\u5019\uFF0C\u662F\u901A\u8FC7\u56DB\u5143\u7EC4\uFF08\u6E90IP\u3001\u6E90\u7AEF\u53E3\u3001\u76EE\u7684IP\u3001\u76EE\u7684\u7AEF\u53E3\uFF09\u4FE1\u606F\u6765\u5B9A\u4F4D\u7684\uFF0C\u5E76\u4E0D\u4F1A\u56E0\u4E3A\u5BA2\u6237\u7AEF\u7684\u7AEF\u53E3\u4E00\u6837\uFF0C\u800C\u5BFC\u81F4\u8FDE\u63A5\u51B2\u7A81\u3002</p><p>\u4F46\u662F TIME_WAIT \u72B6\u6001\u4E5F\u4E0D\u662F\u6446\u8BBE\u4F5C\u7528\uFF0C\u5B83\u7684\u4F5C\u7528\u6709\u4E24\u4E2A\uFF1A</p><ul><li>\u9632\u6B62\u5177\u6709\u76F8\u540C\u56DB\u5143\u7EC4\u7684\u65E7\u6570\u636E\u5305\u88AB\u6536\u5230\uFF0C\u4E5F\u5C31\u662F\u9632\u6B62\u5386\u53F2\u8FDE\u63A5\u4E2D\u7684\u6570\u636E\uFF0C\u88AB\u540E\u9762\u7684\u8FDE\u63A5\u63A5\u53D7\uFF0C\u5426\u5219\u5C31\u4F1A\u5BFC\u81F4\u540E\u9762\u7684\u8FDE\u63A5\u6536\u5230\u4E00\u4E2A\u65E0\u6548\u7684\u6570\u636E\uFF0C</li><li>\u4FDD\u8BC1\u300C\u88AB\u52A8\u5173\u95ED\u8FDE\u63A5\u300D\u7684\u4E00\u65B9\u80FD\u88AB\u6B63\u786E\u7684\u5173\u95ED\uFF0C\u5373\u4FDD\u8BC1\u6700\u540E\u7684 ACK \u80FD\u8BA9\u88AB\u52A8\u5173\u95ED\u65B9\u63A5\u6536\uFF0C\u4ECE\u800C\u5E2E\u52A9\u5176\u6B63\u5E38\u5173\u95ED;</li></ul><p>\u4E0D\u8FC7\uFF0CLinux \u64CD\u4F5C\u7CFB\u7EDF\u63D0\u4F9B\u4E86\u4E24\u4E2A\u53EF\u4EE5\u7CFB\u7EDF\u53C2\u6570\u6765\u5FEB\u901F\u56DE\u6536\u5904\u4E8E TIME_WAIT \u72B6\u6001\u7684\u8FDE\u63A5\uFF0C\u8FD9\u4E24\u4E2A\u53C2\u6570\u90FD\u662F\u9ED8\u8BA4\u5173\u95ED\u7684\uFF1A</p><ul><li>net.ipv4.tcp_tw_reuse\uFF0C\u5982\u679C\u5F00\u542F\u8BE5\u9009\u9879\u7684\u8BDD\uFF0C\u5BA2\u6237\u7AEF\uFF08\u8FDE\u63A5\u53D1\u8D77\u65B9\uFF09 \u5728\u8C03\u7528 connect() \u51FD\u6570\u65F6\uFF0C**\u5982\u679C\u5185\u6838\u9009\u62E9\u5230\u7684\u7AEF\u53E3\uFF0C\u5DF2\u7ECF\u88AB\u76F8\u540C\u56DB\u5143\u7EC4\u7684\u8FDE\u63A5\u5360\u7528\u7684\u65F6\u5019\uFF0C\u5C31\u4F1A\u5224\u65AD\u8BE5\u8FDE\u63A5\u662F\u5426\u5904\u4E8E TIME_WAIT \u72B6\u6001\uFF0C\u5982\u679C\u8BE5\u8FDE\u63A5\u5904\u4E8E TIME_WAIT \u72B6\u6001\u5E76\u4E14 TIME_WAIT \u72B6\u6001\u6301\u7EED\u7684\u65F6\u95F4\u8D85\u8FC7\u4E86 1 \u79D2\uFF0C\u90A3\u4E48\u5C31\u4F1A\u91CD\u7528\u8FD9\u4E2A\u8FDE\u63A5\uFF0C\u7136\u540E\u5C31\u53EF\u4EE5\u6B63\u5E38\u4F7F\u7528\u8BE5\u7AEF\u53E3\u4E86\u3002**\u6240\u4EE5\u8BE5\u9009\u9879\u53EA\u9002\u7528\u4E8E\u8FDE\u63A5\u53D1\u8D77\u65B9\u3002</li><li>net.ipv4.tcp_tw_recycle\uFF0C\u5982\u679C\u5F00\u542F\u8BE5\u9009\u9879\u7684\u8BDD\uFF0C\u5141\u8BB8\u5904\u4E8E TIME_WAIT \u72B6\u6001\u7684\u8FDE\u63A5\u88AB\u5FEB\u901F\u56DE\u6536\uFF1B</li></ul><p>\u8981\u4F7F\u5F97\u8FD9\u4E24\u4E2A\u9009\u9879\u751F\u6548\uFF0C\u6709\u4E00\u4E2A\u524D\u63D0\u6761\u4EF6\uFF0C\u5C31\u662F\u8981\u6253\u5F00 TCP \u65F6\u95F4\u6233\uFF0C\u5373 net.ipv4.tcp_timestamps=1\uFF08\u9ED8\u8BA4\u5373\u4E3A 1)\uFF09\u3002</p><p><strong>tcp_tw_recycle \u5728\u4F7F\u7528\u4E86 NAT \u7684\u7F51\u7EDC\u4E0B\u662F\u4E0D\u5B89\u5168\u7684\uFF01</strong></p><p>\u5BF9\u4E8E\u670D\u52A1\u5668\u6765\u8BF4\uFF0C\u5982\u679C\u540C\u65F6\u5F00\u542F\u4E86recycle \u548C timestamps \u9009\u9879\uFF0C\u5219\u4F1A\u5F00\u542F\u4E00\u79CD\u79F0\u4E4B\u4E3A\u300C per-host \u7684 PAWS \u673A\u5236\u300D\u3002</p><blockquote><p>\u9996\u5148\u7ED9\u5927\u5BB6\u8BF4\u8BF4\u4EC0\u4E48\u662F PAWS \u673A\u5236\uFF1F</p></blockquote><p>tcp_timestamps \u9009\u9879\u5F00\u542F\u4E4B\u540E\uFF0C PAWS \u673A\u5236\u4F1A\u81EA\u52A8\u5F00\u542F\uFF0C\u5B83\u7684\u4F5C\u7528\u662F\u9632\u6B62 TCP \u5305\u4E2D\u7684\u5E8F\u5217\u53F7\u53D1\u751F\u7ED5\u56DE\u3002</p><p>\u6B63\u5E38\u6765\u8BF4\u6BCF\u4E2A TCP \u5305\u90FD\u4F1A\u6709\u81EA\u5DF1\u552F\u4E00\u7684 SEQ\uFF0C\u51FA\u73B0 TCP \u6570\u636E\u5305\u91CD\u4F20\u7684\u65F6\u5019\u4F1A\u590D\u7528 SEQ \u53F7\uFF0C\u8FD9\u6837\u63A5\u6536\u65B9\u80FD\u901A\u8FC7 SEQ \u53F7\u6765\u5224\u65AD\u6570\u636E\u5305\u7684\u552F\u4E00\u6027\uFF0C\u4E5F\u80FD\u5728\u91CD\u590D\u6536\u5230\u67D0\u4E2A\u6570\u636E\u5305\u7684\u65F6\u5019\u5224\u65AD\u6570\u636E\u662F\u4E0D\u662F\u91CD\u4F20\u7684\u3002<strong>\u4F46\u662F TCP \u8FD9\u4E2A SEQ \u53F7\u662F\u6709\u9650\u7684\uFF0C\u4E00\u5171 32 bit\uFF0CSEQ \u5F00\u59CB\u662F\u9012\u589E\uFF0C\u6EA2\u51FA\u4E4B\u540E\u4ECE 0 \u5F00\u59CB\u518D\u6B21\u4F9D\u6B21\u9012\u589E</strong>\u3002</p><p>\u6240\u4EE5\u5F53 SEQ \u53F7\u51FA\u73B0\u6EA2\u51FA\u540E\u5355\u7EAF\u901A\u8FC7 SEQ \u53F7\u65E0\u6CD5\u6807\u8BC6\u6570\u636E\u5305\u7684\u552F\u4E00\u6027\uFF0C\u67D0\u4E2A\u6570\u636E\u5305\u5EF6\u8FDF\u6216\u56E0\u91CD\u53D1\u800C\u5EF6\u8FDF\u65F6\u53EF\u80FD\u5BFC\u81F4\u8FDE\u63A5\u4F20\u9012\u7684\u6570\u636E\u88AB\u7834\u574F\uFF0C\u6BD4\u5982\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/img_convert/f5fbe947240026cc2f076267cb698496.png" alt=""></p><p>\u4E0A\u56FE A \u6570\u636E\u5305\u51FA\u73B0\u4E86\u91CD\u4F20\uFF0C\u5E76\u5728 SEQ \u53F7\u8017\u5C3D\u518D\u6B21\u4ECE A \u9012\u589E\u65F6\uFF0C\u7B2C\u4E00\u6B21\u53D1\u7684 A \u6570\u636E\u5305\u5EF6\u8FDF\u5230\u8FBE\u4E86 Server\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4E0B\u5982\u679C\u6CA1\u6709\u522B\u7684\u673A\u5236\u6765\u4FDD\u8BC1\uFF0CServer \u4F1A\u8BA4\u4E3A\u5EF6\u8FDF\u5230\u8FBE\u7684 A \u6570\u636E\u5305\u662F\u6B63\u786E\u7684\u800C\u63A5\u6536\uFF0C\u53CD\u800C\u662F\u5C06\u6B63\u5E38\u7684\u7B2C\u4E09\u6B21\u53D1\u7684 SEQ \u4E3A A \u7684\u6570\u636E\u5305\u4E22\u5F03\uFF0C\u9020\u6210\u6570\u636E\u4F20\u8F93\u9519\u8BEF\u3002</p><p>PAWS \u5C31\u662F\u4E3A\u4E86\u907F\u514D\u8FD9\u4E2A\u95EE\u9898\u800C\u4EA7\u751F\u7684\uFF0C\u5728\u5F00\u542F tcp_timestamps \u9009\u9879\u60C5\u51B5\u4E0B\uFF0C\u4E00\u53F0\u673A\u5668\u53D1\u7684\u6240\u6709 TCP \u5305\u90FD\u4F1A\u5E26\u4E0A\u53D1\u9001\u65F6\u7684\u65F6\u95F4\u6233\uFF0CPAWS \u8981\u6C42\u8FDE\u63A5\u53CC\u65B9\u7EF4\u62A4\u6700\u8FD1\u4E00\u6B21\u6536\u5230\u7684\u6570\u636E\u5305\u7684\u65F6\u95F4\u6233\uFF08Recent TSval\uFF09\uFF0C\u6BCF\u6536\u5230\u4E00\u4E2A\u65B0\u6570\u636E\u5305\u90FD\u4F1A\u8BFB\u53D6\u6570\u636E\u5305\u4E2D\u7684\u65F6\u95F4\u6233\u503C\u8DDF Recent TSval \u503C\u505A\u6BD4\u8F83\uFF0C<strong>\u5982\u679C\u53D1\u73B0\u6536\u5230\u7684\u6570\u636E\u5305\u4E2D\u65F6\u95F4\u6233\u4E0D\u662F\u9012\u589E\u7684\uFF0C\u5219\u8868\u793A\u8BE5\u6570\u636E\u5305\u662F\u8FC7\u671F\u7684\uFF0C\u5C31\u4F1A\u76F4\u63A5\u4E22\u5F03\u8FD9\u4E2A\u6570\u636E\u5305</strong>\u3002</p><p>\u5BF9\u4E8E\u4E0A\u9762\u56FE\u4E2D\u7684\u4F8B\u5B50\u6709\u4E86 PAWS \u673A\u5236\u5C31\u80FD\u505A\u5230\u5728\u6536\u5230 Delay \u5230\u8FBE\u7684 A \u53F7\u6570\u636E\u5305\u65F6\uFF0C\u8BC6\u522B\u51FA\u5B83\u662F\u4E2A\u8FC7\u671F\u7684\u6570\u636E\u5305\u800C\u5C06\u5176\u4E22\u6389\u3002</p><blockquote><p>\u90A3\u4EC0\u4E48\u662F per-host \u7684 PAWS \u673A\u5236\u5462\uFF1F</p></blockquote><p>\u524D\u9762\u6211\u63D0\u5230\uFF0C\u5F00\u542F\u4E86 recycle \u548C timestamps \u9009\u9879\uFF0C\u5C31\u4F1A\u5F00\u542F\u4E00\u79CD\u53EB per-host \u7684 PAWS \u673A\u5236\u3002<strong>per-host \u662F\u5BF9\u300C\u5BF9\u7AEF IP \u505A PAWS \u68C0\u67E5\u300D</strong>\uFF0C\u800C\u975E\u5BF9\u300CIP + \u7AEF\u53E3\u300D\u56DB\u5143\u7EC4\u505A PAWS \u68C0\u67E5\u3002</p><p>\u4F46\u662F\u5982\u679C\u5BA2\u6237\u7AEF\u7F51\u7EDC\u73AF\u5883\u662F\u7528\u4E86 NAT \u7F51\u5173\uFF0C\u90A3\u4E48\u5BA2\u6237\u7AEF\u73AF\u5883\u7684\u6BCF\u4E00\u53F0\u673A\u5668\u901A\u8FC7 NAT \u7F51\u5173\u540E\uFF0C\u90FD\u4F1A\u662F\u76F8\u540C\u7684 IP \u5730\u5740\uFF0C\u5728\u670D\u52A1\u7AEF\u770B\u6765\uFF0C\u5C31\u597D\u50CF\u53EA\u662F\u5728\u8DDF\u4E00\u4E2A\u5BA2\u6237\u7AEF\u6253\u4EA4\u9053\u4E00\u6837\uFF0C\u65E0\u6CD5\u533A\u5206\u51FA\u6765\u3002</p><p>Per-host PAWS \u673A\u5236\u5229\u7528TCP option\u91CC\u7684 timestamp \u5B57\u6BB5\u7684\u589E\u957F\u6765\u5224\u65AD\u4E32\u6270\u6570\u636E\uFF0C\u800C timestamp \u662F\u6839\u636E\u5BA2\u6237\u7AEF\u5404\u81EA\u7684 CPU tick \u5F97\u51FA\u7684\u503C\u3002</p><p>\u5F53\u5BA2\u6237\u7AEF A \u901A\u8FC7 NAT \u7F51\u5173\u548C\u670D\u52A1\u5668\u5EFA\u7ACB TCP \u8FDE\u63A5\uFF0C\u7136\u540E\u670D\u52A1\u5668\u4E3B\u52A8\u5173\u95ED\u5E76\u4E14\u5FEB\u901F\u56DE\u6536 TIME-WAIT \u72B6\u6001\u7684\u8FDE\u63A5\u540E\uFF0C<strong>\u5BA2\u6237\u7AEF B \u4E5F\u901A\u8FC7 NAT \u7F51\u5173\u548C\u670D\u52A1\u5668\u5EFA\u7ACB TCP \u8FDE\u63A5\uFF0C\u6CE8\u610F\u5BA2\u6237\u7AEF A \u548C \u5BA2\u6237\u7AEF B \u56E0\u4E3A\u7ECF\u8FC7\u76F8\u540C\u7684 NAT \u7F51\u5173\uFF0C\u6240\u4EE5\u662F\u7528\u76F8\u540C\u7684 IP \u5730\u5740\u4E0E\u670D\u52A1\u7AEF\u5EFA\u7ACB TCP \u8FDE\u63A5\uFF0C\u5982\u679C\u5BA2\u6237\u7AEF B \u7684 timestamp \u6BD4 \u5BA2\u6237\u7AEF A \u7684 timestamp \u5C0F\uFF0C\u90A3\u4E48\u7531\u4E8E\u670D\u52A1\u7AEF\u7684 per-host \u7684 PAWS \u673A\u5236\u7684\u4F5C\u7528\uFF0C\u670D\u52A1\u7AEF\u5C31\u4F1A\u4E22\u5F03\u5BA2\u6237\u7AEF\u4E3B\u673A B \u53D1\u6765\u7684 SYN \u5305</strong>\u3002</p><p>\u56E0\u6B64\uFF0Ctcp_tw_recycle \u5728\u4F7F\u7528\u4E86 NAT \u7684\u7F51\u7EDC\u4E0B\u662F\u5B58\u5728\u95EE\u9898\u7684\uFF0C\u5982\u679C\u5B83\u662F\u5BF9 TCP \u56DB\u5143\u7EC4\u505A PAWS \u68C0\u67E5\uFF0C\u800C\u4E0D\u662F\u5BF9\u300C\u76F8\u540C\u7684 IP \u505A PAWS \u68C0\u67E5\u300D\uFF0C\u90A3\u4E48\u5C31\u4E0D\u4F1A\u5B58\u5728\u8FD9\u4E2A\u95EE\u9898\u4E86\u3002</p><p>\u7F51\u4E0A\u5F88\u591A\u535A\u5BA2\u90FD\u8BF4\u5F00\u542F tcp_tw_recycle \u53C2\u6570\u6765\u4F18\u5316 TCP\uFF0C\u6211\u4FE1\u4F60\u4E2A\u9B3C\uFF0C\u7CDF\u8001\u5934\u574F\u7684\u5F88\uFF01</p><p>tcp_tw_recycle \u5728 Linux 4.12 \u7248\u672C\u540E\uFF0C\u76F4\u63A5\u53D6\u6D88\u4E86\u8FD9\u4E00\u53C2\u6570\u3002</p><h2 id="accpet-\u961F\u5217\u6EE1\u4E86" tabindex="-1"><a class="header-anchor" href="#accpet-\u961F\u5217\u6EE1\u4E86" aria-hidden="true">#</a> accpet \u961F\u5217\u6EE1\u4E86</h2><p>\u5728 TCP \u4E09\u6B21\u63E1\u624B\u7684\u65F6\u5019\uFF0CLinux \u5185\u6838\u4F1A\u7EF4\u62A4\u4E24\u4E2A\u961F\u5217\uFF0C\u5206\u522B\u662F\uFF1A</p><ul><li>\u534A\u8FDE\u63A5\u961F\u5217\uFF0C\u4E5F\u79F0 SYN \u961F\u5217\uFF1B</li><li>\u5168\u8FDE\u63A5\u961F\u5217\uFF0C\u4E5F\u79F0 accepet \u961F\u5217\uFF1B</li></ul><p>\u670D\u52A1\u7AEF\u6536\u5230\u5BA2\u6237\u7AEF\u53D1\u8D77\u7684 SYN \u8BF7\u6C42\u540E\uFF0C<strong>\u5185\u6838\u4F1A\u628A\u8BE5\u8FDE\u63A5\u5B58\u50A8\u5230\u534A\u8FDE\u63A5\u961F\u5217</strong>\uFF0C\u5E76\u5411\u5BA2\u6237\u7AEF\u54CD\u5E94 SYN+ACK\uFF0C\u63A5\u7740\u5BA2\u6237\u7AEF\u4F1A\u8FD4\u56DE ACK\uFF0C\u670D\u52A1\u7AEF\u6536\u5230\u7B2C\u4E09\u6B21\u63E1\u624B\u7684 ACK \u540E\uFF0C<strong>\u5185\u6838\u4F1A\u628A\u8FDE\u63A5\u4ECE\u534A\u8FDE\u63A5\u961F\u5217\u79FB\u9664\uFF0C\u7136\u540E\u521B\u5EFA\u65B0\u7684\u5B8C\u5168\u7684\u8FDE\u63A5\uFF0C\u5E76\u5C06\u5176\u6DFB\u52A0\u5230 accept \u961F\u5217\uFF0C\u7B49\u5F85\u8FDB\u7A0B\u8C03\u7528 accept \u51FD\u6570\u65F6\u628A\u8FDE\u63A5\u53D6\u51FA\u6765\u3002</strong></p><p><img src="https://img-blog.csdnimg.cn/img_convert/c9959166180b0e239bb48234ff7c2f5b.png" alt=""></p><h3 id="\u534A\u8FDE\u63A5\u961F\u5217\u6EE1\u4E86" tabindex="-1"><a class="header-anchor" href="#\u534A\u8FDE\u63A5\u961F\u5217\u6EE1\u4E86" aria-hidden="true">#</a> \u534A\u8FDE\u63A5\u961F\u5217\u6EE1\u4E86</h3><p>\u5F53\u670D\u52A1\u5668\u9020\u6210syn\u653B\u51FB\uFF0C\u5C31\u6709\u53EF\u80FD\u5BFC\u81F4 <strong>TCP \u534A\u8FDE\u63A5\u961F\u5217\u6EE1\u4E86\uFF0C\u8FD9\u65F6\u540E\u9762\u6765\u7684 syn \u5305\u90FD\u4F1A\u88AB\u4E22\u5F03</strong>\u3002</p><p>\u4F46\u662F\uFF0C<strong>\u5982\u679C\u5F00\u542F\u4E86syncookies \u529F\u80FD\uFF0C\u5373\u4F7F\u534A\u8FDE\u63A5\u961F\u5217\u6EE1\u4E86\uFF0C\u4E5F\u4E0D\u4F1A\u4E22\u5F03syn \u5305</strong>\u3002</p><p>syncookies \u662F\u8FD9\u4E48\u505A\u7684\uFF1A\u670D\u52A1\u5668\u6839\u636E\u5F53\u524D\u72B6\u6001\u8BA1\u7B97\u51FA\u4E00\u4E2A\u503C\uFF0C\u653E\u5728\u5DF1\u65B9\u53D1\u51FA\u7684 SYN+ACK \u62A5\u6587\u4E2D\u53D1\u51FA\uFF0C\u5F53\u5BA2\u6237\u7AEF\u8FD4\u56DE ACK \u62A5\u6587\u65F6\uFF0C\u53D6\u51FA\u8BE5\u503C\u9A8C\u8BC1\uFF0C\u5982\u679C\u5408\u6CD5\uFF0C\u5C31\u8BA4\u4E3A\u8FDE\u63A5\u5EFA\u7ACB\u6210\u529F\uFF0C\u5982\u4E0B\u56FE\u6240\u793A\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/58e01036d1febd0103dd0ec4d5acff05.png" alt=""></p><p>syncookies \u53C2\u6570\u4E3B\u8981\u6709\u4EE5\u4E0B\u4E09\u4E2A\u503C\uFF1A</p><ul><li>0 \u503C\uFF0C\u8868\u793A\u5173\u95ED\u8BE5\u529F\u80FD\uFF1B</li><li>1 \u503C\uFF0C\u8868\u793A\u4EC5\u5F53 SYN \u534A\u8FDE\u63A5\u961F\u5217\u653E\u4E0D\u4E0B\u65F6\uFF0C\u518D\u542F\u7528\u5B83\uFF1B</li><li>2 \u503C\uFF0C\u8868\u793A\u65E0\u6761\u4EF6\u5F00\u542F\u529F\u80FD\uFF1B</li></ul><p>\u90A3\u4E48\u5728\u5E94\u5BF9 SYN \u653B\u51FB\u65F6\uFF0C\u53EA\u9700\u8981\u8BBE\u7F6E\u4E3A 1 \u5373\u53EF\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/img_convert/e795b4ff5be76c85814ee190b4921f25.png" alt=""></p><p>\u8FD9\u91CC\u7ED9\u51FA\u51E0\u79CD\u9632\u5FA1 SYN \u653B\u51FB\u7684\u65B9\u6CD5\uFF1A</p><ul><li>\u589E\u5927\u534A\u8FDE\u63A5\u961F\u5217\uFF1B</li><li>\u5F00\u542F tcp_syncookies \u529F\u80FD</li><li>\u51CF\u5C11 SYN+ACK \u91CD\u4F20\u6B21\u6570</li></ul><p><em>\u65B9\u5F0F\u4E00\uFF1A\u589E\u5927\u534A\u8FDE\u63A5\u961F\u5217</em></p><p><strong>\u8981\u60F3\u589E\u5927\u534A\u8FDE\u63A5\u961F\u5217\uFF0C\u6211\u4EEC\u5F97\u77E5\u4E0D\u80FD\u53EA\u5355\u7EAF\u589E\u5927 tcp_max_syn_backlog \u7684\u503C\uFF0C\u8FD8\u9700\u4E00\u540C\u589E\u5927 somaxconn \u548C backlog\uFF0C\u4E5F\u5C31\u662F\u589E\u5927\u5168\u8FDE\u63A5\u961F\u5217</strong>\u3002\u5426\u5219\uFF0C\u53EA\u5355\u7EAF\u589E\u5927 tcp_max_syn_backlog \u662F\u65E0\u6548\u7684\u3002</p><p>\u589E\u5927 tcp_max_syn_backlog \u548C somaxconn \u7684\u65B9\u6CD5\u662F\u4FEE\u6539 Linux \u5185\u6838\u53C2\u6570\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/img_convert/29f1fd2894162e15cbac938a2373b543.png" alt=""></p><p>\u589E\u5927 backlog \u7684\u65B9\u5F0F\uFF0C\u6BCF\u4E2A Web \u670D\u52A1\u90FD\u4E0D\u540C\uFF0C\u6BD4\u5982 Nginx \u589E\u5927 backlog \u7684\u65B9\u6CD5\u5982\u4E0B\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/img_convert/a6b11fbd1fcb742cdcc87447fc23b73f.png" alt=""></p><p>\u6700\u540E\uFF0C\u6539\u53D8\u4E86\u5982\u4E0A\u8FD9\u4E9B\u53C2\u6570\u540E\uFF0C\u8981\u91CD\u542F Nginx \u670D\u52A1\uFF0C\u56E0\u4E3A\u534A\u8FDE\u63A5\u961F\u5217\u548C\u5168\u8FDE\u63A5\u961F\u5217\u90FD\u662F\u5728 listen() \u521D\u59CB\u5316\u7684\u3002</p><p><em>\u65B9\u5F0F\u4E8C\uFF1A\u5F00\u542F tcp_syncookies \u529F\u80FD</em></p><p>\u5F00\u542F tcp_syncookies \u529F\u80FD\u7684\u65B9\u5F0F\u4E5F\u5F88\u7B80\u5355\uFF0C\u4FEE\u6539 Linux \u5185\u6838\u53C2\u6570\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/img_convert/54b7411607978cb9ff36d88cf47eb5c4.png" alt=""></p><p><em>\u65B9\u5F0F\u4E09\uFF1A\u51CF\u5C11 SYN+ACK \u91CD\u4F20\u6B21\u6570</em></p><p>\u5F53\u670D\u52A1\u7AEF\u53D7\u5230 SYN \u653B\u51FB\u65F6\uFF0C\u5C31\u4F1A\u6709\u5927\u91CF\u5904\u4E8E SYN_RECV \u72B6\u6001\u7684 TCP \u8FDE\u63A5\uFF0C\u5904\u4E8E\u8FD9\u4E2A\u72B6\u6001\u7684 TCP \u4F1A\u91CD\u4F20 SYN+ACK \uFF0C\u5F53\u91CD\u4F20\u8D85\u8FC7\u6B21\u6570\u8FBE\u5230\u4E0A\u9650\u540E\uFF0C\u5C31\u4F1A\u65AD\u5F00\u8FDE\u63A5\u3002</p><p>\u90A3\u4E48\u9488\u5BF9 SYN \u653B\u51FB\u7684\u573A\u666F\uFF0C\u6211\u4EEC\u53EF\u4EE5\u51CF\u5C11 SYN+ACK \u7684\u91CD\u4F20\u6B21\u6570\uFF0C\u4EE5\u52A0\u5FEB\u5904\u4E8E SYN_RECV \u72B6\u6001\u7684 TCP \u8FDE\u63A5\u65AD\u5F00\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/19443a03430368b72c201113150471c5.png" alt=""></p><h3 id="\u5168\u8FDE\u63A5\u961F\u5217\u6EE1\u4E86" tabindex="-1"><a class="header-anchor" href="#\u5168\u8FDE\u63A5\u961F\u5217\u6EE1\u4E86" aria-hidden="true">#</a> \u5168\u8FDE\u63A5\u961F\u5217\u6EE1\u4E86</h3><p><strong>\u5728\u670D\u52A1\u7AEF\u5E76\u53D1\u5904\u7406\u5927\u91CF\u8BF7\u6C42\u65F6\uFF0C\u5982\u679C TCP accpet \u961F\u5217\u8FC7\u5C0F\uFF0C\u6216\u8005\u5E94\u7528\u7A0B\u5E8F\u8C03\u7528 accept() \u4E0D\u53CA\u65F6\uFF0C\u5C31\u4F1A\u9020\u6210 accpet \u961F\u5217\u6EE1\u4E86 \uFF0C\u8FD9\u65F6\u540E\u7EED\u7684\u8FDE\u63A5\u5C31\u4F1A\u88AB\u4E22\u5F03\uFF0C\u8FD9\u6837\u5C31\u4F1A\u51FA\u73B0\u670D\u52A1\u7AEF\u8BF7\u6C42\u6570\u91CF\u4E0A\u4E0D\u53BB\u7684\u73B0\u8C61\u3002</strong></p><p><img src="https://img-blog.csdnimg.cn/img_convert/d1538f8d3b50da26039bc6b171a13ad1.png" alt=""></p><p>\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7 ss \u547D\u4EE4\u6765\u770B accpet \u961F\u5217\u5927\u5C0F\uFF0C\u5728\u300CLISTEN \u72B6\u6001\u300D\u65F6\uFF0C<code>Recv-Q/Send-Q</code> \u8868\u793A\u7684\u542B\u4E49\u5982\u4E0B\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/img_convert/d7e8fcbb4afa583687b76064b7f1afac.png" alt=""></p><ul><li>Recv-Q\uFF1A\u5F53\u524D accpet \u961F\u5217\u7684\u5927\u5C0F\uFF0C\u4E5F\u5C31\u662F\u5F53\u524D\u5DF2\u5B8C\u6210\u4E09\u6B21\u63E1\u624B\u5E76\u7B49\u5F85\u670D\u52A1\u7AEF <code>accept()</code> \u7684 TCP \u8FDE\u63A5\u4E2A\u6570\uFF1B</li><li>Send-Q\uFF1A\u5F53\u524D accpet \u6700\u5927\u961F\u5217\u957F\u5EA6\uFF0C\u4E0A\u9762\u7684\u8F93\u51FA\u7ED3\u679C\u8BF4\u660E\u76D1\u542C 8088 \u7AEF\u53E3\u7684 TCP \u670D\u52A1\u8FDB\u7A0B\uFF0Caccpet \u961F\u5217\u7684\u6700\u5927\u957F\u5EA6\u4E3A 128\uFF1B</li></ul><p>\u5982\u679C Recv-Q \u7684\u5927\u5C0F\u8D85\u8FC7 Send-Q\uFF0C\u5C31\u8BF4\u660E\u53D1\u751F\u4E86 accpet \u961F\u5217\u6EE1\u7684\u60C5\u51B5\u3002</p><p>\u8981\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF0C\u6211\u4EEC\u53EF\u4EE5\uFF1A</p><ul><li>\u8C03\u5927 accpet \u961F\u5217\u7684\u6700\u5927\u957F\u5EA6\uFF0C\u8C03\u5927\u7684\u65B9\u5F0F\u662F\u901A\u8FC7<strong>\u8C03\u5927 backlog \u4EE5\u53CA somaxconn \u53C2\u6570\u3002</strong></li><li>\u68C0\u67E5\u7CFB\u7EDF\u6216\u8005\u4EE3\u7801\u4E3A\u4EC0\u4E48\u8C03\u7528 accept() \u4E0D\u53CA\u65F6\uFF1B</li></ul>',64),d={href:"https://mp.weixin.qq.com/s/2qN0ulyBtO2I67NB_RnJbg",target:"_blank",rel:"noopener noreferrer"},b=e("hr",null,null,-1);function A(h,T){const t=s("ExternalLinkIcon");return o(),a("div",null,[r,e("p",null,[g,c("\uFF0C\u5360\u6EE1\u4E86\u6240\u6709\u7AEF\u53E3\u8D44\u6E90\uFF0C\u90A3\u4E48\u5C31\u65E0\u6CD5\u5BF9\u300C\u76EE\u7684 IP+ \u76EE\u7684 PORT\u300D\u90FD\u4E00\u6837\u7684\u670D\u52A1\u5668\u53D1\u8D77\u8FDE\u63A5\u4E86\uFF0C\u4F46\u662F\u88AB\u4F7F\u7528\u7684\u7AEF\u53E3\uFF0C\u8FD8\u662F\u53EF\u4EE5\u7EE7\u7EED\u5BF9\u53E6\u5916\u4E00\u4E2A\u670D\u52A1\u5668\u53D1\u8D77\u8FDE\u63A5\u7684\u3002\u5177\u4F53\u53EF\u4EE5\u770B\u6211\u8FD9\u7BC7\u6587\u7AE0\uFF1A"),e("a",m,[c("\u5BA2\u6237\u7AEF\u7684\u7AEF\u53E3\u53EF\u4EE5\u91CD\u590D\u4F7F\u7528\u5417\uFF1F"),p(t)])]),_,e("p",null,[c("\u5173\u4E8E SYN \u961F\u5217\u548C accpet \u961F\u5217\uFF0C\u6211\u4E4B\u524D\u5199\u8FC7\u4E00\u7BC7\u5F88\u8BE6\u7EC6\u7684\u6587\u7AE0\uFF1A"),e("a",d,[c("TCP \u534A\u8FDE\u63A5\u961F\u5217\u548C\u5168\u8FDE\u63A5\u961F\u5217\u6EE1\u4E86\u4F1A\u53D1\u751F\u4EC0\u4E48\uFF1F\u53C8\u8BE5\u5982\u4F55\u5E94\u5BF9\uFF1F"),p(t)])]),b])}const P=i(l,[["render",A],["__file","tcp-syn.html.vue"]]);export{P as default};
