import React, { useReducer, createContext } from 'react'

const initialAccount = {
    accounts: []
}

const AccountContext = createContext({
    accounts: [],
    updateAccounts: (accountData) => {}
});

function accountReducer(state, action){
    switch(action.type){
        case 'UPDATE':
            return {
                ...state,
                accounts: action.payload
            }
        default:
            return state
    }
}

function AccountProvider({children}){
    const [state, dispatch] = useReducer(accountReducer, initialAccount);
    const updateAccounts = (accountData) => {
        dispatch({
            type: 'UPDATE',
            payload: accountData
        })
    }

    return (
        <AccountContext.Provider value={{accounts: state.accounts, updateAccounts}}>
            {children}
        </AccountContext.Provider>
    )
}

export { AccountProvider, AccountContext };