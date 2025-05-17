import type { HttpContext } from '@adonisjs/core/http'
import SocialLink from '#models/social_link'

export default class SocialLinksController {
  /**
   * Update or create social links for the authenticated user
   * @param ctx HttpContextContract
   */
  public async update({ auth, request, response }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        return response.unauthorized({ message: 'User not authenticated' })
      }

      const data = request.only(['whatsapp', 'facebook', 'instagram', 'linkedin'])

      const socialLink = await SocialLink.updateOrCreate({ userId: user.id }, data)

      return response.ok({
        message: 'Social links updated successfully',
        socialLink: socialLink.serialize(),
      })
    } catch (error) {
      console.error('Error updating social links:', error)
      return response.internalServerError({
        message: 'An error occurred while updating social links.',
      })
    }
  }
}
