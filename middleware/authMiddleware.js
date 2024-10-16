import { UnauthenticatedError } from '../errors/customError.js'
import { verifyJWT } from '../utils/tokenUtils.js'

export const authenticateUser = (req, res, next) => {
  // const token = req.cookies['token']
  // const token  = req.cookies.token
  const { token } = req.cookies
  //console.log(token) // cookie sent from frnt end
  if (!token)
    throw new UnauthenticatedError('authentication token must be provided')

  try {
    const user = verifyJWT(token)
    if (!user) {
      throw new UnauthenticatedError('Wrong token provided')
    }
    // but remeber our decoded user is this way cuz we insewrted the role and userId when creating the jwt nin auth login.
    const { userId, role } = user // so we destructure from user
    req.user = { userId, role } // and now we insert that user info into the req.body@!
    // we could have just sait re.body=user
    next()
  } catch (error) {
    console.log(error)
  }
}
