import bcrypt from 'bcryptjs'

export async function comparePassword(password, hashedPassword) {
  console.log(password, hashedPassword)

  const isMatch = await bcrypt.compare(password, hashedPassword)
  return isMatch
}
