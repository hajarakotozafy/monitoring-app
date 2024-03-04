import React, { useEffect, useState, useContext } from 'react';

import { Container } from '../../layouts/Container';
import { AccountTableContent, AccountTableHeader } from './AccountTable.styled';
import Button from '../Button';

import * as FaIcons from 'react-icons/fa';

import { useMutation, useQuery } from '@apollo/react-hooks'
import { GET_ACCOUNTS } from '../../core/graphql/account/Account.queries';
import Popup from '../Popup';
import { AccountContext } from '../../context/accountContext';
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
    const [supId, setSupId] = useState()
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
    
    return(
        <Container>
            
            {displayPopup && (<Popup id={modifId} update={update} displayPopup={displayPopup} setDisplayPopup={setDisplayPopup} />)}
            <AccountTableContent>
                <AccountTableHeader>
                    <p><FaIcons.FaDownload/> Enregistrements <span>({loading ? '...' : error ? ' :( ' : context.accounts.length})</span></p>
                    <Button type='btn--primary' onClick={() => setDisplayPopup(true)}><FaIcons.FaPlus/>Nouveau Client</Button>
                </AccountTableHeader>

                <table>
                    <thead>
                        <tr>
                            <th>Numéro de compte</th>
                            <th>Propriétaire</th>
                            <th>Solde</th>
                            <th>Opérations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? (<tr><td colSpan="4" className='loading'>Chargement...</td></tr>) :
                            error ? (<tr><td colSpan="4" className='error'>{error.message} :( ...</td></tr>) : 
                            context.accounts.map(account => (
                                <React.Fragment key={account.id}>
                                    <tr>
                                        <td>{account.account_number}</td>
                                        <td>{account.account_owner}</td>
                                        <td>{account.account_amount} Ar</td>
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
                                    </tr>
                                    <tr></tr>
                                </React.Fragment>
                            ))
                        }
                    </tbody>
                </table>

            </AccountTableContent>
        </Container>
    )
}

export default AccountTable;