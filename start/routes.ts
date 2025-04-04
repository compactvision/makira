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
    router.get('/resume', [HomeController, 'resume']).as('resume')
    router.get('/contact', [HomeController, 'contact']).as('contact')
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [AdminController, 'dashboard']).as('dashboard')
    router.get('/candidat', [AdminController, 'candidat']).as('candidat')
    router.get('/profile', [AdminController, 'profile']).as('dash.profile')
    router.get('/change-password', [AdminController, 'changePassword']).as('password')
  })
  .prefix('/dashboard')
  .use(middleware.checkUser())
