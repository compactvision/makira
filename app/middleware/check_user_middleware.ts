import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Roles from '../enums/role.js'

export default class CheckUserMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    try {
      // 1. Vérifier l'authentification
      await ctx.auth.authenticate()

      // 2. Récupérer l'utilisateur
      const user = ctx.auth.user
      if (!user) {
        throw new Error('User not found')
      }

      // 3. Vérifier le rôle admin
      if (user.role !== Roles.ADMIN) {
        return ctx.response.forbidden({
          message: 'Accès réservé aux administrateurs',
        })
      }

      // 4. Logger pour le débogage
      ctx.logger.info(`Admin access granted to user ${user.id}`)

      // 5. Passer au middleware/contrôleur suivant
      return await next()
    } catch (error) {
      return ctx.response.unauthorized({
        message: 'Vous devez être connecté pour accéder à cette ressource',
        error: error.message, // Optionnel : pour le débogage
      })
    }
  }
}
