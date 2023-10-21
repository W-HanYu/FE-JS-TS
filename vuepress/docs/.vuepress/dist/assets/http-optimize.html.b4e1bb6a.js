import{_ as e,o as i,c as t,f as p}from"./app.c62ce33e.js";const a={},n=p(`<h1 id="http-1-1-\u5982\u4F55\u4F18\u5316" tabindex="-1"><a class="header-anchor" href="#http-1-1-\u5982\u4F55\u4F18\u5316" aria-hidden="true">#</a> HTTP/1.1 \u5982\u4F55\u4F18\u5316\uFF1F</h1><p>\u95EE\u4F60\u4E00\u53E5\uFF1A\u300C<strong>\u4F60\u77E5\u9053 HTTP/1.1 \u8BE5\u5982\u4F55\u4F18\u5316\u5417\uFF1F</strong>\u300D</p><p>\u6211\u4EEC\u53EF\u4EE5\u4ECE\u4E0B\u9762\u8FD9\u4E09\u79CD\u4F18\u5316\u601D\u8DEF\u6765\u4F18\u5316 HTTP/1.1 \u534F\u8BAE\uFF1A</p><ul><li><em>\u5C3D\u91CF\u907F\u514D\u53D1\u9001 HTTP \u8BF7\u6C42</em>\uFF1B</li><li><em>\u5728\u9700\u8981\u53D1\u9001 HTTP \u8BF7\u6C42\u65F6\uFF0C\u8003\u8651\u5982\u4F55\u51CF\u5C11\u8BF7\u6C42\u6B21\u6570</em>\uFF1B</li><li><em>\u51CF\u5C11\u670D\u52A1\u5668\u7684 HTTP \u54CD\u5E94\u7684\u6570\u636E\u5927\u5C0F</em>\uFF1B</li></ul><p>\u4E0B\u9762\uFF0C\u5C31\u9488\u5BF9\u8FD9\u4E09\u79CD\u601D\u8DEF\u5177\u4F53\u770B\u770B\u6709\u54EA\u4E9B\u4F18\u5316\u65B9\u6CD5\u3002</p><p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/\u7F51\u7EDC/http1.1\u4F18\u5316/\u4F18\u5316http1.1\u63D0\u7EB2.png" alt=""></p><hr><h2 id="\u5982\u4F55\u907F\u514D\u53D1\u9001-http-\u8BF7\u6C42" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u907F\u514D\u53D1\u9001-http-\u8BF7\u6C42" aria-hidden="true">#</a> \u5982\u4F55\u907F\u514D\u53D1\u9001 HTTP \u8BF7\u6C42\uFF1F</h2><p>\u8FD9\u4E2A\u601D\u8DEF\u4F60\u770B\u5230\u662F\u4E0D\u662F\u89C9\u5F97\u5F88\u5947\u602A\uFF0C\u4E0D\u53D1\u9001 HTTP \u8BF7\u6C42\uFF0C\u90A3\u5BA2\u6237\u7AEF\u8FD8\u600E\u4E48\u548C\u670D\u52A1\u5668\u4EA4\u4E92\u6570\u636E\uFF1F\u5C0F\u6797\u4F60\u8FD9\u4E0D\u662F\u800D\u6D41\u6C13\u561B\uFF1F</p><p>\u51B7\u9759\u51B7\u9759\uFF0C\u4F60\u8BF4\u7684\u6CA1\u9519\uFF0C\u5BA2\u6237\u7AEF\u5F53\u7136\u8981\u5411\u670D\u52A1\u5668\u53D1\u9001\u8BF7\u6C42\u7684\u3002</p><p>\u4F46\u662F\uFF0C\u5BF9\u4E8E\u4E00\u4E9B\u5177\u6709\u91CD\u590D\u6027\u7684 HTTP \u8BF7\u6C42\uFF0C\u6BD4\u5982\u6BCF\u6B21\u8BF7\u6C42\u5F97\u5230\u7684\u6570\u636E\u90FD\u4E00\u6837\u7684\uFF0C\u6211\u4EEC\u53EF\u4EE5\u628A\u8FD9\u5BF9\u300C\u8BF7\u6C42-\u54CD\u5E94\u300D\u7684\u6570\u636E\u90FD<strong>\u7F13\u5B58\u5728\u672C\u5730</strong>\uFF0C\u90A3\u4E48\u4E0B\u6B21\u5C31\u76F4\u63A5\u8BFB\u53D6\u672C\u5730\u7684\u6570\u636E\uFF0C\u4E0D\u5FC5\u5728\u901A\u8FC7\u7F51\u7EDC\u83B7\u53D6\u670D\u52A1\u5668\u7684\u54CD\u5E94\u4E86\uFF0C\u8FD9\u6837\u7684\u8BDD HTTP/1.1 \u7684\u6027\u80FD\u80AF\u5B9A\u8089\u773C\u53EF\u89C1\u7684\u63D0\u5347\u3002</p><p>\u6240\u4EE5\uFF0C\u907F\u514D\u53D1\u9001 HTTP \u8BF7\u6C42\u7684\u65B9\u6CD5\u5C31\u662F\u901A\u8FC7<strong>\u7F13\u5B58\u6280\u672F</strong>\uFF0CHTTP \u8BBE\u8BA1\u8005\u65E9\u5728\u4E4B\u524D\u5C31\u8003\u8651\u5230\u4E86\u8FD9\u70B9\uFF0C\u56E0\u6B64 HTTP \u534F\u8BAE\u7684\u5934\u90E8\u6709\u4E0D\u5C11\u662F\u9488\u5BF9\u7F13\u5B58\u7684\u5B57\u6BB5\u3002</p><p>\u90A3\u7F13\u5B58\u662F\u5982\u4F55\u505A\u5230\u7684\u5462\uFF1F</p><p>\u5BA2\u6237\u7AEF\u4F1A\u628A\u7B2C\u4E00\u6B21\u8BF7\u6C42\u4EE5\u53CA\u54CD\u5E94\u7684\u6570\u636E\u4FDD\u5B58\u5728\u672C\u5730\u78C1\u76D8\u4E0A\uFF0C\u5176\u4E2D\u5C06\u8BF7\u6C42\u7684 URL \u4F5C\u4E3A key\uFF0C\u800C\u54CD\u5E94\u4F5C\u4E3A value\uFF0C\u4E24\u8005\u5F62\u6210\u6620\u5C04\u5173\u7CFB\u3002</p><p>\u8FD9\u6837\u5F53\u540E\u7EED\u53D1\u8D77\u76F8\u540C\u7684\u8BF7\u6C42\u65F6\uFF0C\u5C31\u53EF\u4EE5\u5148\u5728\u672C\u5730\u78C1\u76D8\u4E0A\u901A\u8FC7 key \u67E5\u5230\u5BF9\u5E94\u7684 value\uFF0C\u4E5F\u5C31\u662F\u54CD\u5E94\uFF0C\u5982\u679C\u627E\u5230\u4E86\uFF0C\u5C31\u76F4\u63A5\u4ECE\u672C\u5730\u8BFB\u53D6\u8BE5\u54CD\u5E94\u3002\u6BCB\u5EB8\u7F6E\u7591\uFF0C\u8BFB\u53D6\u672C\u5730\u78C1\u76D8\u7684\u901F\u5EA6\u80AF\u5B9A\u6BD4\u7F51\u7EDC\u8BF7\u6C42\u5FEB\u5F97\u591A\uFF0C\u5982\u4E0B\u56FE\uFF1A</p><p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/\u7F51\u7EDC/http1.1\u4F18\u5316/\u7F13\u5B58\u8BBF\u95EE.png" alt=""></p><p>\u806A\u660E\u7684\u4F60\u53EF\u80FD\u60F3\u5230\u4E86\uFF0C\u4E07\u4E00\u7F13\u5B58\u7684\u54CD\u5E94\u4E0D\u662F\u6700\u65B0\u7684\uFF0C\u800C\u5BA2\u6237\u7AEF\u5E76\u4E0D\u77E5\u60C5\uFF0C\u90A3\u4E48\u8BE5\u600E\u4E48\u529E\u5462\uFF1F</p><p>\u653E\u5FC3\uFF0C\u8FD9\u4E2A\u95EE\u9898 HTTP \u8BBE\u8BA1\u8005\u65E9\u5DF2\u8003\u8651\u5230\u3002</p><p>\u6240\u4EE5\uFF0C\u670D\u52A1\u5668\u5728\u53D1\u9001 HTTP \u54CD\u5E94\u65F6\uFF0C\u4F1A\u4F30\u7B97\u4E00\u4E2A\u8FC7\u671F\u7684\u65F6\u95F4\uFF0C\u5E76\u628A\u8FD9\u4E2A\u4FE1\u606F\u653E\u5230\u54CD\u5E94\u5934\u90E8\u4E2D\uFF0C\u8FD9\u6837\u5BA2\u6237\u7AEF\u5728\u67E5\u770B\u54CD\u5E94\u5934\u90E8\u7684\u4FE1\u606F\u65F6\uFF0C\u4E00\u65E6\u53D1\u73B0\u7F13\u5B58\u7684\u54CD\u5E94\u662F\u8FC7\u671F\u7684\uFF0C\u5219\u5C31\u4F1A\u91CD\u65B0\u53D1\u9001\u7F51\u7EDC\u8BF7\u6C42\u3002</p><p>\u5982\u679C\u5BA2\u6237\u7AEF\u4ECE\u7B2C\u4E00\u6B21\u8BF7\u6C42\u5F97\u5230\u7684\u54CD\u5E94\u5934\u90E8\u4E2D\u53D1\u73B0\u8BE5\u54CD\u5E94\u8FC7\u671F\u4E86\uFF0C\u5BA2\u6237\u7AEF\u91CD\u65B0\u53D1\u9001\u8BF7\u6C42\uFF0C\u5047\u8BBE\u670D\u52A1\u5668\u4E0A\u7684\u8D44\u6E90\u5E76\u6CA1\u6709\u53D8\u66F4\uFF0C\u8FD8\u662F\u8001\u6837\u5B50\uFF0C\u90A3\u4E48\u4F60\u89C9\u5F97\u8FD8\u8981\u5728\u670D\u52A1\u5668\u7684\u54CD\u5E94\u5E26\u4E0A\u8FD9\u4E2A\u8D44\u6E90\u5417\uFF1F</p><p>\u5F88\u663E\u7136\u4E0D\u5E26\u7684\u8BDD\uFF0C\u53EF\u4EE5\u63D0\u9AD8 HTTP \u534F\u8BAE\u7684\u6027\u80FD\uFF0C\u90A3\u5177\u4F53\u5982\u4F55\u505A\u5230\u5462\uFF1F</p><p>\u53EA\u9700\u8981\u5BA2\u6237\u7AEF\u5728\u91CD\u65B0\u53D1\u9001\u8BF7\u6C42\u65F6\uFF0C\u5728\u8BF7\u6C42\u7684 <code>Etag</code> \u5934\u90E8\u5E26\u4E0A\u7B2C\u4E00\u6B21\u8BF7\u6C42\u7684\u54CD\u5E94\u5934\u90E8\u4E2D\u7684\u6458\u8981\uFF0C\u8FD9\u4E2A\u6458\u8981\u662F\u552F\u4E00\u6807\u8BC6\u54CD\u5E94\u7684\u8D44\u6E90\uFF0C\u5F53\u670D\u52A1\u5668\u6536\u5230\u8BF7\u6C42\u540E\uFF0C\u4F1A\u5C06\u672C\u5730\u8D44\u6E90\u7684\u6458\u8981\u4E0E\u8BF7\u6C42\u4E2D\u7684\u6458\u8981\u505A\u4E2A\u6BD4\u8F83\u3002</p><p>\u5982\u679C\u4E0D\u540C\uFF0C\u90A3\u4E48\u8BF4\u660E\u5BA2\u6237\u7AEF\u7684\u7F13\u5B58\u5DF2\u7ECF\u6CA1\u6709\u4EF7\u503C\uFF0C\u670D\u52A1\u5668\u5728\u54CD\u5E94\u4E2D\u5E26\u4E0A\u6700\u65B0\u7684\u8D44\u6E90\u3002</p><p>\u5982\u679C\u76F8\u540C\uFF0C\u8BF4\u660E\u5BA2\u6237\u7AEF\u7684\u7F13\u5B58\u8FD8\u662F\u53EF\u4EE5\u7EE7\u7EED\u4F7F\u7528\u7684\uFF0C\u90A3\u4E48\u670D\u52A1\u5668<strong>\u4EC5\u8FD4\u56DE\u4E0D\u542B\u6709\u5305\u4F53\u7684 <code>304 Not Modified</code> \u54CD\u5E94</strong>\uFF0C\u544A\u8BC9\u5BA2\u6237\u7AEF\u4ECD\u7136\u6709\u6548\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u51CF\u5C11\u54CD\u5E94\u8D44\u6E90\u5728\u7F51\u7EDC\u4E2D\u4F20\u8F93\u7684\u5EF6\u65F6\uFF0C\u5982\u4E0B\u56FE\uFF1A</p><p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/\u7F51\u7EDC/http1.1\u4F18\u5316/\u7F13\u5B58etag.png" alt=""></p><p>\u7F13\u5B58\u771F\u7684\u662F\u6027\u80FD\u4F18\u5316\u7684\u4E00\u628A\u4E07\u80FD\u94A5\u5319\uFF0C\u5C0F\u5230 CPU Cache\u3001Page Cache\u3001Redis Cache\uFF0C\u5927\u5230 HTTP \u534F\u8BAE\u7684\u7F13\u5B58\u3002</p><hr><h2 id="\u5982\u4F55\u51CF\u5C11-http-\u8BF7\u6C42\u6B21\u6570" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u51CF\u5C11-http-\u8BF7\u6C42\u6B21\u6570" aria-hidden="true">#</a> \u5982\u4F55\u51CF\u5C11 HTTP \u8BF7\u6C42\u6B21\u6570\uFF1F</h2><p>\u51CF\u5C11 HTTP \u8BF7\u6C42\u6B21\u6570\u81EA\u7136\u4E5F\u5C31\u63D0\u5347\u4E86 HTTP \u6027\u80FD\uFF0C\u53EF\u4EE5\u4ECE\u8FD9 3 \u4E2A\u65B9\u9762\u5165\u624B\uFF1A</p><ul><li><em>\u51CF\u5C11\u91CD\u5B9A\u5411\u8BF7\u6C42\u6B21\u6570</em>\uFF1B</li><li><em>\u5408\u5E76\u8BF7\u6C42</em>\uFF1B</li><li><em>\u5EF6\u8FDF\u53D1\u9001\u8BF7\u6C42</em>\uFF1B</li></ul><h3 id="\u51CF\u5C11\u91CD\u5B9A\u5411\u8BF7\u6C42\u6B21\u6570" tabindex="-1"><a class="header-anchor" href="#\u51CF\u5C11\u91CD\u5B9A\u5411\u8BF7\u6C42\u6B21\u6570" aria-hidden="true">#</a> \u51CF\u5C11\u91CD\u5B9A\u5411\u8BF7\u6C42\u6B21\u6570</h3><p>\u6211\u4EEC\u5148\u6765\u770B\u770B\u4EC0\u4E48\u662F<strong>\u91CD\u5B9A\u5411\u8BF7\u6C42</strong>\uFF1F</p><p>\u670D\u52A1\u5668\u4E0A\u7684\u4E00\u4E2A\u8D44\u6E90\u53EF\u80FD\u7531\u4E8E\u8FC1\u79FB\u3001\u7EF4\u62A4\u7B49\u539F\u56E0\u4ECE url1 \u79FB\u81F3 url2 \u540E\uFF0C\u800C\u5BA2\u6237\u7AEF\u4E0D\u77E5\u60C5\uFF0C\u5B83\u8FD8\u662F\u7EE7\u7EED\u8BF7\u6C42 url1\uFF0C\u8FD9\u65F6\u670D\u52A1\u5668\u4E0D\u80FD\u7C97\u66B4\u5730\u8FD4\u56DE\u9519\u8BEF\uFF0C\u800C\u662F\u901A\u8FC7 <code>302</code> \u54CD\u5E94\u7801\u548C <code>Location</code> \u5934\u90E8\uFF0C\u544A\u8BC9\u5BA2\u6237\u7AEF\u8BE5\u8D44\u6E90\u5DF2\u7ECF\u8FC1\u79FB\u81F3 url2 \u4E86\uFF0C\u4E8E\u662F\u5BA2\u6237\u7AEF\u9700\u8981\u518D\u53D1\u9001 url2 \u8BF7\u6C42\u4EE5\u83B7\u5F97\u670D\u52A1\u5668\u7684\u8D44\u6E90\u3002</p><p>\u90A3\u4E48\uFF0C\u5982\u679C\u91CD\u5B9A\u5411\u8BF7\u6C42\u8D8A\u591A\uFF0C\u90A3\u4E48\u5BA2\u6237\u7AEF\u5C31\u8981\u591A\u6B21\u53D1\u8D77 HTTP \u8BF7\u6C42\uFF0C\u6BCF\u4E00\u6B21\u7684 HTTP \u8BF7\u6C42\u90FD\u5F97\u7ECF\u8FC7\u7F51\u7EDC\uFF0C\u8FD9\u65E0\u7591\u4F1A\u8D8A\u964D\u4F4E\u7F51\u7EDC\u6027\u80FD\u3002</p><p>\u53E6\u5916\uFF0C\u670D\u52A1\u7AEF\u8FD9\u4E00\u65B9\u5F80\u5F80\u4E0D\u53EA\u6709\u4E00\u53F0\u670D\u52A1\u5668\uFF0C\u6BD4\u5982\u6E90\u670D\u52A1\u5668\u4E0A\u4E00\u7EA7\u662F\u4EE3\u7406\u670D\u52A1\u5668\uFF0C\u7136\u540E\u4EE3\u7406\u670D\u52A1\u5668\u624D\u4E0E\u5BA2\u6237\u7AEF\u901A\u4FE1\uFF0C\u8FD9\u65F6\u5BA2\u6237\u7AEF\u91CD\u5B9A\u5411\u5C31\u4F1A\u5BFC\u81F4\u5BA2\u6237\u7AEF\u4E0E\u4EE3\u7406\u670D\u52A1\u5668\u4E4B\u95F4\u9700\u8981 2 \u6B21\u6D88\u606F\u4F20\u9012\uFF0C\u5982\u4E0B\u56FE\uFF1A</p><p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/\u7F51\u7EDC/http1.1\u4F18\u5316/\u5BA2\u6237\u7AEF\u91CD\u5B9A\u5411.png" alt=""></p><p>\u5982\u679C<strong>\u91CD\u5B9A\u5411\u7684\u5DE5\u4F5C\u4EA4\u7531\u4EE3\u7406\u670D\u52A1\u5668\u5B8C\u6210\uFF0C\u5C31\u80FD\u51CF\u5C11 HTTP \u8BF7\u6C42\u6B21\u6570\u4E86</strong>\uFF0C\u5982\u4E0B\u56FE\uFF1A</p><p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/\u7F51\u7EDC/http1.1\u4F18\u5316/\u4EE3\u7406\u670D\u52A1\u5668\u91CD\u5B9A\u5411.png" alt=""></p><p>\u800C\u4E14\u5F53\u4EE3\u7406\u670D\u52A1\u5668\u77E5\u6653\u4E86\u91CD\u5B9A\u5411\u89C4\u5219\u540E\uFF0C\u53EF\u4EE5\u8FDB\u4E00\u6B65\u51CF\u5C11\u6D88\u606F\u4F20\u9012\u6B21\u6570\uFF0C\u5982\u4E0B\u56FE\uFF1A</p><p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/\u7F51\u7EDC/http1.1\u4F18\u5316/\u4EE3\u7406\u670D\u52A1\u5668\u91CD\u5B9A\u54112.png" alt=""></p><p>\u9664\u4E86 <code>302</code> \u91CD\u5B9A\u5411\u54CD\u5E94\u7801\uFF0C\u8FD8\u6709\u5176\u4ED6\u4E00\u4E9B\u91CD\u5B9A\u5411\u7684\u54CD\u5E94\u7801\uFF0C\u4F60\u53EF\u4EE5\u4ECE\u4E0B\u56FE\u770B\u5230\uFF1A</p><p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/\u7F51\u7EDC/http1.1\u4F18\u5316/\u91CD\u5B9A\u5411\u54CD\u5E94\u7801.png" alt=""></p><p>\u5176\u4E2D\uFF0C<code>301</code> \u548C <code>308</code> \u54CD\u5E94\u7801\u662F\u544A\u8BC9\u5BA2\u6237\u7AEF\u53EF\u4EE5\u5C06\u91CD\u5B9A\u5411\u54CD\u5E94\u7F13\u5B58\u5230\u672C\u5730\u78C1\u76D8\uFF0C\u4E4B\u540E\u5BA2\u6237\u7AEF\u5C31\u81EA\u52A8\u7528 url2 \u66FF\u4EE3 url1 \u8BBF\u95EE\u670D\u52A1\u5668\u7684\u8D44\u6E90\u3002</p><h3 id="\u5408\u5E76\u8BF7\u6C42" tabindex="-1"><a class="header-anchor" href="#\u5408\u5E76\u8BF7\u6C42" aria-hidden="true">#</a> \u5408\u5E76\u8BF7\u6C42</h3><p>\u5982\u679C\u628A\u591A\u4E2A\u8BBF\u95EE\u5C0F\u6587\u4EF6\u7684\u8BF7\u6C42\u5408\u5E76\u6210\u4E00\u4E2A\u5927\u7684\u8BF7\u6C42\uFF0C\u867D\u7136\u4F20\u8F93\u7684\u603B\u8D44\u6E90\u8FD8\u662F\u4E00\u6837\uFF0C\u4F46\u662F\u51CF\u5C11\u8BF7\u6C42\uFF0C\u4E5F\u5C31\u610F\u5473\u7740<strong>\u51CF\u5C11\u4E86\u91CD\u590D\u53D1\u9001\u7684 HTTP \u5934\u90E8</strong>\u3002</p><p>\u53E6\u5916\u7531\u4E8E HTTP/1.1 \u662F\u8BF7\u6C42\u54CD\u5E94\u6A21\u578B\uFF0C\u5982\u679C\u7B2C\u4E00\u4E2A\u53D1\u9001\u7684\u8BF7\u6C42\uFF0C\u672A\u6536\u5230\u5BF9\u5E94\u7684\u54CD\u5E94\uFF0C\u90A3\u4E48\u540E\u7EED\u7684\u8BF7\u6C42\u5C31\u4E0D\u4F1A\u53D1\u9001\uFF08PS\uFF1AHTTP/1.1 \u7BA1\u9053\u6A21\u5F0F\u662F\u9ED8\u8BA4\u4E0D\u4F7F\u7528\u7684\uFF0C\u6240\u4EE5\u8BA8\u8BBA HTTP/1.1 \u7684\u961F\u5934\u963B\u585E\u95EE\u9898\uFF0C\u662F\u4E0D\u8003\u8651\u7BA1\u9053\u6A21\u5F0F\u7684\uFF09\uFF0C\u4E8E\u662F\u4E3A\u4E86\u9632\u6B62\u5355\u4E2A\u8BF7\u6C42\u7684\u963B\u585E\uFF0C\u6240\u4EE5<strong>\u4E00\u822C\u6D4F\u89C8\u5668\u4F1A\u540C\u65F6\u53D1\u8D77 5-6 \u4E2A\u8BF7\u6C42\uFF0C\u6BCF\u4E00\u4E2A\u8BF7\u6C42\u90FD\u662F\u4E0D\u540C\u7684 TCP \u8FDE\u63A5</strong>\uFF0C\u90A3\u4E48\u5982\u679C\u5408\u5E76\u4E86\u8BF7\u6C42\uFF0C\u4E5F\u5C31\u4F1A<strong>\u51CF\u5C11 TCP \u8FDE\u63A5\u7684\u6570\u91CF\uFF0C\u56E0\u800C\u7701\u53BB\u4E86 TCP \u63E1\u624B\u548C\u6162\u542F\u52A8\u8FC7\u7A0B\u8017\u8D39\u7684\u65F6\u95F4</strong>\u3002</p><p>\u63A5\u4E0B\u6765\uFF0C\u5177\u4F53\u770B\u770B\u5408\u5E76\u8BF7\u6C42\u7684\u51E0\u79CD\u65B9\u5F0F\u3002</p><p>\u6709\u7684\u7F51\u9875\u4F1A\u542B\u6709\u5F88\u591A\u5C0F\u56FE\u7247\u3001\u5C0F\u56FE\u6807\uFF0C\u6709\u591A\u5C11\u4E2A\u5C0F\u56FE\u7247\uFF0C\u5BA2\u6237\u7AEF\u5C31\u8981\u53D1\u8D77\u591A\u5C11\u6B21\u8BF7\u6C42\u3002\u90A3\u4E48\u5BF9\u4E8E\u8FD9\u4E9B\u5C0F\u56FE\u7247\uFF0C\u6211\u4EEC\u53EF\u4EE5\u8003\u8651\u4F7F\u7528 <code>CSS Image Sprites</code> \u6280\u672F\u628A\u5B83\u4EEC\u5408\u6210\u4E00\u4E2A\u5927\u56FE\u7247\uFF0C\u8FD9\u6837\u6D4F\u89C8\u5668\u5C31\u53EF\u4EE5\u7528\u4E00\u6B21\u8BF7\u6C42\u83B7\u5F97\u4E00\u4E2A\u5927\u56FE\u7247\uFF0C\u7136\u540E\u518D\u6839\u636E CSS \u6570\u636E\u628A\u5927\u56FE\u7247\u5207\u5272\u6210\u591A\u5F20\u5C0F\u56FE\u7247\u3002</p><p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/\u7F51\u7EDC/http1.1\u4F18\u5316/css\u7CBE\u7075.png" alt="\u56FE\u6765\u6E90\u4E8E\uFF1A\u58A8\u67D3\u67AB\u6797\u7684CSDN"></p><p>\u8FD9\u79CD\u65B9\u5F0F\u5C31\u662F<strong>\u901A\u8FC7\u5C06\u591A\u4E2A\u5C0F\u56FE\u7247\u5408\u5E76\u6210\u4E00\u4E2A\u5927\u56FE\u7247\u6765\u51CF\u5C11 HTTP \u8BF7\u6C42\u7684\u6B21\u6570\uFF0C\u4EE5\u51CF\u5C11 HTTP \u8BF7\u6C42\u7684\u6B21\u6570\uFF0C\u4ECE\u800C\u51CF\u5C11\u7F51\u7EDC\u7684\u5F00\u9500</strong>\u3002</p><p>\u9664\u4E86\u5C06\u5C0F\u56FE\u7247\u5408\u5E76\u6210\u5927\u56FE\u7247\u7684\u65B9\u5F0F\uFF0C\u8FD8\u6709\u670D\u52A1\u7AEF\u4F7F\u7528 <code>webpack</code> \u7B49\u6253\u5305\u5DE5\u5177\u5C06 js\u3001css \u7B49\u8D44\u6E90\u5408\u5E76\u6253\u5305\u6210\u5927\u6587\u4EF6\uFF0C\u4E5F\u662F\u80FD\u8FBE\u5230\u7C7B\u4F3C\u7684\u6548\u679C\u3002</p><p>\u53E6\u5916\uFF0C\u8FD8\u53EF\u4EE5\u5C06\u56FE\u7247\u7684\u4E8C\u8FDB\u5236\u6570\u636E\u7528 <code>base64</code> \u7F16\u7801\u540E\uFF0C\u4EE5 URL \u7684\u5F62\u5F0F\u5D4C\u5165\u5230 HTML \u6587\u4EF6\uFF0C\u8DDF\u968F HTML \u6587\u4EF6\u4E00\u5E76\u53D1\u9001.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;image src=&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAFKCAIAAAC7M9WrAAAACXBIWXMAA ... /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD9\u6837\u5BA2\u6237\u7AEF\u6536\u5230 HTML \u540E\uFF0C\u5C31\u53EF\u4EE5\u76F4\u63A5\u89E3\u7801\u51FA\u6570\u636E\uFF0C\u7136\u540E\u76F4\u63A5\u663E\u793A\u56FE\u7247\uFF0C\u5C31\u4E0D\u7528\u518D\u53D1\u8D77\u56FE\u7247\u76F8\u5173\u7684\u8BF7\u6C42\uFF0C\u8FD9\u6837\u4FBF\u51CF\u5C11\u4E86\u8BF7\u6C42\u7684\u6B21\u6570\u3002</p><p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/\u7F51\u7EDC/http1.1\u4F18\u5316/base64\u56FE\u7247.png" alt="\u56FE\u6765\u6E90\u4E8E\uFF1A\u9648\u5065\u5E73\u7684CSDN "></p><p>\u53EF\u4EE5\u770B\u5230\uFF0C<strong>\u5408\u5E76\u8BF7\u6C42\u7684\u65B9\u5F0F\u5C31\u662F\u5408\u5E76\u8D44\u6E90\uFF0C\u4EE5\u4E00\u4E2A\u5927\u8D44\u6E90\u7684\u8BF7\u6C42\u66FF\u6362\u591A\u4E2A\u5C0F\u8D44\u6E90\u7684\u8BF7\u6C42</strong>\u3002</p><p>\u4F46\u662F\u8FD9\u6837\u7684\u5408\u5E76\u8BF7\u6C42\u4F1A\u5E26\u6765\u65B0\u7684\u95EE\u9898\uFF0C<strong>\u5F53\u5927\u8D44\u6E90\u4E2D\u7684\u67D0\u4E00\u4E2A\u5C0F\u8D44\u6E90\u53D1\u751F\u53D8\u5316\u540E\uFF0C\u5BA2\u6237\u7AEF\u5FC5\u987B\u91CD\u65B0\u4E0B\u8F7D\u6574\u4E2A\u5B8C\u6574\u7684\u5927\u8D44\u6E90\u6587\u4EF6</strong>\uFF0C\u8FD9\u663E\u7136\u5E26\u6765\u4E86\u989D\u5916\u7684\u7F51\u7EDC\u6D88\u8017\u3002</p><h3 id="\u5EF6\u8FDF\u53D1\u9001\u8BF7\u6C42" tabindex="-1"><a class="header-anchor" href="#\u5EF6\u8FDF\u53D1\u9001\u8BF7\u6C42" aria-hidden="true">#</a> \u5EF6\u8FDF\u53D1\u9001\u8BF7\u6C42</h3><p>\u4E0D\u8981\u4E00\u53E3\u6C14\u5403\u6210\u5927\u80D6\u5B50\uFF0C\u4E00\u822C HTML \u91CC\u4F1A\u542B\u6709\u5F88\u591A HTTP \u7684 URL\uFF0C\u5F53\u524D\u4E0D\u9700\u8981\u7684\u8D44\u6E90\uFF0C\u6211\u4EEC\u6CA1\u5FC5\u8981\u4E5F\u83B7\u53D6\u8FC7\u6765\uFF0C\u4E8E\u662F\u53EF\u4EE5\u901A\u8FC7\u300C<strong>\u6309\u9700\u83B7\u53D6</strong>\u300D\u7684\u65B9\u5F0F\uFF0C\u6765\u51CF\u5C11\u7B2C\u4E00\u65F6\u95F4\u7684 HTTP \u8BF7\u6C42\u6B21\u6570\u3002</p><p>\u8BF7\u6C42\u7F51\u9875\u7684\u65F6\u5019\uFF0C\u6CA1\u5FC5\u8981\u628A\u5168\u90E8\u8D44\u6E90\u90FD\u83B7\u53D6\u5230\uFF0C\u800C\u662F\u53EA\u83B7\u53D6\u5F53\u524D\u7528\u6237\u6240\u770B\u5230\u7684\u9875\u9762\u8D44\u6E90\uFF0C\u5F53\u7528\u6237\u5411\u4E0B\u6ED1\u52A8\u9875\u9762\u7684\u65F6\u5019\uFF0C\u518D\u5411\u670D\u52A1\u5668\u83B7\u53D6\u63A5\u4E0B\u6765\u7684\u8D44\u6E90\uFF0C\u8FD9\u6837\u5C31\u8FBE\u5230\u4E86\u5EF6\u8FDF\u53D1\u9001\u8BF7\u6C42\u7684\u6548\u679C\u3002</p><hr><h2 id="\u5982\u4F55\u51CF\u5C11-http-\u54CD\u5E94\u7684\u6570\u636E\u5927\u5C0F" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u51CF\u5C11-http-\u54CD\u5E94\u7684\u6570\u636E\u5927\u5C0F" aria-hidden="true">#</a> \u5982\u4F55\u51CF\u5C11 HTTP \u54CD\u5E94\u7684\u6570\u636E\u5927\u5C0F\uFF1F</h2><p>\u5BF9\u4E8E HTTP \u7684\u8BF7\u6C42\u548C\u54CD\u5E94\uFF0C\u901A\u5E38 HTTP \u7684\u54CD\u5E94\u7684\u6570\u636E\u5927\u5C0F\u4F1A\u6BD4\u8F83\u5927\uFF0C\u4E5F\u5C31\u662F\u670D\u52A1\u5668\u8FD4\u56DE\u7684\u8D44\u6E90\u4F1A\u6BD4\u8F83\u5927\u3002</p><p>\u4E8E\u662F\uFF0C\u6211\u4EEC\u53EF\u4EE5\u8003\u8651\u5BF9\u54CD\u5E94\u7684\u8D44\u6E90\u8FDB\u884C<strong>\u538B\u7F29</strong>\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u51CF\u5C11\u54CD\u5E94\u7684\u6570\u636E\u5927\u5C0F\uFF0C\u4ECE\u800C\u63D0\u9AD8\u7F51\u7EDC\u4F20\u8F93\u7684\u6548\u7387\u3002</p><p>\u538B\u7F29\u7684\u65B9\u5F0F\u4E00\u822C\u5206\u4E3A 2 \u79CD\uFF0C\u5206\u522B\u662F\uFF1A</p><ul><li><em>\u65E0\u635F\u538B\u7F29</em>\uFF1B</li><li><em>\u6709\u635F\u538B\u7F29</em>\uFF1B</li></ul><h3 id="\u65E0\u635F\u538B\u7F29" tabindex="-1"><a class="header-anchor" href="#\u65E0\u635F\u538B\u7F29" aria-hidden="true">#</a> \u65E0\u635F\u538B\u7F29</h3><p>\u65E0\u635F\u538B\u7F29\u662F\u6307\u8D44\u6E90\u7ECF\u8FC7\u538B\u7F29\u540E\uFF0C\u4FE1\u606F\u4E0D\u88AB\u7834\u574F\uFF0C\u8FD8\u80FD\u5B8C\u5168\u6062\u590D\u5230\u538B\u7F29\u524D\u7684\u539F\u6837\uFF0C\u9002\u5408\u7528\u5728\u6587\u672C\u6587\u4EF6\u3001\u7A0B\u5E8F\u53EF\u6267\u884C\u6587\u4EF6\u3001\u7A0B\u5E8F\u6E90\u4EE3\u7801\u3002</p><p>\u9996\u5148\uFF0C\u6211\u4EEC\u9488\u5BF9\u4EE3\u7801\u7684\u8BED\u6CD5\u89C4\u5219\u8FDB\u884C\u538B\u7F29\uFF0C\u56E0\u4E3A\u901A\u5E38\u4EE3\u7801\u6587\u4EF6\u90FD\u6709\u5F88\u591A\u6362\u884C\u7B26\u6216\u8005\u7A7A\u683C\uFF0C\u8FD9\u4E9B\u662F\u4E3A\u4E86\u5E2E\u52A9\u7A0B\u5E8F\u5458\u66F4\u597D\u7684\u9605\u8BFB\uFF0C\u4F46\u662F\u673A\u5668\u6267\u884C\u65F6\u5E76\u4E0D\u8981\u8FD9\u4E9B\u7B26\uFF0C\u628A\u8FD9\u4E9B\u591A\u4F59\u7684\u7B26\u53F7\u7ED9\u53BB\u9664\u6389\u3002</p><p>\u63A5\u4E0B\u6765\uFF0C\u5C31\u662F\u65E0\u635F\u538B\u7F29\u4E86\uFF0C\u9700\u8981\u5BF9\u539F\u59CB\u8D44\u6E90\u5EFA\u7ACB\u7EDF\u8BA1\u6A21\u578B\uFF0C\u5229\u7528\u8FD9\u4E2A\u7EDF\u8BA1\u6A21\u578B\uFF0C\u5C06\u5E38\u51FA\u73B0\u7684\u6570\u636E\u7528\u8F83\u77ED\u7684\u4E8C\u8FDB\u5236\u6BD4\u7279\u5E8F\u5217\u8868\u793A\uFF0C\u5C06\u4E0D\u5E38\u51FA\u73B0\u7684\u6570\u636E\u7528\u8F83\u957F\u7684\u4E8C\u8FDB\u5236\u6BD4\u7279\u5E8F\u5217\u8868\u793A\uFF0C\u751F\u6210\u4E8C\u8FDB\u5236\u6BD4\u7279\u5E8F\u5217\u4E00\u822C\u662F\u300C\u970D\u592B\u66FC\u7F16\u7801\u300D\u7B97\u6CD5\u3002</p><p>gzip \u5C31\u662F\u6BD4\u8F83\u5E38\u89C1\u7684\u65E0\u635F\u538B\u7F29\u3002\u5BA2\u6237\u7AEF\u652F\u6301\u7684\u538B\u7F29\u7B97\u6CD5\uFF0C\u4F1A\u5728 HTTP \u8BF7\u6C42\u4E2D\u901A\u8FC7\u5934\u90E8\u4E2D\u7684 <code>Accept-Encoding</code> \u5B57\u6BB5\u544A\u8BC9\u670D\u52A1\u5668\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Accept-Encoding: gzip, deflate, br
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u670D\u52A1\u5668\u6536\u5230\u540E\uFF0C\u4F1A\u4ECE\u4E2D\u9009\u62E9\u4E00\u4E2A\u670D\u52A1\u5668\u652F\u6301\u7684\u6216\u8005\u5408\u9002\u7684\u538B\u7F29\u7B97\u6CD5\uFF0C\u7136\u540E\u4F7F\u7528\u6B64\u538B\u7F29\u7B97\u6CD5\u5BF9\u54CD\u5E94\u8D44\u6E90\u8FDB\u884C\u538B\u7F29\uFF0C\u6700\u540E\u901A\u8FC7\u54CD\u5E94\u5934\u90E8\u4E2D\u7684 <code>Content-Encoding</code> \u5B57\u6BB5\u544A\u8BC9\u5BA2\u6237\u7AEF\u8BE5\u8D44\u6E90\u4F7F\u7528\u7684\u538B\u7F29\u7B97\u6CD5\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Content-Encoding: gzip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>gzip \u7684\u538B\u7F29\u6548\u7387\u76F8\u6BD4 Google \u63A8\u51FA\u7684 Brotli \u7B97\u6CD5\u8FD8\u662F\u5DEE\u70B9\u610F\u601D\uFF0C\u4E5F\u5C31\u662F\u4E0A\u6587\u4E2D\u7684 br\uFF0C\u6240\u4EE5\u5982\u679C\u53EF\u4EE5\uFF0C\u670D\u52A1\u5668\u5E94\u8BE5\u9009\u62E9\u538B\u7F29\u6548\u7387\u66F4\u9AD8\u7684 br \u538B\u7F29\u7B97\u6CD5\u3002</p><h3 id="\u6709\u635F\u538B\u7F29" tabindex="-1"><a class="header-anchor" href="#\u6709\u635F\u538B\u7F29" aria-hidden="true">#</a> \u6709\u635F\u538B\u7F29</h3><p>\u4E0E\u65E0\u635F\u538B\u7F29\u76F8\u5BF9\u7684\u5C31\u662F\u6709\u635F\u538B\u7F29\uFF0C\u7ECF\u8FC7\u6B64\u65B9\u6CD5\u538B\u7F29\uFF0C\u89E3\u538B\u7684\u6570\u636E\u4F1A\u4E0E\u539F\u59CB\u6570\u636E\u4E0D\u540C\u4F46\u662F\u975E\u5E38\u63A5\u8FD1\u3002</p><p>\u6709\u635F\u538B\u7F29\u4E3B\u8981\u5C06\u6B21\u8981\u7684\u6570\u636E\u820D\u5F03\uFF0C\u727A\u7272\u4E00\u4E9B\u8D28\u91CF\u6765\u51CF\u5C11\u6570\u636E\u91CF\u3001\u63D0\u9AD8\u538B\u7F29\u6BD4\uFF0C\u8FD9\u79CD\u65B9\u6CD5\u7ECF\u5E38\u7528\u4E8E\u538B\u7F29\u591A\u5A92\u4F53\u6570\u636E\uFF0C\u6BD4\u5982\u97F3\u9891\u3001\u89C6\u9891\u3001\u56FE\u7247\u3002</p><p>\u53EF\u4EE5\u901A\u8FC7 HTTP \u8BF7\u6C42\u5934\u90E8\u4E2D\u7684 <code>Accept</code> \u5B57\u6BB5\u91CC\u7684\u300C q \u8D28\u91CF\u56E0\u5B50\u300D\uFF0C\u544A\u8BC9\u670D\u52A1\u5668\u671F\u671B\u7684\u8D44\u6E90\u8D28\u91CF\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Accept: audio/*; q=0.2, audio/basic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5173\u4E8E\u56FE\u7247\u7684\u538B\u7F29\uFF0C\u76EE\u524D\u538B\u7F29\u6BD4\u8F83\u9AD8\u7684\u662F Google \u63A8\u51FA\u7684 <strong>WebP \u683C\u5F0F</strong>\uFF0C\u5B83\u4E0E\u5E38\u89C1\u7684 Png \u683C\u5F0F\u56FE\u7247\u7684\u538B\u7F29\u6BD4\u4F8B\u5BF9\u6BD4\u5982\u4E0B\u56FE\uFF1A</p><p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/\u7F51\u7EDC/http1.1\u4F18\u5316/webp\u4E0Epng.png" alt="\u6765\u6E90\u4E8E\uFF1Ahttps://isparta.github.io/compare-webp/index.html"></p><p>\u53EF\u4EE5\u53D1\u73B0\uFF0C\u76F8\u540C\u56FE\u7247\u8D28\u91CF\u4E0B\uFF0CWebP \u683C\u5F0F\u7684\u56FE\u7247\u5927\u5C0F\u90FD\u6BD4 Png \u683C\u5F0F\u7684\u56FE\u7247\u5C0F\uFF0C\u6240\u4EE5\u5BF9\u4E8E\u5927\u91CF\u56FE\u7247\u7684\u7F51\u7AD9\uFF0C\u53EF\u4EE5\u8003\u8651\u4F7F\u7528 WebP \u683C\u5F0F\u7684\u56FE\u7247\uFF0C\u8FD9\u5C06\u5927\u5E45\u5EA6\u63D0\u5347\u7F51\u7EDC\u4F20\u8F93\u7684\u6027\u80FD\u3002</p><p>\u5173\u4E8E\u97F3\u89C6\u9891\u7684\u538B\u7F29\uFF0C\u97F3\u89C6\u9891\u4E3B\u8981\u662F\u52A8\u6001\u7684\uFF0C\u6BCF\u4E2A\u5E27\u90FD\u6709\u65F6\u5E8F\u7684\u5173\u7CFB\uFF0C\u901A\u5E38\u65F6\u95F4\u8FDE\u7EED\u7684\u5E27\u4E4B\u95F4\u7684\u53D8\u5316\u662F\u5F88\u5C0F\u7684\u3002</p><p>\u6BD4\u5982\uFF0C\u4E00\u4E2A\u5728\u770B\u4E66\u7684\u89C6\u9891\uFF0C\u753B\u9762\u901A\u5E38\u53EA\u6709\u4EBA\u7269\u7684\u624B\u548C\u4E66\u684C\u4E0A\u7684\u4E66\u662F\u4F1A\u6709\u53D8\u5316\u7684\uFF0C\u800C\u5176\u4ED6\u5730\u65B9\u901A\u5E38\u90FD\u662F\u9759\u6001\u7684\uFF0C\u4E8E\u662F\u53EA\u9700\u8981\u5728\u4E00\u4E2A\u9759\u6001\u7684\u5173\u952E\u5E27\uFF0C\u4F7F\u7528<strong>\u589E\u91CF\u6570\u636E</strong>\u6765\u8868\u8FBE\u540E\u7EED\u7684\u5E27\uFF0C\u8FD9\u6837\u4FBF\u51CF\u5C11\u4E86\u5F88\u591A\u6570\u636E\uFF0C\u63D0\u9AD8\u4E86\u7F51\u7EDC\u4F20\u8F93\u7684\u6027\u80FD\u3002\u5BF9\u4E8E\u89C6\u9891\u5E38\u89C1\u7684\u7F16\u7801\u683C\u5F0F\u6709 H264\u3001H265 \u7B49\uFF0C\u97F3\u9891\u5E38\u89C1\u7684\u7F16\u7801\u683C\u5F0F\u6709 AAC\u3001AC3\u3002</p><hr><h2 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h2><p>\u8FD9\u6B21\u4E3B\u8981\u4ECE 3 \u4E2A\u65B9\u9762\u4ECB\u7ECD\u4E86\u4F18\u5316 HTTP/1.1 \u534F\u8BAE\u7684\u601D\u8DEF\u3002</p><p>\u7B2C\u4E00\u4E2A\u601D\u8DEF\u662F\uFF0C\u901A\u8FC7\u7F13\u5B58\u6280\u672F\u6765\u907F\u514D\u53D1\u9001 HTTP \u8BF7\u6C42\u3002\u5BA2\u6237\u7AEF\u6536\u5230\u7B2C\u4E00\u4E2A\u8BF7\u6C42\u7684\u54CD\u5E94\u540E\uFF0C\u53EF\u4EE5\u5C06\u5176\u7F13\u5B58\u5728\u672C\u5730\u78C1\u76D8\uFF0C\u4E0B\u6B21\u8BF7\u6C42\u7684\u65F6\u5019\uFF0C\u5982\u679C\u7F13\u5B58\u6CA1\u8FC7\u671F\uFF0C\u5C31\u76F4\u63A5\u8BFB\u53D6\u672C\u5730\u7F13\u5B58\u7684\u54CD\u5E94\u6570\u636E\u3002\u5982\u679C\u7F13\u5B58\u8FC7\u671F\uFF0C\u5BA2\u6237\u7AEF\u53D1\u9001\u8BF7\u6C42\u7684\u65F6\u5019\u5E26\u4E0A\u54CD\u5E94\u6570\u636E\u7684\u6458\u8981\uFF0C\u670D\u52A1\u5668\u6BD4\u5BF9\u540E\u53D1\u73B0\u8D44\u6E90\u6CA1\u6709\u53D8\u5316\uFF0C\u5C31\u53D1\u51FA\u4E0D\u5E26\u5305\u4F53\u7684 304 \u54CD\u5E94\uFF0C\u544A\u8BC9\u5BA2\u6237\u7AEF\u7F13\u5B58\u7684\u54CD\u5E94\u4ECD\u7136\u6709\u6548\u3002</p><p>\u7B2C\u4E8C\u4E2A\u601D\u8DEF\u662F\uFF0C\u51CF\u5C11 HTTP \u8BF7\u6C42\u7684\u6B21\u6570\uFF0C\u6709\u4EE5\u4E0B\u7684\u65B9\u6CD5\uFF1A</p><ol><li>\u5C06\u539F\u672C\u7531\u5BA2\u6237\u7AEF\u5904\u7406\u7684\u91CD\u5B9A\u5411\u8BF7\u6C42\uFF0C\u4EA4\u7ED9\u4EE3\u7406\u670D\u52A1\u5668\u5904\u7406\uFF0C\u8FD9\u6837\u53EF\u4EE5\u51CF\u5C11\u91CD\u5B9A\u5411\u8BF7\u6C42\u7684\u6B21\u6570\uFF1B</li><li>\u5C06\u591A\u4E2A\u5C0F\u8D44\u6E90\u5408\u5E76\u6210\u4E00\u4E2A\u5927\u8D44\u6E90\u518D\u4F20\u8F93\uFF0C\u80FD\u591F\u51CF\u5C11 HTTP \u8BF7\u6C42\u6B21\u6570\u4EE5\u53CA \u5934\u90E8\u7684\u91CD\u590D\u4F20\u8F93\uFF0C\u518D\u6765\u51CF\u5C11 TCP \u8FDE\u63A5\u6570\u91CF\uFF0C\u8FDB\u800C\u7701\u53BB TCP \u63E1\u624B\u548C\u6162\u542F\u52A8\u7684\u7F51\u7EDC\u6D88\u8017\uFF1B</li><li>\u6309\u9700\u8BBF\u95EE\u8D44\u6E90\uFF0C\u53EA\u8BBF\u95EE\u5F53\u524D\u7528\u6237\u770B\u5F97\u5230/\u7528\u5F97\u5230\u7684\u8D44\u6E90\uFF0C\u5F53\u5BA2\u6237\u5F80\u4E0B\u6ED1\u52A8\uFF0C\u518D\u8BBF\u95EE\u63A5\u4E0B\u6765\u7684\u8D44\u6E90\uFF0C\u4EE5\u6B64\u8FBE\u5230\u5EF6\u8FDF\u8BF7\u6C42\uFF0C\u4E5F\u5C31\u51CF\u5C11\u4E86\u540C\u4E00\u65F6\u95F4\u7684 HTTP \u8BF7\u6C42\u6B21\u6570\u3002</li></ol><p>\u7B2C\u4E09\u601D\u8DEF\u662F\uFF0C\u901A\u8FC7\u538B\u7F29\u54CD\u5E94\u8D44\u6E90\uFF0C\u964D\u4F4E\u4F20\u8F93\u8D44\u6E90\u7684\u5927\u5C0F\uFF0C\u4ECE\u800C\u63D0\u9AD8\u4F20\u8F93\u6548\u7387\uFF0C\u6240\u4EE5\u5E94\u5F53\u9009\u62E9\u66F4\u4F18\u79C0\u7684\u538B\u7F29\u7B97\u6CD5\u3002</p><p>\u4E0D\u7BA1\u600E\u4E48\u4F18\u5316 HTTP/1.1 \u534F\u8BAE\u90FD\u662F\u6709\u9650\u7684\uFF0C\u4E0D\u7136\u4E5F\u4E0D\u4F1A\u51FA\u73B0 HTTP/2 \u548C HTTP/3 \u534F\u8BAE\uFF0C\u540E\u7EED\u6211\u4EEC\u518D\u6765\u4ECB\u7ECD HTTP/2 \u548C HTTP/3 \u534F\u8BAE\u3002</p><p>\u597D\u4E86\uFF0C\u6B64\u6B21\u5206\u4EAB\u5230\u8FD9\u5C31\u7ED3\u675F\u4E86\uFF0C\u5982\u679C\u8FD9\u7BC7\u6587\u7AE0\u5BF9\u4F60\u6709\u5E2E\u52A9\uFF0C\u6B22\u8FCE\u6765\u4E2A\u4E09\u8FDE\uFF0C\u4F60\u4EEC\u7684\u652F\u6301\u5C31\u662F\u5C0F\u6797\u7684\u6700\u5927\u52A8\u529B\uFF0C\u6211\u4EEC\u4E0B\u6B21\u89C1\uFF01</p><hr><p>\u53C2\u8003\u8D44\u6599\uFF1A</p><ol><li>https://isparta.github.io/compare-webp/index.html</li><li>https://zh.wikipedia.org/wiki/https://en.wikipedia.org/wiki/Lossy_compression</li><li>https://en.wikipedia.org/wiki/Lossless_compression</li><li>https://time.geekbang.org/column/article/242667</li><li>https://www.tutorialrepublic.com/css-tutorial/css-sprites.php</li><li>https://blog.csdn.net/weixin_38055381/article/details/81504716</li><li>https://blog.csdn.net/weixin_44151887/article/details/106278559</li></ol><hr>`,98),o=[n];function r(s,d){return i(),t("div",null,o)}const l=e(a,[["render",r],["__file","http-optimize.html.vue"]]);export{l as default};