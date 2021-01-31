import React, {useRef, useEffect, useContext, useState} from 'react';
import {AppContext} from "../../../context/app-context";
import {
    setElementCursorPointer,
    getElementCursorPointerPosition,
    setElementCursorPointerToEnd
} from "../../../func/func";

import './todo-item-style.css';

const TodoItem = props => {
    const {data} = props;
    const {
        activeItem,
        addTodoItemByEnter,
        updateTodoTitle,
        deleteTodo,
        newItemId,
        forwardIndentation,
        backIndentation
    } = useContext(AppContext);
    const contentRef = useRef();
    const [initialized, setInitialized] = useState(false);

    const init = () => {
        let interval = null; // To save text after typing with a short pause.
        let newTitle = data.title;
        let lastTitleTextChangeTime = 0;
        let lastUpdatedTitleText = data.title;

        const updateTitle = () => {
            lastTitleTextChangeTime = 0;

            if (newTitle !== lastUpdatedTitleText) {
                updateTodoTitle(data.id, newTitle, getElementCursorPointerPosition(contentRef.current));

                lastUpdatedTitleText = newTitle;
            }
        };

        contentRef.current.addEventListener('focus', () => {
            interval = setInterval(() => {
                let nowTime = new Date().getTime();
                if (lastTitleTextChangeTime > 0 && (nowTime - lastTitleTextChangeTime > 400)) {
                    updateTitle();
                }
            }, 100);
        });

        contentRef.current.addEventListener('blur', e => {
            clearInterval(interval);
            updateTitle();
        });

        contentRef.current.addEventListener('keydown', e => {
            if (e.ctrlKey && e.shiftKey && e.code === 'Delete') { // Ctrl + Shift + Delete
                e.preventDefault();
                deleteTodo(data.id);
            } else if (e.code === 'Tab') {
                e.preventDefault();
                if (e.shiftKey) { // Shift + Tab
                    backIndentation({
                        id: data.id,
                        parentId: data.parentId,
                        cursorPointer: getElementCursorPointerPosition(contentRef.current),
                    });
                } else {  // Tab
                    forwardIndentation({
                        id: data.id,
                        parentId: data.parentId,
                        cursorPointer: getElementCursorPointerPosition(contentRef.current),
                    });
                }
            } else if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                e.preventDefault();
                contentRef.current.blur();

                /*
                If the item has a child, a new item will be added as a child.
                Otherwise the new item will be added to the current item level
                 */
                if (typeof data.ch === 'object' && data.ch !== null) {
                    addTodoItemByEnter(data.id, data.id, data.order);
                } else {
                    addTodoItemByEnter(data.parentId, data.id, data.order);
                }
            } else {
                setTimeout(() => {
                    lastTitleTextChangeTime = new Date().getTime();
                    newTitle = e.target.innerText;
                }, 0);
            }
        });
    };

    useEffect(() => {
        if (!initialized) {
            init();
            setInitialized(true);
        }

        if (parseInt(data.id) === activeItem.id) {
            // If this item is set to active, focus on it and adjust the position of the cursor.
            contentRef.current.focus();

            if (activeItem.cursorPointer >= 0)
                setElementCursorPointer(contentRef.current, activeItem.cursorPointer);
            else
                setElementCursorPointerToEnd(contentRef.current);
        } else if (activeItem.id === 0 && parseInt(data.id) === newItemId) {
            // If a new item is added and this new todo item is the same as the added item, focus on it.
            contentRef.current.focus();
        }
    }, [activeItem.id, data.title]);

    return (
        <div className='todo-item'>
            <div className='title flex-row'>
                <div className="bullet">
                    <svg viewBox="0 0 18 18" fill="currentColor">
                        <circle cx="9" cy="9" r="3.5"/>
                    </svg>
                </div>
                <div className='content' ref={contentRef} contentEditable={true} suppressContentEditableWarning={true} tabIndex={-1}>{data.title}</div>
            </div>

            {
                typeof data.ch === 'object' && data.ch !== null &&
                <div className='children'>
                    {
                        Object.keys(data.ch).map(id => {
                            return (
                                <TodoItem data={data.ch[id]} key={'tdi-ch' + id}/>
                            )
                        })
                    }
                </div>
            }
        </div>
    );

};

export default TodoItem;