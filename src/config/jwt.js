import 'dotenv/config';

export const JWT_ENV = Object.freeze({
	SECRET: process.env.SECRET,
	EXPIRES_IN: Number(process.env.EXPIRES_IN) || 3600,
	// usuario demo (solo testing/presentación)
	DEMO_USERNAME: process.env.DEMO_USER || false,
	DEMO_PASSWORD: process.env.DEMO_PASSWORD || false,
});

if (!JWT_ENV.SECRET) {
	throw new Error('JWT SECRET no definido');
}
