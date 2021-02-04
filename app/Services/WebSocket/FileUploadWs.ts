import socket from 'socket.io'
import fs from 'fs'
import Application from '@ioc:Adonis/Core/Application'

export class FileUploadWs {
  constructor(public socket: socket.Socket) {
    this.onUploadListener()
  }

  public onUploadListener() {
    this.socket.on('data', ({ blob, name, uuid }) => {
      if (name.split('/').length > 1) {
        const dir = name.split('/')
        dir.pop()
        const dirPath = Application.makePath(`tmp/` + dir.join('/'))
        if (!fs.existsSync(dirPath))
          fs.mkdirSync(dirPath, {
            recursive: true,
          })
      }
      const writer = fs.createWriteStream(Application.tmpPath(name), {
        flags: 'a',
      })
      writer.on('close', () => {
        this.socket.emit('more', { uuid })
      })

      writer.write(blob)
      writer.end()

      console.log(blob.length, name)
    })
  }
}
