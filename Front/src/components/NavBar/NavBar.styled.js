import styled from 'styled-components';

export const NavBarContent = styled.div`
    // background: cyan;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    h2{
        font-weight: 800;
    }
    .brand{
        border-left: 4px solid #6972FD;
        color: #131432;
        padding-left: 8px;
        font-weight: 600;
        font-size: 14px;
        border-radius: 4px;
        span{
            font-weight: 800;
            color: #F6B746;
        }
    }
`

export const SearchBar = styled.div`
    background: #F0F4FD;
    border-radius: 12px;
    padding: 8px 16px 8px 0;
    max-width: 400px;
    flex: 1;
    position: relative;
    display: flex;
    svg{
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        color: #525BB1;
        background: #D0DDF6;
        border-radius: 12px;
        padding: 14px;

    }
    input{
        margin-left: 66px;
        border: none;
        font-size: 14px;
        padding: 8px 0;
        outline: none;
        background: transparent;
        color: #878B97;
        flex:1;
    }
`

export const ConnectedUser = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    span{
        color: #2E3235;
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
        text-decoration: none;
        transition: 0.2s ease;
        &:hover{
            text-decoration: underline;
        }
    }
    .initials{
        // border: 1px solid black;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        box-shadow: ${props => props.theme.shadows.soft};
        font-weight: 800;
        color: #4F9464;
    }
`