import { Router } from 'express'
import { login, logout, register } from '../controllers/authControllers.js'
import {
  validateIdParams,
  validateUserInput,
} from '../middleware/ValidationsMiddleware.js'
import {
  deleteUser,
  getAllUsers,
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/userController.js'
import upload from '../middleware/multerMiddleware.js'

const router = Router()

router.route('/').get(getAllUsers)

router.get('/current-user', getCurrentUser)
router.patch(
  '/update-user',
  upload.single('avatar'),
  validateUserInput,
  updateUser
)

router.get('/admin/app-stats', getApplicationStats)

export default router
