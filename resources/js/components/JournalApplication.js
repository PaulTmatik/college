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
      <Router>
        <div className="journal_application">
          <GroupList />
          <LessonsList />
          <Route exact path="/" component={PageJournalHome} />
          <Route path="/journal/group/:guid" component={PageJournalGroupDetail} />
        </div>
      </Router>
    );
  }
}

if (document.getElementById('application')) {
  ReactDOM.render(<Provider store={store}><JournalApplication /></Provider>, document.getElementById('application'));
}