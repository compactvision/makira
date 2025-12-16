import Candidate from '#models/candidate'
import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async login({ request, response, auth, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)
    if (!user) {
      session.flash('errors', {
        email: 'Aucun utilisateur trouvé avec cet email.',
      })
      session.flashAll() // Ensure old input is flashed back
      return response.redirect().back()
    }

    const isValid = await hash.verify(user.password, password)
    if (!isValid) {
      session.flash('errors', {
        password: 'Mot de passe incorrect.',
      })
      session.flashAll()
      return response.redirect().back()
    }

    await auth.use('web').login(user)
    session.flash('success', 'Vous êtes connecté!')
    return response.redirect().toRoute('home')
  }

  public async register({ request, response, session, auth }: HttpContext) {
    const { terms, ...userData } = await request.validateUsing(createUserValidator)

    try {
      const user = await User.create(userData)

      const login = await auth.use('web').login(user)

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

      return response.redirect().toRoute('home')
    } catch (e) {
      console.error(e)
      session.flash('notification', {
        type: 'error',
        message: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
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
