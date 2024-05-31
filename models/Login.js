import bcrypt from 'bcryptjs'
import { connection } from '../utils/conexion.js'
export class loginModel {
  static async validateUser ({ email, password }) {
    return connection.query('SELECT * FROM user WHERE email = ? AND is_confirmed = 1', [email])
      .then(([rows, fields]) => {
        if (rows.length >= 1) {
          return bcrypt.compare(password, rows[0].password)
            .then(isMatch => {
              return isMatch
                ? { success: true, data: rows[0] }
                : { success: false, message: 'email or password incorrect' }
            })
        }
        return { success: false, message: 'email or password incorrect' }
      })
      .catch((error) => {
        console.error(error)
        return { success: false, message: 'Error Execute query' }
      })
  }

  static async resetPassword ({ token, newPassword }) {
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    return connection.query('UPDATE user SET password = ? WHERE token = ?', [hashedPassword, token])
      .then((result) => {
        return result[0].insertedId
      })
      .then(userData => {
        const result = connection.query('UPDATE user SET toke = "" WHERE id = ?', [userData])

        if (result[0].insertedId > 1) return { success: true, data: result[0] }
      })
      .catch(err => {
        console.error(err)
        return { success: false, message: 'Error Execute query' }
      })
  }
}
