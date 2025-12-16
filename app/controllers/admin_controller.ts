import Candidate from '#models/candidate'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
// import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class AdminController {
  public async dashboard({ view }: HttpContext) {
    const candidates = await Candidate.query()
      .preload('user', (userQuery) => {
        userQuery.preload('profile')
      })
      .preload('educations')
      .preload('employments')
      .preload('itSkills')
      .preload('skills')

    console.log(candidates)

    return view.render('pages/dashboard/dashboard', { candidates })
  }

  public async candidat({ view, request }: HttpContext) {
    const page = request.input('page', 1)
    const candidates = await Candidate.query()
      .preload('user', (userQuery) => {
        userQuery.preload('profile')
      })
      .paginate(page, 10)

    console.log(candidates)

    candidates.baseUrl('/dashboard/candidat')
    return view.render('pages/dashboard/candidat', { candidates })
  }

  public async profile({ view }: HttpContext) {
    return view.render('pages/dashboard/profile')
  }

  public async changePassword({ view }: HttpContext) {
    return view.render('pages/dashboard/changePassword')
  }

  // public async updatePassword({ request, auth, response, session }: HttpContext) {
  //   // 1. Définition du schéma de validation
  //   const passwordSchema = schema.create({
  //     current_password: schema.string(),
  //     new_password: schema.string({}, [rules.minLength(6), rules.confirmed()]),
  //   })

  //   // 2. Messages personnalisés
  //   const messages = {
  //     'current_password.required': 'Le mot de passe actuel est requis',
  //     'new_password.required': 'Le nouveau mot de passe est requis',
  //     'new_password.minLength': 'Le mot de passe doit contenir au moins 6 caractères',
  //     'new_password.confirmed': 'Les mots de passe ne correspondent pas',
  //   }

  //   try {
  //     // 3. Validation avec la bonne méthode
  //     const payload = await request.validate({
  //       schema: passwordSchema,
  //       messages,
  //     })

  //     const user = auth.user!

  //     // 4. Vérification du mot de passe actuel
  //     await auth.use('web').attempt(user.email, payload.current_password)

  //     // 5. Mise à jour du mot de passe
  //     user.password = payload.new_password
  //     await user.save()

  //     session.flash('success', 'Votre mot de passe a été mis à jour avec succès')
  //     return response.redirect().back()
  //   } catch (error) {
  //     if (error.messages) {
  //       session.flash('errors', error.messages)
  //     } else {
  //       session.flash('error', 'Le mot de passe actuel est incorrect')
  //     }
  //     return response.redirect().back()
  //   }
  // }

  public async candidatShow({ view, auth, response, params }: HttpContext) {
    try {
      // 1. Vérifier que l'utilisateur est connecté
      await auth.authenticate()

      // 2. Récupérer l'ID depuis les paramètres de route
      const candidatId = params.id

      // 3. Chercher le candidat
      const candidat = await Candidate.findOrFail(candidatId)
      await candidat.load('user', (userQuery) => {
        userQuery.preload('profile')
      })
      await candidat.load('educations')
      await candidat.load('employments')
      await candidat.load('itSkills')
      await candidat.load('skills')

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

  public async delete({ params, response, session }: HttpContext) {
    try {
      const candidat = await Candidate.findOrFail(params.id)
      await candidat.delete()

      session.flash({ success: 'Candidat supprimé avec succès' })
    } catch (error) {
      session.flash({ error: 'Erreur lors de la suppression du candidat' })
    }

    return response.redirect().back()
  }
  public async search({ request, response, session }: HttpContext) {
    const name = request.input('name')

    if (!name) {
      session.flash('error', 'Veuillez entrer un nom à rechercher.')
      return response.redirect().back()
    }

    const user = await User.query()
      .where('name', 'like', `%${name}%`)
      .whereNot('role', 'admin')
      .preload('candidate')
      .first()

    if (!user || !user.candidate) {
      session.flash('error', 'Aucun candidat de ce nom dans la bdd')
      return response.redirect().back()
    }

    return response.redirect().toRoute('candidat.show', { id: user.candidate.id })
  }
}
