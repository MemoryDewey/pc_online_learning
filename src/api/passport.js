import {post, get, del} from '../utils/request';

export const login = data => post('/passport/login', data);
export const checkPhone = data => post('/passport/check-phone', data);
export const register = data => post('/passport/register', data);
export const addEmail = data => post('/passport/email', data);
export const changePhone = data => post('/passport/change-mobile', data);
export const deleteEmail = () => del('/passport/email');
export const reset = data => post('/passport/reset', data);
export const logout = () => get('/passport/logout');
export const checkLogin = () => get('/passport/check-login');
export const getLoginQrCode = () => get('/passport/login-qr-code');
export const checkQrCodeLogin = params => get('/passport/check-qr-code-login', params);

export const sendMessage = data => post('/verify-code/message', data);
export const sendEmail = data => post('/verify-code/email', data);
