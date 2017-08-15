import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import BookShelf from './BookShelf';
import Search from './Search';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={BookShelf} />
          <Route path="/search" component={Search} />
        </div>
      </Router>
    );
  }
}

export default App;
