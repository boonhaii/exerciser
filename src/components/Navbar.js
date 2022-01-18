import React from 'react';
import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand col-md-2 text-uppercase font-weight-bold text-center">Exerciser</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Exercises</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create Exercise Log</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/login" className="nav-link">Log In/Sign Up</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;