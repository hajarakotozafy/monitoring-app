import React from 'react';
import { Container } from '../../layouts/Container';
import { ConnectedUser, NavBarContent, SearchBar } from './NavBar.styled';
import * as FaIcons from 'react-icons/ai';

const NavBar = () => {
    return (
        <Container padding={16}>
            <NavBarContent>
                <p className='brand'>Gestion de <br/><span>SOLDES</span> Bancaire</p>
                {/* <h2>LOGO</h2> */}
                <SearchBar>
                    <FaIcons.AiOutlineSearch/>
                    <input type="text" placeholder='Rechercher un compte'/>
                </SearchBar>
                <ConnectedUser>
                    <span>Se déconnecter</span>
                    <div className='initials'>HR</div>
                </ConnectedUser>
            </NavBarContent>
        </Container>
    )
}

export default NavBar;