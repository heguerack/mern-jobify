import * as dotenv from 'dotenv'

dotenv.config()

import express from 'express'
const app = express()
import morgan from 'morgan'

import { nanoid } from 'nanoid'
let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
]

// remember this is for us to log stufff for us to see in dev, not need for this in production, unless is part of the app of course

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello world from a get request')
// })

// app.post('/', (req, res) => {
//   console.log(req)
//   res.json({ message: 'data received', data: req.body })
// })

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//GET ALL JOBS
app.get('/api/v1/jobs', (req, res) => {
  console.log(`REQ:${req.params}`)
  res.status(200).json({ jobs })
})

// CREATE JOB
app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' })
  }
  const id = nanoid(10)
  // console.log(id);
  const job = { id, company, position }
  jobs.push(job)
  res.status(200).json({ job })
})

// GET SINGLE JOB
app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params
  const job = jobs.find((job) => job.id === id)
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  res.status(200).json({ job })
})

/// EDIT JOB

app.patch('/api/v1/jobs/:id', (req, res) => {
  const { company, position } = req.body
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' })
  }
  const { id } = req.params
  const job = jobs.find((job) => job.id === id)
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }

  job.company = company
  job.position = position
  res.status(200).json({ msg: 'job modified', job })
})

// DELETE JOB

app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params
  const job = jobs.find((job) => job.id === id)
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  const newJobs = jobs.filter((job) => job.id !== id)
  jobs = newJobs

  res.status(200).json({ msg: 'job deleted' })
})
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

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
