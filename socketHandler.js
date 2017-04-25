const http = require('http')
const fs = require('fs')

module.exports = (socket, channelType) => {
    socket.on('alarm', (data) => {
    	let url = 'http://localhost:9000'
        let title = encodeURIComponent(`${channelType}验证码警报!`)
        let desp = encodeURIComponent(`请打开以下链接 输入验证码 ${url}/verify.html?channel=${channelType}`)
        http.get(`http://sc.ftqq.com/SCU7712T47f3ef3e3789492891d0a72acf0817e358fa04a72b753.send?text=${title}&desp=${desp}`, (res) => {
            if (res.statusCode !== 200) {
                console.log(`请求失败 状态码：${res.statusCode}`)
            }
            res.resume()
            return
        })
    })

    socket.on('success', () => {
        socket.disconnect(false)
    })
}