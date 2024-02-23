import { gql } from '@apollo/client';

export const ADD_ACCOUNT = gql`
    mutation($account_number: String, $account_owner: String, $account_amount: Int){
        addAccount(account_number: $account_number, account_owner: $account_owner, account_amount: $account_amount)
    }
`;

export const UPDATE_ACCOUNT = gql`
    mutation($id: Int, $account_number: String, $account_owner: String, $account_amount: Int){
        updateAccount(id: $id, account_number: $account_number, account_owner: $account_owner, account_amount: $account_amount)
    }
`

export const DELETE_ACOUNT = gql`
    mutation($id: Int){
        deleteAccount(id: $id)
    }
`