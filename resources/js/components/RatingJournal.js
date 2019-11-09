import React, { Component } from 'react';
import { connect } from 'react-redux';

import "../../css/rating-journal.css";

import RatingJournalItem from './RatingJournalItem';

class RatingJournal extends Component {
  render() {
    const { students } = this.props;
    return (
      <div className="rating-journal">
        <ol className="rating-journal__class-list">
          {students.inSelectedGroup.map(student => (
            <RatingJournalItem
              key={student.hash}
              student={student.student}
              rating={student.rating}
            />
          ))}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  students: state.students
});

export default connect(mapStateToProps)(RatingJournal);