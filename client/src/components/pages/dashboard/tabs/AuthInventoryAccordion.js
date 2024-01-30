
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../App";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Navigate, useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";


// export const GetAllItems = () => {

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
const NoItemToEdit = {
    id:999,
    item_userid:999,
    item_name:"Missing Item",
    item_description:"OOPS! There is no Item Here",
    item_quantity:999
}

const AuthInventoryAccordion = () => {
    const { userData, itemSelectedToEdit, updateItemSelectedToEdit} = useContext(UserContext);
    const itemEditContext = itemSelectedToEdit
    const user = userData;
    let navigate = useNavigate();

    const [inventory, setInventory] = useState([]);
    const [item, setItem] = useState(NoItemToEdit)
    const [selectedItem, setSelectedItem] = useState(item)
    const [showAlert, setShowAlert] = useState(false);
    const [showSaveAlert, setShowSaveAlert] = useState(false);
    const [editMode, setEditMode] = useState({});
    const [itemName, setItemName] = useState(item.item_name)
    const [itemDescription, setItemDescription] = useState(item.item_description)
    const [itemQuantity, setItemQuantity] = useState(item.item_quantity)
    const [showSaveButton, setShowSaveButton] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        function hasContent(obj) {
            return Object.keys(obj).length > 0;
          }
        if(hasContent(itemSelectedToEdit)){ setItem(itemSelectedToEdit) } 
    }, [itemEditContext])

    useEffect(() => {
        setSelectedItem(item)
 }, [item])

    useEffect(() => {
        setSelectedItem(itemSelectedToEdit)
        setItemDescription(itemSelectedToEdit.item_description)
        setItemName(itemSelectedToEdit.item_name)
        setItemQuantity(itemSelectedToEdit.item_quantity)
    }, [itemEditContext])

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
        }
    }
    const filterInventoryByItemID = useCallback((id) => {
        const inputID = id;
        const filteredItem = inventory.filter(filterByItemID);
        console.log("filter item param id::",inputID)
        function filterByItemID(item) {
          let requestedID = id;
          return item.id == requestedID;  }
          console.log("filter item result:",filteredItem[0])
          setItem(filteredItem)
        
        return filteredItem[0]
   
      }, []);

    const handleRefresh = () => fetchData()

    const handleEdit = async(e) => {
        const inputID = e.currentTarget.value;
        setSelectedItem([])
        try{
            const filteredItem = await filterInventoryByItemID(inputID)
            
         
                console.log("filtered item from await", filteredItem)
                console.log("selected item from state", selectedItem)

        } catch (err) {
                console.log('Failed to fetch items')
        }


        // console.log("selected item from state after handleEdit:", selectedItem)
console.log("edit mode status inside handle edit", inputID)
  
        setEditMode(prev => ({
            ...prev, 
            [inputID]: !prev[inputID]
        }));
    }
   
    const handleDelete = () => {
        setSelectedItem([])
        fetch(`http://localhost:4400/item/delete/${selectedItem.id}`, {
            method: 'DELETE',
            
            headers: {'Content-Type': 'application/json'},

            })
            .then(res => res.json())
            .then(() => {alert("Deleted"); navigate(`/dashboard/${user.username}`)})
        
        setShowAlert(false)
    }

    const handleCancelEdit = () => {
        setItemName(item.item_name)
        setItemDescription(item.item_description)
        setItemQuantity(item.item_quantity)
        setEditMode({})
        setShowSaveButton(false)
    }
    const handleSave = () => {
        setShowSaveAlert(true)
    }

    const submitEditsToItem = () => {
        setEditMode({})
        setShowSaveButton(false)
        setShowSaveAlert(false)
        const updateToItemSubmit = {
            item_name:itemName,
            item_description:itemDescription,
            item_quantity:itemQuantity
        }
        fetch(`http://localhost:4400/items/${selectedItem.id}`, {
        method: 'PATCH',

        body: JSON.stringify(updateToItemSubmit),             
        headers: {'Content-Type': 'application/json'},

        })
        .then(res => res.json())
        .then(updatedItedItemResponse => {setSelectedItem(updatedItedItemResponse[0]); navigate(`/dashboard/${user.username}`)})
    }

    const InventoryTable = () => {

        if (Array.isArray(inventory) && inventory.length > 0) { 

            return (
        

                <>
                    {(showAlert) && <div className="bg-danger p-4">
                        <p>confirm delete</p>
                        <button onClick={() => setShowAlert(false)} className="btn btn-dark">cancel</button>
                        <button onClick={handleDelete} className="btn btn-warning">confirm</button>
                    </div>}
                    {(showSaveAlert) && <div className="bg-danger p-4">
                        <p>confirm save</p>
                        <button onClick={() => setShowSaveAlert(false)} className="btn btn-dark">cancel</button>
                        <button onClick={submitEditsToItem} className="btn btn-warning">confirm</button>
                    </div>}
                    

                    <div className='accordion-inventory-list-auth' title='Public Inventory List' role="list">
                    <Accordion className="accordion">
                    {inventory.map(item => ( 
                    <Accordion.Item eventKey={item.id} key={item.id} className="accordion-item">
                        <Accordion.Header>
                            <div className="h4 px-4">{item.item_name}</div><div>{item.item_description.length > 100 ? item.item_description.slice(0,100) + "..." : item.item_description}
                            </div> </Accordion.Header>
                        <Accordion.Body className="accordion-item-body">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="col"></th>
                                        <th className="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="type-column">Item ID:</td>
                                    <td className="data-column">{item.id}</td>
                                </tr>
                                <tr>
                                    <td className="type-column">User ID:</td>
                                    <td className="data-column">{item.item_userid}</td>
                                </tr>
                                <tr>
                                    <td className="type-column">Name:</td>
                                    <td className="data-column">
                                        {editMode[item.id] ? <>
                                            <input value={itemName} onChange={(e) => {setItemName(e.target.value); setShowSaveButton(true)}} className="editModeOn">
                                            </input> 
                                        </>
                                        : <>{item.item_name}</> }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="type-column">Full Description:</td>
                                    <td className="data-column">
                                        {editMode[item.id] ? <>
                                            <input value={itemDescription} onChange={(e) => {setItemDescription(e.target.value); setShowSaveButton(true)}} className="editModeOn"></input>
                                            </> 
                                            : <>{item.item_description}</>}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="type-column">Quantity:</td>
                                    <td className="data-column">
                                        {editMode[item.id] ? <>
                                            <input value={itemQuantity} onChange={(e) => {setItemQuantity(e.target.value); setShowSaveButton(true)}} className="editModeOn"></input></> : <>{item.item_quantity}
                                        </>}
                                    </td>
                                </tr>
                                <tr>
                                    <td> 
                                        {editMode[item.id] ? <>
                                            <button onClick={() => handleCancelEdit()}>
                                                cancel edit
                                            </button></> 
                                            : <>
                                                <button value={item.id} onClick={handleEdit}>
                                                    edit
                                                </button>
                                                <button onClick={() => setShowAlert(true)}>
                                                    Delete
                                                </button>
                                        </>}
                                        {showSaveButton ? <><button onClick={handleSave} id="save-button">save</button></> : ""}
                                    </td>
                                </tr>
                
                                </tbody>
                            </table>
                    
                        </Accordion.Body>
                        {editMode[item.id] ? <div className="editModeOn m-3 h1">EDIT MODE ACTIVE</div> : ""}
                    </Accordion.Item>))}
                    </Accordion>
                    </div>
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
            <button onClick={handleRefresh}>refresh the inventory</button>
          
            {/* <GetAllItems /> */}
            { <InventoryTable />}
    
    </>
            
        )
    
    }
    export default AuthInventoryAccordion