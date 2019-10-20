import { ACTIONS_NAMES } from '.';

export const getLessonsByGroupForTeacher = (groupGuid, teacherGuid) => {
  return dispatch => {
    return window.axios.get(`/api/teacher/${teacherGuid}/group/${groupGuid}`)
      .then(response => response.data)
      .then(data => dispatch(reciveGroupsByTeacher(data)))
      .catch(error => console.error('Get Lesson By Group for teacher', error));
  }
}

export const reciveGroupsByTeacher = data => {
  return {
    type: ACTIONS_NAMES.LESSON_GET_BY_GROUPS_FOR_TEACHER,
    lessons: data.lessons,
    recivedAt: Date.now()
  }
}

export const setCurrentLesson = lessonGuid => {
  return {
    type: ACTIONS_NAMES.LESSON_SET_CURRENT,
    currentLessonGuid: lessonGuid,
  }
}