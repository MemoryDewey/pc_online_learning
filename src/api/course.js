import {get, post} from '../utils/request';

export const getCourseType = params => get('/course/list/type', params);
export const getCourseSystem = () => get('/course/list/system');

export const getListPage = data => post('/course/list/page', data);
export const getList = params => get('/course/list', params);
export const getRecommend = () => get('/course/list/recommend');
export const getIndexCourse = () => get('/course/list/index-show');

export const getInfo = params => get('/course/information', params);
export const applyFree = data => post('/course/information/apply-free', data);
export const applyChargeByBst = data => post('/course/information/getPaymentID', data);
export const applyCourseByCash = data => post('/course/information/buy-course', data);
export const examCheck = params => get('/examine/exam-check', params);
export const getLive = params => get('/course/information/live', params);
export const getVideo = params => get('/course/information/video', params);
export const getFile = params => get('/course/information/file', params);
export const getClass = data => post('/course/information/class', data);
export const getExamTime = params => get('/examine/exam-time', params);

export const getComment = params => get('/course/information/comment', params);
export const getCommentCount = params => get('/course/information/comment/count', params);
export const addComment = data => post('/course/information/comment', data);

export const getExam = data => post('/examine/exam', data);
export const getExercise = data => post('/examine/exercise', data);
export const addExam = data => post('/examine/add', data);

