import mongoose from 'mongoose'
import { JOB_STATUS, JOB_TYPE } from '../client/src/utils/constants.js'

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: [JOB_STATUS.INTERVIEW, JOB_STATUS.DECLINED, JOB_STATUS.PENDING],
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: [JOB_TYPE.FULL_TIME, JOB_TYPE.PART_TIME, JOB_TYPE.INTERNSHIP],
      default: JOB_TYPE.INTERNSHIP,
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
    //so once e set the auth,cooki thing via loging in, we can hook the connection for user and job,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    }, // after this create a authMiddleware.js file
  },
  { timestamps: true }
)

export default mongoose.model('Job', JobSchema)
