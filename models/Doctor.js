import { connection } from '../utils/conexion.js'

export class doctorModel {
  static async getAll () {
    return connection.query('SELECT d.id, u.first_name, u.last_name, e.name FROM user u INNER JOIN doctors d ON u.id = d.user_id INNER JOIN specialties e On d.specialty_id = e.id ')
      .then((result) => {
        return { success: true, data: result[0] }
      })
      .catch(err => {
        console.error(err)
        return { success: false, message: 'error executing query' }
      })
  }

  static async getById (id) {
    return connection.query('SELECT d.id, u.first_name, u.last_name, e.name FROM user u INNER JOIN doctors d ON u.id = d.user_id INNER JOIN specialties e On d.specialty_id = e.id WHERE d.id = ? ', [id])
      .then((result) => {
        return (result[0].length <= 0)
          ? { success: false, message: 'doctor not found' }
          : { success: true, data: result[0] }
      })
      .catch(err => {
        console.error(err)
        return { success: false, message: 'error executing query' }
      })
  }

  static async create (idUser, specialtyId) {
    return connection.query('INSERT INTO doctors (specialty_id, user_id) VALUES (?, ?)', [specialtyId, idUser])
      .then(([result, fields]) => {
        return (result.affectedRows < 1)
          ? { success: false, message: 'the doctor could not register' }
          : { success: true }
      }).catch(err => {
        console.log(err)
        return { success: false, message: 'error when registering doctor' }
      })
  }
}
