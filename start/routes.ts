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
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/dashboard', [HomeController, 'dashboard']).as('dashboard')

router.get('/loginShow', [AuthController, 'loginShow']).as('loginShow')
router.get('/registerShow', [AuthController, 'registerShow']).as('registerShow')
router.post('/login', [AuthController, 'login']).as('login')
router.post('/register', [AuthController, 'register']).as('register')
router.post('/logout', [AuthController, 'logout']).as('logout')

router
  .group(() => {
    router.get('/', [HomeController, 'home']).as('home')
    router.get('/about', [HomeController, 'about']).as('about')

    router.get('/candidat', [HomeController, 'candidat']).as('candidat')
    router.get('/profile', [HomeController, 'profile']).as('profile')
    router.get('/contact', [HomeController, 'contact']).as('contact')
  })
  .use(middleware.auth())
