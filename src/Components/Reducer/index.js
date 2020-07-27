import React from "react"
import axios from "axios"
import moment from "moment"
const SteinStore = require("stein-js-client")

const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
)

const BASE_URL =
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"

const initState = {
  list: {},
  lists: [],
  loading: false,
  errors: {},
}

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  ADD_LIST: "add-list",
  GET_LISTS: "get-lists",
  GET_ERRORS: "get-errors",
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ACTIONS.GET_LISTS:
      return {
        ...state,
        lists: action.payload,
        loading: false,
      }
    case ACTIONS.ADD_LIST:
      return {
        ...state,
        list: action.payload,
        loading: false,
      }
    case ACTIONS.GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export function useFetchList() {
  const [state, dispatch] = React.useReducer(reducer, initState)

  React.useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST })
    axios
      .get(BASE_URL + "/list")
      .then((res) =>
        dispatch({
          type: ACTIONS.GET_LISTS,
          payload: res.data,
        })
      )
      .catch((e) => {
        return dispatch({
          type: ACTIONS.GET_ERRORS,
          payload: e,
        })
      })
  }, [])

  return state
}

export function useAddList(data, submit) {
  const [state, dispatch] = React.useReducer(reducer, initState)

  React.useEffect(() => {
    if (!submit) return

    data[0].tglParsed = moment(data[0].tglParsed)

    dispatch({ type: ACTIONS.MAKE_REQUEST })

    store
      .append("list", data)
      .then((res) => {
        dispatch({
          type: ACTIONS.ADD_LIST,
          payload: res,
        })
        window.location.replace("/")
      })
      .catch((e) => {
        return dispatch({
          type: ACTIONS.GET_ERRORS,
          payload: e,
        })
      })
  }, [submit])

  return state
}
