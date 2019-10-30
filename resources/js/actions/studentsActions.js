import { ACTIONS_NAMES } from '.';

export const getStudentsInGroup = groupGuid => {
  return dispatch => {
    return window.axios.get(`/api/journal/students/${groupGuid}/date/2019-09-01`)
      .then(response => response.data, error => console.error('Error', error))
      .then(data => dispatch(reciveStudentsInGroup(groupGuid, data)));
  }
};

export const reciveStudentsInGroup = (groupGuid, data) => ({
  type: ACTIONS_NAMES.STUDENTS_GET_IN_GROUP,
  groupGuid,
  students: data.students || [],
  recivedAt: Date.now()
});

export const getStudnetsInJournalByGroup = (lhGuid, gGuid) => {
  return dispatch => {
    return window.axios.get(`/api/journal/lh/${lhGuid}/group/${gGuid}`)
      .then(response => response.data)
      .then(data => dispatch(reciveStudnetsInJournalByGroup(data)))
      .catch(error => console.error('Get Students In Journal By Group', error));
  }
}

export const reciveStudnetsInJournalByGroup = data => ({
  type: ACTIONS_NAMES.STUDENTS_IN_JOURNAL_BY_GROUP,
  students: data.students || [],
  recivedAt: Date.now()
});