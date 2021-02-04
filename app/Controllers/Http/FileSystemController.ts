import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs'
import Application from '@ioc:Adonis/Core/Application'
import File from '../../Models/File'
import mime from 'mime-types'

export default class FileSystemController {
  public async tree({ request }: HttpContextContract) {
    const dir = request.all().dir || '/'
    const path = Application.makePath(dir)
    const data = fs.readdirSync(path)
    return data.map((file) => {
      const pathFile = `${path}/${file}`
      const stats = fs.statSync(pathFile)

      return {
        name: file,
        isDirectory: stats.isDirectory(),
        dir,
        mime_type: !stats.isDirectory() ? mime.lookup(file) : undefined,
        fullDir: `${dir}/${file}`,
        metadata: stats,
      }
    })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { dir } = request.all()
    if (!dir) return response.badRequest({ message: 'Directory file is required!', success: false })

    try {
      const path = Application.makePath(dir)

      fs.statSync(path)
      fs.unlinkSync(path)
      return { message: 'File destroyed!', success: true }
    } catch (error) {
      return response.notFound({ message: 'File not found', success: false })
    }
  }

  public async details({ request, response }: HttpContextContract) {
    const { dir } = request.all()
    if (!dir) return response.badRequest({ message: 'Directory file is required!', success: false })

    try {
      const path = Application.makePath(dir)

      const stats = fs.statSync(path)
      return {
        details: stats,
        dir,
        path,
        mime_type: !stats.isDirectory() ? mime.lookup(dir) : undefined,
      }
    } catch (error) {
      return response.notFound({ message: 'File not found', success: false })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const { uuid } = params
    const file = await File.query().where('uuid', uuid).firstOrFail()
    const readFileStream = fs.createReadStream(Application.tmpPath(`${file.filename}`))

    response.stream(readFileStream)
    response.header('Content-Type', file.mimeType || 'text/plain')

    return response
  }
}
