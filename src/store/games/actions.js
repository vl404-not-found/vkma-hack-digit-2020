import { defineAction } from '../utils';

const createAction = defineAction('games');

export const getAllGames = createAction('GET_ALL_GAMES');
export const getSteamGame = createAction('GET_STEAM_GAMES');
export const getSteamGameArray = createAction('GET_STEAM_GAMES_ARRAY');
export const getStatCsGo = createAction('CSGO_STAT');
