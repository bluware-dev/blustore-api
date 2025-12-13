import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default defineConfig([
	globalIgnores(['src/views/**/*', 'data/**/*']),
	{
		files: ['**/*.js', '**/*.mjs'],

		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.node,
			},
		},

		plugins: {
			import: importPlugin,
		},

		rules: {
			'no-undef': 'error',
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
					// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#warnonunassignedimports
					warnOnUnassignedImports: true, // Ayuda a ordenar imports como: 'dotenv/config'
				},
			],
		},
	},
]);
