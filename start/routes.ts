/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const HomeController = () => import('#controllers/home_controller')
const AuthController = () => import('#controllers/auth_controller')
const AdminController = () => import('#controllers/admin_controller')
const CandidatesController = () => import('#controllers/candidates_controller')
const SocialLinksController = () => import('#controllers/social_links_controller')
const UserProfilesController = () => import('#controllers/user_profiles_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/loginShow', [AuthController, 'loginShow']).as('loginShow')
router.get('/registerShow', [AuthController, 'registerShow']).as('registerShow')
router.post('/login', [AuthController, 'login']).as('login')
router.post('/register', [AuthController, 'register']).as('register')
router.post('/logout', [AuthController, 'logout']).as('logout')

router
  .group(() => {
    router.get('/', [HomeController, 'home']).as('home')
    router.get('/about', [HomeController, 'about']).as('about')
    router.get('/profile', [HomeController, 'profile']).as('profile')
    router.get('/resume', [CandidatesController, 'resume']).as('resume')
    // router.post('/upload-resume', [CandidatesController, 'upload']).as('resume.upload')
    router.post('/profile/update-field', [CandidatesController, 'update']).as('update')
    router.get('/contact', [HomeController, 'contact']).as('contact')
    router.post('/social-links/update', [SocialLinksController, 'update']).as('social-links.update')
    router
      .post('/user-profile/update', [UserProfilesController, 'update'])
      .as('user-profile.update')
    router
      .post('/employment/update', [CandidatesController, 'updateEmployment'])
      .as('update.employment')
    router
      .post('/education/update', [CandidatesController, 'updateEducation'])
      .as('update.education')
    router.post('/it-skill/update', [CandidatesController, 'updateItSkill']).as('update.it-skill')
    router
      .post('/desired-career/update', [CandidatesController, 'updateDesiredCareer'])
      .as('update.desired-career')

    router.post('/send-cv', [CandidatesController, 'sendCv']).as('send-cv')
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [AdminController, 'dashboard']).as('dashboard')
    router.get('/candidat', [AdminController, 'candidat']).as('candidat')
    router.get('/candidat/:id', [AdminController, 'candidatShow']).as('candidat.show')
    router.get('/profile', [AdminController, 'profile']).as('dash.profile')
    router.get('/change-password', [AdminController, 'changePassword']).as('password')
    // router.post('/update-password', [AdminController, 'updatePassword']).as('update.password')
    router.delete('/candidat-delete/:id', [AdminController, 'delete']).as('candidat.delete')
  })
  .prefix('/dashboard')
  .use(middleware.checkUser())
