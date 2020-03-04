import {get, post, download} from '@/utils/request';

export const getCourseType = params => get('/course/list/type', params);
export const getCourseSystem = () => get('/course/list/system');

export const getListPage = params => get('/course/list/page', params);
export const getList = params => get('/course/list', params);
export const getRecommend = () => get('/course/list/recommend');
export const getIndexCourse = () => get('/course/list/index-show');
export const getIndexBanner = () => get('/course/list/banner');

export const getInfo = params => get('/course/info', params);
export const getBstPrice = data => post('/course/info/bst-price', data);
export const getLive = params => get('/course/video/live', params);
export const getVideo = params => get('/course/video/chapter', params);
export const getFile = params => get('/course/info/file', params);
export const downloadFile = params => download('/course/info/file-download', params);
export const checkApply = params => get('/course/info/class', params);
export const collectCourse = params => get('/course/info/collect-course', params);
export const getExamTime = params => get('/course/info/exam-time', params);
export const getIntroduction = () => get('/course/info/introduction');

export const applyFree = data => post('/course/apply/free', data);
export const applyChargeByBst = data => post('/course/apply/buy-course-bst', data);
export const checkBstStatue = params => get('/course/apply/buy-course-bst/statue', params);
export const checkBstConfirmation = params => get('/course/apply/check-bst-confirmation', params);
export const applyCourseByCash = data => post('/course/apply/buy-course', data);

export const getComment = params => get('/course/comment', params);
export const getCommentCount = params => get('/course/comment/count', params);
export const addComment = data => post('/course/comment', data);

export const examCheck = params => get('/examine/exam-check', params);
export const getExam = data => post('/examine/exam', data);
export const getExercise = data => post('/examine/exercise', data);
export const addExam = data => post('/examine', data);

export const getCertificate = params => get('/course/list/certificate', params);

