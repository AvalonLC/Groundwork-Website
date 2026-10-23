// Compiles src/lib/pricing.ts into a standalone browser bundle at
// public/static/pricing.js, exposed as window.GroundworkPricing.
//
// Why this exists: public/static/site.js is a plain static file (not
// processed by Vite), but its pricing calculator (recalc()) must use the
// EXACT same arithmetic as Groundwork AI's get_pricing_estimate tool, which
// imports src/lib/pricing.ts directly inside the Worker. Re-typing the same
// formula in site.js would reintroduce the two-implementations drift risk
// this module was built to eliminate. Instead, this script compiles the one
// TypeScript source into an IIFE the browser can load, and site.js calls
// into it instead of computing anything itself.
//
// Run via `npm run build` (wired in as a pre-build step) — see package.json.
import { build } from 'esbuild'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

await build({
  entryPoints: [join(root, 'src/lib/pricing.ts')],
  bundle: true,
  format: 'iife',
  globalName: 'GroundworkPricing',
  outfile: join(root, 'public/static/pricing.js'),
  target: 'es2019',
  minify: false,
  logLevel: 'info',
})
