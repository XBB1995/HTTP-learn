const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.url);

    const html = fs.readFileSync('index.html', 'utf8')
    const img = fs.readFileSync('banner.jpg')
    if (request.url === '/') {
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'Connection': 'close'
            // 通过数组传入多个cookie max-age=秒
            // 'Set-Cookie': ['name=XBB; Secure', 'id=1; HttpOnly']
        })
        response.end(html)
    } else {
        response.writeHead(200, {
            'Content-Type': 'image/jpg',
            'Connection': 'close'
            // 通过数组传入多个cookie max-age=秒
            // 'Set-Cookie': ['name=XBB; Secure', 'id=1; HttpOnly']
        })
        response.end(img)
    }

    // if (request.url === '/script.js') {
    //     const etag = request.headers['if-none-match']
    //     if (etag === '777') {
    //         response.writeHead(304, {
    //             'Content-Type': 'text/javascript',
    //             'Cache-Control': 'max-age=20000000, no-store',
    //             'Last-Modified': '123',
    //             'Etag': '777'
    //         })
    //         response.end('kkkkk')
    //     } else {
    //         response.writeHead(200, {
    //             'Content-Type': 'text/javascript',
    //             'Cache-Control': 'max-age=20000000, no-store',
    //             'Last-Modified': '123',
    //             'Etag': '777'
    //         })
    //         response.end('console.log("script loaded now")')
    //     }
    //
    // }

}).listen(8888)

console.log('server listening on 8888');