import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import NewItemTab from './tabs/newItemTab';
import AuthInventory from './tabs/AuthInventory';
import { createContext, useState } from 'react';
import EmployeeItems from './tabs/itemsByEmployee';


export const InventoryContext = createContext(null);

export const GetAllItems = () => {

    function GetFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
      }
      const token = GetFromLocalStorage("added-items")
      if(!token){
        // Navigate('/')
        console.log("THERE IS NO TOKEN!!!!!!!!!!!")
      } else {
    try {
        fetch('http://localhost:4400/inventory', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())

        .then((items) => { return items })
        .catch((err) => console.log(err))
    } catch (err) {
        console.log('Failed to fetch items')
    }
    }
}

function InventoryTabs() {
    const [inventory, setInventory] = useState([])


    const updateInventoryData = (data) => {
        setInventory(data);
    
      };
  return (

    <InventoryContext.Provider value={{ inventory, updateInventoryData }}>
        <Tabs
        defaultActiveKey="ALL"
        id="uncontrolled-tab-example"
        className="mb-3 inventory-tabs"
        >
            <Tab eventKey="ALL" title="ALL">
                <AuthInventory />
            </Tab>
            <Tab eventKey="users" title="Items by Employee">
                Inventory Items By Inventory Manager
                <EmployeeItems />
            </Tab>
            <Tab eventKey="profile" title="MY ITEMS">
                Inventory Items By Inventory Manager
            </Tab>
            <Tab eventKey="contact" title="⊕ NEW ITEM">
                <NewItemTab />
            </Tab>

        </Tabs>
    </InventoryContext.Provider>
  );
}

export default InventoryTabs;