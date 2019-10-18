import { ACTIONS_NAMES } from '../actions';
import Group from '../structures/Group';

const baseState = {
  selectedGroup: undefined,
  workGroups: [],
  groups: []
}

const groupsReducer = (state = baseState, action) => {
  switch (action.type) {
    case ACTIONS_NAMES.GROUPS_RECIVE_BY_TEACHER:
      const selectedGroups = action.workGroups;  
      return {
        ...state,
        selectedGroup: selectedGroups.slice(0, 1)[0] || undefined,
        workGroups: selectedGroups || []
      };
    default:
      return state;
  }
}

export default groupsReducer;