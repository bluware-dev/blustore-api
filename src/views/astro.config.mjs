// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';

// https://astro.build/config
export default defineConfig({
	outDir: '../../public',
	integrations: [
		starlight({
			plugins: [
				// Generate the OpenAPI documentation pages.
				starlightOpenAPI([
					{
						base: 'docs/reference',
						schema: 'public/api-schema.json',
					},
				]),
			],
			title: 'BluStore API',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/bluware-dev/blustore-api',
				},
			],
			sidebar: [
				{
					label: 'Sobre el Proyecto',
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: 'Introducción',
							slug: 'docs/guides/introduction',
						},
						{
							label: 'Arquitectura',
							slug: 'docs/guides/architecture',
						},
					],
				},
				...openAPISidebarGroups,
			],
		}),
	],
});
