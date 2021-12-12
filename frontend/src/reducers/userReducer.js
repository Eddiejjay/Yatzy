

import userService from '../services/userService'
import { addOnlineUserSocket } from '../services/socketService'

export const InitializeUser = (socket, credentials) => {
  return async (dispatch) => {
    const user = await userService.login(credentials)
    addOnlineUserSocket(socket, user.username)
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user))
    dispatch ({
      type: 'STOREUSER',
      user :user
    })
  }}

export const storeUser = ( user) => {
  return {
    type: 'STOREUSER',
    user:user
  }
}

const initialUser = null
const userReducer = (state  = initialUser, action) => {
  switch (action.type)
  {case 'STOREUSER':
    return state = action.user
  default:
    return state
  }
}
export default userReducer