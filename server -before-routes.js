import * as dotenv from 'dotenv'

dotenv.config()

import express from 'express'
const app = express()
import morgan from 'morgan'
import {
  createJob,
  deleteJob,
  editJob,
  getAlljobs,
  getSingleJob,
} from './controllers/jobController'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

//GET ALL JOBS
app.get('/api/v1/jobs', getAlljobs)

// CREATE JOB
app.post('/api/v1/jobs', createJob)

// GET SINGLE JOB
app.get('/api/v1/jobs/:id', getSingleJob)

/// EDIT JOB
app.patch('/api/v1/jobs/:id', editJob)

// DELETE JOB
app.delete('/api/v1/jobs/:id', deleteJob)

// Not Found Middleware, this is only if that request does not exist.
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})

//Error Middleware, triggered by the routes if an error occurs
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ msg: 'something went wrong' })
})

const port = process.env.PORT || 5100
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
