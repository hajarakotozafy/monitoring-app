import React from 'react'
import { LoginContainer, LoginForm, LoginInner, LoginTitle, Logo } from './Login.styled';
import Lg from '../../assets/images/logo.png'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useForm } from '../../core/utility/hooks'
import { useMutation } from '@apollo/react-hooks';

import { gql } from 'graphql-tag';

const LOGIN_USER = gql`
    mutation login(
        $loginInput: LoginInput!
    ){
        loginUser(
            loginInput: $loginInput
        ){
            username
            token
        }
    }
`

const Login = () => {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [ errors, setErrors ] = useState([])

    function loginUserCallback() {
        loginUser();
    }

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData}}){
            context.login(userData);
            navigate('/account');
        },
        onError({ graphQLErrors }){
            setErrors(graphQLErrors);
        },
        variables: { loginInput: values}
    })
    return (
        <LoginContainer>
        <LoginInner>
            <Logo src={Lg}/>
            <LoginTitle>Connexion</LoginTitle>
            <LoginForm>
                <div className="form-control">
                    <label>Nom d'utilisateur</label>
                    <input 
                        type="text" 
                        name="username" 
                        onChange={onChange}
                        placeholder="i.e: Caisse-1"
                    />
                </div>
                <div className="form-control">
                    <label>Mot de passe</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={onChange}
                        placeholder='Votre mot de passe'
                    />
                </div>
                {errors.map(function(error){
                    return(
                        <p style={{fontSize:'12px', color: 'red'}}>
                            {error.message}
                        </p>
                    )
                })}
                <div className="form-control btn">
                    <Button type="btn--primary" 
                        onClick={e=>{
                            e.preventDefault()
                            onSubmit(e)
                        }}
                    >Se Connecter</Button>
                </div>
            </LoginForm>
        </LoginInner>
        </LoginContainer>
    )
}

export default Login
