import JobModel from '../models/JobModel.js'
// by the way I could just use those constant and make my own library lol of statuscodes, samething with the middleware logger, and middleware eerror handler, no neeed to use libraries for simple things
import { StatusCodes } from 'http-status-codes'

//GET ALL JOBS
export const getAlljobs = async (req, res) => {
  const jobs = await JobModel.find()
  res.status(StatusCodes.OK).json({ jobs })
}

// CREATE JOB
export const createJob = async (req, res) => {
  const { company, position } = req.body
  const job = await JobModel.create({ company, position })
  res.status(StatusCodes.CREATED).json({ job })
}

// GET SINGLE JOB
export const getSingleJob = async (req, res) => {
  const { id } = req.params
  const job = await JobModel.findById(id)
  if (!job) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `no job with id ${id}` })
  }
  res.status(StatusCodes.OK).json({ job })
}

// EDIT JOB
export const editJob = async (req, res) => {
  const { id } = req.params

  const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {
    // by default its gonna send you the old doc, this way we get the updated one back
    new: true,
  })

  if (!updatedJob) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `no job with id ${id}` })
  }

  res.status(StatusCodes.OK).json({ job: updatedJob })
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
