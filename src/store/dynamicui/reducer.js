import {createReducer} from '../utils';
import * as actions from './actions';
import qs from "qs";

const initialState = {
    isLoaderShow: false,
    history: [window.location.hash.length < 1 ? 'requests/gamers' : window.location.hash.substr(1)],
    start_data: {...qs.parse(window.location.search.substr(1))},
    modal: null,
    selected_game: null
    // ((window.location.pathname === '/')
    //     || (window.location.hash.includes('')))
    //     ? 'requests/gamers'
    //     : window.location.pathname.substr(1)]
};

export const uiReducer = createReducer(initialState, {
        [actions.showLoader]: (state) => {
            return {
                ...state,
                isLoaderShow: true
            }
        },
        [actions.hideLoader]: (state) => {
            return {
                ...state,
                isLoaderShow: false
            }
        },
        [actions.push_route]: (state, payload) => {
            if (state.history[state.history.length - 1] !== payload) {
                state.history.push(payload)
            }

            return {
                ...state,
            }
        },
        [actions.open_modal]: (state, payload) => {
            return {
                ...state,
                modal: payload
            }
        },
        [actions.close_modal]: (state) => {
            return {
                ...state,
                modal: 'select'
            }
        },
        [actions.back]: (state) => {
            // console.log(state.history)
            state.history.splice(-1, 1)
            // console.log(history)
            return {
                ...state,
                // history: history
            }
        },
        [actions.setSelectedGame]: (state, payload) => {
            return {
                ...state,
                selected_game: payload
            }
        },
    }
);
