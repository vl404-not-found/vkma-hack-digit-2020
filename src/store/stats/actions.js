import { defineAction } from '../utils';

const createAction = defineAction('user');

export const getStatUser = createAction('GET_STATS_USER_YOUR');
