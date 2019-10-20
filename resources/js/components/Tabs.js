import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, NavLink } from 'react-router-dom';

import '../../css/tabs.css';

class Tabs extends Component {
  
  render() {
    const { groups } = this.props;
    return (
      <div className="tabs">
        <ul className="tabs__list">
          {groups.workGroups.map(group =>
            <li
              className="tabs__list_item"
              key={group.guid}
            >
              <NavLink
                activeClassName="list_item--active"
                to={`/journal/group/${group.guid}`}
              >{
                group.getNameFromDate(new Date())}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groups
});

export default connect(mapStateToProps)(Tabs);