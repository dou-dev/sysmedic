import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET ?? '' // default value

export function generateEmailToken (email) {
  const payload = {
    email,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // Token válido por 24 horas
  }
  return jwt.sign(payload, JWT_SECRET)
}

// Función para verificar un token
export function verifyToken (token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return { email: decoded.email }
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return { error: 'Token has expired' }
    }
    return { error: 'Invalid token' }
  }
}
