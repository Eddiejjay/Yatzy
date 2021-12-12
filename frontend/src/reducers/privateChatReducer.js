
export const setPrivateChat = (message) => {
  return async dispatch => {
    dispatch ( {
      type: 'SETCHATLOG',
      message : message
    })}}

const privateChatReducer = (state  = [], action) => {
  switch (action.type)
  {case 'SETCHATLOG':
    return state = [...state, action.message]
  default:
    return state
  }
}
export default privateChatReducer