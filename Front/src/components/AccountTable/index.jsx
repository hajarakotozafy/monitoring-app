import React, { useEffect, useState, useContext } from 'react';

import { Container } from '../../layouts/Container';
import { AccountTableContent, AccountTableHeader } from './AccountTable.styled';
import Button from '../Button';

import * as FaIcons from 'react-icons/fa';
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { GET_ACCOUNTS } from '../../core/graphql/account/Account.queries';
import Popup from '../Popup';
import { AccountContext } from '../../context/accountContext';
import { AuthContext } from '../../context/authContext';
import gql from 'graphql-tag'

const DELETE_ACCOUNT = gql`
    mutation delete(
        $id: Int!
    ){
        deleteAccount(
            id: $id
        ){
            id
        }
    }
`

const AccountTable = () => {
    const {loading, error, data} = useQuery(GET_ACCOUNTS);
    const [displayPopup, setDisplayPopup] = useState(false);
    const [modifId,setModifId] = useState(-1)
    const [update, setUpdate] = useState(false)
    const context = useContext(AccountContext);
    const {user} = useContext(AuthContext);
    const [supId, setSupId] = useState()
    const [start, setStart] = useState(0)
    useEffect(()=>{
        if(data){
            context.updateAccounts(data.getAccounts);
        }
        console.log("données:", context.accounts)
    },[loading])

    const [deleteAccount] = useMutation(DELETE_ACCOUNT,{
        update(proxy, {data:{deleteAccount:id}}){
            let accounts = [...context.accounts]
            accounts = accounts.filter(a=>a.id!=supId)
            context.updateAccounts(accounts)
        },
        variables: {id: parseInt(supId)}
    })
    
    const delAccount = () => {
        deleteAccount()
    }
    
    const loadData = (a) =>{
        let res=[]
        for(let i=a; i<a+5&&i<context.accounts.length;i++){
            res.push(context.accounts[i])
        }
        console.log('res',res)
        return res;
    }

    return(
        <Container>
            
            {displayPopup && (<Popup setUpdate={setUpdate} id={modifId} update={update} displayPopup={displayPopup} setDisplayPopup={setDisplayPopup} />)}
            <AccountTableContent>
                <AccountTableHeader>
                    <p><FaIcons.FaDownload/> Enregistrements <span>({loading ? '...' : error ? ' :( ' : context.accounts.length})</span></p>
                    {user.username!='admin'&&(
                        <Button type='btn--primary' onClick={() => setDisplayPopup(true)}><FaIcons.FaPlus/>Nouveau Client</Button>
                    )}
                </AccountTableHeader>

                <table>
                    <thead>
                        <tr>
                            <th>Numéro de compte</th>
                            <th>Propriétaire</th>
                            <th>Solde</th>
                            {user.username!='admin'&&(<th>Opérations</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? (<tr><td colSpan="4" className='loading'>Chargement...</td></tr>) :
                            error ? (<tr><td colSpan="4" className='error'>{error.message} :( ...</td></tr>) : 
                            loadData(start).map(account => (
                                <React.Fragment key={account.id}>
                                    <tr>
                                        <td>{account.account_number}</td>
                                        <td>{account.account_owner}</td>
                                        <td>{account.account_amount} Ar</td>
                                        {user.username!='admin'&&(
                                            <td className="actions">
                                                {/* <FaIcons.FaInfo/> */}
                                                <FaIcons.FaEdit onClick={()=>{
                                                    setModifId(account.id)
                                                    setUpdate(true)
                                                    setDisplayPopup(true)
                                                }}/>
                                                <FaIcons.FaTrash onClick={()=>{
                                                    setSupId(account.id)
                                                    delAccount()
                                                }}/>
                                            </td>
                                        )}
                                    </tr>
                                    <tr></tr>
                                </React.Fragment>
                            ))
                        }
                    </tbody>
                </table>
                {context.accounts && (
                    <Pagination>
                        <button onClick={()=>{
                            if(start-5<0){
                                this.disabled = true
                            }else{
                                setStart(start-5)
                            }
                        }}>Précendent</button>
                        <p>{(start/5)+1}</p>
                        <div></div>
                        <p>{Math.ceil(context.accounts.length/5)}</p>
                        <button onClick={()=>{
                            if(start+5>context.accounts.length){
                                this.disabled = true
                            }else{
                                setStart(start+5)
                            }
                        }}>Suivant</button>
                    </Pagination> 
                )}
            </AccountTableContent>
        </Container>
    )
}

const Pagination = styled.div`
    
display: flex;
align-items: center;
justify-content: flex-end;
gap: 4px;
button{
    cursor: pointer;
    outline: none;
    border: none;
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 8px;
}
p{
    font-size: 14px;
    color: grey;
    display: block;
    padding: 8px;
    // border: 1px solid red;
    font-weight: 800;
}
div{
    width: 36px;
    height: 1px;
    border: 1px solid grey;
}
`

export default AccountTable;