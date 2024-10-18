import 'express-async-errors'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import express from 'express'
const app = express()
import morgan from 'morgan'

//routers
import jobRouter from './routers/jobRouter.js'
import authRouter from './routers/authRouter.js'
import userRouter from './routers/userRouter.js'

//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'

//Cloudinary set up
import cloudinary from 'cloudinary'
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

//public folder imports, this is just to set up a public folder, we need to also work mon node/express, how to create files, remove and play with actual files and folders
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))
// app.use(express.static(path.resolve(__dirname, './public')))
app.use(express.static(path.resolve(__dirname, './client/dist')))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(cookieParser()) // to be able to grab the cookie being sent back from front end, to be able to validate those requests. after this we can handle the logic in authMiddleware

app.use(express.json())

//test
app.get('/api/v1/test', (req, res) => {
  res.send('We did it Frank!1')
})

app.use('/api/v1/auth', authRouter) // we dont need to place the authenticateUser here becuse these are public routes

app.use('/api/v1/users', authenticateUser, userRouter)

app.use('/api/v1/jobs', authenticateUser, jobRouter)
// Not Found Middleware, this is only if that request does not exist.

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})

//this one comes after we build the clinet asn paste the assets in server/public
app.get('*', (req, res) => {
  // res.sendFile(path.resolve(__dirname, './public', 'index.html'))
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})

//any other errors
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5100

try {
  await mongoose.connect(process.env.MONGO_URL)
  console.log('Connection to Mongo Db has been stablished')
  await new Promise((resolve) => setTimeout(resolve, 2000))
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
