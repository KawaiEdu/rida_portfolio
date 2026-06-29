import { useDb } from '../utils/db'

export default defineEventHandler((event) => {
  const db = useDb()
  const rows = db.prepare('SELECT key, value FROM settings').all() as { key: string; value: string }[]
  
  const settingsObj: Record<string, string> = {}
  for (const row of rows) {
    settingsObj[row.key] = row.value
  }
  return settingsObj
})
