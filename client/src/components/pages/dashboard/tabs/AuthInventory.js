
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../App";

import Button from 'react-bootstrap/Button';

import { Navigate } from "react-router-dom";


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


const AuthInventory = () => {
    const [inventory, setInventory] = useState([]);
    const [showTable, setShowTable] = useState(false)
    const { userData } = useContext(UserContext);
    const user = userData;
    const [showModal, setShowModal] = useState(false);
    const [activeModal, setActiveModal] = useState("");
  
    const handleOpenModal = (val) => {
      setActiveModal(val); 
      setShowModal(true);
    };
  
 
    const handleCloseModal = () => {
      setShowModal(false); 
      setActiveModal(""); 
    };

    

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
            }, [inventory]);
            
// console.log("inventory state=================================", inventory)
    
    const handleClick = () => {

 setInventory([])
          
    }


    const toggleDescription = (e) => {
        // const id = ""
      
        // const shortDescription = document.getElementById(id + 'short');
        // const longDescription = document.getElementById(id + 'long');

        // shortDescription.classList.add('hidden');
        // longDescription.classList.remove('hidden');
      };

    const InventoryTable = () => {

        if (Array.isArray(inventory) && inventory.length > 0) { 
            // console.log("Show Table state", showTable);
           
            // console.log("GetAllItems set state response", inventory);
            // console.log("Show Table state", showTable);
            return (
        
                    
                                <>
                                <div className='Authorized-inventory-list' title='Authorized Inventory List' role="list">
                        <ul>
                            <li className="Authorized-inventory-header">
                                <div className='id-col'>ID</div>
                                <div className='employee-id-col'>Employee ID</div>
                                <div className='name-col'>ITEM NAME</div>
                                <div className='desc-col'>DESCRIPTION</div>
                                <div className='quantity-col'>QUANTITY</div>
                                <div className='button-col'></div>
                            </li>
                            
               
                        {inventory.map(item => (
                            <li key={item.id}>
                            <div className='id-col'>{item.id}</div>
                            <div className='employee-id-col'>{item.item_userid}</div>
                            <div className='name-col'>{item.item_name}</div>
                            <div className='desc-col'>{item.item_description.length > 100 ? item.item_description.slice(0,100) + "..." : item.item_description}</div>
                            <div className='quantity-col'>{item.item_quantity}</div>
                            <div className='button-col'></div>
                            <div className="icon">
                                <button className="btn" onClick={() => Navigate(`/items/:${item.id}`)}>
                                Edit
                                </button>

                            </div>
                            

                            </li>
                        ))}
                        </ul>
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
        <button onClick={handleClick}>refresh the inventory</button>
      
        {/* <GetAllItems /> */}
        { <InventoryTable />}

</>
        
    )

}
export default AuthInventory