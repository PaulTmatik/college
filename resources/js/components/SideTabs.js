import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePane from './DatePane';
import { setCurrentJournal } from '../actions';

import "../../css/side-tabs.css";

class SideTabs extends Component {
  render() {
    const { lessons, onAddEvent } = this.props;
    const journals = lessons.journals;
    let currentGuid = '';
    if (lessons.selectedJournal)
      currentGuid = lessons.selectedJournal.lh_guid;

    return (
      <div className="side-tabs">
        <button
          className="tabs-item__button"
          onClick={onAddEvent}
        >
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
          {journals.map(item => (
            <li key={item.lh_guid} className={`side-tabs__tabs-item ${(currentGuid == item.lh_guid ? 'side-tabs--active' : '')}`}>
              <button
                className="tabs-item__button"
                onClick={() => this.onSelectJournal(item)}
              >
                <DatePane
                  forDate={item.for_date}
                  hours={item.work_hours}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  onSelectJournal(journal) {
    const { dispatch } = this.props;
    dispatch(setCurrentJournal(journal));
  }
}

const mapStateToProps = state => ({
  lessons: state.lessons
});

export default connect(mapStateToProps)(SideTabs);