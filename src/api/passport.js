import {post, get} from '../utils/request';

export const login = data => post('/passport/login', data);
export const checkPhone = data => post('/passport/check-phone', data);
export const register = data => post('/passport/register', data);
export const sendMessage = data => post('/passport/short-message-captcha', data);
export const sendEmail = data => post('/passport/email-captcha', data);
export const addEmail = data => post('/passport/add-email', data);
export const changePhone = data => post('/passport/change-mobile', data);
export const deleteEmail = () => get('/passport/delete-email');
export const reset = data => post('/passport/reset', data);
export const logout = () => get('/passport/logout');
export const checkLogin = () => get('/passport/check-login');
export const getLoginQrCode = () => get('/passport/login-qr-code');
export const checkQrCodeLogin = params => get('/passport/check-qr-code-login', params);
