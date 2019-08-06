import {get, post} from '../utils/request';

export const getPersonalInfo = () => get('/profile/personal');
export const updatePersonal = data => post('/profile/personal/update', data);

export const getCourse = params => get('/course/list/user-course', params);
export const cancelFree = params => get('/course/information/cancel-free', params);

export const getExam = params => get('/examine/user-exam', params);

