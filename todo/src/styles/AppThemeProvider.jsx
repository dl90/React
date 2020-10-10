import React, { createContext, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from '.'

export const AppThemeContext = createContext()
const AppThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(window.localStorage.getItem('theme') ?? 'Light')
  const toggleTheme = () => {
    setThemeMode(prevState => { return prevState === 'Light' ? 'Dark' : 'Light' })
  }
  const value = { themeMode, toggleTheme }
  const customTheme = theme[themeMode]
  useEffect(() => { window.localStorage.setItem('theme', themeMode) }, [themeMode])

  return (
    <AppThemeContext.Provider value={value}>
      <ThemeProvider theme={customTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  )
}

export default AppThemeProvider
