import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
${({ theme }) => css`
  #root {
    background: ${theme.colors.background};
    color: ${theme.colors.white};
    display: flex;
    justify-content: center;
  }
  .todoapp {
    background: ${theme.colors.black};
  }
`}
`
