import { useDb } from '../../utils/db'

export default defineEventHandler(() => {
  const db = useDb()
  const rows = db.prepare('SELECT * FROM blogs ORDER BY created_at DESC').all()
  return rows
})
