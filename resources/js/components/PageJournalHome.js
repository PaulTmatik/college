import React, { Component } from 'react';
import { connect } from 'react-redux';

import TitleBar from './TitleBar';

class PageJournalHome extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <div className="page journal__home">
        <TitleBar title="Главная журнала" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  students: state.students
});

export default connect(mapStateToProps)(PageJournalHome);