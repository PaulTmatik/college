import React, { Component } from 'react';
import { connect } from 'react-redux';

import StudentsJournal from './StudentsJournal';

class PageJournalGroupDetail extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="page journal__group_detail">
        <StudentsJournal groupGuid={match.params.guid} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  students: state.students
});

export default connect(mapStateToProps)(PageJournalGroupDetail);