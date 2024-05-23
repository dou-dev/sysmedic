import { Router } from 'express'
import { loginController } from '../controllers/Login.js'

export const loginRouter = Router()

loginRouter.post('/', loginController.login)
loginRouter.get('/forgot-password', loginController.forgotPassword)
loginRouter.post('/change-password', loginController.resetPassword)
