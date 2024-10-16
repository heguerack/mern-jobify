import { Router } from 'express'
import { login, logout, register } from '../controllers/authControllers.js'
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middleware/ValidationsMiddleware.js'

const router = Router()

router.route('/register').post(validateRegisterInput, register)

router.route('/login').post(validateLoginInput, login)

router.route('/logout').get(logout)

export default router
