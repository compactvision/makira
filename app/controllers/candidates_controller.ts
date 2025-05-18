import Candidate from '#models/candidate'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs/promises'

import type { HttpContext } from '@adonisjs/core/http'
import Skill from '#models/skill'
import Employment from '#models/employment'
import Education from '#models/education'
import ItSkill from '#models/it_skill'
import DesiredCareer from '#models/desired_career'
import UserProfile from '#models/user_profile'

export default class CandidatesController {
  public async resume({ auth, view, session }: HttpContext) {
    const user = auth.user!
    await user.load('candidate')
    await user.load('profile')

    const candidate = await Candidate.query()
      .where('user_id', auth.user!.id)
      .preload('skills')
      .preload('employments')
      .preload('educations')
      .preload('itSkills')
      .firstOrFail()

    const profile = user.profile

    return view.render('pages/profile/resume', {
      user: user,
      candidate: candidate || {},
      profile: profile || {},
    })
  }

  public async update({ request, response, auth }: HttpContext) {
    const user = auth.user!
    const fieldsToUpdate = request.except(['_csrf', 'skills']) // Exclure les compétences pour un traitement séparé

    try {
      // Extraire et parser les compétences
      let skills: string[] = []
      if (request.input('skills')) {
        const rawSkills = request.input('skills')
        if (typeof rawSkills === 'string') {
          skills = JSON.parse(rawSkills) // Conversion depuis une chaîne JSON
        } else if (Array.isArray(rawSkills)) {
          skills = rawSkills // Directement un tableau
        } else {
          return response.badRequest({ message: 'Invalid skills format' })
        }
      }

      // Mise à jour ou création du candidat
      const candidate = await UserProfile.updateOrCreate({ userId: user.id }, fieldsToUpdate)

      // Mise à jour des compétences
      if (skills.length > 0) {
        // Supprimer les compétences existantes pour ce candidat
        await Skill.query().where('candidate_id', candidate.id).delete()

        // Insérer les nouvelles compétences
        const skillRecords = skills.map((skill) => ({
          name: skill.trim(), // Nettoyer les compétences
          candidateId: candidate.id,
        }))
        await Skill.createMany(skillRecords)
      }

      return response.redirect().back()
    } catch (error) {
      console.error('Error updating candidate or skills:', error)
      return response.internalServerError({
        message: 'An error occurred while updating the profile',
      })
    }
  }

  // public async upload({ auth, request, response }: HttpContext) {
  //   const user = auth.user!
  //   const candidate = await user.related('candidate').query().firstOrFail()

  //   const resume = request.file('resume', {
  //     size: '3mb',
  //     extnames: ['pdf'],
  //   })

  //   if (!resume) {
  //     return response.badRequest('Aucun fichier uploadé')
  //   }

  //   if (!resume.isValid) {
  //     return response.badRequest(resume.errors)
  //   }

  //   // Chemin de stockage
  //   const uploadPath = app.makePath('uploads/resumes')

  //   // Créer le dossier s'il n'existe pas
  //   await fs.mkdir(uploadPath, { recursive: true })

  //   // Nom de fichier unique
  //   const fileName = `${user.id}-${Date.now()}.${resume.extname}`
  //   const fullPath = `${uploadPath}/${fileName}`

  //   // Déplacer le fichier
  //   await resume.move(uploadPath, {
  //     name: fileName,
  //     overwrite: true,
  //   })

  //   // Enregistrer le chemin relatif
  //   candidate.resumeUrl = `resumes/${fileName}`
  //   await candidate.save()

  //   return response.redirect().back()
  // }

  public async updateEmployment({ request, response, auth }: HttpContext) {
    const user = auth.user!
    const candidate = await user.related('candidate').query().firstOrFail()

    const employment = request.except(['_csrf'])

    try {
      // Mise à jour ou création de l'employement
      const employmentRecord = await Employment.create({
        candidateId: candidate.id,
        ...employment,
      })

      return response.redirect().back()
    } catch (error) {
      console.error('Error updating employment:', error)
      return response.internalServerError({
        message: 'An error occurred while updating the employment',
      })
    }
  }

  public async updateEducation({ request, response, auth }: HttpContext) {
    const user = auth.user!
    const candidate = await user.related('candidate').query().firstOrFail()

    const education = request.except(['_csrf'])

    try {
      // Mise à jour ou création de l'education
      const educationRecord = await Education.create({
        candidateId: candidate.id,
        ...education,
      })

      return response.redirect().back()
    } catch (error) {
      console.error('Error updating education:', error)
      return response.internalServerError({
        message: 'An error occurred while updating the education',
      })
    }
  }

  public async updateItSkill({ request, response, auth }: HttpContext) {
    const user = auth.user!
    const candidate = await user.related('candidate').query().firstOrFail()

    const itSkill = request.except(['_csrf'])

    try {
      // Mise à jour ou création de l'itSkill
      const itSkillRecord = await ItSkill.create({
        candidateId: candidate.id,
        ...itSkill,
      })

      return response.redirect().back()
    } catch (error) {
      console.error('Error updating itSkill:', error)
      return response.internalServerError({
        message: 'An error occurred while updating the itSkill',
      })
    }
  }

  public async updateDesiredCareer({ request, response, auth }: HttpContext) {
    const user = auth.user!
    const candidate = await user.related('candidate').query().firstOrFail()

    const desiredCareer = request.except(['_csrf'])

    try {
      // Mise à jour ou création de l'itSkill
      const desiredCareerRecord = await DesiredCareer.updateOrCreate(
        {
          candidateId: candidate.id,
        },
        desiredCareer
      )

      return response.redirect().back()
    } catch (error) {
      console.error('Error updating desired career:', error)
      return response.internalServerError({
        message: 'An error occurred while updating the desired career',
      })
    }
  }

  public async sendCv({ request, response, auth }: HttpContext) {
    const user = auth.user!
    const candidate = await Candidate.query().where('user_id', user.id).firstOrFail()

    if (candidate) {
      candidate.isActive = !candidate.isActive
      await candidate.save()
    }

    return response.redirect().back()
  }
}
