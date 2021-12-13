import React from 'react'
import {
  useHistory
} from 'react-router-dom'
import styled from 'styled-components'
import { StyledButton, Text } from './StyledComponents'


const HomeContainer = styled.div`
height:1400px;
margin: 300px;
flex-direction: column;
align-items: center;
text-align: center;
 background-size: cover;

`
const Home = () => {
  const history = useHistory()
  const clicked = () => {
    history.push('/login')
  }
  const clicked2 = () => {
    history.push('/create')
  }

  return (
    <HomeContainer>
      <Text>Wanna roll some dices? </Text>
      <Text> Please logFGGDGFDGFGFG in or create a new user</Text>
      <StyledButton onClick = {clicked}><Text>Login</Text></StyledButton>
      <StyledButton onClick = {clicked2}><Text>Create user</Text></StyledButton>
    </HomeContainer>
  )
}


export default Home