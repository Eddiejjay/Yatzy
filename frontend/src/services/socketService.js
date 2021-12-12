
export const addOnlineUserSocket = (socket, username) => {
  socket.emit('add-online-user', username)
}

export const addUserInPrivateYatzyRoom = (socket, username) => {
  socket.emit('add-private-room-user', username)
}
