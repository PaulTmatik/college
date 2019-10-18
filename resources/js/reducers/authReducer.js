import { ACTIONS_NAMES } from '../actions';

const authState = {
  employees: [],
  selectedEmployee: undefined,
  selectedStudentGuid: undefined,
  latestLogger: undefined,
  selectedUser: {}
};

const authReducer = (state = authState, action) => {
  state.latestLogger = localStorage.getItem('latest_logger');
  switch (action.type) {
    case ACTIONS_NAMES.AUTH_GET_EMPLOYEES:
      const employees = action.employees;
      return {
        ...state,
        employees,
        selectedEmployee: employees.filter(
            employee => employee.u_guid == localStorage.getItem('latest_logger'))[0] ||
          employees.slice(0, 1)[0]
      }
    case ACTIONS_NAMES.AUTH_SELECT_EMPLOYEE:
      return {
        ...state,
        selectedEmployee: state.employees.filter(
          employee => employee.u_guid === action.employee_guid)[0],
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