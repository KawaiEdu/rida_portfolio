import { useDb } from '../../utils/db'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug tidak ditemukan'
    })
  }

  const db = useDb()
  const row = db.prepare('SELECT * FROM blogs WHERE slug = ?').get(slug)
  
  if (!row) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Artikel tidak ditemukan'
    })
  }

  return row
})
