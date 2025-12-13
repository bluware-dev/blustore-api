import fs from 'fs/promises';
import path from 'path';

import { ENV_SERVER, ENV_PATHS } from '#config/globals.js';

export async function readUsers() {
	try {
		const data = await fs.readFile(
			path.join(ENV_SERVER.DIRNAME, ENV_PATHS.USERS_PATH),
			'utf-8'
		);
		return JSON.parse(data);
	} catch (err) {
		console.error('[readUsers] fallo lectura/parsing:', err.message);
		if (err.code === 'ENOENT') return [];
		throw err;
	}
}

export async function writeUsers(users) {
	try {
		await fs.writeFile(
			path.join(ENV_SERVER.DIRNAME, ENV_PATHS.USERS_PATH),
			JSON.stringify(users, null, 4)
		);
	} catch (err) {
		console.error('[writeUsers] fallo lectura/parsing:', err.message);
		if (err.code === 'ENOENT')
			throw new Error('Ruta inválida: el directorio no existe');
		throw err;
	}
}
