import { ACTIONS_NAMES } from '../actions';
import Student from '../structures/Student';

const defaultStudentsStore = [
  new Student(
    "edde322b-57c1-4966-a850-11203904d19a",
    "Иваненко", "Валерий", "Викторович",
    "male", new Date(2001, 11, 23), 
    new Date(2016, 8, 1), new Date(2019, 6, 1)
  ),//.groups.push("57f4b9fd-6222-4b2d-8328-2917681f608d")
  new Student(
    "7e1be992-221d-4358-a1fc-2106f465046a",
    "Васильева", "Ксения", "Николаевна",
    "female", new Date(1999, 7, 15), 
    new Date(2016, 8, 1), new Date(2019, 6, 1)
  ),//.groups.push('57f4b9fd-6222-4b2d-8328-2917681f608d')
  new Student(
    "80fcc67b-6166-4683-8ea9-e7645832218c",
    "Урутумаев", "Удыр", "Башкурванунович",
    "male", new Date(2001, 3, 29), 
    new Date(2016, 8, 1), new Date(2019, 6, 1)
  ),//.groups.push("57f4b9fd-6222-4b2d-8328-2917681f608d")
  new Student(
    "6dafa587-957d-4cd0-8a6c-067602ba42fb",
    "Сергеенко", "Артур", "Мерлинович",
    "male", new Date(1998, 4, 22), 
    new Date(2015, 8, 1), new Date(2019, 6, 1)
  ),//.groups.push("02b864fb-d116-4952-b74b-6852ee37d117")
  new Student(
    "c01cf558-5fa2-4587-b742-a62a4f6dfa02",
    "Кошкина", "Нина", "Собаковна",
    "female", new Date(1999, 7, 14), 
    new Date(2015, 8, 1), new Date(2019, 6, 1)
  )//.groups.push("02b864fb-d116-4952-b74b-6852ee37d117")
];

const studentGroups = [
  {
    sGuid: "edde322b-57c1-4966-a850-11203904d19a",
    gGuid: "57f4b9fd-6222-4b2d-8328-2917681f608d"
  },
  {
    sGuid: "7e1be992-221d-4358-a1fc-2106f465046a",
    gGuid: '57f4b9fd-6222-4b2d-8328-2917681f608d'
  },
  {
    sGuid: "80fcc67b-6166-4683-8ea9-e7645832218c",
    gGuid: "57f4b9fd-6222-4b2d-8328-2917681f608d"
  },
  {
    sGuid: "6dafa587-957d-4cd0-8a6c-067602ba42fb",
    gGuid: "02b864fb-d116-4952-b74b-6852ee37d117"
  },
  {
    sGuid: "c01cf558-5fa2-4587-b742-a62a4f6dfa02",
    gGuid: "02b864fb-d116-4952-b74b-6852ee37d117"
  }
];

const baseState = {
  selected: undefined,
  all: defaultStudentsStore
}

const studentsReducer = (state = baseState, action) => {
  switch(action.type) {
    case ACTIONS_NAMES.STUDENTS_GET_IN_GROUP:
      state.all = defaultStudentsStore.filter(student => {
        const sg = studentGroups.filter(sgr => {
          return sgr.sGuid === student.guid && sgr.gGuid === action.groupGuid;
        })
        return sg.length > 0;
      });
      return state;
    default:
      state.all = defaultStudentsStore
      return state;
  }
}

export default studentsReducer;