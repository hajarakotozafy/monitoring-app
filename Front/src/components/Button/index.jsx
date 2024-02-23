import React from 'react';
import { Btn } from './Button.styled'

const Button = ({children, type, onClick}) => {
    const STYLES = [
        'btn--primary',
        'btn--secondary',
        'btn--outline-primary'
    ]

    const checkBtnStyle = STYLES.includes(type) ? type: STYLES[0];

    return(
        <Btn type={`${checkBtnStyle}`} onClick={onClick}>{children}</Btn>
    )
}

export default Button;