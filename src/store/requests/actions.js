import { defineAction } from '../utils';

const createAction = defineAction('req');

export const getRequestsMain = createAction('GET_REQUESTS_USERS');
export const getRequestsCom = createAction('GET_REQUESTS_COMMANDS');
export const getRequestsYour = createAction('GET_REQUESTS_YOUR');
export const backendReg = createAction('FIRST_AUTH');
