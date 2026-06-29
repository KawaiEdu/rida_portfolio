import { useDb } from '../../utils/db'
import { checkAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  checkAdmin(event)
  
  const body = await readBody(event)
  const { id, title, slug, content, image_url, status } = body

  if (!title || !slug || !content || !image_url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Semua field wajib diisi'
    })
  }

  const db = useDb()
  
  if (id) {
    db.prepare('UPDATE blogs SET title = ?, slug = ?, content = ?, image_url = ?, status = ? WHERE id = ?')
      .run(title, slug, content, image_url, status || 'draft', id)
    return { success: true, action: 'update' }
  } else {
    try {
      const result = db.prepare('INSERT INTO blogs (title, slug, content, image_url, status) VALUES (?, ?, ?, ?, ?)')
        .run(title, slug, content, image_url, status || 'draft')
      return { success: true, action: 'create', id: result.lastInsertRowId }
    } catch (err: any) {
      if (err.message && err.message.includes('UNIQUE')) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Slug sudah digunakan, pilih slug lain'
        })
      }
      throw err
    }
  }
})
