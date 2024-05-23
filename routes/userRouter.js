import { Router } from 'express'
import { userController } from '../controllers/User.js'
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js'

export const userRouter = Router()

userRouter.get('/', authenticationMiddleware, userController.getAll)
userRouter.get('/:id', authenticationMiddleware, userController.getById)
userRouter.post('/', authenticationMiddleware, userController.create)
