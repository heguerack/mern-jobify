import { UnauthorizedError } from '../errors/customError.js'

export const checkJobPermisssion = (user, job) => {
  console.log(user)
  console.log(job.createdBy.toString())

  const isOwner = user.userId === job.createdBy.toString()
  const isAdmin = user.role === 'admin' /// as this one does not really return a string
  if (!isOwner && !isAdmin) {
    throw new UnauthorizedError(
      ' You are not the owner of this data, nor an admin, therefore you cant play with it!'
    )
  }
  return true
}

export const checkUserPermisssion = (user) => {
  // if (role !== 'admin')
  //   throw new UnauthenticatedError(
  //     'You are not an admin, therefore you cant acces this user'
  //   )
  return true
}
