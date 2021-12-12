import React, { useEffect } from 'react'
import { io } from 'socket.io-client'
import styled from 'styled-components'
import YatzyTable from './components/YatzyTable'
import Login from './components/Login'
import Home from './components/Home'
import YatzyRoom from './components/YatzyRoom'
import CreateUser from './components/CreateUser'
import { useDispatch, useSelector } from 'react-redux'
import { initializePlayers }  from './reducers/playerReducer'
import Dices from './components/Dices'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import { initializePoints } from './reducers/pointsReducer'
import EndGameButton from './components/EndGameButton'
import LogOutLink from './components/LogOutLink'
import { initializeTurn } from './reducers/turnReducer'
import { addOnlineUser } from './reducers/onlineUsersReducer'
import YatzyChat from './components/YatzyChat'
import { Text, NavBar, NavBarText, StyledLink, StyledButton, HeadingText } from './components/StyledComponents'
import { setSocket } from './reducers/socketReducer'

const Container = styled.div `
  display:flex;
  flex-direction: row;
  justify-content: center;
  padding:10px;
  align-items: flex-start;
  `

const App = () => {
  const dispatch = useDispatch()
  let socket =  useSelector(state => state.socket)
  const user = useSelector(state => state.user)
  const points = useSelector(state => state.points)
  const turn = useSelector(state => state.turn.player)
  // const endPoint = 'http://localhost:3003'
  const endPoint = ''

  useEffect(() => {
    let socket = io(endPoint)
    dispatch(setSocket(socket))
    socket.on('online-user-back-to-all', username => {
      dispatch(addOnlineUser(username))
    })
    socket.on('delete-user-from-players-in-lobby',(socketId) => {
      console.log('userDELETED FROM lobbylist with id ', socketId)
    })
    socket.on('sockets-yatzy-room',(sockets) => {
      console.log('sockets in yatzyroom client ', sockets)
    })
    socket.on('players-in-private-yatzyroom', players => {
      dispatch(initializePlayers(players))
      dispatch(initializeTurn(players))
      dispatch(initializePoints(players))
    })

  },[endPoint])

  const startGameClicked = () => {
    socket.emit('give-private-players')
  }

  return (
    <Router>
      <NavBar>
        <StyledLink>  <Link style={{ textDecoration: 'none' }} to="/"><NavBarText>Home</NavBarText></Link></StyledLink>
        {user && <Text>{user.username} logged in</Text>}
        {/* <Link  to="/">home</Link>, */}
        {/* <Link  to="/yatzy">yatzy</Link>, */}
        {/* <StyledLink><Link  to="/yatzyroom"><Text>Yatzyroom</Text></Link></StyledLink> */}
        {user && <StyledLink><Link style={{ textDecoration: 'none' }}  to="/yatzyroom"><NavBarText>Yatzyroom</NavBarText></Link></StyledLink>}
        {user && <LogOutLink></LogOutLink>}
        {user === null && <StyledLink><Link style={{ textDecoration: 'none' }}to="/login"><NavBarText>Login</NavBarText></Link></StyledLink>}
        {user === null && <StyledLink><Link style={{ textDecoration: 'none' }} to="/create"><NavBarText>Create user</NavBarText></Link></StyledLink>}
        {/* <StyledImg src={logo} alt="Logo" /> */}
      </NavBar>
      <Switch>
        <Route path="/yatzy">
          <HeadingText>Private YatzyHazyMazy</HeadingText>
          {points.length !== 0 && <Dices></Dices> }
          <Container>
            {points.length !== 0 && <YatzyTable></YatzyTable> }
            {points.length !== 0 && <Text>{turn}n  turn</Text> }
            <YatzyChat></YatzyChat>
          </Container>
          {/* <button onClick = {deletePointsFromDb}>delete points from database</button> */}
          {points.length === 0 && <StyledButton onClick = {startGameClicked}><Text>Start Game</Text></StyledButton>}
          {points.length !== 0 && <EndGameButton></EndGameButton>}
        </Route>
        <Route path="/yatzyroom">
          <YatzyRoom></YatzyRoom>
        </Route>
        <Route path="/create">
          <div>
            <CreateUser></CreateUser>
          </div>
        </Route>
        <Route path="/login">
          <div>
            <Login></Login>
          </div>
        </Route>
        <Route path="/">
          <div>
            <Home></Home>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
