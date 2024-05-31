import { appointmentModel } from '../models/Appointment.js'

export class appointmentController {
  static async create (req, res) {
    try {
      const input = req.body
      const appointment = await appointmentModel.create(input)
      if (!appointment.success) return res.status(400).json({ message: appointment.message })

      res.status(201).json({ message: 'Your appointment was resgistered' })
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async getById (req, res) {
    const { id } = req.params

    try {
      const appointment = await appointmentModel.getById(id)

      if (!appointment.success) return res.status(400).json({ message: appointment.message })
      res.status(200).json(appointment.data)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async getAll (req, res) {
    try {
      const appointments = await appointmentModel.getAll()
      if (!appointments.success) return res.status(400).json(appointments.message)
      res.status(200).json(appointments.data)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
