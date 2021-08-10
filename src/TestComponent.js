function withSubscription(externalData, nestedData) {
    return newComponent = () => {
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
                {externalData &&
                    <ul className="list">
                        {externalData && externalData.map((item) => {
                            return (
                                <li className="list-item" key={item.code} onClick={(event) => setStatus(item.code, event)}>
                                    {item.name}
                                    {showComponents === item.code &&
                                        <ListItem items={nestedData} />
                                    }
                                </li>
                            )
                        })}
                    </ul>
                }
            </>
        )
    };
  }