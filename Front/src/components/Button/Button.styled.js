import styled from 'styled-components';

export const Btn = styled.button`
    background: ${props => {
        switch(props.type){
            case 'btn--primary':
                return props.theme.colors.brandColor;
                break;
            case 'btn--secondary':
                return props.theme.colors.accentColor;
                break;
            case 'btn--outline-primary':
                return 'transparent';
                break;
        }
    }};
    color: ${ props => props.type == 'btn--outline-primary' ? props.theme.colors.brandColor: props.theme.colors.neutralColor  };
    outline: none;
    border: ${props => props.type == 'btn--outline-primary' ? `1px solid ${props.theme.colors.brandColor}`: 'none'};
    font-size: ${ props => props.theme.size(2) - 2}px;
    padding: 14px 16px;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.4s ease;
    &:hover{
        background: ${props => {
            switch(props.type){
                case 'btn--primary':
                    return props.theme.colors.hoverBrandColor;
                    break;
                case 'btn--secondary':
                    return props.theme.colors.hoverAccentColor;
                    breack;
                case 'btn--outline-primary':
                    return props.theme.colors.hoverBrandColor;
                    break;
            }
        }};
    }
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    justify-content: center;
`