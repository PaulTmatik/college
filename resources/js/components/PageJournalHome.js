import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import TitleBar from './TitleBar';
import DropDownSelector, { DropDownItemAdapter } from './DropDownSelector';
import Tabs from './Tabs';

import { setFirstGroup } from '../actions';

import { getGroupsByTeacher, setCurrentLesson } from '../actions';

class PageJournalHome extends Component {
  constructor(props) {
    super(props);
    const { dispatch, auth } = props;
    const { selectedUser } = auth;
    dispatch(getGroupsByTeacher(selectedUser.u_guid));
    this.onSelectLesson = this.onSelectLesson.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.onRouteChange();
    }
  }

  render() {
    const { groups, match, lessons } = this.props;

    let currentLesson = new DropDownItemAdapter(1, "Не назначены предметы");
    if (lessons.selectedLesson !== undefined)
      currentLesson = new DropDownItemAdapter(
        lessons.selectedLesson.lp_guid,
        lessons.selectedLesson.title);

    const title = groups.firstGroup
      ? `Группа ${groups.firstGroup.getNameFromDate(new Date())}`
      : "Главная журнала";
    if (groups.firstGroup !== undefined && match.path == '/')
      return <Redirect from='/' to={`/journal/group/${groups.firstGroup.guid}`} />
    return (
      <div className="page journal__home">
        <TitleBar title={title}>
          <DropDownSelector
            items={lessons.lessonsByGroup.map(lesson =>
              new DropDownItemAdapter(lesson.lp_guid, lesson.title))}
            selected={currentLesson}
            onSelect={this.onSelectLesson}
          />
          <button className="button button--borderless">
            <svg
              className="svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 8V7H9V1H8v6H2v1h6v6h1V8h6z"
                fillRule="nonzero"
                fillOpacity="1"
                fill="#000"
                stroke="none"
              ></path>
            </svg>
          </button>
        </TitleBar>
        <Tabs />
        <div className="subpage">

        </div>
      </div>
    );
  }

  onSelectLesson(lessonGuid) {
    const { dispatch } = this.props;
    dispatch(setCurrentLesson(lessonGuid));
  }

  onRouteChange() {
    const { dispatch, match } = this.props;
    if (match.params.guid && match.params.guid.length > 35)
      dispatch(setFirstGroup(match.params.guid));
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  groups: state.groups,
  students: state.students,
  lessons: state.lessons,
});

export default connect(mapStateToProps)(PageJournalHome);