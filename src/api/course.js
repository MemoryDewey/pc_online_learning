import {get, post} from '../utils/request';

export const getCourseType = params => get('/course/list/type', params);
export const getCourseSystem = () => get('/course/list/system');

export const getListCount = data => post('/course/list/count', data);
export const getList = params => get('/course/list', params);
export const getRecommend = () => get('/course/list/recommend');
export const getIndexCourse = () => get('/course/list/index-show');

export const getInfo = params => get('/course/information', params);
export const applyFree = data => post('/course/information/apply-free', data);
export const applyCharge = data => post('/course/information/getPaymentID', data);
export const examCheck = params => post('/course/information/exam-check', params);
export const getLive = data => post('/course/information/live', data);
export const getVideo = params => get('/course/information/video', params);
export const getFile = params => get('/course/information/file', params);
export const getClass = data => post('/course/information/class', data);
export const getExamTime = params => get('/course/information/exam-time', params);

export const getComment = params => get('/course/information/comment', params);
export const getCommentCount = params => get('/course/information/comment/count', params);
export const addComment = data => post('/course/information/comment', data);

export const getExam = data => post('/course/exam', data);
export const addExam = data => post('/course/exam-add', data);

