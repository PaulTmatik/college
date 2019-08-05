import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class GroupListItem extends Component {
  render() {
    const { name, guid } = this.props;
    return (
      <li className="group_list__item">
        <Link to={`/group/${guid}`}>{`${name} группа`}</Link>
      </li>
    );
  }
}

export default GroupListItem;