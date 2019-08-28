import {get, post} from '../utils/request';

export const getWalletInfo = () => get('/wallet');
export const getWalletLog = params => get('/wallet/logs', params);
export const recharge = body => post('/wallet/recharge', body);
export const toCash = body => post('/wallet/to-cash', body);
