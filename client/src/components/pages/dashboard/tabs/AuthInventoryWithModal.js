
import React, { useCallback, useContext, useEffect, useState } from "react";


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Navigate } from "react-router-dom";

import { UserContext } from "../../../../App";
import EditItemInModal from "./editItemInModal";




const AuthInventoryWithModal = () => {

    const { userData, itemSelectedToEdit, updateItemSelectedToEdit} = useContext(UserContext);
    const itemEditContext = itemSelectedToEdit
    const user = userData;

    const [inventory, setInventory] = useState([]);
    const [showTable, setShowTable] = useState(false)
    const [show, setShow] = useState(false);
      
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);

    const handleSetItem = (e) => {
        const inputID = e.target.value
        fetchItemToEdit(inputID)
        setLgShow(true)
console.log("inputID from modal Button",inputID)
    }
    const handleClose = () => {
        setLgShow(false)

    }

    console.log("CONTEXT item selected",itemSelectedToEdit)


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

                    // console.log("auth inventory server response",requestedItem)
        })
        // .then(setShowTable(true))
        .catch((err) => console.log(err))
    } catch (err) {
        console.log('Failed to fetch items')
    }
 }

        useEffect(() => {
            
            const fetchData = async () => {
                if(user.username){
                    try {
                        fetch('http://localhost:4400/inventory', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((res) => res.json())
                        .then(items => {
                            setInventory(items)
                                    // console.log("auth inventory server response",items)
                        })
                        // .then(setShowTable(true))
                        .catch((err) => console.log(err))
                    } catch (err) {
                        console.log('Failed to fetch items')
                    }
                };}
                fetchData();
            }, []);
            
// console.log("inventory state=================================", inventory)
    
    const handleClick = () => {

 setInventory([])
          
    }

    function ExampleModal() {

      
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

              <EditItemInModal />

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

    const InventoryTable = () => {

        if (Array.isArray(inventory) && inventory.length > 0) { 
            // console.log("Show Table state", showTable);
           
            // console.log("GetAllItems set state response", inventory);
            // console.log("Show Table state", showTable);

            

            return (
                <>
                    <table className="modal-inventory-list-auth table table-striped">
                        <thead>
                            <tr>
                                <th className="type-column">Item ID:</th>
                                <th className="type-column">User ID:</th>
                                <th className="type-column">Name:</th>
                                <th className="type-column">Full Description:</th>
                                <th className="type-column">Quantity:</th>
                                <th className="type-column"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {inventory.map(item => ( 
                            <tr>
                                <td className="data-column">{item.id}</td>
                                <td className="employee-id-col">{item.item_userid}</td>
                                <td className="name-col">{item.item_name}</td>
                                <td className='desc-col'>{item.item_description.length > 100 ? item.item_description.slice(0,100) + "..." : item.item_description}</td>
                                <td className="quantity-col">{item.item_quantity}</td>
                                <td>
                                    <Button variant="primary" value={item.id} onClick={handleSetItem}>
                                       View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table> 
                </>
            );
        } else {
            // console.log("inventory is empty");
            return <p>No items found</p>;
        }
    };
     




    
    

    return (
    <>
        <h1>Inventory</h1>
        <button onClick={handleClick}>refresh the inventory</button>
        {/* <ItemModal /> */}
        <ExampleModal />
        {/* <GetAllItems /> */}
        { <InventoryTable />}

</>
        
    )

}
export default AuthInventoryWithModal