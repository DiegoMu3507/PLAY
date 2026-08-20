import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // Each game colocates its default component with a named, pure
    // compute*Score fn so scoring can be unit-tested without simulating the
    // UI (see docs/superpowers/specs/2026-08-18-games-section-plan3-design.md).
    // That intentionally breaks Fast Refresh's one-export-per-file convention.
    files: ['src/games/*.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
])
