import React from 'react'
import {
    ApolloClient,
    InMemoryCache,
    OperationVariables,
    useApolloClient,
} from '@apollo/client';

export const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/kshilov/mockubgraph',
    cache: new InMemoryCache()
});

export default client;
