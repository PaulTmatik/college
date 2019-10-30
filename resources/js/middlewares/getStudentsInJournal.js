import { ACTIONS_NAMES, getStudnetsInJournalByGroup } from "../actions";

export const getStudentsInJournal = store => next => action => {
  let result = next(action);
  const { groups, lessons } = store.getState();
  if (action.type === ACTIONS_NAMES.LESSON_SET_CURRENT_JOURNAL ||
      action.type === ACTIONS_NAMES.LESSON_GET_JOURNAL_BY_LESSON) {
    if (lessons.selectedJournal !== undefined)
      store.dispatch(getStudnetsInJournalByGroup(lessons.selectedJournal.lh_guid, groups.firstGroupGuid));
  }

  return result;
}