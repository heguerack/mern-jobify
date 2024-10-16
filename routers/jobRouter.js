import { Router } from 'express'
import {
  createJob,
  deleteJob,
  editJob,
  getAlljobs,
  getSingleJob,
  showStats,
} from '../controllers/jobController.js'
import {
  validateCreateJob,
  validateIdParams,
} from '../middleware/ValidationsMiddleware.js'
const router = Router()

//router.get('/',getAllJobs)
//router.get('/',createJob)

router.route('/').get(getAlljobs).post(validateCreateJob, createJob)

router.route('/stats').get(showStats)

router
  .route('/:id')
  // .get(validateIdParams, getSingleJob)
  .get(validateIdParams, getSingleJob)
  .delete(validateIdParams, deleteJob)
  .patch(validateIdParams, editJob)

export default router
