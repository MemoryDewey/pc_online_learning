import {post, get} from '../utils/request';

export const login = data => post('/passport/login', data);
export const checkPhone = data => post('/passport/check-phone', data);
export const register = data => post('/passport/register', data);
export const sendMessage = data => post('/sms', data);
export const sendEmail = data => post('/email-send', data);
export const reset = data => post('/passport/reset', data);
export const logout = () => get('/passport/exit');
export const checkLogin = () => get('/passport/check-login');
