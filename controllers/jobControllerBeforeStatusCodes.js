import { nanoid } from 'nanoid'
import JobModel from '../models/JobModel.js'

// let jobs = [
//   { id: nanoid(), company: 'apple', position: 'front-end' },
//   { id: nanoid(), company: 'google', position: 'back-end' },
// ]

//GET ALL JOBS
export const getAlljobs = async (req, res) => {
  const jobs = await JobModel.find()
  res.status(200).json({ jobs })
}

// CREATE JOB
export const createJob = async (req, res) => {
  const { company, position } = req.body
  // 'express-async-errors' lets us get the errors in the server middlewarer withour having to do thr try catch , it has to go on the very top of server.js
  // try {
  //   // const job = await JobModel.create({ company, position })
  //   const job = await Job.create('something')
  //   res.status(201).json({ job })
  // } catch (error) {
  //   console.log(error)
  //   res.status(500).json({ msg: 'server error' })
  // }
  const job = await JobModel.create({ company, position })
  res.status(201).json({ job })
}

// GET SINGLE JOB
export const getSingleJob = async (req, res) => {
  const { id } = req.params
  const job = await JobModel.findById(id)
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  return res.status(200).json({ job })
}

// EDIT JOB
export const editJob = async (req, res) => {
  const { id } = req.params

  const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {
    // by default its gonna send you the old doc, this way we get the updated one back
    new: true,
  })

  if (!updatedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }

  res.status(200).json({ job: updatedJob })
}

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params
  const removedJob = await JobModel.findByIdAndDelete(id)
  if (!removedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }

  res.status(200).json({ job: removedJob })
}
