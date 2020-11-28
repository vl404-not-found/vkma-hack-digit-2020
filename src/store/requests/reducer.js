import {createReducer} from '../utils';
import * as actions from './actions';

const initialState = {
    main: [],
    com: [],
    your: [],
    my_team: [],
};

export const reqReducer = createReducer(initialState, {
    [actions.getRequestsMain.set]: (state, payload) => {
        return { ...state,
            main: payload
        }
    },
    [actions.getRequestsCom.set]: (state, payload) => {
        return { ...state,
            com: payload
        }
    },
    [actions.getRequestsYour.set]: (state, payload) => {
        return { ...state,
            your: payload
        }
    },
    [actions.conclusionMyTeam.set]: (state, payload) => {
        return { ...state,
            my_team: payload
        }
    }
});
