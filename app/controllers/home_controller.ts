import Candidate from '#models/candidate'
import User from '#models/user'
import SocialLink from '#models/social_link'
import type { HttpContext } from '@adonisjs/core/http'
import Skill from '#models/skill'

export default class HomeController {
  public async home({ view }: HttpContext) {
    return view.render('pages/home')
  }

  public async about({ view }: HttpContext) {
    return view.render('pages/about')
  }

  public async profile({ auth, view }: HttpContext) {
    const user = await User.query().where('id', auth.user!.id).firstOrFail()
    await user.load('profile')
    await user.load('candidate')
    // const photo = user.profile?.photo
    console.log('Test', user)
    const socialLinks = await SocialLink.query().where('user_id', auth.user!.id).first()
    return view.render('pages/profile/profile', {
      user: user,
      candidate: user.candidate,
      profile: user.profile || {},
      socialLinks: socialLinks || {},
      photo: user.profile?.photo || null,
    })
  }

  public async contact({ view }: HttpContext) {
    return view.render('pages/contact/contact')
  }
}
