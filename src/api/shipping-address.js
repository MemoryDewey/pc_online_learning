import {get, post} from '../utils/request';

export const getAddress = () => get('/address');
export const addAddress = data => post('/address/add', data);
export const updateAddress = data => post('/address/update', data);
export const deleteAddress = data => post('/address/delete', data);
export const setDefualtAddress = params => get('/address/default', params);
