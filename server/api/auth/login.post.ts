import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { useDb } from '../../utils/db'

const JWT_SECRET = process.env.JWT_SECRET || 'rida-secret-key-default-987654321'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username dan password wajib diisi'
    })
  }

  const db = useDb()
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Username atau password salah'
    })
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' })

  // Set HTTP-only cookie
  setCookie(event, 'admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })

  return {
    success: true,
    user: { id: user.id, username: user.username }
  }
})
