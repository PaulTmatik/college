import {ACTIONS_NAMES} from '.';

export const GetGroupsOnPeriod = period => {
  return {
    type: ACTIONS_NAMES.GROUPS_GET_ON_PERIOD,
    period
  }
}

export const getGroupsByTeacher = tGuid => {
  return {
    type: ACTIONS_NAMES.GROUPS_GET_BY_TEACHER,
    tGuid
  }
}

export const reciveClassesByTeacher = (tGuid, json) => {
  return {
    type: ACTIONS_NAMES.GROUPS_RECIVE_BY_TEACHER,
    tGuid,
    classes: json.data.children.map(child => child.data),
    recivedAt: Date.now()
  }
}