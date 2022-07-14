
import React,{ useReducer,createContext } from "react";

const Store = createContext()

const userState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

function userReducer(state, action){
    switch(action.type){
        case 'USER_LOGIN':
            return {...state, user: action.payload}
        case 'USER_LOGOUT':
            return {...state, user: null}
        default:
            return state
    }
}

const StoreProvider = (props) => {
    const [state,dispatch] = useReducer(userReducer, userState)
    const value = {state, dispatch}
  return (
    <Store.Provider value={value}>
        {props.children}
    </Store.Provider>
  )
}

export {Store, StoreProvider}
