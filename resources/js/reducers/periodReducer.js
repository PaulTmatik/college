import { ACTIONS_NAMES } from '../actions';

const periodState = {
  currentPeriod: {},
  periods: []
}

const calcStartPeriod = () => {
  // ничего получать не надо, используем время существования группы
  // с указанием даты заполнения
}

const periodReducer = (state = periodState, action) => {
  switch(action.type) {
    default: return state;
  }
}

export default periodReducer;