import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';


class Header extends Component {
  render() {
    return (
      <header>
        <Link to="/">
          <div className="logo"><img alt="" className="logoImage" src="http://wolk.lt/wp-content/uploads/2017/05/untitled-7.png"/></div>
        </Link>
        <nav className="navigation">
          <ul>
            <li className="first">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Weather">Weather</Link>
            </li>
            <li>
              <Link to="/Trump">Trump</Link>
            </li>
            <li>
              <Link to="/ApiTest">GifTest</Link>
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

export default Header;
