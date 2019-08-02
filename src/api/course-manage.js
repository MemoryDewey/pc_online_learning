import {get, post} from '../utils/request';

export const getStudent = params => get('/teacher/course/student', params);
export const addStudent = data => post('/teacher/course/student/add', data);
export const getStudentScore = data => post('/teacher/course/student/get-score', data);
export const setStudentScore = data => post('/teacher/course/student/update-score', data);
export const deleteStudent = data => post('/teacher/course/student/delete', data);


export const getCourse = () => get('/teacher/course/teacher');
export const getCourseInfo = params => get('/teacher/course/info', params);
export const updateCourseInfo = data => post('/teacher/course/info/update', data);
export const deleteCourse = data => post('/teacher/course/info/delete', data);
export const recoverCourse = data => post('/teacher/course/info/recover', data);


export const getChapter = params => get('/teacher/course/file/chapter', params);
export const getChapterInfo = params => get('/teacher/course/chapter', params);
export const addChapter = data => post('/teacher/course/chapter/add', data);
export const deleteChapter = data => post('/teacher/course/chapter/delete', data);
export const updateChapter = data => post('/teacher/course/chapter/update', data);
export const recoverChapter = data => post('/teacher/course/chapter/recover', data);


export const getVideo = params => get('/teacher/course/video', params);
export const getSignature = () => get('/teacher/course/video/signature');
export const addVideo = data => post('/teacher/course/video/add', data);
export const updateVideo = data => post('/teacher/course/video/update', data);
export const deleteVideo = data => post('/teacher/course/video/delete', data);

export const getLive = params => get('/teacher/course/live', params);
export const setLive = data => post('/teacher/course/live/set', data);
export const getLiveCourse = () => get('/teacher/course/teacher/live');


export const deleteWare = data => post('/teacher/course/ware/delete', data);


export const getFile = params => get('/teacher/course/file', params);
export const updateFile = data => post('/teacher/course/file/update', data);
export const deleteFile = data => post('/teacher/course/file/delete', data);
export const recoverFile = data => post('/teacher/course/file/recover', data);


export const getPaper = params => get('/teacher/course/paper', params);
export const addPaper = data => post('/teacher/course/paper/add', data);
export const deletePaper = data => post('/teacher/course/paper/delete', data);
export const getCourseVideo = data => post('/teacher/course/video/all', data);

