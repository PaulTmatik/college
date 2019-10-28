import { ACTIONS_NAMES, getJournalsByLesson, setCurrentJournal } from "../actions";

export const getJournalsByLessons = store => next => action => {
  let result = next(action);
  const { lessons, groups } = store.getState();
  if (action.type === ACTIONS_NAMES.LESSON_GET_BY_GROUPS_FOR_TEACHER ||
      action.type === ACTIONS_NAMES.LESSON_SET_CURRENT) {
    store.dispatch(getJournalsByLesson(lessons.selectedLesson.l_guid, groups.firstGroupGuid));
  }

  return result;
}