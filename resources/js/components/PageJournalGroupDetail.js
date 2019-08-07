import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudentsInGroup } from '../actions';

class PageJournalGroupDetail extends Component {
  constructor() {
    super();
    this.state = {
      students: []
    }
  }
  componentWillMount() {
    const { dispatch, match } = this.props;
    if (match.params.guid)
      dispatch(getStudentsInGroup(match.params.guid));
  }
  render() {
    const { students } = this.props;
    console.log(students);
    const studentsList = students.all.map(student => 
      <li key={student.guid}>{student.fullName}</li>
    );
    return (
      <div className="page journal__group_detail">
        <ol>
          {studentsList}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  students: state.students
});

export default connect(mapStateToProps)(PageJournalGroupDetail);