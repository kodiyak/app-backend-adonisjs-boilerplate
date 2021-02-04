import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = request.all()
    const token = await auth.use('api').attempt(email, password)
    return token.toJSON()
  }

  public async profile({ response, auth }: HttpContextContract) {
    if (!auth.user) {
      return response.badRequest()
    }
    await auth.user.preload('avatar')
    await auth.user.preload('roles', (query) => query.preload('permissions'))
    return auth.user
  }

  public async confirmPassword(ctx: HttpContextContract) {
    if (!ctx.auth.user) {
      return ctx.response.notFound()
    }
    const input = ctx.request.all()

    return {
      success: await Hash.verify(ctx.auth.user.password, input.confirmPassword),
    }
  }
}
