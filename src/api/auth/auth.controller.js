import * as authService from '#api/auth/auth.service.js';
import { ERROR_MESSAGES, STATUS } from '#utils/http.js';
import { sendResponse } from '#utils/response.js';

// utilidades locales
const isInvalidCredentials = (credentials) =>
	Object.values(credentials).some((v) => !v);

export async function register(req, res, next) {
	const { username, password } = req.body;
	const credentials = { username, password };

	if (isInvalidCredentials(credentials))
		return sendResponse(
			res,
			{ success: false, status: STATUS.VALIDATION_ERROR },
			ERROR_MESSAGES.VALIDATION_ERROR
		);

	try {
		const result = await authService.register(credentials);
		return sendResponse(res, result, ERROR_MESSAGES.AUTH_USER_EXISTS);
	} catch (err) {
		next(err);
	}
}

// handlers exportables
export async function login(req, res, next) {
	const { username, password } = req.body;
	const credentials = { username, password };

	if (isInvalidCredentials(credentials))
		return sendResponse(
			res,
			{ success: false, status: STATUS.VALIDATION_ERROR },
			ERROR_MESSAGES.VALIDATION_ERROR
		);

	try {
		const result = await authService.login(credentials);
		return sendResponse(
			res,
			result,
			ERROR_MESSAGES.AUTH_INVALID_CREDENTIALS
		);
	} catch (err) {
		next(err);
	}
}
