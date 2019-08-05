import {get, post} from '../utils/request';

export const getPersonalInfo = () => get('/profile/personal');
export const updatePersonal = data => post('/profile/personal/update', data);

export const getCourse = params => get('/profile/course', params);
export const cancelFree = params => get('/profile/course/cancel-free', params);

export const getExam = params => get('/profile/exam', params);

