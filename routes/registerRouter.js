import { Router } from 'express'
import { userController } from '../controllers/User.js'

export const registerRouter = Router()

registerRouter.post('/', userController.create)
registerRouter.get('/', userController.confirmAcount)
