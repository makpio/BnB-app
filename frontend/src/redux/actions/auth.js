import axios from "axios"
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as actionTypes from "./actionsTypes"
import * as reducers from "../reducers/auth"

const reducer = combineReducers(reducers)
// applyMiddleware supercharges createStore with middleware:
const store = createStore(reducer, applyMiddleware(thunk))

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSucces = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  }
}

export const logout = () => {
  localStorage.removeItem("username")
  localStorage.removeItem("expirationDate")
  localStorage.removeItem("token")
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const authLogin = (username, password) => {
  return (dispatch) => {
   dispatch(authStart())
    axios
      .post("http://localhost:8000/rest-auth/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.key
        const expirationDate = new Date(new Date().getTime() + 3600 * 3 * 2000)
        localStorage.setItem("username", username)
        localStorage.setItem("token", token)
        localStorage.setItem("expirationDate", expirationDate)
        dispatch(authSucces(token))
        dispatch(checkAuthTimeOut(3600 * 3))
      })
      .catch((err) => {
        dispatch(authFail(err))
      })
  }
}

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart())
    axios
      .post("http://localhost:8000/rest-auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key
        const expirationDate = new Date(new Date().getTime() + 3600 * 3 * 2000)
        localStorage.setItem("username", username)
        localStorage.setItem("token", token)
        localStorage.setItem("expirationDate", expirationDate)
        dispatch(authSucces(token))
        dispatch(checkAuthTimeOut(3600 * 3))
      })
      .catch((err) => {
        dispatch(authFail(err))
      })
  }
}

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token")
    if (token === undefined) {
        store.dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"))
      if (expirationDate <= new Date()) {
        store.dispatch(logout())
      } else {
        dispatch(authSucces(token))
        store.dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}
