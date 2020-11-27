import {createReducer} from '../utils';
import * as actions from './actions';

const initialState = {
    your: []
};

export const statsReducer = createReducer(initialState, {
    [actions.getStatUser.set]: (state, payload) => {
        return { ...state,
            your: payload
        }
    }
});
