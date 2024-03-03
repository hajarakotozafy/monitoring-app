import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useForm } from '../../core/utility/hooks'
import { useMutation } from '@apollo/react-hooks';

import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import { Logo, RegisterContainer, RegisterForm, RegisterInner, RegisterTitle } from './Register.styled';
import Lg from '../../assets/images/Logo.png';
import Button from '../Button';
const REGISTER_USER = gql`
    mutation Mutation(
        $registerInput: RegisterInput!
    ){
        registerUser(
            registerInput: $registerInput
        ) {
            username
            token
        }
    }
`

const Register = () => {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([])
    function registerUserCallback() {
        console.log("callback hit")
        registerUser();
    }
    const { onChange, onSubmit, values } = useForm(registerUserCallback,{
        username: '',
        password: '',
    });

    const [ registerUser, { loading } ] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData}}){
            context.login(userData);
            navigate('/account');
        },
        onError({ graphQLErrors }){
            setErrors(graphQLErrors);
        },
        variables: { registerInput: values}
    })

    return (
        <RegisterContainer>
        <RegisterInner>
            <Logo src={Lg}/>
            <RegisterTitle>Inscription</RegisterTitle>
            <RegisterForm>
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
                        }
                    }>S'Inscrire</Button>
                </div>
            </RegisterForm>
        </RegisterInner>
        </RegisterContainer>
    )
} 

export default Register;