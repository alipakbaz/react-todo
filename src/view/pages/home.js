import React from 'react';

import Header from "../containers/header/header";
import TodoList from "../containers/todo/todo-list";

const Home = () => {

    return (
        <React.Fragment>
            <Header/>
            <TodoList/>
        </React.Fragment>
    );

};

export default Home;