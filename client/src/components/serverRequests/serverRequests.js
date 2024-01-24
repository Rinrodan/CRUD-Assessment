import React, { useRef, useState } from 'react';


export const SingleUser = () => {
    const inputRef = useRef();

    const handleUserRequest = (id) => {
        try {
            fetch(`http://localhost:4400/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => res.json())
    
            .then((requestedUser) => { console.log(requestedUser) })
            .catch((err) => console.log(err))
        } catch (err) {
            console.log('Failed to request single user')
        }
    }
    const handleClick = () => {
        const userID = inputRef.current.value;
        if (userID.trim() === '' || isNaN(userID) || userID <= 0) {
            alert('Please enter a valid user ID');
          } else {
            handleUserRequest(userID);
          }
    }
    return (
        <>
            <input id="numberInput" ref={inputRef}></input>
            <button onClick={handleClick} class='testButton'>single user request</button>
        </>
    )

}

export const SingleItemSelect = () => {
 const [itemToView, setItemToView] = useState({})
        const inputRef = useRef();
    const {id, item_name, item_description, item_quantity} = itemToView

        const handleItemRequest = (id) => {
            try {
                fetch(`http://localhost:4400/item/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => res.json())
        
                .then((requestedItem) => { setItemToView(requestedItem) })
                .catch((err) => console.log(err))
            } catch (err) {
                console.log('Failed to request single user')
            }
        }
        const handleClick = () => {
            const itemID = inputRef.current.value;
            if (itemID.trim() === '' || isNaN(itemID) || itemID <= 0) {
                alert('Please enter a valid user ID');
              } else {
                handleItemRequest(itemID);
              }
        }
        return (
            <>
            <div id="item-server-request">
                <input id="numberInput" ref={inputRef}></input>
                <button onClick={handleClick}>single item request</button>
            
            { (itemToView) && <div>
                <table>
                    <tr>
                    <th>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Quantity</td>
                    </th>    
                    </tr>
                    <tr>
                        <td>{id}</td>
                        <td>{item_name}</td>
                        <td>{item_description}</td>
                        <td>{item_quantity}</td>
                    </tr>

                </table></div>}
                </div>
            </>
        )
    
    }