import { connection } from '../utils/conexion.js'
import bcrypt from 'bcrypt'
import { generateEmailToken } from '../utils/generateToken.js'

export class userModel {
  static async getAll () {
    return connection.query('SELECT * FROM user')
      .then((result) => {
        return { success: true, data: result[0] }
      })
      .catch((error) => {
        console.error(error)
        return { success: false, message: 'Error Execute query' }
      })
  }

  static async getById ({ id }) {
    return connection.query('SELECT * FROM user WHERE id = ?', [id])
      .then(result => {
        return (result[0].length >= 1)
          ? { success: true, data: result[0] }
          : { success: false, message: 'User not found' }
      })
      .catch(error => {
        console.error(error)
        return { success: false, message: 'Error Execute query' }
      })
  }

  static async create ({ data }) {
    const { name, lastName, password, email } = data
    const token = generateEmailToken(email)
    const hashedPassword = await bcrypt.hash(password, 10)

    return connection.query('INSERT INTO user (first_name, last_name, email, password, token) VALUES (? , ?, ? , ?, ?)', [name, lastName, email, hashedPassword, token])
      .then(([result, fields]) => {
        return (result.affectedRows < 1)
          ? { success: false, message: 'the user could not register' }
          : { success: true, email, token }
      })
      .catch(err => {
        console.error(err)
        return { success: false, message: 'error when registering user:' }
      })
  }

  static async confirmAcount ({ token }) {
    return connection.query('UPDATE user SET token = "", is_confirmed = 1 WHERE token =  ?', [token])
      .then(([result, fields]) => {
        return (result.affectedRows < 1)
          ? { success: false, message: 'the user could not confirm' }
          : { success: true }
      })
      .catch(err => {
        console.error(err)
        return { success: false, message: 'error when confirming user:' }
      })
  }

  static async userExists (email) {
    return connection.query('SELECT * FROM user WHERE email = ?', [email])
      .then(data => {
        // `data` contiene los resultados de la consulta
        return (data[0].length >= 1) ? { success: true, message: 'User already exists' } : { success: false }
      })
      .catch(error => {
        console.error('Error executing query:', error)
      })
  }
}
