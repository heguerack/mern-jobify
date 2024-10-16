import { StatusCodes } from 'http-status-codes'
import UserModel from '../models/UserModel.js'
import cloudinary from 'cloudinary'
import { promises as fs } from 'fs'
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customError.js'
import { hashPassword } from '../utils/hashPashword.js'
import JobModel from '../models/JobModel.js'

// import Job from '../models/Job.js'

export const getCurrentUser = async (req, res) => {
  const { userId, role } = req.user
  const user = await UserModel.findById(userId) // but there is an issue, this way we send bak the hashed pasword, to fix it,

  res.status(StatusCodes.OK).json({ user })
}
export const getAllUsers = async (req, res) => {
  const { userId, role } = req.user
  if (role !== 'admin')
    throw new UnauthenticatedError(
      'You are not an admin, therefore you cant acces users info'
    )

  const allUsers = await UserModel.find()
  // console.log(allUsers);

  res.status(StatusCodes.OK).json({ allUsers })
}
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
export const updateUser = async (req, res) => {
  console.log(req.file) // we got req.file because the file was injectted into the request via mifddleware

  const newUser = { ...req.body }
  delete newUser.password // remember, this is to remove a property in case is being passed in the bady, that way we force it, and this way thew password cant be changed

  if (req.file) {
    // we do this to maintain the images after deployment, as the ones saved in public will be removed once deloyed and the app goes to sleep. so with couudinary we get ariund that
    const response = await cloudinary.v2.uploader.upload(req.file.path)
    await fs.unlink(req.file.path) // and with this we remove the saved file in uploads folder once in cloudinary
    newUser.avatar = response.secure_url
    newUser.avatarPublicId = response.public_id
  }

  const { userId } = req.user
  const user = await UserModel.findById(userId)
  const emailTaken = await UserModel.findOne({ email: req.body.email }) //we check if that email has been taken
  if (emailTaken && emailTaken.email !== user.email)
    throw new BadRequestError('Email has been taken')
  //I think we still have to check to see if we are authorize to change user dta. if dmin, or if actual user is the real user, but i hve the id of a difernet use? just like jobs?
  // hash password
  // const hashedPassword = await hashPassword(req.body.password)
  // req.body.password = hashedPassword

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.userId,
    // req.body,
    newUser
    // { new: true }
  )

  // this is to destroy the old image left in cludinary
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
  }

  console.log(req.file)
  console.log(updateUser)
  res.status(StatusCodes.OK).json({ updatedUser })
}
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

export const deleteUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'delete user' })
}

export const getApplicationStats = async (req, res) => {
  console.log(req.user.role)

  if (req.user.role !== 'admin')
    throw new UnauthorizedError(
      'You are not an admin, therefore you are not authorize'
    )
  const allUsers = await UserModel.countDocuments()
  const allJobs = await JobModel.countDocuments()
  res.status(StatusCodes.OK).json({ allUsers, allJobs })
}
