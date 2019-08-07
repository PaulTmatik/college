import {ACTIONS_NAMES} from '.';

export const GetGroupsOnPeriod = period => {
  return {
    type: ACTIONS_NAMES.GROUPS_GET_ON_PERIOD,
    period
  }
}

export const getGroupsByTeacher = tGuid => {
  return dispatch => {
    return window.axios.get(`/api/journal/teacher/${tGuid}/date/2019-09-01`) //30b8b233-3174-49a1-bc8f-b6ed34470d6b
      .then(response => response.data, error => console.error('Error', error))
      .then(data => dispatch(reciveClassesByTeacher(tGuid, data)));
  }
}

export const reciveClassesByTeacher = (tGuid, data) => {
  return {
    type: ACTIONS_NAMES.GROUPS_RECIVE_BY_TEACHER,
    tGuid,
    classes: data,
    recivedAt: Date.now()
  }
}