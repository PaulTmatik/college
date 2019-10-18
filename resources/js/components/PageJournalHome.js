import React, { Component } from 'react';
import { connect } from 'react-redux';

import TitleBar from './TitleBar';
import DropDownSelector, { DropDownItemAdapter } from './DropDownSelector';

import { getGroupsByTeacher } from '../actions';

class PageJournalHome extends Component {
  constructor(props) {
    super(props);
    const { dispatch, auth } = props;
    const { selectedUser } = auth;
    dispatch(getGroupsByTeacher(selectedUser.u_guid));
  }
  
  render() {
    const closest = new DropDownItemAdapter(1, "Fake lesson");
    const { groups } = this.props;
    console.log(groups);
    return (
      <div className="page journal__home">
        <TitleBar title="Главная журнала">
          <DropDownSelector
            items={[]}
            selected={closest}
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
      </div>
    );
  }

  onSelectLesson(lessonGuid) {
    console.log(lessonGuid);
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  groups: state.groups,
  students: state.students,
});

export default connect(mapStateToProps)(PageJournalHome);