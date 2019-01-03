//state is an object
const defaultState = {
  all_states: [[""]],
  current_state: 0
}

//Reducer should always return an object
const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case "SET_INIT_STATES":
      const all_states = action.payload
      return {all_states, current_state: 0 }

    case "NEXT_STATE":
      const next_state = state.current_state + 1
      return {...state, current_state: next_state }

    case "PREV_STATE":
      const prev_state = state.current_state - 1
      return {...state, current_state: prev_state }



    default:
      return state
  }
}

export default reducer
