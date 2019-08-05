import {ACTIONS_NAMES} from '../actions';
import Group from '../structures/Group';

const defautGroupsStore = [
  new Group(
    "57f4b9fd-6222-4b2d-8328-2917681f608d",
    "%№+1%01", new Date(2016, 8, 1), new Date(2019, 6, 1)),
  new Group(
    "02b864fb-d116-4952-b74b-6852ee37d117",
    "%№%02", new Date(2015, 8, 1), new Date(2019, 6, 1)),
  new Group(
    "e5f7a7ee-7527-4393-93e6-5b2d36615052",
    "%№%01", new Date(2018, 8, 1), new Date(2022, 6, 1)),
  new Group(
    "b33f9dd9-a186-469f-96f9-93acca9d9f7c",
    "%№%11", new Date(2018, 8, 1), new Date(2022, 6, 1))
];

const baseState = {
  selected: undefined,
  all: defautGroupsStore
}

const groupsReducer = (state = baseState, action) => {
  switch(action.type) {
    case ACTIONS_NAMES.GROUPS_GET_ON_PERIOD:
      const newState = state.all = defautGroupsStore.filter(group => {
        return getActualOnly(group, action.period);
      });
      return newState;
    default:
      return state;
  }
}

function getActualOnly(group, period) {
  return group.endedIn.getTime() > period.end.getTime() 
    && period.end.getTime() >= group.startedAt.getTime();
}

export default groupsReducer;