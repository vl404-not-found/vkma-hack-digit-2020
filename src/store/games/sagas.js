import {put, select, takeLatest} from "redux-saga/effects";
import {request} from "../utils/axios";
import {putToStore} from "../utils";
import * as actions from "./actions";
import {error} from "react-toastify-redux";
import {push_route} from '../dynamicui/actions'

function* getAllGamesSaga ({$payload}) {
    try {
        const items = yield select(s => s.dynamic_ui.start_data);
        const resp = yield request({...items, ...{module: 'get_all_games'}})
        console.log(resp)
        yield putToStore(actions.getAllGames, resp)
    } catch (e) {
        yield put(error('error req'));
    }
}
function* getSteamGameSaga ({$payload}) {
    try {
        const items = yield select(s => s.dynamic_ui.start_data);
        const resp = yield request({...items, ...{module: 'get_user_steam_games'}})
        yield putToStore(actions.getSteamGame, resp)
        console.log(resp)
    } catch (e) {
        yield put(error('error req'));
    }
}
function* postSteamGameArraySaga ({$payload}) {
    const items = yield select(s => s.dynamic_ui.start_data);
    yield put({type: push_route, $payload: 'games/main'})

    try {

        const resp = yield request({...items, ...{module: 'add_user_games'}, ...{game_ids:$payload.map((i,index)=> {
            return i ? `${index},` : ''
                }).join('')}})
        yield putToStore(actions.getSteamGameArray, resp)
        console.log(resp)
    } catch (e) {
        yield put(error('error req'));
    }
}
function* getStatCsGoSaga ({$payload}) {
    try {
        const items = yield select(s => s.dynamic_ui.start_data);
        const resp = yield request({...items, ...{module: 'csgo_stat'}})
        yield putToStore(actions.getStatCsGo, resp)
        console.log(resp)
    } catch (e) {
        yield put(error('error req'));
    }
}

function* getSelectedGamesSaga ({$payload}) {
    try {
        const items = yield select(s => s.dynamic_ui.start_data);
        const resp = yield request({...items, ...{module: 'get_select_games'}})
        console.log(resp)
        yield putToStore(actions.getSelectedGames, resp)
    } catch (e) {
        yield put(error('error req'));
    }
}

export const gamesSaga = [
    takeLatest(actions.getAllGames.saga, getAllGamesSaga),
    takeLatest(actions.getSteamGame.saga, getSteamGameSaga),
    takeLatest(actions.getSteamGameArray.saga, postSteamGameArraySaga),
    takeLatest(actions.getStatCsGo.saga, getStatCsGoSaga),
    takeLatest(actions.getSelectedGames.saga, getSelectedGamesSaga)
]
