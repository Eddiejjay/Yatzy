import React, { useEffect } from 'react'
import { StyledButton, Text  } from './StyledComponents'
import pointService from '../services/pointService'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializePoints } from '../reducers/pointsReducer'
import { initializeTurn } from '../reducers/turnReducer'
import { initializePlayers }  from '../reducers/playerReducer'
import { useSelector } from 'react-redux'


const EndGameButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const socket = useSelector(state => state.socket)
  const jorma = ''

  useEffect(() => {
    socket.on('end-game-signal-from-server',() => {
      history.push('/yatzyroom')
      dispatch(initializePlayers([]))
      dispatch(initializeTurn([]))
      dispatch(initializePoints([]))

    })

  },[jorma])

  const deletePointsFromDb = () => {
    pointService.deleteAll()
  }

  const endGameClicked = () => {
    socket.emit('end-game')
    deletePointsFromDb()
  }

  return (
    <StyledButton onClick = {endGameClicked}><Text>End Game</Text></StyledButton>
  )
}

export default EndGameButton