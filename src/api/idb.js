// idb.js - A library for working with IndexedDB
// version
const dbVersion = 1;
// database Name
const dbName = 'calorieTrackerDB';
const storeName = 'calorieEntries';

// Open or create the database
function openDB() {
	return new Promise((resolve, reject) => {
		// if 'dbName' exist -> open, if not-> create
		const request = indexedDB.open(dbName, dbVersion);
		// must run when when created or changed
		request.onupgradeneeded = function (event) {
			let db = event.target.result;
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, {
					keyPath: 'id',
					autoIncrement: true,
				});
			}
		};

		request.onsuccess = function (event) {
			resolve(event.target.result);
		};

		request.onerror = function (event) {
			reject('IndexedDB error: ' + event.target.errorCode);
		};
	});
}

// Add a new entry
function addEntry(entry) {
	return new Promise((resolve, reject) => {
		openDB()
			.then((db) => {
				const transaction = db.transaction([storeName], 'readwrite');
				const store = transaction.objectStore(storeName);
				const request = store.add(entry);

				request.onsuccess = () => resolve(request.result);
				request.onerror = () => reject('Error adding entry');
			})
			.catch(reject);
	});
}

// Get all entries
function getAllEntries() {
	return new Promise((resolve, reject) => {
		openDB()
			.then((db) => {
				const transaction = db.transaction([storeName], 'readonly');
				const store = transaction.objectStore(storeName);
				const request = store.getAll();

				request.onsuccess = () => resolve(request.result);
				request.onerror = () => reject('Error fetching entries');
			})
			.catch(reject);
	});
}

// Placeholder for updateEntry and deleteEntry functions
