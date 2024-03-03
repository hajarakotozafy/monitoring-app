import styled from 'styled-components';

export const PopupContainer = styled.div`
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: opacityPopup 0.2s ease;
    @keyframes opacityPopup {
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
`

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100vh;
    background: #2E3235;
    opacity: 0.2;
    z-index: 10;
`
    
export const PopupInner = styled.div`
    z-index: 11;
    width: 400px;
    // background: ${props => props.theme.gradients.cardBack};
    padding: 24px;
    background: #fff;
    border-radius: 12px;
    animation: translatePopup 0.4s ease;
    h1{
        padding-bottom: 8px;
        font-size: 20px;
        font-weight: 800;
        text-align: center;
    }
    @keyframes translatePopup{
        from{
            transform: translateY(-24%);
        }
        to{
            transform: translateY(0%);
        }
    }
`

export const PopupForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 0;
    color: #767676;
    p{
        font-size: 14px;
        text-align: center;
    }
    .form-control{
        display: flex;
        flex-direction: column;
        gap: 8px;
        label{
            font-size: 14px;
            display: none;
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
`