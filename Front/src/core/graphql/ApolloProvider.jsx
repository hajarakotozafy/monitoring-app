import React from 'react';
 
import { ApolloProvider } from '@apollo/react-hooks';

import client from './apolloClient'; 

const ApolloAppProvider = ({children}) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloAppProvider;