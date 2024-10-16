import bcrypt from 'bcryptjs'

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10) // a random 10 digit value
  return await bcrypt.hash(password, salt)
}
