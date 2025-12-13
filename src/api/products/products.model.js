import fs from 'fs/promises';
import path from 'path';

import { ENV_PATHS, ENV_SERVER } from '#config/globals.js';

export async function readProducts() {
	try {
		const data = await fs.readFile(
			path.join(ENV_SERVER.DIRNAME, ENV_PATHS.PRODUCTS_PATH),
			'utf-8'
		);
		return JSON.parse(data);
	} catch (err) {
		console.error('[readProducts] fallo lectura/parsing:', err.message);
		if (err.code === 'ENOENT') return [];
		throw err;
	}
}

export async function writeProducts(products) {
	try {
		await fs.writeFile(
			path.join(ENV_SERVER.DIRNAME, ENV_PATHS.PRODUCTS_PATH),
			JSON.stringify(products, null, 4)
		);
	} catch (err) {
		console.error('[writeProducts] fallo lectura/parsing:', err.message);
		if (err.code === 'ENOENT')
			throw new Error('Ruta inválida: el directorio no existe');
		throw err;
	}
}
