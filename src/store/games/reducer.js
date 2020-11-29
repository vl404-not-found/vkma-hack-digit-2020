import {createReducer} from '../utils';
import * as actions from './actions';

const initialState = {
    xbox: null,
    steam: null,
    ps: null,
    mobile: null,
    all: null,
    addgame: null,
    stat: {"playtime_forever":null,"kdr":null,"accuracy":null,"headshot":null,"count_mvp_for_match":null,"wins_pistolround":null}
};

export const gamesReducer = createReducer(initialState, {
    [actions.getAllGames.set]: (state, payload) => {
        return { ...state,
            all: payload
        }
    },
    [actions.getSteamGame.set]: (state, payload) => {
        return { ...state,
            steam: payload
        }
    },
    [actions.getSteamGameArray.set]: (state, payload) => {
        return { ...state,
            addgame: payload
        }
    },
    [actions.getStatCsGo.set]: (state, payload) => {
        return { ...state,
            stat: payload
        }
    },
});
