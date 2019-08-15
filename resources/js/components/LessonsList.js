import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setGroupLesson } from '../actions';

import DropDownSelector, { DropDownItemAdapter } from './DropDownSelector';

class LessonsList extends Component {
  constructor(props) {
    super(props);

    this.onSetLesson = this.onSetLesson.bind(this);
  }
  render() {
    const { groups } = this.props;
    const selectedLesson = groups.selectedLesson
      ? new DropDownItemAdapter(groups.selectedLesson.guid, groups.selectedLesson.lesson_name, null)
      : null;
    return (
      <div className="lessons_list">
        <DropDownSelector 
          items={groups.lessons.map(lesson => new DropDownItemAdapter(lesson.guid, lesson.lesson_name, null))}
          selected={selectedLesson}
          onSelect={this.onSetLesson}
        />
      </div>
    );
  }

  onSetLesson(lessonGuid) {
    const { dispatch, groups } = this.props;
    let lesson = groups.lessons.find(lesson => lesson.guid === lessonGuid);
    dispatch(setGroupLesson(lesson));
  }
}

const mapStateToProps = state => ({
  groups: state.groups
})

export default connect(mapStateToProps)(LessonsList);