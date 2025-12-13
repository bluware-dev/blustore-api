import 'dotenv/config';

// env + globals (inmutables)
export const ENV_SERVER = Object.freeze({
	PORT: Number(process.env.PORT) || 3000,
	DIRNAME: process.cwd(),
});

export const ENV_PATHS = Object.freeze({
	PRODUCTS_PATH: process.env.PRODUCTS_PATH,
	USERS_PATH: process.env.USERS_PATH,
});

// CORS
// Nota: usar variables de entorno especificas para features en vez de NODE_ENV (ver scripts.dev en package.json)
const allowLocalhost = process.env.LOCALHOST_CORS === 'true';
// https://nodejs.org/es/learn/getting-started/nodejs-the-difference-between-development-and-production#why-is-node_env-considered-an-antipattern
const localhostRegex = allowLocalhost ? /^http:\/\/localhost:\d+$/ : null;

export const corsOptions = Object.freeze({
	origin: [
		'https://blustore.vercel.app',
		...(localhostRegex ? [localhostRegex] : []),
	],
	credentials: true,
});
