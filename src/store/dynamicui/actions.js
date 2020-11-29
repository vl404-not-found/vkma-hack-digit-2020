import { defineSimpleAction } from '../utils';

const createSimpleAction = defineSimpleAction('gen');

export const showLoader = createSimpleAction("SHOW_LOADER")
export const hideLoader = createSimpleAction("HIDE_LOADER")
export const push_route = createSimpleAction("PUSH_TO_HISTORY")
export const open_modal = createSimpleAction("OPEN_MODAL")
export const close_modal = createSimpleAction("CLOSE_MODAL")
export const back = createSimpleAction("BACK_IN_HISTORY")
export const setSelectedGame = createSimpleAction('SELECT_GAMES');
