import React, { Component } from 'react';
import { connect } from 'react-redux';

import GroupListItem from './GroupListItem';
import {getGroupsByTeacher} from '../actions';

class GroupList extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getGroupsByTeacher('30b8b233-3174-49a1-bc8f-b6ed34470d6b'));
  }
  render() {
    const { groups } = this.props;
    const allGroups = groups.all ? groups.all.map(group => (
      <GroupListItem 
        key={group.guid}
        name={group.getNameFromDate(new Date())}
        guid={group.guid}/>
    )) : null;
    return (
      <nav className="group_list__nav">
        <ul className="group_list">
          {allGroups}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groups
})

export default connect(mapStateToProps)(GroupList);