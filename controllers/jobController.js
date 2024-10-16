import { NotFoundError } from '../errors/customError.js'
import JobModel from '../models/JobModel.js'

import { StatusCodes } from 'http-status-codes'
import { checkJobPermisssion } from '../utils/checkPermisons.js'

import mongoose from 'mongoose'
import day from 'dayjs'

//GET ALL JOBS
export const getAlljobs = async (req, res) => {
  // const search = req.query.search
  // const company = req.query.company
  // const queryObj = {}
  // if (search) queryObj.position = search

  // if (company) queryObj.position = company//A BETTER APROACH
  // kepp in min that search = position or company really

  const { search, jobStatus, jobType, sort } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ]
  }
  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  }

  const sortKey = sortOptions[sort] || sortOptions.newest

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const jobs = await JobModel.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit)

  const totalJobs = await JobModel.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs })
}

// CREATE JOB
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await JobModel.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

// GET SINGLE JOB
export const getSingleJob = async (req, res) => {
  const job = await JobModel.findById(req.params.id) // id is already validated and checked in middleware
  if (!job)
    throw new NotFoundError(`Job with id ${req.params.id} does not exist`)

  const hasPermission = await checkJobPermisssion(req.user, job)
  if (!hasPermission)
    throw new UnauthorizedError('You are not authorized to make this request')

  res.status(StatusCodes.OK).json({ job })
}

// EDIT JOB
export const editJob = async (req, res) => {
  const job = await JobModel.findById(req.params.id)
  if (!job)
    throw new NotFoundError(`Job with id ${req.params.id} does not exist`)

  const hasPermission = await checkJobPermisssion(req.user, job)
  if (!hasPermission)
    throw new UnauthorizedError('You are not authorized to make this request')

  const updatedJob = await JobModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  if (!updatedJob)
    throw new NotFoundError(`Job with id ${req.params.id} does not exist`)
  res.status(StatusCodes.OK).json({ job: updatedJob })
}

// DELETE JOB
export const deleteJob = async (req, res) => {
  const job = await JobModel.findById(req.params.id)
  if (!job)
    throw new NotFoundError(`Job with id ${req.params.id} does not exist`)

  const hasPermission = await checkJobPermisssion(req.user, job)
  if (!hasPermission)
    throw new UnauthorizedError('You are not authorized to make this request')

  const removedJob = await JobModel.findByIdAndDelete(req.params.id)

  res.status(StatusCodes.OK).json({ job: removedJob })
}

export const showStats = async (req, res) => {
  //remember, this"new mongoose.Types.ObjectId(req.user.userId)" is becuase we return an objecyt via req.user.userId"
  let stats = await JobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }
  let monthlyApplications = await JobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YYYY')
      return { date, count }
    })
    .reverse()
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}
