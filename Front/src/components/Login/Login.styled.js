import styled from 'styled-components';

export const LoginContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const LoginInner = styled.div`
    box-shadow: ${props => props.theme.shadows.soft};
    width: 400px;
    height: auto;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 20px 20px 32px 20px;
    border-radius: 4px;
    gap: 16px;
`

export const Logo = styled.img`
    width: 64px;
`

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    .form-control{
        display: flex;
        flex-direction: column;
        gap: 8px;
        label{
            font-size: 14px;
            color: grey;
        }
        input{
            border-radius: 4px;
            outline: none;
            border: none;
            background: #fff;
            padding: 16px;
            border: 1px solid #F0F4FD;
            // box-shadow: ${props => props.theme.shadows.soft};
        }
    }
    .btn{
        margin-top: 8px;
    }
`

export const LoginTitle = styled.h1`
    font-size: 20px;
    font-weight: 800;
    color: #2E3235;
`