import { ACTIONS_NAMES } from '.';

export const getUsersEmployees = () => {
  return dispatch => {
    return window.axios.get('/api/auth/employees')
      .then(response => response.data, error => console.error('Error', error))
      .then(data => dispatch(reciveUsersEmployees(data)));
  };
}

export const checkAuthorization = () => {
  return dispatch => {
    const token = localStorage.getItem('auth_token');
    return window.axios.get('/api/auth/user', { headers: {"Authorization" : `Bearer ${token}`} })
      .then(response => response.data, error => console.error('Error', error))
      .then(data => dispatch(reciveAuthorizeUser(data)));
  }
}

export const authorize = (userGuid, password) => {
  return dispatch => {
    return window.axios.post('/api/login', {u_guid: userGuid, password})
      .then(response => response.data, error => console.error('Error', error))
      .then(data => {
        localStorage.setItem('auth_token', data.token);
        return dispatch(checkAuthorization());
      })
  }
}

export const logOut = () => {
  localStorage.removeItem('auth_token');
  return {
    type: ACTIONS_NAMES.AUTH_LOGOUT
  }
}

export const reciveUsersEmployees = data => {
  return {
    type: ACTIONS_NAMES.AUTH_GET_EMPLOYEES,
    employees: data || [],
    recivedAt: Date.now()
  }
}

export const reciveAuthorizeUser = data => {
  return {
    type: ACTIONS_NAMES.AUTH_GET_USER,
    user: data || {},
    recivedAt: Date.now()
  }
}

export const selectEmployeeByGuid = eGuid => {
  return {
    type: ACTIONS_NAMES.AUTH_SELECT_EMPLOYEE,
    employee_guid: eGuid
  }
}