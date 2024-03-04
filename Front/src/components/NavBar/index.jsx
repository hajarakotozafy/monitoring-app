import React, { useContext, useEffect } from 'react';
import { Container } from '../../layouts/Container';
import { ConnectedUser, NavBarContent, SearchBar } from './NavBar.styled';
import * as FaIcons from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
const NavBar = () => {
    const {user, logout} = useContext(AuthContext)
    const navigate = useNavigate()
    const logOut = () =>{
        logout();
        navigate('/login')
    }
    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    },[user])
    return (
        <Container padding={16}>
            <NavBarContent>
                <p className='brand'>Gestion de <br/><span>SOLDES</span> Bancaire</p>
                {/* <h2>LOGO</h2> */}
                {/* <SearchBar>
                    <FaIcons.AiOutlineSearch/>
                    <input type="text" placeholder='Rechercher un compte'/>
                </SearchBar> */}
                {user.username=='admin'&&(
                    <div className="links">
                        <NavLink to={'/admin'} activeclassname="active">SUPERVISION</NavLink>
                        <NavLink to={'/account'} activeclassname="active">COMPTES</NavLink>
                    </div>
                )}
                <ConnectedUser>
                    <span onClick={logOut}>Se déconnecter</span>
                    <div className='initials'>{user.username[0].toUpperCase()}</div>
                </ConnectedUser>
            </NavBarContent>
        </Container>
    )
}

export default NavBar;