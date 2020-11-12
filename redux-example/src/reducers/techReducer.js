/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import {
  ADD_TECH,
  GET_TECHS,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR
} from '../actions/types'

const initialState = {
  techs: null,
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
        loading: false
      }
    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload],
        loading: false
      }
    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter(t => t.id !== action.payload),
        loading: false
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case TECHS_ERROR:
      console.error(action.payload)
      return {
        ...state,
        error: action.payload,
        loading: false
      }
  }
}
