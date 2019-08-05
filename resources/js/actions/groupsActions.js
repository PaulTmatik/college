import {ACTIONS_NAMES} from '.';

export const GetGroupsOnPeriod = period => {
  return {
    type: ACTIONS_NAMES.GROUPS_GET_ON_PERIOD,
    period
  }
}