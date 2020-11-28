import { defineAction } from '../utils';

const createAction = defineAction('games');

export const getAllGames = createAction('GET_ALL_GAMES');
