import React, { Component } from 'react';
import { monthShortNames } from '../helpers';

import "../../css/date-pane.css";

class DatePane extends Component {
  render() {
    const { forDate, hours } = this.props;
    const workDate = new Date(forDate);
    return (
      <div className="date-pane">
        <time dateTime={workDate}>
          <span className="date-pane__day">
            {workDate.getDate()}
          </span>
          <span className="date-pane__month">
            {monthShortNames[workDate.getMonth()]}
          </span>
          <span className="date-pane__year">
            {workDate.getFullYear()}
          </span>
        </time>
        <div className="date-pane__work-hours">
          <span className="date-pane__hours">
            {hours}
          </span>
          <span>часов</span>
        </div>
      </div>
    );
  }
}

export default DatePane;