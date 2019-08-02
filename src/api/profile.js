import {get, post} from '../utils/request';

export const getPersonalInfo = () => get('/profile/personal');
export const deleteEmail = () => get('/profile/personal/delete-email');
export const addEmail = data => post('/profile/personal/add-email', data);
export const changePhone = data => post('/profile/personal/change-mobile', data);
export const updatePersonal = data => post('/profile/personal/update', data);

export const getCourse = params => get('/profile/course', params);
export const cancelFree = params => get('/profile/course/cancel-free', params);

export const getExam = params => get('/profile/exam', params);

