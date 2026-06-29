import { useDb } from '../../utils/db'
import { checkAdmin } from '../../utils/auth'

export default defineEventHandler((event) => {
  checkAdmin(event)
  const db = useDb()
  const rows = db.prepare('SELECT * FROM contact_messages ORDER BY id DESC').all()
  return rows
})
