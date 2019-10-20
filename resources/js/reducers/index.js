import { combineReducers } from 'redux';
import groupsReducer from './groupsReducer';
import studentsReducer from './studentsReducer';
import authReducer from './authReducer';
import lessonsReducer from './lessonsReducer';

export default combineReducers({
  groups: groupsReducer,
  students: studentsReducer,
  auth: authReducer,
  lessons: lessonsReducer,
});