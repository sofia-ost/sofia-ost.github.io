import React, { useState } from 'react';

export const ListItem = ({items}) => {

    const [showComponents, setShowComponents] = useState('');

    const setStatus = (code, event) => {

        event.stopPropagation();

        if (showComponents === code) {
            return setShowComponents('')
        }
      
        setShowComponents(code);
    }
    

    return (
        <>
            {items &&
                <ul className="list">
                    {items && items.map((item) => {
                        return (
                            <li className="list-item" key={item.code} onClick={(event) => setStatus(item.code, event)}>
                                {item.name}
                                {showComponents === item.code &&
                                    <ListItem items={item.languages} />
                                }
                            </li>
                        )
                    })}
                </ul>
            }
        </>
    )
}