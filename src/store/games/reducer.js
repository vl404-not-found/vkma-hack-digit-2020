import {createReducer} from '../utils';
import * as actions from './actions';

const initialState = {
    all: [],
};

export const gamesReducer = createReducer(initialState, {
    [actions.getAllGames.set]: (state, payload) => {
        return { ...state,
            all: payload
        }
    }
});
