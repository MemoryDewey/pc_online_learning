import {get, post} from '../utils/request';

export const getPersonalInfo = () => get('/profile/personal');
export const updatePersonal = data => post('/profile/personal/update', data);
export const updateBstAddress = data => post('/profile/personal/user-address', data);
export const getInvite = params => get('/profile/personal/invite', params);
export const getInviteCode = () => get('/profile/personal/invite-code');

export const getCourse = params => get('/course/list/user-course', params);
export const cancelFree = params => get('/course/information/cancel-free', params);
export const getWalletCourse = params => get('/course/list/user-course-rmb', params);
export const getWalletBstCourse = params => get('/course/list/user-course-bst', params);
export const getLatestBrowseCourse = () => get('/course/list/latest-browse');
export const getCollectionCourse = params => get('/course/list/collection', params);

export const getExam = params => get('/examine/user-exam', params);

