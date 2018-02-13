import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class Homepage extends Component {
  render() {
    return (
      <div className="container-fluid">

        <div className="jumbotron">
                <div className="container">
                  <h1 className="display-3">Hey stranger</h1>
                  <h3>This page was created for fun, and learning purpose only.</h3>
                  <ul>
                    <li className="homePageList">
                      <p>You can search for gif's by the phrase you entered here:</p>
                      <Link className="homePageButtons" to="/ApiTest">GifTest</Link>
                    </li>
                    <li className="homePageList">
                      <p>Or, you can find interesting Trump phrases here:</p>
                      <Link className="homePageButtons" to="/Trump">Trump</Link>
                    </li>
                  </ul>
                </div>
              </div>


      </div>
    );
  }
}

export default Homepage;
