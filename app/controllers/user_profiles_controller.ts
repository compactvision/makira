import type { HttpContext } from '@adonisjs/core/http'
import UserProfile from '#models/user_profile'

export default class UserProfilesController {
  public async update({ auth, request, response }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        return response.unauthorized({ message: 'User not authenticated' })
      }

      const data = request.only([
        'name',
        'phone',
        'email',
        'website',
        'qualification',
        'language',
        'job_category',
        'experience',
        'current_salary',
        'expected_salary',
        'age',
        'country',
        'city',
        'postcode',
        'full_address',
        'description',
      ])

      console.log('Received data for update:', data)

      // Vérifie si le profil utilisateur existe ou crée-le
      const userProfile = await UserProfile.updateOrCreate(
        { userId: user.id }, // Recherche le profil existant par user_id
        data // Données à mettre à jour ou créer
      )

      return response.ok({ message: 'Profile updated successfully', userProfile })
    } catch (error) {
      console.error('Error updating user profile:', error)
      return response.internalServerError({ message: 'An error occurred while updating profile.' })
    }
  }
}
