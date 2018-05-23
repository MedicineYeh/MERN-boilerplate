import React from 'react';

import {Link} from 'react-router-dom';

const Header = () => (
    <header>
        <Link to="/">Home</Link>
        <br/>
        <Link to="/basic-permission">Basic Permission Test</Link>
        <br/>
        <Link to="/advanced-permission">Advanced Permission Test</Link>
        <br/>
        <Link to="/login">Login</Link>
        <br/>
        <Link to="/signup">Signup</Link>
        <br/>
        <Link to="/logout">Logout</Link>
        <br/>

        <hr />
    </header>
);

export default Header;
