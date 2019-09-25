import { ACTIONS_NAMES } from '../actions';

const authState = {
  employees: [],
  selectedEmployeeGuid: undefined,
  selectedStudentGuid: undefined,
  selectedUser: {}
};

const authReducer = (state = authState, action) => {
  switch(action.type) {
    case ACTIONS_NAMES.AUTH_GET_EMPLOYEES: 
      return {
        ...state,
        employees: action.employees.map(item => ({
          empl_id: item.u_guid,
          full_name: `${item.name_last} ${item.name_first} ${item.name_second}`,
          position: item.employee_position
        })),
      }
    case ACTIONS_NAMES.AUTH_SELECT_EMPLOYEE:
      return {
        ...state,
        selectedEmployee: action.employee_guid,
        selectedStudent: undefined
      }
    case ACTIONS_NAMES.AUTH_GET_USER:
      return {
        ...state,
        selectedUser: action.user
      }
    case ACTIONS_NAMES.AUTH_LOGOUT:
      return {
        ...state,
        selectedUser: {}
      }
    default:
      return state;
  }
};

export default authReducer;