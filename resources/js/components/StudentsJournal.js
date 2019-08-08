import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getStudentsInGroup } from '../actions';

class StudentsJournal extends Component {
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.groupGuid !== prevProps.groupGuid) {
      this.loadData();
    }
  }

  render() {
    const { students } = this.props;
    return (
      <div className="students-journal">
        {this.studentsList(students.all)}
      </div>
    );
  }

  loadData() {
    const { dispatch, groupGuid } = this.props;
    dispatch(getStudentsInGroup(groupGuid));
  }

  studentsList(students) {
    return (
      <ol className="students-journal__list">
        {students.map(item => (
          <li key={item.guid}>{item.fullName}</li>
        ))}
      </ol>
    )
  }
}

const mapStateToProp = state => ({
  students: state.students
});

export default connect(mapStateToProp)(StudentsJournal);