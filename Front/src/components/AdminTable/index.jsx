import React, { useState } from 'react';

import { Container } from '../../layouts/Container';
import { AdminTableContent, AdminTableHeader, Card } from './AdminTable.styled';
import gql from 'graphql-tag'

export const GET_ACCOUNT_AUDIT = gql`
    {
        getAccountAudit{
            action_type
            updated_at
            account_number
            account_owner
            account_amount_old
            account_amount_new
            username
        }
    }
`

import { useQuery } from '@apollo/client'

import * as FaIcons from 'react-icons/fa';

import styled from 'styled-components';

const AdminTable = () => {
    const {loading, error, data} = useQuery(GET_ACCOUNT_AUDIT);
    const [start, setStart] = useState(0)
    const DateFormat = (dtStr) => {
        const date = new Date(dtStr)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = date.toLocaleDateString('fr-FR', options);

        const hour = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const timeString = `${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;


        return {dateString,timeString};
    }
    
    const loadData = (a) =>{
        let res=[]
        for(let i=a; i<a+5&&i<data.getAccountAudit.length;i++){
            res.push(data.getAccountAudit[i])
        }
        console.log('res',res)
        return res;
    }
    return(
        <Container>
            <AdminTableContent>
                <AdminTableHeader>
                    <p><FaIcons.FaDownload/> Enregistrements <span>({loading ? '...' : error ? ' :( ' : data.getAccountAudit.length})</span></p>
                    <Card>
                        <div>{data.getAccountAudit.filter(a=>a.action_type=='Ajout').length}</div>
                        <p>Données<br/>Ajoutées</p>
                    </Card>
                    <Card>
                        <div>{data.getAccountAudit.filter(a=>a.action_type=='Modification').length}</div>
                        <p>Données<br/>Modifiées</p>
                    </Card>
                    <Card>
                        <div>{data.getAccountAudit.filter(a=>a.action_type=='Suppression').length}</div>
                        <p>Données<br/>Supprimées</p>
                    </Card>
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
                            loadData(start).map((account, index)=> (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td style={{color:account.action_type=='Ajout'?'#4F9464':account.action_type=='Suppression'?'#e4361b':'#6972FF'}}>
                                            <span style={{display:'inline-block', background: "#fff", borderRadius:'6px',padding:'8px 10px', fontWeight:'800', fontSize:'12px'}}>
                                                {account.action_type.toUpperCase()}
                                            </span>
                                        </td>
                                        <td>{DateFormat(account.updated_at).dateString}<br/>{DateFormat(account.updated_at).timeString}</td>
                                        <td>{account.account_number}</td>
                                        <td>{account.account_owner}</td>
                                        <td style={{textAlign:'right'}}>{account.account_amount_old?account.account_amount_old+' Ar': '---'}</td>
                                        <td style={{textAlign:'right'}}>{account.account_amount_new?account.account_amount_new+' Ar': '---'}</td>
                                        <td style={{color:'#F6B746', fontWeight:'800'}}>{account.username}</td>
                                        
                                    </tr>
                                    <tr></tr>
                                </React.Fragment>
                            ))
                        }
                    </tbody>
                </table>
                {data && (
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
                        <p>{Math.ceil(data.getAccountAudit.length/5)}</p>
                        <button onClick={()=>{
                            if(start+5>data.getAccountAudit.length){
                                this.disabled = true
                            }else{
                                setStart(start+5)
                            }
                        }}>Suivant</button>
                    </Pagination>
                )}
            </AdminTableContent>
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

export default AdminTable;
