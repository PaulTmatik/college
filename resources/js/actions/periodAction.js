import { ACTIONS_NAMES } from '.';

export const getUsedPeriodByUser = uGuid => {
  return dispatch => {
    return window.axios.get(`/api/journal/${uGuid}/periods`)
      .then(response => response.data, error => console.error(error))
      .then(data => dispatch(reciveUsedPeriods(data)));
  };
}

export const reciveUsedPeriods = data => ({
  type: ACTIONS_NAMES.PERIOD_GET_BY_USER,
  periods: data || [],
  recivedAt: Date.now()
});