import { loginModel } from '../models/Login.js'
import { userModel } from '../models/User.js'
import { generateEmailToken, verifyToken } from '../utils/generateToken.js'
import { sendResetPasswordEmail } from '../utils/sedEmail.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
export class loginController {
  static async login (req, res) {
    try {
      const { email, password } = req.body
      const getUser = await loginModel.validateUser({ email, password })

      if (!getUser.success) return res.status(400).json({ message: getUser.message })

      const { id, first_name, last_name } = getUser.data
      const userForToken = { id, email }

      const token = jwt.sign(userForToken, JWT_SECRET, { expiresIn: '7d' })

      res.status(200).json({
        name: `${first_name} ${last_name}`,
        email,
        token
      })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  static async forgotPassword (req, res) {
    try {
      const { email } = req.query
      const getUser = await userModel.userExists(email)

      if (!getUser.success) return res.status(404).json({ message: 'user not exist' })

      const token = generateEmailToken(email)
      await sendResetPasswordEmail({ token, email })
      res.status(202).json({ message: 'Email sent' })
    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
  }

  static async resetPassword (req, res) {
    try {
      const { token, newPassword } = req.body
      const result = verifyToken(token)
      if (result.err) res.status(400).json({ message: result.error })
      const passwordUpdated = loginModel.resetPassword(token, newPassword)
      if (!passwordUpdated.success) res.status(400).json({ message: passwordUpdated.message })

      res.status(200).json({ message: 'Password updated' })
    } catch (error) {

    }
  }
}
