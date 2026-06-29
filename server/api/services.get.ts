import { useDb } from '../utils/db'

export default defineEventHandler(() => {
  const db = useDb()
  const rows = db.prepare('SELECT * FROM services ORDER BY id ASC').all()
  return rows
})
