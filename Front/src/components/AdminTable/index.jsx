import React, { useState } from 'react';

import { Container } from '../../layouts/Container';
import { AdminTableContent, AdminTableHeader } from './AdminTable.styled';

import { useQuery } from '@apollo/client'
import { GET_ACCOUNTS } from '../../core/graphql/account/Account.queries';

import * as FaIcons from 'react-icons/fa';

const AdminTable = () => {
    const {loading, error, data} = useQuery(GET_ACCOUNTS);
    
    return(
        <Container>
            <AdminTableContent>
                <AdminTableHeader>
                    <p><FaIcons.FaDownload/> Enregistrements <span>({loading ? '...' : error ? ' :( ' : data.getAccounts.length})</span></p>
                </AdminTableHeader>

                <table>
                    <thead>
                        <tr>
                            <th>Type d'action</th>
                            <th>Date de mise à jour</th>
                            <th>N° de compte</th>
                            <th>Nom du client</th>
                            <th>Ancien solde</th>
                            <th>Nouveau solde</th>
                            <th>Utilisateur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? (<tr><td colSpan="7" className='loading'>Chargement...</td></tr>) :
                            error ? (<tr><td colSpan="7" className='error'>{error.message} :( ...</td></tr>) : 
                            data.getAccounts.map(account => (
                                <React.Fragment key={account.id}>
                                    <tr>
                                        <td>{account.account_number}</td>
                                        <td>{account.account_owner}</td>
                                        <td>{account.account_amount} Ar</td>
                                        <td>{account.account_amount} Ar</td>
                                        <td>{account.account_amount} Ar</td>
                                        <td>{account.account_amount} Ar</td>
                                        <td>{account.account_amount} Ar</td>
                                        
                                    </tr>
                                    <tr></tr>
                                </React.Fragment>
                            ))
                        }
                    </tbody>
                </table>

            </AdminTableContent>
        </Container>
    )
}

export default AdminTable;