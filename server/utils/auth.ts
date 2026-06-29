import jwt from 'jsonwebtoken'
import { H3Event } from 'h3'

const JWT_SECRET = process.env.JWT_SECRET || 'rida-secret-key-default-987654321'

export function checkAdmin(event: H3Event) {
  const token = getCookie(event, 'admin_token')
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - Silakan login terlebih dahulu'
    })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Sesi kedaluwarsa atau tidak valid'
    })
  }
}
