// import React, { useRef, useState } from 'react';

import { useState } from "react";


// export const GetPublicItems = () => {

//     try {
//         fetch('http://localhost:4400/items', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then((res) => res.json())

//         .then((items) => { return items })
//         .catch((err) => console.log(err))
//     } catch (err) {
//         console.log('Failed to fetch items')
//     }
// }




// export const SingleUser = () => {
//     const inputRef = useRef();

//     const handleUserRequest = (id) => {
//         try {
//             fetch(`http://localhost:4400/user/${id}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then((res) => res.json())
    
//             .then((requestedUser) => { console.log("server request single",requestedUser) })
//             .catch((err) => console.log(err))
//         } catch (err) {
//             console.log('Failed to request single user')
//         }
//     }
//     const handleClick = () => {
//         const userID = inputRef.current.value;
//         if (userID.trim() === '' || isNaN(userID) || userID <= 0) {
//             alert('Please enter a valid user ID');
//           } else {
//             handleUserRequest(userID);
//           }
//     }
//     return (
//         <>
//             <input id="numberInput" ref={inputRef}></input>
//             <button onClick={handleClick} className='testButton'>single user request</button>
//         </>
//     )

// }

export const SingleItemFetch = ({id}) => {
    try {
        fetch(`http://localhost:4400/item/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())

        .then((requestedItem) => requestedItem)
        .catch((err) => console.log(err))
    } catch (err) {
        console.log('Failed to request single item')
    }
}
// export const FetchInventory = async () => {
//         try {
//             fetch('http://localhost:4400/inventory', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then(res => res.json())
//             .then(items => items)
//         } catch (err) {
//             console.log('Failed to fetch items')
//         }
//     };

// export const LoggedInUsersInventory = ({id, inventory}) => {
//     const filterInventoryByUserID = (id) => {
//         const filteredItems = inventory.filter(filterByUserId);
//         function filterByUserId(item) {
//             let requestedID = id;
//             return item.item_userid == requestedID;  }

 
//     }
//     try {
//         fetch(`http://localhost:4400/items/${id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then((res) => res.json())

//         .then((requestedItem) => requestedItem)
//         .catch((err) => console.log(err))
//     } catch (err) {
//         console.log('Failed to request single item')
//     }
// }