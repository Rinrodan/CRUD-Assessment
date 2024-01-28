import { useContext, useEffect, useState } from "react";
import EditItem from "./editItem"
import { UserContext } from "../../../App";
import { Navigate, useNavigate } from 'react-router-dom';
import EditItemPractice from "./editbuttonPractice";
const selectedItem = {
    id:1,
    item_userid:4,
    item_name:"Screw Driver",
    item_description:"A long Description about the itne",
    item_quantity:99
}


const EditItemPage = () => {
    const { userData } = useContext(UserContext);
    const user = userData;
    let navigate = useNavigate();

    const [id, setId] = useState(selectedItem.id); 
    const [item_userid, setItemUserId] = useState(selectedItem.item_userid);
    const [item_name, setItemName] = useState(selectedItem.item_name);
    const [item_description, setItemDescription] = useState(
      selectedItem.item_description);
    const [item_quantity, setItemQuantity] = useState(selectedItem.item_quantity); 
    const [disabled, setDisabled] = useState(true);
    
    //select item to edit dropdown similar to item by employee
    // fetch single item
    // send selected item to EditItem as a prop
    // edit item will display the form
    // clicking edit will change fields to edit mode



    useEffect(() => {
        if(user.length <3){
            navigate('/')
        }
    }, [user])

    const toggleEditMode = () => {

    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
          case 'id':
            setId(value);
            break;
          case 'item_userid':
            setItemUserId(value);
            break;
          case 'item_name':
            setItemName(value);
            break;
          case 'item_description':
            setItemDescription(value);
            break;
          case 'item_quantity':
            setItemQuantity(value);
            break;
          default:
            break;
        }
      };
      const initialList = [
        {
          id: 'a',
          task: 'Learn React',
          isComplete: false,
        },
        {
          id: 'b',
          task: 'Learn GraphQL',
          isComplete: true,
        },
      ];
      


    const handleSubmit = () => {
console.log("Handle Submit called",)
        return(
            <>
      
            </>
        )
    }
    return (
<>
        {/* <form onSubmit={handleSubmit}>
            <ul>
                <li>
                    <label>Item ID: 
                    <input 
                    type="text"
                    name="item_userid"
                    value={selectedItem.item_userid}
                    id={selectedItem.item_userid}
                    className=""
                    readonly="readonly"
                    defaultValue
                    style={{backgroundColor: 'lightGray', width: '2rem'}}
                   />
                    </label>
                </li>
            <li>
            <li>
                <label>Item created by ID: 
                <input 
                    type="text"
                    name="item_userid"
                    value={selectedItem.item_userid}
                    id="item-name-input"
                    className=""
                    readonly="readonly"
                    defaultValue
                    style={{backgroundColor: 'lightGray', width: '2rem'}}
                   />
            </label></li>
                <label>item name: 
                <input
                    type="text"
                    value={selectedItem.item_name}
                    name="item_name"
                    id="item-name-input"
                    className=""
                    onChange={handleChange}
                 />
            </label></li>

            <li>
                <label>Item Description: 
                <input 
                    type="textarea"
                    name="item_description"
                    defaultValue={selectedItem.item_description}
                    value={selectedItem.item_description}
                    id="item_description"
                    className=""
                    onChange={handleChange}/>
            </label></li>
            <li>
                <label>Item Quantity: 
                <input  
                    type="text"
                    name="item_quantity"
                    value={selectedItem.item_quantity}
                    id="item_quantity"
                    className=""
                    onChange={handleChange}/>
            </label></li>
            <button type="edit" onClick={toggleEditMode}>Edit Item</button>
<button type="submit">Save Changes</button>

            </ul>
        </form> */}
{/* <div>=======================================================================================</div> */}

<EditItemPractice />

        </>      
    )
}
export default EditItemPage