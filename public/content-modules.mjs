export default new Map([
	[
		'src/content/docs/docs/index.mdx',
		() =>
			import('astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fdocs%2Fdocs%2Findex.mdx&astroContentModuleFlag=true'),
	],
	[
		'src/content/docs/docs/guides/architecture.mdx',
		() =>
			import('astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fdocs%2Fdocs%2Fguides%2Farchitecture.mdx&astroContentModuleFlag=true'),
	],
]);
