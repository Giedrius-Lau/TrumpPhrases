import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//Components
import Header from './components/headerComponent/header';
import Homepage from './components/pages/homePage';
import Contactpage from './components/pages/contactPage';
import ApiTest from './components/pages/apiTest';
import Trump from './components/pages/Trump';

//css
import './Assets/css/default.min.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">

          <Header />

          <Route exact path='/' component={Homepage} />
          <Route exact path='/Contactpage' component={Contactpage} />
          <Route exact path='/ApiTest' component={ApiTest} />
          <Route exact path='/Trump' component={Trump} />

        </div>
      </Router>
    );
  }
}

export default App;
