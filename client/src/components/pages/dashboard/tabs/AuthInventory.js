import { Button, Form, InputGroup } from "react-bootstrap"

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../App";

const AuthInventory = () => {
    const [inventory, setInventory] = useState([]);
    const [showTable, setShowTable] = useState(false)
    const { userData } = useContext(UserContext);
    const user = userData;


        useEffect(() => {
            
            const fetchData = async () => {
                if(user.username){
                
                try {
                    fetch('http://localhost:4400/items', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res) => res.json())
                    .then(items => {
                        setInventory(items) &&
                        setShowTable(true);
                    })
                    // .then(setShowTable(true))
                    .catch((err) => console.log(err))
                } catch (err) {
                    console.log('Failed to fetch items')
                }
            };}
            fetchData();
        }, []);
    
    const handleClick = () => {

        InventoryTable();
          
    }
    console.log("Show Table state", showTable);

    const toggleDescription = (e) => {
        // const id = ""
      
        // const shortDescription = document.getElementById(id + 'short');
        // const longDescription = document.getElementById(id + 'long');

        // shortDescription.classList.add('hidden');
        // longDescription.classList.remove('hidden');
      };

    const InventoryTable = () => {

        if (Array.isArray(inventory) && inventory.length > 0) { 
            console.log("Show Table state", showTable);
            setShowTable(true);
            console.log("GetAllItems set state response", inventory);
            console.log("Show Table state", showTable);
            return (
                <div className='inventory-table-public'>
                    <table className="tg">
                        <thead>
                            <tr>
                                <th className="tg-0lax">ID#</th>
                                <th className="tg-0lax">Name</th>
                                <th className="tg-0lax">Description</th>
                                <th className="tg-0lax">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map(item => (
                                <>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{(item.item_name) && <div>{item.item_name}</div>}</td>
                                    <td>{item.item_name}</td>
                                    <td>
                                        <div id={item.id + "short"} className="short-description">
                                            {item.item_description.length > 100 ? item.item_description.slice(0,100) + "..." : item.item_description}
                                        </div>
                                        <div id={item.id + "long"} className="full-description hidden">
                                            {item.item_description}
                                        </div>
                                    </td>
                                    <td>{item.item_quantity}</td>
                                    <button value={item.id} onClick={toggleDescription()}>see full description</button>
                                </tr>

                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            console.log("inventory is empty");
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