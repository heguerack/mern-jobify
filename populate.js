import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserModel from './models/UserModel.js'
import JobModel from './models/JobModel.js'
dotenv.config()

try {
  await mongoose.connect(process.env.MONGO_URL)
  // const user = await User.findOne({ email: 'john@gmail.com' });
  const user = await UserModel.findOne({ email: 'admin@gmail.com' })

  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  )
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id }
  })
  await JobModel.deleteMany({ createdBy: user._id })
  await JobModel.create(jobs)
  console.log('Success!!!')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
