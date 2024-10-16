import { StatusCodes } from 'http-status-codes'
import { createJWT } from '../utils/tokenUtils.js'
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/customError.js'
import UserModel from '../models/UserModel.js'
import { hashPassword } from '../utils/hashPashword.js'
import { comparePassword } from '../utils/comparePasswords.js'

// REGITER REGITER REGITER REGITER REGITER REGITER
export const register = async (req, res) => {
  //check if user exists
  const email = req.body.email
  const userExists = await UserModel.findOne({ email })
  if (userExists) {
    throw new BadRequestError(
      `User with email: ${req.body.email} lready exists`
    )
  }

  //hash password
  const hashedPassword = await hashPassword(req.body.password)
  req.body.password = hashedPassword
  //create user
  const user = await UserModel.create(req.body)
  res.status(StatusCodes.CREATED).json(user)
}

//LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN
export const login = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email })

  if (!user) throw new UnauthenticatedError('no user with that email')

  const passwordMatch = await comparePassword(
    req.body.password,
    user.password // as this password is already hashed! thrs how its saved now!!
  )

  if (!passwordMatch) throw new UnauthenticatedError('wrong password')

  const token = createJWT({ userId: user._id, role: user.role })

  // console.log({ userId: user._id, role: user.role })

  const oneDay = 1000 * 60 * 60 * 24 // time in miliseconds

  //in the format cooki nme, cookie value, extra info
  res.cookie('token', token, {
    httpOnly: true, // this makes the cooki inaccesible with javascript
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production', // this means only https, but in dev we get http, this fixes that
  })

  res.status(StatusCodes.OK).json({ user }) // Remember, once we log in, the cookie will be sent back from front end to back end on every route evry request. That way the back end can confirm on evry single requets!
}

export const logout = async (req, res) => {
  // so as you can see login in and out its almos the same. the only difeence is that we make it exoire right away
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: 'User logged out' })
}
