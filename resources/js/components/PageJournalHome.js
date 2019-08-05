import React, { Component } from 'react';
import { connect } from 'react-redux';

class PageJournalHome extends Component {
  componentWillMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div className="page journal_home">
        <h1>Главная журнала</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  students: state.students
});

export default connect(mapStateToProps)(PageJournalHome);