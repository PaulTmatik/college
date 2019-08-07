import { ACTIONS_NAMES } from '../actions';
import Student from '../structures/Student';

const baseState = {
  selected: undefined,
  all: []
}

const studentsReducer = (state = baseState, action) => {
  switch(action.type) {
    case ACTIONS_NAMES.STUDENTS_GET_IN_GROUP:
      return {
        ...state,
        all: action.students.map(st => new Student(
          st.guid, 
          st.full_name[0], 
          st.full_name[1], 
          st.full_name[2], 
          st.gender, 
          new Date(st.birth_at),
          new Date(st.entred_at),
          st.ended_in === null ? null : new Date(st.ended_in)
        ))
      };
    default:
      return state;
  }
}

export default studentsReducer;