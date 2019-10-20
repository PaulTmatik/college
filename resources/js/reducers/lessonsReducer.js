import { ACTIONS_NAMES } from '../actions';

const baseState = {
  lessonsByGroup: [],
  selectedLesson: undefined,
}

const lessonsReducer = (state = baseState, action) => {
  switch (action.type) {
    case ACTIONS_NAMES.LESSON_GET_BY_GROUPS_FOR_TEACHER:
      const currentLesson = action.lessons.length > 0 
        ? action.lessons.slice(0,1)[0] 
        : undefined;
      return {
        ...state,
        lessonsByGroup: action.lessons,
        selectedLesson: currentLesson
      }
    case ACTIONS_NAMES.LESSON_SET_CURRENT:
      return {
        ...state,
        selectedLesson: state.lessonsByGroup.find(lesson => lesson.lp_guid === action.currentLessonGuid),
      }
    default:
      return state;
  }
}

export default lessonsReducer;