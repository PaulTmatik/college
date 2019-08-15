import React, { Component } from 'react';
import { connect } from 'react-redux';

class PageJournalHome extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <div className="page journal__home">
        <h1>Главная журнала</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  students: state.students
});

export default connect(mapStateToProps)(PageJournalHome);