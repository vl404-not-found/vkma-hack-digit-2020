import {put, select, takeLatest} from "redux-saga/effects";
import {request} from "../utils/axios";
import {putToStore} from "../utils";
import * as actions from "./actions";
import {error} from "react-toastify-redux";

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


export const gamesSaga = [
    takeLatest(actions.getAllGames.saga, getAllGamesSaga)
]
