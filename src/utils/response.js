import { HTTP_MAP } from '#utils/http.js';

export const buildResponse = (result, errorMsg) => ({
	success: result.success,
	code: result.status,
	...(result.success ? { data: result.data ?? null } : { error: errorMsg }),
});

export const sendResponse = (res, result, errorMsg) =>
	res.status(HTTP_MAP[result.status]).json(buildResponse(result, errorMsg));
