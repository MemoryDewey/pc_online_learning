import {post, get} from '../utils/request';

export const getPointInfo = () => get('/point-mall');
export const getCommodity = () => get('/point-mall/commodity');
export const getPointDetail = params => get('/point-mall/detail', params);
export const getPointCommodity = params => get('/point-mall/detail/commodity', params);
export const convertCommodity = data => post('/point-mall/convert', data);
