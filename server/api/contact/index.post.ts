import { useDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, institution, topic, message } = body

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nama, Surel, dan Pesan wajib diisi.'
    })
  }

  const db = useDb()
  const result = db.prepare('INSERT INTO contact_messages (name, email, institution, topic, message) VALUES (?, ?, ?, ?, ?)')
    .run(name, email, institution || '', topic || '', message)

  return { success: true, id: result.lastInsertRowId }
})
