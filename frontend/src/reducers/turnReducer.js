

export const initializeTurn = (players) => {
  return async dispatch => {
    dispatch ( {
      type: 'INITIALIZETURN',
      maxTurns : players.length-1,
      turn: 0,
      player:players[0]

    })}}


export const nextTurn = (players, turn, maxTurns) => {
  return async dispatch => {
    const nextTurn = turn === maxTurns ? 0 : turn +1
    dispatch ( {
      type: 'NEXTTURN',
      maxTurns : players.length-1,
      turn: nextTurn,
      player: players[nextTurn]

    })}}

const turnReducer = (state  = {}, action) => {
  switch (action.type)
  {case 'INITIALIZETURN':
    return state = { turn:action.turn,
      maxTurns:action.maxTurns,
      player :action.player }
  case  'NEXTTURN':
    return state =  { turn:action.turn,
      maxTurns:action.maxTurns,
      player: action.player }
  default:
    return state
  }
}
export default turnReducer