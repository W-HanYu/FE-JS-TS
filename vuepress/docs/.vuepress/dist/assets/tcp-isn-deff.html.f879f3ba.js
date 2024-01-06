import{_ as n,o as s,c as p,f as a}from"./app.d6a6c857.js";const t={},o=a(`<h1 id="\u4E3A\u4EC0\u4E48-tcp-\u6BCF\u6B21\u5EFA\u7ACB\u8FDE\u63A5\u65F6-\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u90FD\u8981\u4E0D\u4E00\u6837\u5462" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48-tcp-\u6BCF\u6B21\u5EFA\u7ACB\u8FDE\u63A5\u65F6-\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u90FD\u8981\u4E0D\u4E00\u6837\u5462" aria-hidden="true">#</a> \u4E3A\u4EC0\u4E48 TCP \u6BCF\u6B21\u5EFA\u7ACB\u8FDE\u63A5\u65F6\uFF0C\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u90FD\u8981\u4E0D\u4E00\u6837\u5462\uFF1F</h1><p>\u5927\u5BB6\u597D\uFF0C\u6211\u662F\u6DB5\u5B87\u3002</p><p><strong>\u4E3A\u4EC0\u4E48 TCP \u6BCF\u6B21\u5EFA\u7ACB\u8FDE\u63A5\u65F6\uFF0C\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u90FD\u8981\u4E0D\u4E00\u6837\u5462\uFF1F</strong></p><p>\u63A5\u4E0B\u6765\uFF0C\u6211\u4E00\u6B65\u4E00\u6B65\u7ED9\u5927\u5BB6\u8BB2\u660E\u767D\uFF0C\u6211\u89C9\u5F97\u5E94\u8BE5\u6709\u4E0D\u5C11\u4EBA\u4F1A\u6709\u7C7B\u4F3C\u7684\u95EE\u9898\uFF0C\u6240\u4EE5\u4ECA\u5929\u5728\u809D\u4E00\u7BC7\uFF01</p><blockquote><p>\u4E3A\u4EC0\u4E48 TCP \u6BCF\u6B21\u5EFA\u7ACB\u8FDE\u63A5\u65F6\uFF0C\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u90FD\u8981\u4E0D\u4E00\u6837\u5462\uFF1F</p></blockquote><p>\u4E3B\u8981\u539F\u56E0\u662F\u4E3A\u4E86\u9632\u6B62\u5386\u53F2\u62A5\u6587\u88AB\u4E0B\u4E00\u4E2A\u76F8\u540C\u56DB\u5143\u7EC4\u7684\u8FDE\u63A5\u63A5\u6536\u3002</p><blockquote><p>TCP \u56DB\u6B21\u6325\u624B\u4E2D\u7684 TIME_WAIT \u72B6\u6001\u4E0D\u662F\u4F1A\u6301\u7EED 2 MSL \u65F6\u957F\uFF0C\u5386\u53F2\u62A5\u6587\u4E0D\u662F\u65E9\u5C31\u5728\u7F51\u7EDC\u4E2D\u6D88\u5931\u4E86\u5417\uFF1F</p></blockquote><p>\u662F\u7684\uFF0C\u5982\u679C\u80FD\u6B63\u5E38\u56DB\u6B21\u6325\u624B\uFF0C\u7531\u4E8E TIME_WAIT \u72B6\u6001\u4F1A\u6301\u7EED 2 MSL \u65F6\u957F\uFF0C\u5386\u53F2\u62A5\u6587\u4F1A\u5728\u4E0B\u4E00\u4E2A\u8FDE\u63A5\u4E4B\u524D\u5C31\u4F1A\u81EA\u7136\u6D88\u5931\u3002</p><p>\u4F46\u662F\u6765\u4E86\uFF0C\u6211\u4EEC\u5E76\u4E0D\u80FD\u4FDD\u8BC1\u6BCF\u6B21\u8FDE\u63A5\u90FD\u80FD\u901A\u8FC7\u56DB\u6B21\u6325\u624B\u6765\u6B63\u5E38\u5173\u95ED\u8FDE\u63A5\u3002</p><p>\u5047\u8BBE\u6BCF\u6B21\u5EFA\u7ACB\u8FDE\u63A5\uFF0C\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u7684\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u90FD\u662F\u4ECE 0 \u5F00\u59CB\uFF1A</p><p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/isn\u76F8\u540C.png" alt=""></p><p>\u8FC7\u7A0B\u5982\u4E0B\uFF1A</p><ul><li>\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u5EFA\u7ACB\u4E00\u4E2A TCP \u8FDE\u63A5\uFF0C\u5728\u5BA2\u6237\u7AEF\u53D1\u9001\u6570\u636E\u5305\u88AB\u7F51\u7EDC\u963B\u585E\u4E86\uFF0C\u7136\u540E\u8D85\u65F6\u91CD\u4F20\u4E86\u8FD9\u4E2A\u6570\u636E\u5305\uFF0C\u800C\u6B64\u65F6\u670D\u52A1\u7AEF\u8BBE\u5907\u65AD\u7535\u91CD\u542F\u4E86\uFF0C\u4E4B\u524D\u4E0E\u5BA2\u6237\u7AEF\u5EFA\u7ACB\u7684\u8FDE\u63A5\u5C31\u6D88\u5931\u4E86\uFF0C\u4E8E\u662F\u5728\u6536\u5230\u5BA2\u6237\u7AEF\u7684\u6570\u636E\u5305\u7684\u65F6\u5019\u5C31\u4F1A\u53D1\u9001 RST \u62A5\u6587\u3002</li><li>\u7D27\u63A5\u7740\uFF0C\u5BA2\u6237\u7AEF\u53C8\u4E0E\u670D\u52A1\u7AEF\u5EFA\u7ACB\u4E86\u4E0E\u4E0A\u4E00\u4E2A\u8FDE\u63A5\u76F8\u540C\u56DB\u5143\u7EC4\u7684\u8FDE\u63A5\uFF1B</li><li>\u5728\u65B0\u8FDE\u63A5\u5EFA\u7ACB\u5B8C\u6210\u540E\uFF0C\u4E0A\u4E00\u4E2A\u8FDE\u63A5\u4E2D\u88AB\u7F51\u7EDC\u963B\u585E\u7684\u6570\u636E\u5305\u6B63\u597D\u62B5\u8FBE\u4E86\u670D\u52A1\u7AEF\uFF0C\u521A\u597D\u8BE5\u6570\u636E\u5305\u7684\u5E8F\u5217\u53F7\u6B63\u597D\u662F\u5728\u670D\u52A1\u7AEF\u7684\u63A5\u6536\u7A97\u53E3\u5185\uFF0C\u6240\u4EE5\u8BE5\u6570\u636E\u5305\u4F1A\u88AB\u670D\u52A1\u7AEF\u6B63\u5E38\u63A5\u6536\uFF0C\u5C31\u4F1A\u9020\u6210\u6570\u636E\u9519\u4E71\u3002</li></ul><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u5982\u679C\u6BCF\u6B21\u5EFA\u7ACB\u8FDE\u63A5\uFF0C\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u7684\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u90FD\u662F\u4E00\u6837\u7684\u8BDD\uFF0C\u5F88\u5BB9\u6613\u51FA\u73B0\u5386\u53F2\u62A5\u6587\u88AB\u4E0B\u4E00\u4E2A\u76F8\u540C\u56DB\u5143\u7EC4\u7684\u8FDE\u63A5\u63A5\u6536\u7684\u95EE\u9898\u3002</p><blockquote><p>\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u7684\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u4E0D\u4E00\u6837\u4E0D\u662F\u4E5F\u4F1A\u53D1\u751F\u8FD9\u6837\u7684\u4E8B\u60C5\u5417\uFF1F</p></blockquote><p>\u662F\u7684\uFF0C\u5373\u4F7F\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u7684\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u4E0D\u4E00\u6837\uFF0C\u4E5F\u4F1A\u5B58\u5728\u6536\u5230\u5386\u53F2\u62A5\u6587\u7684\u53EF\u80FD\u3002</p><p>\u4F46\u662F\u6211\u4EEC\u8981\u6E05\u695A\u4E00\u70B9\uFF0C\u5386\u53F2\u62A5\u6587\u80FD\u5426\u88AB\u5BF9\u65B9\u63A5\u6536\uFF0C\u8FD8\u8981\u770B\u8BE5\u5386\u53F2\u62A5\u6587\u7684\u5E8F\u5217\u53F7\u662F\u5426\u6B63\u597D\u5728\u5BF9\u65B9\u63A5\u6536\u7A97\u53E3\u5185\uFF0C\u5982\u679C\u4E0D\u5728\u5C31\u4F1A\u4E22\u5F03\uFF0C\u5982\u679C\u5728\u624D\u4F1A\u63A5\u6536\u3002</p><p>\u5982\u679C\u6BCF\u6B21\u5EFA\u7ACB\u8FDE\u63A5\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u7684\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u90FD\u300C\u4E0D\u4E00\u6837\u300D\uFF0C\u5C31\u6709\u5927\u6982\u7387\u56E0\u4E3A\u5386\u53F2\u62A5\u6587\u7684\u5E8F\u5217\u53F7\u300C\u4E0D\u5728\u300D\u5BF9\u65B9\u63A5\u6536\u7A97\u53E3\uFF0C\u4ECE\u800C\u5F88\u5927\u7A0B\u5EA6\u4E0A\u907F\u514D\u4E86\u5386\u53F2\u62A5\u6587\uFF0C\u6BD4\u5982\u4E0B\u56FE\uFF1A</p><p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/isn\u4E0D\u76F8\u540C.png" alt=""></p><p>\u76F8\u53CD\uFF0C\u5982\u679C\u6BCF\u6B21\u5EFA\u7ACB\u8FDE\u63A5\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u7684\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u90FD\u300C\u4E00\u6837\u300D\uFF0C\u5C31\u6709\u5927\u6982\u7387\u9047\u5230\u5386\u53F2\u62A5\u6587\u7684\u5E8F\u5217\u53F7\u521A\u300C\u597D\u5728\u300D\u5BF9\u65B9\u7684\u63A5\u6536\u7A97\u53E3\u5185\uFF0C\u4ECE\u800C\u5BFC\u81F4\u5386\u53F2\u62A5\u6587\u88AB\u65B0\u8FDE\u63A5\u6210\u529F\u63A5\u6536\u3002</p><p>\u6240\u4EE5\uFF0C\u6BCF\u6B21\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u4E0D\u4E00\u6837\u80FD\u591F\u5F88\u5927\u7A0B\u5EA6\u4E0A\u907F\u514D\u5386\u53F2\u62A5\u6587\u88AB\u4E0B\u4E00\u4E2A\u76F8\u540C\u56DB\u5143\u7EC4\u7684\u8FDE\u63A5\u63A5\u6536\uFF0C\u6CE8\u610F\u662F\u5F88\u5927\u7A0B\u5EA6\u4E0A\uFF0C\u5E76\u4E0D\u662F\u5B8C\u5168\u907F\u514D\u4E86\u3002</p><blockquote><p>\u90A3\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u7684\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u90FD\u662F\u968F\u673A\u7684\uFF0C\u90A3\u8FD8\u662F\u6709\u53EF\u80FD\u968F\u673A\u6210\u4E00\u6837\u7684\u5440\uFF1F</p></blockquote><p>RFC793 \u63D0\u5230\u521D\u59CB\u5316\u5E8F\u5217\u53F7 ISN \u968F\u673A\u751F\u6210\u7B97\u6CD5\uFF1AISN = M + F(localhost, localport, remotehost, remoteport)\u3002</p><ul><li>M\u662F\u4E00\u4E2A\u8BA1\u65F6\u5668\uFF0C\u8FD9\u4E2A\u8BA1\u65F6\u5668\u6BCF\u9694 4 \u5FAE\u79D2\u52A01\u3002</li><li>F \u662F\u4E00\u4E2A Hash \u7B97\u6CD5\uFF0C\u6839\u636E\u6E90IP\u3001\u76EE\u7684IP\u3001\u6E90\u7AEF\u53E3\u3001\u76EE\u7684\u7AEF\u53E3\u751F\u6210\u4E00\u4E2A\u968F\u673A\u6570\u503C\uFF0C\u8981\u4FDD\u8BC1 hash \u7B97\u6CD5\u4E0D\u80FD\u88AB\u5916\u90E8\u8F7B\u6613\u63A8\u7B97\u5F97\u51FA\u3002</li></ul><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u968F\u673A\u6570\u662F\u4F1A\u57FA\u4E8E\u65F6\u949F\u8BA1\u65F6\u5668\u9012\u589E\u7684\uFF0C\u57FA\u672C\u4E0D\u53EF\u80FD\u4F1A\u968F\u673A\u6210\u4E00\u6837\u7684\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u3002</p><blockquote><p>\u61C2\u4E86\uFF0C\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u90FD\u662F\u968F\u673A\u751F\u6210\u7684\u8BDD\uFF0C\u5C31\u80FD\u907F\u514D\u8FDE\u63A5\u63A5\u6536\u5386\u53F2\u62A5\u6587\u4E86\u3002</p></blockquote><p>\u662F\u7684\uFF0C\u4F46\u662F\u4E5F\u4E0D\u662F\u5B8C\u5168\u907F\u514D\u4E86\u3002</p><p>\u4E3A\u4E86\u80FD\u66F4\u597D\u7684\u7406\u89E3\u8FD9\u4E2A\u539F\u56E0\uFF0C\u6211\u4EEC\u5148\u6765\u4E86\u89E3\u5E8F\u5217\u53F7\uFF08SEQ\uFF09\u548C\u521D\u59CB\u5E8F\u5217\u53F7\uFF08ISN\uFF09\u3002</p><ul><li><strong>\u5E8F\u5217\u53F7</strong>\uFF0C\u662F TCP \u4E00\u4E2A\u5934\u90E8\u5B57\u6BB5\uFF0C\u6807\u8BC6\u4E86 TCP \u53D1\u9001\u7AEF\u5230 TCP \u63A5\u6536\u7AEF\u7684\u6570\u636E\u6D41\u7684\u4E00\u4E2A\u5B57\u8282\uFF0C\u56E0\u4E3A TCP \u662F\u9762\u5411\u5B57\u8282\u6D41\u7684\u53EF\u9760\u534F\u8BAE\uFF0C\u4E3A\u4E86\u4FDD\u8BC1\u6D88\u606F\u7684\u987A\u5E8F\u6027\u548C\u53EF\u9760\u6027\uFF0CTCP \u4E3A\u6BCF\u4E2A\u4F20\u8F93\u65B9\u5411\u4E0A\u7684\u6BCF\u4E2A\u5B57\u8282\u90FD\u8D4B\u4E88\u4E86\u4E00\u4E2A\u7F16\u53F7\uFF0C\u4EE5\u4FBF\u4E8E\u4F20\u8F93\u6210\u529F\u540E\u786E\u8BA4\u3001\u4E22\u5931\u540E\u91CD\u4F20\u4EE5\u53CA\u5728\u63A5\u6536\u7AEF\u4FDD\u8BC1\u4E0D\u4F1A\u4E71\u5E8F\u3002<strong>\u5E8F\u5217\u53F7\u662F\u4E00\u4E2A 32 \u4F4D\u7684\u65E0\u7B26\u53F7\u6570\uFF0C\u56E0\u6B64\u5728\u5230\u8FBE 4G \u4E4B\u540E\u518D\u5FAA\u73AF\u56DE\u5230 0</strong>\u3002</li><li><strong>\u521D\u59CB\u5E8F\u5217\u53F7</strong>\uFF0C\u5728 TCP \u5EFA\u7ACB\u8FDE\u63A5\u7684\u65F6\u5019\uFF0C\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u90FD\u4F1A\u5404\u81EA\u751F\u6210\u4E00\u4E2A\u521D\u59CB\u5E8F\u5217\u53F7\uFF0C\u5B83\u662F\u57FA\u4E8E\u65F6\u949F\u751F\u6210\u7684\u4E00\u4E2A\u968F\u673A\u6570\uFF0C\u6765\u4FDD\u8BC1\u6BCF\u4E2A\u8FDE\u63A5\u90FD\u62E5\u6709\u4E0D\u540C\u7684\u521D\u59CB\u5E8F\u5217\u53F7\u3002<strong>\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u53EF\u88AB\u89C6\u4E3A\u4E00\u4E2A 32 \u4F4D\u7684\u8BA1\u6570\u5668\uFF0C\u8BE5\u8BA1\u6570\u5668\u7684\u6570\u503C\u6BCF 4 \u5FAE\u79D2\u52A0 1\uFF0C\u5FAA\u73AF\u4E00\u6B21\u9700\u8981 4.55 \u5C0F\u65F6</strong>\u3002</li></ul><p>\u7ED9\u5927\u5BB6\u6293\u4E86\u4E00\u4E2A\u5305\uFF0C\u4E0B\u56FE\u4E2D\u7684 Seq \u5C31\u662F\u5E8F\u5217\u53F7\uFF0C\u5176\u4E2D\u7EA2\u8272\u6846\u4F4F\u7684\u5206\u522B\u662F\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u5404\u81EA\u751F\u6210\u7684\u521D\u59CB\u5E8F\u5217\u53F7\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/ed84bb4aa742a33f50d8035da2867ca2.png" alt=""></p><p>\u901A\u8FC7\u524D\u9762\u6211\u4EEC\u77E5\u9053\uFF0C<strong>\u5E8F\u5217\u53F7\u548C\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u5E76\u4E0D\u662F\u65E0\u9650\u9012\u589E\u7684\uFF0C\u4F1A\u53D1\u751F\u56DE\u7ED5\u4E3A\u521D\u59CB\u503C\u7684\u60C5\u51B5\uFF0C\u8FD9\u610F\u5473\u7740\u65E0\u6CD5\u6839\u636E\u5E8F\u5217\u53F7\u6765\u5224\u65AD\u65B0\u8001\u6570\u636E</strong>\u3002</p><p>\u4E0D\u8981\u4EE5\u4E3A\u5E8F\u5217\u53F7\u7684\u4E0A\u9650\u503C\u662F 4GB\uFF0C\u5C31\u4EE5\u4E3A\u5F88\u5927\uFF0C\u5F88\u96BE\u53D1\u751F\u56DE\u7ED5\u3002\u5728\u4E00\u4E2A\u901F\u5EA6\u8DB3\u591F\u5FEB\u7684\u7F51\u7EDC\u4E2D\u4F20\u8F93\u5927\u91CF\u6570\u636E\u65F6\uFF0C\u5E8F\u5217\u53F7\u7684\u56DE\u7ED5\u65F6\u95F4\u5C31\u4F1A\u53D8\u77ED\u3002\u5982\u679C\u5E8F\u5217\u53F7\u56DE\u7ED5\u7684\u65F6\u95F4\u6781\u77ED\uFF0C\u6211\u4EEC\u5C31\u4F1A\u518D\u6B21\u9762\u4E34\u4E4B\u524D\u5EF6\u8FDF\u7684\u62A5\u6587\u62B5\u8FBE\u540E\u5E8F\u5217\u53F7\u4F9D\u7136\u6709\u6548\u7684\u95EE\u9898\u3002</p><p>\u4E3A\u4E86\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF0C\u5C31\u9700\u8981\u6709 TCP \u65F6\u95F4\u6233\u3002tcp_timestamps \u53C2\u6570\u662F\u9ED8\u8BA4\u5F00\u542F\u7684\uFF0C\u5F00\u542F\u4E86 tcp_timestamps \u53C2\u6570\uFF0CTCP \u5934\u90E8\u5C31\u4F1A\u4F7F\u7528\u65F6\u95F4\u6233\u9009\u9879\uFF0C\u5B83\u6709\u4E24\u4E2A\u597D\u5904\uFF0C<strong>\u4E00\u4E2A\u662F\u4FBF\u4E8E\u7CBE\u786E\u8BA1\u7B97 RTT \uFF0C\u53E6\u4E00\u4E2A\u662F\u80FD\u9632\u6B62\u5E8F\u5217\u53F7\u56DE\u7ED5\uFF08PAWS\uFF09</strong>\u3002</p><p>\u8BD5\u770B\u4E0B\u9762\u7684\u793A\u4F8B\uFF0C\u5047\u8BBE TCP \u7684\u53D1\u9001\u7A97\u53E3\u662F 1 GB\uFF0C\u5E76\u4E14\u4F7F\u7528\u4E86\u65F6\u95F4\u6233\u9009\u9879\uFF0C\u53D1\u9001\u65B9\u4F1A\u4E3A\u6BCF\u4E2A TCP \u62A5\u6587\u5206\u914D\u65F6\u95F4\u6233\u6570\u503C\uFF0C\u6211\u4EEC\u5047\u8BBE\u6BCF\u4E2A\u62A5\u6587\u65F6\u95F4\u52A0 1\uFF0C\u7136\u540E\u4F7F\u7528\u8FD9\u4E2A\u8FDE\u63A5\u4F20\u8F93\u4E00\u4E2A 6GB \u5927\u5C0F\u7684\u6570\u636E\u6D41\u3002</p><p><img src="https://img-blog.csdnimg.cn/img_convert/1d497c38621ebc44ee3d8763fd03da67.png" alt="\u56FE\u7247"></p><p>32 \u4F4D\u7684\u5E8F\u5217\u53F7\u5728\u65F6\u523B D \u548C E \u4E4B\u95F4\u56DE\u7ED5\u3002\u5047\u8BBE\u5728\u65F6\u523BB\u6709\u4E00\u4E2A\u62A5\u6587\u4E22\u5931\u5E76\u88AB\u91CD\u4F20\uFF0C\u53C8\u5047\u8BBE\u8FD9\u4E2A\u62A5\u6587\u6BB5\u5728\u7F51\u7EDC\u4E0A\u7ED5\u4E86\u8FDC\u8DEF\u5E76\u5728\u65F6\u523B F \u91CD\u65B0\u51FA\u73B0\u3002\u5982\u679C TCP \u65E0\u6CD5\u8BC6\u522B\u8FD9\u4E2A\u7ED5\u56DE\u7684\u62A5\u6587\uFF0C\u90A3\u4E48\u6570\u636E\u5B8C\u6574\u6027\u5C31\u4F1A\u906D\u5230\u7834\u574F\u3002</p><p>\u4F7F\u7528\u65F6\u95F4\u6233\u9009\u9879\u80FD\u591F\u6709\u6548\u7684\u9632\u6B62\u4E0A\u8FF0\u95EE\u9898\uFF0C\u5982\u679C\u4E22\u5931\u7684\u62A5\u6587\u4F1A\u5728\u65F6\u523B F \u91CD\u65B0\u51FA\u73B0\uFF0C\u7531\u4E8E\u5B83\u7684\u65F6\u95F4\u6233\u4E3A 2\uFF0C\u5C0F\u4E8E\u6700\u8FD1\u7684\u6709\u6548\u65F6\u95F4\u6233\uFF085 \u6216 6\uFF09\uFF0C\u56E0\u6B64\u9632\u56DE\u7ED5\u5E8F\u5217\u53F7\u7B97\u6CD5\uFF08PAWS\uFF09\u4F1A\u5C06\u5176\u4E22\u5F03\u3002</p><p>\u9632\u56DE\u7ED5\u5E8F\u5217\u53F7\u7B97\u6CD5\u8981\u6C42\u8FDE\u63A5\u53CC\u65B9\u7EF4\u62A4\u6700\u8FD1\u4E00\u6B21\u6536\u5230\u7684\u6570\u636E\u5305\u7684\u65F6\u95F4\u6233\uFF08Recent TSval\uFF09\uFF0C\u6BCF\u6536\u5230\u4E00\u4E2A\u65B0\u6570\u636E\u5305\u90FD\u4F1A\u8BFB\u53D6\u6570\u636E\u5305\u4E2D\u7684\u65F6\u95F4\u6233\u503C\u8DDF Recent TSval \u503C\u505A\u6BD4\u8F83\uFF0C<strong>\u5982\u679C\u53D1\u73B0\u6536\u5230\u7684\u6570\u636E\u5305\u4E2D\u65F6\u95F4\u6233\u4E0D\u662F\u9012\u589E\u7684\uFF0C\u5219\u8868\u793A\u8BE5\u6570\u636E\u5305\u662F\u8FC7\u671F\u7684\uFF0C\u5C31\u4F1A\u76F4\u63A5\u4E22\u5F03\u8FD9\u4E2A\u6570\u636E\u5305</strong>\u3002</p><blockquote><p>\u61C2\u4E86\uFF0C\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u7684\u521D\u59CB\u5316\u5E8F\u5217\u53F7\u90FD\u662F\u968F\u673A\u751F\u6210\uFF0C\u80FD\u5F88\u5927\u7A0B\u5EA6\u4E0A\u907F\u514D\u5386\u53F2\u62A5\u6587\u88AB\u4E0B\u4E00\u4E2A\u76F8\u540C\u56DB\u5143\u7EC4\u7684\u8FDE\u63A5\u63A5\u6536\uFF0C\u7136\u540E\u53C8\u5F15\u5165\u65F6\u95F4\u6233\u7684\u673A\u5236\uFF0C\u4ECE\u800C\u5B8C\u5168\u907F\u514D\u4E86\u5386\u53F2\u62A5\u6587\u88AB\u63A5\u6536\u7684\u95EE\u9898\u3002</p></blockquote><p>\u55EF\u55EF\uFF0C\u6CA1\u9519\u3002</p><blockquote><p>\u5982\u679C\u65F6\u95F4\u6233\u4E5F\u56DE\u7ED5\u4E86\u600E\u4E48\u529E\uFF1F</p></blockquote><p>\u65F6\u95F4\u6233\u7684\u5927\u5C0F\u662F 32 bit\uFF0C\u6240\u4EE5\u7406\u8BBA\u4E0A\u4E5F\u662F\u6709\u56DE\u7ED5\u7684\u53EF\u80FD\u6027\u7684\u3002</p><p>\u65F6\u95F4\u6233\u56DE\u7ED5\u7684\u901F\u5EA6\u53EA\u4E0E\u5BF9\u7AEF\u4E3B\u673A\u65F6\u949F\u9891\u7387\u6709\u5173\u3002</p><p>Linux \u4EE5\u672C\u5730\u65F6\u949F\u8BA1\u6570\uFF08jiffies\uFF09\u4F5C\u4E3A\u65F6\u95F4\u6233\u7684\u503C\uFF0C\u4E0D\u540C\u7684\u589E\u957F\u65F6\u95F4\u4F1A\u6709\u4E0D\u540C\u7684\u95EE\u9898\uFF1A</p><ul><li>\u5982\u679C\u65F6\u949F\u8BA1\u6570\u52A0 1 \u9700\u89811ms\uFF0C\u5219\u9700\u8981\u7EA6 24.8 \u5929\u624D\u80FD\u56DE\u7ED5\u4E00\u534A\uFF0C\u53EA\u8981\u62A5\u6587\u7684\u751F\u5B58\u65F6\u95F4\u5C0F\u4E8E\u8FD9\u4E2A\u503C\u7684\u8BDD\u5224\u65AD\u65B0\u65E7\u6570\u636E\u5C31\u4E0D\u4F1A\u51FA\u9519\u3002</li><li>\u5982\u679C\u65F6\u949F\u8BA1\u6570\u63D0\u9AD8\u5230 1us \u52A01\uFF0C\u5219\u56DE\u7ED5\u9700\u8981\u7EA671.58\u5206\u949F\u624D\u80FD\u56DE\u7ED5\uFF0C\u8FD9\u65F6\u95EE\u9898\u4E5F\u4E0D\u5927\uFF0C\u56E0\u4E3A\u7F51\u7EDC\u4E2D\u65E7\u62A5\u6587\u51E0\u4E4E\u4E0D\u53EF\u80FD\u751F\u5B58\u8D85\u8FC770\u5206\u949F\uFF0C\u53EA\u662F\u5982\u679C70\u5206\u949F\u6CA1\u6709\u62A5\u6587\u6536\u53D1\u5219\u4F1A\u6709\u4E00\u4E2A\u5305\u8D8A\u8FC7PAWS\uFF08\u8FD9\u79CD\u60C5\u51B5\u4F1A\u6BD4\u8F83\u591A\u89C1\uFF0C\u76F8\u6BD4\u4E4B\u4E0B 24 \u5929\u6CA1\u6709\u6570\u636E\u4F20\u8F93\u7684TCP\u8FDE\u63A5\u5C11\u4E4B\u53C8\u5C11\uFF09\uFF0C\u4F46\u9664\u975E\u8FD9\u4E2A\u5305\u78B0\u5DE7\u662F\u5E8F\u5217\u53F7\u56DE\u7ED5\u7684\u65E7\u6570\u636E\u5305\u800C\u88AB\u653E\u5165\u63A5\u6536\u961F\u5217\uFF08\u592A\u5DE7\u4E86\u5427\uFF09\uFF0C\u5426\u5219\u4E5F\u4E0D\u4F1A\u6709\u95EE\u9898\uFF1B</li><li>\u5982\u679C\u65F6\u949F\u8BA1\u6570\u63D0\u9AD8\u5230 0.1 us \u52A0 1 \u56DE\u7ED5\u9700\u8981 7 \u5206\u949F\u591A\u4E00\u70B9\uFF0C\u8FD9\u65F6\u5C31\u53EF\u80FD\u4F1A\u6709\u95EE\u9898\u4E86\uFF0C\u8FDE\u63A5\u5982\u679C 7 \u5206\u949F\u6CA1\u6709\u6570\u636E\u6536\u53D1\u5C31\u4F1A\u6709\u4E00\u4E2A\u62A5\u6587\u8D8A\u8FC7 PAWS\uFF0C\u5BF9\u4E8ETCP\u8FDE\u63A5\u800C\u8A00\u8FD9\u4E48\u77ED\u7684\u65F6\u95F4\u5185\u6CA1\u6709\u6570\u636E\u4EA4\u4E92\u592A\u5E38\u89C1\u4E86\u5427\uFF01\u8FD9\u6837\u7684\u8BDD\u4F1A\u9891\u7E41\u6709\u5305\u8D8A\u8FC7 PAWS \u68C0\u67E5\uFF0C\u4ECE\u800C\u4F7F\u5F97\u65E7\u5305\u6DF7\u5165\u6570\u636E\u4E2D\u7684\u6982\u7387\u5927\u5927\u589E\u52A0\uFF1B</li></ul><p>Linux \u5728 PAWS \u68C0\u67E5\u505A\u4E86\u4E00\u4E2A\u7279\u6B8A\u5904\u7406\uFF0C\u5982\u679C\u4E00\u4E2A TCP \u8FDE\u63A5\u8FDE\u7EED 24 \u5929\u4E0D\u6536\u53D1\u6570\u636E\u5219\u5728\u63A5\u6536\u7B2C\u4E00\u4E2A\u5305\u65F6\u57FA\u4E8E\u65F6\u95F4\u6233\u7684 PAWS \u4F1A\u5931\u6548\uFF0C\u4E5F\u5C31\u662F\u53EF\u4EE5 PAWS \u51FD\u6570\u4F1A\u653E\u8FC7\u8FD9\u4E2A\u7279\u6B8A\u7684\u60C5\u51B5\uFF0C\u8BA4\u4E3A\u662F\u5408\u6CD5\u7684\uFF0C\u53EF\u4EE5\u63A5\u6536\u8BE5\u6570\u636E\u5305\u3002</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">// tcp_paws_check \u51FD\u6570\u5982\u679C\u8FD4\u56DE true \u5219 PAWS \u901A\u8FC7\uFF1A</span>
<span class="token keyword">static</span> <span class="token keyword">inline</span> bool <span class="token function">tcp_paws_check</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">tcp_options_received</span> <span class="token operator">*</span>rx_opt<span class="token punctuation">,</span> <span class="token keyword">int</span> paws_win<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

   <span class="token comment">//\u4ECE\u4E0A\u6B21\u6536\u5230\u5305\u5230\u73B0\u5728\u7ECF\u5386\u7684\u65F6\u95F4\u591A\u4E8E24\u5929\uFF0C\u8FD4\u56DEtrue</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">unlikely</span><span class="token punctuation">(</span><span class="token function">get_seconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> rx_opt<span class="token operator">-&gt;</span>ts_recent_stamp <span class="token operator">+</span> TCP_PAWS_24DAYS<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> true<span class="token punctuation">;</span>

<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">return</span> false<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8981\u89E3\u51B3\u65F6\u95F4\u6233\u56DE\u7ED5\u7684\u95EE\u9898\uFF0C\u53EF\u4EE5\u8003\u8651\u4EE5\u4E0B\u89E3\u51B3\u65B9\u6848\uFF1A</p><p>1\uFF09\u589E\u52A0\u65F6\u95F4\u6233\u7684\u5927\u5C0F\uFF0C\u753132 bit\u6269\u5927\u523064bit</p><p>\u8FD9\u6837\u867D\u7136\u53EF\u4EE5\u5728\u80FD\u591F\u9884\u89C1\u7684\u672A\u6765\u89E3\u51B3\u65F6\u95F4\u6233\u56DE\u7ED5\u7684\u95EE\u9898\uFF0C\u4F46\u4F1A\u5BFC\u81F4\u65B0\u65E7\u534F\u8BAE\u517C\u5BB9\u6027\u95EE\u9898\uFF0C\u50CF\u73B0\u5728\u7684IPv4\u4E0EIPv6\u4E00\u6837</p><p>2\uFF09\u5C06\u4E00\u4E2A\u4E0E\u65F6\u949F\u9891\u7387\u65E0\u5173\u7684\u503C\u4F5C\u4E3A\u65F6\u95F4\u6233\uFF0C\u65F6\u949F\u9891\u7387\u53EF\u4EE5\u589E\u52A0\u4F46\u65F6\u95F4\u6233\u7684\u589E\u901F\u4E0D\u53D8</p><p>\u968F\u7740\u65F6\u949F\u9891\u7387\u7684\u63D0\u9AD8\uFF0CTCP\u5728\u76F8\u540C\u65F6\u95F4\u5185\u80FD\u591F\u6536\u53D1\u7684\u5305\u4E5F\u4F1A\u8D8A\u6765\u8D8A\u591A\u3002\u5982\u679C\u65F6\u95F4\u6233\u7684\u589E\u901F\u4E0D\u53D8\uFF0C\u5219\u4F1A\u6709\u8D8A\u6765\u8D8A\u591A\u7684\u62A5\u6587\u4F7F\u7528\u76F8\u540C\u7684\u65F6\u95F4\u6233\u3002\u8FD9\u79CD\u8D8B\u52BF\u5230\u8FBE\u4E00\u5B9A\u7A0B\u5EA6\u5219\u65F6\u95F4\u6233\u5C31\u4F1A\u5931\u53BB\u610F\u4E49\uFF0C\u9664\u975E\u5728\u53EF\u9884\u89C1\u7684\u672A\u6765\u8FD9\u79CD\u60C5\u51B5\u4E0D\u4F1A\u53D1\u751F\u3002</p><p>3\uFF09\u6682\u65F6\u6CA1\u60F3\u5230</p><hr>`,55),e=[o];function c(l,i){return s(),p("div",null,e)}const r=n(t,[["render",c],["__file","tcp-isn-deff.html.vue"]]);export{r as default};
