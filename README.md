# HTTP-learn

## HTTP的发展历史
+ HTTP1.0
 1. 增加命令和响应码
+ HTTP1.1
 1. 允许持久连接
 2.  pipeline 打包发送 保持顺序
     1. 无管道化的例子
     发送顺序：req1->res1 -> req2->res2 -> req3->res3
     2. 管道化的例子 请求和响应都打包
     发送顺序：req1->req2->req3 -> res1->res2->res3
 3.  增加host及其他指令
+ 在HTTP1.1 基础上HTTPS 增加安全性 使用字符串传输
1. HTTP + SSL
2. 加密 公钥私钥 握手时传递 => 主密钥
3. 在客户端使用公钥加密客户端密钥，服务器端用私钥解密得到客户端密钥
4. HTTPS能够实现身份认证、消息完整性确认及加密传输的功能
+ HTTP2.0
1. 所有数据用二进制传输
2. 分侦传输
3. 信道复用 
4. 头信息压缩
5. 推送 Server Push （Link 属性）
+  ...

## 前后端通信的三种方式
1. AJAX 原生(XMLHttpRequest)

       // 使用原生方法创建ajax时，考虑兼容性问题
       var xhr = XMLHttpRequest
           ? new XMLHttpRequest()
           : new ActiveXObject('Microsoft.XMLHTTP')
       var url = ''
       xhr.open('GET', url, true)
       // 或者POST 大写！
       // POST需要设置请求头setRequestHeader('content-type','application/x-www-form-urlencoded')
       xhr.send()
       // 接收状态码
       xhr.onload = function () {
           // 成功或使用缓存
           if (xhr.status === 200 || xhr.status === 304) {
               var res = xhr.responseText
               res = JSON.parse(res)
               // 成功和失败的回调
                  function succ(){}
               function error(){}
               succ.call(xhr,res)
               error.call(xhr,res)
           }
       }

2. WebSocket   https=>wss/http=>ws

        var ws = new WebSocket('wss://echo.websocket.org')
        ws.onopen = function (evt) {
            ws.send('Hello!')
        }
        ws.onmessage = function (evt) {
            ws.close()
        }
        ws.onclose = function (evt) {
            console.log("WebSocket closed.")
        }

3. CORS 跨域资源共享 fetch 

        // 参数通过服务端设置
        // 跨域后台设置
        res.writeHead(200, {
            'Access-Control-Allow-Credentials': 'true',     // 后端允许发送Cookie
            'Access-Control-Allow-Origin': 'http://www.demo1.com',    // 允许访问的域（协议+域名+端口）
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'acaHeader',
            'Set-Cookie': 'l=a123456;Path=/;Domain=www.demo2.com;HttpOnly'   // HttpOnly:脚本无法读取cookie 防范XSS
        });
        fetch('some/url', {
            method: 'get'
        }).then(function (response) {
    
        }).catch(function (err) {
    
        })

## 跨域 cross-domain
1. JSONP

       var script = document.createElement('script')
       script.type = 'text/javascript'
       // 传参并指定回调执行函数为onBack
       script.src = 'url' + 'login?user=admin&callback=onBack'
       document.head.appendChild(script)
       function onBack(res) {
           console.log(JSON.stringify(res));
       }
       
2. CORS
3. nginx代理 示意图 <待补充>

![image](https://images2018.cnblogs.com/blog/461976/201808/461976-20180829202604273-241278886.png)

       
       server {
           listen 3000;
           server_name a.test.com

           location / {
               root /test-static-app;
               index index.html index.htm;
           }

           location /api {
            proxy_pass https://b.test.com;
            // 实现了cookie的传递与回写
            proxy_cookie_domain b.test.com a.test.com;
           }

           error_page 500 502 503 504  /50x.html;
           location = /50x.html {
               root html;
           }
       }
4. 空 iframe + window.name 需要借助一个同源窗口实现跳转
5. 设置 document.domain + iframe

       // 父子窗口都设置 必须在同一个主域下
       // contentWindow注意这个属性 能获取到iframe
       // document.domain = '主域.com'
      
6. location.hash +iframe
7. websocket
8. postMessage 接收信息message的API

       中文方式表示：
       
       ①寄信人foo给收信人bar寄信
       收信人.postMessage('信的内容',收信人的地址(URL))
       
       window.addEventListener('回信的内容',校验回调函数)
       
       ②收信人bar给寄信人foo回信
       window.addEventListener('信的内容',校验回调函数)
       参数：
       event.origin:寄信人地址URL
       event.source:寄信人对象
       event.data:信内容
       
       寄信人.postMessage('回信的内容',寄信人的地址(URL))
       
9. nodejs中间件

### 同源策略下 请求不同源的资源 如端口号不同时

demo中通过localhost:8888访问localhost:8887中的资源 报错

(CORS)设置Access-Control-Allow-xxx信息后 解决
+         // 允许的请求域
          'Access-Control-Allow-Origin': '*',
          // 允许的请求头
          'Access-Control-Allow-Headers': 'X-Test-Cors',
          // 允许的请求方法
          'Access-Control-Allow-Methods': 'POST, GET, PUT',
          // 在上次请求成功后 保持一段时间不同再发预请求
          'Access-Control-Max-Age': '1000'
+ 注意GET/POST/HEAD是简单请求 不需要预请求
+ 其余请求均需要预请求 返回204后再发送请求

plus: http https chrome chrome-extension weapp 上述协议才允许跨域 (未验证)

## Cache-Control 强缓存
+ 可缓存性
1. public 
2. private 
2. no-cache: 依旧保存缓存 但是每次都会询问服务器是否能使用缓存
+ 到期
1. max-age
+ 重新验证
1. must-revalidate: 过期后必须去原服务器上验证
2. proxy-revalidate: 过期后去代理服务器上验证
+ 其他
1. no-store: 彻底不缓存
2. no-transform: 告诉代理服务器不要操作内容
 
上面的 expires 和 cache-control 都会访问本地缓存直接验证看是否过期，如果没过期直接使用本地缓存，并返回 200。
但如果设置了 no-cache 和 no-store 则本地缓存会被忽略，会去请求服务器验证资源是否更新，如果没更新才继续使用本地缓存，此时返回的是 304，这就是协商缓存。

## Etag Last-Modified 协商缓存 

在设置no-cache时，通过上述两项询问服务器是否使用缓存 304

+ Last-Modified 上次修改时间
1. If-Modified-Since
2. If-Unmodified-Since
+  Etag 数据签名 常用hash
1. If-Match
2. If-Non-Match

## cookie
1. max-age 和 expires 设置过期时间
2. 键值对 
3. domain 设置域名 cookie不能跨域设置！
4. 设置方式 数组
 +             response.writeHead(200, {
                   'Content-Type': 'text/html',
                   // 通过数组传入多个cookie max-age=秒
                   'Set-Cookie': ['name=XBB; Secure; Domain=somecom.cn', 'id=1; HttpOnly']
               })
 + Secure 只在https协议下发送
 + HttpOnly 无法通过document.cookie访问 避免 CSRF攻击

## Connection
1. keep-Alive 保持连接 复用同一个TCP连接
2. close 则不复用
 + QUIC/43 HTTP/3 拓展...

## Redirect 
1. 301 永久跳转 使用时要谨慎 如果过客户端不清除缓存 则服务端的修改永远无法生效
2. 302 临时跳转 每次跳转前都会询问服务器 
3. 303 强制将POST请求转变为GET
4. 307 遵循实际上的302规定，即禁止POST转为GET
