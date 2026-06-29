import { useDb } from '../../utils/db'
import { checkAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  checkAdmin(event)
  
  const body = await readBody(event)
  const { id, title, type, link, description } = body

  if (!title || !type) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Judul dan Tipe Publikasi wajib diisi'
    })
  }

  const db = useDb()
  
  if (id) {
    db.prepare('UPDATE publications SET title = ?, type = ?, link = ?, description = ? WHERE id = ?')
      .run(title, type, link || '', description || '', id)
    return { success: true, action: 'update' }
  } else {
    const result = db.prepare('INSERT INTO publications (title, type, link, description) VALUES (?, ?, ?, ?)')
      .run(title, type, link || '', description || '')
    return { success: true, action: 'create', id: result.lastInsertRowId }
  }
})
