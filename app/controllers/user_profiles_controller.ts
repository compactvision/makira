import type { HttpContext } from '@adonisjs/core/http'
import UserProfile from '#models/user_profile'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

// Obtenir le répertoire actuel dans un environnement ESM
// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url)
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(__filename)

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
        'jobCategory',
        'experience',
        'currentSalary',
        'expectedSalary',
        'photo',
        'sex',
        'status',
        'birthDate',
        'country',
        'city',
        'postcode',
        'address',
        'description',
      ])

      const photo = request.file('photo')
      const imageDirectory = path.join(__dirname, '..', '..', 'public', 'images', 'candidates')

      // Crée le répertoire si nécessaire
      if (!fs.existsSync(imageDirectory)) {
        fs.mkdirSync(imageDirectory, { recursive: true })
      }

      if (photo) {
        const fileName = `${Date.now()}-${photo.clientName}`
        const filePath = path.join(imageDirectory, fileName)

        // Déplacer la nouvelle photo
        await photo.move(imageDirectory, {
          name: fileName,
          overwrite: true,
        })

        // Supprimer l'ancienne photo si elle existe
        const existingProfile = await UserProfile.query().where('userId', user.id).first()
        if (existingProfile?.photo) {
          const oldPhotoPath = path.join(imageDirectory, existingProfile.photo)
          if (fs.existsSync(oldPhotoPath)) {
            fs.unlinkSync(oldPhotoPath)
          }
        }

        // Met à jour le chemin de la nouvelle photo
        data.photo = fileName
      }

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
