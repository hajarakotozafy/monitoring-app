import styled from 'styled-components';

export const MainContainer = styled.div`
    width: 100%;
    padding: ${props => props.padding || 0}px 16px;
    // border: 2px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    position: ${props => props.position ? props.position: 'static'};
    margin: ${props => props.margin ? props.margin : 0};
    top: 0;
    .inner{
        max-width: ${props => props.theme.maxWidth}px;
        flex: 1;
        // border: 2px solid green;
        display: flex;
    }
`