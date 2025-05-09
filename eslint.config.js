import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked, // Cambiado a recommendedTypeChecked
      ...tseslint.configs.stylisticTypeChecked,  // Opcional: añade reglas de estilo
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest', // Actualizado a 'latest'
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname, // Alternativa moderna a __dirname
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': reactPlugin, // Añadido el plugin de React
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
    settings: {
      react: {
        version: 'detect', // Detecta automáticamente la versión de React
      },
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    extends: [
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
    ],
  }
)
