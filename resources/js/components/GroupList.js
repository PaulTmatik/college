import React, { Component } from 'react';
import { connect } from 'react-redux';

import GroupListItem from './GroupListItem';

class GroupList extends Component {
  render() {
    const { groups } = this.props;
    return (
      <nav className="group_list__nav">
        <ul className="group_list">
          {groups.all.map(group => (
            <GroupListItem 
              key={group.guid}
              name={group.getNameFromDate(new Date())}
              guid={group.guid}/>
          ))}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groups
})

export default connect(mapStateToProps)(GroupList);