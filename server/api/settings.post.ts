import { useDb } from '../utils/db'
import { checkAdmin } from '../utils/auth'

export default defineEventHandler(async (event) => {
  checkAdmin(event)
  
  const body = await readBody(event)
  if (!body || typeof body !== 'object') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Data tidak valid'
    })
  }

  const db = useDb()
  const upsertSetting = db.prepare(`
    INSERT INTO settings (key, value) 
    VALUES (?, ?) 
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `)
  
  const transaction = db.transaction((settingsObj) => {
    for (const [key, value] of Object.entries(settingsObj)) {
      upsertSetting.run(key, String(value))
    }
  })
  
  transaction(body)
  return { success: true }
})
