import {toastsReducer as toasts} from 'react-toastify-redux';
import {compose, createStore, applyMiddleware} from 'redux';
import {LoaderMiddleware} from "./middleware/Loader";
import createSagaMiddleware from 'redux-saga';
import {uiReducer} from './dynamicui/reducer'
import {vkReducer} from "./vkdata/reducer";
import {vkDataSaga} from "./vkdata/sagas";
import {all} from 'redux-saga/effects';
import {combineReducers} from 'redux';
import {statsReducer} from "./stats/reducer";
import {statsSaga} from "./stats/sagas";
import {reqReducer} from "./requests/reducer";
import {requestSaga} from "./requests/sagas";
import {gamesSaga} from "./games/sagas";
import {gamesReducer} from "./games/reducer";

const createRootReducer = () => combineReducers({
    dynamic_ui: uiReducer,
    vk_data: vkReducer,
    stats: statsReducer,
    requests: reqReducer,
    games: gamesReducer,
    toasts
});


function* rootSaga() {
    yield all([
        ...vkDataSaga,
        ...statsSaga,
        ...requestSaga,
        ...gamesSaga
    ]);
}


const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    createRootReducer(),
    composeWithDevTools(
        applyMiddleware(
            LoaderMiddleware,
            sagaMiddleware,
        ),
    ),
);

store.replaceReducer(createRootReducer())

sagaMiddleware.run(rootSaga);

