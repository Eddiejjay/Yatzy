
export const initializePlayers = (players) => {
  return async dispatch => {
    dispatch ( {
      type: 'INITPLAYERS',
      players : players

    })}}
const pointsReducer = (state  = [], action) => {
  switch (action.type)
  {case 'INITPLAYERS':
    return state = action.players
  default:
    return state
  }
}
export default pointsReducer