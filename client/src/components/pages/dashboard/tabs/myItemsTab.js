import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../../App';

import { Navigate, useNavigate } from 'react-router-dom';





const MyItemsTab = () => {
        const { userData, updateItemSelectedToEdit } = useContext(UserContext);
        const user = userData;
    
    
        const [inventory, setInventory] = useState([]);
        const [usersInventory, setUsersInventory] = useState([])
        const [selectedUser, setSelectedUser] = useState([])
        
        let navigate = useNavigate();
        let id = user.id
        let myInventory = usersInventory;

        useEffect(() => {
            fetchInventory();
            filterInventoryByUserID(id);
            }, []);
           const handleRefresh = () => {
            fetchInventory();
            filterInventoryByUserID(id);
           }

        const fetchInventory = useCallback(async () => {
            if(user.username){
                try {
                    fetch('http://localhost:4400/inventory', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res) => res.json())
                    .then(items => setInventory(items))

                    .catch((err) => console.log(err))
                } catch (err) {
                    console.log('Failed to fetch items')
                }
            }
        }, [inventory])

        const filterInventoryByUserID = useCallback((id) => {
            const filteredItems = inventory.filter(filterByUserId);
            function filterByUserId(item) {
              let requestedID = id;
              return item.item_userid == requestedID;  }
            setUsersInventory(filteredItems)
          }, [inventory]);
        const FilteredInventory = () => {

            // console.log(usersInventory)
            if(myInventory.length > 0){
                return (
                    <>
           
                    <div className='items-list-container' id='items-list-container'>
            
                        <div id='employee-filtered-inventory' className='authorized-inventory-list' title='Employee Inventory List' role="list">
                            <div className='employee-name'> Items added by: <span className='h3'> You</span></div>
                            <ul>
                                <li className="Authorized-inventory-header">
                                    <div className='id-col'>ID</div>
                                    <div className='employee-id-col'>Employee ID</div>
                                    <div className='name-col'>ITEM NAME</div>
                                    <div className='desc-col'>DESCRIPTION</div>
                                    <div className='quantity-col'>QUANTITY</div>
                                    <div className='button-col'></div>
                                </li>
                            {usersInventory.map(item => (
                                <li key={item.id}>
                                <div className='id-col'>{item.id}</div>
                                <div className='employee-id-col'>{item.item_userid}</div>
                                <div className='name-col'>{item.item_name}</div>
                                <div className='desc-col'>{item.item_description.length > 100 ? item.item_description.slice(0,100) + "..." : item.item_description}</div>
                                <div className='quantity-col'>{item.item_quantity}</div>
                                <div className='button-col'>
                                <button className="btn" onClick={() => {updateItemSelectedToEdit(item); navigate(`/items/:${item.id}`)}}>
                                    Edit
                                    </button>
                                </div>
                                </li>
                            ))}
                            </ul>
                        </div>
    
                    
                    </div>
                    </>
                )
    
            } else {
                return (
                    <>
                    <div className='items-list-container row'>
                        <div className='items-list-empty row col-lg-12'>
                            <button className='col' onClick={handleRefresh}>refresh your item list</button>
                        </div>
                    </div>
                    </>
                )
            }
    
        }
    
    return (
        <>
            <FilteredInventory />
        </>
    )
}

export default MyItemsTab;