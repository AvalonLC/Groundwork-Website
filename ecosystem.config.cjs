module.exports = {
  apps: [
    {
      name: 'webapp',
      script: 'npx',
      // NOTE: do NOT pass --d1=DB here. wrangler.jsonc already declares the D1
      // binding (name "DB", database_name "groundwork-crm-marketing-production").
      // Passing --d1=DB as a CLI flag makes wrangler synthesize a SEPARATE local
      // D1 database identified by the literal string "DB", which is a DIFFERENT
      // local SQLite file than the one `wrangler d1 migrations apply DB --local`
      // writes to (that command reads database_name from wrangler.jsonc). Omitting
      // --d1 lets `pages dev` pick up the binding from wrangler.jsonc directly, so
      // both the migration CLI and the dev server agree on the same local database.
      args: 'wrangler pages dev dist --local --persist-to=.wrangler/state --ip 0.0.0.0 --port 3000 --compatibility-date=2026-07-08',
      env: { NODE_ENV: 'development', PORT: 3000 },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
