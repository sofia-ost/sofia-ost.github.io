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

    const [showComponents, setShowComponents] = useState('');

    const setStatus = (code, event) => {

        event.stopPropagation();

        if (showComponents === code) {
            return setShowComponents('')
        }
      
        setShowComponents(code);
        console.log(code)
    }

    if (loading || error) {
        return <p>{error ? error.message : 'Loading...'}</p>;
    }

    return (
        <ul className="list">
            {data.continents.map((item) => {
                return (
                    <li className="list-item" key={item.code} onClick={(event) => setStatus(item.code, event)}>
                        {item.name}
                        {showComponents === item.code &&
                            <ListItem items={item.countries}  />
                        }
                    </li>
                )
            })}
        </ul>
    )
}