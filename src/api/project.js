import {get, post} from '../utils/request';

export const getProjectAuth = params => get('/project/query/getprojectauthed', params);
export const getProjectCountAuth = () => post('/project/query/getprojectcountauthed');
export const getApplyRecord = params => get('/project/query/getApplyRecord', params);
export const getApplyCountRecord = () => post('/project/query/getApplyRecordCount');
export const getProjectMember = params => get('/project/query/getProjectMember', params);
export const deleteProjectMember = params => get('/project/projectmanagement/deleteProjectMember', params);
export const submitProjectScore = data => post('/project/projectmanagement/submitScore', data);
export const modifyProject = data => post('/project/projectmanagement/modifyProject', data);
export const getProScore = params => get('/project/query/getProScore', params);
export const confirmProScore = params => get('/project/projectmanagement/comfirmProScore', params);
export const closeProject = params => get('/project/projectmanagement/closeProject', params);
export const submitInvest = data => post('/project/projectmanagement/submitInvest', data);
export const agreeApply = params => get('/project/ApplyRecord/agreeApply', params);
export const cancelApply = data => post('/project/ApplyRecord/cancelApply', data);
export const rejectApply = params => get('/project/ApplyRecord/rejectApply', params);
export const createApply = data => post('/project/CreateRecord/createapply', data);
export const getCreateRecord = params => get('/project/query/getCreateRecord', params);
export const getCreateRecordCount = data => post('/project/query/getCreateRecordCount', data);

export const getPaymentRecord = params => get('/project/query/getPaymentRecord', params);
export const getPaymentCount = () => post('/project/query/getPaymentCount');

export const attendProject = data => post('/project/ApplyRecord/createapply', data);
export const getProjectDetail = params => get('/project/query/projectdetail', params);

export const getProjectCount = data => post('/project/query/getProjectCount', data);
export const getProject = params => get('/project/query/getproject/', params);

