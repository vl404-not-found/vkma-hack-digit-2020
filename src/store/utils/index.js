import { put } from 'redux-saga/effects';

//создание стандартного экшена
export const createAction = type => (payload = {}) => {
    return {
        type: type,
        $payload: payload,
    };
};


//создание экшена для саги
export const defineAction = namespace => name => {
    const action = `${namespace}/${name}`;
    const SET = `${action}[SET]`;
    const SAGA = `${action}[SAGA]`;
    const set = createAction(SET);
    const saga = createAction(SAGA);
    set.toString = () => SET;
    saga.toString = () => SAGA;
    return {
        set,
        saga,
        _action: action,
    };
};

//простой экшен - либо сагу вызвать, либо в стор записать
export const defineSimpleAction = namespace => name => {
    const action = `${namespace}/${name}`;
    const fn = createAction(action);
    fn.toString = () => action;
    fn._action = action;
    return fn;
};

export const connectSagaActions = actions =>
    Object.fromEntries(Object.entries(actions).map(([key, action]) => [key, action.saga]));


export const createReducer = (initialState, actions) => {
    return (state = initialState, action) => {
        return action.type in actions ? actions[action.type](state, action.$payload) : state;
    };
};


export const putToStore = (action, payload) => put(action.set(payload));
