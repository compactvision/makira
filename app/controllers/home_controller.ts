import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  public async home({ view }: HttpContext) {
    return view.render('pages/home')
  }

  public async about({ view }: HttpContext) {
    return view.render('pages/about')
  }

  public async candidat({ view }: HttpContext) {
    return view.render('pages/candidat/candidat')
  }

  public async dashboard({ view }: HttpContext) {
    return view.render('pages/dashboard/dashboard')
  }

  public async profile({ view }: HttpContext) {
    return view.render('pages/profile/profile')
  }

  public async contact({ view }: HttpContext) {
    return view.render('pages/contact/contact')
  }
}
