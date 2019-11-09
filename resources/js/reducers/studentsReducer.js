import { ACTIONS_NAMES } from '../actions';
import Student from '../structures/Student';
import Rating from '../structures/Rating';
import hash from 'object-hash';

const baseState = {
  selected: undefined,
  inSelectedGroup: []
}

const studentsReducer = (state = baseState, action) => {
  switch(action.type) {
    case ACTIONS_NAMES.STUDENTS_IN_JOURNAL_BY_GROUP:
      return {
        ...state,
        inSelectedGroup: action.students.map(st => ({
          student: new Student(
            st.s_guid, 
            st.name_last, 
            st.name_first, 
            st.name_second, 
            st.gender, 
            new Date(st.birth_at)
          ),
          rating: new Rating(
            st.avg_evaluation,
            st.abg_test_evaluation,
            st.visit_count,
            st.without_delay_count,
            st.evaluation_count,
            st.outclass_work_count,
            st.lost_hours),
          hash: hash(st)
          }),
        )
      };
    default:
      return state;
  }
}

export default studentsReducer;