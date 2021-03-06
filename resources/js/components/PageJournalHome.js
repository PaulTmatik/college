import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import TitleBar from './TitleBar';
import DropDownSelector, { DropDownItemAdapter } from './DropDownSelector';
import Tabs from './Tabs';
import SideTabs from './SideTabs';
import RatingJournal from './RatingJournal';

import { getGroupsByTeacher, setCurrentLesson, setFirstGroup } from '../actions';

import "../../css/journal-home.css";
import EditJournalForm from './EditJournalForm';

class PageJournalHome extends Component {
  constructor(props) {
    super(props);
    const { dispatch, auth, match } = props;
    const { selectedUser } = auth;
    this.state = {
      editJournalGuid: undefined
    };
    dispatch(getGroupsByTeacher(selectedUser.u_guid));
    if (match.params.guid !== undefined) {
      dispatch(setFirstGroup(match.params.guid))
    }
    this.onSelectLesson = this.onSelectLesson.bind(this);
    this.onAddJournalClick = this.onAddJournalClick.bind(this);
    this.onCloseEditJournal = this.onCloseEditJournal.bind(this);
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
        lessons.selectedLesson.l_guid,
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
            items={lessons.selectionLessons.map(lesson =>
              new DropDownItemAdapter(lesson.lp_guid, lesson.title))}
            selected={currentLesson}
            onSelect={this.onSelectLesson}
          />
        </TitleBar>
        <Tabs />
        <div className="subpage">
          <SideTabs onAddEvent={this.onAddJournalClick} />
          {this.switchSubpagesType()}
        </div>
      </div>
    );
  }

  switchSubpagesType() {
    const { editJournalGuid } = this.state;
    if (editJournalGuid === null || editJournalGuid)
      return <EditJournalForm onCloseEvent={this.onCloseEditJournal} />;

    return <RatingJournal />;
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
  onAddJournalClick() {
    this.setState({ editJournalGuid: null });
  }

  onCloseEditJournal() {
    this.setState({ editJournalGuid: undefined });
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  groups: state.groups,
  students: state.students,
  lessons: state.lessons,
});

export default connect(mapStateToProps)(PageJournalHome);