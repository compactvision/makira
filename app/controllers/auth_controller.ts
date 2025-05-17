import Candidate from '#models/candidate'
import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async login({ request, response, auth, session }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      session.flash('success:', 'Vous êtes connecté!')
      return response.redirect().toRoute('home')
    } catch (e) {
      session.flash('notification', {
        type: 'error',
        message: e.message || 'Authentication failed',
      })
      return response.redirect().back()
    }
  }

  public async register({ request, response, session }: HttpContext) {
    try {
      const data = await request.validateUsing(createUserValidator)
      const user = await User.create(data)

      if (user) {
        await Candidate.create({
          userId: user.id,
        })
      }

      session.flash('notification', {
        type: 'success',
        message: 'Votre compte a été crée avec succès !',
        duration: 2000,
      })
      console.log(session.get('notification'))

      return response.redirect().toRoute('home')
    } catch (e) {
      session.flash({
        errors: e.messages,
        old: request.only(['email', 'name']),
      })
      return response.redirect().back()
    }
  }

  public async loginShow({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  public async registerShow({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('loginShow')
  }
}
