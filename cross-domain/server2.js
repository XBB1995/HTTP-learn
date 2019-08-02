const http = require('http')
http.createServer(function (request, response) {
    console.log('request come', request.url);
    response.writeHead(200, {
        // 允许的请求域
        'Access-Control-Allow-Origin': '*',
        // 允许的请求头
        'Access-Control-Allow-Headers': 'X-Test-Cors',
        // 允许的请求方法
        'Access-Control-Allow-Methods': 'POST, GET, PUT',
        // 在上次请求成功后 保持一段时间不同再发预请求
        'Access-Control-Max-Age': '1000'
    })
    response.end('1234')
}).listen(8887)

console.log('server listening on 8887');