import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import { createStore,  applyMiddleware, combineReducers } from 'redux'
import pointsReducer from './reducers/pointsReducer'
import playerReducer from './reducers/playerReducer'
import userReducer from './reducers/userReducer'
import turnReducer from './reducers/turnReducer'
import onlineUsersReducer from './reducers/onlineUsersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import backgroundMountain from './images/background-mountain.jpg'
import diceReducer from './reducers/diceReducer'
import privateRoomReducer from './reducers/privateRoomReducer'
import privateChatReducer from './reducers/privateChatReducer'
import socketReducer from './reducers/socketReducer'
import chatReducer from './reducers/chatReducer'

const Container = styled.div`
height:2000px;
flex-direction: column;
align-items: center;
text-align: center;
 background: url(${backgroundMountain})no-repeat center fixed; 
 background-size: cover;

`
const reducer = combineReducers({
  points: pointsReducer,
  players: playerReducer,
  turn : turnReducer,
  user : userReducer,
  onlineUsers : onlineUsersReducer,
  dice : diceReducer,
  privateRoom: privateRoomReducer,
  privatechatLog : privateChatReducer,
  socket : socketReducer,
  chatLog : chatReducer
})

const store = createStore(reducer,
  composeWithDevTools( applyMiddleware(thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <Container>
      <App   />
    </Container>
  </Provider>,
  document.getElementById('root')
)

