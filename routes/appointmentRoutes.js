import { Router } from 'express'
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js'
import { appointmentController } from '../controllers/Appointment.js'

export const appointmentRoutes = Router()

appointmentRoutes.post('/', authenticationMiddleware, appointmentController.create)
appointmentRoutes.get('/', authenticationMiddleware, appointmentController.getAll)
appointmentRoutes.get('/:id', authenticationMiddleware, appointmentController.getById)
