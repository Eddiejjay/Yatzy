import React from 'react'
import Chat from './Chat'
import JoinPrivateYatzyRoom from './JoinPrivateYatzyRoom'
import styled from 'styled-components'
import { HeadingText } from './StyledComponents'

const Container = styled.div `
display:flex;
flex-direction: column;
justify-content: flex-start;
padding:10px;
`
const YatzyRoom = () => {
  return (
    <Container>
      <HeadingText> Welcome to YatzyHazyMazy</HeadingText>
      <Chat></Chat>
      <JoinPrivateYatzyRoom></JoinPrivateYatzyRoom>
    </Container>
  )
}


export default YatzyRoom