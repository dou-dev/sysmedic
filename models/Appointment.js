import { connection } from '../utils/conexion.js'

export class appointmentModel {
  static async create (input) {
    const { userId, doctorId, date, time, reason } = input

    return connection.query('INSERT INTO appointments (patient_id, doctor_id, date, time, reason) VALUES ( ?, ?, ?, ?, ?)', [userId, doctorId, date, time, reason])
      .then(([result, fields]) => {
        return (result.affectedRows < 1)
          ? { success: false, message: 'the appointment could not register' }
          : { success: true }
      })
      .catch(err => {
        console.error(err)
        return { success: false, message: 'error executing query' }
      })
  }

  static async getAll () {
    return connection.query('SELECT * FROM appointments')
      .then(result => {
        return (result[0].length >= 1) ? { success: true, data: result[0] } : { success: false, message: 'no appointments found' }
      })
      .catch(err => {
        console.error(err)
        return { success: false, message: 'error executing query' }
      })
  }

  static async getById (id) {
    return connection.query('SELECT * FROM appointments WHERE id =  ? ', [id])
      .then(result => {
        return (result[0].length >= 1) ? { success: true, data: result[0] } : { success: false, message: 'no appointments found' }
      })
      .catch(err => {
        console.error(err)
        return { success: false, message: 'error executing query' }
      })
  }
}
