import React from 'react';
import {indexedDBSupported} from "../indexedDB/idb";
import {hideLoadingScreen} from "../func/func";

import './app-style.css';

import AppContextProvider from "../context/app-context";
import Home from "../view/pages/home";

const App = () => {

    if (indexedDBSupported()) {
        return (
            <AppContextProvider>
                <Home/>
            </AppContextProvider>
        );
    } else {
        hideLoadingScreen();
        return <h1 className='fatal-error'>Your browser doesn't support a stable version of IndexedDB!</h1>
    }

};

export default App;