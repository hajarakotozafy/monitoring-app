import React from 'react';
import { MainContainer } from './Container.styled';

export const Container = ({children, padding, position, margin}) => {
    return (
        <MainContainer padding={padding} position={position} margin={margin}>
            <div className='inner'>
                {children}
            </div>
        </MainContainer>
    )
}