

export const setPrivateRoom = (privateroom) => {
  return async dispatch => {
    dispatch ( {
      type: 'SETPRIVATEROOM',
      privateroom : privateroom
    })}}

const privateRoomReducer = (state  = '', action) => {
  switch (action.type)
  {case 'SETPRIVATEROOM':
    return state = action.privateroom
  default:
    return state
  }
}
export default privateRoomReducer