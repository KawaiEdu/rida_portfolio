import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'rida-secret-key-default-987654321'

export default defineEventHandler((event) => {
  const token = getCookie(event, 'admin_token')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return {
      authenticated: true,
      user: { id: decoded.id, username: decoded.username }
    }
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Sesi tidak valid'
    })
  }
})
