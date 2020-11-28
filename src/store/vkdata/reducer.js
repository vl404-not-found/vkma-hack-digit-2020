import {createReducer} from '../utils';
import * as actions from './actions';

const initialState = {
    bridge: {},
    userData: {}
};

export const vkReducer = createReducer(initialState, {
    [actions.subscribeVKEvents.set]: (state, payload) => {
        return { ...state,
            bridge: payload
        }
    },
    [actions.userGet.set]: (state, payload) => {
        return { ...state,
            userData: payload
        }
    },
    // [actions.userGet.set]: (state) => {
    //     return {
    //         ...state,
    //     }
    // },
});
