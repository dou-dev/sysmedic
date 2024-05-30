import { Router } from 'express'
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js'

export const appointmentRoutes = Router()

appointmentRoutes.post('/', authenticationMiddleware)
appointmentRoutes.get('/', authenticationMiddleware)
appointmentRoutes.get('/:id', authenticationMiddleware)
