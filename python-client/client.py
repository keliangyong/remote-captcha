#!/usr/bin/python35
#-*- coding:utf-8 –*-

from socketIO_client import SocketIO, BaseNamespace

class zhilian(BaseNamespace):

    def on_connection(self, *args):
        print('on_aaa_response', args)

    def on_captcha(self, data):
        print(data)

class job51(BaseNamespace):

    def on_aaa_response(self, *args):
        print('on_aaa_response', args)

if __name__ == '__main__':
    # socketIO = SocketIO('localhost', 9000)
    # socket_zhilian = socketIO.define(zhilian, '/zhilian')
    with open('./img/zhilian.png', 'rb') as f:
        img = f.read()
    socket_zhilian.emit('needVerify', img)
    socket_zhilian.on('captcha', socket_zhilian.on_captcha)
    socketIO.wait()
    