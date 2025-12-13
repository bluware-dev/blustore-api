import jwt from 'jsonwebtoken';

import * as authModel from '#api/auth/auth.model.js';
import { JWT_ENV } from '#config/jwt.js';
import { STATUS } from '#utils/http.js';

// utilidades locales
const buildJwt = (key) => ({
	token: jwt.sign({ key }, JWT_ENV.SECRET, { expiresIn: JWT_ENV.EXPIRES_IN }),
});

const validateCredentials = (credentials, db) => {
	if (!db || credentials.username != db.username) return false;
	return credentials.password == db.password;
};

const demoUser =
	JWT_ENV.DEMO_USERNAME && JWT_ENV.DEMO_PASSWORD
		? { username: JWT_ENV.DEMO_USERNAME, password: JWT_ENV.DEMO_PASSWORD }
		: null;

// handlers exportados
export async function register(credentials) {
	if (demoUser.username == credentials.username)
		return { success: false, status: STATUS.CONFLICT };

	const usersDB = await authModel.readUsers();

	if (usersDB.find((entry) => entry.username == credentials.username))
		return { success: false, status: STATUS.CONFLICT };

	usersDB?.push(credentials);
	await authModel.writeUsers(usersDB);

	return { success: true, status: STATUS.SUCCESS, data: credentials };
}

export async function login(credentials) {
	if (demoUser && validateCredentials(credentials, demoUser))
		return {
			success: true,
			status: STATUS.SUCCESS,
			data: buildJwt(demoUser.username),
		};

	const usersDB = await authModel.readUsers();
	const user = usersDB?.find(
		(entry) => entry.username == credentials.username
	);

	if (user && validateCredentials(credentials, user))
		return {
			success: true,
			status: STATUS.SUCCESS,
			data: buildJwt(credentials.username),
		};

	return { success: false, status: STATUS.AUTH_INVALID_CREDENTIALS };
}
