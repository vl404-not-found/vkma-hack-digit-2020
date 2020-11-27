import {putToStore} from "../utils";
import * as actions from './actions'
import {put, takeLatest} from "redux-saga/effects";
import {error} from 'react-toastify-redux'
import axios from 'axios';
import {ApiBaseURL} from "../../utils/consts";
import qs from "qs";

function* getStatUserSaga() {
    try {
        let config = {
            method: 'get',
            url: `${ApiBaseURL}?${qs.stringify({module: 'games', steam_id: 76561198176825319})}`,
            // url: 'https://scripthub.ru/cyber_mini_apps/api.php?module=games&steam_id=76561198176825319',
        };

        const resp = yield axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            });
        yield putToStore(actions.getStatUser, resp)
    } catch (e) {
        yield put(error('error'));
    }
}


export const statsSaga = [
    takeLatest(actions.getStatUser.saga, getStatUserSaga),
]
