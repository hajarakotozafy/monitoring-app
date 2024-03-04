import React, { useContext } from 'react';
import { LeftSide, Overlay, PopupContainer, PopupForm, PopupInner, RightSide } from './Popup.styled';
import Button from '../Button';
import Image from '../../assets/images/account_image.png'


import { AccountContext } from '../../context/accountContext';
import gql from 'graphql-tag';
import { useForm } from '../../core/utility/hooks';
import { useMutation } from '@apollo/react-hooks';

const ADD_ACCOUNT = gql`
    mutation add(
        $addAccountInput: AddAccountInput!
    ){
        addAccount(
            addAccountInput: $addAccountInput
        ){
            id
            account_number
            account_owner
            account_amount
        }
    }
`
const UPDATE_ACCOUNT = gql`
    mutation update(
        $id: Int!
        $updateAccountInput: UpdateAccountInput!
    ){
        updateAccount(
            id: $id
            updateAccountInput: $updateAccountInput
        ){
            id
            account_number
            account_owner
            account_amount
        }
    }
`

const Popup = ({displayPopup, setDisplayPopup, update=false, id}) => {

    const context = useContext(AccountContext);

    function submitAccountCallback(){
        submitAccount()
    }
    const { onChange, onSubmit, values } = useForm(submitAccountCallback, {
        account_number: '',
        account_owner: '',
        account_amount: ''
    })

    const returnVar = (val) =>{
        let res={}
        res.account_number = val.account_number
        res.account_owner = val.account_owner
        res.account_amount = parseInt(val.account_amount)
        if(!update){
            return {addAccountInput: res}
        }else{
            return {id: parseInt(id), updateAccountInput: res}
        }
    
    }

    const [submitAccount, { loading }] = useMutation(update?UPDATE_ACCOUNT:ADD_ACCOUNT, {
        update(proxy, { data }){
            let accounts = [...context.accounts]
            if(!update){
                accounts.unshift(data.addAccount)
                context.updateAccounts(accounts)
            }else if(update){
                let index=accounts.findIndex(el=>el.id==id)
                accounts[index]=data.updateAccount
                context.updateAccounts(accounts)
            }
        },
        onError({graphQLErrors}){
            console.log(graphQLErrors);
        },
        variables: returnVar(values)
        })
    return(
        <PopupContainer>
            <PopupInner>
                <LeftSide>
                    <img src={Image}/>
                </LeftSide>
                <RightSide>

                <h1>{update?'MODIFIER CLIENT':'NOUVEAU CLIENT'}</h1>
                <PopupForm>
                    <div className='form-control'>
                        <p>Client numéro: 000008</p>
                        <input type="text" 
                            placeholder="000008"
                            name="account_number"
                            onChange={onChange} required
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="">Nom du Client :</label>
                        <input type="text" 
                            name="account_owner"
                            onChange={onChange}
                            placeholder='Nom du client' required/>
                    </div>
                    <div className='form-control'>
                        <label htmlFor="">Montant :</label>
                        <input type="number" 
                            name="account_amount"
                            onChange={onChange}
                            placeholder='Montant'required/>
                    </div>
                    <Button onClick={(e)=> {
                        e.preventDefault()
                        onSubmit(e)
                        setDisplayPopup(!displayPopup)
                    }} type='btn--primary'>Enregistrer</Button>
                </PopupForm>
                </RightSide>
            </PopupInner>
            <Overlay onClick={()=> setDisplayPopup(!displayPopup)}/>
        </PopupContainer>
    )
}

export default Popup;