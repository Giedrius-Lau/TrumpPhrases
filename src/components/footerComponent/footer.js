import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <header>
        <Link to="/">
          <div className="logo">LOGO</div>
        </Link>
        <nav>
          <ul>
            <li className="first">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Productpage">Products</Link>
            </li>
            <li className="last">
              <Link to="/Contactpage">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Footer;
