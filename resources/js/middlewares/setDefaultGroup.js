import { ACTIONS_NAMES, setFirstGroup } from "../actions";

export const setDefaultGroup = store => next => action => {
  let result = next(action);
  const { groups } = store.getState();
  if (action.type === ACTIONS_NAMES.GROUPS_RECIVE_BY_TEACHER) {
    let workGroup = groups.workGroups.slice(0, 1)[0].guid
    if (groups.firstGroupGuid !== undefined) {
      workGroup = groups.firstGroupGuid;
    }
    store.dispatch(setFirstGroup(workGroup));
  }

  return result;
}