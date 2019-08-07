import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setGroupLesson } from '../actions';

class LessonsList extends Component {
  render() {
    const { groups } = this.props;
    const selectedLesson = groups.selectedLesson
      ? <li>{groups.selectedLesson.lesson_name}</li>
      : null;
    return (
      <ul>
        {selectedLesson}
        {groups.lessons.map(
          lesson => (
            <li key={lesson.guid}>
              <button
                onClick={() => this.onSetLesson(lesson)}
              >
                {lesson.lesson_name}
              </button>
            </li>
          )
        )}
      </ul>
    );
  }

  onSetLesson(lessonGuid) {
    const { dispatch } = this.props;
    dispatch(setGroupLesson(lessonGuid));
  }
}

const mapStateToProps = state => ({
  groups: state.groups
})

export default connect(mapStateToProps)(LessonsList);