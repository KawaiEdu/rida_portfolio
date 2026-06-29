import { join } from 'path'

let dbInstance: any = null

class NodeSqliteWrapper {
  private rawDb: any

  constructor(path: string) {
    const { DatabaseSync } = require('node:sqlite')
    this.rawDb = new DatabaseSync(path)
  }

  exec(sql: string) {
    return this.rawDb.exec(sql)
  }

  prepare(sql: string) {
    const stmt = this.rawDb.prepare(sql)
    return {
      all(...params: any[]) {
        return stmt.all(...params)
      },
      get(...params: any[]) {
        return stmt.get(...params)
      },
      run(...params: any[]) {
        const res = stmt.run(...params)
        return {
          changes: res.changes,
          lastInsertRowid: res.lastInsertRowid
        }
      }
    }
  }

  transaction(fn: (...args: any[]) => any) {
    const self = this
    return function(...args: any[]) {
      self.rawDb.exec('BEGIN')
      try {
        const result = fn(...args)
        self.rawDb.exec('COMMIT')
        return result
      } catch (err) {
        self.rawDb.exec('ROLLBACK')
        throw err
      }
    }
  }
}

export function useDb(): any {
  if (!dbInstance) {
    const dbPath = join(process.cwd(), 'sqlite.db')
    
    try {
      const { DatabaseSync } = require('node:sqlite')
      if (DatabaseSync) {
        dbInstance = new NodeSqliteWrapper(dbPath)
        console.log('[useDb] Using native node:sqlite database engine.')
      } else {
        throw new Error('DatabaseSync not found')
      }
    } catch (e) {
      const Database = require('better-sqlite3')
      dbInstance = new Database(dbPath)
      dbInstance.pragma('journal_mode = WAL')
      console.log('[useDb] Using better-sqlite3 database engine.')
    }
  }
  return dbInstance
}
