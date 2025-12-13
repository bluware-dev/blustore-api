import * as productsModel from '#api/products/products.model.js';
import { STATUS } from '#utils/http.js';

// handlers exportados
export async function create(payload) {
	const product = await productsModel.createProduct(payload); // Race conditions culpa del internal ID (Fix: Autoincremental IDs == Romper contrato formal)

	return { success: true, status: STATUS.SUCCESS, data: product };
}

export async function getAll() {
	const products = await productsModel.getAllProducts();
	return { success: true, status: STATUS.SUCCESS, data: products ?? [] };
}

export async function getById(id) {
	const product = await productsModel.getProductById(id);

	if (!product)
		return {
			success: false,
			status: STATUS.NOT_FOUND,
		};

	return { success: true, status: STATUS.SUCCESS, data: product };
}

/**
 * Update patch real, no reconstruye toda la estructura.
 * PATCH -> update
 * PUT   -> replace
 * https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Methods/PATCH
 * https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Methods/PUT
 */
export async function update(payload) {
	// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
	const normalizeProduct = {
		...Object.fromEntries(
			Object.entries(payload).filter(
				([key, value]) => key !== 'id' && value != null
			)
		),
	};
	const product = await productsModel.updateProduct({
		id: payload.id,
		...normalizeProduct,
	});

	return { success: true, status: STATUS.SUCCESS, data: product };
}

export async function remove(id) {
	const product = await productsModel.deleteProduct(id);

	if (!product.id) return { success: false, status: STATUS.NOT_FOUND };

	return { success: true, status: STATUS.SUCCESS, data: product };
}
