import styled from 'react-emotion'

const Input = styled.input`
  background: #ffffff;
  border: none;
  border-bottom: 2px solid #555;
  padding: 0.3em 1em;
  font-size: 1.2em;
  font-family: Roboto, Sukhumvit Set, sans-serif;
  font-weight: 300;
  outline: none;
  color: #333;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  width: 100%;

  &:hover {
    transform: scale(1.05);
  }
`

export default Input
