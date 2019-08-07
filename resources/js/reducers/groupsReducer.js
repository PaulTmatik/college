import { ACTIONS_NAMES } from '../actions';
import Group from '../structures/Group';

const baseState = {
  selectedLesson: undefined,
  groups: [],
  lessons: []
}

const groupsReducer = (state = baseState, action) => {
  switch (action.type) {
    case ACTIONS_NAMES.GROUPS_RECIVE_BY_TEACHER:
      return {
        ...state,
        groups: action.classes.map(
          cl => new Group(
            cl.guid, 
            cl.class_name, 
            new Date(cl.started_at), 
            new Date(cl.ended_in))
        ),
        lessons: action.lessons,
        selectedLesson: action.lessons.slice(0, 1)[0]
      };
    case ACTIONS_NAMES.GROUPS_SET_LESSON:
      return {
        ...state,
        selectedLesson: action.lesson
      };
    default:
      return state;
  }
}

export default groupsReducer;