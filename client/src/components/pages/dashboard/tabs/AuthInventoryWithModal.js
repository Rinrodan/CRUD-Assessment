import React, { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from "../../../../App";
import EditItemInModal from "../../../utils/editItemInModal";




const AuthInventoryWithModal = () => {
    const { userData, itemSelectedToEdit, updateItemSelectedToEdit} = useContext(UserContext);
    const [inventory, setInventory] = useState([]);     
    const [lgShow, setLgShow] = useState(false);

    const itemEditContext = itemSelectedToEdit
    const user = userData;

    const handleSetItem = (e) => {
        const inputID = e.target.value
        fetchItemToEdit(inputID)
        setLgShow(true)
        // console.log("inputID from modal Button",inputID)
    }
    const handleClose = () => setLgShow(false)
    const handleRefreshList = () => updateItemSelectedToEdit([])

            // console.log("CONTEXT item selected",itemSelectedToEdit)


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
            }, [itemEditContext]);
            
// console.log("inventory state=================================", inventory)
    


    function ViewIeditDeleteModal() {
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

    const InventoryTable = () => {

        if (Array.isArray(inventory) && inventory.length > 0) { 
            // console.log("Show Table state", showTable);
           
            // console.log("GetAllItems set state response", inventory);
            // console.log("Show Table state", showTable);
            return (
                <>
                <table className="modal-inventory-list-auth table table-striped">
                    <thead>
                        <tr></tr>
                    </thead>
                    <tbody>
                        <tr className="authorized-inventory-header">
                            <td className="employee-id-col">Item ID:</td>
                            <td className="employee-id-col">User ID:</td>
                            <td className="name-col">Name:</td>
                            <td className="desc-col">Full Description:</td>
                            <td className="quantity-col">Quantity:</td>
                            <td></td>
                        </tr>
                    {inventory.map(item => ( 
                        <tr>
                            <td className="quantity-col">{item.id}</td>
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
        <Button variant="info" onClick={handleRefreshList}>refresh the inventory</Button>

        <ViewIeditDeleteModal />
    
        { <InventoryTable />}
    </>
    )
}
export default AuthInventoryWithModal