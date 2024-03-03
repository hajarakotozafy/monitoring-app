import React, { useReducer, createContext } from 'react'

const initialAccount = {
    accounts: null
}

const AccountContext = createContext({
    accounts: null,
    updateAccounts: (accountsData) => {}
});

function accountsReducer(state, action){
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
    const [state, dispatch] = useReducer(accountsReducer, initialAccount);
    const updateAccounts = (accountData) => {
        dispatch({
            type: 'UPDATE',
            payload: accountsData
        })
    }

    return (
        <AccountContext.Provider value={{account: state.account, updateAccounts}}>
            {children}
        </AccountContext.Provider>
    )
}

export { AccountProvider, AccountContext };