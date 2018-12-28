import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div id="navigation">
            <Link to="/">Stock performance</Link>
            <Link to="/select">Stock selection</Link>
        </div>
    );
}

export default Navigation;
