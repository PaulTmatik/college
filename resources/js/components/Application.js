import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';

import Pages from './Pages';

class Application extends Component {
  render() {
    return (
      <Router>
        <>
          <Pages />
        </>
      </Router>
    );
  }
}

if (document.getElementById('application')) {
  ReactDOM.render(<Provider store={store}><Application/></Provider>, document.getElementById('application'));
}