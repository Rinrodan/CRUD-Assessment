    import { useContext, useEffect, useState } from "react";
    import React from "react";
import { UserContext } from "../../../App";
import { useNavigate } from "react-router-dom";



    
const EditItem = () => {
    let navigate = useNavigate();
    const NoItemToEdit = {
        id:999,
        item_userid:999,
        item_name:"Missing Item",
        item_description:"OOPS! There is no Item Here",
        item_quantity:999
    }

    const Table = () => {

        const { userData, itemSelectedToEdit, updateItemSelectedToEdit} = useContext(UserContext);
            const itemEditContext = itemSelectedToEdit
            const user = userData;


        const [item, setItem] = useState(NoItemToEdit)
        const [selectedItem, setSelectedItem] = useState(item)
        const [showAlert, setShowAlert] = useState(false);
        const [showSaveAlert, setShowSaveAlert] = useState(false);
        const [editMode, setEditMode] = useState(false);
        const [itemName, setItemName] = useState(item.item_name)
        const [itemDescription, setItemDescription] = useState(item.item_description)
        const [itemQuantity, setItemQuantity] = useState(item.item_quantity)
        const [showSaveButton, setShowSaveButton] = useState(false)
    
        useEffect(() => {
            function hasContent(obj) {
                return Object.keys(obj).length > 0;
              }
            if(hasContent(itemSelectedToEdit)){ setItem(itemSelectedToEdit) } 
        }, [itemEditContext])

        useEffect(() => {
            setSelectedItem(itemSelectedToEdit)
            setItemDescription(itemSelectedToEdit.item_description)
            setItemName(itemSelectedToEdit.item_name)
            setItemQuantity(itemSelectedToEdit.item_quantity)
        }, [itemEditContext])


// console.log("consuming context at iditItem: ::::::::::", itemEditContext)
// console.log("editItem useState item: ::::::::::", item)
// console.log("editItem useState selectedItem: ::::::::::", selectedItem)

        // const updateToItem = {
        //     id:selectedItem.id,
        //     item_userid:selectedItem.item_userid,
        //     item_name:itemName,
        //     item_description:itemDescription,
        //     item_quantity:itemQuantity
        // }
        // console.log("NEW NAME::::::::::::::::::::::: ",itemName)
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
            setEditMode(false)
            setShowSaveButton(false)
        }
        const handleSave = () => {
            setShowSaveAlert(true)
        }
    
        const submitEditsToItem = () => {
            setEditMode(false)
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
        {editMode ? <div className="editModeOn m-3 h1">EDIT MODE ACTIVE</div> : ""
                }
        <table>
            <thead><tr><td>id</td><td>user id</td><td>name</td><td>description</td><td>quantity</td><td></td></tr></thead>
            <tbody>
                <tr>
                    <td>{selectedItem.id}</td>
                    <td>{selectedItem.item_userid}</td>
                    <td>{editMode ? <input value={itemName} onChange={(e) => {setItemName(e.target.value); setShowSaveButton(true)}} className="editModeOn"></input> : <>{selectedItem.item_name}</>}
                    </td>
                    <td>{editMode ? <input value={itemDescription} onChange={(e) => {setItemDescription(e.target.value); setShowSaveButton(true)}} className="editModeOn"></input> : <>{selectedItem.item_description}</>}
                    </td>
                    <td>{editMode ? <input value={itemQuantity} onChange={(e) => {setItemQuantity(e.target.value); setShowSaveButton(true)}} className="editModeOn"></input> : <>{selectedItem.item_quantity}</>}
                    </td>
                    <td> {editMode ? <><button onClick={() => handleCancelEdit()}>cancel edit</button></> : <><button onClick={() => setEditMode(true)}>edit</button><button onClick={() => setShowAlert(true)}>Delete</button></>}
                        {showSaveButton ? <><button onClick={handleSave} id="save-button">save</button></> : ""}
                    </td>
                </tr>   
            </tbody>
        </table>
    
        </>
      );
    }
    

        return (
            <>
    <Table />
        </>
        )
      };

export default EditItem;