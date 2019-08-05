import { ACTIONS_NAMES } from '.';

export const getStudentsInGroup = groupGuid => ({
  type: ACTIONS_NAMES.STUDENTS_GET_IN_GROUP,
  groupGuid
});