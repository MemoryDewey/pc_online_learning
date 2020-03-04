import {get, post} from '../utils/request';

export const getPersonalInfo = () => get('/profile');
export const updatePersonal = data => post('/profile', data);
export const updateBstAddress = data => post('/profile/user-address', data);
export const getInvite = params => get('/profile/invite', params);
export const getInviteCode = () => get('/profile/invite-code');

export const getCourse = params => get('/course/list/user-course', params);
export const cancelFree = params => get('/course/apply/cancel-free', params);
export const getWalletCourse = params => get('/course/list/user-course-coin', params);
export const getWalletBstCourse = params => get('/course/list/user-course-bst', params);
export const getLatestBrowseCourse = () => get('/course/list/latest-browse');
export const getCollectionCourse = params => get('/course/list/collection', params);

export const getExam = params => get('/examine/user-exam', params);

