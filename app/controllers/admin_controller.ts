import Candidate from '#models/candidate'
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

  public async candidatShow({ view, auth, response, params }: HttpContext) {
    try {
      // 1. Vérifier que l'utilisateur est connecté
      await auth.authenticate()

      // 2. Récupérer l'ID depuis les paramètres de route
      const candidatId = params.id

      // 3. Chercher le candidat
      const candidat = await Candidate.findOrFail(candidatId)

      // 4. Vérifier que l'utilisateur a le droit de voir ce profil
      // (ex: soit admin, soit le candidat lui-même)
      const user = auth.user!
      if (user.role !== 'admin' && user.id !== candidat.userId) {
        return response.unauthorized({
          message: "Vous n'êtes pas autorisé à voir ce profil",
        })
      }

      // 5. Renvoyer la vue avec les données
      return view.render('components/common/candidatDetails', { candidat })
    } catch (error) {
      return response.notFound({
        message: 'Candidat non trouvé',
        error: error.message,
      })
    }
  }
}
