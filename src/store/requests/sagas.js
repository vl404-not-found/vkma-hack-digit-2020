import {put, select, takeLatest} from "redux-saga/effects";
import {request} from "../utils/axios";
import {putToStore} from "../utils";
import * as actions from "./actions";
import {error} from "react-toastify-redux";


function* getRequestsSaga ({$payload}) {
    try {
        const items = yield select(s => s.dynamic_ui.start_data);
        const resp = yield request({...items, ...{module: 'get_all_solo_request'}})
        console.log(resp)
        yield putToStore(actions.getRequestsMain, resp)
    } catch (e) {
        yield put(error('error req'));
    }
}
function* getComRequestsSaga ({$payload}) {
    try {
        const items = yield select(s => s.dynamic_ui.start_data);
        const resp = yield request({...items, ...{module: 'get_all_team_request'}})
        console.log(resp)
        yield putToStore(actions.getRequestsCom, resp)
    } catch (e) {
        yield put(error('error req'));
    }
}

function* getYourRequestsSaga ({$payload}) {
    try {
        const items = yield select(s => s.dynamic_ui.start_data);
        const resp = yield request({...items, ...{module: 'get_my_request'}})
        console.log(resp)
        yield putToStore(actions.getRequestsYour, resp)
    } catch (e) {
        yield put(error('error req'));
    }
}

function* postRequestsTextReqSaga ({$payload}) {
    try {
        const items = yield select(s => s.dynamic_ui.start_data);
        const resp = yield request({...items, ...{module: 'add_request'}, ...$payload})
        console.log(resp)
        yield put(error('Заявка создана!'));
          } catch (e) {
              yield put(error('error req'));
          }

    }
function* backendRegSaga ({$payload}) {
    try {
        const items = yield select(s => s.dynamic_ui.start_data);
        const resp = yield request({...items, ...{module: 'first_auth'}})
        console.log(resp)
    } catch (e) {
        yield put(error('error req'));
    }
}
function* getSteamGameSaga ({$payload}) {
    try {
        const items = yield select(s => s.dynamic_ui.start_data);
        const resp = yield request({...items, ...{module: 'get_all_games'}})
        yield putToStore(actions.getSteamGame, resp)
        console.log(resp)
    } catch (e) {
        yield put(error('error req'));
    }
}


export const requestSaga = [
    takeLatest(actions.getRequestsMain.saga, getRequestsSaga),
    takeLatest(actions.getRequestsCom.saga, getComRequestsSaga),
    takeLatest(actions.getRequestsYour.saga, getYourRequestsSaga),
    takeLatest(actions.postRequestsTextReq.saga, postRequestsTextReqSaga),
    takeLatest(actions.backendReg.saga, backendRegSaga),
    takeLatest(actions.getSteamGame.saga, getSteamGameSaga),
]
