import {combineReducers, applyMiddleware, createStore} from "redux";
import {data, date} from "./reducers";
import stateData from '../data/initialState'

const logger = store => next => action => {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

const saver = store => next => action => {
    let result = next(action)
    localStorage['todolist-store'] = JSON.stringify(store.getState())
    return result
}

export const storeFactory = (initialState=stateData) =>
    applyMiddleware(logger, saver)(createStore)(
        combineReducers({data, date}),
        (localStorage['todolist-store']) ?
            JSON.parse(localStorage['todolist-store']) :
            initialState
    )