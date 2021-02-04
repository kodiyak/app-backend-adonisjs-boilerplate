import socket from 'socket.io'
import Server from '@ioc:Adonis/Core/Server'

class WebSocket {
  public isReady = false
  public io: socket.Server

  public start(callback: (socket: socket.Socket) => void) {
    this.io = new socket.Server(Server.instance, {
      cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
      },
    })
    this.io.on('connection', callback)
    this.isReady = true
  }
}

/**
 * This makes our service a singleton
 */
export default new WebSocket()
