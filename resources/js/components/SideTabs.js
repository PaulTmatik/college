import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePane from './DatePane';

import "../../css/side-tabs.css";

class SideTabs extends Component {
  render() {
    const { lessons } = this.props;
    const forCurrentLessons = lessons.lessonsByGroup
      .filter(lesson =>
        lesson.l_guid === lessons.selectedLesson.l_guid)
      .sort((a, b) => {
        if (new Date(a.lp_started_at) > new Date(b.lp_started_at))
          return 1;
        if (new Date(a.lp_started_at) < new Date(b.lp_started_at))
          return -1;
        return 0;
      });
    
    return (
      <div className="side-tabs">
        <button className="tabs-item__button">
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
        <ul className="side-tabs__tabs-items">
          {forCurrentLessons.map(item => (
            <li key={item.lp_guid} className="side-tabs__tabs-item">
              <button className="tabs-item__button">
                <DatePane
                  start_date={item.lp_started_at}
                  end_date={item.lp_ended_at}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lessons: state.lessons
});

export default connect(mapStateToProps)(SideTabs);