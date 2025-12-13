import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';

export default defineConfig([
	globalIgnores(['.astro/', 'dist/']),

	{
		files: ['**/*.{ts,tsx,js,mjs}'],

		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.json',
			},
		},

		plugins: {
			'@typescript-eslint': tsPlugin,
			import: importPlugin,
			prettier,
		},

		rules: {
			// Orden de imports
			'import/order': [
				'error',
				{
					groups: [
						['builtin', 'external'],
						['internal'],
						['parent', 'sibling', 'index'],
					],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],

			// Variables no usadas en TS
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_' },
			],

			// Prettier como error
			'prettier/prettier': 'error',
		},
	},
]);
