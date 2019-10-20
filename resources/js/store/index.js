import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';

import { setDefaultGroup, getLessonsForGroup } from '../middlewares';

const store = createStore(
  rootReducers,
  applyMiddleware(
    thunk, 
    setDefaultGroup,
    getLessonsForGroup
  )
);

export default store;