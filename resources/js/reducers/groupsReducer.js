import { ACTIONS_NAMES } from '../actions';
import Group from '../structures/Group';

const baseState = {
  firstGroup: undefined,
  workGroups: [],
  groups: []
}

const groupsReducer = (state = baseState, action) => {
  switch (action.type) {
    case ACTIONS_NAMES.GROUPS_RECIVE_BY_TEACHER:
      const selectedGroups = action.workGroups.map(group => 
        new Group(
          group.g_guid,
          group.formated_name,
          group.priority,
          group.s_count,
          new Date(group.started_at),
          new Date(group.ended_at))
        );  
      return {
        ...state,
        //firstGroup: selectedGroups.slice(0, 1)[0] || undefined,
        workGroups: selectedGroups || []
      };
    case ACTIONS_NAMES.GROUPS_SET_CURRENT:
      console.log(action.groupGuid)
      return {
        ...state,
        firstGroup: state.workGroups.find(group => group.guid === action.groupGuid)
      }
    default:
      return state;
  }
}

export default groupsReducer;