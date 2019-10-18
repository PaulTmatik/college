import { ACTIONS_NAMES } from '.';

export const GetGroupsOnPeriod = period => {
  return {
    type: ACTIONS_NAMES.GROUPS_GET_ON_PERIOD,
    period
  }
}

export const getGroupsByTeacher = tGuid => {
  return dispatch => {
    return window.axios.get(`/api/teacher/${tGuid}/groups/todate/2019-10-19`) //30b8b233-3174-49a1-bc8f-b6ed34470d6b
      .then(response => response.data)
      .then(data => dispatch(reciveGroupsByTeacher(tGuid, data)))
      .catch(error => console.error(error));
  }
}

export const setGroupLesson = lesson => {
  return {
    type: ACTIONS_NAMES.GROUPS_SET_LESSON,
    lesson
  }
}

export const reciveGroupsByTeacher = (tGuid, data) => {
  return {
    type: ACTIONS_NAMES.GROUPS_RECIVE_BY_TEACHER,
    tGuid,
    workGroups: data.groups || [],
    recivedAt: Date.now()
  }
}