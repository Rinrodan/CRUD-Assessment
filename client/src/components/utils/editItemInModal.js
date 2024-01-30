import { useContext, useEffect, useState } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";





const EditItemInModal = (props) => {
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
            // console.log("NEW NAME::::::::::::::::::::::: ",itemName)
    const handleDelete = () => {
        setSelectedItem([])
        fetch(`http://localhost:4400/item/delete/${selectedItem.id}`, {
            method: 'DELETE',
            
            headers: {'Content-Type': 'application/json'},

            })
            .then(res => res.json())
            .then(() => {alert("Deleted"); props.closeModal(); navigate(`/dashboard/${user.username}`)})
        
        setShowAlert(false)
    }

    const handleCancelEdit = () => {
        setItemName(item.item_name)
        setItemDescription(item.item_description)
        setItemQuantity(item.item_quantity)
        setEditMode(false)
        setShowSaveButton(false)
        props.closeModal()
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
        .then(updatedItedItemResponse => {setSelectedItem(updatedItedItemResponse[0]);updateItemSelectedToEdit([]);props.closeModal(); navigate(`/dashboard/${user.username}`)})
    }
    

return (
    <>
        {(showAlert) && <div className="bg-danger p-4">
            <p>confirm delete</p>
            <button onClick={() => setShowAlert(false)} className="btn btn-dark">cancel</button>
            <button onClick={handleDelete} className="btn btn-warning">confirm</button>
        </div>}
        {(showSaveAlert) && <div className="bg-danger p-2 rounded-lg z-index-1 position-absolute top-50 start-50 translate-middle">
            <p>confirm save</p>
            <button onClick={() => setShowSaveAlert(false)} className="btn btn-dark">cancel</button>
            <button onClick={submitEditsToItem} className="btn btn-warning">confirm</button>
    </div>}

    <table className="table table-striped edit-item-in-modal">
        <thead>
            <tr>
                <th className="type-column"></th>
                <th className="data-column"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="type-column">id</td>
                <td className="data-column no-edit">{selectedItem.id}</td></tr>
            <tr>
                <td className="type-column">user id</td>
                <td className="data-column no-edit">{selectedItem.item_userid}</td></tr>
                <tr>{editMode 
                    ? <>
                        <td className="type-column">Name</td>
                        <td className="data-column">
                            <input 
                                className="editModeOn smaller" 
                                value={itemName} onChange={(e) => {setItemName(e.target.value); setShowSaveButton(true)}} required>
                            </input>
                        </td>
                    </> 
                    : <>
                        <td className="type-column">Name</td>
                        <td className="data-column no-edit">{selectedItem.item_name}</td>
                    </>}
                </tr>
                <tr>{editMode 
                    ? <>
                        <td className="type-column full-description">Full Description</td>
                        <td className="data-column">
                            <textarea 
                                className="editModeOn input-description" 
                                rows="2" 
                                cols="1" 
                                wrap="hard" 
                                value={itemDescription} 
                                onChange={(e) => {setItemDescription(e.target.value); setShowSaveButton(true)}} required>
                            </textarea>
                        </td>
                    </>
                    : <>
                        <td className="type-column full-description">Full Description</td>
                        <td className="data-column ">{selectedItem.item_description}</td>
                    </>}
                </tr>
                <tr>{editMode 
                    ? <>
                        <td className="type-column">quantity</td>
                        <td className="data-column ">
                            <input  
                                className="editModeOn smaller" 
                                required value={itemQuantity} 
                                onChange={(e) => {setItemQuantity(e.target.value); setShowSaveButton(true)}}>
                            </input>
                        </td> 
                    </>
                    : <>
                        <td className="type-column">quantity</td>
                        <td className="data-column no-edit">{selectedItem.item_quantity}</td>
                    </>}
                </tr>
                
                <tr> 
                
                    {editMode 
                    ? <>
                        <td className="type-column"></td>
                        <td className="">
                            <button className="btn btn-info float-end" onClick={() => handleCancelEdit()}>cancel edit</button>
                        </td>
                    </> 
                    : <>
                        <td className="type-column">
                            <button className="btn btn-danger" onClick={() => setShowAlert(true)}>Delete</button>
                        </td>
                        <td>
                            
                            <button className="btn btn-info float-end" onClick={() => setEditMode(true)}>edit</button>
                        </td>
                        
                    </>}
         
                </tr> 
                <tr>
                    <td>
                        {showSaveButton 
                                        ? <Button className="bg-success position-absolute bottom-0 start-50 translate-middle-x" onClick={handleSave} id="save-button">save</Button>
                                    : ""}
                    </td>
                    <td></td>
                </tr>


         
        </tbody>
    </table>
    {editMode ? <div className="z-index-1 position-absolute editModeOn  h1">EDIT MODE ACTIVE</div> : ""
            }
    </>
  );
}


    return (
        <>
<Table />
    </>
    )
  };

export default EditItemInModal;