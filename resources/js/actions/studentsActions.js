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