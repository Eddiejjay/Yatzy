import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import userService from '../services/userService'
import styled from 'styled-components'
import { StyledInput, Text, StyledButton } from './StyledComponents'

const CreateUserCointainer = styled.div`
padding:100px;

`

const CreateUser = () => {

  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const loginHandler = async (event) => {
    event.preventDefault()
    const newUser = {
      username : username,
      password : password
    }
    await userService.createUser(newUser)
    history.push('/')
  }

  return (
    <CreateUserCointainer>
      <Text>Create new user</Text>
      <form onSubmit = {loginHandler}>
        <div>
          <Text>Username</Text>
          <StyledInput
            id = 'username'
            type= "text"
            valupdateue = {username}
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
        <StyledButton id = "login-button" type = "submit" ><Text>Create</Text></StyledButton>
      </form>
    </CreateUserCointainer>
  )
}

export default CreateUser