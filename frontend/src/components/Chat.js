import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StyledButton, Text, StyledInput, ChatBox, StyledMessage, MessageContainer } from './StyledComponents'
import { useSelector } from 'react-redux'

const Container = styled.div `
display:flex;
flex-direction: row;
justify-content: center;
padding:10px;

`

const Chat = () => {
  const username = useSelector(state => state.user.username )
  const [chatList, setChatList] = useState([])
  const [message, setMessage] = useState('')
  const [usersInLobby, setUsersInLobby] = useState([])
  const socket = useSelector(state => state.socket)
  const jorma = ''

  useEffect(() => {
    socket.on('joined-username-back-from-server', username => {
      setChatList([...chatList, `${username} joined YatzyRoom`])
      setUsersInLobby([...usersInLobby, username])
    })
    socket.on('new-private-room-created',(pRoom, user) => {
      setChatList([...chatList, `New Private Yatzyroom ${pRoom} created by ${user}`])
    })
  },[jorma])

  useEffect(() => {
    socket.on('chat-message-back-to-all-sockets', message => {
      setChatList([...chatList, message])
    })
    return () => {socket.off('chat-message-back-to-all-sockets')}
  },[chatList])



  const handleKeypress = e => {
    if (e.key === 'Enter') {
      sendButtonClicked()
    }
  }

  const sendButtonClicked = () => {
    socket.emit('chat-message',message ,username)
    setChatList([...chatList,`${username}: ${message}`])
    setMessage('')

  }

  return (
    <Container>
      <ChatBox>
        <MessageContainer>
          {chatList.map(item => <StyledMessage  key = {`${item}${Math.random()}`}>{item}</StyledMessage>)}
        </MessageContainer>
        <StyledInput  onKeyPress={handleKeypress} style={{ margin: '20px' }} onChange = {(event) => setMessage(event.target.value)}
          id = 'message'
          type= "text"
          value = {message}
          name = "MessageInput"></StyledInput><StyledButton onClick = {sendButtonClicked}><Text>Send</Text></StyledButton>
      </ChatBox>
      {/* <UsersInLobby>
        <p>Players In YatzyRoom</p>
        {usersInLobby.map(item => <StyledMessage key = {item}>{item}</StyledMessage>)}
      </UsersInLobby> */}
    </Container>
  )
}


export default Chat