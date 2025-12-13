/**
 * Adaptador HTTP + Llaves simbólicas de estado.
 *
 * - HTTP_MAP: autoridad de códigos numéricos.
 * - STATUS: claves simbólicas autocompletables.
 *
 * Flujo:
 *   Service    -> { status: STATUS.SUCCESS, data: ... }
 *   Controller -> res.status(HTTP_MAP[result.status]).json(...) // Normalizar con sendResponse
 *
 * Nota: Abstracciones para uso global en #utils/response.js
 */

export const HTTP_MAP = Object.freeze({
	// 5xx
	INTERNAL_ERROR: 500,

	// 4xx
	CONFLICT: 409,
	NOT_FOUND: 404,

	FORBIDDEN: 403,
	UNAUTHORIZED: 401,
	AUTH_INVALID_CREDENTIALS: 401,
	VALIDATION_ERROR: 400,

	// 2xx
	SUCCESS: 200,
});

// Hardcoded para forzar el funcionamiento de Intellisense
export const STATUS = Object.freeze({
	// 5xx
	INTERNAL_ERROR: 'INTERNAL_ERROR',

	// 4xx
	CONFLICT: 'CONFLICT',
	NOT_FOUND: 'NOT_FOUND',

	FORBIDDEN: 'FORBIDDEN',
	UNAUTHORIZED: 'UNAUTHORIZED',
	AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
	VALIDATION_ERROR: 'VALIDATION_ERROR',

	// 2xx
	SUCCESS: 'SUCCESS',
});

// Mensajes de error normalizados
// Evita dejar magic strings en sendResponse(res, result, 'Magic error string')
export const ERROR_MESSAGES = Object.freeze({
	// 5xx
	INTERNAL_ERROR: 'Error interno del servidor',

	// 4xx
	AUTH_USER_EXISTS: 'El usuario ya existe',
	NOT_FOUND: 'Recurso no encontrado',
	FORBIDDEN: 'Acceso denegado',
	UNAUTHORIZED: 'No se proporcionó un token válido',
	AUTH_INVALID_CREDENTIALS: 'Credenciales inválidas',
	VALIDATION_ERROR: 'Datos inválidos o incompletos',

	// Casos específicos extendibles
	PRODUCT_GET_ALL_FAIL: 'No se pudieron obtener los productos',
	PRODUCT_GET_FAIL: 'No se pudo obtener el producto',
	PRODUCT_CREATE_FAIL: 'No se pudo registrar el producto',
	PRODUCT_UPDATE_FAIL: 'No se pudo actualizar el producto',
	PRODUCT_DELETE_FAIL: 'No se pudo eliminar el producto',
	USER_LOGIN_FAIL: 'No se pudo iniciar sesión',
	USER_REGISTER_FAIL: 'No se pudo registrar el usuario',
});
