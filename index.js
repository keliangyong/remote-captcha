const http = require('http')
const querystring = require('querystring')
const mime = require('mime')
const app = require('http').createServer(server)
const io = require('socket.io')(app)
const fs = require('fs')
const socket_handler = require('./socketHandler')

app.listen(9000)

function server(req, res) {
  if (!req.url.match(/\./) && !req.url.match('getCaptcha') && !req.url.match('submit')) { // 其他无效请求
    res.writeHead(404, 'Not Found')
    res.end(`DATA NOT FOUND ${req.url}`)
  }
  if (req.url.match(/\./)) {        // 静态资源处理
    Promise.resolve({
      then: (resolve, reject) => {
        let url = req.url.split('?')[0]
        let path = `./public${url}`
        fs.readFile(path, (err, data) => {
          if (err) {
            res.writeHead(404, 'Not Found')
            res.end(`DATA NOT FOUND ${err.stack}`)
          } else {
            res.writeHead(200, 'ok', { 'Content-Type': mime.lookup(path) })
            res.end(data)
          }
          resolve()
        })
      }
    })
  } else {
    var query = querystring.parse(req.url.split('?')[1])
    var channel = query['type']
    var socketMap = {
      'job51': job51,
      'zhilian': zhilian
    }
    var socket_client = socketMap[channel]
    if (req.url.match('getCaptcha')) {            // ajax 获取验证码
      Promise.resolve({
        then: (resolve, reject) => {
          var key = Object.keys(socket_client.sockets)[0]
          if (key) {
            socket_client.sockets[key].once('getCaptcha', (data) => {
              res.writeHead(200, 'ok', { 'Content-Type': 'image/png;charset=US-ASCII' })
              res.end(data)
            })
          } else {
            res.writeHead(404, 'Not Found')
            res.end()
          }
          resolve()
        }
      })
      socket_client.emit('needCaptcha')
    } else if (req.url.match('submit')) {         // ajax 提交验证码
      Promise.resolve({
        then: (resolve, reject) => {
          var key = Object.keys(socket_client.sockets)[0]
          socket_client.sockets[key].once('submitResult', (data) => {
            res.writeHead(200, 'ok', { 'Content-Type': 'application/json' })
            response = JSON.stringify({
              errorcode: data ? 0 : 1,
              errorinfo: ""
            })
            res.end(response)
            resolve()
          })
        }
      })
      socket_client.emit('verify', query['captcha'])
    }
  }
}

var zhilian = io.of('/zhilian') // 智联socket
zhilian.on('connection', function (socket) {
  socket_handler(socket, 'zhilian')
})

var job51 = io.of('/job51')   // job51 socket
job51.on('connection', function (socket) {
  socket_handler(socket, 'job51')
})
