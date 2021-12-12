import React, { useState } from 'react'
import { InitializeUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { StyledInput, Text, StyledButton } from './StyledComponents'


const LoginCointainer = styled.div`
padding:100px;

`

const Login= () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const socket = useSelector(state => state.socket)


  const loginHandler = async (event) => {
    event.preventDefault()
    const credentials = {
      username : username,
      password : password
    }

    await dispatch(InitializeUser(socket, credentials))
    history.push('/yatzyroom')
    socket.emit('joined-yatzyroom', credentials.username)

  }
  console.log('inputfield rendered')
  return (
    <LoginCointainer>
      <Text>Log `n` roll! </Text>
      <form onSubmit = {loginHandler}>
        <div>
          <Text>Username</Text>
          <StyledInput
            id = 'username'
            type= "text"
            value = {username}
            name = "Username"
            onChange = {(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <Text>Password</Text>
          <StyledInput
            id = 'password'
            type= "text"
            value = {password}
            name = "Password"
            onChange = {
              ({ target }) => setPassword(target.value)}
          />
        </div>
        <StyledButton id = "login-button" type = "submit" > <Text>Log in</Text></StyledButton>
      </form>
    </LoginCointainer>
  )
}

export default Login