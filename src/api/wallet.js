import {get, post} from '../utils/request';

export const getWalletInfo = () => get('/wallet');
export const getWalletLog = params => get('/wallet/logs', params);
