import { createGlobalStyle } from 'styled-components';
import '@fontsource/plus-jakarta-sans';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';

export const GlobalStyles = createGlobalStyle`
    *{
        font-family: ${(props) => props.theme.fonts.main};
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body {
        background: #fff;
        min-height: 100vh;
    }
`