import {
	addDoc,
	getDocs,
	collection,
	query,
	where,
	limit,
} from 'firebase/firestore';

import { db } from '#config/firestore.js';

const getSnapByUsername = async (username) => {
	try {
		return await getDocs(
			query(
				collection(db, 'users'),
				where('username', '==', String(username)),
				limit(1)
			)
		);
	} catch (err) {
		console.error(
			'[getSnapByUsername] fallo obteniendo username via query:',
			err.message
		);
		throw err;
	}
};

export async function addUser(credentials) {
	try {
		const usersCol = collection(db, 'users');
		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot#querysnapshotdocs
		await addDoc(usersCol, { ...credentials });

		return credentials;
	} catch (err) {
		console.error('[addUser] fallo al añadir credenciales:', err.message);
		throw err;
	}
}

export async function getUser(username) {
	// https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
	try {
		const usernameSnap = await getSnapByUsername(username);

		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot#querysnapshotempty
		if (usernameSnap.empty) return;

		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot#querysnapshotdocs
		const credentials = usernameSnap.docs[0];

		return credentials.data();
	} catch (err) {
		console.error('[getUser] fallo al obtener credenciales:', err.message);
		throw err;
	}
}

export async function getAllUsers() {
	// https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
	try {
		const usersSnap = await getDocs(collection(db, 'users'));
		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot#querysnapshotempty
		if (usersSnap.empty) return [];

		const users = [];
		// https://firebase.google.com/docs/reference/js/firestore_.querysnapshot.md#querysnapshotforeach
		usersSnap.forEach((doc) => {
			users.push(doc.data());
		});

		return users;
	} catch (err) {
		console.error(
			'[getAllUsers] fallo al obtener credenciales:',
			err.message
		);
		throw err;
	}
}
