import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../../App';

import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import EditItemInModal from '../../../utils/editItemInModal';





const MyItemsTab = () => {
        const { userData, updateItemSelectedToEdit } = useContext(UserContext);
        const [inventory, setInventory] = useState([]);
        const [usersInventory, setUsersInventory] = useState([])
        const [lgShow, setLgShow] = useState(false);
        const user = userData;
        
        let navigate = useNavigate();
        let id = user.id
        let myInventory = usersInventory;

        useEffect(() => {
            fetchUsersInventory();

            }, []);

            const handleClose = () => setLgShow(false)

        const handleSetItem = (e) => {
            const inputID = e.target.value
            fetchItemToEdit(inputID)
            setLgShow(true)
            // console.log("inputID from modal Button",inputID)
        }
        const handleRefresh = async() => {
            fetchUsersInventory();

            // fetchInventory();
            // filterInventoryByUserID(id);
           }
           function timeout(delay) {
            return new Promise( res => setTimeout(res, delay) );
        }

        const fetchItemToEdit = async (id) => {
            const inputID = id
            try {
                fetch(`http://localhost:4400/item/${inputID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => res.json())
                .then(requestedItem => {
                    updateItemSelectedToEdit(requestedItem)
        
                            console.log("auth inventory server response",requestedItem)
                })
                // .then(setShowTable(true))
                .catch((err) => console.log(err))
            } catch (err) {
                console.log('Failed to fetch items')
            }
         }
        function ViewEditDeleteModal() {
            return (
              <>
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>View - Edit - Delete</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
    
                  <EditItemInModal closeModal={handleClose}/>
    
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    
                  </Modal.Footer>
                </Modal>
              </>
            );
          }

        const fetchUsersInventory = useCallback(async () => {
            if(user.username){
                try {
                    const response = await fetch(`http://localhost:4400/inventory/${id}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
                const usersItems = await response.json();
                if (usersItems && usersItems.length > 0) {
                    setUsersInventory(usersItems);
                } else {
                    console.log('No items found');
                }
                } catch (err) {
                    console.log('Failed to fetch items')
                }
            }
        }, [])

console.log("STATE - inventory",inventory)
console.log("STATE users inventory",usersInventory)


        const FilteredInventory = () => {


            
            if(myInventory.length > 0){
                return (
                    <>
                    <div className='items-list-container slide-in-left' id='items-list-container'>


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
                                <li key={item.id} role='row'>
                                <div className='id-col'>{item.id}</div>
                                <div className='employee-id-col'>{item.item_userid}</div>
                                <div className='name-col'>{item.item_name}</div>
                                <div className='desc-col'>{item.item_description.length > 100 ? item.item_description.slice(0,100) + "..." : item.item_description}</div>
                                <div className='quantity-col'>{item.item_quantity}</div>
                                <div className='button-col'>
                                <Button variant="primary" value={item.id} onClick={handleSetItem}>
                                    View
                                </Button>
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
                    <div className='items-list-container container'>
                        <div className='container-sm'>
                            <button className='btn btn-secondary' onClick={handleRefresh}>refresh your item list</button>
                        </div>
                        <div id='employee-filtered-inventory' className='authorized-inventory-list' title='Employee Inventory List' role="list">
                            <div className='employee-name'> Items added by: <span className='h3'> You</span></div>
                            <ul>
                                <li className="Authorized-inventory-header">
                                    <div className='id-col'>ID</div>
                                    <div className='employee-id-col'>Employee_ID</div>
                                    <div className='name-col'>ITEM_NAME</div>
                                    <div className='desc-col'>DESCRIPTION</div>
                                    <div className='quantity-col'>QUANTITY</div>
                                    <div className='button-col'></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </>
                )
            }
    
        }
    
    return (
        <>
            <div className='container-sm'>
                <button className='btn btn-secondary' onClick={handleRefresh}>refresh your item list</button>
            </div>
            <ViewEditDeleteModal />
            <FilteredInventory />
        </>
    )
}

export default MyItemsTab;