import { ERROR_MESSAGES, STATUS } from '#utils/http.js';
import { sendResponse } from '#utils/response.js';

/**
 * Flujo de errores en API Routes:
 * Modelo (error log) -> throw -> Servicio falla -> propagación -> Controlador captura -> next(err) -> errorHandler
 */
export default (err, _req, res, _next) => {
	err.status
		? console.error('[errorHandler]', err.status, err.stack)
		: console.error('[errorHandler]', err.stack);

	if (err instanceof SyntaxError && err.status === 400) {
		return sendResponse(
			res,
			{ success: false, status: STATUS.VALIDATION_ERROR },
			ERROR_MESSAGES.VALIDATION_ERROR
		);
	}

	return sendResponse(
		res,
		{ success: false, status: STATUS.INTERNAL_ERROR },
		ERROR_MESSAGES.INTERNAL_ERROR
	);
};
