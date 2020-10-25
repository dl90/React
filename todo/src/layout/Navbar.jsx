import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AppThemeContext } from '../styles/AppThemeProvider'

const NavContainer = styled.div`
  display: flex;
  width: 100%;
`

const ThemeToggle = styled.button`
  margin-left: auto;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  border: gray 3px solid
`

export default function Navbar (props) {
  const { home, about, api } = props
  const { toggleTheme, themeMode } = useContext(AppThemeContext)
  const handleThemeChange = () => { toggleTheme() }
  return (
    <NavContainer>
      <Link to={home}>Home</Link>
      <Link to={about}>About</Link>
      <Link to={api}>Api</Link>
      <ThemeToggle type='button' onClick={handleThemeChange}>{themeMode}</ThemeToggle>
    </NavContainer>
  )
}
