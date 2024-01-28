import { useState } from "react";
import React from "react";
import { Alert, Button } from "react-bootstrap";

// const textInputStyle = {
//     width: "100%",
//     padding: "10px",
//     border: "1px solid #dfdfdf",
//     outline: "none",
// }

const item = {
    id:1,
    item_userid:4,
    item_name:"Screw Driver",
    item_description:"A long Description about the itne",
    item_quantity:99
}
const itemTwo = {
    id:2,
    item_userid:1,
    item_name:"UpdateItem",
    item_description:"This Saved to State",
    item_quantity:99
}



export const Table = () => {
const [selectedItem, setSelectedItem] = useState(item)
const [tempState, setTempState] = useState(selectedItem)
const [showAlert, setShowAlert] = useState(false);
const [editMode, setEditMode] = useState(false);
const [itemName, setItemName] = useState(item.item_name)
const [itemDescription, setItemDescription] = useState(item.item_description)
const [itemQuantity, setItemQuantity] = useState(item.item_quantity)


const updateToItem = {
    id:selectedItem.id,
    item_userid:selectedItem.item_userid,
    item_name:itemName,
    item_description:itemDescription,
    item_quantity:itemQuantity
}

console.log("NEW NAME::::::::::::::::::::::: ",itemName)
const handleDelete = () => {
    setSelectedItem([])
    setShowAlert(false)
}
const handleReset = () =>  setSelectedItem(item)
const handleDeleteAll = () => {
    // Perform your dangerous critical action here.
    // Remember to close your alert
  
    setShowAlert(false);
  };
  const handleSave = () => {
  
    setEditMode(false)
    setSelectedItem(updateToItem)
  }



return (
    <>




    <button onClick={handleReset}>reset</button>
    <table>
        <thead>
            <tr>
                <td>id</td>
                <td>user id</td>
                <td>name</td>
                <td>description</td>
                <td>quantity</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>{selectedItem.id}</td>
            <td>{selectedItem.item_userid}</td>
            <td>{editMode 
                ? <input value={itemName} onChange={(e) => setItemName(e.target.value)}></input> 
                : <>{selectedItem.item_name}</>}
            </td>
            <td>{editMode 
                ? <input value={itemDescription} onChange={(e) => setItemDescription(e.target.value)}></input> 
                : <>{selectedItem.item_description}</>}</td>
            <td>{editMode 
                ? <input value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)}></input> 
                : <>{selectedItem.item_quantity}</>}</td>

            <td>
                {editMode ? <><button onClick={() => setEditMode(false)}>cancel edit</button><button onClick={handleSave}>save</button></> : ""}
                    <button onClick={() => setEditMode(true)}>edit</button>
                    <button onClick={() => setShowAlert(true)}>Delete</button>

                </td>
            </tr>   
            <tr>
                {(showAlert) && <div className="bg-danger p-4">
                    <p>confirm delete</p>
                    <button onClick={() => setShowAlert(false)} className="btn btn-dark">cancel</button>
                    <button onClick={handleDelete} className="btn btn-warning">confirm</button>
                </div>}
                {editMode ? "<p>YES edit</p>" : "<p>no edit</p>"
            }
            </tr>
        </tbody>
    </table>
    </>
  );
}

const EditItemPractice = () => {
    return (
        <>
<Table />
    </>
    )
  };
  export default EditItemPractice