import type { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  public async dashboard({ view }: HttpContext) {
    return view.render('pages/dashboard/dashboard')
  }

  public async candidat({ view }: HttpContext) {
    return view.render('pages/dashboard/candidat')
  }

  public async profile({ view }: HttpContext) {
    return view.render('pages/dashboard/profile')
  }

  public async changePassword({ view }: HttpContext) {
    return view.render('pages/dashboard/changePassword')
  }
}
