export const setInitStates = (states) => {
  return {
    type: "SET_INIT_STATES",
    payload: states
  }

}
export const setError = (error) => {
  return {
    type: "SET_ERROR",
    payload: error
  }
}

export const nextState = () => {
  return {
    type: "NEXT_STATE"
  }
}

export const prevState = () => {
  return {
    type: "PREV_STATE"
  }
}
