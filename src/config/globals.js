import 'dotenv/config';

// env + globals (inmutables)
export const ENV_SERVER = Object.freeze({
	PORT: Number(process.env.PORT) || 3000,
	DIRNAME: process.cwd(),
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
