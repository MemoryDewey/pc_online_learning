import {get, post} from '../utils/request';

export const getWalletInfo = () => get('/wallet');
export const getKey = () => get('/wallet/key');
export const getWalletLog = params => get('/wallet/logs', params);
export const recharge = body => post('/wallet/recharge', body);
export const toBst = body => post('/wallet/to-bst', body);
export const getBstValue = () => get('/wallet/bst-value');
export const getBstBalance = params => get('/wallet/bst-balance', params);
export const refreshRecharge = () => get('/wallet/refresh-recharge');
