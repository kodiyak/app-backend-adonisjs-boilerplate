import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'

export default class ConfirmPassword {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    const { confirmPassword } = request.all()
    if (confirmPassword) {
      if (!auth.user) {
        response.notFound()
      } else {
        const isValidPasswordConfirmation = await Hash.verify(auth.user.password, confirmPassword)
        if (isValidPasswordConfirmation) {
          await next()
        } else {
          response.badRequest({
            message: 'Senha incorreta!',
          })
        }
      }
    } else {
      await next()
    }
  }
}
