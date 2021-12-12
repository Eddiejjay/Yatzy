
export const setChat = (message) => {
  return async dispatch => {
    dispatch ( {
      type: 'SETCHATLOG',
      message : message
    })}}

const chatReducer = (state  = [], action) => {
  switch (action.type)
  {case 'SETCHATLOG':
    return state = [...state, action.message]
  default:
    return state
  }
}
export default chatReducer