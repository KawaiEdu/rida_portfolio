import { useDb } from '../../utils/db'
import { checkAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  checkAdmin(event)
  
  const body = await readBody(event)
  const { id, title, description, visual_class, link } = body

  if (!title || !description || !visual_class || !link) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Semua field wajib diisi'
    })
  }

  const db = useDb()
  
  if (id) {
    db.prepare('UPDATE projects SET title = ?, description = ?, visual_class = ?, link = ? WHERE id = ?')
      .run(title, description, visual_class, link, id)
    return { success: true, action: 'update' }
  } else {
    const result = db.prepare('INSERT INTO projects (title, description, visual_class, link) VALUES (?, ?, ?, ?)')
      .run(title, description, visual_class, link)
    return { success: true, action: 'create', id: result.lastInsertRowId }
  }
})
