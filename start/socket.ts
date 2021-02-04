/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import WebSocket from 'App/Services/WebSocket'
import { FileUploadWs } from '../app/Services/WebSocket/FileUploadWs'

setTimeout(() => {
  WebSocket.start((socket) => {
    socket.on('teste', (data) => {
      console.log('aaaaaaaaeba', data)
    })
  })

  WebSocket.io.of('/uploads', (socket) => new FileUploadWs(socket))
}, 1000)
