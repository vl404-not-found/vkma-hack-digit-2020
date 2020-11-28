import { defineAction } from '../utils';

const createAction = defineAction('vk_data');

export const subscribeVKEvents = createAction('SUBSCRIBE_EVENTS');
export const userGet = createAction('USER_GET');
// export const backendAuth = createAction('BACKEND_AUTH')
