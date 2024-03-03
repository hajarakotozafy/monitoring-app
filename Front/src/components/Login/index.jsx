import React from 'react'
import { LoginContainer, LoginForm, LoginInner, LoginTitle, Logo } from './Login.styled';
import Lg from '../../assets/images/logo.png'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        return navigate('/account')
    }
    return (
        <LoginContainer>
        <LoginInner>
            <Logo src={Lg}/>
            <LoginTitle>Connexion</LoginTitle>
            <LoginForm>
                <div className="form-control">
                    <label>Nom d'utilisateur</label>
                    <input type="text" id="username" placeholder="i.e: Caisse-1"/>
                </div>
                <div className="form-control">
                    <label>Mot de passe</label>
                    <input type="password" id="password" placeholder='Votre mot de passe'/>
                </div>
                <div className="form-control btn">
                    <Button type="btn--primary" onClick={e=>handleLogin(e)}>Se Connecter</Button>
                </div>
            </LoginForm>
        </LoginInner>
        </LoginContainer>
    )
}

export default Login
