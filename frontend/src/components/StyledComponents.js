import styled from 'styled-components'

export const Text = styled.div `
  padding: 12px;
  color:white;
  font-family: "Comic Sans MS", cursive, sans-serif;
 font-size: 25px;
 letter-spacing: 2px;
 word-spacing: 2px;
 
 font-weight: 700;
 text-decoration: none solid rgb(68, 68, 68);
 font-style: italic;
 font-variant: small-caps;
 text-transform: capitalize;`

export const NavBarText = styled.div `
padding: 0px;
color:white;
font-family: "Comic Sans MS", cursive, sans-serif;
font-size: 25px;
letter-spacing: 2px;
word-spacing: 2px;

font-weight: 700;
text-decoration: none solid rgb(68, 68, 68);
font-style: italic;
font-variant: small-caps;
text-transform: capitalize;`



export const StyledButton = styled.button `
margin: 10px;
padding:0x;
background: transparent;
border: 5px groove rgba(20,20,20,0.17);
&:hover {
  background: 	rgb(255,240,219,0.5)
  
}


`
export const ButtonText = styled.div `
  padding: 12px;
  color:white;
  font-family: "Comic Sans MS", cursive, sans-serif;
 font-size: 17x;
 letter-spacing: 2px;
 word-spacing: 2px;
 
 font-weight: 700;
 text-decoration: none solid rgb(68, 68, 68);
 font-style: italic;
 font-variant: small-caps;
 text-transform: capitalize;`

export const StyledInput = styled.input`

padding:6px;
font-size: 25px;
border-width: 0px;
box-shadow: 0px 0px 5px rgba(66,66,66,.75);
   background: transparent;
   border: 5px groove rgba(20,20,20,0.17);
   &:hover {
    background: rgb(250, 249, 249,0.4)
    
  }
   
`
export const StyledLink = styled.div `
font-family: "Lucida Console", Monaco, monospace;
font-size: 27px;
letter-spacing: 0px;
word-spacing: 0px;
color: #000000;
font-weight: 700;
text-decoration: none;
font-style: normal;
font-variant: normal;
text-transform: none;
padding: 10px;
textDecoration: 'none';
&:hover {
background: rgb(255,240,219,0.5)
}

`
export const NavBar = styled.nav`
display: flex;
flex-direction: row;
background: rgba(7,7,7, 0.1);
justify-content: space-around;
height : 45px;

`
export const ChatBox = styled.div `
border: 10px groove rgba(20,20,20,0.17);
box-sizing: content-box;
margin: 75px;
width: 1200px;
height: 400px;
padding: 5px;
display:flex;
flex-direction: column;
justify-content: flex-end;
overflow: auto;
`

export const StyledMessage = styled.div`
width: 900px;
color:black;
font-size: 25px;
justify-content: left;
text-align: left;

`
export const MessageContainer = styled.div`
overflow-y: scroll
`

export const HeadingText = styled.div `
  padding: 12px;
  color:white;
  font-family: "Comic Sans MS", cursive, sans-serif;
 font-size: 40px;
 letter-spacing: 2px;
 word-spacing: 2px;
 
 font-weight: 700;
 text-decoration: none solid rgb(68, 68, 68);
 font-style: italic;
 font-variant: small-caps;
 text-transform: capitalize;`

export const StyledTable = styled.table `
    margin-left: auto;
    margin-right: auto;
    display:flex;
    justify-content: center;
    row-gap: 20px;
    column-gap: 2rem;
    border-collapse: collapse; 
    `
export const Combination = styled.td `
display:flex;
justify-content:center;
 color:white;
 font-family: "Comic Sans MS", cursive, sans-serif;
font-size: 25px;
letter-spacing: 2px;
word-spacing: 2px;

font-weight: 700;
text-decoration: none solid rgb(68, 68, 68);
font-style: italic;
font-variant: small-caps;
text-transform: capitalize;
    `

export const StyledRow = styled.tr`
border: 5px groove rgba(20,20,20,0.17);
border-radius: 40px 40px 40px 40px;

`

export const StyledCell = styled.td `
        padding : 5px; 
        width : 70px;   
        font : cursive;
        color: white;
        font-size: 25px;
        
        `

export const LogoCell = styled.td `
width: 40px;
`

export const NameCell = styled.td `
 color:white;
 font-family: "Comic Sans MS", cursive, sans-serif;
font-size: 25px;
letter-spacing: 2px;
word-spacing: 2px;
font-weight: 700;
text-decoration: none solid rgb(68, 68, 68);
font-style: italic;
font-variant: small-caps;
text-transform: capitalize;
padding: 10px;
`