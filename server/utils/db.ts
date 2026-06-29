import Database from 'better-sqlite3'
import { join } from 'path'

let dbInstance: Database.Database | null = null

export function useDb(): Database.Database {
  if (!dbInstance) {
    const dbPath = join(process.cwd(), 'sqlite.db')
    dbInstance = new Database(dbPath)
    dbInstance.pragma('journal_mode = WAL')
  }
  return dbInstance
}
