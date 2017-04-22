const http = require('http')
const app = require('http').createServer(handler)
const io = require('socket.io')(app)
const fs = require('fs')



app.listen(9000)

function handler(req, res) {
  res.writeHead(200, 'ok')
  zhilian.emit('captcha', 'everyone!');
  res.end("server on")
}

var zhilian = io.of('/zhilian')
zhilian.on('connection', function (socket) {

  socket.on('needVerify', (data) => {
    var base64Data = data.replace(/^data:image\/\w+;base64,/, "")
    var dataBuffer = new Buffer(base64Data, 'base64')
    Promise.resolve({
      then: (resolve, reject)=>{
        fs.writeFile("zhilian.png", dataBuffer, function (err) {
          if (err) throw err;
          resolve()
        })
      }
    }).then(() => {
      let title = encodeURIComponent('智联验证码警报!')
      let desp = encodeURIComponent('请打开以下链接 输入验证码 http://localhost:9000/zhilian')
      http.get(`http://sc.ftqq.com/SCU7712T47f3ef3e3789492891d0a72acf0817e358fa04a72b753.send?text=${title}&desp=${desp}`, (res)=>{
        if(res.statusCode !== 200){
          console.log(`请求失败 状态码：${res.statusCode}`)
        }
        res.resume()
        return
      })
    })
  })

  socket.on('success', () => {
    socket.disconnect(false)
  })
  
})

let job51 = io.of('/job51');
job51.on('connection', function (socket) {
  console.log('job51 connected');
  job51.emit('hi', 'everyone!');
});
