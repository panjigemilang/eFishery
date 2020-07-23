import React from "react"
import axios from "axios"

const BASE_URL =
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"

const initState = {
  fishes: [],
  loading: false,
  errors: {},
}

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_FISHES: "get-fishes",
  GET_ERRORS: "get-errors",
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ACTIONS.GET_FISHES:
      return {
        ...state,
        fishes: action.payload,
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

export function useFetchFish(params, page) {
  const [state, dispatch] = React.useReducer(reducer, initState)

  React.useEffect(() => {
    const cancelToken = axios.CancelToken.source()

    dispatch({ type: ACTIONS.MAKE_REQUEST })
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken.token,
        params: {
          page,
          ...params,
        },
      })
      .then((res) =>
        dispatch({
          type: ACTIONS.GET_FISHES,
          payload: res.data,
        })
      )
      .catch((e) => {
        if (axios.isCancel(e))
          return dispatch({
            type: ACTIONS.GET_ERRORS,
            payload: e,
          })
      })

    return () => {
      cancelToken.cancel()
    }
  }, [params, page])

  return state
}
