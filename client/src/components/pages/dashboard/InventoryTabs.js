import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import NewItemTab from './tabs/newItemTab';
import AuthInventory from './tabs/AuthInventory';
import { createContext, useState } from 'react';
import EmployeeItems from './tabs/itemsByEmployee'
import MyItemsTab from './tabs/myItemsTab';



export const InventoryContext = createContext(null);


function InventoryTabs() {
    const [inventory, setInventory] = useState([])


    // const updateInventoryData = (data) => {
    //     setInventory(data);
    
    //   };
  return (

    // <InventoryContext.Provider value={{ inventory, updateInventoryData }}>
        <Tabs
        defaultActiveKey="all"
        id="inventory-tab-container"
        className="mb-3 inventory-tabs"
        role = "tabs-container"
        >
            <Tab eventKey="all" title="ALL">
                <AuthInventory />
            </Tab>
            <Tab eventKey="employee-items" title="Items by Employee" id='employee-items-tab' className='employee-items-tab'>
           
                <EmployeeItems />
            </Tab>

            <Tab eventKey="new" title="⊕ NEW ITEM">
                <NewItemTab />
            </Tab>

            <Tab eventKey="MYITEMS" title="MY ITEMS">
                <MyItemsTab />
            </Tab>

        </Tabs>
    // </InventoryContext.Provider>
  );
}

export default InventoryTabs;