import React, {useEffect, useContext, useRef} from 'react';

import './btn-add-todo-style.css';

import {AppContext} from "../../../context/app-context";

const BtnAddTodo = () => {
    const addRef = useRef();
    const {addTodoItemByAddBtn} = useContext(AppContext);

    useEffect(() => {
        addRef.current.addEventListener('click', () => {
            addTodoItemByAddBtn();
        });
    }, []);

    return (
        <div className='btn-add-todo'>
            <svg className="icon-plus" viewBox="0 0 20 20" ref={addRef}>
                <circle cx="10.5" cy="10.5" r="9" fill="#dce0e2" className="circle"/>
                <line x1="6" y1="10.5" x2="15" y2="10.5" stroke="#868c90" strokeWidth="1"/>
                <line x1="10.5" y1="6" x2="10.5" y2="15" stroke="#868c90" strokeWidth="1"/>
            </svg>
        </div>
    );

};

export default BtnAddTodo;