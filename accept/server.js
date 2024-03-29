const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

http.createServer(function (request, response) {
    console.log('request come', request.url);

    const html = fs.readFileSync('index.html')

    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Encoding': 'gzip'
    })
    response.end(zlib.gzipSync(html))

}).listen(8888)

console.log('server listening on 8888');