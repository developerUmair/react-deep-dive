import React, { useState } from 'react';
import '../Navbar.css';
import { Outlet } from 'react-router-dom';

const NavMenu = () => {
    const [active, setActive] = useState('pizzaApp');

    const handleClick = (menuItem) => {
        setActive(menuItem);
    };

    return (
        <>
            <nav className="navbar">
                <ul className="nav-list">
                    <li
                        className={`nav-item ${active === 'pizzaApp' ? 'active' : ''}`}
                        onClick={() => handleClick('pizzaApp')}
                    >
                        Pizza App
                    </li>
                    <li
                        className={`nav-item ${active === 'about' ? 'active' : ''}`}
                        onClick={() => handleClick('about')}
                    >
                        About
                    </li>
                    <li
                        className={`nav-item ${active === 'services' ? 'active' : ''}`}
                        onClick={() => handleClick('services')}
                    >
                        Services
                    </li>
                    <li
                        className={`nav-item ${active === 'portfolio' ? 'active' : ''}`}
                        onClick={() => handleClick('portfolio')}
                    >
                        Portfolio
                    </li>
                    <li
                        className={`nav-item ${active === 'contact' ? 'active' : ''}`}
                        onClick={() => handleClick('contact')}
                    >
                        Contact
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
};

export default NavMenu;
