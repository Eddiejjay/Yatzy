import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addTurnsPoints }  from '../reducers/pointsReducer'
import { nextTurn } from '../reducers/turnReducer'
import { StyledButton, ButtonText, StyledTable, Combination, StyledRow, StyledCell, LogoCell, NameCell } from './StyledComponents'
import { Text } from './StyledComponents'

const StyledInput = styled.input`
width : 65px;   
        border-style: double;
        background: transparent;
        border: 3px groove rgba(164,164,164,0.17);
        &:hover {
          background: #fff0db;
          
        }
        `

const YatzyTable = () => {
  const dispatch = useDispatch()
  const [combinationPlayer, setCombinationPlayer] = useState([])
  const properties =
    [  'ykkoset','kakkoset','kolmoset','neloset','vitoset','kutoset','valisumma','bonus','pari','kaksiparia',
      'kolmesamaa','neljasamaa', 'pikkusuora','isosuora','tayskasi','sattuma','yatzy','pisteet']
  const players = useSelector(state => state.players)
  const turn = useSelector(state => state.turn)
  const allPoints = useSelector(state => state.points)
  const socket = useSelector(state => state.socket)
  const jorma = ''

  useEffect(() => {
    socket.on('valisummaPoints',(allPoints) => {
      allPoints.map(object => dispatch(addTurnsPoints(object.player, 'valisumma', calculateValisumma(object.points))))
      allPoints.map(object => dispatch(addTurnsPoints(object.player, 'bonus', calculateValisumma(object.points) < 63 ? 0: 50)))
    })
    socket.on('allPoints',(allPoints) => {
      allPoints.map(object => dispatch(addTurnsPoints(object.player, 'pisteet', calculateAllpoints(object.points))))
    })
  },[jorma])

  useEffect(() => {
    socket.on('turns-stats',(player, combination, points) => {
      dispatch(addTurnsPoints(player, combination, Number(points)))
      dispatch(nextTurn(players, turn.turn, turn.maxTurns))
    })
    return () => {socket.off('turns-stats')}
  },[turn])


  const inputChange = (event) => {
    event.preventDefault()
    const arr = event.target.name.split(',')
    arr.push(event.target.value)
    setCombinationPlayer(arr)
  }


  const readyClicked = () => {
    const playerToAddPoints = combinationPlayer[1]
    const combinationToAddPoints = combinationPlayer[0]
    const pointsToAdd = combinationPlayer[2]
    dispatch(addTurnsPoints(playerToAddPoints, combinationToAddPoints, Number(pointsToAdd)))
    socket.emit('turn-ready', playerToAddPoints, combinationToAddPoints, pointsToAdd, turn.turn, turn.maxturns)
    dispatch(nextTurn(players, turn.turn, turn.maxTurns))
  }

  const valisummaOnClick = () => {
    allPoints.map(object => dispatch(addTurnsPoints(object.player, 'valisumma', calculateValisumma(object.points))))
    allPoints.map(object => dispatch(addTurnsPoints(object.player, 'bonus', calculateValisumma(object.points) < 63 ? 0: 50)))
    socket.emit('valisumma-calculation', allPoints)
  }

  const allPointsOnClick = () => {
    allPoints.map(object => dispatch(addTurnsPoints(object.player, 'pisteet', calculateAllpoints(object.points))))
    socket.emit('allPoints-calculation', allPoints)
  }

  const calculateAllpoints = (points) => {
    const pointsArray = Object.values(points)
    const slicedArray = pointsArray.slice(6,15)
    let sum = slicedArray.reduce((a,c) => a + c, 0)
    return sum
  }

  const calculateValisumma = (points) => {
    const pointsArray = Object.values(points)
    const slicedArray = pointsArray.slice(0,6)
    let sum = slicedArray.reduce((a,c) => a + c, 0)
    return sum
  }

  return (
    <div>
      <StyledTable>
        <tbody><StyledRow><LogoCell></LogoCell>{players.map(player => <NameCell key={'nimikentta'+player}>{player}</NameCell>)}</StyledRow>
          <StyledRow>
            <Combination>{properties[0]}</Combination>
            {allPoints.map(points => (points.points.ykkoset === 0 && points.player === turn.player) ?<td key = {'ykkosetinput'+points.player}><StyledInput name={[properties[0], points.player]} onChange={inputChange}/> </td> :<StyledCell name = {points.player} key = {'ykkoset'+points.player}> {points.points.ykkoset} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[1]}</Combination>
            {allPoints.map(points => (points.points.kakkoset === 0 && points.player === turn.player)?<td key = {'kakkosetinput'+points.player}><StyledInput name={[properties[1], points.player]} onChange={inputChange}/> </td> :<StyledCell name = {points.player} key = {'kakkoset'+points.player}> {points.points.kakkoset} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[2]}</Combination>
            {allPoints.map(points => (points.points.kolmoset === 0 && points.player === turn.player) ?<td key = {'kolmosetinput'+points.player}><StyledInput name={[properties[2], points.player]} onChange={inputChange}/> </td>:<StyledCell name = {points.player} key = {'kolmoset'+points.player}> {points.points.kolmoset} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[3]}</Combination>
            {allPoints.map(points => (points.points.neloset === 0 && points.player === turn.player) ?<td key = {'nelosettinput'+points.player}><StyledInput name={[properties[3], points.player]} onChange={inputChange}/> </td>:<StyledCell name = {points.player} key = {'neloset'+points.player}> {points.points.neloset} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[4]}</Combination>
            {allPoints.map(points => (points.points.vitoset === 0 && points.player === turn.player)?<td key = {'vitosetinput'+points.player}><StyledInput name={[properties[4], points.player]} onChange={inputChange}/> </td>:<StyledCell name = {points.player} key = {'vitoset'+points.player}> {points.points.vitoset} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[5]}</Combination>
            {allPoints.map(points => (points.points.kutoset === 0 && points.player === turn.player)?<td key = {'kutosetinput'+points.player}><StyledInput name={[properties[5], points.player]} onChange={inputChange}/></td> :<StyledCell name = {points.player} key = {'kutoset'+points.player}> {points.points.kutoset} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[6]}</Combination>
            {allPoints.map(points =>  <StyledCell name = {points.player} key = {'valisumma'+points.player}> {points.points.valisumma} </StyledCell>)}
            <td><StyledButton  onClick={valisummaOnClick}><ButtonText>Laske</ButtonText></StyledButton></td>
          </StyledRow>
          <StyledRow>
            <Combination>{properties[7]}</Combination>
            {allPoints.map(points => <StyledCell name = {points.player} key = {'bonus'+points.player}> {points.points.bonus} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[8]}</Combination>
            {allPoints.map(points => (points.points.pari === 0 && points.player === turn.player) ?<td key = {'pariinput'+points.player}><StyledInput name={[properties[8], points.player]} onChange={inputChange}/> </td>:<StyledCell name = {points.player} key = {'pari'+points.player}> {points.points.pari} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[9]}</Combination>
            {allPoints.map(points => (points.points.kaksiparia === 0 && points.player === turn.player) ?<td key = {'kaksipariainput'+points.player}><StyledInput name={[properties[9], points.player]} onChange={inputChange}/> </td>:<StyledCell name = {points.player} key = {'kaksiparia'+points.player}> {points.points.kaksiparia} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[10]}</Combination>
            {allPoints.map(points => (points.points.kolmesamaa === 0 && points.player === turn.player) ?<td key = {'kolmesamaainput'+points.player}><StyledInput name={[properties[10], points.player]} onChange={inputChange}/> </td>:<StyledCell name = {points.player} key = {'kolmesamaa'+points.player}> {points.points.kolmesamaa} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[11]}</Combination>
            {allPoints.map(points => (points.points.neljasamaa === 0 && points.player === turn.player) ?<td key = {'neljasamaainput'+points.player}><StyledInput name={[properties[11], points.player]} onChange={inputChange}/> </td>:<StyledCell name = {points.player} key = {'neljasamaa'+points.player}> {points.points.neljasamaa} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[12]}</Combination>
            {allPoints.map(points => (points.points.pikkusuora === 0 && points.player === turn.player) ?<td key = {'pikkusuorainput'+points.player}><StyledInput name={[properties[12], points.player]} onChange={inputChange}/> </td>:<StyledCell name = {points.player} key = {'pikkusuora'+points.player}> {points.points.pikkusuora} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[13]}</Combination>
            {allPoints.map(points => (points.points.isosuora === 0 && points.player === turn.player) ?<td key = {'isosuorainput'+points.player}><StyledInput name={[properties[13], points.player]} onChange={inputChange}/> </td>:<StyledCell name = {points.player} key = {'isosuora'+points.player}> {points.points.isosuora} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[14]}</Combination>
            {allPoints.map(points => (points.points.tayskasi === 0 && points.player === turn.player) ?<td key = {'tayskasiinput'+points.player}><StyledInput name={[properties[14], points.player]} onChange={inputChange}/> </td>:<StyledCell name = {points.player} key = {'tayskasi'+points.player}> {points.points.tayskasi} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[15]}</Combination>
            {allPoints.map(points => (points.points.sattuma === 0 && points.player === turn.player) ?<td key = {'sattumainput'+points.player}><StyledInput name={[properties[15], points.player]} onChange={inputChange}/> </td>:<StyledCell name = {points.player} key = {'sattuma'+points.player}> {points.points.sattuma} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[16]}</Combination>
            {allPoints.map(points => (points.points.yatzy === 0 && points.player === turn.player) ?<td key = {'yatzyinput'+points.player}><StyledInput name={[properties[16], points.player]} onChange={inputChange}/> </td>:<StyledCell name = {points.player} key = {'yatzy'+points.player}> {points.points.yatzy} </StyledCell>)}
          </StyledRow>
          <StyledRow>
            <Combination>{properties[17]}</Combination>
            {allPoints.map(points => <StyledCell name = {points.player} key = {'pisteet'+points.player}> {points.points.pisteet} </StyledCell>)}
            <td><StyledButton onClick={allPointsOnClick}><ButtonText>Laske</ButtonText></StyledButton></td>
          </StyledRow>
        </tbody>
      </StyledTable>
      <StyledButton onClick ={readyClicked}><Text>Ready</Text></StyledButton>
    </div>
  )
}


export default YatzyTable
