import React, { useState } from 'react';
import { ListItem } from '../ListItem';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';

import "./styles/index.scss";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
});

const LIST = gql`
    {
        continents  {
            code
            name
            countries {
                code
                name
                phone
                languages {
                    code
                    name
                }
            }
        }
    }
`;


export const DataList = () => {

    const {data, loading, error} = useQuery(LIST, {client});

    if (loading || error) {
        return <p>{error ? error.message : 'Loading...'}</p>;
    }

    return (
        <>
            <ListItem items={data.continents} nestedComponent="countries" />
        </>
    )
}
