import { useDb } from '../../utils/db'
import { checkAdmin } from '../../utils/auth'

export default defineEventHandler((event) => {
  checkAdmin(event)
  
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID blog tidak ditemukan'
    })
  }

  const db = useDb()
  db.prepare('DELETE FROM blogs WHERE id = ?').run(id)
  return { success: true }
})
