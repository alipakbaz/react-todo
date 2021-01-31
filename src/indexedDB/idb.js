export const indexedDBSupported = () => {
    return ('indexedDB' in window);
};

export const openDB = config => {
    const {dbName, version, objectsStore} = config;

    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbName, version);

        request.onupgradeneeded = e => {
            const db = e.target.result;
            if (Array.isArray(objectsStore)) {
                for (const oSItem of objectsStore) {
                    if (!db.objectStoreNames.contains(oSItem.name)) {

                        const objectStore = db.createObjectStore(oSItem.name, oSItem.optionalParameters);

                        if (Array.isArray(oSItem.indexes)) {
                            for (const index of oSItem.indexes) {
                                objectStore.createIndex(index.name, index.keyPath, index.options);
                            }
                        }

                    }
                }
            }
        };

        request.onsuccess = e => {
            resolve(e.target.result);
        };

        request.onerror = e => {
            reject(e.target.error.message);
        };
    });
};

export const getAllItems = (db, objectStoreName, index) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(objectStoreName, 'readonly');
        transaction.onerror = e => {
            reject(e.target.error)
        };

        if (index !== undefined) {
            transaction.objectStore(objectStoreName).index(index).getAll().onsuccess = e => {
                resolve(e.target.result);
            };
        } else {
            transaction.objectStore(objectStoreName).getAll().onsuccess = e => {
                resolve(e.target.result);
            };
        }
    });
};

export const addItem = (db, objectStoreName, data) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(objectStoreName, 'readwrite');
        transaction.onerror = e => {
            reject(e.target.error)
        };

        transaction.objectStore(objectStoreName).add(data).onsuccess = (e) => {
            resolve({
                type: 'ok',
                key: e.target.result
            });
        };
    });
};

export const updateItem = param => {
    const {db, store, key, data} = param;

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(store, 'readwrite');
        transaction.onerror = e => {
            reject(e.target.error)
        };

        const objectStore = transaction.objectStore(store);

        objectStore.get(key).onsuccess = e => {
            const item = e.target.result;
            if (item) {
                Object.keys(data).map(propertyName => {
                    item[propertyName] = data[propertyName];
                });

                objectStore.put(item).onsuccess = () => {
                    resolve('ok');
                };
            } else {
                resolve('error');
            }
        };
    });
};

export const deleteItem = (db, objectStoreName, id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(objectStoreName, 'readwrite');
        transaction.onerror = e => {
            reject(e.target.error)
        };

        transaction.objectStore(objectStoreName).delete(id).onsuccess = () => {
            resolve('ok');
        };
    });
};

export const incOrder = param => {
    const {db, store, order} = param;
    let step = param.step ? param.step : 1;

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(store, 'readwrite');
        transaction.onerror = e => {
            reject(e.target.error)
        };

        const objectStore = transaction.objectStore(store);

        objectStore.openCursor().onsuccess = e => {
            const cursor = e.target.result;
            if (cursor) {
                if (cursor.value.order >= order) {
                    const updateData = cursor.value;

                    updateData.order = updateData.order + step;
                    cursor.update(updateData);
                }

                cursor.continue();
            } else {
                resolve('ok');
            }
        };
    });
};