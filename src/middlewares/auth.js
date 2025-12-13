import jwt from 'jsonwebtoken';

import { JWT_ENV } from '#config/jwt.js';
import { ERROR_MESSAGES, STATUS } from '#utils/http.js';
import { sendResponse } from '#utils/response.js';

export const auth = (req, res, next) => {
	const header = req.headers['authorization'];
	// https://stackoverflow.com/questions/50284841/how-to-extract-token-string-from-bearer-token
	const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

	if (!token)
		return sendResponse(
			res,
			{ status: STATUS.UNAUTHORIZED },
			ERROR_MESSAGES.UNAUTHORIZED
		);

	try {
		jwt.verify(token, JWT_ENV.SECRET);
		next();
	} catch {
		return sendResponse(
			res,
			{ status: STATUS.UNAUTHORIZED },
			ERROR_MESSAGES.UNAUTHORIZED
		);
	}
};
