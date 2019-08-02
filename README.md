# HTTP-learn-demo

## HTTP的发展历史
+ HTTP1.0
 1. 增加命令和响应码
+ HTTP1.1
 1. 允许持久连接
 2.  pipeline
 3.  增加host及其他指令
+ 在HTTP1.1 基础上HTTPS 增加安全性 使用字符串传输
1. HTTP + SSL
2. 加密 公钥私钥 握手时传递 => 主密钥
+ HTTP2.0
1. 所有数据用二进制传输
2. 分侦传输
3. 信道复用 
4. 头信息压缩
5. 推送 Server Push （Link 属性）
+  ...

## 跨域 cross-domain
1. JSONP
2. CORS
3. nginx代理
4. 空iframe+form
5. 设置document.domain

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
+ 注意GET/POST/HEADER是简单请求 不需要预请求
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
 
## Etag Last-Modified 协商缓存 (max-age设置特别长 )

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
                   'Set-Cookie': ['name=XBB; secure', 'id=1; HttpOnly']
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