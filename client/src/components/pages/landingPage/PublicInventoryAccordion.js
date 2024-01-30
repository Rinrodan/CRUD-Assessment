import { useEffect, useState } from "react"
import { Accordion } from "react-bootstrap";


const PublicInventoryAccordion = () => {
    const [inventory, setInventory] = useState([]);
    const [showTable, setShowTable] = useState(false)
    

        useEffect(() => {
            const fetchData = async () => {
                try {
                    fetch('http://localhost:4400/items', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res) => res.json())
                    .then(items => {
                        // console.log("fetch public inventory", items)
                        setInventory(items) 
                    })

                    .catch((err) => console.log(err))
                } catch (err) {
                    console.log('Failed to fetch items')
                }
            };
            fetchData();
        }, []);

    const handleClick = () => {

        setShowTable(true)
          
    }
    
    const InventoryTable = () => {

        if (Array.isArray(inventory) && inventory.length > 0) { 
            // console.log("Show Table state", showTable);

            // console.log("GetAllItems set state response", inventory);
            // console.log("Show Table state", showTable);
            return (
                    <div className='accordion-inventory-list' title='Public Inventory List' role="list">
                        <Accordion className="accordion">
                        {inventory.map(item => (
                        <Accordion.Item eventKey={item.id} key={item.id} className="accordion-item">
                            <Accordion.Header>
                                <div className="h4 px-4">{item.item_name}</div><div>{item.item_description.length > 100 ? item.item_description.slice(0,100) + "..." : item.item_description}
                                </div> </Accordion.Header>
                            <Accordion.Body className="accordion-item-body">
                                <table>
                                <thead>
                                    <tr>
                                <th className="col"></th>
                                <th className="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="type-column">Item ID:</td>
                                        <td className="data-column">{item.id}</td>
                                    </tr>
                                    <tr>
                                        <td className="type-column">Name:</td>
                                        <td className="data-column">{item.item_name}</td>
                                    </tr>
                                    <tr>
                                        <td className="type-column">Full Description:</td>
                                        <td className="data-column">{item.item_description}</td>
                                    </tr>
                                    <tr>
                                        <td className="type-column">Quantity:</td>
                                        <td className="data-column">{item.item_quantity}</td>
                                    </tr>
                              </tbody>
                                </table>
                           
                            </Accordion.Body>
                        </Accordion.Item>))}
                        </Accordion>
                    </div>
            );
        } else {
            // console.log("inventory is empty");
            return <p>No items found</p>;
        }
    };
     
    return (
        <>
        <button className="btn btn-dark" onClick={handleClick}>Our Inventory</button>
        <InventoryTable />
        </>
    )
}
export default PublicInventoryAccordion