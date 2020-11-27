import * as actions from './actions'
import {put, select, takeLatest} from "redux-saga/effects";
import {request} from "../utils/axios";
import {putToStore} from "../utils";
import {error} from 'react-toastify-redux'

// module: 'games', steam_id: 76561198176825319

function* getStatUserSaga({payload}) {
    try {
        const items = yield select(s => s.dynamic_ui.start_data);
        const resp = request(...payload, ...items, {module: 'get_all_request'})

        yield putToStore(actions.getStatUser, resp)
    } catch (e) {
        yield put(error('error'));
    }

}


export const statsSaga = [
    takeLatest(actions.getStatUser.saga, getStatUserSaga),
]
