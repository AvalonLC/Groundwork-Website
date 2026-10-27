// Custom Node ESM loader hook, registered via `--import` in the test script.
// Production source files use extensionless relative imports everywhere
// (e.g. `from './config'`, `from '../pricing'`) — completely normal and
// correct under Vite's bundler resolution (which is how this project
// actually ships), but plain Node ESM requires an explicit extension to
// resolve a specifier to a file on disk. Rather than rewrite every import
// across the production tree just to satisfy the test runner (which would
// be backwards — tests should adapt to the real source, not vice versa),
// this hook tries appending '.ts' to any relative specifier that fails to
// resolve as-is, the same way bundlers already do.
import { existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context)
  } catch (err) {
    if (
      (specifier.startsWith('./') || specifier.startsWith('../')) &&
      !specifier.endsWith('.ts') &&
      !specifier.endsWith('.js') &&
      !specifier.endsWith('.tsx') &&
      context.parentURL
    ) {
      const parentPath = fileURLToPath(context.parentURL)
      const candidate = path.resolve(path.dirname(parentPath), specifier + '.ts')
      if (existsSync(candidate)) {
        return nextResolve(pathToFileURL(candidate).href, context)
      }
    }
    throw err
  }
}
