import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  public async home({ view }: HttpContext) {
    return view.render('pages/home')
  }

  public async about({ view }: HttpContext) {
    return view.render('pages/about')
  }

  public async profile({ auth, view }: HttpContext) {
    const user = await User.query().where('id', auth.user!.id).preload('candidate').firstOrFail()
    return view.render('pages/profile/profile', {
      user: user,
      candidate: user.candidate,
    })
  }

  public async resume({ view }: HttpContext) {
    return view.render('pages/profile/resume')
  }

  public async contact({ view }: HttpContext) {
    return view.render('pages/contact/contact')
  }
}
