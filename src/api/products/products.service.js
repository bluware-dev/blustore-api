import * as productsModel from '#api/products/products.model.js';
import { STATUS } from '#utils/http.js';

// utilidades locales
const generateId = (products) => {
	if (!products.length) return 1;
	const lastId = Math.max(...products.map((p) => Number(p.id)));
	// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#examples
	return Number.isNaN(lastId) ? Date.now() : lastId + 1; // Nota: Number.isNaN() evita coerción implicita (mas preciso)
};

// handlers exportados
export async function create(payload) {
	const products = await productsModel.readProducts();
	const product = {
		id: generateId(products), // Posibles race conditions...
		...payload,
	};

	const next = [...products, product];
	await productsModel.writeProducts(next);

	return { success: true, status: STATUS.SUCCESS, data: product };
}

export async function getAll() {
	const products = await productsModel.readProducts();
	return { success: true, status: STATUS.SUCCESS, data: products ?? [] };
}

export async function getById(id) {
	const products = await productsModel.readProducts();
	const product = products.find((p) => p.id == id);

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
	const products = await productsModel.readProducts();
	// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex#descripci%C3%B3n
	const idx = products.findIndex((p) => p.id == payload.id);
	if (idx === -1) return { success: false, status: STATUS.NOT_FOUND };

	// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
	products[idx] = {
		...products[idx],
		...Object.fromEntries(
			Object.entries(payload).filter(
				([key, value]) => key !== 'id' && value != null
			)
		),
	};
	await productsModel.writeProducts(products);

	return { success: true, status: STATUS.SUCCESS, data: products[idx] };
}

export async function remove(id) {
	const products = await productsModel.readProducts();
	const idx = products.findIndex((p) => p.id == id);
	if (idx === -1) return { success: false, status: STATUS.NOT_FOUND };

	const product = products.splice(idx, 1)[0];
	await productsModel.writeProducts(products);

	return { success: true, status: STATUS.SUCCESS, data: product };
}
