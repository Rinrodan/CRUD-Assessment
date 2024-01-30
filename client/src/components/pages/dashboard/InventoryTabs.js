import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import NewItemTab from './tabs/newItemTab';
import AuthInventory from './tabs/AuthInventory';
import { createContext, useState } from 'react';
import EmployeeItems from './tabs/itemsByEmployee'
import MyItemsTab from './tabs/myItemsTab';

import PublicInventoryAccordion from '../landingPage/PublicInventoryAccordion';
import AuthInventoryAccordion from './tabs/AuthInventoryAccordion';
import AuthInventoryWithModal from './tabs/AuthInventoryWithModal';
import ExampleModal from '../../utils/MODALpractice';




export const InventoryContext = createContext(null);


function InventoryTabs() {

  return (

    // <InventoryContext.Provider value={{ inventory, updateInventoryData }}>
        <Tabs
        defaultActiveKey="my-items"
        id="inventory-tab-container"
        className="mb-3 inventory-tabs"
        role = "tabs-container"
        >
            <Tab eventKey="all" title="ALL" className='page'>
                {/* <AuthInventoryAccordion /> */}
                {/* <AuthInventory/> */}
                {/* <ExampleModal /> */}
                <AuthInventoryWithModal/>
            </Tab>

            <Tab eventKey="employee-items" title="Items by Employee" id='employee-items-tab' className='employee-items-tab page'>
           
                <EmployeeItems />
            </Tab>

            <Tab eventKey="new" title="⊕ NEW ITEM" className='page'>
                <NewItemTab />
            </Tab>

            <Tab eventKey="my-items" title="MY ITEMS" className='page'>
                <MyItemsTab />
            </Tab>
            <Tab eventKey="public" title="Public Inventory" className='page'>
                {/* <PublicInventoryAccordion /> */}
                {/* <AuthInventoryAccordion /> */}
              
                <AuthInventoryWithModal/>
            </Tab>

        </Tabs>
    // </InventoryContext.Provider>
  );
}

export default InventoryTabs;