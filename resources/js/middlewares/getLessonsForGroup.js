import { ACTIONS_NAMES, getLessonsByGroupForTeacher } from "../actions";

export const getLessonsForGroup = store => next => action => {
  let result = next(action);
  const { groups, auth } = store.getState();
  if (action.type === ACTIONS_NAMES.GROUPS_SET_CURRENT) {
    store.dispatch(getLessonsByGroupForTeacher(groups.firstGroup.guid, auth.selectedUser.u_guid));
  }

  return result;
}