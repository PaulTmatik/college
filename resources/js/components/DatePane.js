import React, { Component } from 'react';
import { monthShortNames } from '../helpers';

import "../../css/date-pane.css";

class DatePane extends Component {
  render() {
    const { start_date, end_date } = this.props;
    
    return (
      <div className="date-pane">
        <time dateTime={new Date(start_date)}>
          <span className="date-pane__day">
            {(new Date(start_date)).getDate()}
          </span>
          <span className="date-pane__month">
            {monthShortNames[(new Date(start_date)).getMonth()]}
          </span>
          <span className="date-pane__year">
            {(new Date(start_date)).getFullYear()}
          </span>
        </time>
        <time dateTime={new Date(end_date)}>
          <span className="date-pane__day">
            {(new Date(end_date)).getDate()}
          </span>
          <span className="date-pane__month">
            {monthShortNames[(new Date(end_date)).getMonth()]}
          </span>
          <span className="date-pane__year">
            {(new Date(end_date)).getFullYear()}
          </span>
        </time>
      </div>
    );
  }
}

export default DatePane;