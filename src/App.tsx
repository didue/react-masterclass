import styled, {createGlobalStyle} from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { darktheme, lightTheme } from './theme';
import { useState } from 'react';


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  * {
    box-sizing: border-box;
  }
  body {
    line-height: 1.2;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 300;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`
const ThemeButton = styled.div`
  width: 44px;
  height: 44px;
  background-color: ${props => props.theme.textColor};
  color: ${props => props.theme.bgColor};
  /* border : 1px solid ${props => props.theme.textColor}; */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom : 1rem;
  right: 1rem;
  z-index : 5;
  cursor: pointer;
`;


function App() {

  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark((current) => !current);

  return (
    <>
      <ThemeProvider theme={isDark? darktheme : lightTheme}>
        <GlobalStyle/>
        <Router/>
        <ReactQueryDevtools initialIsOpen={true} />
        <ThemeButton onClick={toggleTheme}>
          <i className="fa-solid fa-moon fa-lg"></i>
        </ThemeButton>
      </ThemeProvider>
    </>
  );
}

export default App;
