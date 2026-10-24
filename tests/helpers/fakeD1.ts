// Minimal in-memory D1Database fake backed by node:sqlite's DatabaseSync,
// for fast/free unit tests that exercise REAL SQL (the actual migration
// files) without needing a live wrangler/miniflare server. Implements just
// the subset of the D1Database surface this project's db.ts actually uses:
// prepare().bind(...).run() / .first() / .all().
//
// KEY FIX vs. the first attempt at this (see session notes / prior
// abandoned version): D1 uses numbered positional placeholders (?1, ?2, ...)
// and the SAME index may legitimately appear more than once in a single
// statement (e.g. `VALUES (?1, ?2, ?2, ?3, ?3)` in ensureSession). Naively
// replacing every `?N` with a bare `?` and passing the original args array
// positionally breaks as soon as an index repeats, because node:sqlite (and
// SQLite's C API) would then expect one bound value per *occurrence*, not
// per unique D1 index. The fix: translate `?N` to SQLite's NAMED parameter
// syntax `$pN` instead, and bind a { p1: ..., p2: ... } object — SQLite
// resolves every occurrence of $pN from the same key, with no array
// flattening required.
import { DatabaseSync } from 'node:sqlite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function loadMigrationSql(): string {
  const migrationsDir = path.join(__dirname, '..', '..', 'migrations')
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort() // 0001_..., 0002_... — lexical sort matches wrangler's apply order
  return files.map((f) => fs.readFileSync(path.join(migrationsDir, f), 'utf8')).join('\n')
}

/** Strip `-- ...` line comments BEFORE splitting on `;` — a comment can
 * legitimately contain a semicolon (e.g. "One row per UTC day; month is
 * derived..." in 0001_chat_schema.sql), which naive split-then-strip breaks. */
function stripSqlComments(sql: string): string {
  return sql
    .split('\n')
    .filter((line) => !line.trim().startsWith('--'))
    .join('\n')
}

function splitStatements(sql: string): string[] {
  return stripSqlComments(sql)
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Translate D1's `?N` positional placeholders to SQLite named params
 * `$pN`, returning the rewritten SQL plus the ordered list of distinct
 * indices referenced (for building the bind object from a D1-style
 * positional args array). */
function translatePlaceholders(sql: string): { sql: string; maxIndex: number } {
  let maxIndex = 0
  const translated = sql.replace(/\?(\d+)/g, (_match, numStr: string) => {
    const n = Number(numStr)
    if (n > maxIndex) maxIndex = n
    return `$p${n}`
  })
  return { sql: translated, maxIndex }
}

interface FakeRunResult {
  meta: { last_row_id: number; changes: number }
}

class FakeStatement {
  private db: DatabaseSync
  private rawSql: string
  private boundArgs: unknown[] = []

  constructor(db: DatabaseSync, rawSql: string) {
    this.db = db
    this.rawSql = rawSql
  }

  bind(...args: unknown[]): FakeStatement {
    const copy = new FakeStatement(this.db, this.rawSql)
    copy.boundArgs = args
    return copy
  }

  private prepareAndBind() {
    const { sql, maxIndex } = translatePlaceholders(this.rawSql)
    const stmt = this.db.prepare(sql)
    if (maxIndex === 0) return stmt // no placeholders (e.g. a bare SELECT)
    const bindObj: Record<string, unknown> = {}
    for (let i = 1; i <= maxIndex; i++) {
      // D1's ?N is 1-indexed and maps directly to boundArgs[N-1].
      bindObj[`p${i}`] = this.boundArgs[i - 1] ?? null
    }
    return { stmt, bindObj }
  }

  async run(): Promise<FakeRunResult> {
    const prepared = this.prepareAndBind()
    if ('stmt' in prepared) {
      const result = prepared.stmt.run(prepared.bindObj)
      return { meta: { last_row_id: Number(result.lastInsertRowid), changes: Number(result.changes) } }
    }
    const result = (prepared as any).run()
    return { meta: { last_row_id: Number(result.lastInsertRowid), changes: Number(result.changes) } }
  }

  async first<T = unknown>(): Promise<T | null> {
    const prepared = this.prepareAndBind()
    const row = 'stmt' in prepared ? prepared.stmt.get(prepared.bindObj) : (prepared as any).get()
    return (row as T) ?? null
  }

  async all<T = unknown>(): Promise<{ results: T[] }> {
    const prepared = this.prepareAndBind()
    const rows = 'stmt' in prepared ? prepared.stmt.all(prepared.bindObj) : (prepared as any).all()
    return { results: rows as T[] }
  }
}

/** A fake D1Database — enough surface for src/lib/chat/db.ts to run against
 * unmodified. Construct fresh per test (or per test file) for isolation. */
export class FakeD1Database {
  private sqlite: DatabaseSync

  constructor() {
    this.sqlite = new DatabaseSync(':memory:')
    this.sqlite.exec('PRAGMA foreign_keys = OFF;') // D1 doesn't enforce FKs by default either
    const statements = splitStatements(loadMigrationSql())
    for (const stmt of statements) {
      this.sqlite.exec(stmt + ';')
    }
  }

  prepare(sql: string): FakeStatement {
    return new FakeStatement(this.sqlite, sql)
  }

  /** Direct passthrough for test setup/assertions that want raw rows without
   * going through the D1Database-shaped prepare()/bind() dance. */
  raw(sql: string, params: Record<string, unknown> = {}): any[] {
    return this.sqlite.prepare(sql).all(params)
  }

  close(): void {
    this.sqlite.close()
  }
}
