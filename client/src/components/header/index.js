import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';

const Header = () => (
    <header className="header header__container">
        <div className="header__wrap content-wrap">
            <nav className="header__navigation-container">
                <ul className="header__navigation">
                    <li className="header__navigation-item">
                        <NavLink to="/">All Recipes</NavLink>
                    </li>
                    <li className="header__navigation-item">
                        <NavLink to="/add-recipe">Add New Recipe</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
);

export default Header;