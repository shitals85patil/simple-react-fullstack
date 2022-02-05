import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Company from './component/company';
import './app.scss';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Company} />
        </Router>
      </div>
    );
  }
}
