import {get, post} from '../utils/request';

export const getStudent = params => get('/teacher/course/student', params);
export const addStudent = data => post('/teacher/course/student/add', data);
export const deleteStudent = data => post('/teacher/course/student/delete', data);
export const addCertificate = data => post('/teacher/course/student/certificate', data);



export const getCourse = () => get('/teacher/course');
export const getCourseInfo = params => get('/teacher/course/info', params);
export const updateCourseInfo = data => post('/teacher/course/info/update', data);
export const deleteCourse = data => post('/teacher/course/info/delete', data);
export const recoverCourse = data => post('/teacher/course/info/recover', data);
export const setCourseDiscount = data => post('/teacher/course/info/discount', data);


export const getChapter = params => get('/teacher/course/chapter-course', params);
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
export const checkVideo = data => post('/teacher/course/video/check', data);

export const getLive = params => get('/teacher/course/live', params);
export const setLive = data => post('/teacher/course/live/add', data);
export const getLiveCourse = () => get('/teacher/course/live-course');


export const deleteWare = data => post('/teacher/course/ware/delete', data);


export const getFile = params => get('/teacher/course/file', params);
export const updateFile = data => post('/teacher/course/file/update', data);
export const deleteFile = data => post('/teacher/course/file/delete', data);
export const recoverFile = data => post('/teacher/course/file/recover', data);


export const getPaper = params => get('/teacher/course/paper', params);
export const addPaper = data => post('/teacher/course/paper/add', data);
export const updatePaper = data => post('/teacher/course/paper/update', data);
export const getCoursePaper = () => get('/teacher/course/course-paper');
export const getCourseVideo = params => get('/teacher/course/video-course-paper', params);

