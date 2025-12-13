import * as productsService from '#api/products/products.service.js';
import { ERROR_MESSAGES, STATUS } from '#utils/http.js';
import { sendResponse } from '#utils/response.js';

// utilidades locales
const isDigit = (str) => /^\d+$/.test(String(str));

const isInvalidPayload = (payload) =>
	Object.values(payload).some((v) => v == null);

// handlers exportados
export async function create(req, res, next) {
	const { name, price, categories } = req.body || {};
	const payload = { name, price, categories };

	if (isInvalidPayload(payload) || !isDigit(price)) {
		return sendResponse(
			res,
			{ success: false, status: STATUS.VALIDATION_ERROR },
			ERROR_MESSAGES.VALIDATION_ERROR
		);
	}

	try {
		const result = await productsService.create(payload);
		return sendResponse(res, result, ERROR_MESSAGES.PRODUCT_CREATE_FAIL);
	} catch (err) {
		next(err);
	}
}

export async function getAll(_req, res, next) {
	try {
		const result = await productsService.getAll();
		return sendResponse(res, result, ERROR_MESSAGES.PRODUCT_GET_ALL_FAIL);
	} catch (err) {
		next(err);
	}
}

export async function getById(req, res, next) {
	const { id } = req.params || {};

	if (!isDigit(id))
		return sendResponse(
			res,
			{ success: false, status: STATUS.VALIDATION_ERROR },
			ERROR_MESSAGES.VALIDATION_ERROR
		);

	try {
		const result = await productsService.getById(id);
		return sendResponse(res, result, ERROR_MESSAGES.PRODUCT_GET_FAIL);
	} catch (err) {
		next(err);
	}
}

export async function update(req, res, next) {
	const { id, name, price, categories } = req.body || {};
	const payload = { id, name, price, categories };

	// No hay que validar todo el payload <- PATCH usa campos opcionales
	if (!isDigit(id) || !isDigit(price))
		return sendResponse(
			res,
			{ success: false, status: STATUS.VALIDATION_ERROR },
			ERROR_MESSAGES.VALIDATION_ERROR
		);

	try {
		const result = await productsService.update(payload);
		return sendResponse(res, result, ERROR_MESSAGES.PRODUCT_UPDATE_FAIL);
	} catch (err) {
		next(err);
	}
}

export async function remove(req, res, next) {
	const { id } = req.params || {};

	if (!isDigit(id))
		return sendResponse(
			res,
			{ success: false, status: STATUS.VALIDATION_ERROR },
			ERROR_MESSAGES.VALIDATION_ERROR
		);

	try {
		const result = await productsService.remove(id);
		return sendResponse(res, result, ERROR_MESSAGES.PRODUCT_DELETE_FAIL);
	} catch (err) {
		next(err);
	}
}
