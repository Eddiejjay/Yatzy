

export const setSocket = (socket) => {
  return async dispatch => {
    dispatch ( {
      type: 'SETSOCKET',
      socket : socket    })}}

const socketReducer = (state  = '', action) => {
  switch (action.type)
  {case 'SETSOCKET':
    return state = action.socket
  default:
    return state
  }
}
export default socketReducer