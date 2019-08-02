const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.url);

    if (request.url === "/") {
        let html = fs.readFileSync('index.html', 'utf8')
        response.writeHead(200, {
            'Content-Type': 'text/html',
            // 'Content-Security-Policy': 'default-src http: https:'
            // form-action \'slef\' 可以限制表单向外提交
            // 'Content-Security-Policy': 'default-src \'self\'; ' +
            //     'form-action \'self\';' + 'report-uri /report'
            'Content-Security-Policy-Report-Only': 'default-src \'self\'; ' +
                'form-action \'self\';' + 'report-uri /report'
            // + Report-Only 检测到但是还是执行
        })
        response.end(html)
    } else {
        response.writeHead(200, {
            'Content-Type': 'application/javascript',
        })
        response.end('script loaded')
    }

}).listen(8888)

console.log('server listening on 8888');