import { gql } from '@apollo/client';

export const GET_ACCOUNTS = gql`
    {
        getAccounts{
            id
            account_number
            account_owner
            account_amount
        }
    }
`

export const GET_ACCOUNT = gql`
    query($id: Int){
        account(id: $id){
            id
            account_number
            account_owner
            account_amount
            createdAt
            updatedAt
        }
    }
`