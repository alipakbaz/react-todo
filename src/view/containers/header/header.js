import React from 'react';

import './header-style.css';

import Logo from '../../icons/logo.svg';

const Header = () => {

    return (
        <header>
            <div className='container'>
                <nav className='nav flex-row align-items-center'>
                    <div className='logo'>
                        <img src={Logo} alt={'To-Do App'} width={28} height={28} className='fill-primary'/>
                    </div>
                    <h1 className='title'>To-Do</h1>
                </nav>
            </div>
        </header>
    );

};

export default Header;