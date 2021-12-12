import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'


import Dice from 'react-dice-roll'
import styled from 'styled-components'


const StyledDices = styled.div`
height:200px;
display:flex;
padding: 10px;
align-content: stretch;
justify-content: center;
gap: 3%;
`

const Dices = () => {
  const socket = useSelector(state => state.socket)
  const diceRef1 = useRef()
  const diceRef2 = useRef()
  const diceRef3 = useRef()
  const diceRef4 = useRef()
  const diceRef5 = useRef()

  const diceRefMap = {
    dice1: diceRef1,
    dice2: diceRef2,
    dice3: diceRef3,
    dice4: diceRef4,
    dice5: diceRef5,
  }


  const turn = useSelector(state => state.turn.player)
  const user = useSelector(state => state.user.username)


  useEffect(() => {
    socket.on('dice-value-back-form-server',(value, diceNro) => {
      diceRefMap[diceNro].current.rollDice(value)
    })
    return () => {socket.off('dice-value-back-form-server')}
  },[diceRefMap])

  const diceValueToServer = (value, diceNro) => {
    if (turn === user) {
      socket.emit('dice-value', value, diceNro)
    }}

  return (
    <StyledDices>
      <Dice ref ={diceRef1} size={100} onRoll={(value) => diceValueToServer(value, 'dice1')}></Dice>
      <Dice ref ={diceRef2} size={100} onRoll={(value) => diceValueToServer(value, 'dice2')}></Dice>
      <Dice ref ={diceRef3} size={100} onRoll={(value) => diceValueToServer(value, 'dice3')}></Dice>
      <Dice ref ={diceRef4} size={100} onRoll={(value) => diceValueToServer(value, 'dice4')}></Dice>
      <Dice ref ={diceRef5} size={100} onRoll={(value) => diceValueToServer(value, 'dice5')}></Dice>
    </StyledDices>
  )
}

export default Dices
