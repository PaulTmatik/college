import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';

import GroupList from './GroupList';
import LessonsList from './LessonsList';
import PageJournalHome from './PageJournalHome';
import PageJournalGroupDetail from './PageJournalGroupDetail';

class JournalApplication extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="journal_application">
          <GroupList />
          <LessonsList />
          <Route exact path="/" component={PageJournalHome} />
          <Route path="/group/:guid" component={PageJournalGroupDetail} />
        </div>
      </Provider>
    );
  }
}

if (document.getElementById('application')) {
  ReactDOM.render(<Router><JournalApplication /></Router>, document.getElementById('application'));
}