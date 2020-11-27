import bridge from "@vkontakte/vk-bridge";
import {putToStore} from "../utils";
import * as actions from './actions'
import {put, select, takeLatest} from "redux-saga/effects";
import {store} from '../index'
import {error} from 'react-toastify-redux'
import {ApiBaseURL} from "../../utils/consts";
import qs from "qs";
import axios from "axios";

function* subscribeSaga() {
    try {
        yield bridge.send("VKWebAppInit");
        // yield bridge.subscribe(({detail: {type, data}}) => {
        //     if (type === 'VKWebAppUpdateConfig') {
        //         const schemeAttribute = document.createAttribute('scheme');
        //         schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
        //         document.body.attributes.setNamedItem(schemeAttribute);
        //     }
        // });
        yield putToStore(actions.subscribeVKEvents, bridge)
    } catch (e) {
        yield put(error('error'));
    }
}

const getItems = state => state.dynamic_ui

function* backendAuthSaga() {
    try {
        const items = yield select(getItems);
        let config = {
            method: 'get',
            url: `${ApiBaseURL}?${qs.stringify({module: 'add_request', text: '123', game_id: '1', ...items.start_data})}`,
            // add_request&text=123&game_id=1&user_id=XXXX
            // url: 'https://scripthub.ru/cyber_mini_apps/api.php?module=games&steam_id=76561198176825319',
        };

        yield axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            });
        yield put(error('ok'))

    } catch (e){
        yield put(error('error'))
    }
}


function* userGetSaga() {
    try {
        const toStore = yield store.getState()
            .vk_data.bridge.send('VKWebAppGetUserInfo')
            .then(function (response) {
                return response
            })
        yield putToStore(actions.userGet, toStore)
    } catch (e){
        yield put(error('error'));
    }
}


export const vkDataSaga = [
    takeLatest(actions.subscribeVKEvents.saga, subscribeSaga),
    takeLatest(actions.userGet.saga, userGetSaga),
    takeLatest(actions.backendAuth.saga, backendAuthSaga)
]
