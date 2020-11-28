import {createReducer} from '../utils';
import * as actions from './actions';

const initialState = {
    xbox: null,
    steam: null,
    ps: null,
    mobile: null,
};

export const gamesReducer = createReducer(initialState, {
    [actions.getAllGames.set]: (state, payload) => {
        return { ...state,
            all: payload
        }
    }
});
