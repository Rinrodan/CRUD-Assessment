// import { useState } from "react";
// import React from "react";
// import { Alert, Button } from "react-bootstrap";



// const item = {
//     id:1,
//     item_userid:4,
//     item_name:"Screw Driver",
//     item_description:"A long Description about the itne",
//     item_quantity:99
// }
// const itemTwo = {
//     id:2,
//     item_userid:1,
//     item_name:"UpdateItem",
//     item_description:"This Saved to State",
//     item_quantity:99
// }

// export const Table = () => {

//     const [selectedItem, setSelectedItem] = useState(item)
//     const [showAlert, setShowAlert] = useState(false);
//     const [showSaveAlert, setShowSaveAlert] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [itemName, setItemName] = useState(item.item_name)
//     const [itemDescription, setItemDescription] = useState(item.item_description)
//     const [itemQuantity, setItemQuantity] = useState(item.item_quantity)
//     const [showSaveButton, setShowSaveButton] = useState(false)

//     // const updateToItem = {
//     //     id:selectedItem.id,
//     //     item_userid:selectedItem.item_userid,
//     //     item_name:itemName,
//     //     item_description:itemDescription,
//     //     item_quantity:itemQuantity
//     // }
//     // console.log("NEW NAME::::::::::::::::::::::: ",itemName)
//     const handleDelete = () => {
//         setSelectedItem([])
//         setShowAlert(false)
//     }

//     const handleCancelEdit = () => {
//         setItemName(item.item_name)
//         setItemDescription(item.item_description)
//         setItemQuantity(item.item_quantity)
//         setEditMode(false)
//         setShowSaveButton(false)
//     }
//     const handleSave = () => {
//         setShowSaveAlert(true)
//     }

//     const submitEditsToItem = () => {
//         setEditMode(false)
//         const updateToItemSubmit = {
//             item_name:itemName,
//             item_description:itemDescription,
//             item_quantity:itemQuantity
//         }
//         fetch(`http://localhost:8080/itemss/${selectedItem.id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updateToItemSubmit)
//         })
//         .then(res => res.json())
//         .then(updatedItedItemResponse => {console.log("updated item server response", updatedItedItemResponse)})
//     }
// return (
//     <>
//         {(showAlert) && <div className="bg-danger p-4">
//                     <p>confirm delete</p>
//                     <button onClick={() => setShowAlert(false)} className="btn btn-dark">cancel</button>
//                     <button onClick={handleDelete} className="btn btn-warning">confirm</button>
//                 </div>}
//         {(showSaveAlert) && <div className="bg-danger p-4">
//             <p>confirm save</p>
//             <button onClick={() => setShowSaveAlert(false)} className="btn btn-dark">cancel</button>
//             <button onClick={submitEditsToItem} className="btn btn-warning">confirm</button>
//     </div>}
//     {editMode ? <div className="editModeOn m-3 h1">EDIT MODE ACTIVE</div> : ""
//             }
//     <table>
//         <thead><tr><td>id</td><td>user id</td><td>name</td><td>description</td><td>quantity</td><td></td></tr></thead>
//         <tbody>
//             <tr>
//                 <td>{selectedItem.id}</td>
//                 <td>{selectedItem.item_userid}</td>
//                 <td>{editMode ? <input value={itemName} onChange={(e) => {setItemName(e.target.value); setShowSaveButton(true)}} className="editModeOn"></input> : <>{selectedItem.item_name}</>}
//                 </td>
//                 <td>{editMode ? <input value={itemDescription} onChange={(e) => {setItemDescription(e.target.value); setShowSaveButton(true)}} className="editModeOn"></input> : <>{selectedItem.item_description}</>}
//                 </td>
//                 <td>{editMode ? <input value={itemQuantity} onChange={(e) => {setItemQuantity(e.target.value); setShowSaveButton(true)}} className="editModeOn"></input> : <>{selectedItem.item_quantity}</>}
//                 </td>
//                 <td> {editMode ? <><button onClick={() => handleCancelEdit()}>cancel edit</button></> : <><button onClick={() => setEditMode(true)}>edit</button><button onClick={() => setShowAlert(true)}>Delete</button></>}
//                     {showSaveButton ? <><button onClick={handleSave} id="save-button">save</button></> : ""}
//                 </td>
//             </tr>   
//         </tbody>
//     </table>

//     </>
//   );
// }

// const EditItemPractice = () => {
//     return (
//         <>
// <Table />
//     </>
//     )
//   };
//   export default EditItemPractice