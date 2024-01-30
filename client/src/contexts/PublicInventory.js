import { useEffect, useState } from "react"


const PublicInventory = () => {
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
    // console.log("Show Table state", showTable);

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
                    <div className='public-inventory-list' title='Public Inventory List' role="list">
                        <ul>
                            <li className="public-inventory-header">
                                <div className='id-col'>ID</div>
                                <div className='name-col'>ITEM NAME</div>
                                <div className='desc-col'>DESCRIPTION</div>
                                <div className='quantity-col'>QUANTITY</div>
                                <div className='button-col'></div>
                            </li>
                        {inventory.map(item => (
                            <li key={item.id}>
                            <div className='id-col'>{item.id}</div>
                            <div className='name-col'>{item.item_name}</div>
                            <div className='desc-col'>{item.item_description.length > 100 ? item.item_description.slice(0,100) + "..." : item.item_description}</div>
                            <div className='quantity-col'>{item.item_quantity}</div>
                            <div className='button-col'>
                                <button value={item.id} onClick={toggleDescription()}>
                                    see full description
                                </button>
                            </div>
                            </li>
                        ))}
                        </ul>
                    </div>
                    
            
            );
        } else {
            // console.log("inventory is empty");
            return <p>No items found</p>;
        }
    };
     
    



    
    

    return (
    <>
        <h1>Inventory</h1>
        <button className="btn btn-primary" onClick={handleClick}>Our Inventory</button>
        {/* <GetAllItems /> */}
        { (showTable) && <InventoryTable />}

</>
        
    )

}
export default PublicInventory