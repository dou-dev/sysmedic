import { doctorModel } from '../models/Doctor.js'

export class doctorController {
  static async getAll (req, res) {
    try {
      const getDoctors = await doctorModel.getAll()

      if (!getDoctors.success) return res.status(400).json({ message: getDoctors.message })

      res.status(200).json(getDoctors.data)
    } catch (error) {
      res.status(500).json({ message: 'internal server error' })
    }
  }

  static async getById (req, res) {
    try {
      const { id } = req.params
      const getDoctor = await doctorModel.getById(id)
      if (!getDoctor.success) return res.status(400).json({ message: getDoctor.message })
      res.status(200).json(getDoctor.data)
    } catch (error) {
      res.status(500).json({ message: 'internal server error' })
    }
  }

  static async create (req, res) {
    try {
      const { idUser, specialtyId } = req.body
      const result = await doctorModel.create(idUser, specialtyId)

      if (!result.success) return res.status(400).json({ message: result.message })

      res.status(201).json({ message: 'Doctor created successfully' })
    } catch (err) {
      res.status(500).json({ message: 'internal server error' })
    }
  }
}
