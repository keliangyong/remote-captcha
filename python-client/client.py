#!/usr/bin/python35
#-*- coding:utf-8 –*-
import re
import base64
from socketIO_client import SocketIO, BaseNamespace

class zhilian(BaseNamespace):
    
    def on_needCaptcha(self, *args):
        with open('./img/zhilian.png', 'rb') as f:
            base64Img = 'data:image/jpg;base64,' + base64.b64encode(f.read()).decode('ascii')
        self.emit('getCaptcha', base64Img)

    def on_verify(self, data):
        print(data)
        if(re.search('time', data.lower())):
            res = True
        else:
            res = False
        self.emit('submitResult', res)

class job51(BaseNamespace):
    
    def on_needCaptcha(self, *args):
        with open('./img/job51.png', 'rb') as f:
            base64Img = 'data:image/jpg;base64,' + base64.b64encode(f.read()).decode('ascii')
        self.emit('getCaptcha', base64Img)

    def on_verify(self, data):
        print(data)
        if(data.lower() == 'fbjiy'):
            res = True
        else:
            res = False
        self.emit('submitResult', res)

if __name__ == '__main__':
    socketIO = SocketIO('localhost', 9000)

    socket_job51 = socketIO.define(job51, '/job51')
    socket_job51.emit('alarm')
    socket_job51.on('needCaptcha', socket_job51.on_needCaptcha)
    socket_job51.on('verify', socket_job51.on_verify)

    socket_zhilian = socketIO.define(zhilian, '/zhilian')
    socket_zhilian.emit('alarm')
    socket_zhilian.on('needCaptcha', socket_zhilian.on_needCaptcha)
    socket_zhilian.on('verify', socket_zhilian.on_verify)

    socketIO.wait()