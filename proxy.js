const http = require('http')
const request = require('request')

const hostname = '127.0.0.1'
const port = 8010
const imgPort = 8011
//http.createServer 在本机创建一个 http server, 可以监听指定 port 上的所有request
const apiServer = http.createServer((req, res) => {
    const url = 'http://news-at.zhihu.com/api/4' + req.url
    const options = {
        url: url
    }

    function callback(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.setHeader('Content-Type', 'text/plain;charset=UTF-8')
            //告诉浏览器允许任何 origin access resource
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.end(body)
        }
    }
    request.get(options, callback)
})

apiServer.listen(port, hostname, () => {
    console.log(`接口代理运行在 http://${hostname}:${port}/`)
})

const imgServer = http.createServer((req, res) => {
    const url = req.url.split('/img/')[1];
    const options = {
        url: url,
        encoding: null
    }
    function callback(error, response, body) {
        if (!error && response.statusCode === 200) {
            const contentType = response.headers['content-type']
            res.setHeader('Content-Type', contentType)
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.end(body)
        }
    }
    request.get(options, callback)
})

imgServer.listen(imgPort, hostname, () => {
    console.log(`图片代理运行在 http://${hostname}:${imgPort}/`)
})