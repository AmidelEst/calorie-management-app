/*
    Developers:
        1. developer
        first name: Amit, 
        last name": Pompas, 
        id:315072397,
        2. developer
        first name: Lior, 
        last name": Bezalel, 
        id:207015249,
        3. developer
        first name: Tal, 
        last name": Brachya, 
        id:318660859,  
*/



// idb.js - A library for working with IndexedDB

//  -----global vars------

// version
const dbVersion = 1;
// database Name
const dbName = 'calorieTrackerDB';
// similar to a "table" name
const storeName = 'calorieConsumptionItems';
//--

// Open or create the database

/**
 * Opens a connection to the IndexedDB.
 * @returns {Promise<IDBDatabase>} A promise that resolves with the IDBDatabase instance.
 */
function openDB() {
	return new Promise((resolve, reject) => {
		// if 'dbName' exist -> open, if not-> create
		const request = indexedDB.open(dbName, dbVersion);

		// must run when created or changed
		request.onupgradeneeded = (event) => {
			// stores ref to the openDB Obj
			const db = event.target.result;

			// if no such DB=> create it
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, {
					keyPath: 'id',
					autoIncrement: true,
				});
			}
		};

		request.onsuccess = (event) => {
			resolve(event.target.result);
		};
		request.onerror = (event) => {
			reject('IndexedDB error: ' + event.target.errorCode);
		};
	});
}

// Add a new item

/**
 * Adds a new calorie item to the database.
 * @param {Object} item The calorie item to add.
 * @returns {Promise<void>} A promise that resolves when the item is added.
 */
function addCalorieItem(item) {
	return new Promise((resolve, reject) => {
		openDB()
			.then((db) => {
				const transaction = db.transaction([storeName], 'readwrite');
				const store = transaction.objectStore(storeName);
				const request = store.add(item);

				request.onsuccess = () => resolve(request.result);
				request.onerror = (event) => reject('Error adding item');
			})
			.catch(reject);
	});
}

// Get all entries
function getAllItems() {
	return new Promise((resolve, reject) => {
		openDB()
			.then((db) => {
				const transaction = db.transaction([storeName], 'readonly');
				const store = transaction.objectStore(storeName);
				const request = store.getAll();

				request.onsuccess = () => resolve(request.result);
				request.onerror = (event) => reject('Error fetching entries');
			})
			.catch((error) => {
				reject('Error opening database: ' + error);
			});
	});
}

// Placeholder for updateitem and deleteitem functions

module.exports = { openDB,addCalorieItem,getAllItems };