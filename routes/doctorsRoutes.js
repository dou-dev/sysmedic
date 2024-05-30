import { Router } from 'express'
import { doctorController } from '../controllers/Doctor.js'
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js'

export const doctorRoutes = Router()

doctorRoutes.post('/', authenticationMiddleware, doctorController.create)
doctorRoutes.get('/', authenticationMiddleware, doctorController.getAll)
doctorRoutes.get('/:id', authenticationMiddleware, doctorController.getById)
