import React, {useContext} from 'react';
import {AppContext} from "../../../context/app-context";

import './todo-list-style.css';

import TodoItem from "../../component/todo-item/todo-item";
import BtnAddTodo from "../../component/btn-add-todo/btn-add-todo";

const TodoList = () => {
    const {todoList} = useContext(AppContext);

    return (
        <div className='container'>
            <div className='todo-list'>
                {
                    Object.keys(todoList).map(id => {
                        return (
                            <TodoItem data={todoList[id]} key={'tdi' + id}/>
                        )
                    })
                }
                <BtnAddTodo/>
            </div>
        </div>
    );

};

export default TodoList;