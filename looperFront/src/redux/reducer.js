//state is an object
const defaultState = {
  all_states: [[["Nothing to see here", ""]]],
  current_state: 0
}

//Reducer should always return an object
const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case "SET_INIT_STATES":
      const all_states = action.payload
      return {all_states, current_state: 0 }

    default:
      return state
  }
}

export default reducer
