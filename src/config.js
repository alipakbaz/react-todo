export const idbConfig = {
    dbName: 'todo_db',
    version: 1,
    objectsStore: [
        {
            name: 'todo',
            optionalParameters: {
                keyPath: 'id',
                autoIncrement: true
            },
            indexes: [
                {
                    name: 'parentId',
                    keyPath: 'parentId',
                    options: {
                        unique: false
                    }
                },
                {
                    name: 'order',
                    keyPath: 'order',
                    options: {
                        unique: false
                    }
                }
            ]
        }
    ]
};