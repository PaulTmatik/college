import { ACTIONS_NAMES } from '.';

export const getUsersEmployees = () => {
  return dispatch => {
    return window.axios.get('/api/auth/employees')
      .then(response => response.data)
      .then(data => dispatch(reciveUsersEmployees(data)))
      .catch(error => console.error('Get Employees', error));
  };
}

export const checkAuthorization = () => {
  return dispatch => {
    const token = sessionStorage.getItem('auth_token');
    window.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return window.axios.get('/api/auth/user')
      .then(response => response.data)
      .then(data => {
        localStorage.setItem('latest_logger', data.u_guid);
        dispatch(reciveAuthorizeUser(data))
      })
      .catch(error => console.error('Check Authirization',error));
  }
}

export const authorize = (user, password) => {
  return dispatch => {
    return window.axios.post('/api/login', {u_guid: user.u_guid, password})
      .then(response => response.data)
      .then(data => {
        sessionStorage.setItem('auth_token', data.token);
        return dispatch(checkAuthorization());
      })
      .catch(error => console.error('Authorize', error));
  }
}

export const logOut = () => {
  sessionStorage.removeItem('auth_token');
  window.axios.defaults.headers.common["Authorization"] = undefined;
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