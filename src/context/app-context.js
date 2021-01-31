import React, {useState, useEffect} from 'react';
import {idbConfig} from "../config";
import {openDB, addItem, getAllItems, updateItem, deleteItem, incOrder} from "../indexedDB/idb";
import {hideLoadingScreen} from "../func/func";

export const AppContext = React.createContext({});

const AppContextProvider = (props) => {
    const provider = {};
    const [dataLoaded, setDataLoaded] = useState(false);
    const [todoData, setTodoData] = useState({
        list: [],
        newItemId: 0,
        activeItem: {
            id: 0,
            cursorPointer: -1
        }
    });
    const [database, setDatabase] = useState(null);

    const listSortCompare = (a, b) => {
        if (a.order > b.order) {
            return 1
        }
        if (a.order < b.order) {
            return -1;
        }
        return 0;
    };

    const creatTreeStructure = (dataArray, parentId) => {
        const creator = (pId) => {
            const stack = {};
            for (const item of dataArray) {
                if (parseInt(item.parentId) === parseInt(pId)) {
                    stack[`key-${item.id}`] = item;
                }
            }

            const keys = Object.keys(stack);
            if (keys.length > 0) {
                for (const key of keys) {
                    stack[key].ch = creator(stack[key].id);
                }

                return stack;
            }
        };

        const dataTree = creator(parentId);

        return (dataTree || {});
    };

    const getAllChildren = (dataArray, parentId) => {
        const children = [];
        const childrenIndex = {};

        const fetch = (pId) => {
            for (let i = 0; i < dataArray.length; i++) {
                if (parseInt(dataArray[i].parentId) === parseInt(pId)) {
                    children.push(dataArray[i].id);
                    childrenIndex[dataArray[i].id] = i;
                    fetch(dataArray[i].id);
                }
            }
        };
        fetch(parentId);

        return {children, childrenIndex};
    };

    provider.todoList = creatTreeStructure(todoData.list, 0);
    provider.newItemId = parseInt(todoData.newItemId);
    provider.activeItem = todoData.activeItem;

    provider.addTodoItemByAddBtn = async () => {
        const todoList = todoData.list;
        const data = {
            parentId: 0,
            order: todoList.length > 0 ? (todoList[todoList.length - 1].order + 1) : 100,
            title: ''
        };
        const result = await addItem(database, 'todo', data);

        // Update data
        if (result.type === 'ok') {
            data.id = result.key; // get todo id
            todoList.push(data);
            setTodoData(prevState => {
                const updatedState = {
                    list: todoList,
                    newItemId: result.key,
                    activeItem: { // reset active item
                        id: 0,
                        cursorPointer: -1
                    }
                };
                return {...prevState, ...updatedState};
            });
        }
    };

    provider.addTodoItemByEnter = async (parentId, previousItemId, previousItemOrder) => {
        const todoList = todoData.list;

        // Each of items that its order value is greater than or equal to previousItemOrder+1, one unit increases.
        await incOrder({ // update db
            db: database,
            store: 'todo',
            order: previousItemOrder + 1
        });
        for (let i = 0; i < todoList.length; i++) { // update todo list
            if (todoList[i].order >= (previousItemOrder + 1)) {
                todoList[i].order = todoList[i].order + 1;
            }
        }

        // Add new item to database
        const data = {
            parentId: parentId,
            order: previousItemOrder + 1,
            title: ''
        };
        const result = await addItem(database, 'todo', data);

        // Update data
        if (result.type === 'ok') {
            data.id = result.key;

            for (let i = 0; i < todoList.length; i++) { // insert new item in todo list
                if (todoList[i].id === previousItemId) {
                    todoList.splice(i + 1, 0, data);
                    break;
                }
            }

            setTodoData(prevState => {
                const updatedState = {
                    list: todoList,
                    newItemId: result.key,
                    activeItem: {
                        id: 0,
                        cursorPointer: -1
                    }
                };
                return {...prevState, ...updatedState};
            });
        }
    };

    provider.updateTodoTitle = async (id, title, cursorPointer) => {
        const todoList = todoData.list;
        for (let i = 0; i < todoList.length; i++) { // update list
            if (todoList[i].id === id) {
                todoList[i].title = title;
                break;
            }
        }

        await updateItem({ // update item in db
            db: database,
            store: 'todo',
            key: id,
            data: {
                title: title
            }
        });

        setTodoData(prevState => { // update state
            const updatedState = {
                list: todoList,
                activeItem: { // set this item as active item
                    id: id,
                    cursorPointer: cursorPointer
                }
            };
            return {...prevState, ...updatedState};
        });
    };

    provider.deleteTodo = async id => {
        const result = await deleteItem(database, 'todo', id);

        if (result === 'ok') {
            const todoList = todoData.list;

            // Delete item children from db and list.
            const {children} = getAllChildren(todoList, id);
            for (const id of children) {
                await deleteItem(database, 'todo', id);
            }
            for (let i = 0; i < todoList.length; i++) {
                if (children.includes(todoList[i].id)) {
                    todoList.splice(i, 1);
                    i--;
                }
            }

            /*
            Set active item information. And delete requested item from list.
            The active item is the item that will be focused after deleting the requested items.
             */
            let activeItemId = 0;
            for (let i = 0; i < todoList.length; i++) {
                if (parseInt(todoList[i].id) === parseInt(id)) {
                    // set active item
                    if (i > 0) {
                        activeItemId = todoList[i - 1].id;
                    } else if (i + 1 < todoList.length) {
                        activeItemId = todoList[i + 1].id;
                    }

                    // delete requested item from list.
                    todoList.splice(i, 1);
                    break;
                }
            }

            setTodoData(prevState => { // update state
                const updatedState = {
                    list: todoList,
                    activeItem: {
                        id: activeItemId
                    }
                };

                return {...prevState, ...updatedState};
            });
        }
    };

    provider.forwardIndentation = async props => {
        const {id, parentId, cursorPointer} = props;
        const todoList = todoData.list;
        let itemIndex = null; // Current item index in todo list array.

        /*
        List of the items that are level with the current item.
        To identify the parent item
         */
        const sameLevelTodoList = [];

        for (let k = 0; k < todoList.length; k++) {
            if (todoList[k].parentId === parentId) {
                sameLevelTodoList.push(todoList[k])
            }

            if (todoList[k].id === id) {
                itemIndex = k;
            }
        }

        let newParentItem = null;
        for (let j = 0; j < sameLevelTodoList.length; j++) { // identify the parent item
            if (sameLevelTodoList[j].id === id) {
                if (j > 0) {
                    newParentItem = sameLevelTodoList[j - 1];
                }
                break;
            }
        }

        if (newParentItem !== null) {
            const newData = {
                parentId: newParentItem.id
            };

            const result = await updateItem({
                db: database,
                store: 'todo',
                key: id,
                data: newData
            });

            if (result === 'ok') {
                todoList[itemIndex].parentId = newData.parentId; // update list

                setTodoData(prevState => { // update state
                    const updatedState = {
                        list: todoList,
                        activeItem: {
                            id: id,
                            cursorPointer: cursorPointer
                        }
                    };

                    return {...prevState, ...updatedState};
                });
            }
        }
    };

    provider.backIndentation = async props => {
        const {id, parentId, cursorPointer} = props;
        const todoList = todoData.list;

        if (parentId !== 0) {
            let itemIndex = null; // Current item index in todo list array.
            let newParentId = null; // The parent ID of the item that will be one of its children after the change of direction.
            let newOrder = null; // The order of the item to be set to determine its display order.

            for (let i = 0; i < todoList.length; i++) { // set newParentId & itemIndex
                if (todoList[i].id === parentId) {
                    newParentId = todoList[i].parentId;
                }

                if (todoList[i].id === id) {
                    itemIndex = i;
                }
            }

            // set newOrder
            const parentChildren = getAllChildren(todoList, parentId).children;
            for (let j = itemIndex + 1; j < todoList.length; j++) {
                if (todoList[j].parentId !== parentId && !parentChildren.includes(todoList[j].id)) {
                    newOrder = todoList[j].order;

                    break;
                }
            }

            if (itemIndex !== null && newParentId !== null) {
                if (newOrder === null) {
                    const {children, childrenIndex} = getAllChildren(todoList, id);
                    const lastItem = todoList[(todoList.length - 1)]; // Last item of todo list
                    if (lastItem.id !== id && !children.includes(lastItem.id)) {
                        newOrder = lastItem.order + 1;

                        // update children order in db and state.
                        for (let i = 0; i < children.length; i++) {
                            const id = children[i];
                            const index = childrenIndex[id];
                            const order = newOrder + i + 1;

                            todoList[index].order = order;
                            await updateItem({
                                db: database,
                                store: 'todo',
                                key: id,
                                data: {order: order}
                            });
                        }
                    }
                } else {
                    const {children, childrenIndex} = getAllChildren(todoList, id);
                    await incOrder({
                        db: database,
                        store: 'todo',
                        order: newOrder,
                        step: children.length + 1
                    });
                    for (let i = 0; i < todoList.length; i++) { // update list
                        if (todoList[i].order >= newOrder) {
                            todoList[i].order = todoList[i].order + children.length + 1;
                        }
                    }

                    // update children order in db and state.
                    for (let i = 0; i < children.length; i++) {
                        const id = children[i];
                        const index = childrenIndex[id];
                        const order = newOrder + i + 1;

                        todoList[index].order = order;
                        await updateItem({
                            db: database,
                            store: 'todo',
                            key: id,
                            data: {order: order}
                        });
                    }
                }

                const result = await updateItem({ // update current item in db
                    db: database,
                    store: 'todo',
                    key: id,
                    data: newOrder !== null ? {order: newOrder, parentId: newParentId} : {parentId: newParentId}
                });

                if (result === 'ok') { // success update db
                    todoList[itemIndex].parentId = newParentId;
                    if (newOrder !== null) {
                        todoList[itemIndex].order = newOrder;

                        /*
                        By changing the order of the item,
                        the list should be sorted again according to the order of the items.
                         */
                        todoList.sort(listSortCompare);
                    }

                    setTodoData(prevState => { // update state
                        const updatedState = {
                            list: todoList,
                            activeItem: {
                                id: id,
                                cursorPointer: cursorPointer
                            }
                        };
                        return {...prevState, ...updatedState};
                    });
                }
            }
        }
    };

    useEffect(() => {
        const init = async () => {
            const db = await openDB(idbConfig);
            setDatabase(db);

            const data = await getAllItems(db, 'todo', 'order');
            setTodoData(prevState => {
                const update = {
                    list: data
                };
                return {...prevState, ...update}
            });
            setDataLoaded(true);

            hideLoadingScreen();
        };

        init();
    }, []);

    return (
        <AppContext.Provider value={provider}>
            {
                dataLoaded && (
                    props.children
                )
            }
        </AppContext.Provider>
    );

};

export default AppContextProvider;