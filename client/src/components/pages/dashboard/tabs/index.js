import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import NewItemTab from './newItemTab';
import EmployeeItems from './itemsByEmployee';
import MyItemsTab from './myItemsTab';
import AuthInventoryWithModal from './AuthInventoryWithModal';


function InventoryTabs() {

  return (
        <Tabs
        defaultActiveKey="my-items"
        id="inventory-tab-container"
        className="mb-3 inventory-tabs"
        role = "tabs-container"
        >
            <Tab eventKey="all" title="ALL" className='page'>
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

        </Tabs>
  );
}

export default InventoryTabs;