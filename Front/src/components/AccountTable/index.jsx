import React, { useState } from 'react';

import { Container } from '../../layouts/Container';
import { AccountTableContent, AccountTableHeader, Pagination } from './AccountTable.styled';
import Button from '../Button';

import * as FaIcons from 'react-icons/fa';

import { useQuery } from '@apollo/client'
import { GET_ACCOUNTS } from '../../core/graphql/account/Account.queries';
import Popup from '../Popup';

const AccountTable = () => {
    const {loading, error, data} = useQuery(GET_ACCOUNTS);
    const [displayPopup, setDisplayPopup] = useState(false);
    return(
        <Container>
            
            {displayPopup && (<Popup displayPopup={displayPopup} setDisplayPopup={setDisplayPopup} />)}
            <AccountTableContent>
                <AccountTableHeader>
                    <p><FaIcons.FaDownload/> Enregistrements <span>({loading ? '...' : error ? ' :( ' : data.getAccounts.length})</span></p>
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
                            error ? (<tr><td colSpan="4" className='error'>Erreur de chargement des données :( ...</td></tr>) : 
                            data.getAccounts.map(account => (
                                <React.Fragment key={account.id}>
                                    <tr>
                                        <td>{account.account_number}</td>
                                        <td>{account.account_owner}</td>
                                        <td>{account.account_amount} Ar</td>
                                        <td className="actions">
                                            <FaIcons.FaInfo/>
                                            <FaIcons.FaEdit/>
                                            <FaIcons.FaTrash/>
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