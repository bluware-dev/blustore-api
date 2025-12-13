import {
	addDoc,
	updateDoc,
	deleteDoc,
	getDocs,
	collection,
	orderBy,
	query,
	where,
	limit,
} from 'firebase/firestore';

import { db } from '#config/firestore.js';

const getProductSnapInternalId = async (id) => {
	try {
		return await getDocs(
			query(
				collection(db, 'products'),
				where('id', '==', Number(id)),
				limit(1)
			)
		);
	} catch (err) {
		console.error(
			'[getProductSnapInternalId] fallo obteniendo docs via query:',
			err.message
		);
		throw err;
	}
};

const getProductLastId = async () => {
	try {
		return await getDocs(
			query(collection(db, 'products'), orderBy('id', 'desc'), limit(1))
		);
	} catch (err) {
		console.error(
			'[getProductsLastId] fallo obteniendo docs via query:',
			err.message
		);
		throw err;
	}
};

export async function createProduct(product) {
	try {
		const productsCol = collection(db, 'products');
		const lastId = await getProductLastId();
		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot#querysnapshotempty
		if (lastId.empty) return {};

		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot#querysnapshotdocs
		const lastIdValue = lastId.docs[0].data().id;
		const nextId = Number.isNaN(lastIdValue) ? 1 : lastIdValue + 1;

		await addDoc(productsCol, { id: nextId, ...product });

		return product;
	} catch (err) {
		console.error(
			'[createProduct] fallo al intentar crear un producto:',
			err.message
		);
		throw err;
	}
}

export async function updateProduct(product) {
	try {
		const productsSnap = await getProductSnapInternalId(product.id);
		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot#querysnapshotempty
		// https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
		if (productsSnap.empty) return {};

		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot#querysnapshotdocs
		const productRef = productsSnap.docs[0];

		// https://firebase.google.com/docs/reference/js/firestore_.documentsnapshot.md#documentsnapshotref
		await updateDoc(productRef.ref, { ...product });

		return product;
	} catch (err) {
		console.error(
			'[updateProduct] fallo al intentar actualizar un producto:',
			err.message
		);
		throw err;
	}
}

export async function deleteProduct(id) {
	try {
		const productsSnap = await getProductSnapInternalId(id);
		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot#querysnapshotempty
		if (productsSnap.empty) return {};

		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot#querysnapshotdocs
		// https://firebase.google.com/docs/reference/js/firestore_.documentsnapshot.md#documentsnapshotref
		const productRef = productsSnap.docs[0];
		await deleteDoc(productRef.ref); // Puede eliminar solo con la referencia

		return productRef.data();
	} catch (err) {
		console.error(
			'[deleteProduct] fallo al intentar eliminar un producto:',
			err.message
		);
		throw err;
	}
}

// https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection
export async function getAllProducts() {
	try {
		const productsSnap = await getDocs(collection(db, 'products'));
		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot#querysnapshotempty
		if (productsSnap.empty) return [];

		const products = [];
		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot.md#querysnapshotforeach
		productsSnap.forEach((doc) => {
			products.push(doc.data());
		});

		return products;
	} catch (err) {
		console.error(
			'[getAllProducts] fallo al obtener todos los productos:',
			err.message
		);
		throw err;
	}
}

// https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
export async function getProductById(id) {
	try {
		const productsSnap = await getProductSnapInternalId(id);

		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot#querysnapshotempty
		if (productsSnap.empty) return;

		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot#querysnapshotdocs
		const product = productsSnap.docs[0];

		return product.data();
	} catch (err) {
		console.error(
			'[getProductById] fallo al obtener el producto:',
			err.message
		);
		throw err;
	}
}
