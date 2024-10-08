import React, { useState } from 'react';
import '../Navbar.css';
import { Link, Outlet } from 'react-router-dom';

const NavMenu = () => {
    const [active, setActive] = useState('pizzaApp');

    const handleClick = (menuItem) => {
        setActive(menuItem);
    };

    return (
        <>
            <nav className="navbar">
                <ul className="nav-list">
                    <Link to='/'
                        className={`nav-item ${active === 'pizzaApp' ? 'active' : ''}`}
                        onClick={() => handleClick('pizzaApp')}
                    >
                        Pizza App
                    </Link>
                    <Link to="/steps-app"
                        className={`nav-item ${active === 'about' ? 'active' : ''}`}
                        onClick={() => handleClick('steps')}
                    >
                       Steps
                    </Link>
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
