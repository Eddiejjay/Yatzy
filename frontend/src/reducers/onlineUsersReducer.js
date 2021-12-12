
export const addOnlineUser = (user) => {
  return async dispatch => {
    dispatch ( {
      type: 'ADDUSER',
      user : user

    })}}

const onlineUsersReducer = (state  = [], action) => {
  switch (action.type)
  {case 'ADDUSER':
    return state = state.concat(action.user)
  default:
    return state
  }
}
export default onlineUsersReducer