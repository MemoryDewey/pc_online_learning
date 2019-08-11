import {get, post} from '../utils/request';

export const getProjectAuth = params => get('/project/query/getProjectAuth', params);
export const getProjectCountAuth = () => post('/project/query/getProjectCountAuth');
export const getapplyRecord = params => get('/project/query/getApplyRecord', params);
export const getApplyCountRecord = () => post('/project/query/getApplyRecordCount');
export const getProjectMember = params => get('/project/query/getProjectMember', params);
export const deleteProjectMember = params => get('/project/projectManagement/deleteProjectMember', params);
export const submitProjectScore = data => post('/project/projectManagement/submitScore', data);
export const modifyProject = data => post('/project/projectManagement/modifyProject', data);
export const getProScore = params => get('/project/query/getProScore', params);
export const confirmProScore = params => get('/project/projectManagement/confirmProScore', params);
export const closeProject = params => get('/project/projectManagement/closeProject', params);
export const submitInvest = data => post('/project/projectManagement/submitInvest', data);
export const agreeApply = params => get('/project/applyRecord/agreeApply', params);
export const cancelApply = data => post('/project/applyRecord/cancelApply', data);
export const rejectApply = params => get('/project/applyRecord/rejectApply', params);
export const createApply = data => post('/project/CreateRecord/createApply', data);
export const getCreateRecord = params => get('/project/query/getCreateRecord', params);
export const getCreateRecordCount = data => post('/project/query/getCreateRecordCount', data);
export const getIndexProject = () => get('/project/query/getIndexProject');

export const getPaymentRecord = params => get('/project/query/getPaymentRecord', params);
export const getPaymentCount = () => post('/project/query/getPaymentCount');

export const attendProject = data => post('/project/applyRecord/creatApply', data);
export const getProjectDetail = params => get('/project/query/projectDetail', params);

export const getProjectCount = data => post('/project/query/getProjectCount', data);
export const getProject = params => get('/project/query/getProject', params);

