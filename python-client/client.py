#!/usr/bin/python35
#-*- coding:utf-8 –*-

from socketIO_client import SocketIO, BaseNamespace
import imgData

class zhilian(BaseNamespace):

    def on_connection(self, *args):
        print('on_aaa_response', args)

    def on_captcha(self, data):
        print(data)

class job51(BaseNamespace):

    def on_aaa_response(self, *args):
        print('on_aaa_response', args)

socketIO = SocketIO('localhost', 9000)
socket_zhilian = socketIO.define(zhilian, '/zhilian')
# socket_job51 = socketIO.define(job51, '/job51')

socket_zhilian.emit('needVerify', img)
# socket_zhilian.emit('needVerify', "jdsif4545dsg45fd1gs5d1fs5d")
socket_zhilian.on('captcha', socket_zhilian.on_captcha)
# news_namespace.emit('aaa')
socketIO.wait()

# if __name__ == '__main__':

    