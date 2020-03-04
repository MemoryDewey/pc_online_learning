import {get, post, del, put, download} from '../utils/request';

export const getStudent = params => get('/teacher/student', params);
export const addStudent = data => post('/teacher/student', data);
export const deleteStudent = data => del('/teacher/student', data);
export const addCertificate = data => post('/teacher/student/certificate', data);

export const getCourse = () => get('/teacher/course/all');
export const getCourseInfo = params => get('/teacher/course', params);
export const updateCourseInfo = data => put('/teacher/course', data);
export const deleteCourse = data => del('/teacher/course', data);
export const recoverCourse = data => post('/teacher/course/recover', data);
export const setCourseDiscount = data => post('/teacher/course/discount', data);


export const getChapter = params => get('/teacher/chapter/course', params);
export const getChapterInfo = params => get('/teacher/chapter', params);
export const addChapter = data => post('/teacher/chapter', data);
export const deleteChapter = data => del('/teacher/chapter', data);
export const updateChapter = data => put('/teacher/chapter', data);
export const recoverChapter = data => post('/teacher/chapter/recover', data);


export const getVideo = params => get('/teacher/video', params);
export const getSignature = () => get('/teacher/video/signature');
export const addVideo = data => post('/teacher/video', data);
export const updateVideo = data => put('/teacher/video', data);
export const deleteVideo = data => del('/teacher/video', data);
export const checkVideo = params => get('/teacher/video/check', params);
export const deleteWare = data => del('/teacher/video/ware', data);


export const getLive = params => get('/teacher/live', params);
export const setLive = data => post('/teacher/live', data);
export const getLiveCourse = () => get('/teacher/live/course');
export const downloadHelp = () => download('/teacher/live/help');


export const getFile = params => get('/teacher/file', params);
export const updateFile = data => put('/teacher/file', data);
export const deleteFile = data => del('/teacher/file', data);
export const recoverFile = data => post('/teacher/file/recover', data);


export const getPaper = params => get('/teacher/paper', params);
export const addPaper = data => post('/teacher/paper', data);
export const updatePaper = data => put('/teacher/paper', data);
export const getCoursePaper = () => get('/teacher/paper/course');
export const getCourseVideo = params => get('/teacher/paper/video', params);

