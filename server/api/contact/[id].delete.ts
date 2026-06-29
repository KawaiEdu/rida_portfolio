import { useDb } from '../../utils/db'
import { checkAdmin } from '../../utils/auth'

export default defineEventHandler((event) => {
  checkAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID pesan tidak ditemukan'
    })
  }

  const db = useDb()
  db.prepare('DELETE FROM contact_messages WHERE id = ?').run(id)
  return { success: true }
})
